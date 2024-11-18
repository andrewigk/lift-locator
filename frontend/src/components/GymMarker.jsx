/* eslint-disable react/prop-types */
import { Marker } from 'react-map-gl/maplibre'
import maplibregl from 'maplibre-gl'

const GymMarker = ({ gymLocations }) => {
  const handleMarkerClick = async (latitude, longitude, popup) => {
    const result = await reverseGeocode(latitude, longitude)

    popup.setHTML(`<div>Test ${result.properties.address?.road}</div>`)
  }

  const reverseGeocode = async (latitude, longitude) => {
    const features = []
    try {
      const request = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=geojson&addressdetails=1`
      const response = await fetch(request)
      const geojson = await response.json()

      if (geojson.features) {
        for (const feature of geojson.features) {
          const point = {
            type: 'Feature',
            geometry: feature.geometry,
            place_name: feature.properties.display_name,
            properties: feature.properties,
            text: feature.properties.display_name,
            place_type: ['place'],
            center: feature.geometry.coordinates,
          }
          features.push(point)
        }
      }
    } catch (e) {
      console.error(`Failed to reverseGeocode with error: ${e}`)
    }
    return { features }
  }

  return (
    <div>
      {gymLocations.map((gym, index) => {
        const popup = new maplibregl.Popup().setLngLat([
          gym.longitude,
          gym.latitude,
        ]).setHTML(`<div class="popup">
            <div class="popup-content">
            <h4>${gym.name}</h4>
            <p>Category: ${gym.category}</p>
            ${
              gym.contactInfo && gym.contactInfo.length > 0
                ? `
                        <h4>Contact Information</h4>
                        ${
                          gym.contactInfo[0]?.name
                            ? `<p>${gym.contactInfo[0].name}</p>`
                            : ''
                        }
                        ${
                          gym.contactInfo[0]?.email
                            ? `<p>${gym.contactInfo[0].email}</p>`
                            : ''
                        }
                        ${
                          gym.contactInfo[0]?.phoneNumber
                            ? `<p>${gym.contactInfo[0].phoneNumber}</p>`
                            : ''
                        }
                      `
                : ''
            } 
                    
            <p>Last Updated: ${gym.lastUpdated.split('T')[0]}</p>
            </div>
            </div>`)

        popup.on('open', () => {
          handleMarkerClick(gym.latitude, gym.longitude, popup)
        })

        return (
          <Marker
            key={index}
            longitude={gym.longitude}
            latitude={gym.latitude}
            anchor="top"
            popup={popup}
          >
            <div style={{ color: 'blue', fontSize: '30px' }}>📍</div>
          </Marker>
        )
      })}
    </div>
  )
}
export default GymMarker
