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
import AccordianSubCategories from "./AccordianSubCategories";
import { moderateScale } from "react-native-size-matters";
import { FlatList } from "react-native-gesture-handler";

/**
 *
 */

export default class Accordian extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
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
              data={this.state.data}
              renderItem={({ item, index }) => (
                <AccordianSubCategories
                  key={`AccordianSubCategories-${index}`}
                  title={item.name}
                  index={index}
                  category_id={this.props.category_id}
                  sub_category_id={item.sub_category_id}
                  selected={item.selected}
                  filters={(filters) => {
                    this.props.filters(filters);
                  }}
                  toggleExpand={(index) => {
                    // for (let k in this.state.data) {
                    //     console.log(index, k);
                    //     if (String(index) !== k)
                    //         this.state.data[k].selected = false;
                    // }
                    this.state.data[index].selected = !this.state.data[index]
                      .selected;
                    this.setState({ data: this.state.data });

                    if (this.state.data[index].selected) {
                      this.props.filters({
                        filter_option_id: undefined,
                        sub_filter_id: undefined,
                        category_id: this.props.category_id,
                        sub_category_id: item.sub_category_id,
                      });
                    } else {
                      this.props.filters({
                        filter_option_id: undefined,
                        sub_filter_id: undefined,
                        category_id: undefined,
                        sub_category_id: undefined,
                      });
                    }
                  }}
                  data={item.filters}
                />
              )}
            />
          </View>
        )}
      </View>
    );
  }

  renderAccordians = (data) => {
    const items = [];
    for (item of data) {
      items.push(
        <AccordianSubCategories title={item.name} data={item.filters} />
      );
    }
    return items;
  };
  toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.props.toggleExpand(this.props.index);
    this.props.filters({
      filter_option_id: undefined,
      sub_filter_id: undefined,
      category_id: this.props.category_id,
      sub_category_id: undefined,
    });
  };
}

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
