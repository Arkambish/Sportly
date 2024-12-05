import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CustomAlert = ({ isVisible, onClose, title, message, buttonText }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className=" font-psemibold" style={styles.overlay}>
        <View style={styles.alertBox}>
          <Text className=" font-psemibold" style={styles.title}>
            {title}
          </Text>
          <Text className=" font-psemibold" style={styles.message}>
            {message}
          </Text>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text className=" font-psemibold" style={styles.buttonText}>
              {buttonText || "OK"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  alertBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    color: "#555",
  },
  button: {
    backgroundColor: "#192126",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
  },
});

export default CustomAlert;
