import React from 'react'
import { useDispatch } from 'react-redux'
import {StyleSheet, View, StatusBar, Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import Constants from 'expo-constants'
import tw from 'tailwind-react-native-classnames'
import {setOrigin, setDestination} from '../slices/navSlice'
import NavFavourites from '../components/NavFavourites'
import NavOptions from '../components/NavOptions'

const HomeScreen = () => {
  const dispatch = useDispatch()

  return (
    <SafeAreaView style={[tw`bg-white h-full`, styles.container]}>
      <View style={tw`p-5`}>
        <Image 
          style={{
            width: 100,
            height:100,
            resizeMode: 'contain'
          }}
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png'
          }}
        />
        <GooglePlacesAutocomplete 
          placeholder='where from?'
          styles={{ container: { flex: 0 }, textInput: { fontSize: 18 }}}
          onPress={(data, details=null) => {
            dispatch(setOrigin({
              location: details.geometry.location,
              description: data.description
            }))
            dispatch(setDestination(null))
          }}
          fetchDetails={true}
          returnKeyType={'search'}
          enablePoweredByContainer={false}
          minLength={2}
          query={{
            key: Constants.manifest.extra.key,
            language: 'en' //change language here
          }}
          nearbyPlacesAPI='GooglePlacesSearch'
          debounce={400}
        />
        <NavOptions />
        <NavFavourites />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:StatusBar.currentHeight
  },
})
