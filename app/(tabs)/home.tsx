import {
  StyleSheet,
  Pressable,
  useColorScheme,
  Text,
  View,
} from "react-native";
import React, { ReactNode } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Colors, {
  tintColorPrimary,
  tintColorSecondary,
} from "../../constants/Colors";
import { Link, useRouter } from "expo-router";
import { ScrollView} from "react-native-gesture-handler";
import Orders from "../../components/Orders";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Programs from "../../components/Programs";
import { useModal } from './../context/ModelContext';
import Toast from 'react-native-toast-message';

const home = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { handleOpen } = useModal();

  const mainScreensData = [
    {
      name: "Maintain",
      url: "Maintenance",
      icon: (
        <MaterialCommunityIcons
          name="auto-fix"
          size={50}
          color={Colors[colorScheme ?? "light"].iconOutLine}
        />
      ),
    },
    {
      name: "Food",
      url: "Food",
      icon: (
        <MaterialCommunityIcons
          name="food"
          size={50}
          color={Colors[colorScheme ?? "light"].iconOutLine}
        />
      ),
    },
    {
      name: "Finance",
      url: "Finance",
      icon: (
        <MaterialCommunityIcons
          name="account-cash"
          size={50}
          color={Colors[colorScheme ?? "light"].iconOutLine}
        />
      ),
    },
    {
      name: "Program",
      url: "Program",
      icon: (
        <MaterialCommunityIcons
          name="animation"
          size={50}
          color={Colors[colorScheme ?? "light"].iconOutLine}
        />
      ),
    },
  ];

const openModel = (dynamicContent: ReactNode) => {
  handleOpen(dynamicContent);
}

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Hello Mr Welcome To GRA Company</Text>

        {/* Screens Sections */}
        <View style={styles.listContainer}>
          {mainScreensData.map((item, index) => (
            <Pressable
              onPress={() => router.push(`/${item.url}`)}
              key={index}
              style={styles.list}
            >
              <View style={styles.list}>
                <Text>{item.icon}</Text>
                {/* <Text style={styles.listTitle}>{item.name}</Text> */}
              </View>
            </Pressable>
          ))}
        </View>

        {/* Orders Section */}
        <View>
          <View style={styles.listTitle}>
            <Text style={styles.sectionsTitle}>Orders</Text>
            <Link href="/Orders" style={styles.linkInTitle}>
              See All
            </Link>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                paddingVertical: 10,
              }}
            >
              <Pressable  onPress={() => openModel(<Text>Order Name</Text>)}>
              <Orders orderName="Breakfast Meal"/>
              </Pressable>
              <Orders orderName="Launch Meal" />
            </View>
          </ScrollView>
        </View>

        {/* Program Section */}
        <View style={{ paddingBottom: 10 }}>
          <View style={styles.listTitle}>
            <Text style={styles.sectionsTitle}>Programs</Text>
            <Link style={styles.linkInTitle} href="/Program">
              See All
            </Link>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                paddingVertical: 10,
              }}
            >
              <Programs />
            </View>
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
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontFamily: "Poppins",
    textAlign: "center",
    color: tintColorPrimary,
    lineHeight: 24,
  },
  listContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  list: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    backgroundColor: tintColorSecondary,
    borderRadius: 10,
    width: 75,
    height: 70,
    textAlign: "center",
    shadowColor: tintColorPrimary,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 10,
  },
  listTitle: {
    fontFamily: "Poppins",
    fontSize: 12,
    color: tintColorPrimary,
    textTransform: "uppercase",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    marginLeft: 4,
  },
  linkInTitle: {
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
    fontFamily: "PoppinsR",
    color: tintColorSecondary,
  },
  sectionsTitle: {
    fontFamily: "Poppins",
    fontSize: 24,
    textAlign: "left",
    color: tintColorPrimary,
    textTransform: "uppercase",
  },
});
