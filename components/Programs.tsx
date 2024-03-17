import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ProgramCard from "./ProgramCard";
import { useData } from "../app/context/DataContext";

const Programs = () => {
  const { homeData } = useData();
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  return (
    <View style={styles.container}>
      {homeData.PROGRAM.filter(
        (item) =>
          new Date(item.PROG_DATE).getDate() === selectedDate.getDate() &&
          new Date(item.PROG_DATE).getMonth() === selectedDate.getMonth() &&
          new Date(item.PROG_DATE).getFullYear() === selectedDate.getFullYear()
      ).map((item) => (
        <ProgramCard
          key={item.PROG_ID}
          title={item.PROG_TITLE}
          description={item.PROG_DESCRIPTION}
          date={new Date(item.PROG_DATE)}
          startAt={"Start at - " + item.PROG_TIME}
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
