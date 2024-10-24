/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import MaplibreGeocoder from '@maplibre/maplibre-gl-geocoder'
import { useMap } from 'react-map-gl/maplibre'
import { useEffect } from 'react'
import maplibregl from 'maplibre-gl'
import '../App.css'

const GeoControl = ({ setViewState, setMarker, addGymLocation }) => {
  const { current: map } = useMap()

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
      const geocoderOptions = {
        maplibregl: maplibregl,
        placeholder: 'Search for a location...',
        limit: 10,
        countries: 'CA',
        showResultMarkers: true,
        collapsed: true,
        minLength: 5,
        popup: true,
        popupRender: (item) => {
          // Customize your HTML here
          return `
            <div class="popup" style="padding: 10px;">
              <h4>${item.place_name}</h4>
            
            </div>
          `
        },
        zoom: 10,
      }

      const geocoder = new MaplibreGeocoder(geocoderApi, geocoderOptions)
      map.addControl(geocoder, 'top-left')

      geocoder.on('result', (event) => {
        const { result } = event
        const [longitude, latitude] = result.center
        setViewState({ longitude, latitude, zoom: 10 })
        setMarker({
          markerLongitude: longitude,
          markerLatitude: latitude,
        })

        // Prompt user to add gym location
        const addGym = window.confirm(
          'Do you want to add a gym at this location?'
        )
        if (addGym) {
          const gymName = window.prompt('Enter the name of the gym:')
          if (gymName) {
            addGymLocation(longitude, latitude, gymName)
          }
        }
      })

      return () => {
        map.removeControl(geocoder)
      }
    }
  }, [map])
  return null
}
export default GeoControl
