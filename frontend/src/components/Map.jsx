/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import MapLibre, { NavigationControl, useMap } from 'react-map-gl/maplibre'
import GymMarker from './GymMarker.jsx'
import GeoControl from './GeoControl.jsx'
import Box from '@mui/material/Box'

const Map = ({
  viewState,
  gymLocations,
  addGymLocation,
  lngLat,
  setVisible,
  equipmentList,
  currentUser,
  open,
  handleClickOpen,
  handleClose,
}) => {
  const { longitude, latitude, zoom } = viewState

  const apiUrl = import.meta.env.VITE_MAP_STYLE

  return (
    <Box
      sx={{
        boxShadow: 6,
      }}
    >
      <MapLibre
        initialViewState={{
          longitude: longitude,
          latitude: latitude,
          zoom: zoom,
        }}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          minWidth: '450px',
          minHeight: '800px',
        }}
        mapStyle={apiUrl}
        dragRotate={false}
        onClick={(event) => console.log(event)}
      >
        <GeoControl
          addGymLocation={addGymLocation}
          lngLat={lngLat}
          setVisible={setVisible}
          currentUser={currentUser}
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
        ></GeoControl>
        <NavigationControl />
        <GymMarker gymLocations={gymLocations} equipmentList={equipmentList} />
      </MapLibre>
    </Box>
  )
}
export default Map
