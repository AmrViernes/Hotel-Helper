import { StyleSheet } from "react-native";
import { View } from "../../components/Themed";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <View style={styles.container}>
        <QRCode value="test"  size={200}/>
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
    fontWeight: "bold",
  },
  box: {},
});
