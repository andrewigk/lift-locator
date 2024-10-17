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
}) => {
  const { longitude, latitude, zoom } = viewState

  return (
    <MapLibre
      initialViewState={{
        longitude: longitude,
        latitude: latitude,
        zoom: zoom,
      }}
      style={{ width: 900, height: 600 }}
      mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=mkGy6FQXu312U1OML8Uz"
      dragRotate={false}
      onClick={(event) => console.log(event)}
    >
      <GeoControl
        setViewState={setViewState}
        setMarker={setMarker}
        addGymLocation={addGymLocation}
      ></GeoControl>
      <NavigationControl />
      <GymMarker gymLocations={gymLocations} />
    </MapLibre>
  )
}
export default Map
