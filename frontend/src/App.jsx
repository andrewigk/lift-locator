import './App.css'
import Map from './components/Map.jsx'
import NavBar from './components/NavBar.jsx'
import AddGym from './components/AddGym.jsx'
import Footer from './components/Footer.jsx'
import ApproveSubmissions from './components/ApproveSubmissions.jsx'
import { useGoogleLogin } from '@react-oauth/google'
import { useState, useEffect } from 'react'
import axios from 'axios'

import Container from '@mui/material/Container'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

function App() {
  const [viewState, setViewState] = useState({
    longitude: -106.4,
    latitude: 56.1,
    zoom: 2.5,
  })

  const [marker, setMarker] = useState({
    markerLongitude: 100,
    markerLatitude: 50,
  })

  const [lngLat, setlngLat] = useState({ lng: '', lat: '' })

  // Represents an individual gym, not the list of all gyms
  const [gym, setGym] = useState({
    name: '',
    category: '',
    inventory: [],
    hasKilos: false,
    contactInfo: { name: null, phoneNumber: null, email: null },
    // latitude and longitude should be passed by props when the marker is interacted with
    latitude: lngLat.lat,
    longitude: lngLat.lng,
  })

  const [submissions, setSubmissions] = useState([])

  // Used to toggle state of Submissions component
  const [showComponent, setShowComponent] = useState(false)

  const [showForm, setShowForm] = useState(false)

  // Represents the list of ALL gyms, to be used in props below App
  const [gymLocations, setGymLocations] = useState([])

  const [currentUser, setCurrentUser] = useState({
    username: null,
    email: null,
    oauthId: null,
    role: null,
  })

  const [equipmentList, setEquipmentList] = useState([])

  //Trying DialogForm from MUI here:
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const showSubmissions = () => {
    fetchSubmissions()
    setShowComponent(!showComponent)
  }

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      console.log('Sending payload: ', codeResponse.code)
      const res = await axios.post(
        'http://localhost:5000/api/users/auth/google/',
        {
          code: codeResponse.code,
        },
        { withCredentials: true }
      )

      console.log(res)
      console.log(res.data?.message)
      console.log(res.data?.user)
      setCurrentUser((prevUser) => ({
        ...prevUser,
        username: res.data?.user?.username,
        email: res.data?.user?.email,
        oauthId: res.data?.user?.oauthId,
        role: res.data?.user?.role,
      }))
      toast.success('Successfully logged in!')
    },
    onError: (errorResponse) => {
      toast.error('Log-in failed. Please re-try.')
      console.log(errorResponse)
    },
  })

  const logOut = async () => {
    const res = await axios.post(
      'http://localhost:5000/api/users/auth/logout/',
      {},
      { withCredentials: true }
    )
    if (res.status === 200) {
      setCurrentUser({
        username: null,
        email: null,
        oauthId: null,
        role: null,
      })
      toast.success('Signed out successfully.')
    }
  }

  const addGymLocation = (event) => {
    const coords = event.split(',')
    setlngLat({ lng: coords[0], lat: coords[1] })
  }

  const handleSubmitGym = async (e) => {
    e.preventDefault()
    if (currentUser && currentUser.oauthId) {
      const gymData = {
        ...gym,
        submittedBy: currentUser.oauthId,
      }
      try {
        const res = await axios.post(
          'http://localhost:5000/api/gyms/submit/',
          gymData
        )
        if (res.status === 201) {
          console.log('Gym submitted successfully.')
          toast.success(
            'Gym submitted successfully. Listing is pending admin approval.'
          )
          setGym({
            name: '',
            category: '',
            inventory: [],
            hasKilos: false,
            contactInfo: { name: null, phoneNumber: null, email: null },
            // latitude and longitude should be passed by props when the marker is interacted with
            latitude: '',
            longitude: '',
          })
          handleClose()

          await fetchSubmissions()
        }
      } catch (e) {
        console.log('Error with form submission, missing fields: ', e)
        toast.error(
          'Error with submission. Please check that required fields are filled accurately.'
        )
      }
    } else {
      toast.error('Error with submission. Please ensure you are logged in.')
    }
  }

  const fetchEquipment = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/gyms/equipment')
      setEquipmentList(res.data)
      console.log(res)
    } catch (error) {
      console.error('Error fetching equipment:', error)
    }
  }
  const fetchSubmissions = async () => {
    try {
      if (currentUser.role === 'admin') {
        const res = await axios.get(
          'http://localhost:5000/api/gyms/submissions'
        )
        setSubmissions(res.data)
      }
    } catch (error) {
      console.error('Error fetching submissions:', error)
    }
  }

  const fetchApprovals = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/gyms/')
      console.log(res)
      setGymLocations(res.data)
    } catch (error) {
      console.error('Error fetching approvals:', error)
    }
  }

  const fetchUser = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users/me', {
        withCredentials: true,
      })
      console.log(res)
      setCurrentUser(res.data.user)
    } catch (error) {
      console.error('Error fetching current user:', error)
    }
  }

  const handleApproval = async (req) => {
    try {
      console.log(req)
      const res = await axios.post(
        'http://localhost:5000/api/gyms/approve',
        req
      )
      if (res.status === 201) {
        console.log('Gym approved successfully.')
        await fetchSubmissions()
      }
    } catch (e) {
      console.error('Error approving a submission: ', e)
    }
  }

  useEffect(() => {
    fetchEquipment()
    fetchApprovals()
    fetchUser()
  }, [])

  return (
    <>
      <ToastContainer position="top-center" autoClose={2500} theme="light" />
      <Box
        sx={{
          bgColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          width: '90vw',
          minHeight: '100vh',

          maxWidth: {
            md: '50vw', // On medium screens, max width is 80% of the viewport
            lg: '60vw', // On large screens, max width is 70% of the viewport
          },
        }}
      >
        <Container
          sx={{
            backgroundColor: 'background.paper',
          }}
          disableGutters="true"
        >
          <Paper
            sx={{
              padding: 2,
              paddingTop: 2,
              paddingBottom: 1,
              margin: 3,
              marginTop: 2,
              marginBottom: 1.5,
            }}
            elevation={4}
          >
            <NavBar
              currentUser={currentUser}
              googleLogin={googleLogin}
              logOut={logOut}
              showSubmissions={showSubmissions}
            ></NavBar>
          </Paper>

          <Box
            sx={{
              padding: 3,
              paddingTop: 0,
              paddingBottom: 0,
              marginBottom: 1,
            }}
          >
            <AddGym
              gym={gym}
              setGym={setGym}
              handleSubmitGym={handleSubmitGym}
              gymLocations={gymLocations}
              setGymLocations={setGymLocations}
              lngLat={lngLat}
              equipmentList={equipmentList}
              open={open}
              handleClickOpen={handleClickOpen}
              handleClose={handleClose}
            ></AddGym>

            <Map
              viewState={viewState}
              setViewState={setViewState}
              marker={marker}
              setMarker={setMarker}
              gymLocations={gymLocations}
              addGymLocation={addGymLocation}
              lngLat={lngLat}
              onMove={(evt) => setViewState(evt.viewState)}
              showForm={showForm}
              setShowForm={setShowForm}
              equipmentList={equipmentList}
              currentUser={currentUser}
              open={open}
              handleClickOpen={handleClickOpen}
              handleClose={handleClose}
            ></Map>
          </Box>

          {showComponent && (
            <ApproveSubmissions
              submissions={submissions}
              handleApproval={handleApproval}
            ></ApproveSubmissions>
          )}
          <Box
            sx={{
              padding: 1,
            }}
          >
            <Footer />
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default App
