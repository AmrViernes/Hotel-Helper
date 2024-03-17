import { StyleSheet } from "react-native";
import { View } from "../../components/Themed";
import QRCode from "react-native-qrcode-svg";
import Barcode from "@kichiyaki/react-native-barcode-generator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";
import { tintColorWarmBackground } from "../../constants/Colors";


export default function qr() {
  const authData = useAuth()
  const RC = authData.authState?.RC_ID?.toString() || "0"

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <View style={styles.container}>
        <QRCode value={RC} size={200} backgroundColor={tintColorWarmBackground}/>
        <Barcode value={RC as string} format="CODE39" background={tintColorWarmBackground}/>
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