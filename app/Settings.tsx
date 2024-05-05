import { Platform, StyleSheet, Linking } from "react-native";
import { View, Text } from "../components/Themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { Link } from "expo-router";
import { tintColorPrimary } from "../constants/Colors";

export default function TabTwoScreen() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* <View style={styles.contentContainer}>

        <Text style={styles.title}>Contact the Developer</Text>
        <View style={styles.iconsContainer}>
          <Link
            hrefAttrs={{ target: "_blank" }}
            href="https://www.linkedin.com/in/amr-el-desoky"
            onPress={(e) => {
              if (Platform.OS !== "web") {
                e.preventDefault();
                WebBrowser.openBrowserAsync(
                  "https://www.linkedin.com/in/amr-el-desoky"
                );
              }
            }}
          >
            <AntDesign
              name="linkedin-square"
              size={40}
              color={tintColorPrimary}
            />
          </Link>

          <FontAwesome name="whatsapp" size={40} color="green" onPress={() => {
            const url = `whatsapp://send?phone=${"+201554131606"}}`
            Linking.canOpenURL(url)
            .then((supported) => {
              if (supported) {
                return Linking.openURL(url);
              } else {
                console.error("WhatsApp is not installed on the device.");
              }
            })
            .catch((err) => console.error("Error opening WhatsApp:", err))
            Linking.openURL(url)
          }}/>

          <FontAwesome
            name="phone-square"
            size={40}
            color={tintColorPrimary}
            onPress={() => Linking.openURL(`tel:${"+201554131606"}`)}
          />
        </View>
        </View> */}
        <Text
          style={{ position: "absolute", bottom: 5, fontFamily: "PoppinsR" }}
        >
          App Version 1.0.0
        </Text>
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
    padding: 6,
  },
  contentContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    height: "20%",
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "40%",
  },
  title: {
    fontFamily: "Poppins",
    fontSize: 22,
  },
});
