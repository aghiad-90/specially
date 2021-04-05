import React, { Component } from "react";
import { theme } from "../../core/theme";
import { StyleSheet, View, Modal } from "react-native";
import { moderateScale } from "react-native-size-matters";
//spinner
var Spinner = require("react-native-spinkit");

const Loader = (props) => {
  const { isLoading, ...attributes } = props;

  return (
    <Modal
      transparent={true}
      animationType={"none"}
      visible={isLoading}
      onRequestClose={() => {
        console.log("close modal");
      }}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <Spinner
            style={styles.spinner}
            isVisible={isLoading}
            size={moderateScale(30)}
            type={"9CubeGrid"}
            color={theme.colors.secondary}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: theme.colors.gray03 + "70",
  },
  activityIndicatorWrapper: {
    height: 70,
    width: 100,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  spinner: {
    marginBottom: 0,
  },
});

export default Loader;
