import './App.css'
import Map from './components/Map.jsx'
import NavBar from './components/NavBar.jsx'

import { useState } from 'react'

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
  return (
    <>
      <NavBar></NavBar>
      <Map
        viewState={viewState}
        setViewState={setViewState}
        marker={marker}
        setMarker={setMarker}
        onMove={(evt) => setViewState(evt.viewState)}
      ></Map>
    </>
  )
}

export default App
