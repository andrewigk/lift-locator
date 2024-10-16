import { Marker } from 'react-map-gl/maplibre'

const GymMarker = (marker) => {
  const { longitude, latitude } = marker
  return (
    <Marker longitude={longitude} latitude={latitude} anchor="bottom">
      <div style={{ color: 'blue', fontSize: '24px' }}>📍</div>
    </Marker>
  )
}
export default GymMarker
