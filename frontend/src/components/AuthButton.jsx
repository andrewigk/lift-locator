// eslint-disable-next-line react/prop-types
const AuthButton = ({ googleLogin }) => {
  return (
    <button onClick={() => googleLogin()}>
      Sign up or Sign in with Google 🚀
    </button>
  )
}
export default AuthButton
