import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { theme } from "../../core/theme";

/**
 *
 * @param {String} mode
 * @param {Object} style
 * @param {Object} children
 * @param {Object} props
 * @returns return the Button Component
 */

const Button = ({ mode, style, children, ...props }) => (
  <PaperButton
    color={theme.colors.blue}
    style={[
      styles.button,
      mode === "outlined" && { backgroundColor: theme.colors.blue },
      style,
    ]}
    labelStyle={styles.text}
    mode={mode}
    {...props}
  >
    {children}
  </PaperButton>
);

const styles = StyleSheet.create({
  button: {
    fontFamily: "Montserrat-Regular",
    letterSpacing: 0.3,
    width: "100%",
    color: theme.colors.white,
    marginVertical: 10,
  },
  text: {
    fontFamily: "Montserrat-Regular",
    letterSpacing: 0.3,
    color: theme.colors.white,
    lineHeight: 26,
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default memo(Button);
