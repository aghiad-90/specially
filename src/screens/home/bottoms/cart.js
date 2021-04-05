import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as loginActions from "../../../actions/Actions";
import Constants from "expo-constants";
//view
import { View, StyleSheet, Image, I18nManager } from "react-native";
import Header from "./childs/Header";
import { theme } from "../../../core/theme";
import { moderateScale } from "react-native-size-matters";
import GuestHeader from "./childs/GuestHeader";
import CeleberatyHeader from "./childs/CeleberatyHeader";

import * as Apis from "../../../services/Apis";
import Events from "./childs/Events";
import Loader from "../../../components/widget/loader";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Text } from "../../../components/widget";
import { translate } from "../../../utils/utils";

/**
 *
 */

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      events: [],
    };

    this.fetchRequests();
  }

  /**
   * send the request to get the items
   */
  fetchRequests() {
    this.setState({ isLoading: true });
    Apis.Get("events")
      .then((data) => {
        // console.log('data', data.results)
        this.setState({ isLoading: false, events: data.results });
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

        <View
          style={{
            flex: 1,
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-around",
            backgroundColor: theme.colors.gray03 + "70",
            position: "absolute",
            zIndex: 99999999,
            width: "100%",
            height: "100%",
            marginTop: moderateScale(114) + getStatusBarHeight(),
          }}
        >
          <Text
            style={{
              color: theme.colors.secondary,
              fontSize: moderateScale(30),
              textAlign: "center",
              margin: moderateScale(10),
              textTransform: "capitalize",
              marginBottom: moderateScale(20),
              marginTop: moderateScale(-350),
              fontWeight: "bold",
            }}
          >
            {translate("Coming Soon".toUpperCase()).toUpperCase()}
          </Text>
        </View>
        <View style={{ marginTop: getStatusBarHeight() + moderateScale(50) }} />
        <CeleberatyHeader {...this.props} />
        <GuestHeader {...this.props} />

        <Loader isLoading={this.state.isLoading} />
        <Events
          onRefresh={() => {
            this.fetchRequests();
          }}
          isLoading={this.state.isLoading}
          {...this.props}
          events={this.state.events}
        />
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
)(React.memo(Cart));
