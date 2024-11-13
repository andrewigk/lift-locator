import './App.css'
import Map from './components/Map.jsx'
import NavBar from './components/NavBar.jsx'
import AddGym from './components/AddGym.jsx'
import ApproveSubmissions from './components/ApproveSubmissions.jsx'
import { useGoogleLogin } from '@react-oauth/google'
import { useState, useRef } from 'react'
import axios from 'axios'
import { useClickOutside } from '@reactuses/core'

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
  })

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
    },
    onError: (errorResponse) => console.log(errorResponse),
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
      })
    }
  }

  const addGymLocation = (event) => {
    const coords = event.split(',')
    setlngLat({ lng: coords[0], lat: coords[1] })
  }

  const handleSubmitGym = async (e) => {
    e.preventDefault()

    setGym((prevState) => ({
      ...prevState,
      submittedBy: currentUser.oauthId,
    }))
    const res = await axios.post('http://localhost:5000/api/gyms/submit/', gym)
    if (res.status === 201) {
      console.log('Gym submitted successfully.')
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
      setShowForm(!showForm)
      await fetchSubmissions()
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

  const showSubmissions = () => {
    fetchSubmissions()
    setShowComponent(!showComponent)
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

  const [visible, setVisible] = useState(false)

  const modalRef = useRef(null)

  useClickOutside(modalRef, () => {
    setVisible(false)
  })

  /*
  useEffect(() => {
    fetchSubmissions()
  }, []) */

  return (
    <>
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
        ></AddGym>
      )}
      <div className={'appContainer'}>
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
        ></Map>
        {showComponent && (
          <ApproveSubmissions
            submissions={submissions}
            handleApproval={handleApproval}
          ></ApproveSubmissions>
        )}
      </div>
    </>
  )
}

export default App
