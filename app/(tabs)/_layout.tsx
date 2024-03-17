import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Redirect, Tabs } from "expo-router";
import { useColorScheme } from "react-native";

import Colors, {
  tintColorPrimary,
  tintColorSecondary,
} from "../../constants/Colors";
import WeavyHeader from "../../components/WeavyHeader";
import { useAuth } from "../context/AuthContext";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={35} style={{ marginBottom: -6 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { authState, onLogout } = useAuth();

  return (
    <>
      {authState?.authenticated === false ? (
        <Redirect href="/Welcome" />
      ) : (
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: tintColorSecondary,
            tabBarInactiveTintColor: "#fff",
            headerShadowVisible: false,
            header: () => <WeavyHeader />,
            tabBarStyle: {
              height: 80,
              paddingBottom: 15,
              backgroundColor: tintColorPrimary,
            },
          }}
        >
          <Tabs.Screen
            name="home"
            options={{
              title: "Home",
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="home" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="barcode"
            options={{
              title: "Barcode",
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="qrcode" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="evaluation"
            options={{
              title: "Evaluation",
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="500px" color={color} />
              ),
            }}
          />
        </Tabs>
      )}
    </>
  );
}
