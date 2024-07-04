import { StyleSheet } from "react-native";
import React from "react";
import { Text, View } from "../components/Themed"
import { Stack, useRouter } from "expo-router";
import { tintColorPrimary, tintColorWarmBackground } from "../constants/Colors";
import { ChangePasswordT } from "../types/types";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Loader from "../components/Loader";
import Input from "../components/Input";
import Button from "../components/Button";
import Toast from "react-native-toast-message";
import * as secureStore from "expo-secure-store";
import { AUTH_KEY, useAuth } from "./context/AuthContext";
import axios from "axios";
import StackScreen from "../components/StackScreen";

const ChangePassword = () => {
  const router = useRouter();
  const { authState } = useAuth();
  const [passwordData, setPasswordData] = React.useState<ChangePasswordT>({
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    loading: false,
  });

  const handlePasswordChange = (name: string, value: string) =>
    setPasswordData((prev) => {
      return { ...prev, [name]: value };
    });

  const isLoginDataEmpty = Object.values(passwordData).some(
    (item) => item === ""
  );

  const handleSubmit = async () => {
    if (passwordData.password !== passwordData.confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Password and Confirmation are not match.",
        topOffset: 100,
        position: "top",
        visibilityTime: 5000,
        text1Style: {
          fontFamily: "Poppins",
          fontSize: 18,
        },
        text2Style: {
          fontFamily: "PoppinsR",
          fontSize: 12,
        },
      });
    } else {
      const gettingAuth = await secureStore.getItemAsync(AUTH_KEY);
      const authData = JSON.parse(gettingAuth as string);
      setPasswordData((prev) => {
        return {
          ...prev,
          loading: true,
        };
      });
      try {
        await axios.post(
          "http://10.0.10.150:8085/ords/boatmob/guest/user/pwd",
          {
            params: {
              P_APPID: 1,
              P_RCID: authData?.RC_ID || authState?.RC_ID,
              P_PWD: passwordData.password,
            },
          }
        );
        if (authState?.RC_STATUS === 1) router.replace("/home");
        if (authState?.RC_STATUS === 2) router.replace("/Register");
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Something Went Wrong Try again.",
          topOffset: 100,
          text1Style: {
            fontFamily: "Poppins",
            fontSize: 18,
          },
          text2Style: {
            fontFamily: "PoppinsR",
            fontSize: 14,
          },
        });
      }
    }
  };

  return (
    <SafeAreaProvider>
      {passwordData.loading ? (
        <Loader />
      ) : (
        <>
          <StackScreen />
          <View style={styles.container}>
            <View>
              <Text style={styles.passwordText}>Change Password</Text>
            </View>

            <View style={styles.inputContainer}>
              <Input
                placeholder="Password"
                secureTextEntry={!passwordData.showPassword}
                secureText={passwordData.showPassword}
                showEye={true}
                onClick={() =>
                  setPasswordData((prev) => {
                    return {
                      ...prev,
                      showPassword: !prev.showPassword,
                    };
                  })
                }
                onChangeText={(value) =>
                  handlePasswordChange("password", value)
                }
              />
              <Input
                placeholder="Confirm Password"
                secureTextEntry={!passwordData.showConfirmPassword}
                secureText={passwordData.showConfirmPassword}
                showEye={true}
                onClick={() =>
                  setPasswordData((prev) => {
                    return {
                      ...prev,
                      showConfirmPassword: !prev.showConfirmPassword,
                    };
                  })
                }
                onChangeText={(value) =>
                  handlePasswordChange("confirmPassword", value)
                }
              />
              <Button
                disabled={isLoginDataEmpty}
                title="Confirm"
                color={isLoginDataEmpty ? "#ccc" : tintColorPrimary}
                onClick={() => handleSubmit()}
              />
            </View>
          </View>
        </>
      )}
    </SafeAreaProvider>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: "50%",
  },
  passwordText: {
    fontFamily: "Poppins",
    fontSize: 33,
    marginBottom: 30,
  },
  welcomeText: {
    fontFamily: "PoppinsR",
    fontSize: 20,
  },
  inputContainer: {
    width: "70%",
    display: "flex",
    alignItems: "center",
  },
});
