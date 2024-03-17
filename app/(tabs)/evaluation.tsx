import { Pressable, ScrollView, StyleSheet } from "react-native";
import { View, Text } from "../../components/Themed";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, {useState} from "react";
import Button from "../../components/Button";
import { tintColorSecondary } from "../../constants/Colors";
import Stars from "../../components/Stars";
import StarRating from "react-native-star-rating-widget";

const services: string[] = [
  "Reception",
  "Cabin",
  "House Keeping",
  "Dinning Table",
  "Food Quality",
  "Food Quantity",
  "Food Variety",
  "Resturant Services",
  "Bar Services",
  "Bar Products Variety",
];

const rates: string[] = ["Bad", "Normal", "Good", "Very Good", "Excellent"];

const evaluation = () => {
  const [currentValue, setCurrentValue] = useState(0);
  const [ratedServices, setRatedServices] = useState<string[]>([]);
  const [form, setForm] = useState({
    Reception: "",
    Cabin: "",
    HouseKeeping: "",
    DinningTable: "",
    FoodQuality: "",
    FoodVariety: "",
    FoodQuantity: "",
    ResturantServices: "",
    BarServices: "",
    BarProductsVariety: "",
  });


  const handleClick = (value: number, serviceName: string) => {
    setCurrentValue(value + 1);
/*     setRatedServices([
      ...ratedServices,
      serviceName
    ]) */

    setForm((prev) => ({
      ...prev,
      [serviceName.replace(/\s+/g, "")]: rates[value],
    }));
  };
  console.log("After", form);

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title}>Evaluation Points</Text>

          {services.map((service, serviceIndex) => (
            <View key={serviceIndex}>
              <Text style={styles.itemTitle}>{service}</Text>
              <View style={styles.starsContainer}>
                {rates.map((v, index) => (
                  <Stars
                    key={index}
                    value={index}
                    maxValue={currentValue}
                    onClick={() => handleClick(index, service)}
                  />
                ))}
              </View>
            </View>
          ))}

          <View style={styles.buttonContainer}>
            <Button title="Submit" color={tintColorSecondary} page="home" />
          </View>
        </View>
      </ScrollView>
    </View>
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
    marginVertical: 10,
  },
  starsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  star: {
    padding: 3,
  },
});

export default evaluation;
