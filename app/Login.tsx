import { StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "../components/Themed";
import React from "react";
import { useRouter, Stack } from "expo-router";
import Input from "../components/Input";
import Button from "../components/Button";
import { tintColorPrimary } from "../constants/Colors";

const Login = () => {
  const router = useRouter();

  return (
    <View>
      <SafeAreaView>
        <Stack.Screen
          options={{
            headerTitle: "",
            headerShadowVisible: false,
          }}
        />
        <View style={styles.contanier}>
          <View style={styles.textsContainers}>
            <Text style={styles.loginText}>Login Here</Text>
            <Text style={styles.welcomeText}>
              Welcome Back You've Been Missed!
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Input placeholder="User" />
            <Input placeholder="Password" secureTextEntry />
            <Button title="Sign In" color={tintColorPrimary} page="home" />
          </View>

          <Pressable onPress={() => router.push(`/${"Register"}`)}>
            <Text
              style={{ fontFamily: "Poppins", textDecorationLine: "underline" }}
            >
              Create New Account
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  contanier: {
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
