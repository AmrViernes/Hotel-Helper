import { StyleSheet } from "react-native";
import React from "react";
import { Text, View } from "../components/Themed";
import { Stack } from "expo-router";
import { tintColorPrimary, tintColorWarmBackground } from "../constants/Colors";

const ChangePassword = () => {
  return (
    <View style={styles.container}>
          <Stack.Screen
            options={{
              headerTitle: "",
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: tintColorWarmBackground
              },
              headerTintColor: tintColorPrimary
            }}
          />
      <Text>ChangePassword</Text>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});