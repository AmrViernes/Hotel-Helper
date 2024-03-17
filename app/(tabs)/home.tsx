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
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useModal } from "./../context/ModelContext";
import Orders from "../../components/Orders";
import ProgramCard from "../../components/ProgramCard";
import { useData } from "../context/DataContext";
import Loader from "../../components/Loader";

const home = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { handleOpen } = useModal();
  const { homeData, loading } = useData();
  const screensIconsData = [
    {
      name: "Maintain",
      url: "Maintenance",
      icon: (
        <MaterialCommunityIcons
          name="account-hard-hat"
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
      name: "cleaning",
      url: "HouseKeeping",
      icon: (
        <MaterialCommunityIcons
          name="auto-fix"
          size={50}
          color={Colors[colorScheme ?? "light"].iconOutLine}
        />
      ),
    },
  ];

  const openModel = (dynamicContent: ReactNode) => {
    handleOpen(dynamicContent);
  };

  const ordersImage = (num: number) => {
    if (num == 3) {
      return "../assets/images/fix.jpeg";
    } else if (num == 6) {
      return "../assets/images/orders.png";
    }
    return "../assets/images/hk.jpeg";
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>
          Room
          <Text style={{ color: tintColorSecondary }}> {homeData.ROOM_NO}</Text>
        </Text>
        <Text style={styles.title}>
          Next Event{" "}
          <Text style={{ color: tintColorSecondary }}>
            {homeData.NEXT_EVENT}
          </Text>
        </Text>

        {/* Screens Sections */}
        <View style={styles.listContainer}>
          {screensIconsData.map((item, index) => (
            <Pressable
              onPress={() => router.push(`/${item.url}`)}
              key={index}
              style={{alignItems: 'center'}}
            >
              <View style={styles.list}>
                <Text>{item.icon}</Text>
              </View>
                <Text style={styles.listTitle}>{item.name}</Text>
            </Pressable>
          ))}
        </View>

        {/* Orders Section */}
        <View style={styles.listTitle}>
          <Text style={styles.sectionsTitle}>Orders</Text>
          <Link href="/Orders" style={styles.linkInTitle}>
            See All
          </Link>
        </View>
        {loading && <Loader/>}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {!loading && homeData?.REQUEST.sort((a: any, b: any) => b.REQ_ID - a.REQ_ID).map((req: any) => (
            <Pressable
              key={req.REQ_ID}
              onPress={() =>
                openModel(
                  <View style={{ display: "flex", alignItems: "center" }}>
                    <Text>{req.DEPT_NAME}</Text>
                    <Text>{req.REQ_STATUS}</Text>
                  </View>
                )
              }
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingVertical: 10,
                  height: 200,
                }}
              >
                <Orders
                  orderName={req.DEPT_NAME}
                  imageUrl={ordersImage(req.DEPT_NUMBER)}
                  loading={loading}
                />
              </View>
            </Pressable>
          ))}
        </ScrollView>

        {/* Program Section */}
        <View style={{ paddingBottom: 10 }}>
          <View style={styles.listTitle}>
            <Text style={styles.sectionsTitle}>Programs</Text>
            <Link style={styles.linkInTitle} href="/Program">
              See All
            </Link>
          </View>
          {loading && <Loader/>}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {!loading && homeData?.PROGRAM.sort((a: any, b: any) => b.PROG_ID - a.PROG_ID).map((program: any) => (
              <Pressable
                key={program.PROG_ID}
                onPress={() => openModel(<Text>{program.PROG_TITLE}</Text>)}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingVertical: 10,
                    width: 200,
                  }}
                >
                  <ProgramCard title={program.PROG_TITLE} />
                </View>
              </Pressable>
            ))}
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
    marginBottom: 12,
  },
  list: {
    display: "flex",
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    alignSelf: 'center',
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
    display: "flex",
    flexDirection: "row",
    fontFamily: "Poppins",
    fontSize: 12,
    color: tintColorSecondary,
    textTransform: "uppercase",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
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
