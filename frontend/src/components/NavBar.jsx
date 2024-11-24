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
          <Button
            variant="contained"
            size="medium"
            onClick={() => showSubmissions()}
            sx={{ fontWeight: '600', marginRight: '.5rem' }}
          >
            Submissions
          </Button>
        ) : (
          ''
        )}
        {currentUser.username ? (
          <Button
            variant="contained"
            size="medium"
            sx={{ fontWeight: '600' }}
            onClick={() => logOut()}
          >
            Sign Out
          </Button>
        ) : (
          <Button
            variant="contained"
            size="medium"
            onClick={() => googleLogin()}
            startIcon={<GoogleIcon />}
            sx={{
              fontWeight: '600',
              backgroundColor: '#eaeaea',
              color: '#292929',
              '&:hover': {
                backgroundColor: '#d6d4d4', // Background color on hover
                // Optional: Change text color on hover
              },
            }}
          >
            Sign Up or Sign In with Google
          </Button>
        )}
      </div>
    </div>
  )
}
export default NavBar
