import { StyleSheet, Pressable } from "react-native";
import React from "react";
import { Text, View } from "../components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import DaysBox from "../components/DaysBox";
import { Stack } from "expo-router";
import { ScrollView} from "react-native-gesture-handler";
import ProgramBox from "../components/ProgramBox";

const Program = () => {
  const days = [
    { day: "Sat", dayNum: 2 },
    { day: "Sun", dayNum: 3 },
    { day: "Mon", dayNum: 4 },
    { day: "Thu", dayNum: 5 },
    { day: "Wen", dayNum: 6 },
    { day: "Tue", dayNum: 7 },
    { day: "Fri", dayNum: 8 },
  ];

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Stack.Screen
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />
        <Text style={styles.title}>Select A Day</Text>
        <SafeAreaView style={styles.daysContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {days.map((item, index) => (
              <Pressable key={index}>
                <DaysBox day={item.day} dayNum={item.dayNum} />
              </Pressable>
            ))}
          </ScrollView>
        </SafeAreaView>


          <ScrollView showsVerticalScrollIndicator={false}>
            <ProgramBox />
            <ProgramBox />
            <ProgramBox />
            <ProgramBox />
            <ProgramBox />
          </ScrollView>

      </SafeAreaView>
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
    marginBottom: 10
  },
  title: {
    textAlign: "center",
    fontFamily: "Poppins",
    fontSize: 20,
  },
});
