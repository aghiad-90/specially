import React, { Component } from 'react';
import { StyleSheet, StatusBar, View, Image, I18nManager } from 'react-native'
import { theme } from '../../../../core/theme';
import { Block, Text, } from '../../../../components/widget';
import * as loginActions from '../../../../actions/Actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../childs/Header';
import { moderateScale } from 'react-native-size-matters';
import { showSuccessPopup, translate } from '../../../../utils/utils';
import { BASE_API_URL_IMAEG_ORIGINAL } from '../../../../services/config';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome'
import { SliderBox } from '../../../../components/react-native-image-slider-box';
import { showMessage } from 'react-native-flash-message';





class CeleberateDetails extends Component {


    videoPlayer = [];
    GiftvideoPlayer = [];


    constructor(props) {
        super(props);
        this.state = {
            isLoading: true, selectedtab: 4, celebraty: this.props.navigation.state.params.item
        }

    }


    componentDidMount() {
        for (let k in this.state.celebraty.videos) {
            this.state.celebraty.videos[k].isLoading = true;
            this.state.celebraty.videos[k].play = true;
        }
        for (let k in this.state.celebraty.giftVideos) {
            this.state.celebraty.giftVideos[k].isLoading = true;
            this.state.celebraty.giftVideos[k].play = true;
        }
        this.setState({ celebraty: this.state.celebraty })
    }


    render() {
        var images = [];
        for (let k in this.props.navigation.state.params.item.imagesList) {
            images.push(BASE_API_URL_IMAEG_ORIGINAL + this.props.navigation.state.params.item.imagesList[k].url)
        }

        var item = this.props.navigation.state.params.item;
        console.log(item)
        return (
            <Block>
                <StatusBar backgroundColor="transparent" barStyle="light-content" />
                <Header search={false} back={false} back={true} navigation={this.props.navigation} backclick={() => { this.props.navigation.pop() }} Text={translate('Request Type')} />
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: moderateScale(20), height: moderateScale(200) }}>
                        <Text style={[styles.heading, {
                            ...I18nManager.isRTL ? { textAlign: 'right' } : {}, textAlign: 'center',
                            color: theme.colors.black, fontSize: moderateScale(20), borderWidth: moderateScale(1), borderRadius: moderateScale(10), padding: moderateScale(10), width: '95Î%', fontWeight: '500'
                        }]}>{'Aute Lorem sunt consectetur sit labore sint eu aliqua nulla magna sit consequat cupidatat. Qui qui adipisicing mollit Lorem minim esse adipisicing in voluptate ut dolore esse. Adipisicing duis eiusmod non magna labore ipsum. Nisi eu ad velit incididunt dolore ullamco.'}</Text>

                    </View>


                    <View style={{ paddingTop: moderateScale(10), paddingHorizontal: moderateScale(5), flexDirection: 'row' }}>


                        <View style={{ flexDirection: 'column', paddingHorizontal: moderateScale(5), justifyContent: 'flex-start', alignContent: 'flex-start', alignItems: 'flex-start', paddingTop: moderateScale(5), paddingStart: moderateScale(10) }}>

                            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-start', alignContent: 'flex-start', marginTop: moderateScale(0) }}>
                                {item.verified === 1 &&
                                    <Image source={require('app/assets/assets/verified.png')} resizeMode={'cover'} style={{
                                        height: moderateScale(15), width: moderateScale(15), marginEnd: moderateScale(5)
                                    }} />
                                }
                                <Text numberOfLines={1} style={[styles.heading, {
                                    ...I18nManager.isRTL ? { textAlign: 'right' } : {}, fontWeight: 'bold', textAlign: 'right',
                                    color: theme.colors.secondary, fontSize: moderateScale(20),
                                }]}>{item.first_name + ' ' + item.last_name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-end', alignItems: 'center', borderRadius: moderateScale(10), borderWidth: moderateScale(0), backgroundColor: theme.colors.white, padding: moderateScale(3), marginStart: moderateScale(10) }}>
                                <Text style={[{
                                    ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold', textAlign: 'right',
                                    color: theme.colors.secondary, fontSize: moderateScale(14), paddingHorizontal: moderateScale(5)
                                }]}>{item.profession}</Text>

                                <Image source={{ uri: (BASE_API_URL_IMAEG_ORIGINAL + item.country.image) }} resizeMode={'cover'} style={{
                                    height: moderateScale(15), width: moderateScale(15), borderRadius: moderateScale(20),
                                }} />
                            </View>
                        </View>


                        <View style={{ height: moderateScale(50), flex: 1, justifyContent: 'center', flexDirection: 'row', alignContent: 'flex-end', alignItems: 'flex-end', alignSelf: 'flex-end' }}>
                            <View style={{ flexDirection: 'row-reverse', flex: 1, marginTop: moderateScale(7), marginStart: moderateScale(5), flexDirection: 'row-reverse', alignContent: 'flex-end', alignItems: 'flex-end', alignSelf: 'flex-end' }}>

                                <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center', alignContent: 'center', marginHorizontal: moderateScale(3) }}>
                                    <Image source={require('../../../../assets/assets/tiktockicon.png')} resizeMode={'cover'} style={{
                                        height: moderateScale(15), width: moderateScale(15), marginBottom: moderateScale(1)
                                    }} />
                                    <Text style={[styles.heading, {
                                        ...I18nManager.isRTL ? { textAlign: 'right' } : {}, textAlign: 'center',
                                        color: theme.colors.secondary, fontSize: moderateScale(7),
                                    }]}>{item.instagram_count}{'\nfollowers'}</Text>
                                </TouchableOpacity>


                                <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center', alignContent: 'center', marginHorizontal: moderateScale(3) }}>
                                    <Image source={require('../../../../assets/assets/youtubeicon.png')} resizeMode={'cover'} style={{
                                        height: moderateScale(15), width: moderateScale(15), marginBottom: moderateScale(1)
                                    }} />
                                    <Text style={[styles.heading, {
                                        ...I18nManager.isRTL ? { textAlign: 'right' } : {}, textAlign: 'center',
                                        color: theme.colors.secondary, fontSize: moderateScale(7),
                                    }]}>{item.youtube_count}{'\nfollowers'}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center', alignContent: 'center', marginHorizontal: moderateScale(3) }}>
                                    <Image source={require('../../../../assets/assets/facebookicon.png')} resizeMode={'cover'} style={{
                                        height: moderateScale(15), width: moderateScale(15), marginBottom: moderateScale(1)
                                    }} />
                                    <Text style={[styles.heading, {
                                        ...I18nManager.isRTL ? { textAlign: 'right' } : {}, textAlign: 'center',
                                        color: theme.colors.secondary, fontSize: moderateScale(7),
                                    }]}>{item.facebook_count}{'\nfollowers'}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center', alignContent: 'center', marginHorizontal: moderateScale(3) }}>
                                    <Image source={require('../../../../assets/assets/instagramicon.png')} resizeMode={'cover'} style={{
                                        height: moderateScale(15), width: moderateScale(15), marginBottom: moderateScale(1)
                                    }} />
                                    <Text style={[styles.heading, {
                                        ...I18nManager.isRTL ? { textAlign: 'right' } : {}, textAlign: 'center',
                                        color: theme.colors.secondary, fontSize: moderateScale(7),
                                    }]}>{item.instagram_count}{'\nfollowers'}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center', alignContent: 'center', marginHorizontal: moderateScale(3) }}>
                                    <Image source={require('../../../../assets/assets/eye.png')} resizeMode={'cover'} style={{
                                        height: moderateScale(15), width: moderateScale(15), marginBottom: moderateScale(1)
                                    }} />
                                    <Text style={[styles.heading, {
                                        ...I18nManager.isRTL ? { textAlign: 'right' } : {}, textAlign: 'center',
                                        color: theme.colors.secondary, fontSize: moderateScale(7),
                                    }]}>{item.views}{'\nViews'}</Text>
                                </TouchableOpacity>

                            </View>
                        </View>



                    </View>

                </View>



                <View style={{ flex: 1, marginHorizontal: moderateScale(14), }}>
                    <View style={{ width: '100%', height: moderateScale(1), backgroundColor: theme.colors.secondary, marginVertical: moderateScale(10), alignSelf: 'center' }} />






                    <Text numberOfLines={1} style={[styles.heading, {
                        ...I18nManager.isRTL ? { textAlign: 'right' } : {}, fontWeight: 'bold', textAlign: 'left',
                        color: theme.colors.secondary, fontSize: moderateScale(20), marginVertical: moderateScale(10),
                        marginHorizontal: moderateScale(5),
                    }]}>{'Bussiness/Company'}</Text>



                    <View style={{ padding: moderateScale(5), borderWidth: moderateScale(0.5), borderRadius: moderateScale(20) }}>


                        <TouchableOpacity onPress={() => { if (!!!this.props.data.userInfo.email) { this.props.navigation.navigate('Login') } else this.props.navigation.navigate('MakeBooking', { item: this.state.celebraty, type: 1 }) }} style={{
                            marginHorizontal: moderateScale(0), backgroundColor: theme.colors.white, zIndex: 10,
                            width: '90%', height: moderateScale(40), alignItems: 'center', borderRadius: moderateScale(20),
                            justifyContent: 'center', borderColor: theme.colors.secondary, borderWidth: moderateScale(0.5), alignSelf: 'center', marginVertical: moderateScale(5),
                            shadowColor: theme.colors.primary, shadowOffset: {
                                width: 0,
                                height: 2,
                            }, shadowOpacity: 0.25, shadowRadius: 3.84,
                        }}>
                            <View onPress={() => { }} style={{ flex: 1, flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                <Image source={require('app/assets/assets/adsrequest.png')} resizeMode={'stretch'} style={{
                                    height: moderateScale(30), width: moderateScale(30), marginHorizontal: moderateScale(10),
                                }} />
                                <Text style={[styles.heading, {
                                    ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold', textAlign: 'left',
                                    color: theme.colors.secondary, fontSize: moderateScale(19), flex: 1, marginHorizontal: moderateScale(0)
                                }]}>{'Ads Request'}</Text>
                            </View>
                        </TouchableOpacity>



                        <TouchableOpacity onPress={() => { if (!!!this.props.data.userInfo.email) { this.props.navigation.navigate('Login') } else this.props.navigation.navigate('MakeBooking', { item: this.state.celebraty, type: 2 }) }} style={{
                            marginHorizontal: moderateScale(0), backgroundColor: theme.colors.white, zIndex: 10,
                            width: '90%', height: moderateScale(40), alignItems: 'center', borderRadius: moderateScale(20),
                            justifyContent: 'center', borderColor: theme.colors.secondary, borderWidth: moderateScale(0.5), alignSelf: 'center', marginVertical: moderateScale(5),
                            shadowColor: theme.colors.primary, shadowOffset: {
                                width: 0,
                                height: 2,
                            }, shadowOpacity: 0.25, shadowRadius: 3.84,
                        }}>
                            <View onPress={() => { }} style={{ flex: 1, flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                <Image source={require('app/assets/assets/invitation.png')} resizeMode={'stretch'} style={{
                                    height: moderateScale(30), width: moderateScale(30), marginHorizontal: moderateScale(10),
                                }} />
                                <Text style={[styles.heading, {
                                    ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold', textAlign: 'left',
                                    color: theme.colors.secondary, fontSize: moderateScale(19), flex: 1, marginHorizontal: moderateScale(0)
                                }]}>{'Invitation Request'}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>


                    <Text numberOfLines={1} style={[styles.heading, {
                        ...I18nManager.isRTL ? { textAlign: 'right' } : {}, fontWeight: 'bold', textAlign: 'left',
                        color: theme.colors.secondary, fontSize: moderateScale(20), marginVertical: moderateScale(10),
                        marginHorizontal: moderateScale(5),
                    }]}>{'Individual'}</Text>



                    <View style={{ padding: moderateScale(5), borderWidth: moderateScale(0.5), borderRadius: moderateScale(20) }}>


                        <TouchableOpacity onPress={() => {



                            showSuccessPopup('Available for Android Version.', 'Coming Soon', null)




                        }} style={{
                            marginHorizontal: moderateScale(0), backgroundColor: theme.colors.white, zIndex: 10,
                            width: '90%', height: moderateScale(40), alignItems: 'center', borderRadius: moderateScale(20),
                            justifyContent: 'center', borderColor: theme.colors.secondary, borderWidth: moderateScale(0.5), alignSelf: 'center', marginVertical: moderateScale(5),
                            shadowColor: theme.colors.primary, shadowOffset: {
                                width: 0,
                                height: 2,
                            }, shadowOpacity: 0.25, shadowRadius: 3.84,
                        }}>
                            <View onPress={() => { }} style={{ flex: 1, flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                <Image source={require('app/assets/assets/live.png')} resizeMode={'stretch'} style={{
                                    height: moderateScale(30), width: moderateScale(30), marginHorizontal: moderateScale(10),
                                }} />
                                <Text style={[styles.heading, {
                                    ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold', textAlign: 'left',
                                    color: theme.colors.secondary, fontSize: moderateScale(19), flex: 1, marginHorizontal: moderateScale(0)
                                }]}>{'Video Call'}</Text>
                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => { if (!!!this.props.data.userInfo.email) { this.props.navigation.navigate('Login') } else this.props.navigation.navigate('MakeBooking', { item: this.state.celebraty, type: 3 }) }} style={{
                            marginHorizontal: moderateScale(0), backgroundColor: theme.colors.white, zIndex: 10,
                            width: '90%', height: moderateScale(40), alignItems: 'center', borderRadius: moderateScale(20),
                            justifyContent: 'center', borderColor: theme.colors.secondary, borderWidth: moderateScale(0.5), alignSelf: 'center', marginVertical: moderateScale(5),
                            shadowColor: theme.colors.primary, shadowOffset: {
                                width: 0,
                                height: 2,
                            }, shadowOpacity: 0.25, shadowRadius: 3.84,
                        }}>
                            <View onPress={() => { }} style={{ flex: 1, flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                <Image source={require('app/assets/assets/hour.png')} resizeMode={'stretch'} style={{
                                    height: moderateScale(30), width: moderateScale(30), marginHorizontal: moderateScale(10),
                                }} />
                                <Text style={[styles.heading, {
                                    ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold', textAlign: 'left',
                                    color: theme.colors.secondary, fontSize: moderateScale(19), flex: 1, marginHorizontal: moderateScale(0)
                                }]}>{'Hour With Your Star'}</Text>
                            </View>
                        </TouchableOpacity>


                        {/* <TouchableOpacity onPress={() => { if (!!!this.props.data.userInfo.email) { this.props.navigation.navigate('Login') } else this.props.navigation.navigate('MakeBooking', { item: this.state.celebraty, type: 4 }) }} style={{
                            marginHorizontal: moderateScale(0), backgroundColor: theme.colors.white, zIndex: 10,
                            width: '90%', height: moderateScale(40), alignItems: 'center', borderRadius: moderateScale(20),
                            justifyContent: 'center', borderColor: theme.colors.secondary, borderWidth: moderateScale(0.5), alignSelf: 'center', marginVertical: moderateScale(5),
                            shadowColor: theme.colors.primary, shadowOffset: {
                                width: 0,
                                height: 2,
                            }, shadowOpacity: 0.25, shadowRadius: 3.84,
                        }}>
                            <View onPress={() => { }} style={{ flex: 1, flexDirection: 'row', alignSelf: 'center', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                <Image source={require('app/assets/assets/hour.png')} resizeMode={'stretch'} style={{
                                    height: moderateScale(30), width: moderateScale(30), marginHorizontal: moderateScale(10),
                                }} />
                                <Text style={[styles.heading, {
                                    ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold', textAlign: 'left',
                                    color: theme.colors.secondary, fontSize: moderateScale(19), flex: 1, marginHorizontal: moderateScale(0)
                                }]}>{'Gift Video'}</Text>
                            </View>
                        </TouchableOpacity> */}


                    </View>

                </View>





            </Block >
        )

    }

}
const mapStateToProps = (state) => ({
    data: {
        userInfo: state.login.userInfo
    },
})
const mapDispatchToProps = (dispatch) => ({
    actions: {
        about: bindActionCreators(loginActions, dispatch)
    }
})


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        backgroundColor: '#fff',
    },

});
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(CeleberateDetails))