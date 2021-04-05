import React, { Component } from 'react';
import { StyleSheet, StatusBar, View, Image, I18nManager, } from 'react-native'
import { theme } from '../../../../core/theme';
import { Block, Text, } from '../../../../components/widget';
import * as loginActions from '../../../../actions/Actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../childs/Header';
import { moderateScale } from 'react-native-size-matters';
import { showDanger, showSuccess, translate, showSuccessPopup } from '../../../../utils/utils';
import { BASE_API_URL_IMAEG_ORIGINAL } from '../../../../services/config';
import Icon from 'react-native-vector-icons/FontAwesome'
import { SliderBox } from '../../../../components/react-native-image-slider-box';
import TextInput from '../../../../components/Weights/TextInput';
import { Input } from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import CountryPicker from 'react-native-country-picker-modal';
import emojiFlags from 'emoji-flags';
import RNPickerSelect from 'react-native-picker-select';
import RadioButtonRN from 'radio-buttons-react-native';
import * as Apis from '../../../../services/Apis';
import DatePicker from 'react-native-date-picker'
import CheckBox from 'react-native-check-box'
import Loader from '../../../../components/widget/loader';
import ModalDatePicker from 'react-native-datepicker-modal'
import moment from 'moment'










class MakeBooking extends Component {


    videoPlayer = [];
    GiftvideoPlayer = [];


    constructor(props) {
        super(props);
        this.state = {
            isLoading: true, selectedtab: 4, celebraty: this.props.navigation.state.params.item, Bookingdate: new Date(),
            cca2: 'AE', Durations: [], Countries: [], type_hour: "1", ads_type: 1, Ranges: [], ads_via: 1, company_name: 'Crowd Market', company_domain: 'Software'
            , callingCode: '971', selectCountry: false, flag: emojiFlags.countryCode('AE'), name: 'Muhammad', profession: "Porgrammer", phone: "+971509763143", facebook: 'www.facebook.com', instagram: 'www.instagram.com', city: "Islamabad", subject: 'Some issues ', FacebookCheck: false


        }

    }


    getDurations() {
        Apis.Get('duration?isPagination=true&type=video').then((data) => {
            for (let k in data.results) {
                if (!!!data.results[k].range)
                    this.state.Durations.push({ label: data.results[k].costCounter + ' ' + data.results[k].unit.title, value: data.results[k]._id, data: data.results })
                else this.state.Ranges.push({ label: data.results[k].range, value: data.results[k]._id, data: data.results })
            }
            this.setState({ Durations: this.state.Durations, Ranges: this.state.Ranges, AllDurations: data.results })

        }).catch((error) => {
            console.log(error);
        })
    }


    getCountry() {
        Apis.Get('country?isPagination=false',).then((data) => {
            for (let k in data.results) {
                this.state.Countries.push({ label: data.results[k].title, value: data.results[k]._id, data: data.results })
            }
            this.setState({ isLoading: false, Countries: this.state.Countries })
        }).catch((error) => {
            console.log(error);
            this.setState({ isLoading: false })
        })
    }


    getCost() {
        if (this.state.duration) {
            for (let k in this.state.AllDurations) {
                if (this.state.AllDurations[k]._id === this.state.duration) {
                    return (this.props.navigation.state.params.item.costPerMinute * this.state.AllDurations[k].costCounter)
                }
            }
        }

        if (this.props.navigation.state.params.type === 4) {
            return (this.props.navigation.state.params.item.costPerGiftVideo)
        }
        return 0;
    }




    checkCanCreate() {
        if (this.props.navigation.state.params.type === 0) {
            if (this.state.profession === '') {
                return true;
            } else {
                return false;
            }
        }
    }


    createRequest() {
        this.setState({ isLoading: true });
        var params = {};
        params.type = this.props.navigation.state.params.type + '';
        params.profession = this.state.profession;
        params.company_name = this.state.name;
        params.dateTime = this.state.Bookingdate;
        params.instagram = this.state.instagram;
        params.facebook = this.state.facebook;
        params.mobile = this.state.phone;
        params.country = this.state.country;
        params.city = this.state.city;
        params.subject = this.state.subject;
        params.type_hour = this.state.type_hour;
        params.duration = this.state.duration;
        params.cost = this.getCost();



        params.company_name = this.state.company_name
        params.company_domain = this.state.company_domain
        params.post_story = this.state.ads_via + '';
        params.ad_type = this.state.ads_type + '';

        params.facebook_count = this.state.FacebookCheck ? 1 : 0;
        params.instagram_count = this.state.InstagramCheck ? 1 : 0;
        params.youtube_count = this.state.YoutubeCheck ? 1 : 0;
        params.snapchat_count = this.state.SnapchatCheck ? 1 : 0;

        params.requestTo = this.props.navigation.state.params.item._id;
        params.requestby = this.props.data.userInfo._id ? this.props.data.userInfo._id : this.props.data.userInfo.id









        console.log(params);

        Apis.Post('/request', params).then((data) => {
            this.setState({ isLoading: false })
            showSuccessPopup('Your request is received successfully we will notify you when when your special person will accpect or reject.', 'Success!')
            setTimeout(() => {
                this.props.actions.Request.refreashNotifications();
            }, 200);
            this.props.navigation.pop(2)
        }).catch((error) => {
            showDanger(error.message)
            console.log(error);
            this.setState({ isLoading: false })
        })
    }




    componentDidMount() {
        this.getDurations();
        this.getCountry();
    }


    render() {
        var images = [];
        for (let k in this.props.navigation.state.params.item.images) {
            images.push(BASE_API_URL_IMAEG_ORIGINAL + this.props.navigation.state.params.item.images[k].url)
        }

        var item = this.props.navigation.state.params.item;
        var type = this.props.navigation.state.params.type;
        return (
            <Block>
                <StatusBar backgroundColor="transparent" barStyle="light-content" />
                <Header search={false} back={false} back={true} navigation={this.props.navigation} backclick={() => { this.props.navigation.pop() }} Text={this.props.navigation.state.params.type === 0 ? 'Online Talk' : this.props.navigation.state.params.type === 3 ? 'Hour With Your Star' : this.props.navigation.state.params.type === 4 ? 'Gift Video' : this.props.navigation.state.params.type === 1 ? 'Ads Request' : 'Invitation Request'} />

                <Loader isLoading={this.state.isLoading} />


                {this.state.selectCountry &&
                    <CountryPicker
                        modalProps={{ visible: this.state.selectCountry }}
                        countryList={'AE', 'PK'}
                        onClose={() => { this.setState({ selectCountry: false }) }}
                        onSelect={(value) => {
                            console.log(value)
                            this.setState({ cca2: value.cca2, callingCode: value.callingCode, selectCountry: false, flag: emojiFlags.countryCode(value.cca2) });
                        }}
                        cca2={this.state.cca2}
                        translation='eng'
                    />
                }




                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: moderateScale(50) }}>
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
                        }]}>{'Requirement Info'}</Text>



                        <View style={{ padding: moderateScale(5), borderWidth: moderateScale(0.5), borderRadius: moderateScale(20) }}>




                            {type === 3 &&
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: moderateScale(10), paddingVertical: moderateScale(10) }}>

                                    <RadioButtonRN
                                        data={[
                                            {
                                                label: 'Personal',
                                                check: '1'
                                            },
                                            {
                                                label: 'Group',
                                                check: '2'
                                            }
                                        ]}

                                        circleSize={16}
                                        textStyle={{ color: theme.colors.secondary, paddingLeft: moderateScale(5), }}
                                        box={false}
                                        boxStyle={{ flex: 1 }}
                                        activeColor={theme.colors.secondary}
                                        style={{ flexDirection: 'row' }}
                                        initial={1}
                                        selectedBtn={(e) => { this.setState({ type_hour: e.check }) }}
                                    />
                                </View>
                            }


                            {(type === 0 || type === 3 || type === 4) &&
                                < Text style={{ color: theme.colors.gray04, marginTop: moderateScale(10), fontSize: moderateScale(15), paddingHorizontal: moderateScale(15), width: '100%', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold' }}>{translate('Full Name')}</Text>
                            }
                            {(type === 0 || type === 3 || type === 4) &&
                                <TextInput
                                    style={{
                                        borderColor: theme.colors.gray05, backgroundColor: theme.colors.gray06, borderRadius: moderateScale(20),
                                        borderWidth: 0, height: moderateScale(40), marginHorizontal: moderateScale(10), ...I18nManager.isRTL ? { paddingEnd: 10, textAlign: 'right' } : {}, paddingHorizontal: moderateScale(10), marginTop: moderateScale(5)
                                    }}
                                    returnKeyType="next"
                                    value={this.state.name}
                                    placeholderTextColor={theme.colors.gray02}
                                    placeholder={translate('Full Name')}
                                    onChangeText={(value) => this.setState({ name: value })}
                                    autoCapitalize="none"
                                ></TextInput>
                            }





                            {(type === 1) &&
                                < Text style={{ color: theme.colors.gray04, marginTop: moderateScale(10), fontSize: moderateScale(15), paddingHorizontal: moderateScale(15), width: '100%', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold' }}>{translate('Company Name')}</Text>
                            }
                            {(type === 1) &&
                                <TextInput
                                    style={{
                                        borderColor: theme.colors.gray05, backgroundColor: theme.colors.gray06, borderRadius: moderateScale(20),
                                        borderWidth: 0, height: moderateScale(40), marginHorizontal: moderateScale(10), ...I18nManager.isRTL ? { paddingEnd: 10, textAlign: 'right' } : {}, paddingHorizontal: moderateScale(10), marginTop: moderateScale(5)
                                    }}
                                    returnKeyType="next"
                                    value={this.state.company_name}
                                    placeholderTextColor={theme.colors.gray02}
                                    placeholder={translate('Company Name')}
                                    onChangeText={(value) => this.setState({ company_name: value })}
                                    autoCapitalize="none"
                                ></TextInput>
                            }





                            {(type === 1) &&
                                < Text style={{ color: theme.colors.gray04, marginTop: moderateScale(10), fontSize: moderateScale(15), paddingHorizontal: moderateScale(15), width: '100%', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold' }}>{translate('Company Domain')}</Text>
                            }
                            {(type === 1) &&
                                <TextInput
                                    style={{
                                        borderColor: theme.colors.gray05, backgroundColor: theme.colors.gray06, borderRadius: moderateScale(20),
                                        borderWidth: 0, height: moderateScale(40), marginHorizontal: moderateScale(10), ...I18nManager.isRTL ? { paddingEnd: 10, textAlign: 'right' } : {}, paddingHorizontal: moderateScale(10), marginTop: moderateScale(5)
                                    }}
                                    returnKeyType="next"
                                    value={this.state.company_domain}
                                    placeholderTextColor={theme.colors.gray02}
                                    placeholder={translate('Company Name')}
                                    onChangeText={(value) => this.setState({ company_domain: value })}
                                    autoCapitalize="none"
                                ></TextInput>
                            }




                            {(type === 1) &&
                                < Text style={{ color: theme.colors.gray04, fontSize: moderateScale(15), paddingHorizontal: moderateScale(15), width: '100%', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold' }}>{translate('Ads Type')}</Text>
                            }

                            {type === 1 &&
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: moderateScale(10) }}>

                                    <RadioButtonRN
                                        data={[
                                            {
                                                label: 'Social Media',
                                                check: 1
                                            },
                                            {
                                                label: 'Custom',
                                                check: 2
                                            }
                                        ]}

                                        circleSize={16}
                                        textStyle={{ color: theme.colors.secondary, paddingLeft: moderateScale(5), }}
                                        box={false}
                                        boxStyle={{ flex: 1 }}
                                        activeColor={theme.colors.secondary}
                                        style={{ flexDirection: 'row' }}
                                        initial={1}
                                        selectedBtn={(e) => { this.setState({ ads_type: e.check }) }}
                                    />
                                </View>
                            }


                            {(type === 1) &&
                                < Text style={{ color: theme.colors.gray04, fontSize: moderateScale(15), paddingHorizontal: moderateScale(15), width: '100%', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold', marginTop: moderateScale(10) }}>{translate('Ads Via')}</Text>
                            }


                            {type === 1 &&
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: moderateScale(10) }}>

                                    <RadioButtonRN
                                        data={[
                                            {
                                                label: 'Post',
                                                check: 1
                                            },
                                            {
                                                label: 'Story',
                                                check: 2
                                            },
                                            {
                                                label: 'All',
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
                                        selectedBtn={(e) => { this.setState({ ads_via: e.check }) }}
                                    />
                                </View>
                            }




                            {this.state.ads_via === 2 &&
                                <Text style={{ color: theme.colors.gray04, marginTop: moderateScale(0), fontSize: moderateScale(15), paddingHorizontal: moderateScale(15), width: '100%', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold', marginTop: moderateScale(10) }}>{translate('Range')}</Text>
                            }
                            {this.state.ads_via === 2 &&
                                < RNPickerSelect
                                    textInputProps={{
                                        borderColor: theme.colors.gray05, backgroundColor: theme.colors.gray06, borderRadius: moderateScale(20),
                                        borderWidth: 0, height: moderateScale(40), marginHorizontal: moderateScale(10), ...I18nManager.isRTL ? { paddingEnd: 10, textAlign: 'right' } : {}, paddingHorizontal: moderateScale(10), marginTop: moderateScale(10)
                                    }}
                                    Icon={() => {
                                        return (
                                            <View style={{ height: moderateScale(40), justifyContent: 'center', alignItems: 'center', alignContent: 'center', top: moderateScale(10), right: moderateScale(10) }}>
                                                <Icon
                                                    name="caret-down"
                                                    size={22}
                                                    style={{ marginEnd: 10 }}
                                                    color={theme.colors.gray03}
                                                />
                                            </View>
                                        )
                                    }}
                                    style={{ marginBottom: moderateScale(10), paddingHorizontal: moderateScale(10) }}
                                    placeholder={
                                        {
                                            label: 'Select Duration',
                                            value: '',
                                            color: theme.colors.gray02
                                        }
                                    }
                                    placeholderTextColor={theme.colors.gray02}
                                    onValueChange={(value) => { this.setState({ duration: value }) }}
                                    items={this.state.Ranges}
                                />
                            }


                            {(type === 1 && this.state.ads_type === 1) &&
                                < Text style={{ color: theme.colors.gray04, fontSize: moderateScale(15), paddingHorizontal: moderateScale(15), width: '100%', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold', marginTop: moderateScale(10) }}>{translate('Ads Platform')}</Text>
                            }


                            {/* {(type === 1 && this.state.ads_type === 1) &&

                                <View>
                                    <View style={{ width: '100%', marginVertical: moderateScale(10) }}>
                                        <View style={{ flexDirection: 'row', width: '100%', flex: 1 }}>
                                            <CheckBox
                                                style={{ paddingHorizontal: 10, color: theme.colors.primary, flex: 1 }}
                                                onClick={() => {
                                                    this.setState({
                                                        FacebookCheck: !this.state.FacebookCheck
                                                    })
                                                }}
                                                isChecked={this.state.FacebookCheck}
                                                checkBoxColor={theme.colors.secondary}
                                                rightTextStyle={{ color: theme.colors.secondary, fontWeight: 'bold', right: 5 }}
                                                rightText={<Text style={{ color: theme.colors.secondary, fontWeight: 'bold', right: 5, fontSize: moderateScale(15) }}>
                                                    <Icon
                                                        name="facebook-square"
                                                        size={15}
                                                        style={{ marginEnd: 10 }}
                                                        color={theme.colors.secondary}
                                                    /> Facebook
                                                    </Text>
                                                }
                                            />
                                            <CheckBox
                                                style={{ paddingHorizontal: 10, color: theme.colors.primary, flex: 1 }}
                                                onClick={() => {
                                                    this.setState({
                                                        YoutubeCheck: !this.state.YoutubeCheck
                                                    })
                                                }}
                                                isChecked={this.state.YoutubeCheck}
                                                checkBoxColor={theme.colors.secondary}
                                                rightTextStyle={{ color: theme.colors.secondary, fontWeight: 'bold', right: 5 }}
                                                rightText={<Text style={{ color: theme.colors.secondary, fontWeight: 'bold', right: 5, fontSize: moderateScale(15) }}>
                                                    <Icon
                                                        name="youtube"
                                                        size={15}
                                                        style={{ marginEnd: 10 }}
                                                        color={theme.colors.secondary}
                                                    /> Youtube
                                                    </Text>
                                                }
                                            />
                                        </View>

                                        <View style={{ flexDirection: 'row', width: '100%', flex: 1, marginTop: moderateScale(10) }}>
                                            <CheckBox
                                                style={{ paddingHorizontal: 10, color: theme.colors.primary, flex: 1 }}
                                                onClick={() => {
                                                    this.setState({
                                                        InstagramCheck: !this.state.InstagramCheck
                                                    })
                                                }}
                                                isChecked={this.state.InstagramCheck}
                                                checkBoxColor={theme.colors.secondary}
                                                rightTextStyle={{ color: theme.colors.secondary, fontWeight: 'bold', right: 5 }}
                                                rightText={<Text style={{ color: theme.colors.secondary, fontWeight: 'bold', right: 5, fontSize: moderateScale(15) }}>
                                                    <Icon
                                                        name="instagram"
                                                        size={15}
                                                        style={{ marginEnd: 10 }}
                                                        color={theme.colors.secondary}
                                                    /> Instagram
                                                </Text>
                                                }
                                            />
                                            <CheckBox
                                                style={{ paddingHorizontal: 10, color: theme.colors.primary, flex: 1 }}
                                                onClick={() => {
                                                    this.setState({
                                                        SnapchatCheck: !this.state.SnapchatCheck
                                                    })
                                                }}
                                                isChecked={this.state.SnapchatCheck}
                                                checkBoxColor={theme.colors.secondary}
                                                rightTextStyle={{ color: theme.colors.secondary, fontWeight: 'bold', right: 5 }}
                                                rightText={<Text style={{ color: theme.colors.secondary, fontWeight: 'bold', right: 5, fontSize: moderateScale(15) }}>
                                                    <Icon
                                                        name="snapchat-square"
                                                        size={15}
                                                        style={{ marginEnd: 10 }}
                                                        color={theme.colors.secondary}
                                                    /> Snapchat
                                            </Text>
                                                }
                                            />
                                        </View>
                                    </View>
                                </View>
                            } */}








                            <Text style={{ color: theme.colors.gray04, fontSize: moderateScale(15), paddingHorizontal: moderateScale(15), width: '100%', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold', ...(type === 0 || type === 3 || type === 4) ? {} : { marginTop: moderateScale(10), } }}>{translate('Booking Date/Time')}</Text>




                            <View style={{
                                borderColor: theme.colors.gray05, backgroundColor: theme.colors.gray06, borderRadius: moderateScale(20),
                                borderWidth: 0, marginHorizontal: moderateScale(10), ...I18nManager.isRTL ? { paddingEnd: 10, textAlign: 'right' } : {}, paddingHorizontal: moderateScale(0), marginTop: moderateScale(5), justifyContent: 'center', alignContent: 'center', alignItems: 'center'
                            }}>

                                <ModalDatePicker
                                    style={{
                                        borderColor: theme.colors.gray05, backgroundColor: theme.colors.gray06, borderRadius: moderateScale(20),
                                        borderWidth: 0, height: moderateScale(40), marginHorizontal: moderateScale(10), ...I18nManager.isRTL ?
                                            { paddingEnd: 10, textAlign: 'right' } : {}, paddingHorizontal: moderateScale(10),
                                        width: '100%', height: moderateScale(40), textAlignVertical: 'center', justifyContent: 'center'
                                    }}

                                    onDateChanged={(date) => {
                                        console.log("A date has been picked: ", date);
                                        this.setState({ dateOfBirth: date.date })


                                    }}
                                    startDate={new Date()}
                                    renderDate={({ year, month, day, date }) => {
                                        return <Text style={[styles.text, !moment(this.state.dateOfBirth).isValid() ? styles.placeholderText : {}]}>{moment(this.state.dateOfBirth).isValid() ? moment(this.state.dateOfBirth).format('ll') : 'Select Date of Birth'}</Text>
                                    }}
                                />


                            </View>



                            <Text style={{ color: theme.colors.gray04, marginTop: moderateScale(10), fontSize: moderateScale(15), paddingHorizontal: moderateScale(15), width: '100%', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold' }}>{translate('Profession')}</Text>

                            <TextInput
                                style={{
                                    borderColor: theme.colors.gray05, backgroundColor: theme.colors.gray06, borderRadius: moderateScale(20),
                                    borderWidth: 0, height: moderateScale(40), marginHorizontal: moderateScale(10), ...I18nManager.isRTL ? { paddingEnd: 10, textAlign: 'right' } : {}, paddingHorizontal: moderateScale(10), marginTop: moderateScale(10)
                                }}
                                returnKeyType="next"
                                value={this.state.profession}
                                placeholderTextColor={theme.colors.gray02}
                                placeholder={translate('Profession')}
                                onChangeText={(value) => this.setState({ profession: value })}
                                autoCapitalize="none"
                            ></TextInput>



                            <Text style={{ color: theme.colors.gray04, marginTop: moderateScale(0), fontSize: moderateScale(15), paddingHorizontal: moderateScale(15), width: '100%', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold' }}>{translate('Phone')}</Text>

                            <Input
                                labelStyle={{ color: theme.colors.secondary }}
                                containerStyle={{ paddingLeft: 0, paddingRight: 0 }}
                                inputContainerStyle={{
                                    borderColor: theme.colors.gray05, backgroundColor: theme.colors.gray06, borderRadius: moderateScale(20),
                                    borderWidth: 0, height: moderateScale(40), marginHorizontal: moderateScale(10), ...I18nManager.isRTL ? { paddingEnd: 10, textAlign: 'right' } : {}, paddingHorizontal: moderateScale(0), marginTop: moderateScale(5)
                                }}
                                inputStyle={{ textAlignVertical: 'center', height: '100%', ...I18nManager.isRTL ? { textAlign: 'right' } : {}, }}
                                onSubmitEditing={() => { this.inputRefs.email.focus() }}
                                returnKeyType="next"
                                placeholderTextColor={theme.colors.gray02}
                                leftIcon={
                                    <TouchableOpacity style={{ flexDirection: 'row', flexDireaction: 'column', justifyContent: 'center', alignItems: 'center', alignContent: 'center', height: '100%' }} onPress={() => { this.setState({ selectCountry: true }) }}>
                                        <Text style={[{
                                            textAlign: 'center',
                                            color: theme.colors.secondary, fontSize: moderateScale(25),
                                            marginStart: moderateScale(0),
                                        }]}>{this.state.flag.emoji}</Text>
                                        <View style={{ height: '80%', backgroundColor: theme.colors.gray05, width: moderateScale(1), marginHorizontal: moderateScale(10), }} />
                                    </TouchableOpacity>
                                }
                                placeholder={'+' + this.state.callingCode + 'XXXXXXXXXXX'}
                                defaultValue={this.state.phone}
                                onChangeText={(value) => this.setState({ phone: value })}
                                autoCapitalize="none"
                                autoCompleteType="tel"
                                textContentType={'telephoneNumber'}
                                placeholderTextColor={theme.colors.gray02}
                                keyboardType="phone-pad"
                            />



                            <Text style={{ color: theme.colors.gray04, marginTop: moderateScale(10), fontSize: moderateScale(15), paddingHorizontal: moderateScale(15), width: '100%', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold' }}>{translate('Facebook Link')}</Text>

                            <Input
                                labelStyle={{ color: theme.colors.secondary }}
                                containerStyle={{ paddingLeft: 0, paddingRight: 0 }}
                                inputContainerStyle={{
                                    borderColor: theme.colors.gray05, backgroundColor: theme.colors.gray06, borderRadius: moderateScale(20),
                                    borderWidth: 0, height: moderateScale(40), marginHorizontal: moderateScale(10), ...I18nManager.isRTL ? { paddingEnd: 10, textAlign: 'right' } : {}, paddingHorizontal: moderateScale(0), marginTop: moderateScale(5)
                                }}
                                inputStyle={{ textAlignVertical: 'center', height: '100%', ...I18nManager.isRTL ? { textAlign: 'right' } : {}, fontSize: moderateScale(12) }}
                                returnKeyType="next"
                                onSubmitEditing={() => { this.onPress() }}
                                leftIcon={
                                    <Icon
                                        name="facebook"
                                        size={22}
                                        style={{ marginEnd: 10 }}
                                        color={theme.colors.gray03}
                                    />}
                                placeholder={translate('Facebook link')}
                                placeholderTextColor={theme.colors.gray02}
                                value={this.state.facebook}
                                onChangeText={(value) => this.setState({ facebook: value })}
                            />


                            <Text style={{ color: theme.colors.gray04, marginTop: moderateScale(10), fontSize: moderateScale(15), paddingHorizontal: moderateScale(15), width: '100%', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold' }}>{translate('Instagram Link')}</Text>

                            <Input
                                labelStyle={{ color: theme.colors.secondary }}
                                containerStyle={{ paddingLeft: 0, paddingRight: 0 }}
                                inputContainerStyle={{
                                    borderColor: theme.colors.gray05, backgroundColor: theme.colors.gray06, borderRadius: moderateScale(20),
                                    borderWidth: 0, height: moderateScale(40), marginHorizontal: moderateScale(10), ...I18nManager.isRTL ? { paddingEnd: 10, textAlign: 'right' } : {}, paddingHorizontal: moderateScale(0), marginTop: moderateScale(10)
                                }}
                                inputStyle={{ textAlignVertical: 'center', height: '100%', ...I18nManager.isRTL ? { textAlign: 'right' } : {}, fontSize: moderateScale(12) }}
                                returnKeyType="next"
                                onSubmitEditing={() => { this.onPress() }}
                                leftIcon={
                                    <Icon
                                        name="instagram"
                                        size={22}
                                        style={{ marginEnd: 10 }}
                                        color={theme.colors.gray03}
                                    />}
                                placeholder={translate('Instagram link')}
                                placeholderTextColor={theme.colors.gray02}
                                value={this.state.instagram}
                                onChangeText={(value) => this.setState({ instagram: value })}
                            />


                            <Text style={{ color: theme.colors.gray04, marginTop: moderateScale(10), fontSize: moderateScale(15), paddingHorizontal: moderateScale(15), width: '100%', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold' }}>{translate('Select Country')}</Text>

                            <RNPickerSelect
                                textInputProps={{
                                    borderColor: theme.colors.gray05, backgroundColor: theme.colors.gray06, borderRadius: moderateScale(20),
                                    borderWidth: 0, height: moderateScale(40), marginHorizontal: moderateScale(10), ...I18nManager.isRTL ? { paddingEnd: 10, textAlign: 'right' } : {}, paddingHorizontal: moderateScale(10), marginTop: moderateScale(10)
                                }}
                                Icon={() => {
                                    return (
                                        <View style={{ height: moderateScale(40), justifyContent: 'center', alignItems: 'center', alignContent: 'center', top: moderateScale(10), right: moderateScale(10) }}>
                                            <Icon
                                                name="caret-down"
                                                size={22}
                                                style={{ marginEnd: 10 }}
                                                color={theme.colors.gray03}
                                            />
                                        </View>
                                    )
                                }}
                                style={{ marginBottom: moderateScale(10), paddingHorizontal: moderateScale(10) }}
                                placeholder={
                                    {
                                        label: 'Select Country',
                                        value: '',
                                        color: theme.colors.gray02
                                    }
                                }
                                placeholderTextColor={theme.colors.gray02}
                                onValueChange={(value) => { this.setState({ country: value }) }}
                                items={this.state.Countries}
                            />


                            <Text style={{ color: theme.colors.gray04, marginTop: moderateScale(10), fontSize: moderateScale(15), paddingHorizontal: moderateScale(15), width: '100%', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold' }}>{translate('City')}</Text>

                            <TextInput
                                style={{
                                    borderColor: theme.colors.gray05, backgroundColor: theme.colors.gray06, borderRadius: moderateScale(20),
                                    borderWidth: 0, height: moderateScale(40), marginHorizontal: moderateScale(10), ...I18nManager.isRTL ? { paddingEnd: 10, textAlign: 'right' } : {}, paddingHorizontal: moderateScale(10), marginTop: moderateScale(10)
                                }}
                                returnKeyType="next"
                                value={this.state.city}
                                placeholderTextColor={theme.colors.gray02}
                                placeholder={translate('City')}
                                onChangeText={(value) => this.setState({ city: value })}
                                autoCapitalize="none"
                            ></TextInput>



                            <Text style={{ color: theme.colors.gray04, marginTop: moderateScale(0), fontSize: moderateScale(15), paddingHorizontal: moderateScale(15), width: '100%', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold' }}>{translate('Details')}</Text>



                            <Input
                                labelStyle={{ color: theme.colors.secondary }}
                                containerStyle={{ paddingLeft: 0, paddingRight: 0 }}
                                inputContainerStyle={{
                                    borderColor: theme.colors.gray05, backgroundColor: theme.colors.gray06, borderRadius: moderateScale(20),
                                    borderWidth: 0, height: moderateScale(100), marginHorizontal: moderateScale(10), ...I18nManager.isRTL ? { paddingEnd: 10, textAlign: 'right' } : {}, paddingHorizontal: moderateScale(10), marginTop: moderateScale(5), padding: moderateScale(10), marginBottom: moderateScale(10)
                                }}
                                inputStyle={{ textAlignVertical: 'center', height: '100%', ...I18nManager.isRTL ? { textAlign: 'right' } : {}, fontSize: moderateScale(12) }}
                                returnKeyType="next"
                                multiline={true}
                                onSubmitEditing={() => { this.onPress() }}
                                placeholder={translate('Please Describe topic you want to talk with your star.')} placeholderTextColor={theme.colors.gray02}
                                value={this.state.subject}
                                onChangeText={(value) => this.setState({ subject: value })}
                            />




                            {type === 0 &&
                                <Text style={{ color: theme.colors.gray04, marginTop: moderateScale(0), fontSize: moderateScale(15), paddingHorizontal: moderateScale(15), width: '100%', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold' }}>{translate('Duration')}</Text>
                            }
                            {type === 0 &&
                                < RNPickerSelect
                                    textInputProps={{
                                        borderColor: theme.colors.gray05, backgroundColor: theme.colors.gray06, borderRadius: moderateScale(20),
                                        borderWidth: 0, height: moderateScale(40), marginHorizontal: moderateScale(10), ...I18nManager.isRTL ? { paddingEnd: 10, textAlign: 'right' } : {}, paddingHorizontal: moderateScale(10), marginTop: moderateScale(10)
                                    }}
                                    Icon={() => {
                                        return (
                                            <View style={{ height: moderateScale(40), justifyContent: 'center', alignItems: 'center', alignContent: 'center', top: moderateScale(10), right: moderateScale(10) }}>
                                                <Icon
                                                    name="caret-down"
                                                    size={22}
                                                    style={{ marginEnd: 10 }}
                                                    color={theme.colors.gray03}
                                                />
                                            </View>
                                        )
                                    }}
                                    style={{ marginBottom: moderateScale(10), paddingHorizontal: moderateScale(10) }}
                                    placeholder={
                                        {
                                            label: 'Select Duration',
                                            value: '',
                                            color: theme.colors.gray02
                                        }
                                    }
                                    placeholderTextColor={theme.colors.gray02}
                                    onValueChange={(value) => { this.setState({ duration: value }) }}
                                    items={this.state.Durations}
                                />
                            }



                            {type === 2 &&
                                <View style={{ backgroundColor: theme.colors.gray06, borderRadius: moderateScale(10), marginHorizontal: moderateScale(20), marginTop: moderateScale(10), paddingVertical: moderateScale(10) }}>
                                    <Text style={{ color: theme.colors.black, fontSize: moderateScale(15), paddingHorizontal: moderateScale(10), fontWeight: 'bold', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, }}>{translate('*Cost : ')}
                                        {item.costPerGiftVideo}{'$'}</Text>
                                </View>
                            }




                            {type === 0 && this.getCost() !== 0 &&
                                <Text style={{ color: theme.colors.gray04, marginTop: moderateScale(10), fontSize: moderateScale(15), paddingHorizontal: moderateScale(15), width: '100%', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold' }}>{translate('Cost')}</Text>
                            }

                            {type === 0 && this.getCost() !== 0 &&
                                <TextInput
                                    style={{
                                        borderColor: theme.colors.gray05, backgroundColor: theme.colors.gray06, borderRadius: moderateScale(20),
                                        borderWidth: 0, height: moderateScale(40), marginHorizontal: moderateScale(10), ...I18nManager.isRTL ? { paddingEnd: 10, textAlign: 'right' } : {}, paddingHorizontal: moderateScale(10), marginTop: moderateScale(10)
                                    }}
                                    disabled
                                    returnKeyType="next"
                                    value={this.getCost() + '$'}
                                    placeholderTextColor={theme.colors.gray02}
                                    placeholder={translate('Profession')}
                                    autoCapitalize="none"
                                ></TextInput>
                            }



                            {type === 4 && this.getCost() !== 0 &&
                                <Text style={{ color: theme.colors.gray04, marginTop: moderateScale(10), fontSize: moderateScale(15), paddingHorizontal: moderateScale(15), width: '100%', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold' }}>{translate('Cost')}</Text>
                            }

                            {type === 4 && this.getCost() !== 0 &&
                                <TextInput
                                    style={{
                                        borderColor: theme.colors.gray05, backgroundColor: theme.colors.gray06, borderRadius: moderateScale(20),
                                        borderWidth: 0, height: moderateScale(40), marginHorizontal: moderateScale(10), ...I18nManager.isRTL ? { paddingEnd: 10, textAlign: 'right' } : {}, paddingHorizontal: moderateScale(10), marginTop: moderateScale(10)
                                    }}
                                    disabled
                                    returnKeyType="next"
                                    value={this.getCost() + '$'}
                                    placeholderTextColor={theme.colors.gray02}
                                    placeholder={translate('Profession')}
                                    autoCapitalize="none"
                                ></TextInput>
                            }






                            {type === 1 &&
                                <Text style={{ color: theme.colors.gray04, marginTop: moderateScale(10), fontSize: moderateScale(15), paddingHorizontal: moderateScale(15), width: '100%', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold' }}>{translate('Expected Budget ($)')}</Text>
                            }

                            {type === 1 &&
                                <TextInput
                                    style={{
                                        borderColor: theme.colors.gray05, backgroundColor: theme.colors.gray06, borderRadius: moderateScale(20),
                                        borderWidth: 0, height: moderateScale(40), marginHorizontal: moderateScale(10), ...I18nManager.isRTL ? { paddingEnd: 10, textAlign: 'right' } : {}, paddingHorizontal: moderateScale(10), marginTop: moderateScale(10)
                                    }}
                                    returnKeyType="next"
                                    value={this.state.cost}
                                    placeholderTextColor={theme.colors.gray02}
                                    placeholder={translate('$')}
                                    onChangeText={(value) => this.setState({ cost: value })}
                                    autoCapitalize="none"
                                ></TextInput>

                            }






                            {(type === 0 || type === 2) &&
                                <Text style={{ color: theme.colors.gray04, marginTop: moderateScale(10), fontSize: moderateScale(15), paddingHorizontal: moderateScale(15), width: '100%', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold' }}>{translate('Payment Type')}</Text>
                            }

                            {(type === 0 || type === 2) &&
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: moderateScale(10), marginHorizontal: moderateScale(10) }}>

                                    <RadioButtonRN
                                        data={[
                                            {
                                                label: 'Payment Online',
                                                check: 1
                                            },
                                            {
                                                label: 'Paypal',
                                                check: 2
                                            },
                                            {
                                                label: 'Other',
                                                check: 3
                                            }
                                        ]}

                                        circleSize={moderateScale(15)}
                                        textStyle={{ color: theme.colors.secondary, paddingLeft: moderateScale(0), fontWeight: 'bold' }}
                                        box={false}
                                        boxStyle={{ width: '100%' }}
                                        activeColor={theme.colors.secondary}
                                        style={{ flexDirection: 'column', width: '100%' }}
                                        initial={1}
                                        selectedBtn={(e) => { this.setState({ withDrawType: e.check }) }}
                                    />
                                </View>

                            }




                        </View>
                    </View>

                    <View style={{ alignSelf: 'center', bottom: moderateScale(-10), zIndex: 1, width: '80%', }}>
                        <TouchableOpacity onPress={() => { this.createRequest() }} style={{
                            marginHorizontal: moderateScale(0), backgroundColor: theme.colors.secondary, zIndex: 10,
                            height: moderateScale(40), alignItems: 'center', borderRadius: moderateScale(20),
                            justifyContent: 'center', borderColor: theme.colors.secondary, borderWidth: moderateScale(0.5),
                            shadowColor: theme.colors.primary, shadowOffset: {
                                width: 0,
                                height: 2,
                            }, shadowOpacity: 0.25, shadowRadius: 3.84
                        }}>
                            <View>
                                <Text style={[styles.heading, {
                                    ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold', textAlign: 'center',
                                    color: theme.colors.white, fontSize: moderateScale(15),
                                }]}>{'Make a Request'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>





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
        Request: bindActionCreators(loginActions, dispatch)
    }
})


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        backgroundColor: '#fff',
    },
    text: {
        width: '100%',
        color: theme.colors.black
    }

});
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(MakeBooking))