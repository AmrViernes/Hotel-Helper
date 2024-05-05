import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { Modal, View, StyleSheet, PanResponder, Animated } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  tintColorPrimary,
  tintColorWarmBackground,
} from "../../constants/Colors";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

type ModalContextProps = {
  handleOpen: (content: ReactNode) => void;
  handleClose: () => void;
};

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const modalHeight = 700;
  const translateY = new Animated.Value(0);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy >= 50) {
        handleClose();
      }
    },
  });

  const handleOpen = (content: ReactNode) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const handleClose = () => {
    setModalVisible(false);
    setModalContent(null);

    Animated.timing(translateY, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const contextValue: ModalContextProps = useMemo(() => {
    return {
      handleOpen,
      handleClose,
    };
  }, [handleOpen, handleClose]);

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <View style={styles.container}>
        <Modal
          transparent
          visible={modalVisible}
          animationType="slide"
          onRequestClose={handleClose}
        >
          <View style={styles.modalContainer}>
            <Animated.View
              {...panResponder.panHandlers}
              style={{
                backgroundColor: "white",
                padding: 20,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                height: modalHeight,
                transform: [{ translateY }],
              }}
            >
              <MaterialCommunityIcons
                name="minus"
                size={50}
                color={tintColorPrimary}
                style={styles.minusIcon}
              />
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.modalContent}
              >
                {modalContent}
              </ScrollView>
            </Animated.View>
          </View>
        </Modal>
      </View>
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  animatedView: {},
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  applyButton: {
    backgroundColor: "#0077B5",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  applyButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 50,
    marginTop: 10,
  },
  closeButtonText: {
    color: "black",
    fontSize: 16,
    fontFamily: "PoppinsR",
    textAlign: "center",
  },
  minusIcon: {
    borderBottomWidth: 1,
    borderBottomColor: tintColorWarmBackground,
    borderBottomEndRadius: 50,
    textAlign: "center",
    marginTop: -20,
  },
});
