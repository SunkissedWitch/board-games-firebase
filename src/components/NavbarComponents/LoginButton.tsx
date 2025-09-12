import { useNavigate } from "react-router-dom"

export const LoginButton = () => {
  const navigate = useNavigate()
  const goToLoginPage = () => navigate('/login')

  return (
    <button className='btn btn-primary btn-sm sm:btn-md' onClick={goToLoginPage}>
      Log In
    </button>
  )
}
