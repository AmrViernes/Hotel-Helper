import { StyleSheet, Pressable, useColorScheme } from "react-native";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";
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
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text
          style={styles.title}
        >
          Hello Mr Welcome To GRA Company
        </Text>

        <View style={{ height: "100%", width: "90%"}}>
          <FlashList
            data={data}
            estimatedItemSize={4}
            keyExtractor={(item) => item.url}
            numColumns={4}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => router.push(`/${item.url}`)}
                style={styles.listContainer}
              >
                <View style={styles.list}>
                  <Text>{item.icon}</Text>
                  <Text style={styles.listTitle}>{item.name}</Text>
                </View>
              </Pressable>
            )}
          />

            <Text>Orders</Text>
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
      </View>
    </SafeAreaProvider>
  );
};

export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Poppins",
    marginTop: 50,
    textAlign: "center",
  },
  listContainer: {
    margin: 5,
    padding: 4,
    borderColor: "#466d86",
    borderWidth: 2,
    borderRadius: 7,
    width: 75,
    height: 70,
  },
  list: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  listTitle: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: 12,
  },
  ordersContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
