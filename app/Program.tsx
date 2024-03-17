import { StyleSheet, Pressable } from "react-native";
import React from "react";
import { Text, View } from "../components/Themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import DaysBox from "../components/DaysBox";
import { Stack } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import ProgramBox from "../components/ProgramBox";
import { tripsData } from "../constants/demoData";
import { tintColorWarmBackground } from "../constants/Colors";

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const dates = tripsData
  .map((item) => new Date(item.date))
  .filter(
    (date, i, self) =>
      self.findIndex((d) => d.getTime() === date.getTime()) === i
  );

const Program = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  return (
    <View style={styles.container}>
      <SafeAreaProvider style={styles.container}>
        <Stack.Screen
          options={{
            headerTitle: "",
            headerStyle:{
              backgroundColor: tintColorWarmBackground 
            },
            headerShadowVisible: false,
          }}
        />
        <Text style={styles.title}>Select A Day</Text>
        <View style={styles.daysContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dates.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => setSelectedDate(item)}
                style={{
                  backgroundColor: "red",
                }}
              >
                <DaysBox
                  color={
                    item.getDate() === selectedDate.getDate()
                      ? "#e76f51"
                      : "#e9e9e9"
                  }
                  day={dayNames[item.getDay()]}
                  dayNum={item.getDate()}
                />
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {tripsData
            .filter(
              (item) =>
                new Date(item.date).getDate() === selectedDate.getDate() &&
                new Date(item.date).getMonth() === selectedDate.getMonth() &&
                new Date(item.date).getFullYear() === selectedDate.getFullYear()
            )
            .map((item) => (
              <SafeAreaProvider key={item.id}>
                <View
                  style={styles.programsContainer}
                >
                  <ProgramBox
                    title={item.title}
                    details={item.details}
                    date={new Date(item.date)}
                    duration={"Trip Duration - " + item.duration + " Hours"}
                    startAt={"Start at - " + item.startAt}
                    transportation={
                      "Transportation - " + item.mode_of_transport
                    }
                  />
                </View>
              </SafeAreaProvider>
            ))}
        </ScrollView>
      </SafeAreaProvider>
    </View>
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
    fontSize: 20,
  },
  programsContainer: {
    padding: 10,
    display: "flex",
    width: "100%",
    alignItems: "center",
  }
});
