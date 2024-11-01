import './App.css'
import Map from './components/Map.jsx'
import NavBar from './components/NavBar.jsx'
import { useGoogleLogin } from '@react-oauth/google'
import { useState } from 'react'
import axios from 'axios'
import AuthButton from './components/AuthButton.jsx'

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

  const [gymLocations, setGymLocations] = useState([])

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      console.log('Sending payload: ', codeResponse.code)
      const tokens = await axios.post(
        'http://localhost:5000/api/users/auth/google/',
        {
          code: codeResponse.code,
        }
      )

      console.log(tokens)
    },
    onError: (errorResponse) => console.log(errorResponse),
  })

  const addGymLocation = (longitude, latitude, name) => {
    setGymLocations((prevLocations) => [
      ...prevLocations,
      { longitude, latitude, name },
    ])
  }
  return (
    <>
      <AuthButton googleLogin={googleLogin}></AuthButton>
      <NavBar></NavBar>
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
