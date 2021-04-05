import React, { Component } from 'react';
import { View, TouchableOpacity, Animated, Dimensions, Image } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from '../styles/SliderEntry.style';
import { theme } from '../../../../core/theme';
import {
    CachedImage
} from 'react-native-cached-image';
import { BASE_API_URL } from '../../../../services/config';
import { moderateScale } from 'react-native-size-matters';
export default class SliderEntry extends Component {

    state = {
        animatedStartValue: new Animated.Value(1),
    }


    handlePressIn = () => {
        const { animatedStartValue } = this.state;
        Animated.timing(
            animatedStartValue,
            {
                toValue: 0.95,
                duration: 200,
                useNativeDriver: true,
            },
        ).start();
    }

    handlePressOut = () => {
        const { animatedStartValue } = this.state;
        Animated.timing(
            animatedStartValue,
            {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            },
        ).start();
    }

    static propTypes = {
        data: PropTypes.object.isRequired,
        handleMealClick: PropTypes.func,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object,
    };

    get image() {
        const { data, parallax, parallaxProps } = this.props;
        // console.log(`${BASE_API_URL}${data.image}`);
        return !parallax ? (
            <ParallaxImage
                source={{ uri: `${BASE_API_URL}${data.image}` }}
                containerStyle={[styles.imageContainer]}
                style={styles.image}
                parallaxFactor={0.35}
                showSpinner={true}
                spinnerColor={theme.colors.primary}
                {...parallaxProps} />
        ) : (
                <CachedImage
                    source={data.image}
                    style={[styles.image, { zIndex: 1 }]}
                />
            );
    }


    onPress = () => {

    }

    render() {
        const { index, handleResturentClick } = this.props;
        const { data } = this.props;

        const { animatedStartValue } = this.state;
        const animatedStyle = {
            transform: [{ scale: animatedStartValue }],
        };


        return (

            <Animated.View style={[animatedStyle, {}]}>
                <TouchableOpacity onPress={() => handleResturentClick(data)}
                    onPressIn={this.handlePressIn}
                    onPressOut={this.handlePressOut} activeOpacity={.7}>
                    <View style={styles.slideInnerContainer}>
                        <View style={styles.shadow} />
                        <View style={{ width: '100%', position: 'absolute', flex: 1, height: '100%', justifyContent: 'flex-end', alignContent: 'flex-end', alignItems: 'flex-end' }}>
                            <Image resizeMode="stretch" style={{ marginStart: '40%', width: '60%', position: 'absolute', flex: 1, height: '80%', marginTop: '29%', zIndex: 1, top: moderateScale(19), left: moderateScale(8) }} source={require('app/assets/resback.png')} />
                        </View>
                        {this.image}
                    </View>
                </TouchableOpacity>

            </Animated.View>
        );
    }
}