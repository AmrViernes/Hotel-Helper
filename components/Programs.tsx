import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { tripsData } from "../constants/demoData";
import ProgramBox from "./ProgramBox";
import { SafeAreaProvider } from "react-native-safe-area-context";

type Props = {};

const Programs = (props: Props) => {
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
          <SafeAreaProvider key={item.id}>
            <ProgramBox
              key={item.id}
              title={item.title}
              details={item.details}
              date={new Date(item.date)}
              duration={item.duration}
              startAt={item.startAt}
              transportation={item.mode_of_transport}
            />
          </SafeAreaProvider>
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
