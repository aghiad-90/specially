import React, { Component } from 'react';
import { StyleSheet, View, Image, Share, ActivityIndicator, Dimensions, Modal, TouchableWithoutFeedback } from 'react-native'
import { theme } from '../../../../core/theme';
import { Text, } from '../../../../components/widget';
import * as loginActions from '../../../../actions/Actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { moderateScale, scale } from 'react-native-size-matters';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome'
import { BASE_API_URL_IMAEG_ORIGINAL, BASE_API_URL_VIDEOS } from '../../../../services/config';
import * as Apis from '../../../../services/Apis';
import { TextAnimationShake } from 'react-native-text-effects'
import Video from 'react-native-video';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Input } from 'react-native-elements';
import { I18nManager } from 'react-native';
import { showDanger, translate } from '../../../../utils/utils';
import { LayoutAnimation } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import CommentsView from './CommentsView';
import BottomSheet from 'reanimated-bottom-sheet'

import { PopupOptions } from '../../../../components/options'




class MediaView extends Component {


    videoPlayer = [];
    constructor(props) {
        super(props);
        this.state = { assetsList: this.props.assetsList, assesCheck: this.props.assesCheck, inital: false, commentsShow: false, viewableItems: {}, viewableItemsComments: {}, viewableItemIndex: 0 }

    }

    componentDidMount() {
        this.setState({
            assetsList: this.props.assetsList, assesCheck: this.props.assesCheck
        })
    }




    onViewableItemsChanged = ({ viewableItems, changed }) => {
        if (viewableItems && viewableItems[0]) {

            this.state.assetsList[viewableItems[0].index].commentsLoading = true;
            this.setState({ assetsList: this.state.assetsList, viewableItems: viewableItems[0], viewableItemIndex: viewableItems[0].index })
            this.getComments(viewableItems[0].item._id, viewableItems[0].index)

            this.addView(viewableItems[0].item._id)
        }
    }



    getComments(id, index) {
        Apis.Get('comments/post/' + id + '?limit=1000', {}).then((data) => {
            this.state.assetsList[index].commentsLoading = false;
            this.state.assetsList[index].comments = data;
            this.setState({ assetsList: this.state.assetsList, viewableItemsComments: this.state.assetsList[index] })

        }).catch((error) => {
            this.state.assetsList[index].commentsLoading = false;
            this.setState({ assetsList: this.state.assetsList })
            console.log(error);
            this.setState({ isLoading: false })
        })
    }






    async Share(index) {

        const link = await dynamicLinks().buildShortLink({
            link: 'https://sbisiali.com/details/' + (this.state.assetsList[index].id ? this.state.assetsList[index].id : this.state.assetsList[index]._id) + '/' + this.props.celebraty._id,
            // domainUriPrefix is created in your Firebase console
            domainUriPrefix: 'https://sbisiali.page.link',
            // optional setup which updates Firebase analytics campaign
            // "banner". This also needs setting up before hand
            social: {
                descriptionText: this.state.assetsList[index].description,
                imageUrl: BASE_API_URL_IMAEG_ORIGINAL + this.state.assetsList[index].url,
                title: this.state.assetsList[index].title

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



    like(id, index) {
        Apis.Post('users/postLike/' + id, {}).then((data) => {
            this.state.assetsList[index].isLoading = false;
            if (!this.state.assetsList[index].isLike) {
                this.state.assetsList[index].isLike = true;
                this.state.assetsList[index].likes = this.state.assetsList[index].likes + 1;
            } else {
                this.state.assetsList[index].isLike = false;
                this.state.assetsList[index].likes = this.state.assetsList[index].likes - 1;
            }

            this.setState({ assetsList: this.state.assetsList })
        }).catch((error) => {
            this.state.assetsList[index].isLoading = false;
            this.setState({ assetsList: this.state.assetsList })
            console.log(error);
            this.setState({ isLoading: false })
        })
    }



    addView(id) {
        Apis.Post('users/postView/' + id, {}).then((data) => {

        }).catch((error) => {

        })
    }


    view(index) {
        if (!this.state.assetsList[index].edit) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            this.state.assetsList[index].view = !this.state.assetsList[index].view;
            this.setState({ assetsList: this.state.assetsList })
        }

    }

    edit(index) {


        if (!!!this.props.isRightUser) {
            return;
        }

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.state.assetsList[index].edit = !this.state.assetsList[index].edit;
        this.state.assetsList[index].view = true;
        this.setState({ assetsList: this.state.assetsList })
    }


    title(index, value) {
        this.state.assetsList[index].title = value;
        this.setState({ assetsList: this.state.assetsList })
    }

    description(index, value) {
        this.state.assetsList[index].description = value;
        this.setState({ assetsList: this.state.assetsList })
    }

    getCheck(index) {
        if (this.state.viewableItems)
            return index !== this.state.viewableItems.index;
        else false;
    }

    getListView() {

        return (
            <SwiperFlatList
                autoplayDelay={2}
                renderAll={false}
                vertical
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 100
                }}
                ref={ref => { if (ref) this.flatList = ref }}

                onContentSizeChange={() => {
                    if (this.flatList && this.flatList.scrollToIndex && this.state.assetsList && this.state.assetsList.length && !this.state.inital) {
                        this.flatList.scrollToIndex({ animated: true, index: this.props.startingIndex, });
                        console.log('inital');
                        setTimeout(() => {
                            this.setState({ inital: true });
                        }, 100);
                    }
                }}
                onViewableItemsChanged={this.onViewableItemsChanged}
                data={this.state.assetsList}
                renderItem={({ item, index }) =>




                    <View style={{ width: '100%', height: Dimensions.get('screen').height, backgroundColor: 'black' }}>

                        {this.state.inital &&
                            <View style={{ width: '100%', height: Dimensions.get('screen').height, backgroundColor: 'black' }}>
                                {this.state.assesCheck === 'videos' &&
                                    <View style={[styles.backgroundVideo, {}]} >
                                        {item.url && item.url !== '' &&
                                            <Video
                                                repeat={true}
                                                onError={(error) => {
                                                    console.log('video error', error)
                                                }}
                                                paused={this.getCheck(index)}
                                                posterResizeMode={'cover'}
                                                resizeMode={'none'}
                                                ref={videoPlayer => { this.videoPlayer[index] = videoPlayer }}
                                                source={{ uri: BASE_API_URL_VIDEOS + item.url }}

                                                style={[styles.backgroundVideo, { backgroundColor: 'black' }]} />
                                        }
                                    </View>
                                }




                                {this.state.assesCheck === 'images' &&
                                    <Image
                                        resizeMode={'contain'}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            bottom: 0,
                                            right: 0, backgroundColor: "black"
                                        }}
                                        source={{ uri: BASE_API_URL_IMAEG_ORIGINAL + item.url }}
                                    />
                                }




                                <Image style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    width: '100%', height: '50%',
                                }} source={require('../../../../assets/assets/categoryshowdow.png')} />

                                <Image style={{
                                    position: 'absolute',
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                    transform: [{ rotate: '180 deg' }],
                                    width: '100%', height: '50%',
                                }} source={require('../../../../assets/assets/categoryshowdow.png')} />

                                <View
                                    style={{
                                        position: 'absolute',
                                        left: 0,
                                        bottom: 0,
                                        right: 0,
                                        width: '100%',
                                        height: '100%',
                                    }} >

                                    <TouchableOpacity onPress={() => { this.view(index) }} style={{ width: '100%', height: '100%', }} ><View /></TouchableOpacity>
                                </View>

                                <View style={{
                                    flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center',
                                    width: '100%', paddingTop: moderateScale(50) + getStatusBarHeight(), position: 'absolute', backgroundColor: 'black'
                                }}>

                                    <View style={{
                                        flexDirection: 'row', justifyContent: 'center', flex: 1, justifyContent: 'center', justifyContent: 'flex-end', alignItems: 'center',
                                    }}>
                                        <View style={{
                                            flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center',
                                            paddingHorizontal: moderateScale(7), padding: moderateScale(10), backgroundColor: theme.colors.black
                                        }}>

                                            <Image style={{
                                                height: moderateScale(25), width: moderateScale(35), borderRadius: moderateScale(20), zIndex: 999999,
                                            }} source={{ uri: BASE_API_URL_IMAEG_ORIGINAL + this.props.celebraty.cover_image }} />

                                            <View>
                                                <View style={{ padding: moderateScale(10), flexDirection: 'column', }}>
                                                    <TextAnimationShake value={this.props.celebraty.first_name + ' ' + this.props.celebraty.last_name} delay={10} duration={100} fontSize={moderateScale(1)} style={{
                                                        color: theme.colors.white,
                                                        fontSize: moderateScale(15),
                                                        textAlign: 'center',
                                                        fontFamily: 'satisfy', fontWeight: '500'
                                                    }} />
                                                </View>
                                            </View>


                                            <View style={{ flex: 1, justifyContent: 'flex-end', alignSelf: 'center', alignItems: 'flex-end', flexDirection: 'row' }}>



                                                {this.props.isRightUser &&

                                                    <TouchableOpacity style={{}} onPress={() => {

                                                        PopupOptions.show({
                                                            type: 'Success',
                                                            title: 'Delete Confrim',
                                                            button: true,
                                                            textBody: 'Do you want to remove this median item from your profile?',
                                                            buttonText: 'Confirm',
                                                            duration: 500,
                                                            iamge: require('../../../../assets/assets/delete_warning.gif'),
                                                            callback: () => {

                                                                Apis.Delete('users/image/video/' + (item.id ? item.id : item._id), {}).then((data) => {
                                                                    this.state.assetsList.splice(index, 1);
                                                                    this.props.onHide();
                                                                }).catch((error) => {
                                                                    console.log(error);
                                                                    this.setState({ isLoading: false })
                                                                })

                                                                PopupOptions.hide();
                                                            }
                                                        })

                                                    }}>
                                                        <Icon size={moderateScale(25)} name="trash" color={theme.colors.gray02} />
                                                    </TouchableOpacity>


                                                }

                                                {this.props.isRightUser &&
                                                    <TouchableOpacity style={{
                                                        backgroundColor: theme.colors.gray02, borderRadius: moderateScale(10), paddingHorizontal: moderateScale(15),
                                                        paddingVertical: moderateScale(5), marginStart: moderateScale(15)
                                                    }} onPress={() => { this.edit(index) }}>
                                                        <View>
                                                            <Text style={[{
                                                                textAlign: 'center',
                                                                fontSize: moderateScale(15),
                                                                color: theme.colors.white, fontWeight: 'bold'
                                                            }]}>{item.edit ? 'Done' : 'Edit'}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                }


                                            </View>

                                        </View>
                                    </View>


                                    {item.view &&

                                        <View style={{
                                            flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center',
                                            width: '100%', backgroundColor: theme.colors.blackLightGray + '70', paddingHorizontal: moderateScale(10), paddingTop: moderateScale(0)
                                        }}>

                                            <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1, justifyContent: 'center', justifyContent: 'flex-end', alignItems: 'center', }}>
                                                <View style={{
                                                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center',
                                                }}>

                                                    <View style={{ flex: 1 }}>
                                                        <View style={{ flexDirection: 'column', marginTop: moderateScale(10) }}>
                                                            <Text style={[{
                                                                fontSize: moderateScale(15),
                                                                color: theme.colors.gray03, fontWeight: '800'
                                                            }]}>{'Title'}</Text>

                                                            <View pointerEvents={!item.edit ? 'none' : 'auto'}>
                                                                <Input
                                                                    editable={item.edit}
                                                                    maxLength={100}
                                                                    labelStyle={{ color: theme.colors.secondary }}
                                                                    containerStyle={{ paddingLeft: 0, paddingRight: 0 }}
                                                                    inputContainerStyle={{
                                                                        width: '100%', width: '100%',
                                                                        ...I18nManager.isRTL ? { paddingRight: 10 } : {},
                                                                        borderBottomWidth: 0, marginTop: moderateScale(5),
                                                                        ...item.edit ? { backgroundColor: theme.colors.gray06, paddingHorizontal: moderateScale(10), paddingTop: moderateScale(10), marginBottom: moderateScale(10) } : {}, paddingBottom: moderateScale(10)
                                                                    }}
                                                                    returnKeyType="next"
                                                                    multiline
                                                                    inputStyle={{
                                                                        textAlignVertical: 'center', height: '100%', ...I18nManager.isRTL ? { textAlign: 'right' } : {},
                                                                        ...item.edit ? { color: theme.colors.black } : { color: theme.colors.white }, fontWeight: '500'
                                                                    }}
                                                                    containerStyle={{ paddingLeft: 0, paddingRight: 0 }}
                                                                    placeholder={translate('Title')}
                                                                    value={item.title}
                                                                    onChangeText={(value) => {
                                                                        this.title(index, value)
                                                                    }}
                                                                />
                                                            </View>

                                                        </View>
                                                    </View>

                                                </View>
                                            </View>
                                        </View>
                                    }

                                </View>


                                <View style={{
                                    marginTop: moderateScale(10), flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', position: 'absolute',
                                    top: moderateScale(20), padding: moderateScale(15)
                                }}>

                                    <View style={{
                                        flexDirection: 'row', justifyContent: 'center', flex: 1,
                                        justifyContent: 'center', justifyContent: 'flex-start', alignItems: 'center',
                                    }}>
                                        <View style={{
                                            flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center',
                                            borderRadius: moderateScale(30), justifyContent: 'center', alignItems: 'center'
                                        }}>

                                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.props.onHide() }}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                                    <Icon size={moderateScale(20)} name="chevron-left" color={theme.colors.white} />
                                                </View>
                                            </TouchableOpacity>

                                        </View>
                                    </View>



                                </View>


                                <View style={{ flexDirection: 'column', justifyContent: 'center', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0, width: '100%' }}>

                                    {item.view &&

                                        <View style={{
                                            marginTop: moderateScale(1), flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center',
                                            width: '100%', backgroundColor: theme.colors.blackLightGray + '70', paddingHorizontal: moderateScale(10)
                                        }}>

                                            <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1, justifyContent: 'center', justifyContent: 'flex-end', alignItems: 'center', }}>
                                                <View style={{
                                                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center',
                                                }}>

                                                    <View style={{ flex: 1 }}>
                                                        <View style={{ flexDirection: 'column', marginTop: moderateScale(10) }}>
                                                            <Text style={[{
                                                                fontSize: moderateScale(15),
                                                                color: theme.colors.gray03, fontWeight: '800'
                                                            }]}>{'Description'}</Text>

                                                            <View pointerEvents={!item.edit ? 'none' : 'auto'}>
                                                                <Input
                                                                    editable={item.edit}
                                                                    maxLength={200}
                                                                    labelStyle={{ color: theme.colors.secondary }}
                                                                    containerStyle={{ paddingLeft: 0, paddingRight: 0 }}
                                                                    inputContainerStyle={{
                                                                        width: '100%', width: '100%',
                                                                        ...I18nManager.isRTL ? { paddingRight: 10 } : {},
                                                                        borderBottomWidth: 0, marginTop: moderateScale(5),
                                                                        ...item.edit ? { backgroundColor: theme.colors.gray06, paddingHorizontal: moderateScale(10), paddingTop: moderateScale(10), marginBottom: moderateScale(15) } : {}, paddingBottom: moderateScale(10)
                                                                    }}
                                                                    returnKeyType="next"
                                                                    multiline
                                                                    inputStyle={{
                                                                        textAlignVertical: 'center', height: '100%', ...I18nManager.isRTL ? { textAlign: 'right' } : {},
                                                                        ...item.edit ? { color: theme.colors.black } : { color: theme.colors.white }, fontWeight: '500'
                                                                    }}
                                                                    containerStyle={{ paddingLeft: 0, paddingRight: 0 }}
                                                                    placeholder={translate('Description')}
                                                                    value={item.description}
                                                                    onChangeText={(value) => {
                                                                        this.description(index, value)
                                                                    }}
                                                                />

                                                            </View>

                                                        </View>
                                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'flex-start', alignItems: 'flex-start', marginTop: moderateScale(-10), marginBottom: moderateScale(10) }}>

                                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                                                <Image style={{ height: moderateScale(20), width: moderateScale(20), tintColor: theme.colors.white }} source={require('../../../../assets/assets/eye.png')} />
                                                                <Text style={[{
                                                                    textAlign: 'center',
                                                                    fontSize: moderateScale(15),
                                                                    color: theme.colors.white, fontWeight: 'bold'
                                                                }]}>{'  ' + item.views + ' Views'}</Text>
                                                            </View>

                                                        </View>
                                                    </View>



                                                </View>
                                            </View>
                                        </View>

                                    }



                                    <View style={{
                                        flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center',
                                        justifyContent: 'center', alignItems: 'center', paddingBottom: moderateScale(10), margin: moderateScale(20)
                                    }}>

                                        <View style={{ flex: 1, justifyContent: 'center' }}>
                                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', }} onPress={() => {


                                                if (!!!this.props.data.userInfo.email) {
                                                    this.props.navigation.navigate('Login');
                                                    return;
                                                }

                                                this.state.assetsList[index].isLoading = true;
                                                this.setState({ assetsList: this.state.assetsList })
                                                this.like(item._id, index)


                                            }}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>


                                                    {!item.isLoading && <Icon size={moderateScale(15)} name="heart" color={!item.isLike ? theme.colors.white : theme.colors.red} />}
                                                    {item.isLoading && <ActivityIndicator size={'small'} color={theme.colors.white} />}

                                                    <Text style={[{
                                                        textAlign: 'center',
                                                        fontSize: moderateScale(15),
                                                        color: theme.colors.white, fontWeight: 'bold'
                                                    }]}>{'  ' + item.likes + ' Like'}</Text>

                                                </View>
                                            </TouchableOpacity>
                                        </View>


                                        <View style={{ width: moderateScale(1), backgroundColor: theme.colors.white, height: moderateScale(30) }} />




                                        <View style={{ flex: 1.2, justifyContent: 'center', alignContent: 'center', alignItems: 'center', }}>
                                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', }} onPress={() => {
                                                // this.setState({ commentsShow: true })
                                                this.branchView?.snapTo(1)
                                            }}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>


                                                    {!item.commentsLoading && <Icon size={moderateScale(15)} name="comments" color={theme.colors.white} />}
                                                    {item.commentsLoading && <ActivityIndicator size={'small'} color={theme.colors.white} />}
                                                    {!item.commentsLoading &&
                                                        <Text style={[{
                                                            textAlign: 'center',
                                                            fontSize: moderateScale(15),
                                                            color: theme.colors.white, fontWeight: 'bold'
                                                        }]}>{'  ' + (item.comments ? item.comments.totalResults : 0) + ' Comment'}</Text>
                                                    }



                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{ width: moderateScale(1), backgroundColor: theme.colors.white, height: moderateScale(30) }} />


                                        <View style={{ flex: 1, justifyContent: 'center', }}>
                                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.Share(index) }}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>

                                                    <Icon size={moderateScale(15)} name="share" color={theme.colors.white} />
                                                    <Text style={[{
                                                        textAlign: 'center',
                                                        fontSize: moderateScale(15),
                                                        color: theme.colors.white, fontWeight: 'bold'
                                                    }]}>{'  Share'}</Text>

                                                </View>
                                            </TouchableOpacity>

                                        </View>


                                    </View>

                                </View>

                            </View>

                        }

                    </View>

                }>



            </SwiperFlatList>

        )
    }

    refreashComments(comments) {
        this.state.viewableItemsComments.comments = comments;
        this.setState({ viewableItemsComments: this.state.viewableItemsComments })
    }

    renderContent = () => (
        <View style={{ backgroundColor: theme.colors.white, height: '100%' }}>
            <CommentsView fetchComments={() => {
                this.getComments(this.state.viewableItemsComments._id, this.state.viewableItemIndex)
            }} {...this.props} viewableItems={this.state.viewableItemsComments}
                refreshCommeents={(comments) => {
                    this.refreashComments(comments)
                }} />
        </View>
    );

    render() {

        return (
            <View
                style={{
                    width: '100%',
                    height: '100%', backgroundColor: 'black'
                }}>


                <BottomSheet
                    ref={(ref) => { this.branchView = ref }}
                    snapPoints={["0%", '90%']}
                    borderRadius={moderateScale(20)}
                    renderContent={this.renderContent}
                />


                {this.props.single &&
                    <Modal
                        animationType='fade'
                        presentationStyle={'fullScreen'}
                        visible={true}
                        onRequestClose={() => {
                            this.setState({ commentsShow: false })
                        }}
                        onDismiss={() => {
                            this.setState({ commentsShow: false })
                        }}>

                        <KeyboardSpacer />


                    </Modal>
                }

                {!this.props.single &&
                    <View>
                        {this.getListView()}
                    </View>
                }



                {this.state.commentsShow &&
                    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: "center" }}>
                        <Modal
                            animationType="slide"
                            presentationStyle={'pageSheet'}
                            visible={this.state.commentsShow}
                            onRequestClose={() => {
                                this.setState({ commentsShow: false })
                            }}
                            onDismiss={() => {
                                this.setState({ commentsShow: false })
                            }}>
                            <TouchableWithoutFeedback
                                activeOpacity={1}
                                onPressOut={(e) => {
                                    if (e.nativeEvent.locationY < 0) {
                                        this.setState({ commentsShow: false });
                                    }
                                }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}>
                                <View style={{
                                    flex: 1,
                                    height: '100%',
                                    backgroundColor: "white",
                                }}>
                                    <CommentsView fetchComments={() => {
                                        this.getComments(this.state.viewableItemsComments._id, this.state.viewableItemIndex)
                                    }} {...this.props} viewableItems={this.state.viewableItemsComments} />
                                </View>
                            </TouchableWithoutFeedback>
                        </Modal>
                    </View>
                }

            </View >


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
        color: theme.colors.black,
        width: '100%', fontWeight: '400', alignSelf: 'center', width: "100%", textAlign: 'center',
        borderBottomWidth: moderateScale(1), borderBottomColor: theme.colors.secondary
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    keyboardAvoidingView: {
        flexGrow: 1, flexShrink: 1,
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        justifyContent: "space-evenly",
    },
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
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(MediaView))


