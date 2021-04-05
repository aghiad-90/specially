import React, { Component } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, View, StatusBar, I18nManager, } from 'react-native'
import { theme } from '../../../../core/theme';
import { Block, Text } from '../../../../components/widget';
import * as loginActions from '../../../../actions/Actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showDanger, translate } from '../../../../utils/utils';
import { moderateScale } from 'react-native-size-matters';
import Button from 'apsl-react-native-button'
import { Input } from 'react-native-elements';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Header from '../childs/Header'


class GuestInfo extends Component {

    state = {
        isLoading: false, list: [], address: {}, loadAreas: false, areas: [], options: [], optionsType: [{ label: 'House', value: 'House' }, { label: 'Appartment', value: 'Appartment' }, { label: 'Office', value: 'Office' }], selectedCity: '', selectedType: '1'
    }

    constructor(props) {
        super(props);
        state = {
            isLoading: false, list: [], address: {}, areas: [], loadAreas: false, options: [], optionsType: [{ label: 'House', value: 'House' }, { label: 'Appartment', value: 'Appartment' }, { label: 'Office', value: 'Office' }], selectedCity: '', selectedType: '1'
        }

        this.inputRefs = {
            selectedCity: null, area: null, street: null, building: null, floor: null,
            apparetment: null, mobilenumber: null, extrainfo: null, type: null, first_name: null, email: null, last_name: null
        };
    }


    componentDidMount() {
        if (this.props.data.GuestCheckoutAddress) {
            this.setState({ address: this.props.data.GuestCheckoutAddress, selectedType: Number(this.props.data.GuestCheckoutAddress.type), selectedArea: Number(this.props.data.GuestCheckoutAddress.area?.label), loadAreas: true });
        }


        this.props.actions.AddressBook.cities(((onSuccess) => {
            this.setState({ isLoading: false })
            if (onSuccess.code === 200) {
                this.state.options = [];
                for (let k in onSuccess.data) {
                    if (!onSuccess.data[k].active) {
                        this.state.options.push({
                            value: onSuccess.data[k].city_id, active: onSuccess.data[k].active,
                            label: onSuccess.data[k].name
                        })
                    } else {
                        this.state.options.push({
                            value: onSuccess.data[k].city_id, active: onSuccess.data[k].active,
                            label: onSuccess.data[k].name
                        })
                    }

                }
                this.setState({ options: this.state.options });
            }
            // console.log(onSuccess);
        }), ((onError) => {
            this.setState({ isLoading: false })
            // // console.log(onError);
        }))
    }


    loadAreas(city_id) {
        console.log(city_id)
        this.setState({ loadAreas: false })
        this.props.actions.AddressBook.areas({ city_id: city_id }, ((onSuccess) => {
            this.setState({ loadAreas: true })
            if (onSuccess.code === 200) {
                this.state.areas = [];
                for (let k in onSuccess.data) {
                    this.state.areas.push({ value: onSuccess.data[k].area_id, label: onSuccess.data[k].title })
                }
                this.setState({ areas: this.state.areas });
            }
            console.log('Load Areas', onSuccess);
        }), ((onError) => {
            this.setState({ loadAreas: false })
            console.log(onError);
        }))
    }


    GuestInfo() {


        if (this.state.selectedCity === '') {
            showDanger(translate('please select city')); return;
        }
        if (!this.state.address.area || this.state.address.area === '') {
            showDanger(translate('please enter area')); return;
        }
        if (this.state.selectedType === '') {
            showDanger(translate('please enter type')); return;
        }

        if (!this.state.address.first_name || this.state.address.first_name === '') {
            showDanger(translate('nameMessage')); this.inputRefs.first_name.shake(); return;
        }

        if (!this.state.address.last_name || this.state.address.last_name === '') {
            showDanger(translate('nameMessagelast')); this.inputRefs.last_name.shake(); return;
        }

        if (!this.state.address.email || this.state.address.email === '') {
            showDanger(translate('emailMessage')); this.inputRefs.email.shake(); return;
        }
        const emailCheckRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!emailCheckRegex.test(this.state.address.email)) {
            showDanger(translate('emailMessage')); this.inputRefs.email.shake(); return;
        }

        if (!this.state.address.street || this.state.address.street === '') {
            showDanger(translate('please enter street')); this.inputRefs.street.shake(); return;
        }
        if (!this.state.address.building || this.state.address.building === '') {
            showDanger(translate('please enter building')); this.inputRefs.building.shake(); return;
        }
        if (!this.state.address.floor || this.state.address.floor === '') {
            showDanger(translate('please enter floor')); this.inputRefs.floor.shake(); return;
        }
        if (!this.state.address.apartment || this.state.address.apartment === '') {
            showDanger(translate('please enter apparetment')); this.inputRefs.apparetment.shake(); return;
        }
        if (!this.state.address.phone || this.state.address.phone === '') {
            showDanger(translate('please enter mobile number')); this.inputRefs.mobilenumber.shake(); return;
        }

        if (!this.state.address.additional || this.state.address.additional === '') {
            this.state.address.additional = '';
        }

        // for (let k in this.state.areas) {
        //     console.log(this.state.areas[k].value === this.state.address.area_id)
        //     if (this.state.areas[k].value === this.state.address.area_id) {
        //         this.state.address.area = this.state.areas[k];
        //         console.log('this.state.areas[k]', this.state.areas[k]);
        //         console.log(this.state.address.area);
        //     }
        // }




        this.state.address.type = this.state.selectedType;
        this.state.address.phone = this.state.address.phone;
        this.state.address.city = {}
        this.state.address.city.name = this.state.selectedCity;
        this.state.address.city.active = this.state.selectedCityActive;
        this.state.address.city.city_id = this.state.selectedCitycity_id;



        this.props.actions.AddressBook.GuestCheckourAddress(this.state.address);
        this.props.navigation.pop();
        this.props.navigation.navigate('Checkout');
    }
    UpdateAddress() {
        this.setState({ isLoading: true })
        this.state.address.type = this.state.selectedType;

        // for (let k in this.state.area) {
        //     console.log(this.state.address.area_id, this.state.areas[k]);
        //     if (this.state.areas[k] === this.state.address.area_id) {
        //         this.state.address.area = this.state.areas[k];
        //     }
        // }

        this.props.actions.AddressBook.GuestCheckourAddress(this.state.address);
        this.props.navigation.pop();
    }



    render() {
        const placeholder = {
            label: translate('SelectCity'),
            value: null,
            color: theme.colors.primary,
        };


        const placeholder1 = {
            label: translate('Area'),
            value: null,
            color: theme.colors.primary,
        };


        // // console.log(this.state.selectedCity);
        return (
            <Block color={theme.colors.white}>
                <StatusBar backgroundColor="transparent" barStyle="dark-content" />
                <ImageBackground source={require('app/assets/Background.jpg')} style={{ width: '100%', height: '100%', position: 'absolute', }}></ImageBackground>

                <Header search={false} back={true} navigation={this.props.navigation} Text={translate('Guest Checkout')} backclick={() => { this.props.navigation.pop() }} />

                <KeyboardAwareScrollView
                    contentContainerStyle={styles.scrollview}
                    scrollEnabled={true}
                    contentInsetAdjustmentBehavior="automatic">




                    <View style={{ paddingVertical: 20, paddingHorizontal: 15, justifyContent: 'center', alignContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                        <Text style={{ color: theme.colors.white, fontWeight: '600', marginBottom: moderateScale(10), fontSize: moderateScale(14), marginTop: moderateScale(5), width: "100%" }}>{translate('SelectCity')}</Text>
                        <ImageBackground resizeMode="stretch" source={require('app/assets/inputback.png')} style={{ width: '100%', height: 45, marginBottom: 10, }}>

                            <TouchableOpacity
                                style={{ width: "100%" }}
                                onPress={() => {
                                    this.inputRefs.selectedCity.togglePicker(true);
                                }}
                            >
                                <View testID="needed_for_touchable" style={{ width: '100%', marginTop: moderateScale(1), flexDirection: 'column' }}>
                                    <View testID="needed_for_touchable" style={{ zIndex: 0, marginTop: moderateScale(0) }}>
                                        <Input
                                            labelStyle={{ color: theme.colors.black, ...I18nManager.isRTL ? { textAlign: 'left' } : {} }}
                                            inputContainerStyle={{ borderBottomWidth: 0 }}
                                            inputStyle={{ ...I18nManager.isRTL ? { textAlign: 'right' } : {}, borderColor: theme.colors.gray05, borderRadius: moderateScale(3), paddingStart: moderateScale(10), marginTop: moderateScale(0) }}
                                            containerStyle={{ marginTop: moderateScale(1) }}
                                            returnKeyType="next"
                                            placeholder={translate('DubaiAjman')}
                                            value={this.state.selectedCity}
                                        />
                                    </View>
                                    <View testID="needed_for_touchable" style={{ zIndex: 1, width: "100%", height: 55, marginTop: moderateScale(0), position: "absolute" }}>

                                    </View>
                                </View>
                            </TouchableOpacity>


                        </ImageBackground>

                        <Text style={{ color: theme.colors.white, fontWeight: '600', marginBottom: moderateScale(10), fontSize: moderateScale(14), width: "100%", marginTop: moderateScale(5) }}>{translate('Area')}</Text>
                        <ImageBackground resizeMode="stretch" source={require('app/assets/inputback.png')} style={{ width: '100%', height: 45, marginBottom: 10, }}>


                            <Input
                                labelStyle={{ color: theme.colors.black }}
                                containerStyle={{ marginTop: moderateScale(3) }}
                                ref={(input) => { this.inputRefs.area = input; }}
                                returnKeyType="next"
                                inputContainerStyle={{ borderBottomWidth: 0 }}
                                inputStyle={{ ...I18nManager.isRTL ? { textAlign: 'right' } : {}, borderColor: theme.colors.gray05, borderRadius: moderateScale(3), paddingStart: moderateScale(10), }}
                                onSubmitEditing={() => { this.inputRefs.street.focus(); }}
                                placeholder={translate('egBussinesbay')}
                                value={this.state.address.area}
                                onChangeText={(value) => { this.state.address.area = value; this.setState({ address: this.state.address }) }}
                            />


                        </ImageBackground>



                        <Text style={{ color: theme.colors.white, fontWeight: '600', marginBottom: moderateScale(10), fontSize: moderateScale(14), marginTop: moderateScale(5), width: "100%" }}>{translate('FristName')}</Text>
                        <ImageBackground resizeMode="stretch" source={require('app/assets/inputback.png')} style={{ width: '100%', height: 45, marginBottom: 10, }}>
                            <Input
                                labelStyle={{ color: theme.colors.black, ...I18nManager.isRTL ? { textAlign: 'left' } : {} }}
                                containerStyle={{ marginTop: moderateScale(2) }}
                                ref={(input) => { this.inputRefs.first_name = input; }}
                                returnKeyType="next"
                                inputContainerStyle={{ borderBottomWidth: 0 }}
                                inputStyle={{ ...I18nManager.isRTL ? { textAlign: 'right' } : {}, borderColor: theme.colors.gray05, borderRadius: moderateScale(3), paddingStart: moderateScale(10) }}
                                onSubmitEditing={() => { this.inputRefs.last_name.focus(); }}
                                placeholder={translate('Enter your first name here')}
                                value={this.state.address.first_name}
                                onChangeText={(value) => { this.state.address.first_name = value; this.setState({ address: this.state.address }) }}
                            />

                        </ImageBackground>




                        <Text style={{ color: theme.colors.white, fontWeight: '600', marginBottom: moderateScale(10), fontSize: moderateScale(14), marginTop: moderateScale(5), width: "100%" }}>{translate('LastName')}</Text>

                        <ImageBackground resizeMode="stretch" source={require('app/assets/inputback.png')} style={{ width: '100%', height: 45, marginBottom: 10, }}>
                            <Input
                                labelStyle={{ color: theme.colors.black, ...I18nManager.isRTL ? { textAlign: 'left' } : {} }}
                                containerStyle={{ marginTop: moderateScale(2) }}
                                ref={(input) => { this.inputRefs.last_name = input; }}
                                returnKeyType="next"
                                inputContainerStyle={{ borderBottomWidth: 0 }}
                                inputStyle={{ ...I18nManager.isRTL ? { textAlign: 'right' } : {}, borderColor: theme.colors.gray05, borderRadius: moderateScale(3), paddingStart: moderateScale(10), }}
                                onSubmitEditing={() => { this.inputRefs.email.focus(); }}
                                placeholder={translate('Enter your last name here')}
                                value={this.state.address.last_name}
                                onChangeText={(value) => { this.state.address.last_name = value; this.setState({ address: this.state.address }) }}
                            />

                        </ImageBackground>





                        <Text style={{ color: theme.colors.white, fontWeight: '600', marginBottom: moderateScale(10), fontSize: moderateScale(14), marginTop: moderateScale(5), width: "100%" }}>{translate('Email')}</Text>

                        <ImageBackground resizeMode="stretch" source={require('app/assets/inputback.png')} style={{ width: '100%', height: 45, marginBottom: 10, }}>
                            <Input
                                labelStyle={{ color: theme.colors.black, ...I18nManager.isRTL ? { textAlign: 'left' } : {} }}
                                containerStyle={{ marginTop: moderateScale(2) }}
                                ref={(input) => { this.inputRefs.email = input; }}
                                returnKeyType="next"
                                autoCompleteType="email"
                                textContentType="emailAddress"
                                keyboardType="email-address"
                                inputContainerStyle={{ borderBottomWidth: 0 }}
                                inputStyle={{ ...I18nManager.isRTL ? { textAlign: 'right' } : {}, borderColor: theme.colors.gray05, borderRadius: moderateScale(3), paddingStart: moderateScale(10), }}
                                onSubmitEditing={() => { this.inputRefs.area.focus(); }}
                                placeholder={translate('Enter your email here')}
                                value={this.state.address.email}
                                onChangeText={(value) => { this.state.address.email = value; this.setState({ address: this.state.address }) }}
                            />

                        </ImageBackground>






                        {this.state.loadAreas &&
                            <Text style={{ color: theme.colors.white, fontWeight: '600', marginBottom: moderateScale(10), fontSize: moderateScale(14), marginTop: moderateScale(10), width: "100%" }}>{translate('Area')}</Text>
                        }

                        {this.state.loadAreas &&
                            <ImageBackground resizeMode="stretch" source={require('app/assets/inputback.png')} style={{ width: '100%', height: 45, marginBottom: 10, }}>
                                <TouchableOpacity
                                    style={{ width: "100%" }}
                                    onPress={() => {
                                        this.inputRefs.selectedArea.togglePicker(true);
                                    }}
                                >
                                    <View testID="needed_for_touchable" style={{ width: '100%', marginTop: moderateScale(1), flexDirection: 'column' }}>
                                        <View testID="needed_for_touchable" style={{ zIndex: 0, marginTop: moderateScale(0) }}>
                                            <Input
                                                labelStyle={{ color: theme.colors.black, ...I18nManager.isRTL ? { textAlign: 'left' } : {} }}
                                                inputContainerStyle={{ borderBottomWidth: 0 }}
                                                inputStyle={{ ...I18nManager.isRTL ? { textAlign: 'right' } : {}, borderColor: theme.colors.gray05, borderRadius: moderateScale(3), paddingStart: moderateScale(10), marginTop: moderateScale(0) }}
                                                containerStyle={{ marginTop: moderateScale(1) }}
                                                returnKeyType="next"
                                                placeholder={translate('egBussinesbay')}
                                                value={this.state.selectedArea}
                                            />
                                        </View>
                                        <View testID="needed_for_touchable" style={{ zIndex: 1, width: "100%", height: 55, marginTop: moderateScale(0), position: "absolute" }}>

                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </ImageBackground>
                        }





                        <Text style={{ color: theme.colors.white, fontWeight: '600', marginBottom: moderateScale(10), fontSize: moderateScale(14), marginTop: moderateScale(5), width: "100%" }}>{translate('Street')}</Text>

                        <ImageBackground resizeMode="stretch" source={require('app/assets/inputback.png')} style={{ width: '100%', height: 45, marginBottom: 10, }}>
                            <Input
                                labelStyle={{ color: theme.colors.black, ...I18nManager.isRTL ? { textAlign: 'left' } : {} }}
                                containerStyle={{ marginTop: moderateScale(2), borderBottomWidth: 0 }}
                                inputContainerStyle={{ borderBottomWidth: 0 }}
                                inputStyle={{ ...I18nManager.isRTL ? { textAlign: 'right' } : {}, borderColor: theme.colors.gray05, borderRadius: moderateScale(3), paddingStart: moderateScale(10), marginTop: moderateScale(0) }}
                                returnKeyType="next"
                                bottomDivider={false}
                                ref={(input) => { this.inputRefs.street = input; }}
                                onSubmitEditing={() => { this.inputRefs.building.focus(); }}
                                placeholder={translate('eghapinsessstreet')}
                                value={this.state.address.street}
                                onChangeText={(value) => { this.state.address.street = value; this.setState({ address: this.state.address }) }}
                            />
                        </ImageBackground>






                        <Text style={{ color: theme.colors.white, fontWeight: '600', marginBottom: moderateScale(10), fontSize: moderateScale(14), marginTop: moderateScale(5), width: "100%" }}>{translate('Building')}</Text>

                        <ImageBackground resizeMode="stretch" source={require('app/assets/inputback.png')} style={{ width: '100%', height: 45, marginBottom: 10, }}>
                            <Input
                                labelStyle={{ color: theme.colors.black, ...I18nManager.isRTL ? { textAlign: 'left' } : {} }}
                                inputContainerStyle={{ borderBottomWidth: 0 }}
                                inputStyle={{ ...I18nManager.isRTL ? { textAlign: 'right' } : {}, borderColor: theme.colors.gray05, borderRadius: moderateScale(3), paddingStart: moderateScale(10), }}
                                containerStyle={{ marginTop: moderateScale(2) }}
                                ref={(input) => { this.inputRefs.building = input; }}
                                onSubmitEditing={() => { this.inputRefs.floor.focus(); }}
                                returnKeyType="next"
                                placeholder={translate('egExchangeTower')}
                                value={this.state.address.building}
                                onChangeText={(value) => { this.state.address.building = value; this.setState({ address: this.state.address }) }}
                            />

                        </ImageBackground>




                        <Text style={{ color: theme.colors.white, fontWeight: '600', marginBottom: moderateScale(10), fontSize: moderateScale(14), marginTop: moderateScale(5), width: "100%" }}>{translate('Floor')}</Text>

                        <ImageBackground resizeMode="stretch" source={require('app/assets/inputback.png')} style={{ width: '100%', height: 45, marginBottom: 10, }}>
                            <Input
                                labelStyle={{ color: theme.colors.black, ...I18nManager.isRTL ? { textAlign: 'left' } : {} }}
                                inputContainerStyle={{ borderBottomWidth: 0 }}
                                inputStyle={{ ...I18nManager.isRTL ? { textAlign: 'right' } : {}, borderColor: theme.colors.gray05, borderRadius: moderateScale(3), paddingStart: moderateScale(10), }}
                                containerStyle={{ marginTop: moderateScale(2) }}
                                returnKeyType="next"
                                onSubmitEditing={() => { this.inputRefs.apparetment.focus(); }}
                                ref={(input) => { this.inputRefs.floor = input; }}
                                placeholder={translate('eg25th')}
                                value={this.state.address.floor}
                                onChangeText={(value) => { this.state.address.floor = value; this.setState({ address: this.state.address }) }}
                            />

                        </ImageBackground>





                        <Text style={{ color: theme.colors.white, fontWeight: '600', marginBottom: moderateScale(10), fontSize: moderateScale(14), marginTop: moderateScale(5), width: "100%" }}>{translate('Appartment')}</Text>

                        <ImageBackground resizeMode="stretch" source={require('app/assets/inputback.png')} style={{ width: '100%', height: 45, marginBottom: 10, }}>
                            <Input
                                labelStyle={{ color: theme.colors.black, ...I18nManager.isRTL ? { textAlign: 'left' } : {} }}
                                inputContainerStyle={{ borderBottomWidth: 0 }}
                                inputStyle={{ ...I18nManager.isRTL ? { textAlign: 'right' } : {}, borderColor: theme.colors.gray05, borderRadius: moderateScale(3), paddingStart: moderateScale(10), marginTop: moderateScale(0) }}
                                containerStyle={{ marginTop: moderateScale(2) }}
                                ref={(input) => { this.inputRefs.apparetment = input; }}
                                onSubmitEditing={() => { this.inputRefs.mobilenumber.focus(); }}
                                returnKeyType="next"
                                placeholder={translate('eg2501')}
                                value={this.state.address.apartment}
                                onChangeText={(value) => { this.state.address.apartment = value; this.setState({ address: this.state.address }) }}
                            />

                        </ImageBackground>



                        <Text style={{ color: theme.colors.white, fontWeight: '600', marginBottom: moderateScale(10), fontSize: moderateScale(14), marginTop: moderateScale(5), width: "100%" }}>{translate('Mobile No')}</Text>

                        <ImageBackground resizeMode="stretch" source={require('app/assets/inputback.png')} style={{ width: '100%', height: 45, marginBottom: 10, }}>
                            <Input
                                labelStyle={{ color: theme.colors.black, ...I18nManager.isRTL ? { textAlign: 'left' } : {} }}
                                inputContainerStyle={{ borderBottomWidth: 0 }}
                                inputStyle={{ ...I18nManager.isRTL ? { textAlign: 'right' } : {}, borderColor: theme.colors.gray05, borderRadius: moderateScale(3), paddingStart: moderateScale(10), marginTop: moderateScale(0) }}
                                containerStyle={{ marginTop: moderateScale(2) }}
                                ref={(input) => { this.inputRefs.mobilenumber = input; }}
                                onSubmitEditing={() => { this.inputRefs.extrainfo.focus(); }}
                                returnKeyType="next"
                                keyboardType="numeric"
                                placeholder={translate('eg050')}
                                value={this.state.address.phone}
                                onChangeText={(value) => { this.state.address.phone = value; this.setState({ address: this.state.address }) }}
                            />


                        </ImageBackground>

                        <Text style={{ color: theme.colors.white, fontWeight: '600', marginBottom: moderateScale(10), fontSize: moderateScale(14), marginTop: moderateScale(5), width: "100%" }}>{translate('Extrainfo')}</Text>
                        <ImageBackground resizeMode="stretch" source={require('app/assets/inputback.png')} style={{ width: '100%', height: 45, marginBottom: 10, }}>

                            <Input
                                labelStyle={{ color: theme.colors.black, ...I18nManager.isRTL ? { textAlign: 'left' } : {} }}
                                inputContainerStyle={{ borderBottomWidth: 0 }}
                                inputStyle={{ ...I18nManager.isRTL ? { textAlign: 'left' } : {}, borderColor: theme.colors.gray05, borderRadius: moderateScale(3), paddingStart: moderateScale(10), marginTop: moderateScale(0) }}
                                containerStyle={{ marginTop: moderateScale(2) }}
                                ref={(input) => { this.inputRefs.extrainfo = input; }}
                                onSubmitEditing={() => { this.inputRefs.extrainfo.blur(); }}
                                returnKeyType="done"
                                placeholder={translate('ExtraMessage')}
                                value={this.state.address.additional}
                                onChangeText={(value) => { this.state.address.additional = value; this.setState({ address: this.state.address }) }}
                            />

                        </ImageBackground>




                    </View>
                </KeyboardAwareScrollView>

                <View style={{ position: 'absolute', bottom: 0, width: '100%', alignSelf: 'center', backgroundColor: theme.colors.primary, padding: moderateScale(20) }}>
                    <ImageBackground resizeMode="repeat" source={require('app/assets/buttonback.png')} style={{
                        width: '100%',
                        height: moderateScale(45),
                        alignSelf: 'center', backgroundColor: 'black'
                    }}>
                        <TouchableOpacity style={{}} >
                            <Button isLoading={this.state.isLoading} style={styles.checkout} textStyle={{ fontSize: moderateScale(18), color: theme.colors.white }}
                                onPress={() => {
                                    if (!this.state.address.address_id) {
                                        this.GuestInfo();
                                    } else {
                                        this.UpdateAddress();
                                    }
                                }}>{translate('Save')}</Button>
                        </TouchableOpacity>
                    </ImageBackground>



                </View>


                <View style={{ height: 0 }}>
                    <RNPickerSelect
                        placeholder={placeholder}
                        items={this.state.options}
                        value={this.state.address.city_id ? this.state.address.city_id : 0}
                        onValueChange={value => {
                            this.state.address.city_id = value; this.setState({ address: this.state.address })
                            for (let k in this.state.options) {
                                if (this.state.options[k].value === value) {
                                    this.state.selectedCity = this.state.options[k].label;
                                    this.state.selectedCityActive = this.state.options[k].active;
                                    this.state.selectedCitycity_id = this.state.options[k].value;
                                    this.loadAreas(this.state.options[k].value);
                                }
                            }
                        }}
                        useNativeAndroidPickerStyle={false}
                        ref={el => {
                            this.inputRefs.selectedCity = el;
                        }}
                    />
                </View>


                <View style={{ height: 0 }}>
                    <RNPickerSelect
                        placeholder={placeholder1}
                        items={this.state.areas}
                        onValueChange={value => {
                            this.state.address.area_id = value; this.setState({ address: this.state.address })
                            for (let k in this.state.areas) {
                                if (this.state.areas[k].value === value) {
                                    this.state.selectedArea = this.state.areas[k].label;
                                    this.state.address.area_id = this.state.areas[k].value;
                                }
                            }
                        }}
                        onDonePress={value => {
                        }}
                        useNativeAndroidPickerStyle={false}
                        ref={el => {
                            this.inputRefs.selectedArea = el;
                        }}
                    />



                </View>



            </Block >
        )


    }

}

const mapStateToProps = (state) => ({
    data: {
        userInfo: state.login.userInfo,
        GuestCheckoutAddress: state.app.GuestCheckoutAddress,
    },
})


const mapDispatchToProps = (dispatch) => ({
    actions: {
        AddressBook: bindActionCreators(loginActions, dispatch)
    }
})


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        backgroundColor: '#fff',
    },

    headerText: {
        fontSize: 25,
        alignSelf: 'center',
    },
    scrollview: {
        marginHorizontal: moderateScale(5),
        marginTop: moderateScale(5),
        paddingBottom: moderateScale(100),
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
        backgroundColor: theme.colors.secondary,
        flexDirection: 'row',
        alignItems: 'center'
    },

    toggles: {
        marginTop: 10,
        paddingHorizontal: theme.sizes.base * 1
    },
    iconCounter: {
        height: 120,
        width: 120,
    },
    iconCounterDummy: {
        height: 130,
        width: 130,
    },
    iconCounterText: {
        color: theme.colors.primary,
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10,
        marginBottom: 10,
        textAlign: "center"
    },
    containerReviews: {
        marginTop: 0.5,
        borderBottomColor: '#ededed',
        borderBottomWidth: 1,
        backgroundColor: 'white'
    },
    subtitle: {
        color: theme.colors.secondary,
        fontSize: 15,
        paddingStart: 10,
        paddingEnd: 10,
    },
    titleContainer: {
        justifyContent: 'center',
        flex: 1
    },
    info: {
        width: '100%',
        minHeight: 70,
        paddingStart: 10,
        paddingEnd: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5, borderColor: theme.colors.white, borderWidth: 1, paddingStart: 10, color: theme.colors.white,
        borderRadius: 5,
    },
    checkout: {
        width: '100%',
        color: theme.colors.secondary,
        fontSize: 16,
        borderWidth: 0,
        paddingEnd: 6,
        paddingStart: 6,
        paddingTop: 3,
        fontWeight: '400',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    mainselections: {
        flexDirection: 'row'
    },
    selections: {
        backgroundColor: theme.colors.gray05, height: moderateScale(38), borderRadius: moderateScale(20), flex: 1, marginHorizontal: moderateScale(2),
        alignItems: 'center', alignContent: "center", flexDirection: 'row', alignSelf: 'center', textAlign: 'center'
    },
    selectionstext: {
        color: theme.colors.primary, width: '100%', textAlign: 'center', fontSize: moderateScale(15), fontWeight: '900',
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(GuestInfo))