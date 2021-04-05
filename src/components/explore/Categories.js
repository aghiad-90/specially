import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { PropTypes } from "prop-types";

import { BASE_API_URL } from "../../services/config";
import { theme } from "../../core/theme";
import Text from "../Text";
var width = Dimensions.get("window").width; //full width

/**
 *
 *
 */

export default class Categories extends Component {
  /**
   * get category from the API
   */
  get Categories() {
    const { categories, handleCategoryClick } = this.props;
    return categories.map((category, index) => (
      <TouchableOpacity
        style={styles.InnerWrapper}
        key={`category-item-${index}`}
        onPress={() => handleCategoryClick(category)}
      >
        <View style={styles.innerCard}>
          <Image
            source={category.photo}
            resizeMode="contain"
            source={{ uri: `${BASE_API_URL}${category.icon}` }}
            style={styles.image}
          />
          <Text style={styles.listingType}>{category.name}</Text>
        </View>
      </TouchableOpacity>
    ));
  }

  render() {
    return (
      <View style={styles.card}>
        <ScrollView
          contentContainerStyle={styles.wrapper}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {this.Categories}
        </ScrollView>
      </View>
    );
  }
}

/**
 * @property handleClick
 */
Categories.propTypes = {
  handleCategoryClick: PropTypes.func,
};

const styles = StyleSheet.create({
  wrapper: {
    paddingRight: 0,
    paddingStart: 10,
    flexWrap: "nowrap",
    flexDirection: "row",
  },
  InnerWrapper: {
    justifyContent: "center",
    flex: 1,
  },
  card: {
    height: 60,
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
  innerCard: {
    // backgroundColor: theme.colors.primary,
    height: 70,
    width: 75,
    maxWidth: 80,
    minWidth: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 35,
    height: 35,
  },
  listingType: {
    fontSize: 12,
    paddingTop: 7,
    textAlign: "center",
    height: 20,
    alignItems: "center",
  },
});
