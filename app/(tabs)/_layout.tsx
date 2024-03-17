import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router/tabs";
import { tintColorPrimary, tintColorSecondary } from "../../constants/Colors";
import WavyHeader from "../../components/WavyHeader";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { AppState, StyleSheet, BackHandler, Alert } from "react-native";
// import NetInfo from "@react-native-community/netinfo";
// import { Text, View } from "../../components/Themed";
// import { router } from "expo-router";
import { useAuth } from "../context/AuthContext";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={35} style={{ marginBottom: -6 }} {...props} />;
}

export default function TabLayout() {
  // const [appState, setAppState] = useState<string>(AppState.currentState);
  // const [isConnected, setIsConnected] = useState<boolean | null>(true);
  const {onLogout} = useAuth()

  const logout = async () => {
    return await onLogout!()
  }

  useEffect(() => {
    const handleBackButton = () => {
      Alert.alert(
        "Confirmation",
        "Are you sure you want to exit?",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => {},
          },
          {
            text: "OK",
            onPress: () => {
              logout()
              BackHandler.exitApp();
            },
          },
        ],
        { cancelable: false }
      );
      // Return true to prevent the default behavior (exit the app
      // Return false to allow the default behavior (navigate back)
      return true;
    };

    // Add event listener for hardware back button press
    const backHandlerListener = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButton
    );

    // Cleanup the event listener when the component unmounts
    return () => {
      backHandlerListener.remove();
    };
  }, []);

  // To Check If the Device Connected To internet or Not
  // useEffect(() => {
  //   const handleAppStateChange = async (nextAppState: string) => {
  //     setAppState(nextAppState);

  //     if (nextAppState === "background" || nextAppState === "inactive") {
  //       // User don't using the App
  //       logout()
  //     } else if (nextAppState === "active") {
  //       // User is using the App
  //       //logout()
  //     }
  //   };

  //   // Subscribe to app state changes
  //   const subscription = AppState.addEventListener(
  //     "change",
  //     handleAppStateChange
  //   );

  //   const checkConnection = () =>
  //     NetInfo.addEventListener((state) => {
  //       setIsConnected(state.isConnected);
  //     });

  //   checkConnection();

  //   // Unsubscribe when the component unmounts
  //   return () => {
  //     subscription.remove();
  //   };
  // }, [isConnected]);

  return (
    <SafeAreaProvider>
      {/* {isConnected && ( */}
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: tintColorSecondary,
            tabBarInactiveTintColor: "#fff",
            headerShadowVisible: false,
            header: () => <WavyHeader />,
            tabBarLabelStyle: {
              fontFamily: 'PoppinsR'
            },
            tabBarStyle: {
              height: 80,
              paddingBottom: 13,
              backgroundColor: tintColorPrimary,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            },
          }}
        >
          <Tabs.Screen
            name="home"
            options={{
              title: "Home",
              href: "/home",
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="home" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="barcode"
            options={{
              title: "Barcode",
              href: "/barcode",
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="qrcode" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="evaluation"
            options={{
              title: "Evaluation",
              href: "/evaluation",
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="star-half-full" color={color} />
              ),
            }}
          />
          {/* <Tabs.Screen
            name="settings"
            options={{
              title: "Settings",
              href: "/settings",
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="gear" color={color} />
              ),
            }}
          /> */}
        </Tabs>
      {/*  )} */}
      {/* {!isConnected && (
        <View style={Styles.Container}>
          <Text style={Styles.message}>
            No Internet Connection Please Check Your Connection.
          </Text>
        </View>
      )} */}
    </SafeAreaProvider>
  );
}

const Styles = StyleSheet.create({
  Container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    paddingHorizontal: 40,
  },
  message: {
    fontFamily: "Poppins",
    fontSize: 33,
    textAlign: "center",
    color: tintColorSecondary,
  },
});
