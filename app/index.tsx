import { Dimensions, StyleSheet } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import { Image } from "expo-image";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, Text } from "../components/Themed";
import Button from "../components/Button";
import { tintColorPrimary, tintColorSecondary } from "../constants/Colors";

export default function Page() {
  const { height } = Dimensions.get("window");

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
        />
        <Image
          source={require("../assets/images/welcome.jpg")}
          contentFit="contain"
          style={{
            height: height / 2,
            width: "100%",
          }}
        />
        <View style={styles.titleContainer}>
          <Image
            source={require("../assets/images/adaptive-icon.png")}
            contentFit="contain"
            style={{ width: 80, height: 80 }}
          />
          <Text style={styles.text}>Welcome To Royal Beau Rivage.</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            title="Login"
            color={tintColorPrimary}
            onClick={() => router.push("/Login")}
          />
          <Button
            title="Register"
            color={tintColorSecondary}
            onClick={() => router.push("/Register")}
          />
        </View>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
  },
  text: {
    fontFamily: "Poppins",
    textAlign: "center",
    fontSize: 22,
  },
  titleContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: -40,
    marginBottom: 20,
  },
  buttonsContainer: {
    width: "80%",
    display: "flex",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
