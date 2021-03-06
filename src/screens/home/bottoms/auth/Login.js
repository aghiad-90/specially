import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { GoogleSignin, statusCodes } from "react-native-google-signin";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  StatusBar,
  Animated,
  ScrollView,
  Dimensions,
  I18nManager,
} from "react-native";
// import Button from '../Button';
import Button from "apsl-react-native-button";
import { Input } from "react-native-elements";
import { Text } from "../../../../components/widget";
import { theme } from "../../../../core/theme";
import Icon from "react-native-vector-icons/FontAwesome";

import { showDanger, showInfo, translate } from "../../../../utils/utils";
import * as loginActions from "../../../../actions/Actions";
import Header from "../childs/Header";
import { moderateScale } from "react-native-size-matters";
import { CachedImage } from "react-native-cached-image";

const FBSDK = require("react-native-fbsdk");
const { AccessToken, GraphRequest, GraphRequestManager, LoginManager } = FBSDK;

/**
 * Login Page with Sign in Methods
 */

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      facebookLoading: false,
      googleLoading: false,
      login: 100,
      register: 0,
      email: "geeksera.online@gmail.com",
      password: "a12345678",
      top: new Animated.Value(0),
      center: new Animated.Value(0),
      bottom: new Animated.Value(0),
    };

    this.inputRefs = {
      email: null,
      password: null,
    };
  }

  /**
   * start the Animation
   */

  async componentDidMount() {
    Animated.timing(this.state.top, {
      toValue: 1,
      duration: 50,
    }).start();

    setTimeout(() => {
      Animated.timing(this.state.center, {
        toValue: 1,
        duration: 500,
      }).start();
    }, 100);

    setTimeout(() => {
      Animated.timing(this.state.bottom, {
        toValue: 1,
        duration: 1000,
      }).start();
    }, 500);
    this._configureGoogleSignIn();
  }

  /**
   * the Configuration of Google
   */
  _configureGoogleSignIn() {
    GoogleSignin.configure({
      webClientId:
        "133570530718-0i99i74i307rngog76khao2ln9c8de5q.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // hostedDomain: '', // specifies a hosted domain restriction
      loginHint: translate("Mahalaty"), // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      // forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
      accountName: translate("Mahalaty"), // [Android] specifies an account name on the device that should be used
      iosClientId:
        "133570530718-0i99i74i307rngog76khao2ln9c8de5q.apps.googleusercontent.com", // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
  }

  /**
   * setting the user info from Google after getting the response
   */

  async googleSignIn() {
    try {
      this.setState({ googleLoading: true });
      // await GoogleSignin.hasPlayServices();
      console.log("we are moving");
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      this.setState({ googleLoading: false });

      var postData = {};
      if (userInfo.user.name) {
        postData.firstName = userInfo.user.name.toString().split(" ")[0];
      } else {
        postData.firstName = "-";
      }

      if (userInfo.user.name.split(" ")[1]) {
        postData.lastName = userInfo.user.name.toString().split(" ")[1];
      } else {
        postData.lastName = "-";
      }

      if (userInfo.user.name) {
        postData.email = userInfo.user.email;
      } else {
        postData.email = "-";
        showDanger(translate("InvalidEmailAssociation"));
      }
      if (userInfo.user.photo) {
        postData.profile = userInfo.user.photo;
      }
      console.log(postData);

      this.props.actions.login.social(postData, this.onSuccess, this.onError);
    } catch (error) {
      console.log(error);
      // showDanger(error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        this.setState({ googleLoading: false });
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        this.setState({ googleLoading: false });
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        this.setState({ googleLoading: false });
        // play services not available or outdated
      } else {
        this.setState({ googleLoading: false });
        // some other error happened
      }
    }
  }

  /**
   *@function
   * @param {Object} result the info from the form
   */
  appleSignIn = (result) => {
    this.setState({ facebookLoading: true });

    if (result.email) {
      var postData = {};
      if (result.fullName) {
        postData.firstName = result.fullName;
      } else {
        postData.firstName = "-";
      }
      if (result.last_name) {
        postData.lastName = result.last_name;
      } else {
        postData.lastName = "-";
      }
      if (result.email) {
        postData.email = result.email;
      } else {
        showDanger(translate("InvalidEmailAssociation"));
        return;
      }
      postData.profile = "";

      this.props.actions.login.social(postData, this.onSuccess, this.onError);
    } else {
      this.setState({ facebookLoading: false });
      // showDanger(translate('InvalidEmailAssociation'));
    }
  };

  /**
   * sing in with facebok
   */
  async facebookSignIn() {
    this.setState({ facebookLoading: true });
    var results = await LoginManager.logInWithPermissions([
      "public_profile",
      "email",
    ]).then(
      function(result) {
        return result;
      },
      function(error) {
        return null;
      }
    );

    // console.log(results);

    if (results.isCancelled || !results) {
      this.setState({ facebookLoading: false });
    } else {
      await AccessToken.getCurrentAccessToken().then((data) => {
        const accessToken = data.accessToken.toString();
        const PROFILE_REQUEST_PARAMS = {
          fields: {
            string: "id,name,first_name,last_name,email,picture",
          },
        };
        const profileRequest = new GraphRequest(
          "/me",
          { accessToken, parameters: PROFILE_REQUEST_PARAMS },
          (error, result) => {
            if (error) {
              this.setState({ facebookLoading: false });
              console.log("login info has error: " + error);
            } else {
              console.log("result:", result);

              var postData = {};
              if (result.first_name) {
                postData.firstName = result.first_name;
              } else {
                postData.firstName = "-";
              }
              if (result.last_name) {
                postData.lastName = result.last_name;
              } else {
                postData.lastName = "-";
              }
              if (result.email) {
                postData.email = result.email;
              } else {
                showDanger(translate("InvalidEmailAssociation"));
                return;
              }
              if (result.id) {
                postData.profile =
                  "http://graph.facebook.com/" +
                  result.id +
                  "/picture?type=large&height=320&width=420";
              }

              this.props.actions.login.social(
                postData,
                this.onSuccess,
                this.onError
              );
            }
          }
        );
        new GraphRequestManager().addRequest(profileRequest).start();
      });
    }
  }

  onSuccess = async (data) => {
    console.log("LoginApi", data);
    this.setState({ isLoading: false, facebookLoading: false });
    setTimeout(() => {
      this.props.actions.login.refreashApp({});
      this.props.actions.login.refreashNotifications();
      this.props.actions.login.refreashHome();
    }, 200);
    this.props.navigation.pop();
  };
  onError = (error) => {
    this.setState({ isLoading: false });
    console.log(error);
    showDanger(error.message);
  };

  /**
   *
   * @param {Date} date1
   * @param {Date} date2
   * @param {Date} days
   * @returns it will return true of false
   */
  isItGreaterThan(date1, date2, days) {
    var firstDate = new Date(date1);
    var secondDate = new Date(date2);
    var time = days * 60 * 60 * 24 * 1000;
    if (secondDate.getTime() - firstDate.getTime() < time) {
      console.log({ dateCheck: `Not greater than ${days} days` });
      return false;
    } else {
      console.log({ dateCheck: `Greater than ${days} days` });
      return true;
    }
  }

  onPress() {
    if (this.state.email === "") {
      this.inputRefs.email.shake();
      showDanger(translate("Email or Username is required!"));
      return;
    }
    if (this.state.password === "") {
      this.inputRefs.password.shake();
      showDanger(translate("invalid Password!"));
      return;
    }

    this.setState({ isLoading: true });
    this.props.actions.login.login(
      { email: this.state.email, password: this.state.password },
      this.onSuccess,
      this.onError
    );

    this.setState({ isLoading: true });
  }
  layoutHeight = 700;
  render() {
    let { top, center, bottom } = this.state;
    if (Dimensions.get("window").height > 700) {
      this.layoutHeight = 700;
    } else {
      this.layoutHeight = 550;
    }
    return (
      <View style={styles.container_scrolling}>
        <StatusBar backgroundColor="transparent" barStyle="light-content" />
        <Header
          search={false}
          back={true}
          navigation={this.props.navigation}
          logo={false}
          backclick={() => {
            this.props.navigation.pop();
          }}
        />
        <Animated.View style={{ opacity: top }}>
          <View style={{ width: "100%", height: "100%" }}>
            <View style={{ flex: 1 }} />
            <Animated.View style={{ opacity: top, flex: this.state.login }}>
              <View style={[styles.container, { flex: this.state.login }]}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{
                    width: "100%",
                    height: "100%",
                    flexGrow: 1,
                    flex: 1,
                  }}
                  contentContainerStyle={{
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CachedImage
                    source={require("app/assets/assets/logwithname.png")}
                    resizeMode="contain"
                    style={{
                      height: moderateScale(110),
                      width: moderateScale(150),
                      marginBottom: moderateScale(0),
                    }}
                  />
                  <Text
                    bold
                    style={{
                      marginBottom: moderateScale(15),
                      fontSize: moderateScale(25),
                      color: theme.colors.secondary,
                    }}
                  >
                    {translate("Login")}
                  </Text>
                  <View
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                      borderWidth: moderateScale(1),
                      borderColor: theme.colors.primary,
                      borderRadius: moderateScale(10),
                      paddingVertical: moderateScale(20),
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        paddingStart: "5%",
                        paddingEnd: "5%",
                      }}
                    >
                      <Animated.View
                        style={{
                          opacity: center,
                          backgroundColor: "transparnet",
                          width: "100%",
                        }}
                      >
                        <Input
                          labelStyle={{ color: theme.colors.secondary }}
                          containerStyle={{ paddingLeft: 0, paddingRight: 0 }}
                          inputContainerStyle={{
                            width: "100%",
                            width: "100%",
                            height: 45,
                            ...(I18nManager.isRTL ? { paddingRight: 10 } : {}),
                            borderBottomWidth: 0,
                            backgroundColor: theme.colors.gray06,
                            borderRadius: moderateScale(10),
                            marginTop: moderateScale(20),
                          }}
                          ref={(input) => {
                            this.inputRefs.email = input;
                          }}
                          returnKeyType="next"
                          inputStyle={{
                            textAlignVertical: "center",
                            height: "100%",
                            ...(I18nManager.isRTL
                              ? { textAlign: "right" }
                              : {}),
                          }}
                          containerStyle={{ paddingLeft: 0, paddingRight: 0 }}
                          onSubmitEditing={() => {
                            this.inputRefs.password.focus();
                          }}
                          leftIcon={
                            <Icon
                              name="user"
                              size={22}
                              style={{ marginEnd: 10 }}
                              color={theme.colors.gray03}
                            />
                          }
                          placeholder={translate("Email or Username")}
                          value={this.state.email}
                          onChangeText={(value) =>
                            this.setState({ email: value })
                          }
                        />

                        <Input
                          labelStyle={{ color: theme.colors.secondary }}
                          containerStyle={{ paddingLeft: 0, paddingRight: 0 }}
                          inputContainerStyle={{
                            width: "100%",
                            width: "100%",
                            height: 45,
                            ...(I18nManager.isRTL ? { paddingRight: 10 } : {}),
                            borderBottomWidth: 0,
                            backgroundColor: theme.colors.gray06,
                            marginTop: moderateScale(10),
                            borderRadius: moderateScale(10),
                          }}
                          inputStyle={{
                            textAlignVertical: "center",
                            height: "100%",
                            ...(I18nManager.isRTL
                              ? { textAlign: "right" }
                              : {}),
                          }}
                          ref={(input) => {
                            this.inputRefs.password = input;
                          }}
                          returnKeyType="next"
                          onSubmitEditing={() => {
                            this.onPress();
                          }}
                          leftIcon={
                            <Icon
                              name="lock"
                              size={22}
                              style={{ marginEnd: 10 }}
                              color={theme.colors.gray03}
                            />
                          }
                          placeholder="*******"
                          value={this.state.password}
                          onChangeText={(value) =>
                            this.setState({ password: value })
                          }
                          secureTextEntry
                        />

                        <Button
                          mode="contained"
                          isDisabled={
                            this.state.facebookLoading ||
                            this.state.googleLoading
                          }
                          activityIndicatorColor={theme.colors.primary}
                          isLoading={this.state.isLoading}
                          style={{
                            borderColor: "transparent",
                            color: theme.colors.white,
                            borderRadius: moderateScale(10),
                            backgroundColor: theme.colors.secondary,
                            marginTop: moderateScale(20),
                          }}
                          textStyle={{
                            fontSize: moderateScale(20),
                            color: theme.colors.white,
                            fontWeight: "bold",
                          }}
                          onPress={() => this.onPress()}
                        >
                          {translate("Login")}
                        </Button>

                        <View
                          style={[
                            styles.forgotPassword,
                            {
                              alignItems: "flex-start",
                              alignContent: "flex-start",
                              ...(I18nManager.isRTL
                                ? { alignSelf: "flex-end" }
                                : { alignSelf: "flex-start" }),
                            },
                          ]}
                        >
                          <TouchableOpacity
                            style={{ width: "100%" }}
                            onPress={() => {
                              this.props.navigation.navigate("ForgetPassword");
                            }}
                          >
                            <Text
                              style={[
                                styles.label,
                                {
                                  ...(I18nManager.isRTL
                                    ? { textAlign: "right", width: "100%" }
                                    : { textAlign: "left", width: "100%" }),
                                  color: theme.colors.secondary,
                                  width: "100%",
                                },
                              ]}
                            >
                              {translate("Forget Password")}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </Animated.View>
                    </View>
                    {/* 
                                        <Animated.View style={[styles.separatorContainer, { opacity: bottom }]} >
                                            <View style={styles.separatorLine} />
                                            <Text style={styles.separatorOr}>{translate('or')}</Text>
                                            <View style={styles.separatorLine} />
                                        </Animated.View>
                                        <Animated.View style={[styles.containerSocial, { opacity: bottom }]}>
                                            <TouchableOpacity disabled={this.state.googleLoading || this.state.isLoading} style={[styles.FacebookStyle, { opacity: this.state.googleLoading || this.state.isLoading ? 0.5 : 1 }, { borderRadius: moderateScale(10) }]} activeOpacity={0.5} onPress={() => this.facebookSignIn()}>
                                                <CachedImage
                                                    source={{
                                                        uri:
                                                            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/facebook.png',
                                                    }}
                                                    style={[styles.ImageIconStyle, { tintColor: '#3b5998', marginHorizontal: 10 }]}
                                                />
                                                <View style={styles.SeparatorLine} />
                                                <Text style={[styles.TextStyle, { ...I18nManager.isRTL ? { textAlign: 'left' } : {} }]}> {translate('Facebook')} </Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity disabled={this.state.facebookLoading || this.state.isLoading} style={[styles.GooglePlusStyle, {
                                                opacity: this.state.facebookLoading
                                                    || this.state.isLoading ? 0.5 : 1
                                            }, { borderRadius: moderateScale(10) }]} onPress={() => this.googleSignIn()}>
                                                <CachedImage
                                                    source={{
                                                        uri:
                                                            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/google-plus.png',
                                                    }}
                                                    style={[styles.ImageIconStyle, { tintColor: '#dc4e41', marginHorizontal: 10 }]}
                                                />
                                                <View style={styles.SeparatorLine} />
                                                <Text style={[styles.TextStyle, { ...I18nManager.isRTL ? { textAlign: 'left' } : {} }]}> {translate('Google')} </Text>
                                            </TouchableOpacity>
                                        </Animated.View> */}
                  </View>

                  <View>
                    <View
                      resizeMode="contain"
                      source={require("app/assets/backreg.png")}
                      style={{
                        width: "100%",
                        marginTop: moderateScale(20),
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          this.props.navigation.navigate("Register");
                        }}
                      >
                        <Text
                          bold
                          style={{
                            color: theme.colors.secondary,
                            fontSize: moderateScale(20),
                            textAlign: "center",
                          }}
                        >
                          {translate("Register Now")}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ScrollView>
                <View
                  style={{
                    backgroundColor: theme.colors.primary,
                    height: 5,
                    width: "100%",
                    zIndex: 2,
                    position: "absolute",
                    bottom: 0,
                  }}
                />
              </View>
            </Animated.View>
            <View style={{ flex: 10 }} />
          </View>
        </Animated.View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      login: bindActionCreators(loginActions, dispatch),
    },
  };
};

const styles = StyleSheet.create({
  container_scrolling: {
    flex: 1,
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: moderateScale(10),
    marginHorizontal: moderateScale(10),
  },
  row: {
    flexDirection: "row",
    marginTop: 0,
  },
  label: {
    color: theme.colors.gray04,
  },
  labelOr: {
    marginBottom: 10,
    fontSize: 20,
    marginTop: 10,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  container: {
    flex: 1,
    paddingEnd: 15,
    paddingStart: 15,
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  separatorContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 10,
  },
  separatorLine: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    height: StyleSheet.hairlineWidth,
    borderColor: theme.colors.secondary,
    borderWidth: 0.5,
    marginHorizontal: 10,
  },
  separatorOr: {
    color: theme.colors.primary,
    marginHorizontal: 20,
    fontSize: moderateScale(20),
  },
  transparentButton: {
    marginTop: 30,
    borderColor: "#3B5699",
    borderWidth: 2,
  },
  inline: {
    flexDirection: "row",
  },
  appleBtn: { height: 44, width: "100%", marginTop: 10 },
  buttonBlueText: {
    fontSize: 20,
    color: "#3B5699",
  },
  buttonBigText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  containerSocial: {
    width: "90%",
    flexDirection: "column",
  },
  GooglePlusStyle: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.gray07,
    borderWidth: 0,
    height: 40,
    borderRadius: 0,
    margin: 5,
  },
  Apple: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0,
    height: 40,
    borderRadius: 0,
    margin: 5,
  },
  FacebookStyle: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.gray07,
    borderWidth: 0,
    height: 40,
    margin: 5,
  },
  ImageIconStyle: {
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignSelf: "center",
    marginEnd: moderateScale(15),
    marginStart: moderateScale(5),
  },
  TextStyle: {
    color: theme.colors.black,
    marginTop: 1,
    fontWeight: "600",
    marginStart: 10,
    marginRight: 20,
  },
  SeparatorLine: {
    backgroundColor: theme.colors.secondary,
    width: 1,
    height: 34,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Login));
