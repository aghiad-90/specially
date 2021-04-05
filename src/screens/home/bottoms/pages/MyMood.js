import React, { Component } from 'react';
import { StyleSheet, StatusBar, View, FlatList, Image, I18nManager, ActivityIndicator, ScrollView, Share } from 'react-native'
import { theme } from '../../../../core/theme';
import { Block, Text, } from '../../../../components/widget';
import * as loginActions from '../../../../actions/Actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../childs/Header';
import { moderateScale } from 'react-native-size-matters';
import { showDanger, translate } from '../../../../utils/utils';
import { BASE_API_URL_VIDEOS, BASE_API_URL_IMAEG_ORIGINAL } from '../../../../services/config';
import { TouchableOpacity } from 'react-native-gesture-handler';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import Video from 'react-native-video';
import moment from "moment";
import * as Apis from '../../../../services/Apis';

import TextInput from '../../../../components/Weights/TextInput';
import Loader from '../../../../components/widget/loader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MediaView from '../childs/MediaView';
import CeleberatyHeaderButtton from '../childs/CeleberatyHeaderButtton';
import CeleberatyUdateCover from '../childs/CeleberatyUdateCover';
import { Dimensions } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet'
import { LayoutAnimation } from 'react-native';
import { AudioPlayer } from '../../../../components/react-native-simple-audio-player';
import CommentsView from '../childs/CommentsView';






class CeleberateDetails extends Component {


    videoPlayer = [];
    GiftvideoPlayer = [];


    constructor(props) {
        super(props);
        this.state = {
            isLoading: false, selectedtab: 0, celebraty: this.props.navigation.state.params.item, details: '', assetsView: false, startingIndex: 0
        }

    }



    getComments(id, index) {
        this.state.celebraty.myMoodList[index].commentsLoading = true;
        this.setState({ celebraty: this.state.celebraty, })
        Apis.Get('comments/post/' + id + '?limit=1000', {}).then((data) => {
            this.state.celebraty.myMoodList[index].commentsLoading = false;
            this.state.celebraty.myMoodList[index].comments = data;
            this.setState({ celebraty: this.state.celebraty, })

        }).catch((error) => {
            this.state.celebraty.myMoodList[index].commentsLoading = false;
            this.setState({ celebraty: this.state.celebraty })
            console.log(error);
            this.setState({ isLoading: false })
        })
    }



    componentDidMount() {
        this.getComments(this.state.celebraty.myMoodList[this.state.startingIndex]._id, this.state.startingIndex);
        this.addView(this.state.celebraty.myMoodList[this.state.startingIndex]._id)
    }






    like(id) {
        Apis.Post('users/postLike/' + id, {}).then((data) => {
            this.getCelebrityDetails()
        }).catch((error) => {
            console.log(error);
            this.setState({ isLoading: false })
        })
    }


    addView(id) {
        Apis.Post('users/View/' + id, {}).then((data) => {

        }).catch((error) => {

        })
    }




    addReview() {
        Apis.Post('users/review/', { details: this.state.details, userTo: this.state.celebraty._id }).then((data) => {
            this.getCelebrityDetails();
            this.setState({ details: '', commentLoading: false })
        }).catch((error) => {
            this.setState({ commentLoading: false })
            console.log(error);
            this.setState({ isLoading: false })
        })
    }




    like(id, index) {
        this.state.celebraty.myMoodList[index].isLoading = true;
        this.setState({ celebraty: this.state.celebraty })
        Apis.Post('users/postLike/' + id, {}).then((data) => {
            this.state.celebraty.myMoodList[index].isLoading = false;
            if (!this.state.celebraty.myMoodList[index].isLike) {
                this.state.celebraty.myMoodList[index].isLike = true;
                this.state.celebraty.myMoodList[index].likes = this.state.celebraty.myMoodList[index].likes + 1;
            } else {
                this.state.celebraty.myMoodList[index].isLike = false;
                this.state.celebraty.myMoodList[index].likes = this.state.celebraty.myMoodList[index].likes - 1;
            }

            this.setState({ celebraty: this.state.celebraty })
        }).catch((error) => {
            this.state.celebraty.myMoodList[index].isLoading = false;
            this.setState({ celebraty: this.state.celebraty })
            console.log(error);
            this.setState({ isLoading: false })
        })
    }






    async Share() {



        const link = await dynamicLinks().buildShortLink({
            link: 'https://sbisiali.com/mymood/' + this.state.celebraty.myMoodList[this.state.startingIndex]._id,
            // domainUriPrefix is created in your Firebase console
            domainUriPrefix: 'https://sbisiali.page.link',
            // optional setup which updates Firebase analytics campaign
            // "banner". This also needs setting up before hand
            social: {
                descriptionText: this.state.celebraty.myMoodList[this.state.startingIndex].description,
                imageUrl: BASE_API_URL_IMAEG_ORIGINAL + this.state.celebraty.myMoodList[this.state.startingIndex].url,
                title: this.state.celebraty.myMoodList[this.state.startingIndex].title

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



    renderContent = () => (
        <View style={{ backgroundColor: theme.colors.white, height: '100%' }}>
            <CommentsView fetchComments={() => {
                this.getComments(this.state.celebraty.myMoodList[this.state.startingIndex]._id, this.state.startingIndex)
            }} {...this.props} viewableItems={this.state.celebraty.myMoodList[this.state.startingIndex]}
                refreshCommeents={(comments) => {
                    this.getComments(this.state.celebraty.myMoodList[this.state.startingIndex]._id, this.state.startingIndex)
                }} />
        </View>
    );

    render() {

        var item = this.state.celebraty;


        var images = [];

        for (let k in this.state.celebraty.imagesList) {
            images.push({ uri: BASE_API_URL_IMAEG_ORIGINAL + this.state.celebraty.imagesList[k].url })
        }


        return (
            <Block>
                <StatusBar backgroundColor="transparent" barStyle="dark-content" />

                <Header search={false} back={false} back={true} navigation={this.props.navigation} backclick={() => { this.props.navigation.pop() }} Text={translate('My Mood')} share={false} shareClick={() => {
                    this.Share()
                }} />
                <Loader isLoading={this.state.isLoading} />


                <BottomSheet
                    ref={(ref) => { this.branchView = ref }}
                    snapPoints={["0%", '90%']}
                    borderRadius={moderateScale(20)}
                    renderContent={this.renderContent}
                />


                {!this.state.isLoading &&
                    <KeyboardAwareScrollView scrollEnabled={false} showsVerticalScrollIndicator={false} contentContainerStyle={{ height: '100%' }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'column', }}>
                                <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'column', height: moderateScale(200) }}>
                                    <Image resizeMode="cover" style={{
                                        height: moderateScale(200),
                                        backgroundColor: 'white', width: '100%', alignSelf: 'center', borderRadius: moderateScale(0)
                                    }}
                                        source={{ uri: BASE_API_URL_IMAEG_ORIGINAL + this.state.celebraty.myMoodList[this.state.startingIndex].url }}
                                    />
                                    <View style={{ width: '100%', height: '100%', position: 'absolute', backgroundColor: theme.colors.black, opacity: 0.5, }} />
                                    <View style={{ position: 'absolute', bottom: 0, width: '100%', height: moderateScale(140) }}>

                                        <AudioPlayer
                                            style={{ paddingTop: moderateScale(20) }}
                                            url={BASE_API_URL_VIDEOS + this.state.celebraty.myMoodList[this.state.startingIndex].audioUrl}
                                        />

                                    </View>

                                </View>


                                <View style={{ paddingTop: moderateScale(0), paddingHorizontal: moderateScale(5), flexDirection: 'row' }}>

                                    <View style={{ flexDirection: 'column', paddingHorizontal: moderateScale(5), justifyContent: 'flex-start', alignContent: 'flex-start', alignItems: 'flex-start', paddingTop: moderateScale(5), paddingStart: moderateScale(10) }}>

                                        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-start', alignContent: 'flex-start', marginTop: moderateScale(0) }}>
                                            <Text numberOfLines={1} style={[styles.heading, {
                                                ...I18nManager.isRTL ? { textAlign: 'right' } : {}, fontWeight: 'bold', textAlign: 'right',
                                                color: theme.colors.secondary, fontSize: moderateScale(17),
                                            }]}>{this.state.celebraty.myMoodList[this.state.startingIndex].title}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-end', alignItems: 'center', borderRadius: moderateScale(10), borderWidth: moderateScale(0), backgroundColor: theme.colors.white, padding: moderateScale(3), marginStart: moderateScale(10) }}>
                                            <Text style={[{
                                                ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold', textAlign: 'right',
                                                color: theme.colors.secondary, fontSize: moderateScale(14), paddingHorizontal: moderateScale(5)
                                            }]}>{this.state.celebraty.myMoodList[this.state.startingIndex].description}</Text>

                                        </View>
                                    </View>


                                    <View style={{ height: moderateScale(50), flex: 1, justifyContent: 'center', flexDirection: 'row', alignContent: 'flex-end', alignItems: 'flex-end', alignSelf: 'flex-end' }}>
                                        <View style={{ flexDirection: 'row-reverse', flex: 1, marginTop: moderateScale(7), marginStart: moderateScale(5), flexDirection: 'row-reverse', alignContent: 'flex-end', alignItems: 'flex-end', alignSelf: 'flex-end' }}>



                                            <TouchableOpacity onPress={() => {
                                                this.Share()
                                            }} style={{ flexDirection: 'column', alignItems: 'center', alignContent: 'center', marginHorizontal: moderateScale(3) }}>
                                                <Image source={require('../../../../assets/assets/shareicon.png')} resizeMode={'stretch'} style={{
                                                    height: moderateScale(20), width: moderateScale(20), marginBottom: moderateScale(1)
                                                }} />
                                                <Text style={[styles.heading, {
                                                    ...I18nManager.isRTL ? { textAlign: 'right' } : {}, textAlign: 'center',
                                                    color: theme.colors.secondary, fontSize: moderateScale(7),
                                                }]}>{item.youtube_count}{'\nShare'}</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={() => {
                                                this.like(this.state.celebraty.myMoodList[this.state.startingIndex]._id, this.state.startingIndex);
                                            }} style={{ flexDirection: 'column', alignItems: 'center', alignContent: 'center', marginHorizontal: moderateScale(3) }}>
                                                <Image source={this.state.celebraty.myMoodList[this.state.startingIndex].isLike ? require('../../../../assets/assets/ic_heart_red.png') : require('../../../../assets/assets/ic_heart_red_empty.png')} resizeMode={'stretch'} style={{
                                                    height: moderateScale(20), width: moderateScale(20), marginBottom: moderateScale(1)
                                                }} />
                                                <Text style={[styles.heading, {
                                                    ...I18nManager.isRTL ? { textAlign: 'right' } : {}, textAlign: 'center',
                                                    color: theme.colors.secondary, fontSize: moderateScale(7),
                                                }]}>{this.state.celebraty.myMoodList[this.state.startingIndex].likes}{'\nLikes'}</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={() => {
                                                this.branchView?.snapTo(1)
                                            }}
                                                style={{ flexDirection: 'column', alignItems: 'center', alignContent: 'center', marginHorizontal: moderateScale(3) }}>
                                                <Image source={require('../../../../assets/assets/conversation.png')} resizeMode={'stretch'} style={{
                                                    height: moderateScale(20), width: moderateScale(20), marginBottom: moderateScale(1)
                                                }} />
                                                <Text style={[styles.heading, {
                                                    ...I18nManager.isRTL ? { textAlign: 'right' } : {}, textAlign: 'center',
                                                    color: theme.colors.secondary, fontSize: moderateScale(7),
                                                }]}>{this.state.celebraty.myMoodList[this.state.startingIndex].comments ? this.state.celebraty.myMoodList[this.state.startingIndex].comments.totalResults : '0'}{'\nComments'}</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center', alignContent: 'center', marginHorizontal: moderateScale(3) }}>
                                                <Image source={require('../../../../assets/assets/eye.png')} resizeMode={'stretch'} style={{
                                                    height: moderateScale(20), width: moderateScale(20), marginBottom: moderateScale(1)
                                                }} />
                                                <Text style={[styles.heading, {
                                                    ...I18nManager.isRTL ? { textAlign: 'right' } : {}, textAlign: 'center',
                                                    color: theme.colors.secondary, fontSize: moderateScale(7),
                                                }]}>{this.state.celebraty.myMoodList[this.state.startingIndex].views}{'\nViews'}</Text>
                                            </TouchableOpacity>

                                        </View>
                                    </View>

                                </View>

                            </View>
                            <View style={{ flex: 1, marginHorizontal: moderateScale(14), }}>
                                <View style={{ width: '100%', height: moderateScale(1), backgroundColor: theme.colors.secondary, marginVertical: moderateScale(10), alignSelf: 'center' }} />

                                <FlatList
                                    data={this.state.celebraty.myMoodList}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{ paddingBottom: moderateScale(100) }}
                                    renderItem={({ item, index }) => (
                                        <View
                                            key={'image-gallery-' + index}
                                            style={{
                                                flex: 1 / 3,
                                                flexDirection: 'column',
                                                margin: moderateScale(1),
                                                shadowColor: "#000",
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 1,
                                                },
                                                shadowOpacity: 0.18,
                                                shadowRadius: 1.00,

                                                elevation: 1, backgroundColor: theme.colors.gray07,
                                                borderRadius: moderateScale(10), marginBottom: moderateScale(10)
                                            }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.setState({ startingIndex: index })
                                                    this.getComments(this.state.celebraty.myMoodList[index]._id, index);
                                                    this.addView(this.state.celebraty.myMoodList[index]._id)


                                                }}>
                                                <View style={{ flexDirection: 'row' }}>


                                                    <View style={{ borderEndWidth: moderateScale(5), width: moderateScale(155), borderColor: theme.colors.gray02 }}>

                                                        <Image
                                                            resizeMode={'cover'}
                                                            style={{
                                                                justifyContent: 'center',
                                                                alignItems: 'center', borderRadius: moderateScale(10),
                                                                backgroundColor: theme.colors.gray05, height: moderateScale(150), width: moderateScale(150),
                                                                borderTopRightRadius: 0, borderBottomRightRadius: 0

                                                            }}
                                                            source={{ uri: BASE_API_URL_IMAEG_ORIGINAL + item.url }} />
                                                    </View>
                                                    <View style={{ flexDirection: 'column', flex: 1, padding: moderateScale(10) }}>
                                                        <View style={{ flexDirection: 'column', flex: 1, alignItems: 'flex-start', alignContent: 'flex-start', marginTop: moderateScale(0) }}>
                                                            <Text numberOfLines={1} style={[styles.heading, {
                                                                fontWeight: 'bold', textAlign: 'right',
                                                                color: theme.colors.secondary, fontSize: moderateScale(20),
                                                            }]}>{item.title}</Text>
                                                            <Text style={[{
                                                                fontWeight: 'bold', textAlign: 'right',
                                                                color: theme.colors.secondary, fontSize: moderateScale(14), paddingHorizontal: moderateScale(5)
                                                            }]}>{item.description}</Text>
                                                        </View>



                                                        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-start', alignContent: 'flex-start', marginTop: moderateScale(0) }}>

                                                            <Image source={require('../../../../assets/assets/microphone.png')} resizeMode={'cover'} style={{
                                                                height: moderateScale(15), width: moderateScale(15), marginBottom: moderateScale(1)
                                                            }} />
                                                            <Text style={[styles.heading, {
                                                                textAlign: 'center',
                                                                color: theme.colors.secondary, fontSize: moderateScale(12), paddingHorizontal: moderateScale(3), fontWeight: '500'
                                                            }]}>{moment(new Date(item.createdAt)).format('DD MMM YYYY')}</Text>

                                                        </View>
                                                        <TouchableOpacity onPress={() => {

                                                            this.like(this.state.celebraty.myMoodList[index]._id, index);

                                                        }} style={{
                                                            flexDirection: 'row', alignItems: 'center', alignContent: 'center',
                                                            marginHorizontal: moderateScale(3), bottom: 10, zIndex: 999999, right: 0, padding: moderateScale(10), width: moderateScale(50), alignSelf: 'flex-end'
                                                        }}>
                                                            <Text style={[styles.heading, {
                                                                textAlign: 'center',
                                                                color: theme.colors.secondary, fontSize: moderateScale(10), paddingHorizontal: moderateScale(3)
                                                            }]}>{item.likes}</Text>

                                                            {item.isLoading &&
                                                                <ActivityIndicator size={'small'} />
                                                            }
                                                            {!item.isLoading &&
                                                                <Image source={item.isLike ? require('../../../../assets/assets/ic_heart_red.png') : require('../../../../assets/assets/ic_heart_red_empty.png')} resizeMode={'cover'} style={{
                                                                    height: moderateScale(20), width: moderateScale(20),
                                                                }} />
                                                            }

                                                        </TouchableOpacity>

                                                    </View>


                                                </View>
                                            </TouchableOpacity>

                                        </View>
                                    )}
                                    keyExtractor={(item, index) => index}
                                />


                            </View>



                            {this.state.selectedtab !== 3 && this.props.data.userInfo._id !== item._id &&
                                <View style={{ alignSelf: 'center', position: 'absolute', bottom: moderateScale(20), zIndex: 1, width: '80%', }}>
                                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('CeleberateBooking', { item: item }) }} style={{
                                        marginHorizontal: moderateScale(0), backgroundColor: theme.colors.secondary, zIndex: 10,
                                        height: moderateScale(40), alignItems: 'center', borderRadius: moderateScale(20),
                                        justifyContent: 'center', borderColor: theme.colors.secondary, borderWidth: moderateScale(0.5),
                                        shadowColor: theme.colors.primary, shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        }, shadowOpacity: 0.25, shadowRadius: 3.84,
                                    }}>
                                        <View>
                                            <Text style={[styles.heading, {
                                                ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold', textAlign: 'center',
                                                color: theme.colors.white, fontSize: moderateScale(15),

                                            }]}>{'Make Request'}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }


                            {this.props.data.userInfo._id === item._id &&
                                <View style={{ position: 'absolute', bottom: moderateScale(10), right: moderateScale(10) }}>
                                    <CeleberatyHeaderButtton readload={() => {
                                        this.getCelebrityDetails()
                                    }} {...this.props} />
                                </View>
                            }


                        </View>

                    </KeyboardAwareScrollView>
                }


                {this.state.assetsView &&
                    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: "center", backgroundColor: 'black', position: 'absolute', width: '100%', height: '100%' }}>
                        <MediaView {...this.props} isRightUser={this.props.data.userInfo.email && this.props.data.userInfo.role !== 'user' && this.props.data.userInfo._id === this.state.celebraty._id} celebraty={this.state.celebraty} startingIndex={this.state.startingIndex} assetsList={this.state.celebraty.myMoodList} assesCheck={this.state.assesCheck} onHide={() => { this.setState({ assetsView: false }) }} />
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