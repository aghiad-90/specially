import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Constants from "expo-constants";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "react-native-google-signin";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  StatusBar,
  Animated,
  Dimensions,
} from "react-native";
import { Text } from "../../../../components/widget";
import { theme } from "../../../../core/theme";

import { showDanger, showInfo } from "../../../../utils/utils";
import { NavigationActions, StackActions } from "react-navigation";
import * as loginActions from "../../../../actions/Actions";
import { saveToken } from "../../../../utils/storage";

const FBSDK = require("react-native-fbsdk");
const { AccessToken, GraphRequest, GraphRequestManager, LoginManager } = FBSDK;

/**
 *
 */

class SocialLogin extends Component {
  state = {
    isLoading: false,
    facebookLoading: false,
    googleLoading: false,
    login: 100,
    register: 0,
    email: "mhd.asif@crowd-ae.com",
    password: "123456781",
    top: new Animated.Value(0),
    center: new Animated.Value(0),
    bottom: new Animated.Value(0),
  };
  constructor(props) {
    super(props);
    state = {
      isLoading: false,
      facebookLoading: false,
      googleLoading: false,
      login: 100,
      register: 0,
      email: "",
      password: "",
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
   *
   */
  _configureGoogleSignIn() {
    GoogleSignin.configure({
      webClientId:
        "726431490598-il6eff2jlcml91j36v33t86ta427tnlm.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
      // offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // hostedDomain: '', // specifies a hosted domain restriction
      // loginHint: 'Coboney', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      // forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
      // accountName: 'Coboney', // [Android] specifies an account name on the device that should be used
      iosClientId:
        "com.googleusercontent.apps.726431490598-il6eff2jlcml91j36v33t86ta427tnlm", // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
  }

  /**
   * google Sign in
   */
  async googleSignIn() {
    try {
      // this.setState({ isLoading: true });
      // await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ isLoading: false });
    } catch (error) {
      // console.log(error)
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }

  /**
   * Facebook Sign in
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
              // console.log('login info has error: ' + error);
            } else {
              // console.log('result:', result);

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
                showDanger("Invalid Email Association");
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

  /**
   * @typedef {Function}
   * @param {Objecct} data in case of Success
   */

  onSuccess = async (data) => {
    // console.log('LoginApi', data);
    this.setState({ isLoading: false, facebookLoading: false });
    if (data.code === 200) {
      if (data.data.token && data.data.token.length > 0) {
        await saveToken(data.data.token).then((isSuccess) => {
          if (isSuccess && data.code === 200) {
            // console.log('Token Saved', isSuccess)
            const { navigation } = this.props;
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: "Dashboard" })],
            });
            navigation.dispatch(resetAction);
          } else {
            this.props.navigation.navigate("EmailVerification", {
              email: this.state.email,
              password: this.state.password,
            });
          }
        });
      } else if (data.code === -3) {
        this.props.navigation.navigate("EmailVerification", {
          email: this.state.email,
          password: this.state.password,
        });
      } else {
        this.inputRefs.password.shake();
        this.inputRefs.email.shake();
        showInfo(data.message);
      }
    } else if (data.code === -3) {
      this.props.navigation.navigate("EmailVerification", {
        email: this.state.email,
        password: this.state.password,
      });
    } else {
      this.inputRefs.password.shake();
      this.inputRefs.email.shake();
      showInfo(data.message);
    }
  };

  /**
   *@typedef {Function}
   * @param {Object} error in Case of Failure.
   */
  onError = (error) => {
    this.setState({ isLoading: false });
    // console.log(error)
  };

  render() {
    let { top, center, bottom } = this.state;
    return (
      <View>
        <Animated.View style={{ opacity: top }}>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              minHeight: this.layoutHeight,
            }}
          >
            <Animated.View
              style={[styles.separatorContainer, { opacity: bottom }]}
            >
              <View style={styles.separatorLine} />
              <Text style={styles.separatorOr}>{"Sign in with"}</Text>
              <View style={styles.separatorLine} />
            </Animated.View>

            <Animated.View
              style={[styles.containerSocial, { opacity: bottom }]}
            >
              <TouchableOpacity
                disabled={this.state.googleLoading || this.state.isLoading}
                style={[
                  styles.FacebookStyle,
                  {
                    opacity:
                      this.state.googleLoading || this.state.isLoading
                        ? 0.5
                        : 1,
                  },
                ]}
                activeOpacity={0.5}
                onPress={() => this.facebookSignIn()}
              >
                <Image
                  source={{
                    uri:
                      "https://raw.githubusercontent.com/AboutReact/sampleresource/master/facebook.png",
                  }}
                  style={[
                    styles.ImageIconStyle,
                    { tintColor: "#ffffff", marginStart: 6 },
                  ]}
                />
                <View style={styles.SeparatorLine} />
                <Text style={styles.TextStyle}>
                  {" "}
                  {"Sign in with Facebook"}{" "}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={this.state.facebookLoading || this.state.isLoading}
                style={[
                  styles.GooglePlusStyle,
                  {
                    opacity:
                      this.state.facebookLoading || this.state.isLoading
                        ? 0.5
                        : 1,
                  },
                ]}
                onPress={() => this.googleSignIn()}
              >
                <Image
                  source={{
                    uri:
                      "https://raw.githubusercontent.com/AboutReact/sampleresource/master/google-plus.png",
                  }}
                  style={[
                    styles.ImageIconStyle,
                    { tintColor: "#ffffff", marginStart: 10 },
                  ]}
                />
                <View style={styles.SeparatorLine} />
                <Text style={styles.TextStyle}> {"Sign in with Google"} </Text>
              </TouchableOpacity>
            </Animated.View>
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
    marginTop: Constants.statusBarHeight,
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 10,
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
    // borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
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
    borderColor: theme.colors.gray,
    borderWidth: 0.5,
  },
  separatorOr: {
    color: theme.colors.secondary,
    marginHorizontal: 20,
    fontSize: 18,
  },
  transparentButton: {
    marginTop: 30,
    borderColor: "#3B5699",
    borderWidth: 2,
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
    width: "90%",
    flexDirection: "column",
  },
  GooglePlusStyle: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: '#dc4e41',
    backgroundColor: theme.colors.secondary,
    borderWidth: 1,
    borderColor: theme.colors.black,
    height: 40,
    borderRadius: 5,
    margin: 5,
  },
  FacebookStyle: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: '#485a96',
    backgroundColor: theme.colors.secondary,
    borderWidth: 1,
    borderColor: theme.colors.black,
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
    marginTop: 1,
    fontWeight: "600",
    marginStart: 10,
    marginRight: 20,
  },
  SeparatorLine: {
    backgroundColor: theme.colors.black,
    width: 1,
    height: 40,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(SocialLogin));
