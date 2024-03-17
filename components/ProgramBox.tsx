import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { tintColorPrimary } from "../constants/Colors";

const ProgramBox = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text>Pyramids Visit</Text>
        <Text>9 Am - 12 PM</Text>
      </View>
    </View>
  );
};

export default ProgramBox;

const styles = StyleSheet.create({
  container: {
    height: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#cccc",
    backgroundColor: "#f2fffe",
    shadowColor: tintColorPrimary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    height: 80,
    width: "90%",
  },
});
