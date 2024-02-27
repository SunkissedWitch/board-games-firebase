import { useNavigate } from "react-router-dom"

export const SignUpButton = () => {
  const navigate = useNavigate()
  const goToSignUpPage = () => navigate('/signup')

  return (
    <button
      className='btn btn-outline btn-primary btn-sm sm:btn-md'
      onClick={goToSignUpPage}
    >
      Sign Up
    </button>
  )
}
