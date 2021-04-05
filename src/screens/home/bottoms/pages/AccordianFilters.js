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
import AccordianFiltersOptions from "./AccordianFiltersOptions";
import { FlatList } from "react-native-gesture-handler";

/**
 *
 */

class AccordianFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      expanded: false,
    };

    console.log("props.data", props.data);

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
          </View>
        </TouchableOpacity>
        <View style={styles.parentHr} />
        {this.props.selected && (
          <View style={styles.child}>
            <FlatList
              data={this.props.data}
              extraData={this.state}
              renderItem={({ item, index }) => (
                <AccordianFiltersOptions
                  key={`AccordianFiltersOptions-${index}`}
                  title={item.title}
                  isCode={item.isCode}
                  code={item.code}
                  index={index}
                  selected={item.selected}
                  toggleExpand={(index) => {
                    for (let k in this.state.data) {
                      if (index !== k) this.state.data[k].selected = false;
                    }
                    this.state.data[index].selected = !this.state.data[index]
                      .selected;
                    this.setState({ data: this.state.data, index: index });
                    // console.log(this.props.data[index])
                    this.props.filters({
                      filter_option_id: this.props.data[index].filter_option_id,
                      sub_filter_id: this.props.data[index].sub_filter_id,
                      category_id: this.props.category_id,
                      sub_category_id: this.props.sub_category_id,
                    });
                  }}
                  data={item.data}
                />
              )}
            />
          </View>
        )}
      </View>
    );
  }

  /**
   *
   * @param {Object} data getting the data to display
   * @returns it will return the item
   */

  renderAccordians = (data) => {
    const items = [];
    for (item of data) {
      items.push(<AccordianFiltersOptions title={item.title} />);
    }
    return items;
  };

  /**
   *
   */
  toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.props.toggleExpand(this.props.index);
  };
}

export default AccordianFilters;

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: theme.colors.gray01,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 25,
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
