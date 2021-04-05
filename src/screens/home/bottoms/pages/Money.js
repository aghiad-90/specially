import React, { Component } from 'react';
import { StyleSheet, StatusBar, View, ActionSheetIOS, I18nManager } from 'react-native'
import { theme } from '../../../../core/theme';
import { Block, Text, } from '../../../../components/widget';
import * as loginActions from '../../../../actions/Actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../childs/Header';
import { moderateScale } from 'react-native-size-matters';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { translate } from '../../../../utils/utils';
import { BASE_API_URL_IMAEG_ORIGINAL } from '../../../../services/config';
import { FONT_FAMILY } from '../../../../services/config';
import * as ImagePicker from 'react-native-image-picker';
import { Input } from 'react-native-elements';
import * as Apis from '../../../../services/Apis';
import Loader from '../../../../components/widget/loader';
import CheckBox from 'react-native-check-box'






class Money extends Component {


    videoPlayer = [];
    GiftvideoPlayer = [];


    constructor(props) {
        super(props);
        this.state = {
            isLoading: true, selected: 1, type: 1, data: [{}, {}, {}], celebraty: this.props.data.userInfo, uplaodfile: false, title: '', description: '', assetsView: false, assetsList: [], assesCheck: 'images', viewableItems: {},
            costPerGiftVideo: this.props.data.userInfo.costPerGiftVideo, costPerMinute: this.props.data.userInfo.costPerMinute, costPerMinuteStop: false, costPerGiftVideoStop: false, earning: {}
        }
        this.inputRefs = {
        };

    }




    componentDidMount() {
        this.setState({ celebraty: this.state.celebraty });
        this.fetch()
        this.getEarnings();
    }


    getEarnings() {
        Apis.Get('/users/celebrity/earnigns', this.state.params).then((data) => {
            console.log('earning', data)
            this.setState({ isLoading: false, earning: data.Earnings })
        }).catch((error) => {
            console.log(error);
            this.setState({ isLoading: false })
        })
    }


    fetch() {
        this.setState({ isLoading: true });
        this.props.actions.user.fetchUserInfo(((onSuccess) => {
            this.setState({ isLoading: false });
            console.log('onSuccess', { costPerGiftVideo: onSuccess.costPerGiftVideo, costPerMinute: onSuccess.costPerMinute, costPerMinuteStop: onSuccess.costPerMinuteStop, costPerGiftVideoStop: onSuccess.costPerGiftVideoStop })
            this.setState({ costPerGiftVideo: onSuccess.costPerGiftVideo, costPerMinute: onSuccess.costPerMinute, costPerMinuteStop: !!!onSuccess.costPerMinuteStop, costPerGiftVideoStop: !!!onSuccess.costPerGiftVideoStop })
        }), ((onError) => {
            this.setState({ isLoading: false });
            console.log('onError', onError)
        }))
    }





    render() {

        var images = [];
        for (let k in this.props.data.userInfo.images) {
            images.push(BASE_API_URL_IMAEG_ORIGINAL + this.props.data.userInfo.images[k].url)
        }
        return (
            <Block>
                <StatusBar backgroundColor="transparent" barStyle="light-content" />

                <Header search={false} backPrimary={false} back={true} navigation={this.props.navigation} backclick={() => { this.props.navigation.pop() }} Text={translate('Pricing')} />
                <Loader isLoading={this.state.isLoading} />


                <View style={{ width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', marginTop: moderateScale(30) }}>
                    <View style={{ width: '90%', height: '100%', flexDirection: 'column' }}>

                        <View style={{ borderRadius: moderateScale(20), borderWidth: moderateScale(1), borderColor: theme.colors.secondary, padding: moderateScale(10) }}>
                            <Text style={{ color: theme.colors.secondary, marginTop: moderateScale(10), fontSize: moderateScale(20), paddingHorizontal: moderateScale(10), fontWeight: 'bold', width: '100%', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, }}>{translate('Cost For Video Gift')}</Text>
                            <Text style={{ color: theme.colors.black, marginTop: moderateScale(10), fontSize: moderateScale(15), paddingHorizontal: moderateScale(10), fontWeight: 'bold', width: '100%', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginTop: moderateScale(10) }}>{translate('Please put price for gift video')}</Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Input

                                    labelStyle={{ color: theme.colors.secondary }}
                                    containerStyle={{ paddingLeft: 0, paddingRight: 0, flex: 1 }}
                                    inputContainerStyle={{
                                        width: '100%', height: moderateScale(45),
                                        ...I18nManager.isRTL ? { paddingHorizontal: moderateScale(10) } : { paddingHorizontal: moderateScale(10) }, borderBottomWidth: 0, backgroundColor: theme.colors.gray01, marginTop: moderateScale(5), borderRadius: moderateScale(10)
                                    }}
                                    inputStyle={{ textAlignVertical: 'center', height: '100%', ...I18nManager.isRTL ? { textAlign: 'right' } : {}, fontFamily: FONT_FAMILY }}
                                    returnKeyType="done"
                                    placeholderTextColor={theme.colors.gray02}
                                    placeholder="Cost For Gift Video"
                                    keyboardType="numeric"
                                    defaultValue={this.state.costPerGiftVideo + ''}
                                    value={this.state.costPerGiftVideo}
                                    onChangeText={(value) => this.setState({ costPerGiftVideo: value })}
                                />
                                <Text style={{ color: theme.colors.primary, marginTop: moderateScale(10), fontSize: moderateScale(20), paddingHorizontal: moderateScale(10), fontWeight: 'bold', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, }}>{translate('$')}</Text>

                            </View>


                            {this.state.earning.percentage &&
                                <Text style={{ color: theme.colors.black, marginTop: moderateScale(10), fontSize: moderateScale(15), paddingHorizontal: moderateScale(10), fontWeight: 'bold', width: '100%', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, }}>{translate('*You will get : ')}
                                    {Number(this.state.costPerGiftVideo - ((this.state.earning.percentage / 100) * this.state.costPerGiftVideo).toFixed(2)).toFixed(2)}{'$'}</Text>
                            }

                            <View style={{ width: '100%', backgrouncColor: 'blue', marginVertical: moderateScale(10) }}>
                                <CheckBox
                                    style={{ paddingHorizontal: 10, color: theme.colors.primary }}
                                    onClick={() => {
                                        this.setState({
                                            costPerGiftVideoStop: !this.state.costPerGiftVideoStop
                                        })
                                    }}
                                    costPerGiftVideoStop={!this.state.costPerGiftVideoStop}
                                    checkBoxColor={theme.colors.secondary}
                                    rightTextStyle={{ color: theme.colors.secondary, fontWeight: 'bold', right: 5 }}
                                    rightText={"Stop this Service"}
                                />
                            </View>
                        </View>



                        <View style={{ borderRadius: moderateScale(20), borderWidth: moderateScale(1), borderColor: theme.colors.secondary, padding: moderateScale(10), marginTop: moderateScale(20) }}>
                            <Text style={{ color: theme.colors.secondary, marginTop: moderateScale(10), fontSize: moderateScale(20), paddingHorizontal: moderateScale(10), fontWeight: 'bold', width: '100%', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, }}>{translate('Cost For Video Call')}</Text>
                            <Text style={{ color: theme.colors.black, marginTop: moderateScale(10), fontSize: moderateScale(15), paddingHorizontal: moderateScale(10), fontWeight: 'bold', width: '100%', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginTop: moderateScale(10) }}>{translate('Please put price for 1 mint')}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Input
                                    labelStyle={{ color: theme.colors.secondary }}
                                    containerStyle={{ paddingLeft: 0, paddingRight: 0, flex: 1 }}
                                    inputContainerStyle={{
                                        width: '100%', height: moderateScale(45),
                                        ...I18nManager.isRTL ? { paddingHorizontal: moderateScale(10) } : { paddingHorizontal: moderateScale(10) }, borderBottomWidth: 0, backgroundColor: theme.colors.gray01, marginTop: moderateScale(5), borderRadius: moderateScale(10)
                                    }}
                                    inputStyle={{ textAlignVertical: 'center', height: '100%', ...I18nManager.isRTL ? { textAlign: 'right' } : {}, fontFamily: FONT_FAMILY }}
                                    returnKeyType="done"
                                    placeholderTextColor={theme.colors.gray02}
                                    placeholder="Cost For 1 Mint"
                                    keyboardType="numeric"
                                    defaultValue={this.state.costPerMinute + ''}
                                    value={this.state.costPerMinute}
                                    onChangeText={(value) => this.setState({ costPerMinute: value })}
                                />
                                <Text style={{ color: theme.colors.primary, marginTop: moderateScale(10), fontSize: moderateScale(20), paddingHorizontal: moderateScale(10), fontWeight: 'bold', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, }}>{translate('$')}</Text>

                            </View>
                            {this.state.earning.percentage &&
                                <Text style={{ color: theme.colors.black, marginTop: moderateScale(10), fontSize: moderateScale(15), paddingHorizontal: moderateScale(10), fontWeight: 'bold', width: '100%', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, }}>{translate('*You will get : ')}
                                    {Number(this.state.costPerMinute - ((this.state.earning.percentage / 100) * this.state.costPerMinute).toFixed(2)).toFixed(2)}{'$'}</Text>
                            }

                            <View style={{ width: '100%', backgrouncColor: 'blue', marginVertical: moderateScale(10) }}>
                                <CheckBox
                                    style={{ paddingHorizontal: 10, color: theme.colors.primary }}
                                    onClick={() => {
                                        this.setState({
                                            costPerMinuteStop: !this.state.costPerMinuteStop
                                        })
                                    }}
                                    costPerMinuteStop={!this.state.costPerMinuteStop}
                                    checkBoxColor={theme.colors.secondary}
                                    rightTextStyle={{ color: theme.colors.secondary, fontWeight: 'bold', right: 5 }}
                                    rightText={"Stop this Service"}
                                />
                            </View>
                        </View>




                        <View style={{
                            borderColor: theme.colors.primary, marginTop: moderateScale(45),
                            borderRadius: moderateScale(10), borderWidth: moderateScale(0), height: moderateScale(40), width: '70%', backgroundColor: theme.colors.secondary, bottom: moderateScale(10), alignSelf: 'center',
                        }}>
                            <TouchableOpacity onPress={() => {

                                var user = JSON.parse(JSON.stringify(this.props.data.userInfo))
                                user.costPerGiftVideo = this.state.costPerGiftVideo;
                                user.costPerMinute = this.state.costPerMinute;
                                user.country = user.country._id;
                                console.log(user);
                                this.setState({ isLoading: true })
                                setTimeout(() => {
                                    var url = 'users';
                                    Apis.Put(url, user).then((data) => {
                                        console.log('data', data)
                                        this.fetch()
                                        this.setState({ isLoading: false })
                                    }).catch((error) => {
                                        console.log(error);
                                        this.setState({ isLoading: false })
                                    })
                                }, 100);





                            }} style={{ width: '100%', height: "100%", alignSelf: 'center', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: moderateScale(16), color: theme.colors.white, fontFamily: FONT_FAMILY, fontWeight: 'bold' }}>{translate('Update').toUpperCase()}</Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                </View>

            </Block >
        )
    }



    onViewableItemsChanged = ({ viewableItems, changed }) => {
        console.log("Visible items are", viewableItems);
        console.log("Changed in this iteration", changed);
        if (viewableItems[0])
            this.setState({ viewableItems: viewableItems[0] })
    }


    getCheck(index) {
        return index !== this.state.viewableItems.index;
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
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Money))