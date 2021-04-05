import React, { Component } from "react";
import { bindActionCreators } from "redux";
import * as loginActions from "../../../actions/Actions";
import {
  View,
  StyleSheet,
  ImageBackground,
  RefreshControl,
  Image,
  Animated,
  I18nManager,
} from "react-native";
import { connect } from "react-redux";
import { theme } from "../../../core/theme";
import { StatusBar } from "react-native";
import { Text } from "../../../components/widget";
import Button from "apsl-react-native-button";
import { scale, moderateScale } from "react-native-size-matters";
import LocationNotification from "./childs/LocationNotification";
import Header from "./childs/Header";
import { BASE_API_URL_IMAEG_ORIGINAL } from "../../../services/config";
import { showDanger, translate } from "../../../utils/utils";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Loader from "../../../components/widget/loader";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { SliderBox } from "../../../components/react-native-image-slider-box";
import CeleberatiesList from "./childs/CeleberatiesList";
import News from "./childs/News";
import * as Apis from "../../../services/Apis";

import { LayoutAnimation } from "react-native";
import { TranslationLanguageCodeList } from "react-native-country-picker-modal";

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
      categories: [],
      animatedStartValue: new Animated.Value(0),
      celeberatiesWithCategory: [],
      banners: [],
      selectedCategory: 0,
      news: [],
      topCategory: [],
      selectedCategoryID: "",
      celeberaties: [],
      text: "",
    };
    this.handleResturentClick = this.handleResturentClick.bind(this);
  }

  /**
   *
   * @param {Object} listing
   */

  handleResturentClick(listing) {
    this.props.actions.browse.setselectedProduct(listing);
    this.setState({ selectedProduct: listing });
    this.setState({ modalVisible: true });
  }

  componentWillUnmount() {}

  /**
   * get Celebration
   */

  getCeleb() {
    this.setState({ isLoading: true });
    var url = "/users?role=celebrity&category=" + this.state.selectedCategoryID;
    if (this.state.text !== "") url = url + "&search=" + this.state.text;

    Apis.Get(url)
      .then((data) => {
        // console.log(data.results)
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ isLoading: false, celeberaties: data.results });
      })
      .catch((error) => {
        showDanger(error.message);
        // console.log(error);
        this.setState({ isLoading: false });
      });
  }

  /**
   *
   */
  async componentDidMount() {
    this.setState({ isLoading: true });
    this.loadhome({});
  }

  /**
   *
   * @param {Object} data getting the data
   */
  loadhome(data) {
    this.setState({ isLoading: true });
    this.props.actions.browse.fetchHome(
      data,
      (results) => {
        // console.log('results', results);

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
            selectedCategoryID:
              onSuccess.celeberatiesWithCategory.results &&
              onSuccess.celeberatiesWithCategory.results[0]
                ? onSuccess.celeberatiesWithCategory.results[0]._id
                : "",
          });
          setTimeout(() => {
            this.getCeleb();
          }, 200);
        }

        if (onSuccess.news) {
          // console.log('onSuccess', this.state.news, onSuccess.news.results);
          this.setState({
            news: onSuccess.news ? onSuccess.news.results : [],
            banners: onSuccess.banners.results,
          });
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
        // console.log('onError', onError);
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

  render() {
    const { animatedStartValue } = this.state;
    const animatedStyle = {
      transform: [{ scale: animatedStartValue }],
    };

    var images = [];
    for (let k in this.state.banners) {
      images.push(BASE_API_URL_IMAEG_ORIGINAL + this.state.banners[k].image);
    }

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
            searchCeleb={(text) => {
              this.setState({ text: text });
              setTimeout(() => {
                this.getCeleb();
              }, 200);
            }}
            logoleft={false}
            back={true}
            navigation={this.props.navigation}
            search={false}
            locationText={this.props.data.selectedLocation.location}
            notification={true}
            searchView={true}
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
          <CeleberatiesList
            updateLike={(celeberaties) => {
              this.setState({ celeberaties: celeberaties });
            }}
            selectedCategoryChanged={(category) => {
              this.setState({ selectedCategoryID: category });
              this.getCeleb();
            }}
            isLoading={this.state.isLoading}
            {...this.props}
            celeberatiesWithCategory={this.state.celeberatiesWithCategory}
            celeberaties={this.state.celeberaties}
          />
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
