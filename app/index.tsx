import {  ScrollView, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { Redirect } from 'expo-router';

export default function index() {
   return <Redirect href="/home" />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
