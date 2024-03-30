import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "../components/Themed";
import { tintColorPrimary, tintColorSecondary } from "../constants/Colors";
import axios from "axios";
import * as secureStore from "expo-secure-store";
import { AUTH_KEY } from "./context/AuthContext";
import Loader from "../components/Loader";
import StackScreen from "../components/StackScreen";
import { Image } from "expo-image";

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
          "http://10.0.10.150:8085/ords/boatmob/guest/fin/balance",
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
      <StackScreen />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Image
            source={require("../assets/images/svg/payment.svg")}
            placeholder='Payment'
            style={{ width: '30%', height: '20%'}}
            contentFit="contain"
          />
          <View>
          <Text style={styles.title}>Your Debt Amount</Text>
          <Text style={[styles.title, { color: tintColorSecondary }]}>
            {amount}
          </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default Finance;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    marginTop: -40
  },
  title: {
    fontSize: 30,
    fontFamily: "Poppins",
    textAlign: "center",
    color: tintColorPrimary,
  },
});
