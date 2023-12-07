import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import { User, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

interface AuthProps {
  email: string, password: string
}

interface AuthContextProps {
  currentUser: User | null
  signup: (props: AuthProps) => Promise<UserCredential>
  login: (props: AuthProps) => Promise<UserCredential>
}

function signup ({ email, password }: AuthProps) {
  return createUserWithEmailAndPassword(auth, email, password)
}

function login ({ email, password }: AuthProps) {
  return signInWithEmailAndPassword(auth, email, password)
}

const authCtxDefaultValue = {
  currentUser: null,
  signup,
  login
}

const AuthContext = createContext<AuthContextProps>(authCtxDefaultValue)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider ({ children }: PropsWithChildren) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      console.log('user', user)
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value: AuthContextProps = {
    ...authCtxDefaultValue,
    currentUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}