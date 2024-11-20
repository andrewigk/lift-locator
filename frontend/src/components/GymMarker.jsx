/* eslint-disable react/prop-types */
import { Marker } from 'react-map-gl/maplibre'
import maplibregl from 'maplibre-gl'
import { MdLocationPin } from 'react-icons/md'

const GymMarker = ({ gymLocations }) => {
  const handleMarkerClick = async (latitude, longitude, popup) => {
    const result = await reverseGeocode(latitude, longitude)
    console.log(result)

    // Good old vanilla JS coming clutch fr
    const addressDiv = popup.getElement().querySelector('.address-content')

    if (addressDiv) {
      const houseNumber =
        result.features[0].properties.address?.house_number || ''
      const addressParts = [
        result.features[0].properties.address?.road || '',
        result.features[0].properties.address?.city || '',
        result.features[0].properties.address?.state || '',
        result.features[0].properties.address?.country || '',
        result.features[0].properties.address?.postcode || '',
      ]

      const formattedAddress =
        houseNumber + ' ' + addressParts.filter(Boolean).join(', ')

      addressDiv.innerHTML = `
      <h4>Address: </h4>
      <p>${formattedAddress}</p>`
    }
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
        const popup = new maplibregl.Popup()
          .setLngLat([gym.longitude, gym.latitude])
          .setHTML(
            `<div class="popup">
            <div class="popup-content">
            <h4>${gym.name}</h4>
            <p>Category: ${gym.category}</p>
            <div class="address-content">Fetching address...</div>
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
        <div class="inventory-content">
          <h4>Equipment Inventory</h4>
          <ul>
            ${gym.inventory.map(
              (item) => `
                  <li>
                    ${item.equipment} - ${item.condition} (${item.count})
                  </li>`
            )}
          </ul>
        </div>      
            <p>Last Updated: ${gym.lastUpdated.split('T')[0]}</p>
            </div>
            </div>`
          )

        popup
          .on('open', () => {
            handleMarkerClick(gym.latitude, gym.longitude, popup)
          })
          .setMaxWidth('100%')

        return (
          <Marker
            key={index}
            longitude={gym.longitude}
            latitude={gym.latitude}
            anchor="top"
            popup={popup}
          >
            <div
              className="marker-icon"
              style={{ color: 'red', fontSize: '1.75em' }}
            >
              <MdLocationPin />
            </div>
          </Marker>
        )
      })}
    </div>
  )
}
export default GymMarker
