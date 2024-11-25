/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import MaplibreGeocoder from '@maplibre/maplibre-gl-geocoder'
import { useMap } from 'react-map-gl/maplibre'
import { useEffect } from 'react'
import maplibregl from 'maplibre-gl'
import '../App.css'
import { toast } from 'react-toastify'

const GeoControl = ({ currentUser, addGymLocation, handleClickOpen }) => {
  const { current: map } = useMap()

  const handleClick = (event) => {
    if (event.target.id === 'addGymButton') {
      console.log(currentUser)
      if (currentUser && currentUser.oauthId) {
        const gymData = event.target.getAttribute('data-gym-data')
        if (gymData) {
          handleClickOpen()

          // Pass the gym data (as JSON or as needed) to the addGymLocation function
          addGymLocation(gymData)
        }
      } else {
        toast.error('You must be signed in to submit a gym listing.')
      }
    }
  }

  const geocoderApi = {
    forwardGeocode: async (config) => {
      const features = []
      try {
        const request = `https://nominatim.openstreetmap.org/search?q=${config.query}&format=geojson&polygon_geojson=1&addressdetails=1`
        const response = await fetch(request)
        const geojson = await response.json()
        for (const feature of geojson.features) {
          const center = [
            feature.bbox[0] + (feature.bbox[2] - feature.bbox[0]) / 2,
            feature.bbox[1] + (feature.bbox[3] - feature.bbox[1]) / 2,
          ]
          const point = {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: center },
            place_name: feature.properties.display_name,
            properties: feature.properties,
            text: feature.properties.display_name,
            place_type: ['place'],
            center,
          }
          features.push(point)
        }
      } catch (e) {
        console.error(`Failed to forwardGeocode with error: ${e}`)
      }
      return { features }
    },
  }

  useEffect(() => {
    if (map) {
      document.addEventListener('click', handleClick)

      const geocoderOptions = {
        maplibregl: maplibregl,
        placeholder: 'Search for a location...',
        limit: 10,
        marker: true,
        minLength: 5,
        popup: true,
        flyTo: { zoom: 5 },

        render: (item) => {
          const houseNumber = item.properties.address?.house_number || ''
          const addressParts = [
            item.properties.address?.road || '',
            item.properties.address?.city || '',
            item.properties.address?.state || '',
            item.properties.address?.country || '',
            item.properties.address?.postcode || '',
          ]

          const formattedAddress =
            houseNumber + ' ' + addressParts.filter(Boolean).join(', ')
          return `
            <div class="geocoder-result">
              <strong>
            ${formattedAddress}
              </strong><br>
              
            </div>
          `
        },
        getItemValue: (item) => {
          console.log(item)
          return (
            item.properties.address.house_number +
            ' ' +
            item.properties.address.road +
            ', ' +
            item.properties.address.city +
            ', ' +
            item.properties.address.state +
            ', ' +
            item.properties.address.country
          )
        },
        popupRender: (item) => {
          console.log(item.geometry.coordinates)
          const houseNumber = item.properties.address?.house_number || ''
          const addressParts = [
            item.properties.address?.road || '',
            item.properties.address?.city || '',
            item.properties.address?.state || '',
            item.properties.address?.country || '',
            item.properties.address?.postcode || '',
          ]

          const formattedAddress =
            houseNumber + ' ' + addressParts.filter(Boolean).join(', ')

          const popupHTML = `<div id="popup" class="popup"><h4>${formattedAddress}</h4><button id="addGymButton" data-gym-data='${item.geometry.coordinates}'>ADD A GYM LISTING</button></div>`

          return popupHTML
        },
      }

      const geocoder = new MaplibreGeocoder(geocoderApi, geocoderOptions)
      map.addControl(geocoder, 'top-left')

      return () => {
        map.removeControl(geocoder)
        document.removeEventListener('click', handleClick)
      }
    }
  }, [map, currentUser])
  return null
}
export default GeoControl
