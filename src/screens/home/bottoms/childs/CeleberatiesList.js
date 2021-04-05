import React, { Component } from 'react';
import { View, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../../../actions/Actions';
import { theme } from "../../../../core/theme";
import { moderateScale, scale } from 'react-native-size-matters';
import { Text } from '../../../../components/widget';
import { I18nManager } from 'react-native';
import { BASE_API_URL_IMAEG_ORIGINAL, FONT_FAMILY } from '../../../../services/config';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import ImageComponent from '../../../../components/ImageComponent';
import TextTicker from 'react-native-text-ticker'
import * as Apis from '../../../../services/Apis';




class Celeberaties extends Component {


    constructor(props) {
        super(props);
        this.state = { selectedCategory: 0 }

    }



    _renderItem({ item, index }) {
        return (
            <TouchableOpacity key={'main-category2' + index} style={[{
                marginTop: moderateScale(0), marginEnd: moderateScale(20), borderRadius: moderateScale(10)
            }]} onPress={() => { this.props.navigation.navigate('CeleberateDetails', { item: item }) }}>
                <View style={{ paddingVertical: moderateScale(10), }}>

                    <Image source={{ uri: (BASE_API_URL_IMAEG_ORIGINAL + (item.images[0] ? item.images[0].url : '')) }} resizeMode={'cover'} style={{
                        height: moderateScale(220), width: '100%', borderRadius: moderateScale(0), marginTop: moderateScale(10), borderRadius: moderateScale(10), zIndex: 2,
                    }} />


                    <View style={{ paddingTop: moderateScale(20), top: moderateScale(-20), zIndex: 0, }}>
                        <View style={{ width: '100%', flexDirection: 'row', paddingHorizontal: moderateScale(5), justifyContent: 'center', alignContent: 'center', alignItems: 'center', paddingTop: moderateScale(5) }}>

                            <View style={{ flexDirection: 'row', paddingStart: moderateScale(10), flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center', width: '100%' }}>
                                {item.verified === 0 &&
                                    <Image source={require('app/assets/assets/verified.png')} resizeMode={'cover'} style={{
                                        height: moderateScale(12), width: moderateScale(12), borderRadius: moderateScale(50)
                                    }} />}
                                <Text numberOfLines={1} style={[styles.heading, {
                                    ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold', textAlign: 'left',
                                    color: theme.colors.secondary, fontSize: moderateScale(11),
                                    marginHorizontal: moderateScale(5), marginEnd: moderateScale(10)
                                }]}>{item.first_name + ' ' + item.last_name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: moderateScale(10), borderWidth: moderateScale(0.5), backgroundColor: theme.colors.white, padding: moderateScale(3) }}>
                                <Text style={[{
                                    ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold', textAlign: 'right',
                                    color: theme.colors.secondary, fontSize: moderateScale(7), paddingHorizontal: moderateScale(5)
                                }]}>{item.profession}</Text>

                                <Image source={{ uri: (BASE_API_URL_IMAEG_ORIGINAL + item.country.image) }} resizeMode={'cover'} style={{
                                    height: moderateScale(10), width: moderateScale(10), borderRadius: moderateScale(20),
                                }} />
                            </View>
                        </View>

                        <View style={{
                            flexDirection: 'row', paddingHorizontal: moderateScale(0), marginTop: moderateScale(10),
                            borderRadius: moderateScale(10), paddingBottom: moderateScale(10), justifyContent: 'center', alignItems: 'center'
                        }}>


                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('CeleberateBooking', { item: item }) }} style={{
                                marginHorizontal: moderateScale(0), backgroundColor: theme.colors.secondary,
                                width: moderateScale(75), height: moderateScale(20), alignItems: 'center', borderRadius: moderateScale(10), justifyContent: 'center', borderColor: theme.colors.secondary, borderWidth: moderateScale(0.5)
                            }}>
                                <Text style={[styles.heading, {
                                    ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold', textAlign: 'center',
                                    color: theme.colors.white, fontSize: moderateScale(9),

                                }]}>{'Book Now'}</Text>
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'row', paddingHorizontal: moderateScale(10), flex: 1, alignItems: 'center', alignContent: 'center', justifyContent: 'flex-end' }}>
                                <Image source={require('app/assets/assets/heart.png')} resizeMode={'contain'} style={{
                                    height: moderateScale(15), width: moderateScale(15), borderRadius: moderateScale(50)
                                }} />
                                <Text style={[{
                                    ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold', textAlign: 'right',
                                    color: theme.colors.secondary, fontSize: moderateScale(12), marginStart: moderateScale(5)
                                }]}>{'1k'}</Text>
                            </View>
                        </View>
                    </View>

                </View>

            </TouchableOpacity>
        )
    }





    render() {

        console.log(this.props.navigation)

        return (
            <View style={{
                backgroundColor: theme.colors.white
            }}>



                <FlatList
                    data={this.props.celeberatiesWithCategory}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <View key={'main-category' + index} style={[{
                            margin: moderateScale(5),
                            marginTop: moderateScale(0), height: moderateScale(35), justifyContent: 'center', borderRadius: moderateScale(0),
                            marginHorizontal: moderateScale(15), ...this.state.selectedCategory === index ? { backgroundColor: theme.colors.secondary, marginRight: moderateScale(0), } :
                                { backgroundColor: theme.colors.gray01, borderWidth: moderateScale(0.5), borderColor: theme.colors.gray01 }
                        }]}>
                            <TouchableOpacity
                                onPressIn={this.handlePressIn}
                                onPressOut={this.handlePressOut}
                                onPress={() => {
                                    ReactNativeHapticFeedback.trigger('selection', {
                                        enableVibrateFallback: true,
                                        ignoreAndroidSystemSettings: false
                                    });
                                    this.setState({ selectedCategory: index })
                                    setTimeout(() => {
                                        this.props.selectedCategoryChanged(item._id)
                                    }, 100);
                                }}
                                style={{ paddingHorizontal: moderateScale(15), paddingVertical: moderateScale(10) }} >
                                <Text style={[styles.heading, { ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold', textAlign: 'center', alignSelf: 'center', paddingHorizontal: moderateScale(5), ...this.state.selectedCategory === index ? { color: theme.colors.white, } : { color: theme.colors.secondary } }]}>{ }{String(item.title).toUpperCase()}</Text>
                            </TouchableOpacity>
                        </View>

                    )}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                />





                <FlatList
                    data={this.props.celeberaties}
                    contentContainerStyle={{
                        marginTop: moderateScale(20), width: '100%', alignSelf: 'center'
                    }}
                    extraData={this.props}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index, column }) => (

                        <TouchableOpacity key={'main-category-celeraty-id' + index} style={[{
                            marginTop: moderateScale(0), borderRadius: moderateScale(10),
                            width: '50%', padding: moderateScale(10)
                        }]} onPress={() => { this.props.navigation.navigate('CeleberateDetails', { item: item }) }}>
                            <View style={{ paddingVertical: moderateScale(10), }}>

                                <ImageComponent
                                    source={[{ uri: (BASE_API_URL_IMAEG_ORIGINAL + (item.cover_image)) }, require('../../../../assets/assets/logothumpnail.jpg')]}
                                    resizeMode={'cover'} style={{
                                        height: moderateScale(220), width: '100%', borderRadius: moderateScale(0), marginTop: moderateScale(10), borderRadius: moderateScale(10), zIndex: 2,
                                    }} />


                                <View style={{ paddingTop: moderateScale(20), top: moderateScale(-20), zIndex: 0, }}>
                                    <View style={{ width: '100%', flexDirection: 'row', paddingHorizontal: moderateScale(5), justifyContent: 'center', alignContent: 'center', alignItems: 'center', paddingTop: moderateScale(5) }}>

                                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center', width: '100%' }}>
                                            {item.verified !== 0 &&
                                                <Image source={require('app/assets/assets/verified.png')} resizeMode={'cover'} style={{
                                                    height: moderateScale(12), width: moderateScale(12), borderRadius: moderateScale(50)
                                                }} />
                                            }
                                            <View style={{ flex: 1 }}>
                                                <View style={{ width: moderateScale(70) }}>
                                                    <TextTicker
                                                        loop
                                                        bounce
                                                        duration={2000}
                                                        repeatSpacer={50}
                                                        marqueeDelay={100}
                                                        style={[styles.heading, {
                                                            ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold', textAlign: 'left',
                                                            color: theme.colors.secondary, fontSize: moderateScale(11),
                                                            marginHorizontal: moderateScale(5), marginEnd: moderateScale(10), fontFamily: FONT_FAMILY,
                                                        }]}>{item.first_name + ' ' + item.last_name}</TextTicker>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: moderateScale(10), backgroundColor: theme.colors.white, padding: moderateScale(3) }}>
                                            <Text style={[{
                                                ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold', textAlign: 'right',
                                                color: theme.colors.secondary, fontSize: moderateScale(7), paddingHorizontal: moderateScale(5)
                                            }]}>{item.profession}</Text>

                                            <Image source={{ uri: (BASE_API_URL_IMAEG_ORIGINAL + item.country.image) }} resizeMode={'cover'} style={{
                                                height: moderateScale(10), width: moderateScale(10), borderRadius: moderateScale(20),
                                            }} />
                                        </View>
                                    </View>

                                    <View style={{
                                        flexDirection: 'row', paddingHorizontal: moderateScale(0), marginTop: moderateScale(10),
                                        borderRadius: moderateScale(10), paddingBottom: moderateScale(10), justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('CeleberateBooking', { item: item }) }} style={{
                                            marginHorizontal: moderateScale(0), backgroundColor: theme.colors.secondary,
                                            width: moderateScale(85), height: moderateScale(25), alignItems: 'center', borderRadius: moderateScale(10), justifyContent: 'center', borderColor: theme.colors.secondary, borderWidth: moderateScale(0.5)
                                        }}>
                                            <Text style={[styles.heading, {
                                                ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold', textAlign: 'center',
                                                color: theme.colors.white, fontSize: moderateScale(10),

                                            }]}>{'Make a Request'}</Text>
                                        </TouchableOpacity>

                                        <View style={{ flex: 1, alignItems: 'center', alignContent: 'center', justifyContent: 'flex-end', flexDirection: 'row', }}>
                                            <TouchableOpacity onPress={() => {

                                                this.props.celeberaties[index].isLike = !this.props.celeberaties[index].isLike;

                                                item.isLike = this.props.celeberaties[index].isLike;
                                                if (this.props.celeberaties[index].isLike) {
                                                    item.likes++;
                                                } else {
                                                    item.likes--;
                                                }
                                                this.props.updateLike(this.props.celeberaties)
                                                Apis.Post('users/addFav/' + (item.id ? item.id : item._id), {}).then((data) => {


                                                }).catch((error) => {
                                                    console.log(error);
                                                    this.setState({ isLoading: false })
                                                })


                                            }} style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'flex-end' }}>
                                                <Image source={require('../../../../assets/assets/eye.png')} resizeMode={'cover'} style={{
                                                    height: moderateScale(20), width: moderateScale(20), marginBottom: moderateScale(1), tintColor: theme.colors.secondary
                                                }} />
                                                <Text style={[{
                                                    ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold', textAlign: 'right',
                                                    color: theme.colors.secondary, fontSize: moderateScale(12), marginStart: moderateScale(5)
                                                }]}>{item.views}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => {

                                                this.props.celeberaties[index].isLike = !this.props.celeberaties[index].isLike;

                                                item.isLike = this.props.celeberaties[index].isLike;
                                                if (this.props.celeberaties[index].isLike) {
                                                    item.likes++;
                                                } else {
                                                    item.likes--;
                                                }
                                                this.props.updateLike(this.props.celeberaties)
                                                Apis.Post('users/addFav/' + (item.id ? item.id : item._id), {}).then((data) => {


                                                }).catch((error) => {
                                                    console.log(error);
                                                    this.setState({ isLoading: false })
                                                })


                                            }} style={{ flexDirection: 'row', paddingHorizontal: moderateScale(5), alignItems: 'center', alignContent: 'center', justifyContent: 'flex-end' }}>
                                                <Image source={item.isLike ? require('app/assets/assets/ic_heart_red.png') : require('app/assets/assets/ic_heart_red_empty.png')} resizeMode={'contain'} style={{
                                                    height: moderateScale(20), width: moderateScale(20),
                                                }} />
                                                <Text style={[{
                                                    ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold', textAlign: 'right',
                                                    color: theme.colors.secondary, fontSize: moderateScale(12), marginStart: moderateScale(5)
                                                }]}>{item.likes}</Text>
                                            </TouchableOpacity>
                                        </View>



                                    </View>
                                </View>

                            </View>

                        </TouchableOpacity>

                    )}
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }

}


const styles = StyleSheet.create({
    container_scrolling: {
        flex: 1,
        backgroundColor: theme.colors.white,

    },
    wrapper: {
        flex: 1,
        backgroundColor: theme.colors.gray06
    },
    wrapperCategory: {
        paddingRight: 0,
        paddingStart: scale(8),
        flex: 1
    },

    exampleContainer: {
        paddingVertical: moderateScale(15),
    },
    sliderContentContainer: {
        paddingVertical: 0,
    },
    slider: {
        marginTop: 0,
        overflow: 'visible',
    },
    card: {
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    heading: {
        fontSize: moderateScale(14),
        color: theme.colors.primary,
        width: '100%', fontWeight: '500', alignSelf: 'flex-start'
    }
});



const mapStateToProps = (state) => ({
    data: {
        cart: state.app.cart,
        userInfo: state.login.userInfo,
    },
})
const mapDispatchToProps = (dispatch) => ({
    actions: {
        product: bindActionCreators(loginActions, dispatch)
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Celeberaties))


