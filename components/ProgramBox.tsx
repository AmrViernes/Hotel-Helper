import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { tintColorPrimary } from "../constants/Colors";

type Program = {
  id?: number;
  title: string;
  details: string;
  startAt: string;
  duration: number;
  date: Date;
  transportation: string;
};

const ProgramBox = ({
  title,
  details,
  date,
  startAt,
  duration,
  transportation,
}: Program) => {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={[styles.text ,{fontSize: 18, color: tintColorPrimary}]}>{title}</Text>
          <Text style={styles.text}>{details}</Text>
          <Text style={styles.text}>Start at - {startAt}</Text>
          <Text style={styles.text}>Trip Duration - {duration} Hours</Text>
          <Text style={styles.text}>Transportation - {transportation}</Text>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default ProgramBox;

const styles = StyleSheet.create({
  container: {
    height: 150,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#cccc",
    backgroundColor: "#f2fffe",
    shadowColor: tintColorPrimary,
    textAlign: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    height: "90%",
    width: "90%",
    padding: 26
  },
  text: {
    color: "#789",
    fontFamily: 'Poppins'
  },
});
