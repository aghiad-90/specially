import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, Image, Animated, Dimensions, Alert } from 'react-native'
import { moderateScale } from 'react-native-size-matters'
import { theme } from '../../../../../core/theme'
import { FONT_FAMILY } from '../../../../../services/config'
import { Text } from '../../../../widget'


const WIDTH = Dimensions.get('screen').width
const HEIGHT = Dimensions.get('screen').height

class Popup extends Component {
	static popupInstance

	static show({ ...config }) {
		this.popupInstance.start(config)
	}



	// componentDidMount() {
	// 	this.start({
	// 		type: 'Danger',
	// 		title: 'Do you want to cancel your reservation?',
	// 		button: true,
	// 		textBody: 'Your reservation deposit will be lost',
	// 		buttonText: 'Cancel reservation',
	// 		duration: 100,
	// 		callback: () => Popup.hide()
	// 	});
	// }



	static hide() {
		this.popupInstance.hidePopup()
	}

	state = {
		positionView: new Animated.Value(HEIGHT),
		opacity: new Animated.Value(0),
		positionPopup: new Animated.Value(HEIGHT),
		popupHeight: 0
	}

	start({ ...config }) {
		this.setState({
			title: config.title,
			type: config.type,
			icon: config.icon !== undefined ? config.icon : false,
			textBody: config.textBody,
			image: config.image,
			button: config.button !== undefined ? config.button : true,
			buttonText: config.buttonText || 'Ok',
			callback: config.callback !== undefined ? config.callback : this.defaultCallback(),
			background: config.background || 'rgba(0, 0, 0, 0.5)',
			timing: config.timing,
			autoClose: config.autoClose !== undefined ? config.autoClose : false
		})

		Animated.sequence([
			Animated.timing(this.state.positionView, {
				toValue: 0,
				duration: 100,
				useNativeDriver: false
			}),
			Animated.timing(this.state.opacity, {
				toValue: 1,
				duration: 300,
				useNativeDriver: false
			}),
			Animated.spring(this.state.positionPopup, {
				toValue: (HEIGHT / 2) - (this.state.popupHeight / 2),
				bounciness: 15,
				useNativeDriver: true
			})
		]).start()

		if (config.autoClose && config.timing !== 0) {
			const duration = config.timing > 0 ? config.timing : 5000
			setTimeout(() => {
				this.hidePopup()
			}, duration)
		}
	}

	hidePopup() {
		Animated.sequence([
			Animated.timing(this.state.positionPopup, {
				toValue: HEIGHT,
				duration: 250,
				useNativeDriver: true
			}),
			Animated.timing(this.state.opacity, {
				toValue: 0,
				duration: 300,
				useNativeDriver: false
			}),
			Animated.timing(this.state.positionView, {
				toValue: HEIGHT,
				duration: 100,
				useNativeDriver: false
			})
		]).start()
	}

	defaultCallback() {
		return Alert.alert(
			'Callback!',
			'Callback complete!',
			[
				{ text: 'Ok', onPress: () => this.hidePopup() }
			]
		)
	}

	handleImage(type) {
		switch (type) {
			case 'Danger': return require('../../assets/Error.png')
			case 'Warning': return require('../../assets/Warning.png')
		}
	}

	render() {
		const { title, image, type, textBody, button, buttonText, callback, callbackClose, background } = this.state

		// console.log('imageimageimageimage', image)
		let el = null;
		if (this.state.button) {
			el = <TouchableOpacity style={[styles.Button, styles[type]]} onPress={callback}>
				<Text style={styles.TextButton}>{buttonText}</Text>
			</TouchableOpacity>
		}
		else {
			el = <Text></Text>
		}
		return (
			<Animated.View
				ref={c => this._root = c}
				style={[styles.Container, {
					backgroundColor: background || 'transparent',
					opacity: this.state.opacity,
					transform: [
						{ translateY: this.state.positionView }
					]
				}]}>


				<Animated.View
					onLayout={event => {
						this.setState({ popupHeight: event.nativeEvent.layout.height })
					}}
					style={[styles.Message, {
						transform: [
							{ translateY: this.state.positionPopup }
						]
					}]}

				>
					<View style={styles.Content}>
						<Image resizeMode={'contain'} style={{ width: moderateScale(80), height: moderateScale(80), marginBottom: moderateScale(20) }} source={image ? image : require('../../../../../assets/assets/delete_warning.gif')} />

						<Text style={styles.Title}>{title}</Text>
						<Text style={styles.Desc}>{textBody}</Text>


						<View style={{ width: '100%', flexDirection: 'row' }}>

							<TouchableOpacity style={[styles.Button, styles[type], { backgroundColor: theme.colors.secondary }]} onPress={() => { this.hidePopup() }}>
								<Text style={[styles.TextButton, { color: theme.colors.white }]}>{'Cancel'}</Text>
							</TouchableOpacity>

							<View style={{ flex: 1 }} />

							<TouchableOpacity style={[styles.Button, styles[type]]} onPress={callback}>
								<Text style={styles.TextButton}>{buttonText}</Text>
							</TouchableOpacity>
						</View>


						<TouchableOpacity style={{ marginTop: moderateScale(15) }} onPress={() => {

						}}>
						</TouchableOpacity>
					</View>
				</Animated.View>
			</Animated.View>
		)
	}
}

const styles = StyleSheet.create({
	Container: {
		position: 'absolute',
		zIndex: 99999,
		width: '100%',
		height: HEIGHT,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		alignItems: 'center',
		top: 0,
		left: 0
	},
	Message: {
		width: '80%',
		backgroundColor: '#fff',
		borderRadius: 30,
		alignItems: 'center',
		overflow: 'hidden',
		position: 'absolute',
	},
	Content: {
		padding: moderateScale(30),
		alignItems: 'center', width: '100%', justifyContent: 'center', alignSelf: 'center', alignContent: 'center'
	},
	Header: {
		minHeight: 230,
		width: '100%',
		backgroundColor: '#FBFBFB',
		borderRadius: 100,
		marginTop: -120
	},
	Image: {
		width: 100,
		height: 70,
		position: 'absolute',
		top: 10,
	},
	Title: {
		fontWeight: '900',
		fontSize: moderateScale(22),
		color: theme.colors.black,
		fontFamily: FONT_FAMILY, textAlign: 'center'
	},
	Desc: {
		textAlign: 'center',
		color: theme.colors.blackText,
		fontFamily: FONT_FAMILY,
		fontSize: moderateScale(15), fontWeight: '100', marginTop: moderateScale(20)
	},
	Button: {
		borderRadius: moderateScale(10),
		height: moderateScale(45),
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 30, flex: 1
	},
	TextButton: {
		color: '#fff',
		fontWeight: 'bold'
	},
	Success: {
		backgroundColor: theme.colors.primary,
		shadowColor: theme.colors.primary,
	},
	Danger: {
		backgroundColor: theme.colors.canceled,
	},
	Warning: {
		backgroundColor: '#fbd10d',
		shadowColor: "#fbd10d",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.36,
		shadowRadius: 6.68,
		elevation: 11
	}
})

export default Popup
