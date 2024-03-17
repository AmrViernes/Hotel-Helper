import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native'

const Logo = () => {
  return (
    <View style={{padding:6}}>
      <Image source={require('../assets/images/Logo3.png')} resizeMode='contain' style={{width: 70 , height: 70}}/>
    </View>
  )
}

export default Logo