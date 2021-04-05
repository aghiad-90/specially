import React, { memo } from "react";
import { StyleSheet, Text } from "react-native";
import { theme } from "../../core/theme";

/**
 *
 * @param {Text} children the text to be shown in the paragraph
 * @returns return the Paragraph
 */

const Paragraph = ({ children }) => <Text style={styles.text}>{children}</Text>;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 26,
    color: theme.colors.secondary,
    textAlign: "center",
    marginBottom: 14,
  },
});

export default memo(Paragraph);
