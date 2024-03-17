import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { useColorScheme } from "react-native";

import Colors , {tintColorPrimary, tintColorSecondary} from "../../constants/Colors";
import WeavyHeader from "../../components/WeavyHeader";

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

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tintColorSecondary,
        tabBarInactiveTintColor: "#fff",
        headerShadowVisible: false,
        header: () => (
          <WeavyHeader />
        ),
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
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="barcode"
        options={{
          title: "Barcode",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="barcode" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />,
        }}
      />
    </Tabs>
  );
}
