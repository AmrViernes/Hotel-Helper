import { StyleSheet } from "react-native";
import { View } from "../../components/Themed";
import QRCode from "react-native-qrcode-svg";
import Barcode from "@kichiyaki/react-native-barcode-generator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as secureStore from "expo-secure-store";
import { AUTH_KEY, useAuth } from "../context/AuthContext";
export default async function qr() {
  const {authState} = useAuth()
  const authData = JSON.parse(await secureStore.getItemAsync(AUTH_KEY) as string);
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <View style={styles.container}>
        <QRCode value={authData?.RC_ID || authState?.RC_ID} size={200}/>
        <Barcode value={authData?.RC_ID || authState?.RC_ID} format="CODE39"/>
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