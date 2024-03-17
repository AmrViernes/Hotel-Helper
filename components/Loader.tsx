import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { tintColorPrimary, tintColorWarmBackground } from "../constants/Colors";

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={tintColorPrimary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: tintColorWarmBackground
  },
});

export default Loader;
