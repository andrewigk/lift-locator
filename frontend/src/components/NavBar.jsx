/* eslint-disable react/prop-types */
import Button from '@mui/material/Button'
import GoogleIcon from '@mui/icons-material/Google'

const NavBar = ({ currentUser, googleLogin, logOut, showSubmissions }) => {
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
        {currentUser.role === 'admin' ? (
          <button onClick={() => showSubmissions()}>Submissions</button>
        ) : (
          ''
        )}
        {currentUser.username ? (
          <button onClick={() => logOut()}>Sign Out</button>
        ) : (
          <Button
            variant="outlined"
            size="medium"
            onClick={() => googleLogin()}
            startIcon={<GoogleIcon />}
            sx={{ fontWeight: '600' }}
          >
            Sign Up or Sign In with Google
          </Button>
        )}
      </div>
    </div>
  )
}
export default NavBar
