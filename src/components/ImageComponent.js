import React from "react";
import { Image } from "react-native";

/**
 * Image component
 */
export default class Images extends React.Component {
  static defaultProps = {
    source: [],
    onError: () => {},
  };

  state = { current: 0 };

  /**
   * @typedef {Function}
   * @param {Object} error
   */
  onError = (error) => {
    this.props.onError(error);
    const next = this.state.current + 1;
    if (next < this.props.source.length) {
      this.setState({ current: next });
    }
  };

  render() {
    const { onError, source, ...rest } = this.props;
    return (
      <Image
        source={source[this.state.current]}
        onError={this.onError}
        {...rest}
      />
    );
  }
}
