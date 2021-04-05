import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  ImageBackground,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { theme } from "../../../../core/theme";
import { moderateScale } from "react-native-size-matters";

/**
 *
 */

class AccordianFiltersOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      expanded: false,
    };

    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          ref={this.accordian}
          style={styles.row}
          onPress={() => this.toggleExpand()}
        >
          <View
            style={{
              flex: 1,
              justfyContent: "center",
              flexDirection: "row",
              paddingVertical: moderateScale(5),
              alignContent: "center",
              alignItems: "center",
            }}
          >
            {!this.props.selected && (
              <Image
                resizeMode="contain"
                source={require("app/assets/uncheck.png")}
                style={{ width: moderateScale(25), width: moderateScale(25) }}
              />
            )}
            {this.props.selected && (
              <Image
                resizeMode="contain"
                source={require("app/assets/check.png")}
                style={{ width: moderateScale(25), width: moderateScale(25) }}
              />
            )}

            {this.props.isCode === 1 && (
              <Text
                style={{
                  fontSize: moderateScale(20),
                  textAlign: "center",
                  fontWeight: "300",
                  marginStart: moderateScale(10),
                  paddingStart: moderateScale(50),
                  backgroundColor:
                    this.props.isCode === 1
                      ? this.props.code
                      : theme.colors.primary,
                }}
              >
                {" "}
                {""}
              </Text>
            )}

            {this.props.isCode !== 1 && (
              <Text
                style={{
                  fontSize: moderateScale(20),
                  textAlign: "center",
                  fontWeight: "300",
                  paddingStart: moderateScale(10),
                  color: this.props.selected
                    ? theme.colors.primary
                    : theme.colors.primary,
                }}
              >
                {" "}
                {this.props.title}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  /**
   *
   */

  toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.props.toggleExpand(this.props.index);
  };
}

export default AccordianFiltersOptions;

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 55,
    paddingRight: 18,
    alignItems: "center",
  },
  parentHr: {
    height: 1,
    color: theme.colors.white,
    width: "100%",
  },
  child: {
    padding: 16,
  },
});
