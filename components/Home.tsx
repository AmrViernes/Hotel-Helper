import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Text, View } from "./Themed";
import Colors from "../constants/Colors";
import { useRouter } from "expo-router";
import Animated, {
FadeInUp,FadeOutDown
} from "react-native-reanimated";

const Home = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const data = [
    {
      name: "Finance",
      url: "Finance",
      icon: (
        <FontAwesome
          name="money"
          size={40}
          color={Colors[colorScheme ?? "light"].text}
          style={{ marginRight: 15 }}
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
          style={{ marginRight: 15 }}
        />
      ),
    },
  ];

  return (
    <View>
      <Animated.Text
        style={styles.title}
        entering={FadeInUp}
        exiting={FadeOutDown}
      >
        Hello Mr Welcome To GRA Company
      </Animated.Text>
      <Animated.View
        style={styles.container}
        entering={FadeInUp}
        exiting={FadeOutDown}
      >
        <FlatList
          style={{ marginVertical: "30%" }}
          data={data}
          keyExtractor={(item) => item.url}
          numColumns={2}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => router.push(`/${item.url}`)}
              style={styles.listContainer}
            >
              <View style={styles.list}>
                <Text>{item.icon}</Text>
                <Text style={styles.listTitle}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </Animated.View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Poppins",
    marginTop: 50,
    textAlign: "center",
  },
  listContainer: {
    margin: 6,
    padding: 20,
    borderColor: "#466d86",
    borderWidth: 2,
    borderRadius: 10,
    width: 100,
    height: 100,
  },
  list: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listTitle: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    fontSize: 12,
  },
});
