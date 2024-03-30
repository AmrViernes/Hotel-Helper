import { ScrollView, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  tintColorDisabled,
  tintColorPrimary,
  tintColorSecondary,
} from "../constants/Colors";
import Input from "../components/Input";
import Button from "../components/Button";
import DropdownMenu from "../components/DropdownMenu";
import { CompanyT, RegisterT } from "../types/types";
import StackScreen from "../components/StackScreen";
import { AUTH_KEY, useAuth } from "./context/AuthContext";
import axios from "axios";
import * as secureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import Loader from "../components/Loader";
import { useRouter } from "expo-router";
import { useData } from "./context/DataContext";

const Register = () => {
  const router = useRouter();
  const { authState } = useAuth();

  const [userData, setUserData] = useState<RegisterT>({
    loading: true,
    formIsCompleted: false,
    guestsNumber: 0,
    firstGuestName: "",
    firstGuestPassport: "",
    localCompanyId: 0,
    foreignCompanyId: 0,
    companies: {
      localCompanies: [],
      foreignCompanies: [],
    },
  });

  useEffect(() => {
    const abort = new AbortController();

    const fetchData = async () => {
      const gettingAuth = await secureStore.getItemAsync(AUTH_KEY);
      const authData = JSON.parse(gettingAuth as string);
      try {
        const response = await axios.get(
          "http://10.0.10.150:8085/ords/boatmob/guest/rc/chData",
          {
            params: {
              P_APPID: 1,
              P_RCID: authData?.RC_ID || authState?.RC_ID,
              P_LANGCODE: "E",
            },
          }
        );
        const { FIRST_GUEST, SECOND_GUEST, THIRD_GUEST, ARR_DATE, DEP_DATE } =
          response?.data?.RESPONSE[2]?.RCDATA[0] || {};

        const guestsData = { FIRST_GUEST, SECOND_GUEST, THIRD_GUEST };
        const totalGuests = Object.values(guestsData).filter(Boolean).length;

        setUserData((prev) => {
          return {
            ...prev,
            guestsNumber: totalGuests,
            firstGuestName: FIRST_GUEST || "",
            firstGuestPassport: "",
            ...(SECOND_GUEST && { secondGuestName: SECOND_GUEST }),
            ...(SECOND_GUEST && { secondGuestPassport: "" }),
            ...(THIRD_GUEST && { thirdGuestName: THIRD_GUEST }),
            ...(THIRD_GUEST && { thirdGuestPassport: "" }),
            arrivalDate: ARR_DATE,
            leavingDate: DEP_DATE,
            companies: {
              localCompanies: response?.data?.RESPONSE[0]?.LocalCompany?.map(
                (item: any) => {
                  return {
                    companyId: item.COMPANY_ID,
                    companyName: item.COMPANY_NAME,
                  };
                }
              ),
              foreignCompanies:
                response?.data?.RESPONSE[1]?.ForeignCompany?.map(
                  (item: any) => {
                    return {
                      companyId: item.COMPANY_ID,
                      companyName: item.COMPANY_NAME,
                    };
                  }
                ),
            },
          };
        });
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
      } finally {
        setUserData((prev) => {
          return {
            ...prev,
            loading: false,
          };
        });
      }
    };

    fetchData();
    return () => abort.abort();
  }, []);

  const handleSetUserData = (name: string, value: string) => {
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const checkIfUserStateEmpty = Object.values(userData).some(
    (item) => item === 0 || item === ""
  );

  const handleSubmit = async () => {
    const apiData = {
      FIRST_GUEST: userData.firstGuestName,
      FIRST_PASSPORT: userData.firstGuestPassport,
      SECOND_GUEST: userData.secondGuestName || null,
      SECOND_PASSPORT: userData.secondGuestPassport || null,
      THIRD_GUEST: userData.thirdGuestName || null,
      THIRD_PASSPORT: userData.thirdGuestPassport || null,
      COMPANYL_ID: userData.localCompanyId,
      COMPANYF_ID: userData.foreignCompanyId,
    };
    if (checkIfUserStateEmpty) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please Fill All Fields.",
        topOffset: 100,
        position: "top",
        visibilityTime: 5000,
        text1Style: {
          fontFamily: "Poppins",
          fontSize: 18,
        },
        text2Style: {
          fontFamily: "PoppinsR",
          fontSize: 14,
        },
      });
    } else {
      const gettingAuth = await secureStore.getItemAsync(AUTH_KEY);
      const authData = JSON.parse(gettingAuth as string);
      setUserData((prev) => {
        return {
          ...prev,
          loading: true,
        };
      });
      try {
        await axios.post(
          "http://10.0.10.150:8085/ords/boatmob/guest/rc/chData",
          apiData,
          {
            params: {
              P_APPID: 1,
              P_RCID: authData?.RC_ID || authState?.RC_ID,
            },
          }
        );
      } catch (error) {
        console.warn("Error submitting Register data to API", error);
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
      } finally {
        const checkRC = await axios.get(
          "http://10.0.10.150:8085/ords/boatmob/guest/rc/fillStatus",
          {
            params: {
              P_APPID: 1,
              P_RCID: authData?.RC_ID || authState?.RC_ID,
              P_LANGCODE: "E",
            },
          }
        );
        
        if (checkRC?.data?.RESPONSE[0].Message === "Yes") router.replace("/home");
        if (checkRC?.data?.RESPONSE[0].Message === "No") router.replace("/Register");
      }
    }
  };

  const traceInputChange = (value: string) => {
    if (value === "") {
      setUserData((prev) => {
        return {
          ...prev,
          formIsCompleted: false,
        };
      });
    } else {
      setUserData((prev) => {
        return {
          ...prev,
          formIsCompleted: true,
        };
      });
    }
  };

  const setClientsNumber = (value: number) => {
    if (value === 1) {
      setUserData((prev) => {
        return {
          ...prev,
          firstGuestName: prev.firstGuestName,
          firstGuestPassport: prev.firstGuestPassport,
        };
      });
    } else if (value === 2) {
      setUserData((prev) => {
        return {
          ...prev,
          firstGuestName: prev.firstGuestName,
          firstGuestPassport: prev.firstGuestPassport,
          secondGuestName: prev.secondGuestName || "",
          secondGuestPassport: prev.secondGuestPassport || "",
        };
      });
    } else if (value === 3) {
      setUserData((prev) => {
        return {
          ...prev,
          firstGuestName: prev.firstGuestName || "",
          firstGuestPassport: prev.firstGuestPassport || "",
          secondGuestName: prev.secondGuestName || "",
          secondGuestPassport: prev.secondGuestPassport || "",
          thirdGuestName: prev.thirdGuestName || "",
          thirdGuestPassport: prev.thirdGuestPassport || "",
        };
      });
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StackScreen />
        {userData.loading && <Loader />}
        {!userData.loading && (
          <ScrollView style={{ height: "100%" }}>
            <View style={styles.container}>
              <View style={styles.textsContainers}>
                <Text style={styles.registerText}>Create Account</Text>
                <Text style={styles.welcomeText}>
                  Create an Account So You Could Explore all Features.
                </Text>
              </View>

              <View style={styles.inputContainer}>
                <View>
                  <Text style={styles.label}>Number of Guests</Text>
                  <DropdownMenu
                    data={[1, 2, 3]}
                    title="Number of Guests"
                    defaultValue={userData.guestsNumber}
                    handleInput={(value: any) => {
                      setUserData((prev) => {
                        return { ...prev, guestsNumber: value };
                      });
                      setClientsNumber(value);
                    }}
                  />
                </View>

                {userData.guestsNumber >= 1 && (
                  <>
                    <View>
                      <Text style={styles.label}>First Guest Name</Text>
                      <Input
                        placeholder="First Guest Name"
                        placeholderTextColor="#ccc"
                        showEye={false}
                        defaultValue={userData.firstGuestName}
                        onChangeText={(value) => {
                          handleSetUserData("firstGuestName", value);
                          traceInputChange(value);
                        }}
                      />
                    </View>
                    <View>
                      <Text style={styles.label}>First Guest Passport</Text>
                      <Input
                        placeholder="First Guest Passport"
                        placeholderTextColor="#ccc"
                        showEye={false}
                        onChangeText={(value) => {
                          handleSetUserData("firstGuestPassport", value);
                          traceInputChange(value);
                        }}
                      />
                    </View>
                  </>
                )}
                {userData.guestsNumber >= 2 && (
                  <>
                    <View>
                      <Text style={styles.label}>Second Guest Name</Text>
                      <Input
                        placeholder="Second Guest Name"
                        placeholderTextColor="#ccc"
                        showEye={false}
                        defaultValue={userData.secondGuestName || ""}
                        onChangeText={(value) => {
                          handleSetUserData("secondGuestName", value);
                          traceInputChange(value);
                        }}
                      />
                    </View>
                    <View>
                      <Text style={styles.label}>Second Guest Passport</Text>
                      <Input
                        placeholder="Second Guest Passport"
                        placeholderTextColor="#ccc"
                        showEye={false}
                        onChangeText={(value) => {
                          handleSetUserData("secondGuestPassport", value);
                          traceInputChange(value);
                        }}
                      />
                    </View>
                  </>
                )}
                {userData.guestsNumber === 3 && (
                  <>
                    <View>
                      <Text style={styles.label}>Third Guest Name</Text>
                      <Input
                        placeholder="Third Guest Name"
                        placeholderTextColor="#ccc"
                        showEye={false}
                        defaultValue={userData.thirdGuestName || ""}
                        onChangeText={(value) => {
                          handleSetUserData("thirdGuestName", value);
                          traceInputChange(value);
                        }}
                      />
                    </View>
                    <View>
                      <Text style={styles.label}>Third Guest Passport</Text>
                      <Input
                        placeholder="Third Guest Passport"
                        placeholderTextColor="#ccc"
                        showEye={false}
                        onChangeText={(value) => {
                          handleSetUserData("thirdGuestPassport", value);
                          traceInputChange(value);
                        }}
                      />
                    </View>
                  </>
                )}
                <View>
                  <Text style={styles.label}>Local Company</Text>
                  <DropdownMenu
                    data={userData.companies.localCompanies.map(
                      (item: any) => item?.companyName
                    )}
                    title="Local Tourism Company"
                    handleInput={(value: any) => {
                      setUserData((prev: RegisterT) => {
                        return {
                          ...prev,
                          localCompanyId:
                            userData.companies.localCompanies.find(
                              (item: CompanyT) => item.companyName === value
                            )?.companyId || 0,
                        };
                      });
                    }}
                  />
                </View>
                <View>
                  <Text style={styles.label}>Foreign Company</Text>
                  <DropdownMenu
                    data={userData.companies.foreignCompanies.map(
                      (item: any) => item?.companyName
                    )}
                    title="Foreign Tourism Company"
                    handleInput={(value: any) =>
                      setUserData((prev: RegisterT) => {
                        return {
                          ...prev,
                          formIsCompleted: true,
                          foreignCompanyId:
                            userData.companies.foreignCompanies.find(
                              (item: CompanyT) => item.companyName === value
                            )?.companyId || 0,
                        };
                      })
                    }
                  />
                </View>
                <Button
                  disabled={!userData.formIsCompleted || checkIfUserStateEmpty}
                  color={
                    !userData.formIsCompleted || checkIfUserStateEmpty
                      ? "#cccc"
                      : tintColorSecondary
                  }
                  title="Confirm"
                  onClick={() => handleSubmit()}
                />
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaProvider>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textsContainers: {
    alignItems: "center",
    paddingBottom: 26,
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
  label: {
    fontFamily: "PoppinsR",
    fontSize: 11,
    color: tintColorPrimary,
    opacity: 0.4,
    marginBottom: -17,
    position: "absolute",
    paddingLeft: 8,
    top: 0,
    zIndex: 10,
    textShadowColor: tintColorPrimary,
    textShadowRadius: 2,
    textAlign: "left",
    width: "110%",
  },
});
