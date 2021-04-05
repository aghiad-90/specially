import React, { Component } from "react";
import { connect } from "react-redux";
import * as loginActions from "../../../../actions/Actions";
import { NavigationActions, StackActions } from "react-navigation";
import { showDanger, showSuccess, translate } from "../../../../utils/utils";
import Constants from "expo-constants";
import {
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  ScrollView,
} from "react-native";
import Button from "apsl-react-native-button";
import OTPInput from "react-native-otp";
import { Text } from "../../../../components/widget";
import { theme } from "../../../../core/theme";
import { View } from "native-base";
import Header from "../childs/Header";
import { moderateScale } from "react-native-size-matters";

/**
 * Email Verification Sceren
 */

class EmailVerification extends Component {
  state = { isLoading: false, resend: false, otp: undefined };

  /**
   * @typedef {Function}
   * @param {Object} data the data coming after successing the verfication
   */

  onSuccess = (data) => {
    // console.log(data);
    this.setState({ isLoading: false });

    if (data && data.code !== 200) {
      showDanger(data.message);
      this.clearOTP();
    } else {
      const { navigation } = this.props;
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "home" })],
      });
      navigation.dispatch(resetAction);
    }
  };

  /**
   * @typedef {Function}
   * @param {Object } error in case of failure.
   */
  onError = (error) => {
    this.setState({ isLoading: false });
    // console.log(error)
  };

  /**
   *@typedef {Function}
   * @param {Number} otp otp which sent to the user to auth
   */

  verifyEmail = (otp) => {
    // const otpValidation = validate('otp', otp)
    // if (!otpValidation) {
    //     showDanger(otpValidation.messageError)
    //     return;
    // }
    this.setState({ isLoading: true });
    this.props.dispatch(
      loginActions.verifyEmail({ otp: otp }, this.onSuccess, this.onError)
    );
  };

  /**
   * @typedef {Function}
   * Resend Code function
   */

  resendCode = () => {
    this.setState({ isLoading: true });
    this.props.dispatch(
      loginActions.resendCode(this.resendCodeOnSuccess, this.resendCodeOnError)
    );
  };

  /**
   *@typedef {Function}
   * @param {Object} data send the Code on Success
   */
  resendCodeOnSuccess = (data) => {
    // console.log(data);
    this.setState({ isLoading: false });
    if (data) {
      showSuccess(data.message);
    }
  };

  /**
   * @typedef {Function}
   * @param {Object} error send the error message on failure.
   */
  resendCodeOnError = (error) => {
    this.setState({ isLoading: false });
    // console.log(error)
    if (data) {
      showSuccess(data.message);
    }
  };

  /**
   *@typedef {Function}
   * @param {Number} otp the number sent to to the user
   */
  handleOTPChange = (otp) => {
    // console.log(otp);
    this.setState({ otp });

    if (otp.length == 4) {
      this.verifyEmail(otp);
    }
  };

  /**
   * @typedef {Function}
   * Clear the OPT
   */
  clearOTP = () => {
    this.setState({ otp: undefined });
  };

  /**
   * @typedef {Function}
   * auto fill
   */

  autoFill = () => {
    this.setState({ otp: "221198" });
  };

  render() {
    return (
      <View style={styles.container_scrolling}>
        <Header
          search={false}
          back={true}
          navigation={this.props.navigation}
          logo={false}
          backclick={() => {
            this.props.navigation.pop();
          }}
        />
        <ImageBackground
          source={require("app/assets/Background.jpg")}
          style={{ width: "100%", height: "100%", position: "absolute" }}
        />

        <View>
          <View style={{ width: "100%", height: "85%" }}>
            <View style={styles.container}>
              {/* <Logo /> */}

              <Text
                style={{
                  color: theme.colors.white,
                  fontSize: 20,
                  marginBottom: 10,
                }}
              >
                {" "}
                {translate("EnterOTP")}{" "}
              </Text>
              <Text style={styles.text}>{translate("OTPMessage")}</Text>
              <OTPInput
                cellStyle={{ color: theme.colors.white }}
                value={this.state.otp}
                onChange={this.handleOTPChange}
                tintColor={theme.colors.secondary}
                textColor={theme.colors.white}
                offTintColor={theme.colors.white}
                otpLength={4}
              />

              <ImageBackground
                resizeMode="stretch"
                source={require("app/assets/buttonback.png")}
                style={{
                  width: "100%",
                  marginBottom: 10,
                  marginTop: moderateScale(40),
                  height: moderateScale(45),
                }}
              >
                <Button
                  mode="contained"
                  isDisabled={
                    this.state.facebookLoading || this.state.googleLoading
                  }
                  isLoading={this.state.isLoading}
                  style={{
                    borderColor: "transparent",
                    color: theme.colors.white,
                    borderRadius: 5,
                    width: "100%",
                  }}
                  textStyle={{
                    fontSize: 20,
                    color: theme.colors.white,
                    lineHeight: 26,
                  }}
                  onPress={this.resendCode}
                >
                  {translate("ReSend")}
                </Button>
              </ImageBackground>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
const styles = StyleSheet.create({
  container_scrolling: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    marginTop: 0,
  },
  label: {
    color: theme.colors.blue,
  },
  text: {
    marginBottom: 15,
    textAlign: "center",
    color: theme.colors.gray05,
  },
  labelOr: {
    marginBottom: 10,
    fontSize: 20,
    marginTop: 10,
    color: theme.colors.primary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  container: {
    flex: 2,
    marginBottom: 100,
    marginTop: 135,
    padding: 20,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    width: "100%",
    maxWidth: 380,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  transparentButton: {
    fontSize: 20,
    height: 30,
    color: "#3B5699",
    borderWidth: 0,
  },
  inline: {
    flexDirection: "row",
  },
  buttonBlueText: {
    fontSize: 20,
    color: "#3B5699",
  },
  buttonBigText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  containerSocial: {
    flex: 1,
    flexDirection: "row",
  },
  GooglePlusStyle: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dc4e41",
    borderWidth: 0.5,
    borderColor: "#fff",
    height: 40,
    borderRadius: 5,
    margin: 5,
  },
  FacebookStyle: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#485a96",
    borderWidth: 0.5,
    borderColor: "#fff",
    height: 40,
    borderRadius: 5,
    margin: 5,
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
  },
  TextStyle: {
    color: "#fff",
    marginBottom: 4,
    marginRight: 20,
  },
  SeparatorLine: {
    backgroundColor: "#fff",
    width: 1,
    height: 40,
  },
});

export default connect(
  mapStateToProps,
  null
)(EmailVerification);
