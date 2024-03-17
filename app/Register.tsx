import { ScrollView, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { tintColorSecondary} from "../constants/Colors";
import Input from "../components/Input";
import Button from "../components/Button";
import DropdownMenu from "../components/DropdownMenu";
import { RegisterT } from "../types/types";
import StackScreen from "../components/StackScreen";

const Register = () => {
  const localCompanies = ["JEM", "Star"];
  const foreignCompanies = ["Wander", "Sowan"];
  const guideData = ["Moubark", "Hany Gabr"];
  const guestData = [1, 2, 3];

  const [userData, setUserData] = useState<RegisterT>({
    numberOfGuests: 0,
    username: "",
    password: "",
    confirmPassword: "",
    firstGuestName: "",
    firstGuestPassport: "",
    secondGuestName: null,
    secondGuestPassport: null,
    thirdGuestName: null,
    thirdGuestPassport: null,
    tourGuideName: "",
    localCompanyName: "",
    foreignCompanyName: "",
  });

  const handleSetUserData = (name: string, value: string) => {
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const isDataEmpty = Object.values(userData).some(
    (item) => item === (0 || "")
  );

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StackScreen/>
        {/* <ActivityIndicator size="large" color={tintColorPrimary} /> */}
        <ScrollView style={{ height: "100%" }}>
          <View style={styles.container}>
            <View style={styles.textsContainers}>
              <Text style={styles.registerText}>Create Account</Text>
              <Text style={styles.welcomeText}>
                Create an Account So You Could Explore all Features.
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <Input
                placeholder="Username"
                showEye={false}
                onChangeText={(value) => handleSetUserData("username", value)}
              />
              <Input
                placeholder="Password"
                secureTextEntry
                showEye={true}
                onChangeText={(value) => handleSetUserData("password", value)}
              />
              <Input
                placeholder="Confirm Password"
                secureTextEntry
                showEye={true}
                onChangeText={(value) =>
                  handleSetUserData("confirmPassword", value)
                }
              />
              <DropdownMenu
                data={guestData}
                title="Number of Guests"
                handleInput={(value: any) =>
                  handleSetUserData("numberOfGuests", value)
                }
              />

              {userData.numberOfGuests >= 1 && (
                <>
                  <Input
                    placeholder="First Guest Name"
                    showEye={false}
                    onChangeText={(value) =>
                      handleSetUserData("firstGuestName", value)
                    }
                  />
                  <Input
                    placeholder="First Guest Passport"
                    showEye={false}
                    onChangeText={(value) =>
                      handleSetUserData("firstGuestPassport", value)
                    }
                  />
                </>
              )}
              {userData.numberOfGuests >= 2 && (
                <>
                  <Input
                    placeholder="Second Guest Name"
                    showEye={false}
                    onChangeText={(value) =>
                      handleSetUserData("secondGuestName", value)
                    }
                  />
                  <Input
                    placeholder="Second Guest Passport"
                    showEye={false}
                    onChangeText={(value) =>
                      handleSetUserData("secondGuestPassport", value)
                    }
                  />
                </>
              )}
              {userData.numberOfGuests === 3 && (
                <>
                  <Input
                    placeholder="Third Guest Name"
                    showEye={false}
                    onChangeText={(value) =>
                      handleSetUserData("thirdGuestName", value)
                    }
                  />
                  <Input
                    placeholder="Third Guest Passport"
                    showEye={false}
                    onChangeText={(value) =>
                      handleSetUserData("thirdGuestPassport", value)
                    }
                  />
                </>
              )}
              <DropdownMenu
                data={guideData}
                title="Select Tour Guide"
                handleInput={(value: any) =>
                  handleSetUserData("tourGuideName", value)
                }
              />
              <DropdownMenu
                data={localCompanies}
                title="Local Tourism Company"
                handleInput={(value: any) =>
                  handleSetUserData("localCompanyName", value)
                }
              />
              <DropdownMenu
                data={foreignCompanies}
                title="Foreign Tourism Company"
                handleInput={(value: any) =>
                  handleSetUserData("foreignCompanyName", value)
                }
              />
              <Button
                disabled={isDataEmpty}
                color={isDataEmpty ? "#cccc" : tintColorSecondary}
                title="Sign Up"
                onClick={() => {}}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
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
