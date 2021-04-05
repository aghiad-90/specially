import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
  StyleSheet,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { theme } from "../../core/theme";
import { BottomMenuItem } from "./BottomMenuItem";
import { useSelector, useDispatch } from "react-redux";

/**
 *
 * @param {Object} props
 */

export const TabBar = (props) => {
  const totalCount = useSelector((state) => state.app.totalCount);

  const { navigation } = props;

  const [translateValue] = useState(new Animated.Value(0));
  const totalWidth =
    Dimensions.get("window").width - (5 / 100) * Dimensions.get("window").width;
  const tabWidth = totalWidth / navigation.state.routes.length;
  return (
    <View
      style={[
        style.tabContainer,
        {
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          alignSelf: "center",
          backgroundColor: theme.colors.white,
          width: "100%",
          zIndex: 1,
        },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          width: totalWidth,
          paddingBottom: moderateScale(20),
        }}
      >
        {navigation.state.routes.map((route, index) => {
          const options = route;
          const label = options.routeName;
          const isFocused = navigation.state.index === index;
          const onPress = () => {
            console.log(route, options);
            if (!isFocused) {
              navigation.navigate(route.routeName);
            }
            Animated.spring(translateValue, {
              toValue: index * tabWidth,
              velocity: 10,
              useNativeDriver: true,
            }).start();
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityStates={isFocused ? ["selected"] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
              key={index}
            >
              <BottomMenuItem
                iconName={label.toString()}
                totalCount={totalCount}
                index={index}
                isCurrent={isFocused}
              />
            </TouchableOpacity>
          );
        })}

        <Animated.View
          style={[
            style.slider,
            {
              transform: [{ translateX: translateValue }],
              width: tabWidth - moderateScale(20),
            },
          ]}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  tabContainer: {
    height: moderateScale(80),
    position: "absolute",
    bottom: 0,
    backgroundColor: theme.colors.secondary,
  },
  slider: {
    height: 5,
    position: "absolute",
    bottom: moderateScale(20),
    left: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
  },
});
