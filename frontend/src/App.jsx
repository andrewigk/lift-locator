import './App.css'
import Map from './components/Map.jsx'
import NavBar from './components/NavBar.jsx'
import AddGym from './components/AddGym.jsx'
import Footer from './components/Footer.jsx'
import ApproveSubmissions from './components/ApproveSubmissions.jsx'
import { useGoogleLogin } from '@react-oauth/google'
import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { useClickOutside } from '@reactuses/core'
import Container from '@mui/material/Container'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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

  const [visible, setVisible] = useState(false)

  const modalRef = useRef(null)

  useClickOutside(modalRef, () => {
    setVisible(false)
  })

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
      //toast.success('Successfully logged in!')
      toast.promise(res, {
        pending: 'Logging into LiftLocator...',
        success: 'User signed in successfully!',
        error: 'Sign-in error, please re-try.',
      })
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
    }
  }

  const addGymLocation = (event) => {
    const coords = event.split(',')
    setlngLat({ lng: coords[0], lat: coords[1] })
  }

  const handleSubmitGym = async (e) => {
    e.preventDefault()

    const gymData = {
      ...gym,
      submittedBy: currentUser.oauthId,
    }
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
      setVisible(false)

      await fetchSubmissions()
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
      <Container maxWidth="1600px">
        <NavBar
          currentUser={currentUser}
          googleLogin={googleLogin}
          logOut={logOut}
          showSubmissions={showSubmissions}
        ></NavBar>
        {visible && (
          <AddGym
            gym={gym}
            setGym={setGym}
            handleSubmitGym={handleSubmitGym}
            gymLocations={gymLocations}
            setGymLocations={setGymLocations}
            lngLat={lngLat}
            modalRef={modalRef}
            equipmentList={equipmentList}
          ></AddGym>
        )}

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
          visible={visible}
          setVisible={setVisible}
          equipmentList={equipmentList}
          currentUser={currentUser}
        ></Map>

        {showComponent && (
          <ApproveSubmissions
            submissions={submissions}
            handleApproval={handleApproval}
          ></ApproveSubmissions>
        )}
        <Footer />
      </Container>
    </>
  )
}

export default App
