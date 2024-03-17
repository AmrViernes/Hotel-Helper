import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { Stack } from "expo-router";
import { tintColorWarmBackground } from "../constants/Colors";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Food = () => {
  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        <Stack.Screen
          options={{
            headerTitle: "",
            headerStyle: {
              backgroundColor: tintColorWarmBackground,
            },
            headerShadowVisible: false,
          }}
        />
        <Text>Food</Text>
      </SafeAreaProvider>
    </View>
  )
}

export default Food

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});