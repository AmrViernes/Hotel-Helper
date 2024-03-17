import { View, Text } from './Themed'
import React from 'react'
import { Image } from "expo-image";

const Logo = () => {
  return (
    <View style={{marginLeft: 15}}>
      <Image source={require('../assets/images/Logo.png')} contentFit='fill' style={{width: 90 , height: 70}}/>
    </View>
  )
}

export default Logo