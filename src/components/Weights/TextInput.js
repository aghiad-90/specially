import React, { memo } from "react";
import { View, StyleSheet, Text, TextInput as Input } from "react-native";
import { theme } from "../../core/theme";

/**
 *
 * @param {Text} errorText
 * @param {Object} Props
 * @returns return the Text input
 */

const TextInput = ({ errorText, ...props }) => (
  <View style={styles.container}>
    <Input style={styles.input} underlineColor="gray" mode={""} {...props} />
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 12,
  },
  input: {
    fontFamily: "Montserrat-Regular",
    letterSpacing: 0.3,
    fontFamily: "GillSans",
    letterSpacing: 0.3,
    backgroundColor: theme.colors.surface,
    height: 40,
  },
  error: {
    fontFamily: "Montserrat-Regular",
    letterSpacing: 0.3,
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default memo(TextInput);
