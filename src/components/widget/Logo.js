import React, { memo } from "react";
import { Image, StyleSheet } from "react-native";

/**
 *
 * @returns return the App logo
 */

const Logo = () => (
  <Image source={require("app/assets/logo.png")} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 220,
    height: 128,
    marginBottom: 32,
    marginTop: 20,
  },
});

export default memo(Logo);
