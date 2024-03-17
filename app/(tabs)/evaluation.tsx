import { ScrollView, StyleSheet } from "react-native";
import { View, Text } from "../../components/Themed";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { tintColorSecondary } from "../../constants/Colors";
import Stars from "../../components/Stars";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import Loader from "../../components/Loader";
import axios from "axios";
import { EvaluationT } from "../../types/types";
import * as secureStore from "expo-secure-store";
import { AUTH_KEY } from "../context/AuthContext";

const evaluation = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [evalState, setEvalState] = useState<string>();
  const [services, setServices] = useState<EvaluationT[]>([
    { name: "Reception", rate: "", rateMaxValue: 0 },
    { name: "Cabin", rate: "", rateMaxValue: 0 },
    { name: "House Keeping", rate: "", rateMaxValue: 0 },
    { name: "Dinning Table", rate: "", rateMaxValue: 0 },
    { name: "Food Quality", rate: "", rateMaxValue: 0 },
    { name: "Food Quantity", rate: "", rateMaxValue: 0 },
    { name: "Food Variety", rate: "", rateMaxValue: 0 },
    { name: "Restaurant Services", rate: "", rateMaxValue: 0 },
    { name: "Bar Services", rate: "", rateMaxValue: 0 },
    { name: "Bar Products Variety", rate: "", rateMaxValue: 0 },
  ]);

  const rates: string[] = ["Bad", "Normal", "Good", "Very Good", "Excellent"];

  const handleClick = (serviceIndex: number, starIndex: number) => {
    const updatedService = {
      ...services[serviceIndex],
      rate: rates[starIndex],
      rateMaxValue: starIndex + 1,
    };
    const newServices = [...services];
    newServices[serviceIndex] = updatedService;

    setServices(newServices);
  };

  const checkEmptyRates = services.some((item) => item.rate === "");

  useEffect(() => {
    const abort = new AbortController();

    const fetchData = async () => {
      const gettingAuth = await secureStore.getItemAsync(AUTH_KEY);
      const authData = JSON.parse(gettingAuth as string)
      try {
        const response = await axios.get(
          "https://actidesk.oracleapexservices.com/apexdbl/boatmob/guest/eval/chk",
          {
            params: {
              P_APPID: 1,
              P_LANGCODE: "E",
              P_RCID: authData.RC_ID,
            },
          }
        );
        setEvalState(response.data.RESPONSE[0].Message);
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
    <SafeAreaProvider>
      {evalState === "Yes" && (
        <View style={styles.evalDoneContainer}>
          <Text style={styles.evalDoneTitle}>
            Your Evaluation Was Submitted Successfully.
          </Text>
        </View>
      )}

      {loading ? (
        <Loader />
      ) : (
        evalState !== "Yes" && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
              <Text style={styles.title}>Evaluation Points</Text>

              {services.map((service, serviceIndex) => (
                <View key={serviceIndex}>
                  <Text style={styles.itemTitle}>{service.name}</Text>
                  <View style={styles.starsContainer}>
                    <FlashList
                      data={rates}
                      estimatedItemSize={100}
                      keyExtractor={(item) => item}
                      numColumns={5}
                      renderItem={({ item, index }) => (
                        <Stars
                          key={index}
                          value={index}
                          maxValue={services[serviceIndex].rateMaxValue}
                          onClick={() => handleClick(serviceIndex, index)}
                        />
                      )}
                    />
                  </View>
                </View>
              ))}

              <View style={styles.buttonContainer}>
                <Button
                  title="Submit"
                  disabled={checkEmptyRates}
                  color={checkEmptyRates ? "#ccc" : tintColorSecondary}
                  onClick={() => {}}
                />
              </View>
            </View>
          </ScrollView>
        )
      )}
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 28,
    fontFamily: "Poppins",
    marginVertical: 30,
    marginBottom: 10,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  itemTitle: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 0,
    fontFamily: "PoppinsR",
    textAlign: "center",
  },
  buttonContainer: {
    width: "60%",
    display: "flex",
    alignItems: "center",
    marginVertical: 20,
  },
  starsContainer: {
    height: 50,
    width: 250,
    display: "flex",
    flexDirection: "row",
  },
  evalDoneContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    paddingHorizontal: 40,
  },
  evalDoneTitle: {
    fontFamily: "Poppins",
    fontSize: 33,
    textAlign: "center",
  },
});

export default evaluation;
