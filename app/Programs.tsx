import { StyleSheet, Pressable } from "react-native";
import React from "react";
import { Text, View } from "../components/Themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import DaysBox from "../components/DaysBox";
import { ScrollView } from "react-native-gesture-handler";
import ProgramCard from "../components/Cards/ProgramCard";
import { useData } from "./context/DataContext"
import {
  tintColorDisabled,
  tintColorPrimary,
  tintColorSecondary,
} from "../constants/Colors";
import StackScreen from "../components/StackScreen";

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Program = () => {
  const { homeData } = useData();
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  const dates = homeData?.PROGRAM.map(
    (item) => new Date(item.PROG_DATE)
  ).filter(
    (date, i, self) =>
      self.findIndex((d) => d.getTime() === date.getTime()) === i
  );

  return (
    <SafeAreaProvider style={styles.container}>
      <StackScreen />
      <Text style={styles.title}>Select A Day</Text>
      <View style={styles.daysContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {dates?.map((item, index) => (
            <Pressable key={index} onPress={() => setSelectedDate(item)}>
              <DaysBox
                color={
                  item.getDate() === selectedDate.getDate()
                    ? tintColorSecondary
                    : tintColorDisabled
                }
                day={dayNames[item.getDay()]}
                dayNum={item.getDate()}
              />
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {homeData?.PROGRAM.filter(
          (item) =>
            new Date(item.PROG_DATE).getDate() === selectedDate.getDate() &&
            new Date(item.PROG_DATE).getMonth() === selectedDate.getMonth() &&
            new Date(item.PROG_DATE).getFullYear() ===
              selectedDate.getFullYear()
        ).map((item) => (
          <View style={styles.programsContainer} key={item.PROG_ID}>
            <ProgramCard
              title={item.PROG_TITLE}
              description={item.PROG_DESCRIPTION}
              date={new Date(item.PROG_DATE)}
              startAt={"Start at - " + item.PROG_TIME}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Program;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  daysContainer: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  title: {
    textAlign: "center",
    fontFamily: "Poppins",
    fontSize: 26,
    color: tintColorPrimary,
  },
  programsContainer: {
    padding: 10,
    display: "flex",
    width: "100%",
    alignItems: "center",
  },
});
