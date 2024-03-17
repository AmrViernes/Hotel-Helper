import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { tripsData } from "../constants/demoData";
import ProgramBox from "./ProgramBox";

const Programs = () => {
  return (
    <View style={styles.container}>
      {tripsData
        .filter(
          (item) =>
            new Date(item.date).getDate() === new Date().getDate() &&
            new Date(item.date).getMonth() === new Date().getMonth() &&
            new Date(item.date).getFullYear() === new Date().getFullYear()
        )
        .map((item) => (
            <ProgramBox
              key={item.id}
              title={item.title}
            />
        ))}
    </View>
  );
};

export default Programs;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
});
