import React from "react";
import { View, Image } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Text } from "../../components/widget";
import { theme } from "../../core/theme";
import { translate } from "../../utils/utils";

/**
 * @param {Object} param0
 */

export const BottomMenuItem = ({ isCurrent, index, totalCount }) => {
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",

        alignItems: "center",
      }}
    >
      {isCurrent && (
        <Image
          resizeMode="contain"
          source={
            index === 0
              ? require("../../assets/assets/ic_home.png")
              : index === 1
              ? require("../../assets/assets/ic_discover.png")
              : index === 2
              ? require("../../assets/assets/ic_event.png")
              : index === 3
              ? require("../../assets/assets/notiifcation-new.png")
              : require("../../assets/assets/ic_account.png")
          }
          style={{
            width: moderateScale(25),
            height: moderateScale(25),
            tintColor: theme.colors.gray02,
          }}
        />
      )}
      {!isCurrent && (
        <Image
          resizeMode="contain"
          source={
            index === 0
              ? require("../../assets/assets/ic_home.png")
              : index === 1
              ? require("../../assets/assets/ic_discover.png")
              : index === 2
              ? require("../../assets/assets/ic_event.png")
              : index === 3
              ? require("../../assets/assets/notiifcation-new.png")
              : require("../../assets/assets/ic_account.png")
          }
          style={{
            width: moderateScale(25),
            height: moderateScale(25),
            tintColor: theme.colors.secondary,
          }}
        />
      )}

      {index === 3 && totalCount !== 0 && totalCount !== "0" && totalCount && (
        <View
          style={{
            position: "absolute",
            backgroundColor: theme.colors.white,
            top: moderateScale(12),
            right: moderateScale(15),
            borderWidth: moderateScale(1),
            borderColor: theme.colors.primary,
            minWidth: moderateScale(15),
            minHeight: moderateScale(15),
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            borderRadius: moderateScale(50),
            padding: moderateScale(2),
          }}
        >
          <Text style={{ fontSize: moderateScale(10) }}>{totalCount}</Text>
        </View>
      )}
    </View>
  );
};
