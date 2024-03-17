import { StyleSheet } from "react-native";
import { View, Text } from "../../components/Themed";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>Setting</Text>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
  },
});
