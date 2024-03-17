import { StyleSheet } from "react-native";
import { Text, View } from "./Themed";
import React from "react";
import { tintColorPrimary, tintColorSecondary } from "../constants/Colors";

type Props = {
  dayNum: number;
  day: string;
};

const DaysBox = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.boxDayNum}>{props.dayNum}</Text>
        <Text style={styles.boxDay}>{props.day}</Text>
      </View>
    </View>
  );
};

export default DaysBox;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    borderColor: "#cccc",
    backgroundColor: "#e9e9e9",
    borderWidth: 2,
    borderRadius: 10,
    height: 70,
    width: 60,
    margin: 5,
    shadowColor: tintColorPrimary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  boxDay: {
    textAlign: "center",
    fontFamily: "Poppins",
    fontSize: 14,
    color: tintColorSecondary,
    marginTop: -8,
  },
  boxDayNum: {
    textAlign: "center",
    fontFamily: "PoppinsR",
    fontSize: 28,
  },
});
