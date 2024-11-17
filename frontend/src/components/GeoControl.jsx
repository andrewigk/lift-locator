/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import MaplibreGeocoder from '@maplibre/maplibre-gl-geocoder'
import { useMap } from 'react-map-gl/maplibre'
import { useEffect } from 'react'
import maplibregl from 'maplibre-gl'
import '../App.css'

const GeoControl = ({ setViewState, addGymLocation, setVisible }) => {
  const { current: map } = useMap()

  const handleClick = (event) => {
    if (event.target.id === 'addGymButton') {
      const gymData = event.target.getAttribute('data-gym-data')
      if (gymData) {
        //setShowForm(!showForm)
        setVisible(true)
        // Pass the gym data (as JSON or as needed) to the addGymLocation function
        addGymLocation(gymData)
        // addGymLocation(JSON.parse(gymData))
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
        countries: 'CA',
        marker: true,
        collapsed: true,
        minLength: 5,
        popup: true,
        popupRender: (item) => {
          console.log(item.geometry.coordinates)
          // Customize your HTML here
          return `<div id="popup" class="popup"><h4>${item.place_name}</h4><button id="addGymButton" data-gym-data='${item.geometry.coordinates}'>Add a gym listing here</button></div>`
        },
        zoom: 10,
      }

      const geocoder = new MaplibreGeocoder(geocoderApi, geocoderOptions)
      map.addControl(geocoder, 'top-left')

      geocoder.on('result', (event) => {
        const { result } = event
        console.log(event)
        const [longitude, latitude] = result.center
        setViewState({ longitude, latitude, zoom: 10 })
      })

      return () => {
        map.removeControl(geocoder)
        document.removeEventListener('click', handleClick)
      }
    }
  }, [map])
  return null
}
export default GeoControl
