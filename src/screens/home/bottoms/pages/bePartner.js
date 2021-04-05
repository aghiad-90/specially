import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../../../actions/Actions';
//view
import {
    View,
    ScrollView,
    Image,
    StyleSheet,
    TouchableOpacity, Linking, Platform, I18nManager
} from 'react-native';
import { theme } from '../../../../core/theme';
import { StatusBar } from 'react-native';
import TextInput from '../../../../components/Weights/TextInput';
import Button from 'apsl-react-native-button'
import { Block, Text } from '../../../../components/widget';
import { showDanger, showSuccess, showSuccessPopup, translate } from '../../../../utils/utils';
import Header from '../childs/Header';
import { moderateScale } from 'react-native-size-matters';
import RNPickerSelect from 'react-native-picker-select';
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from 'react-native-elements';
import * as Apis from '../../../../services/Apis';





class ContactUs extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            name: '', email: '', message: '',

            phone: '',
            category: '',
            facebooklink: '',
            facebook_followers: '',
            instagramlink: '',
            instagram_followers: '',
            categories: [],
        }
    }

    componentWillReceiveProps(nextProps) {
    }

    componentDidMount() {


        showSuccessPopup('We appreciate your interest in being part of a Sbisiali\'s family. We would like to tell you that you should have more than 100k followers on your social media pages.', 'Information');
        if (this.props.data?.userInfo?.first_name) {
            this.state = {
                name: this.props.data?.userInfo?.first_name + " " + this.props.data?.userInfo?.last_name, email: this.props.data?.userInfo?.email, message: ''
            }
        }

        this.getCategories()
    }




    getCategories() {
        Apis.Get('category?isPagination=false',).then((data) => {
            this.state.categories = [];
            for (let k in data.results) {
                this.state.categories.push({ label: data.results[k].title, value: data.results[k]._id, data: data.results })
            }
            console.log('categoriescategories', this.state.categories)
            this.setState({ isLoading: false, categories: this.state.categories })
        }).catch((error) => {
            showDanger(error.message)
            console.log(error);
            this.setState({ isLoading: false })
        })
    }


    contactus() {


        if (this.state.name === '') {
            showDanger(translate('Please Enter Your Name'));
            return;
        }

        if (this.state.phone === '') {
            showDanger(translate('Please Enter Your Phone'));
            return;
        }

        if (this.state.email === '') {
            showDanger(translate('Please Enter Your Email'));
            return;
        }





        if (this.state.category === '') {
            showDanger(translate('Please Select Your Category'));
            return;
        }
        if (this.state.facebooklink === '') {
            showDanger(translate('Please Enter Your Facebook link'));
            return;
        }
        if (this.state.facebook_followers === '') {
            showDanger(translate('Please Enter Your Facebook Followers'));
            return;
        }

        if (this.state.instagramlink === '') {
            showDanger(translate('Please Enter Your Instagram Link'));
            return;
        }
        if (this.state.instagram_followers === '') {
            showDanger(translate('Please Enter Your Instagram Followers'));
            return;
        }

        if (this.state.message === '') {
            showDanger(translate('Please Enter Your Message'));
            return;
        }






        this.setState({ submitReview: true })
        setTimeout(() => {
            this.props.actions.contactus.contactus({
                name: this.state.name, email: this.state.email, details: this.state.message,
                phone: this.state.phone,
                category: this.state.category,
                facebooklink: this.state.facebooklink,
                facebook_followers: this.state.facebook_followers,
                instagramlink: this.state.instagramlink,
                instagram_followers: this.state.instagram_followers,
                type: 2
            }, this.onSuccess, this.onError);
        }, 1000);
    }

    onSuccess = (response) => {
        this.setState({ submitReview: false })
        if (response.code !== 200) {
            showDanger(response.message);
            return;
        }

        showSuccess(translate('Thanks for contacting Us we will get back to your soon.'));
        this.setState({
            name: '', email: '', message: '', subject: '', phone: '',
            phone: '',
            category: '',
            facebooklink: '',
            facebook_followers: '',
            instagramlink: '',
            instagram_followers: '',
        })
    }

    onError = (error) => {
        this.setState({ submitReview: false })
        showDanger(translate('Try Again'));
        console.log('ContactUS', error)
    }

    render() {
        return (
            <View style={styles.container_scrolling}>
                <StatusBar backgroundColor="transparent" barStyle="light-content" />
                <Header color={theme.colors.primary} search={false} backPrimary={false} Text={translate('VIP Membership')} back={true} navigation={this.props.navigation} backclick={() => { this.props.navigation.pop() }} />


                <ScrollView showsVerticalScrollIndicator={false} style={styles.wrapper} contentContainerStyle={{ paddingBottom: moderateScale(100) }}>

                    <View style={{ marginTop: moderateScale(20), flexDirection: 'column' }}>


                        <View style={{ marginHorizontal: moderateScale(0), marginVertical: moderateScale(0), zIndex: 1, marginTop: moderateScale(10) }}>
                            <View showsVerticalScrollIndicator={false} style={{ marginHorizontal: moderateScale(20), paddingVertical: moderateScale(10) }}>

                                <Text style={{
                                    color: theme.colors.black, marginBottom: moderateScale(0),
                                    ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginHorizontal: moderateScale(10)
                                }}>{translate('Name')}</Text>
                                <TextInput
                                    style={[styles.input, { ...I18nManager.isRTL ? { textAlign: 'right' } : {}, paddingHorizontal: moderateScale(10) }]}
                                    value={this.state.name}
                                    onChangeText={text => this.setState({ name: text })}
                                    multiline={false}
                                    username
                                    placeholderTextColor={theme.colors.gray02}
                                    placeholder={translate('Please enter your name')}
                                    blurOnSubmit={true}
                                    underlineColorAndroid='transparent'
                                    autoCapitalize="sentences"
                                />
                                <Text style={{ color: theme.colors.black, marginBottom: moderateScale(5), ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginHorizontal: moderateScale(20) }}>{translate('Phone')}</Text>
                                <TextInput
                                    style={[styles.input, { ...I18nManager.isRTL ? { textAlign: 'right' } : {}, paddingHorizontal: moderateScale(10) }]}
                                    value={this.state.phone}
                                    onChangeText={text => this.setState({ phone: text })}
                                    multiline={false}
                                    placeholder={translate('Please enter your phone')}
                                    blurOnSubmit={true}
                                    placeholderTextColor={theme.colors.gray02}
                                    underlineColorAndroid='transparent'
                                    autoCapitalize="sentences"
                                />


                                <Text style={{ color: theme.colors.black, marginBottom: moderateScale(5), ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginHorizontal: moderateScale(20) }}>{translate('Email')}</Text>
                                <TextInput
                                    style={[styles.input, { ...I18nManager.isRTL ? { textAlign: 'right' } : {}, paddingHorizontal: moderateScale(10) }]}
                                    value={this.state.email}
                                    onChangeText={text => this.setState({ email: text })}
                                    multiline={false}
                                    placeholder={translate('Please enter your email')}
                                    email
                                    blurOnSubmit={true}
                                    placeholderTextColor={theme.colors.gray02}
                                    underlineColorAndroid='transparent'
                                    autoCapitalize="sentences"
                                />

                                <Text style={{ color: theme.colors.black, marginBottom: moderateScale(5), ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginHorizontal: moderateScale(20) }}>{translate('Category')}</Text>

                                <RNPickerSelect
                                    textInputProps={{
                                        paddingStart: 10, marginBottom: moderateScale(10),
                                        borderColor: theme.colors.gray05, backgroundColor: theme.colors.gray06, borderRadius: moderateScale(10),
                                        borderWidth: 0, height: moderateScale(40), marginHorizontal: moderateScale(10), ...I18nManager.isRTL ? { paddingEnd: 10, textAlign: 'right' } : {}, paddingHorizontal: moderateScale(0), marginTop: moderateScale(10)
                                    }}
                                    Icon={() => {
                                        return (
                                            <View style={{ height: moderateScale(40), justifyContent: 'center', alignItems: 'center', alignContent: 'center', marginTop: moderateScale(10) }}>
                                                <Icon
                                                    name="caret-down"
                                                    size={22}
                                                    style={{ marginEnd: 20 }}
                                                    color={theme.colors.gray03}
                                                />
                                            </View>
                                        )
                                    }}
                                    value={this.state.Gender}
                                    style={{ marginBottom: moderateScale(10) }}
                                    placeholder={
                                        {
                                            label: 'Select Category',
                                            value: '',
                                            color: theme.colors.gray02
                                        }
                                    }
                                    placeholderTextColor={theme.colors.gray02}
                                    onValueChange={(value) => this.setState({ category: value })}
                                    items={this.state.categories}
                                />




                                <Text style={{ color: theme.colors.black, marginBottom: moderateScale(5), ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginHorizontal: moderateScale(20) }}>{translate('Facebook Link')}</Text>

                                <Input
                                    labelStyle={{ color: theme.colors.secondary }}
                                    containerStyle={{ paddingLeft: 0, paddingRight: 0 }}
                                    inputContainerStyle={{
                                        borderColor: theme.colors.gray05, backgroundColor: theme.colors.gray06, borderRadius: moderateScale(10), marginBottom: moderateScale(10),
                                        borderWidth: 0, height: moderateScale(40), marginHorizontal: moderateScale(10), ...I18nManager.isRTL ? { paddingEnd: 10, textAlign: 'right' } : {}, paddingHorizontal: moderateScale(0), marginTop: moderateScale(10)
                                    }}
                                    inputStyle={{ textAlignVertical: 'center', height: '100%', ...I18nManager.isRTL ? { textAlign: 'right' } : {}, fontSize: moderateScale(12) }}
                                    returnKeyType="next"
                                    leftIcon={
                                        <Icon
                                            name="facebook"
                                            size={22}
                                            style={{ marginEnd: 10 }}
                                            color={theme.colors.gray03}
                                        />}
                                    placeholder={translate('Facebook link')}
                                    placeholderTextColor={theme.colors.gray02}
                                    value={this.state.facebooklink}
                                    onChangeText={(value) => this.setState({ facebooklink: value })}
                                />



                                <Text style={{ color: theme.colors.black, marginBottom: moderateScale(5), ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginHorizontal: moderateScale(20) }}>{translate('Facebook Followers number')}</Text>
                                <TextInput
                                    style={[styles.input, { ...I18nManager.isRTL ? { textAlign: 'right' } : {}, paddingHorizontal: moderateScale(10) }]}
                                    value={this.state.facebook_followers}
                                    onChangeText={text => this.setState({ facebook_followers: text })}
                                    multiline={false}
                                    placeholder={translate('Facebook Followers number')}
                                    blurOnSubmit={true}
                                    placeholderTextColor={theme.colors.gray02}

                                    underlineColorAndroid='transparent'
                                    autoCapitalize="sentences"
                                />

                                <Text style={{ color: theme.colors.black, marginBottom: moderateScale(5), ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginHorizontal: moderateScale(20) }}>{translate('Instragram link')}</Text>



                                <Input
                                    labelStyle={{ color: theme.colors.secondary }}
                                    containerStyle={{ paddingLeft: 0, paddingRight: 0 }}
                                    inputContainerStyle={{
                                        borderColor: theme.colors.gray05, backgroundColor: theme.colors.gray06, borderRadius: moderateScale(10), marginBottom: moderateScale(10),
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
                                    value={this.state.instagramlink}
                                    onChangeText={(value) => this.setState({ instagramlink: value })}
                                />


                                <Text style={{ color: theme.colors.black, marginBottom: moderateScale(5), ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginHorizontal: moderateScale(20) }}>{translate('Instagram Followers number')}</Text>
                                <TextInput
                                    style={[styles.input, { ...I18nManager.isRTL ? { textAlign: 'right' } : {}, paddingHorizontal: moderateScale(10) }]}
                                    value={this.state.instagram_followers}
                                    onChangeText={text => this.setState({ instagram_followers: text })}
                                    multiline={false}
                                    placeholder={translate('Instagram Followers number')}
                                    blurOnSubmit={true}
                                    placeholderTextColor={theme.colors.gray02}

                                    underlineColorAndroid='transparent'
                                    autoCapitalize="sentences"
                                />



                                <Text style={{ color: theme.colors.black, marginBottom: moderateScale(10), ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginHorizontal: moderateScale(20) }}>{translate('Details')}</Text>
                                <TextInput
                                    style={[styles.inputmessage, { borderRadius: moderateScale(10), paddingHorizontal: moderateScale(20), ...I18nManager.isRTL ? { textAlign: 'right' } : {} }]}
                                    value={this.state.message}
                                    onChangeText={text => this.setState({ message: text })}
                                    multiline={true}
                                    placeholderTextColor={theme.colors.gray02}
                                    placeholder={translate('type your message .... ')}
                                    blurOnSubmit={true}
                                    underlineColorAndroid='transparent'
                                    autoCapitalize="sentences"
                                />











                                <Button isLoading={this.state.submitReview} style={styles.checkout} textStyle={{ fontSize: 16, color: theme.colors.white, fontSize: moderateScale(20), fontWeight: 'bold' }}
                                    onPress={() => {
                                        this.contactus();
                                    }}>{translate(translate('Submit')).toUpperCase()}</Button>
                            </View>
                        </View>

                        <View style={{
                            marginTop: moderateScale(0),
                            zIndex: 0,
                            marginHorizontal: moderateScale(22), marginVertical: moderateScale(10), borderRadius: moderateScale(20),
                            height: moderateScale(150), paddingTop: moderateScale(0), alignItems: 'center',
                        }}>

                            <Image source={require('app/assets/assets/logwithname.png')} resizeMode="contain" style={{ height: moderateScale(100), width: moderateScale(100), }} />
                            <View style={{ width: '20%', backgroundColor: theme.colors.white, height: 1, marginVertical: moderateScale(0) }} />


                            <TouchableOpacity onPress={() => {

                                const latitude = "40.7127753";
                                const longitude = "-74.0059728";
                                const label = "Bussiness Bay, Exchange Tower 2501";

                                const url = Platform.select({
                                    ios: "maps:" + latitude + "," + longitude + "?q=" + label,
                                    android: "geo:" + latitude + "," + longitude + "?q=" + label
                                });

                                Linking.canOpenURL(url).then(supported => {
                                    if (supported) {
                                        return Linking.openURL(url);
                                    } else {
                                        browser_url =
                                            "https://www.google.de/maps/@" +
                                            latitude +
                                            "," +
                                            longitude +
                                            "?q=" +
                                            label;
                                        return Linking.openURL(browser_url);
                                    }
                                });

                            }}>
                                <Text style={{ paddingHorizontal: moderateScale(50), textAlign: 'center', color: theme.colors.secondary, fontSize: moderateScale(15) }}>{'Bussiness Bay, Exchange Tower 2501 \n happyclient@spaciality.ae'}</Text>
                            </TouchableOpacity>

                            <View style={{ width: '20%', backgroundColor: theme.colors.secondary, height: 1, marginVertical: moderateScale(20) }} />

                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => {
                                Linking.openURL(`tel:${'+971528132016'}`)
                            }}>
                                <Image source={require('app/assets/phone.png')} resizeMode="contain" style={{ height: moderateScale(20), width: moderateScale(20), }} />
                                <Text style={{ textAlign: 'center', color: theme.colors.secondary, fontSize: moderateScale(15), marginHorizontal: moderateScale(5) }}>{'+971528132016'}</Text>

                            </TouchableOpacity>
                        </View>

                    </View>



                </ScrollView>

            </View >
        );
    }
}

const mapStateToProps = (state) => ({
    data: {
        userInfo: state.login.userInfo
    },
})


const mapDispatchToProps = (dispatch) => ({
    actions: {
        contactus: bindActionCreators(loginActions, dispatch)
    }
})


const styles = StyleSheet.create({
    container_scrolling: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
    },
    scrollview: {
        paddingTop: 9,
    },
    scrollViewContent: {
        paddingBottom: 80,
    },
    categories: {
        marginBottom: 10,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject
    },
    container: {
        flex: 1,
        marginTop: 50,
        backgroundColor: '#fff',
    },

    headerText: {
        fontSize: 25,
        alignSelf: 'center',
    },
    back: {
        alignSelf: 'flex-end',
        height: 50,
        width: 50,
        borderRadius: 20,
        marginRight: 10,
    },

    header: {
        marginTop: 100,
        marginBottom: 30,
        color: 'white',
        alignItems: 'center',
        paddingHorizontal: theme.sizes.base * 2,
    },
    avatar: {
        height: 120,
        width: 120
    },
    inputs: {
        marginTop: theme.sizes.base * 0,
        paddingHorizontal: theme.sizes.base * 2,
    },
    inputRow: {
        alignItems: 'flex-end'
    },
    sliders: {
        marginTop: theme.sizes.base * 0.7,
        paddingHorizontal: theme.sizes.base * 2,
    },
    thumb: {
        width: theme.sizes.base,
        height: theme.sizes.base,
        borderRadius: theme.sizes.base,
        borderColor: 'white',
        borderWidth: 3,
        backgroundColor: theme.colors.secondary,
    },
    groupHeader: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center'
    },
    groupTitle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    groupTitleText: {
        flex: 0.9,
        paddingHorizontal: 10,
        fontSize: 17,
        fontWeight: '500',
        color: theme.colors.blue
    },
    groupTitleArrow: {
        width: 12,
        tintColor: theme.colors.blue,
        height: 12,
        flex: 0.1,
        marginRight: 5
    },
    toggles: {
        marginTop: 10,
        paddingHorizontal: theme.sizes.base * 1
    },
    inputmessage: {
        marginTop: 5,
        marginBottom: 5,
        minHeight: 150,
        paddingStart: 10,
        paddingEnd: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderColor: theme.colors.gray05, backgroundColor: theme.colors.gray06, borderRadius: moderateScale(10),
        borderWidth: 0, height: moderateScale(140), marginHorizontal: moderateScale(10), ...I18nManager.isRTL ? { paddingEnd: 10, textAlign: 'right' } : {}, paddingHorizontal: moderateScale(0), marginTop: moderateScale(10)
    },
    input: {
        borderColor: theme.colors.gray05, backgroundColor: theme.colors.gray06, borderRadius: moderateScale(10),
        borderWidth: 0, height: moderateScale(40), marginHorizontal: moderateScale(10), ...I18nManager.isRTL ? { paddingEnd: 10, textAlign: 'right' } : {}, paddingHorizontal: moderateScale(0), marginTop: moderateScale(10)
    },
    checkout: {
        width: '90%',
        backgroundColor: theme.colors.secondary,
        fontSize: moderateScale(15),
        borderRadius: moderateScale(10),
        paddingEnd: 6,
        borderWidth: 0,
        paddingStart: 6,
        fontWeight: '400',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        alignSelf: 'center'
    },
    heading: {
        fontSize: moderateScale(25),
        color: theme.colors.secondary,
        width: '80%', fontWeight: '500', alignSelf: 'center'
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ContactUs))
