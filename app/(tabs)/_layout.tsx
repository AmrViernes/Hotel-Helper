import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Redirect, Tabs } from "expo-router";

import {
  tintColorPrimary,
  tintColorSecondary,
} from "../../constants/Colors";
import WavyHeader from "../../components/WavyHeader";
import { useAuth } from "../context/AuthContext";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={35} style={{ marginBottom: -6 }} {...props} />;
}

export default function TabLayout() {
  const { authState} = useAuth();

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
            header: () => <WavyHeader />,
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
              tabBarIcon: ({ color }) => (
                <TabBarIcon name="home" color={color}/>
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
                <TabBarIcon name="star-half-full" color={color} />
              ),
            }}
          />
        </Tabs>
      )}
    </>
  );
}
