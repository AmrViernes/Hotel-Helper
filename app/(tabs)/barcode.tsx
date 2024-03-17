import { StyleSheet } from "react-native";
import { View } from "../../components/Themed";
import QRCode from "react-native-qrcode-svg";
import Barcode from "@kichiyaki/react-native-barcode-generator";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function qr() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <View style={styles.container}>
        <QRCode value="test" size={200}/>
        <Barcode value="Test" format="CODE39"/>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 20,
  },
});