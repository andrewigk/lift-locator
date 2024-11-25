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
            sx={{
              fontWeight: '600',
              marginRight: '.5rem',
              backgroundColor: '#F3F3F3',
              color: '#292929',
              '&:hover': {
                backgroundColor: '#eaeaea',
                color: '#f35c91',
              },
            }}
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
            sx={{
              fontWeight: '600',
              backgroundColor: '#F3F3F3',
              color: '#292929',
              '&:hover': {
                backgroundColor: '#eaeaea',
                color: '#f35c91',
              },
            }}
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
              backgroundColor: '#F3F3F3',
              color: '#292929',
              '&:hover': {
                backgroundColor: '#eaeaea',
                color: '#f35c91',
              },
            }}
          >
            Register/Log-in
          </Button>
        )}
      </div>
    </div>
  )
}
export default NavBar
