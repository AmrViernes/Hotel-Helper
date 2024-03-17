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
  const [evalStatus, setEvalStatus] = useState<string>();
  const [services, setServices] = useState<EvaluationT[]>([]);
  const [finalData, setFinalData] = useState<{ ITEMS: any[] }>({ ITEMS: [] });

  const rates: number[] = [40, 50, 70, 90, 100];

  const handleClick = (serviceIndex: number, starIndex: number) => {
    const updatedService = {
      ...services[serviceIndex],
      rate: rates[starIndex],
      rateMaxValue: starIndex + 1,
    };

    const updatedServices = [...services];
    updatedServices[serviceIndex] = updatedService;

    const existingItemIndex = finalData.ITEMS.findIndex(
      (item: any) => item.EVALPOINT_CODE === services[serviceIndex].id
    );

    const updatedFinalData =
      existingItemIndex !== -1
        ? [...finalData.ITEMS]
        : [...finalData.ITEMS, { EVALPOINT_CODE: services[serviceIndex].id }];

    updatedFinalData[existingItemIndex] = {
      EVALPOINT_CODE: services[serviceIndex].id,
      EVALPOINT_DEGREE: rates[starIndex],
    };

    setFinalData({ ITEMS: updatedFinalData });
    setServices(updatedServices);
  };

  const checkEmptyRates = services.some((item) => item.rate === 0);

  const fetchDataFromApi = async () => {
    try {
      const response = await axios.get(
        "https://actidesk.oracleapexservices.com/apexdbl/boatmob/guest/eval",
        { params: { P_APPID: 1, P_LANGCODE: "E" } }
      );
      return response.data.ITEMS[0].EVAL_POINT.map((apiItem: any) => ({
        id: apiItem.EVALPOINT_CODE,
        name: apiItem.EVALPOINT_NAME.toUpperCase(),
        rate: 0,
        rateMaxValue: 0,
      }));
    } catch (error) {
      console.error("Error fetching data from API:", error);
      throw error; // Propagate the error for proper error handling
    }
  };

  const submitDataToApi = async () => {
    const authData = JSON.parse(
      (await secureStore.getItemAsync(AUTH_KEY)) as string
    );
    setLoading(true);
    try {
      await axios.put(
        "https://actidesk.oracleapexservices.com/apexdbl/boatmob/guest/eval",
        finalData,
        {
          params: {
            P_APPID: 1,
            P_RCID: authData.RC_ID,
          },
        }
      );
    } catch (error) {
      console.warn("Error submitting Eval data to API", error);
      throw error;
    }
  };

  const checkIfEvalIsDone = async () => {
    const authData = JSON.parse(
      (await secureStore.getItemAsync(AUTH_KEY)) as string
    );
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
      setEvalStatus(response.data.RESPONSE[0].Message);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateServicesFromApi = async () => {
    try {
      const updatedServices = await fetchDataFromApi();
      setServices(updatedServices);
    } catch (error) {
      console.error("Error fetching data from API:", error);
      throw error;
    }
  };

  useEffect(() => {
    const abort = new AbortController();

    checkIfEvalIsDone();
    updateServicesFromApi();

    return () => abort.abort();
  }, [loading]);

  return (
    <SafeAreaProvider>
      {evalStatus === "Yes" && (
        <View style={styles.evalDoneContainer}>
          <Text style={styles.evalDoneTitle}>
            Your Evaluation Was Submitted Successfully.
          </Text>
        </View>
      )}

      {loading ? (
        <Loader />
      ) : (
        evalStatus !== "Yes" && (
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
                      keyExtractor={(item) => item.toFixed()}
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
                  onClick={() => submitDataToApi()}
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
    width: "80%",
    display: "flex",
    flexDirection: "row",
    paddingLeft: 10,
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
