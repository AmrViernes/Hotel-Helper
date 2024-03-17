import { StyleSheet, Pressable } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View } from "../components/Themed";
import React from "react";
import { useRouter } from "expo-router";
import Input from "../components/Input";
import Button from "../components/Button";
import { tintColorPrimary, tintColorWarmBackground } from "../constants/Colors";
import { useAuth } from "./context/AuthContext";
import Loader from "../components/Loader";
import { LoginT } from "../types/types";
import StackScreen from "../components/StackScreen";

const Login = () => {
  const router = useRouter();

  const [loginData, setLoginData] = React.useState<LoginT>({
    username: "",
    password: "",
    loading: false,
  });

  const { onLogin } = useAuth();

  const login = async () => {
    setLoginData((prev) => {
      return {
        ...prev,
        loading: true,
      };
    });
    const result = await onLogin!(loginData.username, loginData.password);
    if (result === "success") {
      setLoginData((prev) => {
        return {
          ...prev,
          loading: false,
        };
      });
    } else {
      setLoginData((prev) => {
        return {
          ...prev,
          loading: false,
        };
      });
    }
  };

  const handleLoginEntry = (name: string, value: string) =>
    setLoginData((prev) => {
      return { ...prev, [name]: value };
    });

  const isLoginDataEmpty = Object.values(loginData).some((item) => item === "");

  return (
    <SafeAreaProvider>
      {loginData.loading ? (
        <Loader />
      ) : (
        <>
          <StackScreen />
          <View style={styles.container}>
            <View style={styles.textsContainers}>
              <Text style={styles.loginText}>Login Here</Text>
              <Text style={styles.welcomeText}>
                Welcome Back You've Been Missed!
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <Input
                placeholder="User"
                showEye={false}
                onChangeText={(value) => handleLoginEntry("username", value)}
              />
              <Input
                placeholder="Password"
                secureTextEntry
                showEye={true}
                onChangeText={(value) => handleLoginEntry("password", value)}
              />
              <Button
                disabled={isLoginDataEmpty}
                title="Sign In"
                color={isLoginDataEmpty ? "#ccc" : tintColorPrimary}
                onClick={() => login()}
              />
            </View>

            <Pressable onPress={() => router.push(`/${"Register"}`)}>
              <Text
                style={{
                  fontFamily: "Poppins",
                  textDecorationLine: "underline",
                }}
              >
                Create New Account
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </SafeAreaProvider>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  textsContainers: {
    alignItems: "center",
    paddingVertical: 26,
  },
  loginText: {
    fontFamily: "Poppins",
    fontSize: 32,
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
