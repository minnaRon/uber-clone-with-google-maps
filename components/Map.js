import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MapView, { Marker } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import Constants from 'expo-constants'
import tw from 'tailwind-react-native-classnames'
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice'

const Map = () => {
  const origin = useSelector(selectOrigin)
  const destination = useSelector(selectDestination)
  const mapRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!origin || !destination) return
    setTimeout(() => {
    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: {top: 50, right: 50, bottom: 50, left: 50}
    })}, 1000)
  }, [origin, destination])

  useEffect(() => {
    if (!origin || !destination) return

    const getTraveltime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${
          origin.description}&destinations=${destination.description}&key=${Constants.manifest.extra.key}`
      )
      .then((res) => res.json())
      .then((data) => {
        dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
      })
    }
    getTraveltime()
  }, [origin, destination, Constants.manifest.extra.key])

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType='mutedStandard'
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={Constants.manifest.extra.key}
          strokeWidth={3}
          strokeColor='black'
        />
      )}

      {origin?.location && (
        <Marker 
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng
          }}
          title='Origin'
          description={origin.description}
          identifier='origin'
        />
      )}

      {destination?.location && (
        <Marker 
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng
          }}
          title='Destination'
          description={destination.description}
          identifier='destination'
        />
      )}
    </MapView>
  )
}

export default Map
