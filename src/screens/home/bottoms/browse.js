import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as loginActions from "../../../actions/Actions";
import {
  View,
  StyleSheet,
  RefreshControl,
  Image,
  Animated,
  Linking,
} from "react-native";
import { connect } from "react-redux";
import { theme } from "../../../core/theme";
import { StatusBar } from "react-native";
import { Text } from "../../../components/widget";
import Button from "apsl-react-native-button";
import { scale, moderateScale } from "react-native-size-matters";
import LocationNotification from "../bottoms/childs/LocationNotification";
import Header from "../bottoms/childs/Header";
import {
  BASE_API_URL_IMAEG_ORIGINAL,
  BASE_API_URL_VIDEOS,
  FONT_FAMILY,
} from "../../../services/config";
import { showDanger, showErrorPopup, translate } from "../../../utils/utils";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Loader from "../../../components/widget/loader";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { SliderBox } from "../../../components/react-native-image-slider-box";
import Celeberaties from "./childs/Celeberaties";
import News from "./childs/News";
import Advertising from "./childs/Advertising";

import { LayoutAnimation } from "react-native";
import { I18nManager } from "react-native";
import CeleberatyHeader from "./childs/CeleberatyHeader";
import GuestHeader from "./childs/GuestHeader";

/**
 *
 */

class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      banners: [],
      positionBanner: 0,
      slides: [
        { image: require("app/assets/dummy.png"), title: "OUR\nRESTURENTS" },
        { image: require("app/assets/dummy.png"), title: "OUR\nSHOPS" },
      ],
      isLoading: false,
      imageIndex: 0,
      somethingWentWrong: false,
      lastindex: 0,
      selectedProduct: {},
      ConnectionIssue: false,
      animating: false,
      options: false,
      categories: [],
      animatedStartValue: new Animated.Value(0),
      celeberatiesWithCategory: [],
      banners: [],
      selectedCategory: 0,
      advertising: [],
      news: [],
      topCategory: [],
      showOnce: false,
    };
    this.handleResturentClick = this.handleResturentClick.bind(this);
  }

  /**
   *
   * @param {Object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.data.RefrashHome < nextProps.data.RefrashHome) {
      // console.log('refreashing')
      this.loadhome({});
    }
  }

  /**
   *
   * @param {Boolean} listing
   */

  handleResturentClick(listing) {
    this.props.actions.browse.setselectedProduct(listing);
    this.setState({ selectedProduct: listing });
    this.setState({ modalVisible: true });
  }

  componentWillUnmount() {}

  /**
   *
   */

  async componentDidMount() {
    this.setState({ isLoading: true });
    this.loadhome({});
  }

  /**
   *
   * @param {Object} data initial state the Data will be emply Object
   */
  loadhome(data) {
    this.setState({ isLoading: true });
    this.props.actions.browse.fetchHome(
      data,
      (results) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        if (results.dataNews.data) {
          this.setState({ topCategory: results.dataNews.data.results });
        }

        var onSuccess = results.data;
        if (onSuccess.celeberatiesWithCategory) {
          this.setState({
            celeberatiesWithCategory: onSuccess.celeberatiesWithCategory
              ? onSuccess.celeberatiesWithCategory.results
              : [],
            banners: onSuccess.banners.results,
            advertising: onSuccess.advertising
              ? onSuccess.advertising.results
              : [],
          });
        }

        if (onSuccess.news) {
          this.setState({
            news: onSuccess.news ? onSuccess.news.results : [],
            banners: onSuccess.banners.results,
            advertising: onSuccess.advertising
              ? onSuccess.advertising.results
              : [],
          });
        }

        if (this.props.data.userInfo.email)
          if (
            !!!this.props.data.userInfo.verified &&
            !this.state.showOnce &&
            this.props.data.userInfo.role !== "user"
          ) {
            this.setState({ showOnce: true });
            showErrorPopup(
              "Please Verified Your Account After Read Your Contact in Dashboard To Get Access TO All Function.",
              "Verified Account",
              require("../../../assets/assets/logwithname.png")
            );
          }

        this.setState({
          isLoading: false,
          animating: false,
          ConnectionIssue: false,
        });
      },
      (onError) => {
        this.setState({
          isLoading: false,
          ConnectionIssue: true,
          animating: false,
        });
        console.log("onError", onError);
        showDanger(translate("Error"));
      }
    );
  }

  /**
   *
   */

  handlePressIn = () => {
    const { animatedStartValue } = this.state;
    Animated.timing(animatedStartValue, {
      toValue: 0.95,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  /**
   *
   */
  handlePressOut = () => {
    const { animatedStartValue } = this.state;
    Animated.timing(animatedStartValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  /**
   *
   * @param {Ref} ref
   */
  handleViewRef = (ref) => {
    this.view = ref;
  };

  render() {
    var advertising = [];
    for (let k in this.state.advertising) {
      advertising.push(BASE_API_URL_VIDEOS + this.state.advertising[k].url);
    }

    var images = [];
    for (let k in this.state.banners) {
      images.push(
        BASE_API_URL_IMAEG_ORIGINAL + this.state.banners[k].cover_imaage
      );
    }

    console.log(advertising);

    return (
      <View style={[styles.container_scrolling]}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" />

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
            locationText={this.props.data.selectedLocation.location}
            notification={true}
          />
        </View>

        <Loader isLoading={this.state.isLoading} />
        {this.state.ConnectionIssue && (
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              alignContent: "center",
              alignSelf: "center",
              height: "100%",
              width: "100%",
              marginTop: "40%",
            }}
          >
            <Text
              style={{
                color: theme.colors.secondary,
                fontSize: moderateScale(20),
                textAlign: "center",
                margin: moderateScale(40),
                textTransform: "capitalize",
                marginBottom: moderateScale(20),
                marginTop: moderateScale(40),
              }}
            >
              {translate(
                "Something went wrong please try again".toUpperCase()
              ).toUpperCase()}
            </Text>
            <Button
              mode="contained"
              activityIndicatorColor={theme.colors.secondary}
              isLoading={this.state.isLoading}
              style={{
                backgroundColor: theme.colors.primary,
                borderColor: "transparent",
                color: theme.colors.primary,
                borderRadius: 0,
                marginTop: moderateScale(0),
                width: scale(250),
                borderWidth: 1,
                borderColor: theme.colors.secondary,
                alignSelf: "center",
                padding: moderateScale(10),
                height: moderateScale(50),
                borderRadius: moderateScale(50),
              }}
              textStyle={{
                fontSize: moderateScale(15),
                fontWeight: "bold",
                color: theme.colors.secondary,
              }}
              onPress={() => this.loadhome({})}
            >
              {translate("TRY AGAIN").toUpperCase()}
            </Button>
          </View>
        )}

        <View style={{ marginTop: getStatusBarHeight() + moderateScale(50) }} />
        <CeleberatyHeader {...this.props} />
        <GuestHeader {...this.props} />

        <LocationNotification {...this.props} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            paddingHorizontal: moderateScale(0),
            marginTop: moderateScale(10),
            zIndex: 10,
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isLoading}
              tintColor={theme.colors.secondary}
              onRefresh={() => {}}
            />
          }
        >
          <FlatList
            data={this.state.topCategory}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              height: moderateScale(45),
              marginTop: moderateScale(10),
              paddingHorizontal: moderateScale(10),
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              width: "100%",
            }}
            renderItem={({ item, index }) => (
              <View
                key={"main-category" + index}
                style={[
                  {
                    marginVertical: moderateScale(5),
                    marginTop: moderateScale(0),
                    justifyContent: "center",
                    borderRadius: moderateScale(0),
                    marginEnd: moderateScale(5),
                    ...(this.state.selectedCategory === index
                      ? {
                          backgroundColor: theme.colors.secondary,
                          height: moderateScale(32),
                        }
                      : {
                          backgroundColor: theme.colors.gray07,
                          height: moderateScale(30),
                        }),
                  },
                ]}
              >
                <TouchableOpacity
                  onPressIn={this.handlePressIn}
                  onPressOut={this.handlePressOut}
                  onPress={() => {
                    ReactNativeHapticFeedback.trigger("selection", {
                      enableVibrateFallback: true,
                      ignoreAndroidSystemSettings: false,
                    });
                    this.setState({ selectedCategory: index });

                    if (index === 0) {
                      this.loadhome({});
                    } else {
                      this.loadhome({
                        category: item._id ? item._id : item.id,
                      });
                    }
                  }}
                  style={{ paddingVertical: moderateScale(0) }}
                >
                  <Text
                    style={[
                      styles.heading,
                      {
                        ...(I18nManager.isRTL ? { textAlign: "left" } : {}),
                        fontWeight: "900",
                        textAlign: "center",
                        alignSelf: "center",
                        paddingHorizontal: moderateScale(10),
                        textTransform: "capitalize",
                        fontSize: moderateScale(19),
                        ...(this.state.selectedCategory === index
                          ? { color: theme.colors.white }
                          : { color: theme.colors.secondary }),
                      },
                    ]}
                  >
                    {}
                    {String(item.title).toUpperCase()}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
          />

          <View
            style={{
              height: moderateScale(200),
              marginHorizontal: moderateScale(20),
              borderRadius: moderateScale(50),
              zIndex: 10,
              marginTop: moderateScale(10),
            }}
          >
            {Number(this.state.selectedCategory) === 0 && (
              <View
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <SliderBox
                  autoplay={true}
                  onCurrentImagePressed={(index) => {
                    this.props.navigation.navigate("NewsDetails", {
                      item: this.state.banners[index],
                    });
                  }}
                  resizeMode="cover"
                  style={{
                    height: moderateScale(200),
                    backgroundColor: "white",
                    width: "90%",
                    alignSelf: "center",
                    borderRadius: moderateScale(10),
                  }}
                  images={images}
                />
              </View>
            )}

            {Number(this.state.selectedCategory) !== 0 && (
              <Advertising advertising={this.state.advertising} />
            )}
          </View>

          {this.state.selectedCategory === 0 && (
            <Celeberaties
              updateLike={(celeberatiesWithCategory) => {
                this.setState({
                  celeberatiesWithCategory: celeberatiesWithCategory,
                });
              }}
              isLoading={this.state.isLoading}
              {...this.props}
              celeberatiesWithCategory={this.state.celeberatiesWithCategory}
            />
          )}
          {this.state.selectedCategory !== 0 && (
            <News
              isLoading={this.state.isLoading}
              {...this.props}
              news={this.state.news}
            />
          )}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  data: {
    selectedLocation: state.login.selectedLocation,
    mainCategories: state.app.mainCategories,
    userInfo: state.login.userInfo,
    RefrashHome: state.app.RefrashHome,
  },
  isConnected: state.connection.isConnected,
});
const mapDispatchToProps = (dispatch) => ({
  actions: {
    browse: bindActionCreators(loginActions, dispatch),
  },
});

const styles = StyleSheet.create({
  container_scrolling: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.gray06,
  },
  wrapperCategory: {
    paddingRight: 0,
    paddingStart: scale(8),
    flex: 1,
  },

  exampleContainer: {
    paddingVertical: moderateScale(15),
  },
  sliderContentContainer: {
    paddingVertical: 0,
  },
  slider: {
    marginTop: 0,
    overflow: "visible",
  },
  InnerWrapper: {
    marginHorizontal: moderateScale(1),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  listingType: {
    fontSize: scale(11),
    fontWeight: "700",
    textAlign: "left",
    paddingHorizontal: moderateScale(5),
    alignItems: "flex-start",
  },
  innerCard: {
    paddingStart: 10,
    paddingEnd: 10,
    borderColor: theme.colors.secondary,
    borderWidth: 1.5,
    marginEnd: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: moderateScale(7),
    padding: scale(4),
  },
  heading: {
    fontSize: moderateScale(14),
    color: theme.colors.primary,
    width: "100%",
    fontWeight: "500",
    alignSelf: "flex-start",
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Browse));
