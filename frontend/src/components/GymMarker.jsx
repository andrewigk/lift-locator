/* eslint-disable react/prop-types */
import { Marker } from 'react-map-gl/maplibre'

const GymMarker = ({ gymLocations }) => {
  return (
    <div>
      {gymLocations.map((gym, index) => {
        const { longitude, latitude } = gym
        return (
          <Marker
            key={index}
            longitude={longitude}
            latitude={latitude}
            anchor="bottom"
          >
            <div style={{ color: 'blue', fontSize: '24px' }}>📍</div>
          </Marker>
        )
      })}
    </div>
  )
}
export default GymMarker
