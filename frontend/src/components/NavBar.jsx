/* eslint-disable react/prop-types */
import Button from '@mui/material/Button'
import GoogleIcon from '@mui/icons-material/Google'
import { useMediaQuery, useTheme } from '@mui/material'
import Typography from '@mui/material/Typography'

const NavBar = ({ currentUser, googleLogin, logOut, showSubmissions }) => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      <Typography
        component="p"
        sx={{
          fontSize: isSmallScreen ? '1rem' : '1.5rem',
          fontWeight: '600',
        }}
      >
        LiftLocator
      </Typography>

      <div>
        {currentUser.role === 'admin' ? (
          <Button
            variant="contained"
            size={isSmallScreen ? 'small' : 'medium'}
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
              [theme.breakpoints.down('sm')]: {
                fontSize: '9px',
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
            size={isSmallScreen ? 'small' : 'medium'}
            sx={{
              fontWeight: '600',
              backgroundColor: '#F3F3F3',
              color: '#292929',
              '&:hover': {
                backgroundColor: '#eaeaea',
                color: '#f35c91',
              },
              [theme.breakpoints.down('sm')]: {
                fontSize: '9px',
              },
            }}
            onClick={() => logOut()}
          >
            Sign Out
          </Button>
        ) : (
          <Button
            variant="contained"
            size={isSmallScreen ? 'small' : 'medium'}
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

              [theme.breakpoints.down('sm')]: {
                fontSize: '9px',
              },
            }}
          >
            Register/Log-in
          </Button>
        )}
      </div>
    </>
  )
}
export default NavBar
