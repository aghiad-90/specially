import React, { Component } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import { theme } from "../../../../core/theme";
import { Block, Text } from "../../../../components/widget";
import * as loginActions from "../../../../actions/Actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Header from "../childs/Header";
import { moderateScale } from "react-native-size-matters";
import { TouchableOpacity } from "react-native-gesture-handler";
import { translate } from "../../../../utils/utils";
import HTML from "react-native-render-html";
import Loader from "../../../../components/widget/loader";

/**
 *
 */

class About extends Component {
  state = {
    Wishlist: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      selected: 1,
      type: 1,
      data: "",
    };

    this.about(1);
  }

  /**
   * @typedef {Funciton}
   * @param {number} index
   */
  about(index) {
    this.setState({ data: "" });
    this.setState({ isLoading: true });
    this.props.actions.about.fetchAbout(
      { type: index },
      (data) => {
        console.log("about", data);
        this.setState({ isLoading: false });
        this.setState({ data: data.content });
      },
      (error) => {
        console.log("Error", error);
        this.setState({ isLoading: false });
      }
    );
  }

  decodeHTMLEntities(text) {
    var entities = [
      ["amp", "&"],
      ["apos", "'"],
      ["#x27", "'"],
      ["#x2F", "/"],
      ["#39", "'"],
      ["#47", "/"],
      ["lt", "<"],
      ["gt", ">"],
      ["nbsp", " "],
      ["quot", '"'],
    ];

    for (var i = 0, max = entities.length; i < max; ++i)
      text = text.replace(
        new RegExp("&" + entities[i][0] + ";", "g"),
        entities[i][1]
      );

    return text;
  }

  render() {
    return (
      <Block>
        <StatusBar backgroundColor="transparent" barStyle="light-content" />

        <Header
          search={false}
          backPrimary={false}
          back={true}
          navigation={this.props.navigation}
          backclick={() => {
            this.props.navigation.pop();
          }}
          Text={translate("About")}
        />
        <Loader isLoading={this.state.isLoading} />

        <View
          style={{
            margin: moderateScale(20),
            borderRadius: moderateScale(10),
            marginTop: moderateScale(-15),
            flexDirection: "row",
            bottom: moderateScale(-30),
            zIndex: 2,
          }}
        >
          <View
            style={[
              {
                flex: 1,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                borderRadius: moderateScale(20),
                marginHorizontal: moderateScale(4),
                borderWidth: moderateScale(0.5),
              },
              this.state.selected === 1
                ? { backgroundColor: theme.colors.secondary }
                : {
                    backgroundColor: theme.colors.white,
                  },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                this.setState({ selected: 1 });
                this.about(1);
              }}
            >
              <Text
                style={[
                  {
                    color: theme.colors.white,
                    fontSize: moderateScale(13),
                    padding: moderateScale(5),
                    fontWeight: "600",
                    textAlign: "center",
                  },
                  this.state.selected === 1
                    ? {}
                    : { color: theme.colors.secondary },
                ]}
              >
                {translate("Terms & Conditions")}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{ height: "100%", width: 1, backgroundColor: "white" }}
          />

          <View
            style={[
              {
                flex: 1,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                borderRadius: moderateScale(20),
                marginHorizontal: moderateScale(4),
                borderWidth: moderateScale(0.5),
              },
              this.state.selected === 2
                ? { backgroundColor: theme.colors.secondary }
                : { backgroundColor: theme.colors.white },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                this.setState({ selected: 2 });
                this.about(2);
              }}
            >
              <Text
                style={[
                  {
                    color: theme.colors.white,
                    fontSize: moderateScale(13),
                    padding: moderateScale(5),
                    fontWeight: "600",
                    textAlign: "center",
                  },
                  this.state.selected === 2
                    ? {}
                    : { color: theme.colors.secondary },
                ]}
              >
                {translate("Privicy Policy")}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{ height: "100%", width: 1, backgroundColor: "white" }}
          />

          <View
            style={[
              {
                flex: 1,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                borderRadius: moderateScale(20),
                marginHorizontal: moderateScale(4),
                borderWidth: moderateScale(0.5),
              },
              this.state.selected === 3
                ? { backgroundColor: theme.colors.secondary }
                : { backgroundColor: theme.colors.white },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                this.setState({ selected: 3 });
                this.about(3);
              }}
            >
              <Text
                style={[
                  {
                    color: theme.colors.white,
                    fontSize: moderateScale(13),
                    padding: moderateScale(5),
                    fontWeight: "600",
                    textAlign: "center",
                  },
                  this.state.selected === 3
                    ? {}
                    : { color: theme.colors.secondary },
                ]}
              >
                {translate("About")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            width: "100%",
            height: "100%",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: moderateScale(20),
            paddingHorizontal: moderateScale(10),
          }}
        >
          <View
            style={{
              width: "95%",
              height: "100%",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ marginBottom: moderateScale(220) }}
            >
              <View style={{ padding: 10, paddingStart: -10 }}>
                <HTML
                  html={this.decodeHTMLEntities(
                    this.state.data ? this.state.data : ""
                  )}
                  style={{ direction: "rtl", textAlign: "left" }}
                  imagesMaxWidth={Dimensions.get("window").width}
                />
              </View>
            </ScrollView>
          </View>
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
    about: bindActionCreators(loginActions, dispatch),
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
)(React.memo(About));
