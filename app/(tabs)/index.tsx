import {  ScrollView, StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';

export default function TabOneScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{padding: 10}}>
      <Text style={styles.title}>Tab One 2</Text>
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "SpaceMono",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
