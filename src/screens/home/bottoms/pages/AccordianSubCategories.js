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

import AccordianFilters from "./AccordianFilters";
import { FlatList } from "react-native-gesture-handler";

/**
 *
 */
class AccordianSubCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      index: 0,
    };

    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {
    var filters = [];
    for (let k in this.state.data) {
      var item = {};
      item.title = this.state.data[k].sub_filter.title;
      item.selected = true;
      item.category_id = this.props.category_id;
      item.sub_category_id = this.props.sub_category_id;
      item.data = this.state.data[k].sub_filter.filter_options;
      filters.push(item);
    }

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
              {this.props.title.toUpperCase()}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.parentHr} />
        {this.props.selected && (
          <View style={styles.child}>
            <FlatList
              data={filters}
              extraData={this.state}
              renderItem={({ item, index }) => (
                <AccordianFilters
                  key={`AccordianFilters-${index}`}
                  title={item.title}
                  index={index}
                  category_id={item.category_id}
                  sub_category_id={item.sub_category_id}
                  selected={item.selected}
                  filters={(filters) => {
                    this.props.filters(filters);
                  }}
                  toggleExpand={(index) => {
                    // for (let k in this.state.data) {
                    //     if (index !== k)
                    //         this.state.data[k].selected = false;
                    // }
                    this.state.data[index].selected = !this.state.data[index]
                      .selected;
                    this.setState({ data: this.state.data, index: index });
                    this.props.toggleExpand(this.props.index, index);
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
  toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.props.toggleExpand(this.props.index);
  };
}

export default AccordianSubCategories;

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
    padding: moderateScale(10),
  },
});
