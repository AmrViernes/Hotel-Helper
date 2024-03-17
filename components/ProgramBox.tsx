import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
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
    <View style={styles.container}>
      <Text style={[styles.text, { fontSize: 18, color: tintColorPrimary }]}>
        {title}
      </Text>
      <Text style={styles.text}>{details}</Text>
      <Text style={styles.text}>Start at - {startAt}</Text>
      <Text style={styles.text}>Trip Duration - {duration} Hours</Text>
      <Text style={styles.text}>Transportation - {transportation}</Text>
    </View>
  );
};

export default ProgramBox;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    alignSelf: "center",
    borderColor: "#cccc",
    backgroundColor: "#f5ebe0",
    shadowColor: tintColorPrimary,
    textAlign: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    borderRadius: 10,
    width: "90%",
    paddingVertical: 5,
    marginVertical: 5,
  },
  text: {
    color: "#789",
    fontFamily: "Poppins",
    paddingHorizontal: 3
  },
});
