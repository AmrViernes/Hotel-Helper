import { Dimensions, StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "../components/Themed";
import Button from "../components/Button";
import { tintColorPrimary, tintColorSecondary } from "../constants/Colors";

const Welcome = () => {
  const { height } = Dimensions.get("window");

  return (
    <View>
      <SafeAreaView style={styles.container}>
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
          <Button title="Login" color={tintColorPrimary} page="Login" />
          <Button title="Register" color={tintColorSecondary} page="Register" />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Welcome;

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
