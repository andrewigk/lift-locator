/* eslint-disable react/prop-types */
const NavBar = ({ currentUser, googleLogin, logOut }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '1rem',
      }}
    >
      <div>
        <h2>LiftLocator</h2>

        <p>
          {currentUser.username ? `Signed in as: ${currentUser.username}` : ''}
        </p>
      </div>
      <div>
        {currentUser.username ? (
          <button onClick={() => logOut()}>Sign Out</button>
        ) : (
          <button onClick={() => googleLogin()}>
            Sign up or Sign in with Google 🚀
          </button>
        )}
      </div>
    </div>
  )
}
export default NavBar
