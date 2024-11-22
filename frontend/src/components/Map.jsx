/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import MapLibre, { NavigationControl, useMap } from 'react-map-gl/maplibre'
import GymMarker from './GymMarker.jsx'
import GeoControl from './GeoControl.jsx'

const Map = ({
  viewState,
  gymLocations,
  addGymLocation,
  lngLat,
  setVisible,
  equipmentList,
  currentUser,
}) => {
  const { longitude, latitude, zoom } = viewState

  const apiUrl = import.meta.env.VITE_MAP_STYLE

  return (
    <div className="mapContainer">
      <MapLibre
        initialViewState={{
          longitude: longitude,
          latitude: latitude,
          zoom: zoom,
        }}
        style={{ width: 900, height: 600 }}
        mapStyle={apiUrl}
        dragRotate={false}
        onClick={(event) => console.log(event)}
      >
        <GeoControl
          addGymLocation={addGymLocation}
          lngLat={lngLat}
          setVisible={setVisible}
          currentUser={currentUser}
        ></GeoControl>
        <NavigationControl />
        <GymMarker gymLocations={gymLocations} equipmentList={equipmentList} />
      </MapLibre>
    </div>
  )
}
export default Map
