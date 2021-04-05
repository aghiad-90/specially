/**
 * Airbnb Clone App
 * @author: Andy
 * @Url: https://www.cubui.com
 */

import React, { Component } from "react";
import { PropTypes } from "prop-types";
import {
  View,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import Stars from "../Stars";
import { Card } from "react-native-cards";
import { BASE_API_URL } from "../../services/config";
import { theme } from "../../core/theme";
// import ProgressiveImage from "rn-progressive-image";
import { translate } from "../../utils/utils";
import { I18nManager } from "react-native";
import Text from "../Text";
import Icon from "react-native-vector-icons/Ionicons";

/**
 * @class Listing
 */

export default class Listings extends Component {
  constructor(props) {
    super(props);
    this.renderListings = this.renderListings.bind(this);
  }

  renderListings() {
    const {
      listings,
      showAddToFav,
      handleAddToFav,
      favouriteListings,
      handleDealClick,
    } = this.props;

    return listings.map((listing, index) => (
      <TouchableOpacity
        onPress={() => handleDealClick(listing)}
        key={`listing-${index}`}
      >
        <Card style={styles.card}>
          <View>
            {true ? (
              <View style={styles.percentageOff}>
                <View style={[styles.triangleCorner, this.props.style]} />
                <Text style={[styles.textOff]}>
                  {translate("OFF")}
                  {`\n` + listing.percDiff}
                </Text>
              </View>
            ) : null}
            {/* <ProgressiveImage
              style={styles.image}
              thumbnailSource={{ uri: `${BASE_API_URL}${listing.main_image}` }}
              resizeMode="cover"
              imageSource={{ uri: `${BASE_API_URL}${listing.main_image}` }}
            /> */}

            <Text style={[{ color: listing.color }, styles.listingType]}>
              {listing.type}
            </Text>
            <Text style={[styles.listingTitle]} numberOfLines={1} bold>
              {listing.deal_title.trim()}
            </Text>

            {!I18nManager.isRTL && (
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.listingPriceOld}>
                  {translate("JD")}
                  {listing.pre_price}
                </Text>

                <Text style={styles.listingPrice}>{"-"}</Text>
                <Text style={styles.listingPrice}>
                  {translate("JD")}
                  {listing.new_price}
                </Text>

                <View style={styles.location}>
                  <Icon name="ios-pin" style={styles.iconlocation} />
                  <Text numberOfLines={1} style={[styles.iconlocationText]}>
                    {listing.company_branch.city.name.trim()}
                  </Text>
                </View>
              </View>
            )}

            {I18nManager.isRTL && (
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.listingPriceOld}>
                  {listing.pre_price}
                  {translate("JD")}
                </Text>

                <Text style={styles.listingPrice}>{"-"}</Text>
                <Text style={styles.listingPrice}>
                  {listing.new_price}
                  {translate("JD")}
                </Text>

                <View style={styles.location}>
                  <Icon name="ios-pin" style={styles.iconlocation} />
                  <Text numberOfLines={1} style={[styles.iconlocationText]}>
                    {listing.company_branch.city.name.trim()}
                  </Text>
                </View>
              </View>
            )}

            {listing.final_rate > 0 ? (
              <Stars
                style={styles.starts}
                votes={listing.final_rate}
                size={10}
                color={theme.colors.green02}
              />
            ) : null}
          </View>
        </Card>
      </TouchableOpacity>
    ));
  }

  render() {
    const { title, icon, boldTitle, listings } = this.props;
    const titleStyle = boldTitle
      ? { fontSize: 22, fontWeight: "600" }
      : { fontSize: 18 };
    return (
      <View style={styles.wrapper}>
        <View style={styles.titleWrapper}>
          <View style={styles.separatorContainer}>
            <View style={styles.separatorLine} />

            <View style={styles.rowShape}>
              <View style={styles.itemStyle}>
                <Image
                  style={styles.imageIcon}
                  resizeMode="cover"
                  source={{ uri: `${BASE_API_URL}${icon}` }}
                />
              </View>
              <View style={styles.itemStyle}>
                <Text>{title}</Text>
              </View>
            </View>

            <View style={styles.separatorLine} />
          </View>

          {/* <TouchableOpacity style={styles.seeAllBtn}>
            <Text style={styles.seeAllBtnText}>
              See all
          </Text>
            <Icon
              name="angle-right"
              size={20}
              color={colors.blue}
            />
          </TouchableOpacity> */}
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ paddingRight: 30 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {listings.length > 0 && this.renderListings()}
          {listings.length <= 0 && (
            <View
              style={{
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                width: Dimensions.get("window").width - 30,
                borderRadius: 10,
                overflow: "hidden",
                backgroundColor: theme.colors.white,
                elevation: 1,
              }}
            >
              <Image
                resizeMode="contain"
                source={require("app/assets/nodata.png")}
                style={styles.imageNoData}
              />
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

/**
 *
 */
Listings.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  boldTitle: PropTypes.bool,
  listings: PropTypes.array.isRequired,
  showAddToFav: PropTypes.bool,
  handleAddToFav: PropTypes.func,
  handleDealClick: PropTypes.func,
  favouriteListings: PropTypes.array,
};

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
  },
  titleWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 21,
    paddingRight: 21,
  },
  title: {
    color: theme.colors.primary,
    fontSize: 20,
    fontWeight: "bold",
  },
  seeAllBtn: {
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  seeAllBtnText: {
    color: theme.colors.blue,
    marginRight: 5,
  },
  scrollView: {
    marginTop: 10,
    marginLeft: 15,
    marginBottom: 10,
  },
  card: {
    borderRadius: 3,
    paddingBottom: 6,
    width: 250,
    flexDirection: "column",
  },
  image: {
    width: 250,
    height: 150,
    marginBottom: 0,
  },
  imageIcon: {
    width: 25,
    alignItems: "center",
    height: 25,
    marginBottom: 0,
  },
  listingTitle: {
    fontSize: 15,
    paddingLeft: 6,
    paddingRight: 6,
    letterSpacing: 0.3,
    color: theme.colors.gray04,
    marginTop: -10,
    ...(I18nManager.isRTL ? { textAlign: "left" } : {}),
  },
  starts: {
    tintColor: theme.colors.primary,
    paddingLeft: 6,
    paddingRight: 6,
  },
  listingType: {
    fontSize: 10,
    paddingLeft: 6,
    paddingRight: 6,
  },
  addToFavoriteBtn: {
    position: "absolute",
    right: 12,
    top: 7,
    zIndex: 2,
  },
  percentageOff: {
    position: "absolute",
    zIndex: 2,
  },
  percentageOffThird: {
    position: "absolute",
    zIndex: 3,
  },
  percentageOffFourth: {
    position: "absolute",
    zIndex: 4,
  },
  listingPrice: {
    color: theme.colors.blue,
    marginTop: 4,
    marginBottom: 2,
    paddingLeft: 6,
    paddingRight: 6,
    fontSize: 15,
  },

  listingPriceOld: {
    color: theme.colors.primary,
    marginTop: 4,
    marginBottom: 2,
    paddingLeft: 6,
    paddingRight: 6,
    fontSize: 15,
    textDecorationLine: "line-through",
  },
  textOff: {
    fontWeight: "700",
    color: theme.colors.white,
    fontSize: 12,
    padding: 5,
    ...(I18nManager.isRTL
      ? { transform: [{ rotate: "-310deg" }] }
      : { transform: [{ rotate: "-40deg" }] }),
  },
  separatorContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  separatorLine: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    height: StyleSheet.hairlineWidth,
    borderColor: theme.colors.blue,
    borderWidth: 0.8,
  },
  separatorOr: {
    color: theme.colors.primary,
    width: 150,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingBottom: 5,
    fontSize: 18,
  },
  rowShape: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemStyle: {
    alignItems: "center",
    marginEnd: 5,
    marginStart: 5,
    justifyContent: "center",
    justifyContent: "space-between",
  },
  rowShapeMain: {
    flexDirection: "row",
    alignItems: "center",
  },
  triangleCorner: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    position: "absolute",
    zIndex: 0,
    borderStyle: "solid",
    borderRightWidth: 60,
    borderTopWidth: 60,
    borderRightColor: "transparent",
    borderTopColor: theme.colors.primary,
  },
  imageNoData: {
    width: "100%",
    height: 200,
  },
  location: {
    flex: 1,
    marginTop: 2,
    justifyContent: "flex-end",
    paddingStart: 5,
    paddingEnd: 7,
    alignContent: "center",
    alignItems: "center",
    top: 0,
    bottom: 0,
    // backgroundColor: theme.colors.primary,
    color: theme.colors.gray04,
    flexDirection: "row",
  },
  iconlocation: {
    fontSize: 18,
    marginTop: 1,
    color: theme.colors.primary,
    textAlign: "center",
  },

  iconlocationText: {
    color: theme.colors.gray04,
    fontSize: 15,
    textTransform: "capitalize",
    paddingStart: 4,
    ...(I18nManager.isRTL ? { textAlign: "left" } : {}),
    textAlign: "center",
  },
});
