import { StyleSheet } from "react-native";
import React from "react";
import { Text, View } from "../components/Themed";
import { Stack } from "expo-router";
import { tintColorWarmBackground } from "../constants/Colors";

const Finance = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerShadowVisible: false,
        }}
      />
      <Text>Finance</Text>
    </View>
  );
};

export default Finance;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
