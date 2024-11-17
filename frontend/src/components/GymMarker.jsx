/* eslint-disable react/prop-types */
import { Marker } from 'react-map-gl/maplibre'
import maplibregl from 'maplibre-gl'

const GymMarker = ({ gymLocations }) => {
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
