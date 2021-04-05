import React, { Component } from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import { clearUser, setUser, getToken } from "../../utils/storage";
import { setToken } from "../..//services/api";
import * as loginActions from "../../actions/Actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavigationActions, StackActions } from "react-navigation";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

/**
 * Splash Screeen
 */

class Splash extends Component {
  /**
   * Call ChechSignIn Function
   */

  componentDidMount() {
    this.checkSignInStatus();
  }

  /**
   * @typedef {Funciton}
   * @param {Object} response getting the user in case of success.
   */

  onSuccess = (response) => {
    console.log("SplashOnresponse", response);
    let routeName = "home";
    setUser(response);
    setTimeout(() => {
      const options = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
      };

      ReactNativeHapticFeedback.trigger("impactLight", options);
      const { navigation } = this.props;
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: routeName })],
      });
      navigation.dispatch(resetAction);
    }, 1000);
  };

  /**
   * @typedef {Function}
   * @param {Object} error getting the Error Message in case of Failure.
   */

  onError = (error) => {
    console.log("SplashOnError", error);
    try {
      const options = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
      };

      ReactNativeHapticFeedback.trigger("impactLight", options);
      clearUser();
      const { navigation } = this.props;
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "home" })],
      });
      navigation.dispatch(resetAction);
    } catch (e) {
      this.setState({});
    }
  };

  /**
   * Funciton Called by ComponentDidMount to check the sign in Status
   */
  checkSignInStatus() {
    setTimeout(() => {
      getToken().then((token) => {
        if (token && token !== "") {
          setToken(token);
          this.props.actions.user.fetchUserInfo(this.onSuccess, this.onError);
        } else {
          this.props.actions.user.fetchUserInfo(this.onSuccess, this.onError);
        }
      });
    }, 3000);
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("app/assets/assets/splashimag.gif")}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    user: bindActionCreators(loginActions, dispatch),
  },
});
export default connect(
  null,
  mapDispatchToProps
)(Splash);
