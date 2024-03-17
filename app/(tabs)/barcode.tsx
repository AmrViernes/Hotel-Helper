import { SafeAreaView, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import QRCode from "react-native-qrcode-svg";

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <QRCode value="test"  size={200}/>
      </View>
    </SafeAreaView>
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
