import MaplibreGeocoder from '@maplibre/maplibre-gl-geocoder'
import { useMap } from 'react-map-gl/maplibre'
import { useEffect } from 'react'
import maplibregl from 'maplibre-gl'

const GeoControl = (setViewState, setMarker) => {
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
      // Initialize the geocoder and attach it to the map
      const geocoder = new MaplibreGeocoder(geocoderApi, {
        maplibregl,
      })
      map.addControl(geocoder)

      return () => {
        map.removeControl(geocoder)
      }
    }
  }, [map])
  return null
}
export default GeoControl
