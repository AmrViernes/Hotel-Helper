import { StyleSheet, Pressable } from "react-native";
import React from "react";
import { Text, View } from "../components/Themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import DaysBox from "../components/DaysBox";
import { Stack } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import ProgramBox from "../components/ProgramBox";
import { tripsData } from "../constants/demoData";

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const dates = tripsData
  .map((item) => new Date(item.date))
  .filter(
    (date, i, self) =>
      self.findIndex((d) => d.getTime() === date.getTime()) === i
  );

const Program = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date>(
    new Date(dates[0])
  );
  return (
    <View style={styles.container}>
      <SafeAreaProvider style={styles.container}>
        <Stack.Screen
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />
        <Text style={styles.title}>Select A Day</Text>
        <View style={styles.daysContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dates.map((item, index) => (
              <Pressable key={index} onPress={() => setSelectedDate(item)}>
                <DaysBox
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
              <ProgramBox
                key={item.id}
                title={item.title}
                details={item.details}
                date={new Date(item.date)}
                duration={item.duration}
                startAt={item.startAt}
                transportation={item.mode_of_transport}
              />
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
});
