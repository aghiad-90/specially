import React, { Component } from 'react';
import { StyleSheet, StatusBar, View, FlatList, Image, ActivityIndicator, ActionSheetIOS, Modal, I18nManager } from 'react-native'
import { theme } from '../../../../core/theme';
import { Block, Text, } from '../../../../components/widget';
import * as loginActions from '../../../../actions/Actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../childs/Header';
import { moderateScale } from 'react-native-size-matters';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { translate } from '../../../../utils/utils';
import Icon from 'react-native-vector-icons/FontAwesome'
import { BASE_API_URL_IMAEG_ORIGINAL, BASE_API_URL_VIDEOS } from '../../../../services/config';
import { FONT_FAMILY } from '../../../../services/config';

import Video from 'react-native-video';
import moment from "moment";
import ActionButton from 'react-native-action-button';
import * as ImagePicker from 'react-native-image-picker';
import { Input } from 'react-native-elements';
import * as Apis from '../../../../services/Apis';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loader from '../../../../components/widget/loader';
import MediaView from '../childs/MediaView';




class Gallery extends Component {


    videoPlayer = [];
    GiftvideoPlayer = [];


    constructor(props) {
        super(props);
        this.state = {
            isLoading: true, selected: 1, type: 1, data: [{}, {}, {}], celebraty: this.props.data.userInfo, uplaodfile: false, title: '', description: '', assetsView: false, assetsList: [], assesCheck: 'images', viewableItems: {}
        }
        this.inputRefs = {
        };

    }




    componentDidMount() {
        for (let k in this.state.celebraty.videosList) {
            this.state.celebraty.videosList[k].isLoading = true;
            this.state.celebraty.videosList[k].play = true;
        }
        for (let k in this.state.celebraty.giftVideosList) {
            this.state.celebraty.giftVideosList[k].isLoading = true;
            this.state.celebraty.giftVideosList[k].play = true;
        }
        this.setState({ celebraty: this.state.celebraty });

        this.fetch()
    }


    fetch() {
        this.setState({ isLoading: true });
        this.props.actions.user.fetchUserInfo(((onSuccess) => {
            this.setState({ isLoading: false });
            console.log('onSuccess', onSuccess)
        }), ((onError) => {
            this.setState({ isLoading: false });
            console.log('onError', onError)
        }))
    }




    handlePress(props) {
        let options = props.options;


        let destructiveIndex = -1;
        if (
            Number.isInteger(props.destructiveIndex) &&
            props.destructiveIndex >= 0
        ) {
            destructiveIndex = props.destructiveIndex;
        }
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: options,
                destructiveButtonIndex: destructiveIndex,
                cancelButtonIndex: options.length - 1
            },
            buttonIndex => {


                console.log(buttonIndex)

                if (buttonIndex === 0 && props.image) {
                    ImagePicker.launchImageLibrary(
                        {
                            mediaType: 'photo',
                            includeBase64: false,
                            maxHeight: 200,
                            maxWidth: 200,
                        },
                        (response) => {
                            this.uplaodfile(response, 'image');
                        },
                    )
                }


                if (buttonIndex === 1 && props.image) {
                    ImagePicker.launchCamera(
                        {
                            mediaType: 'photo',
                            includeBase64: false,
                            maxHeight: 200,
                            maxWidth: 200,
                        },
                        (response) => {
                            this.uplaodfile(response, 'image');
                        },
                    )
                }





                if (buttonIndex === 0 && props.video) {
                    ImagePicker.launchImageLibrary(
                        {
                            mediaType: 'video',
                        },
                        (response) => {
                            this.uplaodfile(response, 'image');
                        },
                    )
                }


                if (buttonIndex === 1 && props.video) {
                    ImagePicker.launchCamera(
                        {
                            mediaType: 'video',
                        },
                        (response) => {
                            this.uplaodfile(response, 'image');
                        },
                    )
                }


            }
        );
    };

    uplaodfile(response) {
        this.setState({ uplaodfile: true, uplaodfileresponse: response })
    }

    createImageOrVideo(url, data) {
        this.setState({ uplaodfile: false })
        Apis.Post(url, data).then((data) => {
            this.fetch();
            this.setState({ isLoading: false })
        }).catch((error) => {
            console.log(error);
            this.setState({ isLoading: false })
        })
    }


    render() {

        var images = [];
        for (let k in this.props.data.userInfo.images) {
            images.push(BASE_API_URL_IMAEG_ORIGINAL + this.props.data.userInfo.images[k].url)
        }


        return (
            <Block>
                <StatusBar backgroundColor="transparent" barStyle="light-content" />

                <Header search={false} backPrimary={false} back={true} navigation={this.props.navigation} backclick={() => { this.props.navigation.pop() }} Text={translate('My Gallery')} />
                <Loader isLoading={this.state.isLoading} />







                <View style={{
                    margin: moderateScale(20), borderRadius: moderateScale(10), marginTop: moderateScale(-15)
                    , flexDirection: 'row', bottom: moderateScale(-30), zIndex: 2
                }}>

                    <View style={[{
                        flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center', borderRadius: moderateScale(20), marginHorizontal: moderateScale(4), borderWidth: moderateScale(0.5)
                    }, this.state.selected === 1 ? { backgroundColor: theme.colors.secondary, } : {
                        backgroundColor: theme.colors.white,
                    }]}>
                        <TouchableOpacity onPress={() => { this.setState({ selected: 1 }); }}>
                            <View style={{ flexDirection: "row", paddingHorizontal: moderateScale(10), justifyContent: 'center', alignItems: 'center', paddingVertical: moderateScale(10) }}>
                                <Icon size={moderateScale(13)} name="image" color={theme.colors.primary} />
                                <Text style={[{ color: theme.colors.primary, fontSize: moderateScale(10), padding: moderateScale(5), fontWeight: '600', textAlign: 'center' }, this.state.selected === 1 ? {} : { color: theme.colors.secondary }]}>{translate('My Images')}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: '100%', width: 1, backgroundColor: 'white' }} />

                    <View style={[{
                        flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center', borderRadius: moderateScale(20), marginHorizontal: moderateScale(4), borderWidth: moderateScale(0.5)

                    }, this.state.selected === 2 ? { backgroundColor: theme.colors.secondary, } : { backgroundColor: theme.colors.white, }]}>
                        <TouchableOpacity onPress={() => { this.setState({ selected: 2 }); }}>
                            <View style={{ flexDirection: "row", paddingHorizontal: moderateScale(10), justifyContent: 'center', alignItems: 'center', paddingVertical: moderateScale(10) }}>
                                <Icon size={moderateScale(13)} name="film" color={theme.colors.primary} />
                                <Text style={[{ color: theme.colors.primary, fontSize: moderateScale(10), padding: moderateScale(5), fontWeight: '600', textAlign: 'center' }, this.state.selected === 2 ? {} : { color: theme.colors.secondary }]}>{translate('My Videos')}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: '100%', width: 1, backgroundColor: 'white' }} />

                    <View style={[{
                        flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center', borderRadius: moderateScale(20), marginHorizontal: moderateScale(4), borderWidth: moderateScale(0.5)

                    }, this.state.selected === 3 ? { backgroundColor: theme.colors.secondary, } : { backgroundColor: theme.colors.white, }]}>
                        <TouchableOpacity onPress={() => { this.setState({ selected: 3 }); }}>
                            <View style={{ flexDirection: "row", paddingHorizontal: moderateScale(10), justifyContent: 'center', alignItems: 'center', paddingVertical: moderateScale(10) }}>
                                <Icon size={moderateScale(13)} name="film" color={theme.colors.primary} />
                                <Text style={[{ color: theme.colors.primary, fontSize: moderateScale(10), padding: moderateScale(5), fontWeight: '600', textAlign: 'center' }, this.state.selected === 3 ? {} : { color: theme.colors.secondary }]}>{translate('Gift Videos')}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', marginTop: moderateScale(30) }}>
                    <View style={{ width: '95%', height: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                        {this.state.selected === 1 &&

                            <FlatList
                                data={this.props.data.userInfo.imagesList}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ paddingBottom: moderateScale(250) }}
                                renderItem={({ item, index }) => (
                                    <View
                                        key={'image-gallery-' + index}
                                        style={{
                                            flex: 1 / 3,
                                            flexDirection: 'column',
                                            margin: moderateScale(2)
                                        }}>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({ assetsView: true, assetsList: this.props.data.userInfo.imagesList, assesCheck: 'images', startingIndex: index })
                                        }}
                                        >
                                            <Image
                                                style={{
                                                    justifyContent: 'center',
                                                    alignItems: 'center', borderRadius: moderateScale(10),
                                                    height: moderateScale(130), backgroundColor: theme.colors.gray07
                                                }}
                                                source={{ uri: BASE_API_URL_IMAEG_ORIGINAL + item.url }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                )}
                                numColumns={3}
                                keyExtractor={(item, index) => index}
                            />

                        }

                        {this.state.selected === 2 &&
                            <FlatList
                                data={this.props.data.userInfo.videosList}
                                extraData={this.state}
                                contentContainerStyle={{ paddingBottom: moderateScale(150) }}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item, index }) => (
                                    <View
                                        key={'video-gallery-' + index}
                                        style={{
                                            flex: 1,
                                            flexDirection: 'column',
                                            margin: moderateScale(5),
                                        }}>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({ assetsView: true, assetsList: this.props.data.userInfo.videosList, assesCheck: 'videos' })

                                        }} style={{ flexDirection: 'column', width: '100%' }}>

                                            <View style={{ height: moderateScale(200), width: '100%', justifyContent: 'center', zIndex: 10, }}>
                                                <Video
                                                    paused
                                                    posterResizeMode={'stretch'}
                                                    resizeMode={'cover'}
                                                    source={{ uri: BASE_API_URL_VIDEOS + item.url }}
                                                    ref={videoPlayer => { this.videoPlayer[index] = videoPlayer }}
                                                    onError={(error) => {
                                                        console.log('video error', error)
                                                    }}
                                                    onLoad={() => {
                                                        if (this.videoPlayer[index])
                                                            this.videoPlayer[index].seek(1);
                                                    }}
                                                    posterResizeMode='stretch'
                                                    style={{
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        height: moderateScale(200), backgroundColor: theme.colors.black, borderRadius: moderateScale(10), zIndex: 10,
                                                    }} />


                                            </View>

                                            <View style={{ backgroundColor: theme.colors.gray07, width: '100%', top: moderateScale(-15), zIndex: 0, }}>
                                                <Text style={[{
                                                    fontWeight: 'bold',
                                                    fontSize: moderateScale(10),
                                                    margin: moderateScale(5), marginTop: moderateScale(20)
                                                }]}>{item.description}</Text>
                                                <View style={{
                                                    flex: 1, flexDirection: 'row',
                                                    alignItems: 'center', alignContent: 'center', marginHorizontal: moderateScale(5), marginBottom: moderateScale(10)
                                                }}>
                                                    <Image resizeMode="contain"
                                                        style={{
                                                            height: moderateScale(10), width: moderateScale(10),
                                                        }}
                                                        source={require('app/assets/assets/selected.png')}
                                                    />
                                                    <Text style={[{
                                                        fontWeight: 'bold',
                                                        fontSize: moderateScale(8),
                                                    }]}>{moment(new Date(item.createdAt)).format('DD MMM YYYY')}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>

                                    </View>
                                )}
                                keyExtractor={(item, index) => index}
                            />

                        }



                        {this.state.selected === 3 &&
                            <FlatList
                                data={this.state.celebraty.giftVideosList}
                                extraData={this.state}
                                contentContainerStyle={{ paddingBottom: moderateScale(150) }}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item, index }) => (
                                    <View
                                        key={'video-gallery-' + index}
                                        style={{
                                            flex: 1,
                                            flexDirection: 'column',
                                            margin: moderateScale(5),
                                        }}>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({ assetsView: true, assetsList: this.props.data.userInfo.giftVideosList, assesCheck: 'videos', startingIndex: index })
                                        }} style={{ flexDirection: 'column', width: '100%' }}>

                                            <View style={{ height: moderateScale(200), width: '100%', justifyContent: 'center', zIndex: 10, }}>
                                                <Video
                                                    paused={item.play}
                                                    posterResizeMode={'stretch'}
                                                    resizeMode={'cover'}
                                                    onVideoFullscreenPlayerWillDismiss={() => {
                                                        this.state.celebraty.giftVideosList[index].play = !this.state.celebraty.giftVideosList[index].play;
                                                        this.setState({ celebraty: this.state.celebraty })
                                                    }}
                                                    source={{ uri: BASE_API_URL_VIDEOS + item.url }}
                                                    ref={GiftvideoPlayer => { this.GiftvideoPlayer[index] = GiftvideoPlayer }}
                                                    onError={(error) => {
                                                        console.log('video error', error)
                                                    }}
                                                    onLoad={() => {
                                                        this.state.celebraty.giftVideosList[index].isLoading = !this.state.celebraty.giftVideosList[index].isLoading;
                                                        this.setState({ celebraty: this.state.celebraty })
                                                        if (this.GiftvideoPlayer[index])
                                                            this.GiftvideoPlayer[index].seek(0);
                                                    }}
                                                    posterResizeMode='stretch'
                                                    style={{
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        height: moderateScale(200), backgroundColor: theme.colors.black, borderRadius: moderateScale(10), zIndex: 10,
                                                    }} />

                                                {!item.isLoading &&
                                                    <Image resizeMode="contain"
                                                        style={{
                                                            position: 'absolute', alignSelf: 'center',
                                                            height: moderateScale(30), width: moderateScale(30), opacity: 0.5, zIndex: 2,
                                                        }}
                                                        source={require('app/assets/assets/selected.png')}
                                                    />
                                                }
                                                {item.isLoading && <ActivityIndicator size={'small'} color={theme.colors.primary} style={{ position: 'absolute', alignSelf: 'center', zIndex: 4, }} />}
                                            </View>
                                            <View style={{ backgroundColor: theme.colors.gray07, width: '100%', top: moderateScale(-15), zIndex: 0, }}>
                                                <Text style={[{
                                                    fontWeight: 'bold',
                                                    fontSize: moderateScale(10),
                                                    margin: moderateScale(5), marginTop: moderateScale(20)
                                                }]}>{item.description}</Text>
                                                <View style={{
                                                    flex: 1, flexDirection: 'row',
                                                    alignItems: 'center', alignContent: 'center', marginHorizontal: moderateScale(5), marginBottom: moderateScale(10)
                                                }}>
                                                    <Image resizeMode="contain"
                                                        style={{
                                                            height: moderateScale(10), width: moderateScale(10),
                                                        }}
                                                        source={require('app/assets/assets/selected.png')}
                                                    />
                                                    <Text style={[{
                                                        fontWeight: 'bold',
                                                        fontSize: moderateScale(8),
                                                    }]}>{moment(new Date(item.createdAt)).format('DD MMM YYYY')}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                keyExtractor={(item, index) => index}
                            />

                        }

                    </View>
                </View>



                <ActionButton buttonColor={theme.colors.secondary}>
                    <ActionButton.Item
                        buttonColor={theme.colors.secondary}
                        title="Upload Video"
                        onPress={() => { this.handlePress({ options: ["Select video", "Take video", "Cancel"], destructiveIndex: 2, video: true }) }}>
                        <Image resizeMode="contain"
                            style={{
                                height: moderateScale(40), width: moderateScale(40),
                            }}
                            source={require('app/assets/assets/adsrequest.png')}
                        />
                    </ActionButton.Item>
                    <ActionButton.Item
                        buttonColor={theme.colors.secondary}
                        title="Uplaod Gift Video"
                        onPress={() => { this.handlePress({ options: ["Select video", "Take video", "Cancel"], destructiveIndex: 2, video: true }) }}>
                        <Image resizeMode="contain"
                            style={{
                                height: moderateScale(40), width: moderateScale(40),
                            }}
                            source={require('app/assets/assets/adsrequest.png')}
                        />
                    </ActionButton.Item>
                    <ActionButton.Item
                        buttonColor={theme.colors.secondary}
                        title="Uplaod Image"
                        onPress={() => {
                            this.handlePress({ options: ["Select image", "Take image", "Cancel"], destructiveIndex: 2, image: true })
                        }}>
                        <Image resizeMode="contain"
                            style={{
                                height: moderateScale(40), width: moderateScale(40),
                            }}
                            source={require('app/assets/assets/adsrequest.png')}
                        />
                    </ActionButton.Item>
                </ActionButton>






                {this.state.uplaodfile &&
                    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: "center" }}>
                        <Modal
                            animationType="slide"
                            visible={this.state.uplaodfile}
                            onRequestClose={() => {
                                this.setState({ uplaodfile: false })
                            }}
                            onDismiss={() => {
                                this.setState({ uplaodfile: false })
                            }}>
                            <View
                                activeOpacity={1}
                                onPressOut={(e) => {
                                    if (e.nativeEvent.locationY < 0) {
                                        this.setState({ uplaodfile: false });
                                    }
                                }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}>
                                <KeyboardAwareScrollView style={{
                                    flex: 1,
                                    height: '100%',
                                    backgroundColor: "white",
                                }}>
                                    <View style={{
                                        marginTop: moderateScale(50),
                                        borderRadius: 20, marginHorizontal: moderateScale(20)
                                    }}>



                                        <Text style={{
                                            fontSize: moderateScale(25),
                                            color: theme.colors.secondary,
                                            width: '100%', alignSelf: 'center', marginVertical: moderateScale(20), marginTop: moderateScale(20), ...I18nManager.isRTL ? { textAlign: 'left' } : {},
                                        }}>{translate('Upload').toUpperCase()}</Text>

                                        <View style={{ width: '100%', height: moderateScale(200), borderColor: theme.colors.secondary, borderWidth: moderateScale(0.5), borderRadius: moderateScale(20), justifyContent: 'center', alignItems: 'center' }}>

                                            {this.state.uplaodfileresponse && this.state.uplaodfileresponse.type === 'image/jpg' &&
                                                <Image resizeMode="contain"
                                                    style={{
                                                        height: '80%', width: '80%', alignSelf: 'center'
                                                    }}
                                                    source={{ uri: this.state.uplaodfileresponse?.uri }}
                                                />

                                            }

                                            {this.state.uplaodfileresponse && this.state.uplaodfileresponse.type !== 'image/jpg' &&
                                                <Video
                                                    paused
                                                    posterResizeMode={'stretch'}
                                                    resizeMode={'cover'}
                                                    source={{ uri: this.state.uplaodfileresponse?.uri }}
                                                    ref={player => { this.player = player }}
                                                    onError={(error) => {
                                                        console.log('video error', error)
                                                    }}
                                                    onLoad={() => {
                                                        if (this.player)
                                                            this.player.seek(1);
                                                    }}
                                                    posterResizeMode='stretch'
                                                    style={{
                                                        height: '80%', width: '80%', alignSelf: 'center', backgroundColor: theme.colors.black, borderRadius: moderateScale(10), zIndex: 10,
                                                    }} />

                                            }

                                        </View>


                                        <Text style={{ color: theme.colors.gray04, marginTop: moderateScale(10), fontSize: moderateScale(15), paddingHorizontal: moderateScale(10), width: '100%', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, }}>{translate('Title')}</Text>
                                        <Input
                                            autoFocus
                                            labelStyle={{ color: theme.colors.secondary }}
                                            defaultValue={this.state.last_name}
                                            containerStyle={{ paddingLeft: 0, paddingRight: 0 }}
                                            inputContainerStyle={{
                                                width: '100%', height: moderateScale(45),
                                                ...I18nManager.isRTL ? { paddingHorizontal: moderateScale(10) } : { paddingHorizontal: moderateScale(10) }, borderBottomWidth: 0, backgroundColor: theme.colors.gray01, marginTop: moderateScale(5), borderRadius: moderateScale(10)
                                            }}
                                            inputStyle={{ textAlignVertical: 'center', height: '100%', ...I18nManager.isRTL ? { textAlign: 'right' } : {}, fontFamily: FONT_FAMILY }}
                                            ref={(input) => { if (input) { this.inputRefs.old_password = input; } }}
                                            onSubmitEditing={() => { this.inputRefs.new_password.focus() }}
                                            returnKeyType="next"
                                            placeholderTextColor={theme.colors.gray02}
                                            placeholder="Title"
                                            value={this.state.title}
                                            onChangeText={(value) => this.setState({ title: value })}
                                        />


                                        <Text style={{ color: theme.colors.gray04, marginTop: moderateScale(10), fontSize: moderateScale(15), paddingHorizontal: moderateScale(10), width: '100%', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, }}>{translate('Description')}</Text>
                                        <Input
                                            labelStyle={{ color: theme.colors.secondary }}
                                            defaultValue={this.state.last_name}
                                            containerStyle={{ paddingLeft: 0, paddingRight: 0 }}
                                            inputContainerStyle={{
                                                width: '100%', height: moderateScale(145),
                                                ...I18nManager.isRTL ? { paddingHorizontal: moderateScale(10) } : { paddingHorizontal: moderateScale(10) }, borderBottomWidth: 0, backgroundColor: theme.colors.gray01, marginTop: moderateScale(5), borderRadius: moderateScale(10), padding: moderateScale(10),
                                            }}
                                            inputStyle={{ textAlignVertical: 'center', height: '100%', ...I18nManager.isRTL ? { textAlign: 'right' } : {}, fontFamily: FONT_FAMILY }}
                                            ref={(input) => { if (input) { this.inputRefs.new_password = input; } }}
                                            onSubmitEditing={() => { }}
                                            returnKeyType="done"
                                            placeholderTextColor={theme.colors.gray02}
                                            multiline={true}
                                            placeholder="Description"
                                            value={this.state.description}
                                            onChangeText={(value) => this.setState({ description: value })}
                                        />




                                        <View style={{
                                            borderColor: theme.colors.primary, marginTop: moderateScale(45),
                                            borderRadius: moderateScale(10), borderWidth: moderateScale(0), height: moderateScale(40), width: '100%', backgroundColor: theme.colors.secondary, bottom: moderateScale(10),
                                            opacity: (this.state.description === '' || this.state.title === '') ? .4 : 1
                                        }}>
                                            <TouchableOpacity onPress={() => {


                                                if ((this.state.description === '' || this.state.title === '')) {
                                                    return;
                                                }

                                                if (this.state.uplaodfileresponse.type !== 'image/jpg') {
                                                    var data = new FormData();
                                                    var photo = {
                                                        uri: this.state.uplaodfileresponse.uri,
                                                        type: this.state.uplaodfileresponse.type,
                                                        name: 'uplaod.' + String(this.state.uplaodfileresponse.uri).split('/')[String(this.state.uplaodfileresponse.uri).split('/').length - 1],
                                                    };
                                                    data.append('video', photo);
                                                    this.setState({ isLoading: true })
                                                    Apis.Post('file/mp4', data).then((data) => {
                                                        console.log(data);


                                                        var video = {};
                                                        video.description = this.state.description;
                                                        video.title = this.state.title;
                                                        video.isPrivate = false;
                                                        video.url = data.url;
                                                        this.createImageOrVideo('users/video', video)
                                                    }).catch((error) => {
                                                        console.log(error);
                                                        this.setState({ isLoading: false })
                                                    })
                                                } else {
                                                    var data = new FormData();
                                                    var photo = {
                                                        uri: this.state.uplaodfileresponse.uri,
                                                        type: this.state.uplaodfileresponse.type,
                                                        name: 'uplaod.' + String(this.state.uplaodfileresponse.uri).split('/')[String(this.state.uplaodfileresponse.uri).split('/').length - 1],
                                                    };
                                                    data.append('file', photo);
                                                    this.setState({ isLoading: true })
                                                    Apis.Post('file/image', data).then((data) => {
                                                        console.log(data);


                                                        var image = {};
                                                        image.description = this.state.description;
                                                        image.isPrivate = false;
                                                        image.title = this.state.title;
                                                        image.url = data.originalname;

                                                        this.createImageOrVideo('users/image', image)



                                                    }).catch((error) => {
                                                        console.log(error);
                                                        this.setState({ isLoading: false })
                                                    })
                                                }




                                            }} style={{ width: '100%', height: "100%", alignSelf: 'center', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                                                <Text style={{ fontSize: moderateScale(16), color: theme.colors.white, fontFamily: FONT_FAMILY, fontWeight: 'bold' }}>{translate('Upload').toUpperCase()}</Text>
                                            </TouchableOpacity>
                                        </View>


                                    </View>
                                </KeyboardAwareScrollView>
                            </View>
                        </Modal>
                    </View>
                }

                {this.state.assetsView &&
                    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: "center", backgroundColor: 'black' }}>
                        <Modal
                            animationType="slide"
                            visible={this.state.assetsView}
                            onRequestClose={() => {
                                this.setState({ assetsView: false })
                            }}
                            onDismiss={() => {
                                this.setState({ assetsView: false })
                            }}>
                            <MediaView startingIndex={this.state.startingIndex} assetsList={this.state.assetsList} assesCheck={this.state.assesCheck} onHide={() => { this.setState({ assetsView: false }) }} />
                        </Modal>
                    </View>
                }
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
        user: bindActionCreators(loginActions, dispatch)
    }
})


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        backgroundColor: '#fff',
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Gallery))