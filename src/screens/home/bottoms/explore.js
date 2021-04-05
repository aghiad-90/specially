import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as loginActions from "../../../actions/Actions";
import Constants from "expo-constants";
//view
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  I18nManager,
  FlatList,
} from "react-native";
import Header from "./childs/Header";
import { theme } from "../../../core/theme";
import { Text } from "../../../components/widget";
import { moderateScale } from "react-native-size-matters";
import { getStatusBarHeight } from "react-native-status-bar-height";

import * as Apis from "../../../services/Apis";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

import Loader from "../../../components/widget/loader";
import MasonryList from "@appandflow/masonry-list";
import Video from "react-native-video";
import moment from "moment";
import {
  BASE_API_URL_IMAEG_ORIGINAL,
  BASE_API_URL_VIDEOS,
} from "../../../services/config";
import CeleberatyHeader from "./childs/CeleberatyHeader";
import GuestHeader from "./childs/GuestHeader";

/**
 *
 */

class Cart extends Component {
  videoPlayer = [];

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      events: [],
      selectedCategory: 0,
      type: 1,
      ImagesData: { results: [] },
      VideosData: { results: [] },
      categories: [],
    };
  }

  /**
   *
   */

  componentDidMount() {
    this.getCategory();
  }

  /**
   *
   */

  getCategory() {
    Apis.Get("category?isPagination=false")
      .then((data) => {
        // console.log('categories', data.results)
        this.setState({ categories: data.results });
        this.getExplore();
      })
      .catch((error) => {
        // console.log(error);
        this.setState({ isLoading: false });
      });
  }

  /**
   *
   */

  getExplore() {
    this.setState({ isLoading: true });
    Apis.Get(
      "explore/type?type=" +
        this.state.type +
        "&category=" +
        this.state.categories[this.state.selectedCategory]._id
    )
      .then((data) => {
        // console.log('explore', data)
        this.setState({ isLoading: false });
        if (this.state.type === 0) {
          this.setState({ ImagesData: data });
        } else {
          this.setState({ VideosData: data });
        }
      })
      .catch((error) => {
        // console.log(error);
        this.setState({ isLoading: false });
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

        <View>
          <FlatList
            data={this.state.categories}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              marginTop: moderateScale(20),
              paddingHorizontal: moderateScale(10),
            }}
            renderItem={({ item, index }) => (
              <View
                key={"main-category" + index}
                style={[
                  {
                    margin: moderateScale(5),
                    marginTop: moderateScale(0),
                    justifyContent: "center",
                    borderRadius: moderateScale(0),
                    marginHorizontal: moderateScale(10),
                    ...(this.state.selectedCategory === index
                      ? {
                          backgroundColor: theme.colors.secondary,
                          marginRight: moderateScale(0),
                        }
                      : {
                          backgroundColor: theme.colors.gray07,
                          borderWidth: moderateScale(0.5),
                          borderColor: theme.colors.gray01,
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

                    setTimeout(() => {
                      this.getExplore();
                    }, 100);
                  }}
                  style={{
                    paddingHorizontal: moderateScale(5),
                    paddingVertical: moderateScale(5),
                  }}
                >
                  <Text
                    style={[
                      styles.heading,
                      {
                        ...(I18nManager.isRTL ? { textAlign: "left" } : {}),
                        fontWeight: "bold",
                        textTransform: "capitalize",
                        textAlign: "center",
                        alignSelf: "center",
                        paddingHorizontal: moderateScale(5),
                        ...(this.state.selectedCategory === index
                          ? { color: theme.colors.white }
                          : { color: theme.colors.secondary }),
                        fontSize: moderateScale(18),
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
        </View>

        {this.state.categories.length !== 0 && (
          <View
            style={{
              height: moderateScale(50),
              flexDirection: "row",
              marginTop: moderateScale(20),
              justifyContent: "center",
              width: "90%",
              alignSelf: "center",
            }}
          >
            <View
              style={[
                {
                  margin: moderateScale(5),
                  marginTop: moderateScale(0),
                  justifyContent: "center",
                  borderRadius: moderateScale(18),
                  borderWidth: moderateScale(1),
                  borderColor: theme.colors.secondary,
                  paddingHorizontal: moderateScale(20),
                  ...(this.state.type === 0
                    ? {
                        backgroundColor: theme.colors.secondary,
                        marginRight: moderateScale(0),
                      }
                    : { backgroundColor: theme.colors.white }),
                  flex: 1,
                },
              ]}
            >
              <TouchableOpacity
                onPressIn={this.handlePressIn}
                onPressOut={this.handlePressOut}
                onPress={() => {
                  ReactNativeHapticFeedback.trigger("notificationSuccess", {
                    enableVibrateFallback: true,
                    ignoreAndroidSystemSettings: false,
                  });
                  this.setState({ type: 0 });
                  setTimeout(() => {
                    this.getExplore();
                  }, 100);
                }}
                style={{
                  paddingHorizontal: moderateScale(10),
                  paddingVertical: moderateScale(10),
                }}
              >
                <Text
                  style={[
                    styles.heading,
                    {
                      ...(I18nManager.isRTL ? { textAlign: "left" } : {}),
                      fontWeight: "bold",
                      textAlign: "center",
                      alignSelf: "center",
                      paddingHorizontal: moderateScale(5),
                      ...(this.state.type === 0
                        ? { color: theme.colors.primary }
                        : { color: theme.colors.secondary }),
                    },
                  ]}
                >
                  {}
                  {String("Images").toUpperCase()}
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={[
                {
                  margin: moderateScale(5),
                  marginTop: moderateScale(0),
                  justifyContent: "center",
                  borderRadius: moderateScale(18),
                  borderWidth: moderateScale(1),
                  borderColor: theme.colors.secondary,
                  paddingHorizontal: moderateScale(20),
                  ...(this.state.type === 1
                    ? {
                        backgroundColor: theme.colors.secondary,
                        marginRight: moderateScale(0),
                      }
                    : { backgroundColor: theme.colors.white }),
                  flex: 1,
                },
              ]}
            >
              <TouchableOpacity
                onPressIn={this.handlePressIn}
                onPressOut={this.handlePressOut}
                onPress={() => {
                  ReactNativeHapticFeedback.trigger("notificationSuccess", {
                    enableVibrateFallback: true,
                    ignoreAndroidSystemSettings: false,
                  });
                  this.setState({ type: 1 });
                  setTimeout(() => {
                    this.getExplore();
                  }, 100);
                }}
                style={{
                  paddingHorizontal: moderateScale(10),
                  paddingVertical: moderateScale(10),
                }}
              >
                <Text
                  style={[
                    styles.heading,
                    {
                      ...(I18nManager.isRTL ? { textAlign: "left" } : {}),
                      fontWeight: "bold",
                      textAlign: "center",
                      alignSelf: "center",
                      paddingHorizontal: moderateScale(5),
                      ...(this.state.type === 1
                        ? { color: theme.colors.white }
                        : { color: theme.colors.secondary }),
                    },
                  ]}
                >
                  {}
                  {String("Videos").toUpperCase()}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={{ flex: 1 }}>
          {this.state.type == 0 && (
            <MasonryList
              data={this.state.ImagesData.results}
              contentContainerStyle={{
                marginTop: moderateScale(10),
                paddingHorizontal: moderateScale(10),
              }}
              getHeightForItem={({ item }) => moderateScale(1)}
              extraData={this.props}
              horizontal={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index, column }) => (
                <TouchableOpacity
                  key={"Masonry-item" + index}
                  onPress={() => {
                    this.props.navigation.navigate("ViewForMedia", {
                      assetsView: true,
                      assetsList: this.state.ImagesData.results,
                      assesCheck: "images",
                      startingIndex: index,
                      celebraty: item.userObj,
                    });
                  }}
                  style={[
                    {
                      flex: 1 / 2,
                      flexDirection: "row",
                      marginBottom: moderateScale(10),
                      backgroundColor: theme.colors.primary,
                      marginHorizontal: moderateScale(5),
                      borderRadius: moderateScale(10),
                    },
                  ]}
                >
                  <View style={{ height: moderateScale(200), width: "100%" }}>
                    <Image
                      resizeMode={"cover"}
                      style={{
                        height: moderateScale(200),
                        width: "100%",
                        borderRadius: moderateScale(10),
                      }}
                      source={{ uri: BASE_API_URL_IMAEG_ORIGINAL + item.url }}
                    />
                  </View>
                </TouchableOpacity>
              )}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
            />
          )}

          {this.state.type === 1 && (
            <FlatList
              data={this.state.VideosData.results}
              extraData={this.state}
              contentContainerStyle={{
                paddingBottom: moderateScale(50),
                marginTop: moderateScale(10),
                marginHorizontal: moderateScale(10),
              }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <View
                  key={"video-gallery-" + index}
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    marginBottom: moderateScale(10),
                    backgroundColor: theme.colors.primary,
                    marginHorizontal: moderateScale(5),
                    borderRadius: moderateScale(20),
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("ViewForMedia", {
                        assetsView: true,
                        assetsList: this.state.VideosData.results,
                        assesCheck: "videos",
                        startingIndex: index,
                        celebraty: item.userObj,
                      });
                    }}
                    style={{ flexDirection: "column", width: "100%" }}
                  >
                    <View
                      style={{
                        height: moderateScale(400),
                        width: "100%",
                        justifyContent: "center",
                        zIndex: 10,
                      }}
                    >
                      <View
                        style={{
                          position: "absolute",
                          zIndex: 111,
                          width: "100%",
                        }}
                      >
                        <Image
                          resizeMode="contain"
                          style={{
                            height: moderateScale(30),
                            width: moderateScale(30),
                            alignSelf: "center",
                          }}
                          source={require("app/assets/assets/selected.png")}
                        />
                      </View>

                      <Image
                        resizeMode={"cover"}
                        style={{
                          height: moderateScale(400),
                          width: "100%",
                          borderRadius: moderateScale(20),
                          position: "absolute",
                          zIndex: 111,
                        }}
                        source={require("../../../assets/assets/shadowtop.png")}
                      />

                      <Video
                        paused
                        posterResizeMode={"stretch"}
                        resizeMode={"cover"}
                        onVideoFullscreenPlayerWillDismiss={() => {}}
                        source={{ uri: BASE_API_URL_VIDEOS + item.url }}
                        ref={(videoPlayer) => {
                          this.videoPlayer[index] = videoPlayer;
                        }}
                        onError={(error) => {
                          console.log(BASE_API_URL_VIDEOS + item.url);
                          console.log("video error", error);
                        }}
                        onLoad={() => {
                          if (this.videoPlayer[index])
                            this.videoPlayer[index].seek(2);
                        }}
                        posterResizeMode="stretch"
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          height: moderateScale(400),
                          backgroundColor: theme.colors.black,
                          borderRadius: moderateScale(20),
                          zIndex: 10,
                        }}
                      />
                    </View>

                    <View
                      style={{
                        width: "100%",
                        top: moderateScale(10),
                        zIndex: 12,
                        position: "absolute",
                        paddingHorizontal: moderateScale(5),
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          alignItems: "center",
                          alignContent: "center",
                          marginHorizontal: moderateScale(5),
                          marginBottom: moderateScale(10),
                        }}
                      >
                        <Text
                          style={[
                            {
                              fontWeight: "bold",
                              fontSize: moderateScale(15),
                              color: theme.colors.white,
                              flex: 1,
                              marginEnd: moderateScale(20),
                            },
                          ]}
                        >
                          {item.title}
                        </Text>

                        <Text
                          style={[
                            {
                              fontWeight: "bold",
                              fontSize: moderateScale(8),
                              color: theme.colors.white,
                            },
                          ]}
                        >
                          {moment(item.createdAt).format("d MMM YYYY")}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        width: "100%",
                        bottom: moderateScale(10),
                        zIndex: 12,
                        position: "absolute",
                        paddingHorizontal: moderateScale(5),
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          alignItems: "center",
                          alignContent: "center",
                          marginHorizontal: moderateScale(5),
                          marginBottom: moderateScale(10),
                        }}
                      >
                        <Text
                          style={[
                            {
                              fontWeight: "bold",
                              fontSize: moderateScale(12),
                              color: theme.colors.white,
                              flex: 1,
                              marginEnd: moderateScale(20),
                            },
                          ]}
                        >
                          {item.description}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item, index) => index}
            />
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  data: {},
});
const mapDispatchToProps = (dispatch) => ({
  actions: {},
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
  heading: {
    fontSize: moderateScale(12),
    color: theme.colors.primary,
    width: "100%",
    fontWeight: "500",
    alignSelf: "flex-start",
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Cart));
