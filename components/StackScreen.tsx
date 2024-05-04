import { useColorScheme } from "react-native";
import { Stack } from "expo-router";
import { tintColorPrimary, tintColorWarmBackground } from "../constants/Colors";
const StackScreen = () => {
  const colorScheme = useColorScheme();
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor:
              colorScheme === "light" ? tintColorWarmBackground : "black",
          },
          headerTintColor: tintColorPrimary,
        }}
      />
    </>
  );
};

export default StackScreen;
