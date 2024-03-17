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
  const [services, setServices] = useState<EvaluationT[]>([]);
  const [finalData, setFinalData] = useState({ ITEMS: [] });

  const rates: number[] = [40, 50, 70, 90, 100];

  const handleClick = (serviceIndex: number, starIndex: number) => {
    const updatedService = {
      ...services[serviceIndex],
      rate: rates[starIndex],
      rateMaxValue: starIndex + 1,
    };
    const newServices = [...services];
    newServices[serviceIndex] = updatedService;

    setFinalData((prev) => {
      const existingItemIndex = prev.ITEMS.findIndex(
        (item: any) => item.EVALPOINT_CODE === services[serviceIndex].id
      );

      if (existingItemIndex !== -1) {
        // Update existing item
        const updatedItems: any = [...prev.ITEMS];
        updatedItems[existingItemIndex] = {
          EVALPOINT_CODE: services[serviceIndex].id,
          EVALPOINT_DEGREE: rates[starIndex],
        };

        return {
          ITEMS: updatedItems,
        };
      } else {
        // Add new item
        return {
          ITEMS: [
            ...prev.ITEMS,
            {
              EVALPOINT_CODE: services[serviceIndex].id,
              EVALPOINT_DEGREE: rates[starIndex],
            },
          ],
        };
      }
    });
    setServices(newServices);
  };

  const checkEmptyRates = services.some((item) => item.rate === 0);

  const fetchDataFromApi = async () => {
    const response = await axios.get(
      "https://actidesk.oracleapexservices.com/apexdbl/boatmob/guest/eval",
      {
        params: {
          P_APPID: 1,
          P_LANGCODE: "E",
        },
      }
    );
    return response?.data.ITEMS[0].EVAL_POINT.map(
      (apiItem: { EVALPOINT_NAME: string; EVALPOINT_CODE: string }) => ({
        id: apiItem.EVALPOINT_CODE,
        name: apiItem.EVALPOINT_NAME.toUpperCase(),
        rate: 0,
        rateMaxValue: 0,
      })
    );
  };

  const submitDataToApi = async () => {
    const gettingAuth = await secureStore.getItemAsync(AUTH_KEY);
    const authData = JSON.parse(gettingAuth as string);
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
    }
  };

  useEffect(() => {
    const abort = new AbortController();

    const checkIfEvalDone = async () => {
      const gettingAuth = await secureStore.getItemAsync(AUTH_KEY);
      const authData = JSON.parse(gettingAuth as string);
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

    const updateServicesFromApi = async () => {
      try {
        const updatedServices = await fetchDataFromApi();
        setServices(updatedServices);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    updateServicesFromApi();
    checkIfEvalDone();
    return () => abort.abort();
  }, [loading]);

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
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    textAlign: "center",
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
