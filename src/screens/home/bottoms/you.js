import React, { Component } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  Image,
  I18nManager,
  Linking,
} from "react-native";
import { theme } from "../../../core/theme";
import { Block, Text } from "../../../components/widget";
import * as loginActions from "../../../actions/Actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { moderateScale } from "react-native-size-matters";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import { clearToken } from "../../../utils/storage";
import { setToken } from "../../../services/api";
import { translate } from "../../../utils/utils";
import CeleberatyHeader from "./childs/CeleberatyHeader";
import Header from "./childs/Header";
import GuestHeader from "./childs/GuestHeader";

/**
 * Profile Settings Screen
 */

class You extends Component {
  state = {
    Wishlist: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      list: [],
      modalVisible: false,
      selectedProduct: {},
      page: 0,
      lastindex: -1,
      animatingLoadMore: false,
      noMoreProducts: false,
      somethingWentWrong: false,
    };

    this.hideModel = this.hideModel.bind(this);
  }

  /**
   *
   */

  hideModel() {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  /**
   *
   */

  componentDidMount() {
    this.setState({ isLoading: true, animating: true });
  }

  componentWillReceiveProps(nextProps) {}

  render() {
    return (
      <Block>
        <StatusBar backgroundColor="transparent" barStyle="light-content" />
        <View
          style={{
            backgroundColor: "transparent",
            position: "absolute",
            zIndex: 100,
            width: "100%",
            backgroundColor: theme.colors.primary,
          }}
        >
          <Header
            logoleft={true}
            navigation={this.props.navigation}
            search={true}
            notification={true}
          />
        </View>

        <View style={{ marginTop: getStatusBarHeight() + moderateScale(50) }} />
        <CeleberatyHeader {...this.props} />
        <GuestHeader {...this.props} />

        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            width: "100%",
            alignSelf: "center",
          }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
              width: "100%",
            }}
            style={{
              width: "90%",
              marginTop: moderateScale(10),
              paddingTop: moderateScale(20),
            }}
          >
            {/* <View style={{ margin: moderateScale(10), width: '100%', zIndex: 1, backgroundColor: 'transparent' }}>
                            <View style={{
                                flexDirection: 'column', alignItems: 'center', justifyContent: 'center', alignContent: 'center', marginTop: moderateScale(10), borderColor: theme.colors.primary,
                                borderRadius: moderateScale(10), paddingVertical: moderateScale(10), marginHorizontal: moderateScale(10), backgroundColor: 'transparent',
                            }}>
                                <View style={{ width: '100%', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginBottom: moderateScale(0) }}>
                                    <Image source={require('app/assets/assets/logwithname.png')} resizeMode="contain" style={{ height: moderateScale(100), width: moderateScale(150), marginBottom: moderateScale(0) }} />
                                </View>
                            </View>
                        </View> */}

            {!this.props.data.userInfo.email && (
              <View
                style={{
                  width: "80%",
                  backgroundColor: theme.colors.secondary,
                  borderRadius: moderateScale(10),
                  marginBottom: moderateScale(10),
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("Login");
                  }}
                >
                  <View style={{ padding: moderateScale(7) }}>
                    <View
                      onPress={() => {
                        this.props.navigation.navigate("Login");
                      }}
                    >
                      <Text
                        bold
                        style={{
                          color: theme.colors.white,
                          fontSize: moderateScale(15),
                          fontWeight: "bold",
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                      >
                        {translate("LOGIN/REGISTER")}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}

            {!!!this.props.data.userInfo.email && (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("bePartner");
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "80%",
                  marginBottom: moderateScale(20),
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: moderateScale(20),
                    width: "100%",
                    backgroundColor: theme.colors.secondary,
                    borderRadius: moderateScale(10),
                  }}
                >
                  <Image
                    source={require("app/assets/assets/partner.png")}
                    resizeMode="contain"
                    style={{
                      height: moderateScale(20),
                      width: moderateScale(20),
                      ...(I18nManager.isRTL
                        ? { transform: [{ rotate: "180deg" }] }
                        : {}),
                      tintColor: theme.colors.primary,
                    }}
                  />
                  <Text
                    semibold
                    style={{
                      ...(I18nManager.isRTL
                        ? { textAlign: "center" }
                        : { textAlign: "center" }),
                      color: theme.colors.white,
                      fontSize: moderateScale(15),
                      padding: moderateScale(7),
                      flex: 1,
                      fontWeight: "bold",
                      paddingRight: moderateScale(20),
                      textTransform: "capitalize",
                    }}
                  >
                    {translate("VIP Membership")}
                  </Text>
                </View>
              </TouchableOpacity>
            )

            // <View style={{ width: '80%', backgroundColor: theme.colors.secondary, borderRadius: moderateScale(10), marginBottom: moderateScale(20) }}>
            //     <TouchableOpacity onPress={() => { this.props.navigation.navigate('Login') }}>
            //         <View
            //             style={{ padding: moderateScale(7) }}>
            //             <View onPress={() => { this.props.navigation.navigate('Login') }}>
            //                 <Text bold style={{ color: theme.colors.white, fontSize: moderateScale(15), fontWeight: 'bold', textAlign: 'center' }}>{translate('LOGIN/REGISTER')}</Text>
            //             </View>
            //         </View>
            //     </TouchableOpacity>
            // </View>
            }

            <View
              style={{
                width: "105%",
                flex: 1,
                marginTop: moderateScale(0),
                paddingTop: moderateScale(0),
                alignItems: "center",
              }}
            >
              {this.props.data.userInfo.email && (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("Profile");
                  }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: moderateScale(20),
                      width: "100%",
                      borderBottomColor: theme.colors.primary,
                      borderBottomWidth: moderateScale(0.8),
                    }}
                  >
                    <Image
                      source={require("app/assets/assets/profile.png")}
                      resizeMode="contain"
                      style={{
                        height: moderateScale(40),
                        width: moderateScale(40),
                        ...(I18nManager.isRTL
                          ? { transform: [{ rotate: "180deg" }] }
                          : {}),
                      }}
                    />
                    <Text
                      semibold
                      style={{
                        ...(I18nManager.isRTL
                          ? { textAlign: "right" }
                          : { textAlign: "left" }),
                        color: theme.colors.secondary,
                        fontSize: moderateScale(16),
                        padding: moderateScale(10),
                        flex: 1,
                        fontWeight: "bold",
                        paddingRight: moderateScale(70),
                      }}
                    >
                      {translate("My Profile")}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}

              {/* {this.props.data.userInfo.email && this.props.data.userInfo.role !== 'user' &&
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Gallery') }} style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: moderateScale(20), width: '100%', borderBottomColor: theme.colors.primary, borderBottomWidth: moderateScale(0.8) }}>
                                        <Image source={require('app/assets/assets/gallery.png')} resizeMode="contain" style={{ height: moderateScale(40), width: moderateScale(40), ...I18nManager.isRTL ? { transform: [{ rotate: '180deg' }] } : {}, }} />
                                        <Text semibold style={{ ...I18nManager.isRTL ? { textAlign: 'right' } : { textAlign: 'left' }, color: theme.colors.secondary, fontSize: moderateScale(16), padding: moderateScale(10), flex: 1, fontWeight: 'bold', paddingRight: moderateScale(70) }}>{translate('My Gallery')}</Text>
                                    </View>
                                </TouchableOpacity>
                            } */}

              {this.props.data.userInfo.email &&
                this.props.data.userInfo.role !== "user" && (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("Dashboard");
                    }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: moderateScale(20),
                        width: "100%",
                        borderBottomColor: theme.colors.primary,
                        borderBottomWidth: moderateScale(0.8),
                      }}
                    >
                      <Image
                        source={require("app/assets/assets/dashboard.png")}
                        resizeMode="contain"
                        style={{
                          height: moderateScale(40),
                          width: moderateScale(40),
                          ...(I18nManager.isRTL
                            ? { transform: [{ rotate: "180deg" }] }
                            : {}),
                        }}
                      />
                      <Text
                        semibold
                        style={{
                          ...(I18nManager.isRTL
                            ? { textAlign: "right" }
                            : { textAlign: "left" }),
                          color: theme.colors.secondary,
                          fontSize: moderateScale(16),
                          padding: moderateScale(10),
                          flex: 1,
                          fontWeight: "bold",
                          paddingRight: moderateScale(70),
                        }}
                      >
                        {translate("Artist Dashboard")}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}

              {this.props.data.userInfo.email &&
                this.props.data.userInfo.role === "user" && (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("MyRequests");
                    }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: moderateScale(20),
                        width: "100%",
                        borderBottomColor: theme.colors.primary,
                        borderBottomWidth: moderateScale(0.8),
                      }}
                    >
                      <Image
                        source={require("app/assets/assets/dashboard.png")}
                        resizeMode="contain"
                        style={{
                          height: moderateScale(40),
                          width: moderateScale(40),
                          ...(I18nManager.isRTL
                            ? { transform: [{ rotate: "180deg" }] }
                            : {}),
                        }}
                      />
                      <Text
                        semibold
                        style={{
                          ...(I18nManager.isRTL
                            ? { textAlign: "right" }
                            : { textAlign: "left" }),
                          color: theme.colors.secondary,
                          fontSize: moderateScale(16),
                          padding: moderateScale(10),
                          flex: 1,
                          fontWeight: "bold",
                          paddingRight: moderateScale(70),
                        }}
                      >
                        {translate("My Requests")}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}

              <TouchableOpacity
                onPress={() => {
                  let url =
                    "whatsapp://send?text=" + "" + "&phone=" + "+971528132016";
                  Linking.openURL(url)
                    .then((data) => {
                      console.log("WhatsApp Opened");
                    })
                    .catch(() => {
                      alert("Make sure WhatsApp installed on your device");
                    });
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: moderateScale(20),
                    width: "100%",
                    borderBottomColor: theme.colors.primary,
                    borderBottomWidth: moderateScale(0.8),
                  }}
                >
                  <Image
                    source={require("app/assets/assets/dashboard.png")}
                    resizeMode="contain"
                    style={{
                      height: moderateScale(40),
                      width: moderateScale(40),
                      ...(I18nManager.isRTL
                        ? { transform: [{ rotate: "180deg" }] }
                        : {}),
                    }}
                  />
                  <Text
                    semibold
                    style={{
                      ...(I18nManager.isRTL
                        ? { textAlign: "right" }
                        : { textAlign: "left" }),
                      color: theme.colors.secondary,
                      fontSize: moderateScale(16),
                      padding: moderateScale(10),
                      flex: 1,
                      fontWeight: "bold",
                      paddingRight: moderateScale(70),
                    }}
                  >
                    {translate("Tell Us Your Exclusive News")}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Settings");
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: moderateScale(20),
                    width: "100%",
                    borderBottomColor: theme.colors.primary,
                    borderBottomWidth: moderateScale(0.8),
                  }}
                >
                  <Image
                    source={require("app/assets/assets/language.png")}
                    resizeMode="contain"
                    style={{
                      height: moderateScale(40),
                      width: moderateScale(40),
                      ...(I18nManager.isRTL
                        ? { transform: [{ rotate: "180deg" }] }
                        : {}),
                    }}
                  />
                  <Text
                    semibold
                    style={{
                      ...(I18nManager.isRTL
                        ? { textAlign: "right" }
                        : { textAlign: "left" }),
                      color: theme.colors.secondary,
                      fontSize: moderateScale(16),
                      padding: moderateScale(10),
                      flex: 1,
                      fontWeight: "bold",
                      paddingRight: moderateScale(70),
                    }}
                  >
                    {translate("Change Language")}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("About");
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: moderateScale(20),
                    width: "100%",
                    borderBottomColor: theme.colors.primary,
                    borderBottomWidth: moderateScale(0.8),
                  }}
                >
                  <Image
                    source={require("app/assets/assets/about.png")}
                    resizeMode="contain"
                    style={{
                      height: moderateScale(40),
                      width: moderateScale(40),
                      ...(I18nManager.isRTL
                        ? { transform: [{ rotate: "180deg" }] }
                        : {}),
                    }}
                  />
                  <Text
                    semibold
                    style={{
                      ...(I18nManager.isRTL
                        ? { textAlign: "right" }
                        : { textAlign: "left" }),
                      color: theme.colors.secondary,
                      fontSize: moderateScale(16),
                      padding: moderateScale(10),
                      flex: 1,
                      fontWeight: "bold",
                      paddingRight: moderateScale(70),
                    }}
                  >
                    {translate("About App")}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("ContactUs");
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: moderateScale(20),
                    width: "100%",
                    borderBottomColor: theme.colors.primary,
                    borderBottomWidth: moderateScale(0.8),
                  }}
                >
                  <Image
                    source={require("app/assets/assets/contactus.png")}
                    resizeMode="contain"
                    style={{
                      height: moderateScale(40),
                      width: moderateScale(40),
                      ...(I18nManager.isRTL
                        ? { transform: [{ rotate: "180deg" }] }
                        : {}),
                    }}
                  />
                  <Text
                    semibold
                    style={{
                      ...(I18nManager.isRTL
                        ? { textAlign: "right" }
                        : { textAlign: "left" }),
                      color: theme.colors.secondary,
                      fontSize: moderateScale(16),
                      padding: moderateScale(10),
                      flex: 1,
                      fontWeight: "bold",
                      paddingRight: moderateScale(70),
                    }}
                  >
                    {translate("Contact Us")}
                  </Text>
                </View>
              </TouchableOpacity>

              {this.props.data.userInfo.email && (
                <TouchableOpacity
                  onPress={() => {
                    setToken("");
                    clearToken();

                    this.props.navigation.dispatch(
                      loginActions.setUserInfo({ profile: "", role: "" })
                    );
                    this.props.actions.You.setUserInfo({
                      profile: "",
                      role: "",
                    });

                    setTimeout(() => {
                      this.props.actions.You.refreashNotifications();
                      this.props.actions.You.refreashHome();
                    }, 200);
                  }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: moderateScale(20),
                      width: "100%",
                      borderBottomColor: theme.colors.primary,
                      borderBottomWidth: moderateScale(0.8),
                    }}
                  >
                    <Image
                      source={require("app/assets/assets/logout.png")}
                      resizeMode="contain"
                      style={{
                        height: moderateScale(40),
                        width: moderateScale(40),
                        ...(I18nManager.isRTL
                          ? { transform: [{ rotate: "180deg" }] }
                          : {}),
                      }}
                    />
                    <Text
                      semibold
                      style={{
                        ...(I18nManager.isRTL
                          ? { textAlign: "right" }
                          : { textAlign: "left" }),
                        color: theme.colors.secondary,
                        fontSize: moderateScale(16),
                        padding: moderateScale(10),
                        flex: 1,
                        fontWeight: "bold",
                        paddingRight: moderateScale(70),
                      }}
                    >
                      {translate("Logout")}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </View>
      </Block>
    );
  }
}

const mapStateToProps = (state) => ({
  data: {
    userInfo: state.login.userInfo,
  },
});
const mapDispatchToProps = (dispatch) => ({
  actions: {
    You: bindActionCreators(loginActions, dispatch),
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: "#fff",
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(You));
