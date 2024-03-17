import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import React from "react";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { tintColorSecondary } from "../constants/Colors";
import Input from "../components/Input";
import Button from "../components/Button";
import DropdownMenu from "../components/DropdownMenu";

const Register = () => {
  const localCompanies = ["JEM", "Star"];
  const foreignCompanies = ["Wander", "Sowan"];
  const guideData = ["Moubark", "Hany Gabr"];
  const guestData = [1, 2, 3];

  const [guestsNumber, setGuestsNumber] = React.useState<any>(0);

  const handleSetGuestsNumber = (newCount: any) => {
    setGuestsNumber(newCount);
  };

  return (
    <View>
      <SafeAreaView>
        <Stack.Screen
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />
        {/* <ActivityIndicator size="large" color={tintColorPrimary} /> */}
        <ScrollView style={{ height: "100%" }}>
          <View style={styles.contanier}>
            <View style={styles.textsContainers}>
              <Text style={styles.registerText}>Create Account</Text>
              <Text style={styles.welcomeText}>
                Create an Account So You Could Explore all Features.
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <Input placeholder="Username" />
              <Input placeholder="Password" secureTextEntry />
              <Input placeholder="Confirm Password" secureTextEntry />
              <DropdownMenu
                data={guestData}
                title="Number of Guests"
                setGuests={handleSetGuestsNumber}
              />

              {guestsNumber >= 1 && (
                <>
                  <Input placeholder="First Guest Name" />
                  <Input placeholder="First Guest Passport" />
                </>
              )}
              {guestsNumber >= 2 && (
                <>
                  <Input placeholder="Second Guest Name" />
                  <Input placeholder="Second Guest Passport" />
                </>
              )}
              {guestsNumber === 3 && (
                <>
                  <Input placeholder="Third Guest Name" />
                  <Input placeholder="Third Guest Passport" />
                </>
              )}
              <DropdownMenu data={guideData} title="Select Tour Guide" />
              <DropdownMenu
                data={localCompanies}
                title="Local Tourism Company"
              />
              <DropdownMenu
                data={foreignCompanies}
                title="Foreign Tourism Company"
              />
              <Button color={tintColorSecondary} page="login" title="Sign Up" />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  contanier: {
    height: "100%",
    display: "flex",
    marginTop: 0,
    justifyContent: "space-between",
    alignItems: "center",
  },
  textsContainers: {
    alignItems: "center",
    paddingVertical: 26,
  },
  registerText: {
    fontFamily: "Poppins",
    fontSize: 32,
  },
  welcomeText: {
    fontFamily: "PoppinsR",
    fontSize: 16,
    textAlign: "center",
  },
  inputContainer: {
    width: "70%",
    display: "flex",
    alignItems: "center",
    paddingBottom: 20,
  },
  guestContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
});
