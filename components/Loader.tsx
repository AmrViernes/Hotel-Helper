import React from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  useColorScheme,
} from "react-native";
import {
  tintColorWarmBackground,
} from "../constants/Colors";
import LottieView from "lottie-react-native";

const Loader = () => {
  const { height } = Dimensions.get("screen");
  const color = useColorScheme();
  const animation = React.useRef(null);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: color === "dark" ? "black" : tintColorWarmBackground,
        },
      ]}
    >
      {/* <ActivityIndicator size="large" color={tintColorPrimary} /> */}
      <LottieView
        autoPlay
        ref={animation}
        style={{
          height: height / 7,
        }}
        source={require("../assets/loading.json")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loader;
