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
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import Orders from "../../components/Orders";

const home = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const data = [
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
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <SafeAreaProvider style={styles.container}>
        <Text style={styles.title}>Hello Mr Welcome To GRA Company</Text>

        {/* Screens Sections */}
        <View style={styles.listContainer}>
          {data.map((item, index) => (
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
          <View style={{ alignSelf: "flex-start", padding: 6 }}>
            <Text style={styles.orderTitle}>Orders</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.ordersContainer}>
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
            </View>
          </ScrollView>
        </View>
      </SafeAreaProvider>
    </ScrollView>
  );
};

export default home;

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Poppins",
    textAlign: "center",
  },
  listContainer: {
    display: "flex",
    flexDirection: "row",
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
    fontWeight: "bold",
    fontSize: 12,
  },
  ordersContainer: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  orderTitle: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "left",
  },
});
