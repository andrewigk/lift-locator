import './App.css'
import Map from './components/Map.jsx'
import NavBar from './components/NavBar.jsx'
import AddGym from './components/AddGym.jsx'
import { useGoogleLogin } from '@react-oauth/google'
import { useState } from 'react'
import axios from 'axios'

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

  // Represents the list of ALL gyms, to be used in props below App
  const [gymLocations, setGymLocations] = useState([])

  const [currentUser, setCurrentUser] = useState({
    username: null,
    email: null,
  })

  const [lngLat, setlngLat] = useState({ lng: '', lat: '' })

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

  const handleSubmitGym = async () => {
    const res = await axios.post('http://localhost:5000/api/gyms/submit/')
    if (res.status === 201) {
      console.log('Gym submitted successfully.')
    }
  }

  return (
    <>
      <NavBar
        currentUser={currentUser}
        googleLogin={googleLogin}
        logOut={logOut}
      ></NavBar>
      <AddGym
        handleSubmitGym={handleSubmitGym}
        gymLocations={gymLocations}
        setGymLocations={setGymLocations}
        lngLat={lngLat}
      ></AddGym>
      <Map
        viewState={viewState}
        setViewState={setViewState}
        marker={marker}
        setMarker={setMarker}
        gymLocations={gymLocations}
        addGymLocation={addGymLocation}
        onMove={(evt) => setViewState(evt.viewState)}
      ></Map>
    </>
  )
}

export default App
