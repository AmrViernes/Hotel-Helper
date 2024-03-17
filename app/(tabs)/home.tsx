import {
  StyleSheet,
  Pressable,
  useColorScheme,
  Text,
  View,
  Dimensions,
  RefreshControl,
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
import ProgramCard from "../../components/Cards/ProgramCard";
import { useData } from "../context/DataContext";
import Loader from "../../components/Loader";
import OrderCard from "../../components/Cards/OrderCard";

const home = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { handleOpen } = useModal();
  const { homeData, loading, setLoadingToTrue } = useData();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setLoadingToTrue();
    setRefreshing(false);
  }, []);
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

  const homePrograms = homeData?.PROGRAM.filter(
    (item) =>
      new Date(item.PROG_DATE).getDate() === new Date().getDate() &&
      new Date(item.PROG_DATE).getMonth() === new Date().getMonth() &&
      new Date(item.PROG_DATE).getFullYear() === new Date().getFullYear()
  ).sort((a: any, b: any) => a.PROG_ID - b.PROG_ID);

  return (
    <SafeAreaProvider style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Text style={styles.title}>
            Room
            <Text style={{ color: tintColorSecondary }}>
              {" "}
              {homeData?.ROOM_NO}
            </Text>
          </Text>
          <Text style={styles.title}>
            Next Event{" "}
            <Text style={{ color: tintColorSecondary }}>
              {homeData?.NEXT_EVENT}
            </Text>
          </Text>
          {/* Screens Sections */}
          <View style={styles.listContainer}>
            {screensIconsData.map((item, index) => (
              <Pressable
                onPress={() => router.push(`/${item.url}`)}
                key={index}
                style={{ alignItems: "center" }}
              >
                <View style={styles.list}>
                  <Text>{item.icon}</Text>
                </View>
                <Text style={styles.listTitle}>{item.name}</Text>
              </Pressable>
            ))}
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {/* Orders Section */}
            <View style={styles.listTitle}>
              <Text style={styles.sectionsTitle}>Orders</Text>
              <Link href="/Orders" style={styles.linkInTitle}>
                See All
              </Link>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {homeData?.REQUEST.length === 0 ? (
                <View style={styles.emptyProgramsContainer}>
                  <Text style={styles.emptyProgramsTitle}>
                    Orders have not yet been placed.
                  </Text>
                </View>
              ) : (
                homeData?.REQUEST.sort((a: any, b: any) => b.REQ_ID - a.REQ_ID)
                  .map((req: any) => (
                    <Pressable
                      style={{
                        paddingBottom: 6,
                        minWidth: 100,
                        width: 200,
                        paddingRight: 6,
                      }}
                      key={req.REQ_ID}
                      onPress={() =>
                        openModel(
                          <View style={styles.modelContainer}>
                            <Text style={styles.modelHeader}>
                              Your Order Status
                            </Text>
                            <Text style={styles.modelText}>
                              {req.REQ_STATUS}
                            </Text>
                          </View>
                        )
                      }
                    >
                      <OrderCard
                        orderName={req.DEPT_NAME}
                        imageUrl={req.DEPT_NUMBER}
                        loading={loading}
                      />
                    </Pressable>
                  ))
                  .splice(0, 4)
              )}
            </ScrollView>

            {/* Program Section */}
            <View style={styles.listTitle}>
              <Text style={styles.sectionsTitle}>Programs</Text>
              <Link style={styles.linkInTitle} href="/Programs">
                See All
              </Link>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {homePrograms?.length === 0 ? (
                <View style={styles.emptyProgramsContainer}>
                  <Text style={styles.emptyProgramsTitle}>
                    Today there are no programs scheduled.
                  </Text>
                </View>
              ) : (
                homePrograms?.map((program: any) => (
                  <Pressable
                    key={program.PROG_ID}
                    style={{ paddingBottom: 6 }}
                    onPress={() =>
                      openModel(
                        <View style={styles.modelContainer}>
                          <Text style={styles.modelText}>
                            {program.PROG_TITLE}
                          </Text>
                          <Text style={[styles.listTitle, { fontSize: 18 }]}>
                            {"Start at - " + program.PROG_TIME}
                          </Text>
                          <Text style={styles.modelHeader}>
                            {program.PROG_DESCRIPTION}
                          </Text>
                        </View>
                      )
                    }
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: 200,
                      }}
                    >
                      <ProgramCard title={program.PROG_TITLE} />
                    </View>
                  </Pressable>
                ))
              )}
            </ScrollView>
          </ScrollView>
        </>
      )}
    </SafeAreaProvider>
  );
};

export default home;

const styles = StyleSheet.create({
  container: {
    paddingTop: "8%",
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
  },
  list: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
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
    paddingTop: 6,
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
  modelContainer: {
    display: "flex",
    alignItems: "center",
  },
  modelHeader: {
    fontFamily: "Poppins",
    fontSize: 22,
    color: tintColorPrimary,
  },
  modelText: {
    fontFamily: "Poppins",
    fontSize: 22,
    color: tintColorPrimary,
    backgroundColor: tintColorSecondary,
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  emptyProgramsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("screen").width,
    padding: 15,
    paddingVertical: 30,
  },
  emptyProgramsTitle: {
    fontFamily: "PoppinsR",
    fontSize: 16,
    color: tintColorSecondary,
  },
});
