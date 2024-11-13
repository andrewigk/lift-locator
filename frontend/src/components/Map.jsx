/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import MapLibre, { NavigationControl, useMap } from 'react-map-gl/maplibre'
import MaplibreGeocoder from '@maplibre/maplibre-gl-geocoder'
import GymMarker from './GymMarker.jsx'
import GeoControl from './GeoControl.jsx'

const Map = ({
  viewState,
  marker,
  setViewState,
  setMarker,
  gymLocations,
  addGymLocation,
  lngLat,
  showForm,
  setShowForm,
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
          setViewState={setViewState}
          setMarker={setMarker}
          addGymLocation={addGymLocation}
          lngLat={lngLat}
          showForm={showForm}
          setShowForm={setShowForm}
        ></GeoControl>
        <NavigationControl />
        <GymMarker gymLocations={gymLocations} />
      </MapLibre>
    </div>
  )
}
export default Map
