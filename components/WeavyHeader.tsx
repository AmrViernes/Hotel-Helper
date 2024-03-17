import { Dimensions, StyleSheet, Text, View, Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Svg, { Path } from "react-native-svg";
import { Link } from "expo-router";
import React from "react";
import Logo from "./Logo";

const WeavyHeader = () => {
  return (
    <View style={styles.svgCurve}>
      <View style={styles.headerContainer}>
        {/*  Logo */}
        <View style={styles.headerLogo}>
          <Logo />
        </View>

        <Text style={styles.headerText}>Royal Beau Rivage</Text>

        {/* Left Header Button */}
        <View style={styles.headerButton}>
          <Link href="/Welcome" asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="sign-out"
                  size={25}
                  color={`#fff`}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        </View>
      </View>
      <Svg
        height="100%"
        width="100%"
        viewBox="0 0 1440 320"
        style={{ position: "absolute", top: 65 }}
      >
        <Path
          fill="#466d86"
          d="M0,256L40,256C80,256,160,256,240,224C320,192,400,128,480,128C560,128,640,192,720,192C800,192,880,128,960,112C1040,96,1120,128,1200,138.7C1280,149,1360,139,1400,133.3L1440,128L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
        />
      </Svg>
    </View>
  );
};

export default WeavyHeader;

const styles = StyleSheet.create({
  svgCurve: {
    position: "fixed",
    width: Dimensions.get("window").width,
  },
  headerContainer: {
    backgroundColor: "#466d86",
    paddingTop: 15,
    height: 100,
    display: "flex",
    zIndex: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontFamily: "PoppinsR",
    color: "#fff",
    marginTop: 20,
    marginLeft: -25
  },
  headerLogo: {
    textAlign: "center",
    marginTop: 20,
  },
  headerButton: {
    marginTop: 20,
  },
});
