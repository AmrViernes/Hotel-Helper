import { StyleSheet, FlatList, Pressable, useColorScheme } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";

const home = () => {
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
    <View style={{ flex: 1 }}>
      <SafeAreaProvider >
        <View style={styles.container}>
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
          </Animated.View>
        </View>
      </SafeAreaProvider>
    </View>
  );
};

export default home;

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
