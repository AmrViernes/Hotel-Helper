import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "../components/Themed";
import { Stack } from "expo-router";
import { tintColorPrimary, tintColorSecondary, tintColorWarmBackground } from "../constants/Colors";
import axios from "axios";
import * as secureStore from "expo-secure-store";
import { AUTH_KEY } from "./context/AuthContext";
import Loader from "../components/Loader";

const Finance = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [amount, setAmount] = useState<string>("");

  useEffect(() => {
    const abort = new AbortController();

    const fetchData = async () => {
      const gettingAuth = await secureStore.getItemAsync(AUTH_KEY);
      const authData = JSON.parse(gettingAuth as string);
      try {
        const response = await axios.get(
          "https://actidesk.oracleapexservices.com/apexdbl/boatmob/guest/fin/balance",
          {
            params: {
              P_APPID: 1,
              P_LANGCODE: "E",
              P_RCID: authData.RC_ID,
            },
          }
        );
        setAmount(response.data.RESPONSE[0].Message);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => abort.abort();
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: tintColorWarmBackground,
          },
          headerTintColor: tintColorPrimary,
        }}
      />
      
      {loading ? <Loader /> : <>
      <Text style={styles.title}>Your Debt Amount</Text>
      <Text style={[styles.title, {color: tintColorSecondary}]}>{amount}</Text>
      </>}
    </View>
  );
};

export default Finance;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  title: {
    fontSize: 30,
    fontFamily: "Poppins",
    textAlign: "center",
    color: tintColorPrimary,
  },
});
