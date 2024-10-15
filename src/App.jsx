import './App.css'
import Map from 'react-map-gl/maplibre'

function App() {
  return (
    <>
      <Map
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        style={{ width: 600, height: 400 }}
        mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=mkGy6FQXu312U1OML8Uz"
      />
    </>
  )
}

export default App
