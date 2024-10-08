import { Link, Stack, router } from "expo-router";
import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { tintColorPrimary, tintColorSecondary } from "../constants/Colors";
import { useEffect, useState } from "react";
import Loader from "../components/Loader"

export default function NotFoundScreen() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      router.replace("/");
    }, 0);
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>This Screen Doesn't Exist.</Text>

          <Link href="/" style={styles.link}>
            <Text style={styles.linkText}>Go to Home Screen!</Text>
          </Link>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: "Poppins",
    color: tintColorSecondary,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: tintColorPrimary,
    fontFamily: "PoppinsR",
  },
});
