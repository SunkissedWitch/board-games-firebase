import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { auth } from '../firebase'
import { User, UserCredential, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { isEmpty, omitBy } from 'lodash'

interface AuthProps {
  email: string, password: string
}
interface UserNewData {
  displayName?: string
  photoURL?: string
}

export interface AuthStore {
  currentUser: User | null;
  setUser: (user: User | null) => void
  updateUserDisplayName: (name: string) => void
  updateUserProfile: (data: UserNewData) => void
  signup: (props: AuthProps) => Promise<UserCredential>
  login: (props: AuthProps) => Promise<UserCredential>
  logout: () => Promise<void>
}

function signup ({ email, password }: AuthProps) {
  return createUserWithEmailAndPassword(auth, email, password)
}

function login ({ email, password }: AuthProps) {
  return signInWithEmailAndPassword(auth, email, password)
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      currentUser: auth.currentUser,
      setUser: (user) => set({ currentUser: user }),
      updateUserDisplayName: async (name: string) => {
        const user = auth.currentUser
        if (user) {          
          try {
            await updateProfile(user, { displayName: name })
            onAuthStateChanged(auth, (updatedUser) => set({ currentUser: updatedUser }))
          } catch (error) {
            return console.log('updateUserDisplayName [error]:', error);
          }
        }
      },
      updateUserProfile: async ({ displayName, photoURL }) => {
        const user = auth.currentUser
        const newData = omitBy({ displayName, photoURL }, isEmpty)
        console.log('newData', newData)
        if (user) {          
          try {
            await updateProfile(user, newData)
            onAuthStateChanged(auth, (updatedUser) => set({ currentUser: updatedUser }))
          } catch (error) {
            return console.log('updateUserProfile [error]:', error);
          }
        }
      },
      signup,
      login,
      logout: async () => {
        try {
          await signOut(auth);
          return set({ currentUser: null });
        } catch (error) {
          return console.log('SignOut [error]:', error);
        }
      },
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      partialize: (state) => ({ currentUser: state.currentUser }),
    }
  )
)
