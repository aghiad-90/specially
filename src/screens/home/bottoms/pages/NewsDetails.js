import React, { Component } from 'react';
import { StyleSheet, StatusBar, View, Image, ScrollView, Share, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import { theme } from '../../../../core/theme';
import { Block, Text, } from '../../../../components/widget';
import * as loginActions from '../../../../actions/Actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../childs/Header';
import { moderateScale } from 'react-native-size-matters';
import { showDanger, translate } from '../../../../utils/utils';
import { BASE_API_URL_IMAEG_ORIGINAL, BASE_API_URL_VIDEOS } from '../../../../services/config';
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import WebView from 'react-native-webview';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import * as Apis from '../../../../services/Apis';

import { SliderBox } from '../../../../components/react-native-image-slider-box';
import AutoHeightWebView from 'react-native-autoheight-webview'
import { ImageBackground } from 'react-native';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
} from 'react-native-admob'
import { Linking } from 'react-native';




class NewsDetails extends Component {


    videoPlayer = [];
    GiftvideoPlayer = [];


    constructor(props) {
        super(props);
        this.state = {
            isLoading: true, selectedtab: 4, celebraty: this.props.navigation.state.params.item,
            webViewHeight: this.props.defaultHeight

        }

        this._onMessage = this._onMessage.bind(this);



    }





    addView(id) {
        Apis.Post('news/View/' + id, {}).then((data) => {

        }).catch((error) => {

        })
    }




    getNewsDetails() {
        this.addView(this.props.navigation.state.params.item._id)
        Apis.Get('news/' + this.props.navigation.state.params.item._id).then((data) => {
            // console.log('celeberaty details', data, this.props.data.userInfo._id)
            this.props.navigation.state.params.item = data;


            this.setState({ celebraty: data, isLoading: false })
        }).catch((error) => {
            // console.log(error);
            this.setState({ isLoading: false })
        })
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
        this.getNewsDetails()

    }


    static defaultProps = {
        autoHeight: true,
    }



    _onMessage(e) {
        this.setState({
            webViewHeight: parseInt(e.nativeEvent.data)
        });
    }

    stopLoading() {
        this.webview.stopLoading();
    }



    async Share() {

        const link = await dynamicLinks().buildShortLink({
            link: 'https://sbisiali.com/news/' + (this.props.navigation.state.params.item.id ? this.props.navigation.state.params.item.id : this.props.navigation.state.params.item._id),
            // domainUriPrefix is created in your Firebase console
            domainUriPrefix: 'https://sbisiali.page.link',
            // optional setup which updates Firebase analytics campaign
            // "banner". This also needs setting up before hand
            social: {
                descriptionText: this.props.navigation.state.params.item.source_name,
                imageUrl: (BASE_API_URL_IMAEG_ORIGINAL + this.props.navigation.state.params.item.images[0]),
                title: this.props.navigation.state.params.item.name

            },
            ios: {
                bundleId: 'com.crowd.spesially',
            },
            android: {
                packageName: 'com.crowddigital.espacialty',
            },
            analytics: {
                campaign: 'banner',
            },
        }).then(async (data) => {

            try {
                const result = await Share.share({
                    message: data,
                });
                if (result.action === Share.sharedAction) {
                    if (result.activityType) {
                        // shared with activity type of result.activityType
                    } else {
                        // shared
                    }
                } else if (result.action === Share.dismissedAction) {
                    // dismissed
                }
            } catch (error) {
                alert(error.message);
            }

        }).catch((error) => {
            showDanger(error.message)
            console.log(error)
        });




    }



    render() {



        if (!this.props.navigation.state.params.item.source_name) {
            return null;
        }


        var images = [];
        for (let k in this.props.navigation.state.params.item.images) {
            images.push(BASE_API_URL_IMAEG_ORIGINAL + this.props.navigation.state.params.item.images[k])
        }


        var advertising = [];
        for (let k in this.props.navigation.state.params.item.advertising) {
            advertising.push(BASE_API_URL_IMAEG_ORIGINAL + this.props.navigation.state.params.item.advertising[k].url)
        }
        var item = this.props.navigation.state.params.item;
        console.log(item)
        return (
            <Block>
                <StatusBar backgroundColor="transparent" barStyle="light-content" />
                <Header search={false} back={false} back={true} navigation={this.props.navigation} backclick={() => { this.props.navigation.pop() }} Text={translate('News Details')} />

                <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false} contentContainerStyle={{}}>

                    <View
                        style={{ flex: 1, flexDirection: "column", backgroundColor: "white" }}

                    >
                        <View showsVerticalScrollIndicator={false} style={{ flexDirection: 'column' }}>
                            <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'column', height: moderateScale(150) }}>

                                <FlatList
                                    data={this.props.navigation.state.params.item.advertising}
                                    horizontal={true}
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{ width: '100%', height: '100%', }}
                                    renderItem={({ item, index }) => (
                                        <View
                                            key={'advertising-' + index}
                                            style={{
                                                flexDirection: 'column',
                                                shadowColor: "#000",
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 1,
                                                },
                                                shadowOpacity: 0.20,
                                                shadowRadius: 1.41, width: '100%', height: '100%',
                                            }}>
                                            <TouchableOpacity onPress={() => {
                                                Linking.openURL(item.link).catch((error) => {
                                                    alert('Invalid Url')
                                                })

                                            }} style={{ flexDirection: 'column', width: '100%' }}>
                                                <View style={{ width: '100%', justifyContent: 'center', zIndex: 10, }}>
                                                    <ImageBackground source={{ uri: ((String(item.url).indexOf('gif') === -1 ? BASE_API_URL_IMAEG_ORIGINAL : BASE_API_URL_VIDEOS) + item.url) }} resizeMode={'stretch'} style={{
                                                        borderRadius: moderateScale(0), zIndex: 2, backgroundColor: theme.colors.white,
                                                        width: '100%', height: '100%',
                                                    }} />

                                                </View>

                                            </TouchableOpacity>

                                        </View>



                                    )}
                                    showsVerticalScrollIndicator={false}

                                    keyExtractor={(item, index) => index.toString()}
                                />

                                <TouchableOpacity onPress={() => { this.Share() }} style={{ marginEnd: moderateScale(15), position: 'absolute', zIndex: 10, right: moderateScale(10), top: moderateScale(10) }}>
                                    <Icon size={moderateScale(30)} name="share-square" color={theme.colors.primary} style={{
                                        height: moderateScale(30), width: moderateScale(30),
                                    }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '100%', zIndex: 0, marginTop: moderateScale(10), height: moderateScale(140), marginHorizontal: moderateScale(20) }}>


                                <Text style={[{
                                    fontWeight: 'bold',
                                    fontSize: moderateScale(20), marginTop: moderateScale(10),
                                    marginHorizontal: moderateScale(5),
                                }]}>{item.title}</Text>


                                <View style={{
                                    flex: 1, flexDirection: 'row',
                                    alignItems: 'center', alignContent: 'center', marginHorizontal: moderateScale(5), marginBottom: moderateScale(0), borderBottomWidth: moderateScale(0.5), borderBottomColor: theme.colors.gray05, paddingBottom: moderateScale(5)
                                }}>
                                    <Image resizeMode="contain"
                                        style={{
                                            height: moderateScale(15), width: moderateScale(15), marginEnd: moderateScale(5)
                                        }}
                                        source={require('app/assets/assets/link.png')}
                                    />
                                    <Text style={[{
                                        fontWeight: 'bold',
                                        fontSize: moderateScale(10),
                                    }]}>{item.source_name}</Text>
                                </View>

                                <View style={{
                                    flex: 1, flexDirection: 'row',
                                    alignItems: 'center', alignContent: 'center', marginBottom: moderateScale(5), marginTop: moderateScale(10)
                                }}>





                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center', alignContent: 'center', marginBottom: moderateScale(5), borderRadius: moderateScale(5),
                                    }}>
                                        <TouchableOpacity onPress={() => { this.Share() }} style={{ marginEnd: moderateScale(15), zIndex: 10, }}>
                                            <Icon size={moderateScale(20)} name="share-square" color={theme.colors.primary} style={{
                                                height: moderateScale(20), width: moderateScale(20),
                                            }} />
                                        </TouchableOpacity>
                                    </View>



                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center', alignContent: 'center', marginHorizontal: moderateScale(5), marginBottom: moderateScale(5), padding: moderateScale(2), paddingHorizontal: moderateScale(5), marginStart: moderateScale(-10)
                                    }}>
                                        <Icon size={moderateScale(20)} name="eye" color={'#3f729b'} style={{
                                            height: moderateScale(20), width: moderateScale(20), marginEnd: moderateScale(5)
                                        }} />

                                        <Text style={[{
                                            fontWeight: 'bold',
                                            fontSize: moderateScale(10),
                                        }]}>{this.props.navigation.state.params.item.views + ' views'}</Text>
                                    </View>



                                    <View style={{ flex: 1 }} />

                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center', alignContent: 'center', marginHorizontal: moderateScale(5), marginBottom: moderateScale(5), padding: moderateScale(2), paddingHorizontal: moderateScale(5), marginStart: moderateScale(-10)
                                    }}>
                                        <Image resizeMode="contain"
                                            style={{
                                                height: moderateScale(20), width: moderateScale(20), marginEnd: moderateScale(5)
                                            }}
                                            source={require('app/assets/assets/time.png')}
                                        />
                                        <Text style={[{
                                            fontWeight: 'bold',
                                            fontSize: moderateScale(10),
                                        }]}>{moment(new Date(item.dateTime)).format('ll')}</Text>
                                    </View>
                                    <View style={{ width: moderateScale(50) }} />






                                </View>
                            </View>
                        </View>

                        {item.description && item.description !== '' &&
                            <AutoHeightWebView
                                pointerEvents={"none"}
                                onNavigationStateChange={(event) => {

                                }}
                                onLoadStart={() => {
                                    this.setState({ showWebView: false })
                                }}

                                onLoadEnd={() => {
                                    if (!this.state.showWebView) {
                                        this.setState({ showWebView: true })
                                    }
                                }}
                                ref={ref => this.webview = ref}

                                javaScriptEnabled={true}
                                source={{
                                    html: '<html> <script async src="https://instagram.com/static/bundles/es6/EmbedSDK.js/47c7ec92d91e.js" ></script> <head ><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>' + this.decodeHTMLEntities(item.description ? item.description : '') + '</body></html>'
                                    // html: '<html>  <head ><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>' + this.decodeHTMLEntities(item.description ? item.description : '') + '</body></html>'

                                }}
                                // scalesPageToFit={true}
                                // viewportContent={'width=device-width, user-scalable=no'}
                                style={{
                                    marginTop: moderateScale(20),
                                    textAlign: 'justify',
                                    width: '90%', alignSelf: 'center',
                                }} />
                        }
                    </View>
                    <View style={{ marginBottom: moderateScale(100), marginTop: moderateScale(20) }}>
                        <SliderBox resizeMode="cover" style={{
                            height: moderateScale(200),
                            backgroundColor: 'white', width: '90%', alignSelf: 'center', borderRadius: moderateScale(10)
                        }}
                            images={images} pagination={true}
                        />
                    </View>
                </ScrollView>

                <View style={{ position: 'absolute', bottom: 0, justifyContent: 'center', alignItems: 'center', alignContent: 'center', alignSelf: 'center', backgroundColor: theme.colors.white, width: '100%' }}>
                    <AdMobBanner
                        adSize="smartBannerPortrait"
                        onAdFailedToLoad={(result) => {
                            console.log('result', result)
                        }}
                        style={{ alignSelf: "center", height: moderateScale(50), width: '100%' }}
                        adUnitID="ca-app-pub-2009886499262948/7615860829"
                    />
                </View>

            </Block >
        )

    }

    decodeHTMLEntities(text) {
        var entities = [
            ['amp', '&'],
            ['apos', '\''],
            ['#x27', '\''],
            ['#x2F', '/'],
            ['#39', '\''],
            ['#47', '/'],
            ['lt', '<'],
            ['gt', '>'],
            ['nbsp', ' '],
            ['quot', '"']
        ];

        for (var i = 0, max = entities.length; i < max; ++i)
            text = text.replace(new RegExp('&' + entities[i][0] + ';', 'g'), entities[i][1]);

        return text;
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
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(NewsDetails))