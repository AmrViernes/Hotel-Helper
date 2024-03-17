import { ScrollView, StyleSheet } from "react-native";
import { View, Text } from "../../components/Themed";
import React, { useState } from "react";
import Button from "../../components/Button";
import { tintColorSecondary } from "../../constants/Colors";
import Stars from "../../components/Stars";

type Services = {
  name: string;
  rate: string;
  rateMaxValue: number;
};

const evaluation = () => {
  const rates: string[] = ["Bad", "Normal", "Good", "Very Good", "Excellent"];

  const [services, setServices] = useState<Services[]>([
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

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Evaluation Points</Text>

        {services.map((service, serviceIndex) => (
          <View key={serviceIndex}>
            <Text style={styles.itemTitle}>{service.name}</Text>
            <View style={styles.starsContainer}>
              {rates.map((_, starIndex) => (
                <Stars
                  key={starIndex}
                  value={starIndex}
                  maxValue={services[serviceIndex].rateMaxValue}
                  onClick={() => handleClick(serviceIndex, starIndex)}
                />
              ))}
            </View>
          </View>
        ))}

        <View style={styles.buttonContainer}>
          {!checkEmptyRates && (
            <Button title="Submit" color={tintColorSecondary} page="home" />
          )}
        </View>
      </View>
    </ScrollView>
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
    fontWeight: "bold",
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
    display: "flex",
    flexDirection: "row",
  },
});

export default evaluation;
