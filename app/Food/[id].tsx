import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

export default function edit() {
    const {edit} = useLocalSearchParams()
  return (
    <View>
      <Text>{edit}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})