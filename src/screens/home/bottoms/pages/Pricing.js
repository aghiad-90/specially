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
import { showSuccess, translate } from '../../../../utils/utils';
import { BASE_API_URL_IMAEG_ORIGINAL } from '../../../../services/config';
import { FONT_FAMILY } from '../../../../services/config';
import * as ImagePicker from 'react-native-image-picker';
import * as Apis from '../../../../services/Apis';
import Loader from '../../../../components/widget/loader';
import { Input } from 'react-native-elements';
import RadioButtonRN from 'radio-buttons-react-native';
import CheckBox from 'react-native-check-box'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';






class Money extends Component {


    videoPlayer = [];
    GiftvideoPlayer = [];


    constructor(props) {
        super(props);
        this.state = {
            isLoading: true, selected: 1, type: 1, data: [{}, {}, {}], withDrawType: 1, secureTextEntry: false,
            celebraty: this.props.data.userInfo, uplaodfile: false, title: '', description: '', assetsView: false, assetsList: [], assesCheck: 'images', viewableItems: {}, earning: {}, amount: '', email: this.props.data.userInfo.email, accountName: this.props.data.userInfo.first_name + ' ' + this.props.data.userInfo.last_name, AccountNumber: '', Other: ''
        }
        this.inputRefs = {
        };

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
        this.setState({ celebraty: this.state.celebraty });

        this.fetch()
        this.getEarnings();
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


    getEarnings() {
        Apis.Get('/users/celebrity/earnigns', this.state.params).then((data) => {
            console.log('earning', data)
            this.setState({ isLoading: false, earning: data.Earnings })
        }).catch((error) => {
            console.log(error);
            this.setState({ isLoading: false })
        })
    }



    sendTranfer() {
        this.setState({ isLoading: true });
        var params = {};
        params.amount = this.state.earning.artist;
        params.type = this.state.withDrawType;
        params.email = this.state.email;
        params.accountName = this.state.accountName;
        params.status = '0';
        params.Other = this.state.Other;
        params.AccountNumber = this.state.AccountNumber;

        Apis.Post('/transfers', params).then((data) => {
            this.setState({ isLoading: false })
            showSuccess('Transfer request is received successfully we will notify you when transfer get completed.')
        }).catch((error) => {
            console.log(error);
            this.setState({ isLoading: false })
        })
    }




    uplaodfile(response, type) {
        console.log(response)
        this.setState({ uplaodfile: true, uplaodfileresponse: response })
    }


    createImageOrVideo(url, data) {
        this.setState({ uplaodfile: false })
        Apis.Post(url, data).then((data) => {
            console.log(data);
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
        var item = this.props.data.userInfo;

        return (
            <Block>
                <StatusBar backgroundColor="transparent" barStyle="light-content" />

                <Header search={false} backPrimary={false} back={true} navigation={this.props.navigation} backclick={() => { this.props.navigation.pop() }} Text={translate('Money')} />
                <Loader isLoading={this.state.isLoading} />

                <View style={{ width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center', marginTop: moderateScale(30) }}>
                    <View style={{ width: '90%', height: '100%', flexDirection: 'column' }}>

                        <KeyboardAwareScrollView style={{ borderRadius: moderateScale(20), borderWidth: moderateScale(1), borderColor: theme.colors.secondary, padding: moderateScale(10), marginBottom: moderateScale(200), }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: moderateScale(10) }}>
                            <Text style={{ color: theme.colors.black, marginTop: moderateScale(10), fontSize: moderateScale(12), paddingHorizontal: moderateScale(10), marginVertical: moderateScale(10), fontWeight: 'bold', width: '100%', ...I18nManager.isRTL ? { textAlign: 'right' } : { textAlign: 'right' }, marginTop: moderateScale(10) }}>{translate('لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حعادة البشرية، فلا أحد يرفض أو يكره أو يتجنب الشعور بالسعادة،')}</Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: theme.colors.black, marginTop: moderateScale(10), fontSize: moderateScale(15), paddingHorizontal: moderateScale(10), fontWeight: 'bold', flex: 1, ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginTop: moderateScale(10) }}>{translate('Amount Total')}</Text>
                                <Text style={{ color: theme.colors.primary, marginTop: moderateScale(10), fontSize: moderateScale(20), paddingHorizontal: moderateScale(0), fontWeight: 'bold', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, }}>{this.state.earning.total}  <Text style={{ color: theme.colors.secondary, marginTop: moderateScale(10), fontSize: moderateScale(20), paddingHorizontal: moderateScale(0), fontWeight: 'bold', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, }}>{translate('$')}</Text></Text>
                            </View>


                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: theme.colors.black, marginTop: moderateScale(10), fontSize: moderateScale(15), paddingHorizontal: moderateScale(10), fontWeight: 'bold', flex: 1, ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginTop: moderateScale(10) }}>{translate('Amount To Pay')}</Text>
                                <Text style={{ color: theme.colors.primary, marginTop: moderateScale(10), fontSize: moderateScale(20), paddingHorizontal: moderateScale(0), fontWeight: 'bold', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, }}>{this.state.earning.artist}  <Text style={{ color: theme.colors.secondary, marginTop: moderateScale(10), fontSize: moderateScale(20), paddingHorizontal: moderateScale(0), fontWeight: 'bold', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, }}>{translate('$')}</Text></Text>
                            </View>


                            <View style={{ width: '95%', backgroundColor: theme.colors.gray06, height: moderateScale(1), marginVertical: moderateScale(10), alignSelf: 'center' }} />


                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: theme.colors.black, marginTop: moderateScale(0), fontSize: moderateScale(15), paddingHorizontal: moderateScale(10), fontWeight: 'bold', flex: 1, ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginTop: moderateScale(0) }}>{translate('Our Percentage')}</Text>
                                <Text style={{ color: theme.colors.primary, marginTop: moderateScale(0), fontSize: moderateScale(20), paddingHorizontal: moderateScale(0), fontWeight: 'bold', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, }}>{this.state.earning.percentage}  <Text style={{ color: theme.colors.secondary, marginTop: moderateScale(0), fontSize: moderateScale(20), paddingHorizontal: moderateScale(0), fontWeight: 'bold', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, }}>{translate('%')}</Text></Text>
                            </View>

                            <View style={{ width: '95%', backgroundColor: theme.colors.gray06, height: moderateScale(1), marginVertical: moderateScale(10), alignSelf: 'center' }} />



                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: moderateScale(20), }}>
                                <Text style={{ color: theme.colors.secondary, marginTop: moderateScale(0), fontSize: moderateScale(20), paddingHorizontal: moderateScale(10), fontWeight: 'bold', flex: 1, ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginTop: moderateScale(0) }}>{translate('Transfer By')}</Text>
                            </View>



                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: moderateScale(10) }}>

                                <RadioButtonRN
                                    data={[
                                        {
                                            label: 'Bank Transfer',
                                            check: 1
                                        },
                                        {
                                            label: 'PayPal',
                                            check: 2
                                        },
                                        {
                                            label: 'Other',
                                            check: 3
                                        }
                                    ]}

                                    circleSize={16}
                                    textStyle={{ color: theme.colors.secondary, paddingLeft: moderateScale(5), }}
                                    box={false}
                                    boxStyle={{ flex: 1 }}
                                    activeColor={theme.colors.secondary}
                                    style={{ flexDirection: 'row' }}
                                    initial={1}
                                    selectedBtn={(e) => { this.setState({ withDrawType: e.check }) }}
                                />
                            </View>

                            {this.state.withDrawType === 1 &&

                                <View style={{ marginTop: moderateScale(10) }}>
                                    <Text style={{ color: theme.colors.primary, fontSize: moderateScale(15), paddingHorizontal: moderateScale(10), fontWeight: 'bold', width: '100%', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginTop: moderateScale(10) }}>{translate('Account Name')}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Input

                                            labelStyle={{ color: theme.colors.secondary }}
                                            defaultValue={this.state.last_name}
                                            containerStyle={{ paddingLeft: 0, paddingRight: 0, flex: 1 }}
                                            inputContainerStyle={{
                                                width: '100%', height: moderateScale(40),
                                                ...I18nManager.isRTL ? { paddingHorizontal: moderateScale(10) } : { paddingHorizontal: moderateScale(10) }, borderBottomWidth: 0, backgroundColor: theme.colors.gray01, marginTop: moderateScale(5), borderRadius: moderateScale(40)
                                            }}
                                            inputStyle={{ textAlignVertical: 'center', height: '100%', ...I18nManager.isRTL ? { textAlign: 'right' } : {}, fontFamily: FONT_FAMILY }}
                                            ref={(input) => { if (input) { this.inputRefs.old_password = input; } }}
                                            returnKeyType="done"
                                            placeholderTextColor={theme.colors.gray02}
                                            placeholder="Account Name"
                                            value={this.state.accountName}
                                            keyboardType="numeric"
                                            secureTextEntry={!this.state.secureTextEntry}
                                            onChangeText={(value) => this.setState({ accountName: value })}
                                        />
                                    </View>

                                    <Text style={{ color: theme.colors.primary, fontSize: moderateScale(15), paddingHorizontal: moderateScale(10), fontWeight: 'bold', width: '100%', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginTop: moderateScale(10) }}>{translate('Account Number')}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Input

                                            labelStyle={{ color: theme.colors.secondary }}
                                            defaultValue={this.state.last_name}
                                            containerStyle={{ paddingLeft: 0, paddingRight: 0, flex: 1 }}
                                            inputContainerStyle={{
                                                width: '100%', height: moderateScale(40),
                                                ...I18nManager.isRTL ? { paddingHorizontal: moderateScale(10) } : { paddingHorizontal: moderateScale(10) }, borderBottomWidth: 0, backgroundColor: theme.colors.gray01, marginTop: moderateScale(5), borderRadius: moderateScale(40)
                                            }}
                                            inputStyle={{ textAlignVertical: 'center', height: '100%', ...I18nManager.isRTL ? { textAlign: 'right' } : {}, fontFamily: FONT_FAMILY }}
                                            ref={(input) => { if (input) { this.inputRefs.old_password = input; } }}
                                            returnKeyType="done"
                                            placeholderTextColor={theme.colors.gray02}
                                            placeholder="Account Number"
                                            value={this.state.AccountNumber}
                                            secureTextEntry={!this.state.secureTextEntry}
                                            keyboardType="numeric"
                                            onChangeText={(value) => this.setState({ AccountNumber: value })}
                                        />
                                    </View>

                                    <View style={{ width: '100%', backgrouncColor: 'blue', marginVertical: moderateScale(10) }}>
                                        <CheckBox
                                            style={{ paddingHorizontal: 10, color: theme.colors.primary }}
                                            onClick={() => {
                                                this.setState({
                                                    secureTextEntry: !this.state.secureTextEntry
                                                })
                                            }}
                                            isChecked={this.state.secureTextEntry}
                                            checkBoxColor={theme.colors.secondary}
                                            rightTextStyle={{ color: theme.colors.secondary, fontWeight: 'bold', right: 5 }}
                                            rightText={"Show Info"}
                                        />


                                        {this.state.AccountNumber.length > 13 &&
                                            <Text style={{ color: theme.colors.gray04, marginTop: moderateScale(10), fontSize: moderateScale(15), paddingHorizontal: moderateScale(10), fontWeight: 'bold', width: '100%', textAlign: 'center' }}>{translate('Will Tranfer for your account with : xxxxxx')}{this.state.AccountNumber.length > 4 ? +this.state.AccountNumber.substr(this.state.AccountNumber.length - 4) : ''}</Text>
                                        }

                                    </View>
                                </View>
                            }


                            {this.state.withDrawType === 2 &&

                                <View style={{ marginVertical: moderateScale(10), }}>
                                    <Text style={{ color: theme.colors.primary, fontSize: moderateScale(15), paddingHorizontal: moderateScale(10), fontWeight: 'bold', width: '100%', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginTop: moderateScale(10) }}>{translate('Enter Your Email')}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Input

                                            labelStyle={{ color: theme.colors.secondary }}
                                            containerStyle={{ paddingLeft: 0, paddingRight: 0, flex: 1 }}
                                            inputContainerStyle={{
                                                width: '100%', height: moderateScale(40),
                                                ...I18nManager.isRTL ? { paddingHorizontal: moderateScale(10) } : { paddingHorizontal: moderateScale(10) }, borderBottomWidth: 0, backgroundColor: theme.colors.gray01, marginTop: moderateScale(5), borderRadius: moderateScale(40)
                                            }}
                                            inputStyle={{ textAlignVertical: 'center', height: '100%', ...I18nManager.isRTL ? { textAlign: 'right' } : {}, fontFamily: FONT_FAMILY }}
                                            ref={(input) => { if (input) { this.inputRefs.old_password = input; } }}
                                            returnKeyType="done"
                                            placeholderTextColor={theme.colors.gray02}
                                            placeholder="email"
                                            value={this.state.email}
                                            keyboardType="numeric"
                                            onChangeText={(value) => this.setState({ email: value })}
                                        />
                                    </View>
                                </View>
                            }


                            {this.state.withDrawType === 3 &&

                                <View style={{ marginVertical: moderateScale(10) }}>
                                    <Text style={{ color: theme.colors.primary, fontSize: moderateScale(15), paddingHorizontal: moderateScale(10), fontWeight: 'bold', width: '100%', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginTop: moderateScale(10) }}>{translate('Describe Transfer By')}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Input

                                            labelStyle={{ color: theme.colors.secondary }}
                                            defaultValue={this.state.last_name}
                                            containerStyle={{ paddingLeft: 0, paddingRight: 0, flex: 1 }}
                                            inputContainerStyle={{
                                                width: '100%', height: moderateScale(140),
                                                ...I18nManager.isRTL ? { paddingHorizontal: moderateScale(10) } : { paddingHorizontal: moderateScale(10) }, borderBottomWidth: 0, backgroundColor: theme.colors.gray01, marginTop: moderateScale(5), borderRadius: moderateScale(20), padding: moderateScale(10), paddingHorizontal: moderateScale(20)
                                            }}
                                            multiline={true}
                                            inputStyle={{ textAlignVertical: 'center', height: '100%', ...I18nManager.isRTL ? { textAlign: 'right' } : {}, fontFamily: FONT_FAMILY }}
                                            ref={(input) => { if (input) { this.inputRefs.old_password = input; } }}
                                            returnKeyType="next"
                                            placeholderTextColor={theme.colors.gray02}
                                            placeholder="Description"
                                            value={this.state.Other}
                                            keyboardType="numeric"
                                            onChangeText={(value) => this.setState({ Other: value })}
                                        />
                                    </View>
                                </View>
                            }

                            {this.checkDisable() &&
                                <TouchableOpacity onPress={() => {
                                }} style={{
                                    width: '100%', height: "100%", alignSelf: 'center', alignItems: 'center', alignContent: 'center', justifyContent: 'center', backgroundColor: theme.colors.secondary, width: '100%', height: moderateScale(40), borderColor: theme.colors.primary, marginTop: moderateScale(45),
                                    borderRadius: moderateScale(10), borderWidth: moderateScale(0), height: moderateScale(40), width: '70%', bottom: moderateScale(10), alignSelf: 'center', opacity: .5
                                }}>
                                    <Text style={{ fontSize: moderateScale(16), color: theme.colors.white, fontFamily: FONT_FAMILY, fontWeight: 'bold' }}>{translate('Transfer Now').toUpperCase()}</Text>
                                </TouchableOpacity>

                            }
                            {!this.checkDisable() &&
                                <TouchableOpacity onPress={() => {
                                    this.sendTranfer()
                                }} style={{
                                    width: '100%', height: "100%", alignSelf: 'center', alignItems: 'center', alignContent: 'center', justifyContent: 'center', backgroundColor: theme.colors.secondary, width: '100%', height: moderateScale(40), borderColor: theme.colors.primary, marginTop: moderateScale(45),
                                    borderRadius: moderateScale(10), borderWidth: moderateScale(0), height: moderateScale(40), width: '70%', bottom: moderateScale(10), alignSelf: 'center', opacity: 1
                                }}>
                                    <Text style={{ fontSize: moderateScale(16), color: theme.colors.white, fontFamily: FONT_FAMILY, fontWeight: 'bold' }}>{translate('Transfer Now').toUpperCase()}</Text>
                                </TouchableOpacity>

                            }


                        </KeyboardAwareScrollView>







                    </View>
                </View>

            </Block >
        )
    }


    checkDisable() {

        if (this.state.withDrawType === 1) {
            if (this.state.accountName === '' || this.state.AccountNumber === '' || this.state.AccountNumber.length < 13) return true; else { return false }
        }
        if (this.state.withDrawType === 2) {
            if (this.state.email === '') return true; else { return false }
        }
        if (this.state.withDrawType === 3) {
            if (this.state.Other === '') return true; else { return false }
        }
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