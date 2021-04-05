import React, { Component } from "react";
import { connect } from "react-redux";
import Constants from "expo-constants";
//view
import {
  View,
  StyleSheet,
  Image,
  I18nManager,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import Header from "./childs/Header";
import { theme } from "../../../core/theme";
import { Text } from "../../../components/widget";
import { moderateScale } from "react-native-size-matters";
import { showDanger, translate } from "../../../utils/utils";
import { getStatusBarHeight } from "react-native-status-bar-height";
import * as Apis from "../../../services/Apis";
import moment from "moment";
import Loader from "../../../components/widget/loader";
import CeleberatyHeader from "./childs/CeleberatyHeader";
import GuestHeader from "./childs/GuestHeader";
import * as loginActions from "../../../actions/Actions";
import { bindActionCreators } from "redux";

/**
 *
 */

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      notificaitons: [],
      assetsView: false,
      startingIndex: 0,
      assetsList: [],
      assesCheck: "images",
    };
  }

  /**
   *
   */

  componentDidMount() {
    this.setState({ isLoading: true, animating: true });
    this.getNotificaitons();
  }

  /**
   * getting the Notification
   */

  getNotificaitons() {
    var url = "/notificaitons?isPagination=false&limit=1000";
    console.log(url);
    Apis.Get(url)
      .then((notificaitons) => {
        // console.log('notificaitons', notificaitons)
        this.setState({
          isLoading: false,
          notificaitons: notificaitons.results,
        });

        this.props.actions.browse.NotificationCount({
          totalCount: notificaitons.unread,
        });
      })
      .catch((error) => {
        this.setState({ isLoading: false, notificaitons: [] });
        // console.log('notificaitons', error)
        this.setState({ isLoading: false });
      });
  }

  /**
   *
   * @param {Number} id the id of Notification to make it read
   */
  MakeRead(id) {
    var url = "/notificaitons/read/" + id;
    // console.log(url)
    Apis.Put(url)
      .then((notificaitons) => {
        this.getNotificaitons();
      })
      .catch((error) => {
        // console.log('notificaitons', error)
      });
  }

  render() {
    return (
      <View style={styles.container_scrolling}>
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

        <Loader isLoading={this.state.isLoading} />

        <Text
          style={{
            fontSize: moderateScale(20),
            color: theme.colors.secondary,
            marginVertical: moderateScale(10),
            marginTop: moderateScale(20),
            marginHorizontal: moderateScale(20),
          }}
        >
          {translate("Notifications").toUpperCase()}
        </Text>

        {this.state.notificaitons.length === 0 && !this.state.isLoading && (
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              alignContent: "center",
              alignSelf: "center",
              marginTop: moderateScale(20) + getStatusBarHeight(),
            }}
          >
            <Image
              resizeMode="contain"
              style={{
                height: moderateScale(100),
                width: moderateScale(100),
                marginEnd: moderateScale(5),
              }}
              source={require("app/assets/assets/logwithname.png")}
            />
            <Text
              style={{
                color: theme.colors.secondary,
                fontSize: moderateScale(20),
                textAlign: "center",
                margin: moderateScale(10),
                textTransform: "capitalize",
                marginBottom: moderateScale(20),
                marginTop: moderateScale(0),
              }}
            >
              {translate("Sorry no items found".toUpperCase()).toUpperCase()}
            </Text>
          </View>
        )}

        {this.state.notificaitons.length !== 0 && !this.state.isLoading && (
          <View style={{ flex: 1 }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.state.notificaitons}
              refreshControl={
                <RefreshControl
                  colors={[theme.colors.primary, theme.colors.secondary]}
                  refreshing={this.state.isLoading}
                  tintColor={theme.colors.primary}
                  onRefresh={() => {
                    this.getNotificaitons();
                  }}
                />
              }
              contentContainerStyle={{ paddingBottom: moderateScale(100) }}
              extraData={this.props}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => this.renderListings(item, index)}
            />
          </View>
        )}
      </View>
    );
  }

  renderListings(listing, key) {
    const {} = this.props;

    return (
      <TouchableOpacity
        key={"notiifcaiton-list" + key}
        onPress={() => {
          if (listing.media !== null) {
            if (listing.mediaObj.user) {
              this.props.navigation.navigate("ViewForMedia", {
                assetsView: true,
                assetsList: [listing.mediaObj],
                assesCheck: listing.mediaObj.type === 0 ? "images" : "videos",
                startingIndex: 0,
                celebraty: listing.mediaObj.userObj,
              });
            } else {
              showDanger("Media Not found.");
            }
          } else {
            this.props.navigation.navigate("Requests");
          }

          if (listing.read === 0) {
            this.MakeRead(listing._id);
          }
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          marginTop: moderateScale(0),
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginHorizontal: moderateScale(20),
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center",
            backgroundColor: theme.colors.gray05,
            marginTop: moderateScale(7),
            borderRadius: moderateScale(15),
            ...(listing.read === 0
              ? {
                  borderStartWidth: moderateScale(7),
                  borderColor: theme.colors.secondary,
                }
              : {}),
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              paddingHorizontal: moderateScale(0),
              padding: moderateScale(5),
            }}
          >
            <View
              style={{
                flex: 1,
                paddingHorizontal: moderateScale(10),
                padding: moderateScale(10),
              }}
            >
              <View>
                <Text
                  style={{
                    ...(I18nManager.isRTL ? { textAlign: "left" } : {}),
                    color: theme.colors.secondary,
                    fontSize: moderateScale(18),
                  }}
                >
                  {listing.title}
                </Text>
                <Text
                  style={{
                    ...(I18nManager.isRTL
                      ? { textAlign: "right" }
                      : { textAlign: "center" }),
                    color: theme.colors.secondary,
                    fontSize: moderateScale(12),
                    position: "absolute",
                    right: 0,
                    top: moderateScale(5),
                  }}
                >
                  {moment(new Date(listing.createdAt)).format("MMM DD YYYY")}
                </Text>
              </View>
              <Text
                style={{
                  ...(I18nManager.isRTL ? { textAlign: "left" } : {}),
                  color: theme.colors.gray04,
                  fontSize: moderateScale(12),
                  flex: 1,
                  marginTop: moderateScale(5),
                }}
              >
                {listing.description}
              </Text>
            </View>
          </View>
          <Image
            resizeMode="stretch"
            source={require("app/assets/assets/selected.png")}
            style={{
              width: moderateScale(8),
              height: moderateScale(15),
              marginRight: moderateScale(10),
              tintColor: theme.colors.gray05,
              ...(I18nManager.isRTL
                ? { transform: [{ rotate: "180deg" }] }
                : {}),
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.data.RefrashNotifications < nextProps.data.RefrashNotifications
    ) {
      console.log("refreashing RefrashNotifications");
      this.getNotificaitons();
    }
  }
}

const mapStateToProps = (state) => ({
  data: {
    RefrashNotifications: state.app.RefrashNotifications,
    userInfo: state.login.userInfo,
  },
});
const mapDispatchToProps = (dispatch) => ({
  actions: {
    browse: bindActionCreators(loginActions, dispatch),
  },
});

const styles = StyleSheet.create({
  container_scrolling: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: "white",
  },
  wrapper: {
    flex: 1,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Cart));
