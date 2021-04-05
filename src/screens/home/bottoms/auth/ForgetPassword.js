import React, { Component } from "react";
import { connect } from "react-redux";
import * as loginActions from "../../../../actions/Actions";
import { showDanger, showSuccess, translate } from "../../../../utils/utils";
import {
  StyleSheet,
  ImageBackground,
  Animated,
  Image,
  I18nManager,
  View,
} from "react-native";
import Button from "apsl-react-native-button";
import { Text } from "../../../../components/widget";
import { theme } from "../../../../core/theme";
import Icon from "react-native-vector-icons/FontAwesome";
import TextInput from "../../../../components/Weights/TextInput";
import { moderateScale } from "react-native-size-matters";
import Header from "../childs/Header";
import { FOEGOT_PASSWORD, Post } from "../../../../services/Apis";

/**
 *  Forget Password Screen
 */
class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      resend: false,
      otp: "",
      verificationCode: new Animated.Value(0),
      emailLayout: new Animated.Value(0),
      inputPassword: new Animated.Value(0),
      emailSent: false,
      email: "",
      password: "",
    };
  }

  /**
   * Start the Animation
   */
  async componentDidMount() {
    Animated.timing(this.state.emailLayout, {
      toValue: 1,
      duration: 1000,
    }).start();
  }

  /**
   * resen the Code to the User in case he didn't get it
   */

  resendCode = () => {
    this.setState({ isLoading: true });
    Post(FOEGOT_PASSWORD, { email: this.state.email })
      .then((data) => {
        console.log(data);
        this.setState({
          isLoading: false,
          emailSent: true,
          message: data.message,
        });
        this.showOTPlayout();
        showSuccess(data.message);
        setTimeout(() => {
          this.props.navigation.pop();
        }, 5000);
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        console.log(error);
        if (error) {
          showDanger(error.message);
        }
      });
  };

  /**
   *
   */
  showOTPlayout() {
    Animated.timing(this.state.emailLayout, {
      toValue: 0,
      duration: 100,
    }).start();
    Animated.timing(this.state.verificationCode, {
      toValue: 1,
      duration: 1100,
    }).start();
  }

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
        <View style={{ width: "100%", flex: 1 }}>
          <View style={{ flex: 1, paddingStart: "1%", paddingEnd: "1%" }}>
            {!this.state.emailSent && (
              <View
                style={[styles.container, { marginTop: moderateScale(-140) }]}
              >
                <ImageBackground
                  resizeMode="stretch"
                  style={{
                    position: "absolute",
                    width: "100%",
                  }}
                >
                  <Animated.View
                    style={{
                      opacity: this.state.emailLayout,
                      padding: moderateScale(15),
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={require("app/assets/passwordloc.png")}
                      resizeMode="contain"
                      style={{
                        height: moderateScale(100),
                        width: moderateScale(100),
                        marginVertical: moderateScale(20),
                        tintColor: theme.colors.secondary,
                      }}
                    />
                    <Text
                      style={[
                        styles.text,
                        {
                          color: theme.colors.secondary,
                          fontSize: moderateScale(19),
                        },
                      ]}
                    >
                      {" "}
                      {translate("Forget Password")} ?{" "}
                    </Text>
                    <Text
                      style={[styles.text, { color: theme.colors.secondary }]}
                    >
                      {translate(
                        "Please enter your email to reset your password."
                      )}
                    </Text>

                    <View
                      resizeMode="stretch"
                      source={require("app/assets/inputback.png")}
                      style={{
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        width: "100%",
                        height: 45,
                        marginBottom: 10,
                        backgroundColor: theme.colors.gray06,
                        borderRadius: moderateScale(10),
                      }}
                    >
                      <Icon
                        name="user"
                        size={25}
                        style={{
                          position: "relative",
                          top: 0,
                          bottom: 0,
                          right: 0,
                          left: 0,
                          marginStart: 45,
                        }}
                        color={theme.colors.gray03}
                      />
                      <TextInput
                        label={translate("Email")}
                        style={{
                          height: 45,
                          marginStart: 10,
                          paddingStart: 10,
                          marginTop: 12,
                          width: "85%",
                          ...(I18nManager.isRTL ? { textAlign: "right" } : {}),
                        }}
                        returnKeyType="next"
                        value={this.state.email}
                        placeholder={translate("Email")}
                        inputStyle={{
                          textAlignVertical: "center",
                          height: "100%",
                          ...(I18nManager.isRTL ? { textAlign: "right" } : {}),
                        }}
                        onChangeText={(value) =>
                          this.setState({ email: value })
                        }
                        autoCapitalize="none"
                        autoCompleteType="email"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                      />
                    </View>

                    <Button
                      mode="contained"
                      onPress={this.resendCode}
                      isLoading={this.state.resend || this.state.isLoading}
                      style={{
                        borderColor: "transparent",
                        color: theme.colors.white,
                        borderRadius: 5,
                        width: "100%",
                        backgroundColor: theme.colors.secondary,
                        borderRadius: moderateScale(10),
                      }}
                      textStyle={{
                        fontSize: moderateScale(20),
                        color: theme.colors.white,
                        lineHeight: 26,
                        fontWeight: "bold",
                      }}
                    >
                      {translate("Submit")}
                    </Button>
                  </Animated.View>
                </ImageBackground>
              </View>
            )}
            {this.state.emailSent && (
              <View
                style={[styles.container, { marginTop: moderateScale(-140) }]}
              >
                <Animated.View
                  style={{
                    position: "absolute",
                    width: "95%",
                    alignItems: "center",
                    alignContent: "center",
                    alignSelf: "center",
                    opacity: this.state.verificationCode,
                    padding: moderateScale(15),
                  }}
                >
                  <View
                    style={{
                      width: "95%",
                      height: "95%",
                      alignItems: "center",
                      alignContent: "center",
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={[
                        styles.text,
                        {
                          color: theme.colors.secondary,
                          fontSize: moderateScale(23),
                        },
                      ]}
                    >
                      {" "}
                      {translate("Success!")}{" "}
                    </Text>
                    <Text
                      style={[styles.text, { color: theme.colors.primary }]}
                    >
                      {translate(this.state.message)}
                    </Text>
                  </View>
                </Animated.View>
              </View>
            )}
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
    color: theme.colors.grayText,
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
    paddingTop: 0,
    marginBottom: 100,
    marginTop: 35,
    padding: 20,
    borderRadius: 0,
    width: "100%",
    maxWidth: 380,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  transparentButton: {
    fontSize: 20,
    height: 30,
    position: "absolute",
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
)(ForgetPassword);
