import {
  StyleSheet,
  Pressable,
  useColorScheme,
  Dimensions,
  Text,
  View,
} from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors, { tintColorSecondary } from "../../constants/Colors";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import Orders from "../../components/Orders";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Programs from "../../components/Programs";

const home = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const mainScreensData = [
    {
      name: "Maintain",
      url: "Maintenance",
      icon: (
        <FontAwesome
          name="briefcase"
          size={40}
          color={Colors[colorScheme ?? "light"].text}
        />
      ),
    },
    {
      name: "Food",
      url: "Food",
      icon: (
        <FontAwesome
          name="coffee"
          size={40}
          color={Colors[colorScheme ?? "light"].text}
        />
      ),
    },
    {
      name: "Finance",
      url: "Finance",
      icon: (
        <FontAwesome
          name="money"
          size={40}
          color={Colors[colorScheme ?? "light"].text}
        />
      ),
    },
    {
      name: "Program",
      url: "Program",
      icon: (
        <FontAwesome
          name="th-list"
          size={40}
          color={Colors[colorScheme ?? "light"].text}
        />
      ),
    },
  ];

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Hello Mr Welcome To GRA Company</Text>

        {/* Screens Sections */}
        <View style={styles.listContainer}>
          {mainScreensData.map((item, index) => (
            <Pressable onPress={() => router.push(`/${item.url}`)} key={index}>
              <View style={styles.list}>
                <Text>{item.icon}</Text>
                <Text style={styles.listTitle}>{item.name}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Orders Section */}
        <View>
          <View style={{ alignSelf: "flex-start", paddingHorizontal: 8, marginLeft: 4 }}>
            <Text style={styles.sectionsTitle}>Orders</Text>
          </View>
          <ScrollView style={{paddingVertical: 6}} horizontal showsHorizontalScrollIndicator={false}>
            <Orders
              guestName="Amr"
              orderName="Breakfast Meal"
              orderTime="7:00 AM"
              orderType="On Room"
              roomNumber="U202"
            />
            <Orders
              guestName="Amr"
              orderName="Breakfast Meal"
              orderTime="7:00 AM"
              orderType="On Room"
              roomNumber="U202"
            />
          </ScrollView>
        </View>

        {/* Program Section */}
        <View style={{paddingBottom: 10}}>
          <View style={{ alignSelf: "flex-start", paddingHorizontal: 8, marginLeft: 4 }}>
            <Text style={styles.sectionsTitle}>Programs</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Programs />
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default home;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    display: "flex",
    backgroundColor: "#fff",
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontFamily: "Poppins",
    textAlign: "center",
  },
  listContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8
  },
  list: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    borderColor: "#466d86",
    borderWidth: 2,
    borderRadius: 7,
    width: 75,
    height: 70,
  },
  listTitle: {
    fontFamily: "Poppins",
    fontSize: 12,
  },
  sectionsTitle: {
    fontFamily: "Poppins",
    fontSize: 24,
    textAlign: "left",
  },
});
