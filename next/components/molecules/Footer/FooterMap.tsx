import 'mapbox-gl/dist/mapbox-gl.css'

import { motion } from 'framer-motion'
import Map, { Marker } from 'react-map-gl'

import MapMarkerMarianum from '../../../assets/map-marker-marianum.svg'
import { Maybe } from '../../../graphql'

export type FooterMapProps = {
  markerLat?: Maybe<string>
  markerLng?: Maybe<string>
  onMarkerClick: () => void
}

const FooterMap = ({ markerLat, markerLng, onMarkerClick }: FooterMapProps) => {
  return (
    <Map
      initialViewState={{
        longitude: parseFloat(markerLng ?? '0'),
        latitude: parseFloat(markerLat ?? '0'),
        zoom: 14,
      }}
      style={{ width: '100%', height: '100%' }}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      mapStyle={process.env.NEXT_PUBLIC_MAPBOX_DARK_STYLE}
    >
      <Marker
        anchor="bottom"
        latitude={parseFloat(markerLat ?? '0')}
        longitude={parseFloat(markerLng ?? '0')}
      >
        <motion.button
          onClick={onMarkerClick}
          style={{ originY: 1 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.8 }}
        >
          <MapMarkerMarianum />
        </motion.button>
      </Marker>
    </Map>
  )
}

export default FooterMap