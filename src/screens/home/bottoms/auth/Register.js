import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  I18nManager,
  ActivityIndicator,
} from "react-native";
import Button from "apsl-react-native-button";
import TextInput from "../../../../components/Weights/TextInput";
import { Text } from "../../../../components/widget";
import { theme } from "../../../../core/theme";
import Icon from "react-native-vector-icons/FontAwesome";
import { showSuccess, showDanger, translate } from "../../../../utils/utils";
import * as loginActions from "../../../../actions/Actions";
import { Dimensions } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
import Header from "../childs/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input } from "react-native-elements";
import RNPickerSelect from "react-native-picker-select";
import ModalDatePicker from "react-native-datepicker-modal";
import StepIndicator from "react-native-step-indicator";
import moment from "moment";
import CountryPicker from "react-native-country-picker-modal";
import emojiFlags from "emoji-flags";
import * as Apis from "../../../../services/Apis";
import OTPInput from "react-native-otp";

/**
 * @type {Class}
 */

class Register extends Component {
  state = {
    isLoading: false,
    login: 100,
    register: 0,
    email: "",
    OtpView: false,
    last_name: "",
    phone: "",
    password: "",
    conformPassword: "",
    currentPosition: 0,
    first_name: "",
    callingCode: "971",
    dateOfBirth: "",
    Gender: "",
    city: "",
    country: "",
    instragram: "",
    facebook: "",
    selectCountry: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      login: 100,
      register: 0,
      Countries: [],
      email: "",
      OtpView: false,
      last_name: "",
      phone: "",
      password: "",
      conformPassword: "",
      currentPosition: 0,
      first_name: "",
      callingCode: "971",
      dateOfBirth: "",
      Gender: "",
      city: "",
      country: "",
      instragram: "",
      facebook: "",
      selectCountry: false,
    };

    // this.state = { isLoading: false, login: 100, register: 0, Countries: [], OtpView: false, email: 'crowd@gmail.com', last_name: 'Asif', phone: '509763143', password: 'a12345678', conformPassword: 'a12345678', currentPosition: 4, first_name: 'Muhammad', callingCode: '971', dateOfBirth: new Date(), Gender: 'male', city: 'islamabad', country: '', instragram: 'https://www.instagram.com/', facebook: 'https://www.facebook.com/', selectCountry: false }
  }

  componentDidMount() {
    this.getCountry();
  }

  /**
   * get Country from the API
   */

  getCountry() {
    Apis.Get("country?isPagination=false")
      .then((data) => {
        for (let k in data.results) {
          // this.setState({ country: data.results[k]._id })
          this.state.Countries.push({
            label: data.results[k].title,
            value: data.results[k]._id,
            data: data.results,
          });
        }
        this.setState({ isLoading: false, Countries: this.state.Countries });
      })
      .catch((error) => {
        showDanger(error.message);
        console.log(error);
        this.setState({ isLoading: false });
      });
  }

  /**
   * Send the OPT for Authenticate the user
   */
  sendOtp() {
    this.setState({ isLoading: true });
    Apis.Post("auth/otpSend", {
      phone: "+" + this.state.callingCode.trim() + this.state.phone.trim(),
      email: this.state.email,
    })
      .then((data) => {
        this.setState({ isLoading: false, OtpView: true });
      })
      .catch((error) => {
        console.log(error);
        showDanger(error.message);
        this.setState({ isLoading: false, OtpView: false, currentPosition: 0 });
      });
  }

  onSuccess = (data) => {
    setTimeout(() => {
      console.log("RegisterOnSuccess", data);
      this.setState({ isLoading: false });
      this.props.navigation.pop(2);
    }, 1000);
  };
  onError = (error) => {
    showDanger(error.message);
    this.setState({ isLoading: false });
    console.log(error);
  };

  onPress(otp) {
    if (this.state.currentPosition !== 4) {
      this.setState({ currentPosition: this.state.currentPosition + 1 });
      return;
    }

    console.log(this.checkCanMoveClick());
    if (this.checkCanMoveClick() !== -1) {
      {
        this.setState({ currentPosition: this.checkCanMoveClick() });
        return;
      }
    }

    if (!this.state.OtpView) {
      this.sendOtp();
      return;
    }

    console.log(!this.state.OtpView, {
      email: this.state.email.trim(),
      first_name: this.state.first_name.trim(),
      last_name: this.state.last_name.trim(),
      password: this.state.password.trim(),
      phone: "+" + this.state.callingCode.trim() + this.state.phone.trim(),
      user_type: "normal",
      otp: otp,
      birthday: this.state.dateOfBirth,
      country: this.state.country,
      gender: this.state.Gender,
      city: this.state.city,
      facebook: this.state.facebook,
      instagram: this.state.instragram,
    });

    this.setState({ isLoading: true });
    this.props.actions.login.register(
      {
        email: this.state.email.trim(),
        first_name: this.state.first_name.trim(),
        last_name: this.state.last_name.trim(),
        password: this.state.password.trim(),
        phone: "+" + this.state.callingCode.trim() + this.state.phone.trim(),
        user_type: "normal",
        otp: otp,
        birthday: this.state.dateOfBirth,
        country: this.state.country,
        gender: this.state.Gender,
        city: this.state.city,
        facebook: this.state.facebook,
        instagram: this.state.instragram,
      },
      this.onSuccess,
      this.onError
    );
  }

  checkCanMove() {
    if (this.state.currentPosition === 0) {
      if (
        this.state.email !== "" &&
        this.state.phone !== "" &&
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
          this.state.email
        )
      )
        return true;
      return false;
    }

    if (this.state.currentPosition === 1) {
      if (
        this.state.first_name !== "" &&
        this.state.last_name !== "" &&
        this.state.dateOfBirth !== "" &&
        this.state.Gender !== ""
      )
        return true;
      return false;
    }

    if (this.state.currentPosition === 2) {
      if (this.state.country !== "" && this.state.city !== "") return true;
      return false;
    }

    if (this.state.currentPosition === 3) {
      if (
        this.state.password !== "" &&
        this.state.conformPassword !== "" &&
        this.state.conformPassword === this.state.password &&
        !(
          !/\d/.test(this.state.password) ||
          !/[a-zA-Z]/.test(this.state.password)
        )
      )
        return true;
      return false;
    }
    if (this.state.currentPosition === 4) {
      if (this.state.instragram !== "" && this.state.facebook !== "")
        return true;
      return false;
    }

    return false;
  }

  /**
   *function
   */

  checkCanMoveClick() {
    if (this.state.instragram === "" || this.state.facebook === "") return 4;
    if (
      this.state.password === "" ||
      this.state.conformPassword === "" ||
      this.state.conformPassword !== this.state.password ||
      (!/\d/.test(this.state.password) || !/[a-zA-Z]/.test(this.state.password))
    )
      return 3;
    if (this.state.country === "" || this.state.city === "") return 2;
    if (
      this.state.first_name === "" ||
      this.state.last_name === "" ||
      this.state.dateOfBirth === "" ||
      this.state.Gender === ""
    )
      return 1;
    if (
      this.state.email === "" ||
      this.state.phone === "" ||
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
        this.state.email
      )
    )
      return 0;

    return -1;
  }

  render() {
    return (
      <View style={styles.container_scrolling}>
        <StatusBar backgroundColor="transparent" barStyle="light-content" />
        <Header
          search={false}
          back={true}
          navigation={this.props.navigation}
          logo={false}
          backclick={() => {
            this.props.navigation.pop();
          }}
        />

        {this.state.selectCountry && (
          <CountryPicker
            modalProps={{ visible: this.state.selectCountry }}
            countryList={("AE", "PK")}
            onClose={() => {
              this.setState({ selectCountry: false });
            }}
            onSelect={(value) => {
              console.log(value);
              this.setState({
                cca2: value.cca2,
                callingCode: value.callingCode,
                selectCountry: false,
                flag: emojiFlags.countryCode(value.cca2),
              });
            }}
            cca2={this.state.cca2}
            translation="eng"
          />
        )}

        <View style={{ width: "100%", height: "100%" }}>
          <View style={[styles.container, { flex: this.state.login }]}>
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              style={{ width: "95%" }}
              contentContainerStyle={{
                justifyContent: "center",
                paddingVertical: moderateScale(0),
                alignItems: "center",
                paddingBottom: moderateScale(100),
                width: "100%",
              }}
            >
              <Image
                source={require("app/assets/assets/logwithname.png")}
                resizeMode="contain"
                style={{
                  height: moderateScale(100),
                  width: moderateScale(150),
                }}
              />

              {!this.state.OtpView && (
                <Text
                  bold
                  style={{
                    marginBottom: moderateScale(10),
                    fontSize: moderateScale(20),
                    color: theme.colors.secondary,
                    marginTop: moderateScale(0),
                  }}
                >
                  {translate("Register Now")}
                </Text>
              )}

              {this.state.OtpView && (
                <View
                  style={{
                    flex: 1,
                    width: "100%",
                  }}
                >
                  <Text
                    gray2
                    style={{
                      color: theme.colors.gray04,
                      textTransform: "capitalize",
                      ...(I18nManager.isRTL ? { textAlign: "left" } : {}),
                    }}
                  >
                    {"\n" +
                      translate(
                        "PLEASE ENTER OTP WHERE WE SENT ON YOUR PHONE NUMBER"
                      ) +
                      ". " +
                      this.state.phone +
                      " \n"}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    {!this.state.isLoading && (
                      <OTPInput
                        cellStyle={{
                          color: theme.colors.secondary,
                          fontSize: moderateScale(15),
                        }}
                        value={this.state.otp}
                        onChange={(otp) => {
                          this.setState({ otp });
                          if (otp.length == 4) {
                            this.onPress(otp);
                          }
                        }}
                        cellStyle={{
                          borderRadius: moderateScale(5),
                          borderColor: theme.colors.secondary,
                        }}
                        tintColor={theme.colors.secondary}
                        textColor={theme.colors.secondary}
                        offTintColor={theme.colors.secondary}
                        otpLength={4}
                      />
                    )}

                    {this.state.isLoading && (
                      <ActivityIndicator
                        size={"large"}
                        color={theme.colors.secondary}
                      />
                    )}
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        OtpView: !this.state.OtpView,
                        currentPosition: 0,
                      });
                    }}
                  >
                    <Text
                      gray2
                      style={{
                        color: theme.colors.gray04,
                        textTransform: "capitalize",
                        marginTop: moderateScale(10),
                      }}
                    >
                      <Text
                        gray2
                        style={{
                          color: theme.colors.secondary,
                          textTransform: "capitalize",
                          ...(I18nManager.isRTL ? { textAlign: "left" } : {}),
                          marginTop: moderateScale(20),
                        }}
                      >
                        {translate("Change phone number")}
                      </Text>
                    </Text>
                  </TouchableOpacity>

                  {this.state.OtpView && !this.state.isLoading && (
                    <Button
                      mode="contained"
                      isLoading={this.state.isLoading}
                      disabled={this.state.sendAgainDisbale}
                      style={{
                        borderColor: "transparent",
                        color: theme.colors.white,
                        backgroundColor: theme.colors.secondary,
                        borderRadius: moderateScale(10),
                        marginTop: moderateScale(20),
                        marginBottom: moderateScale(10),
                        width: "80%",
                        alignSelf: "center",
                      }}
                      textStyle={{
                        fontSize: moderateScale(15),
                        color: theme.colors.primary,
                        fontWeight: "bold",
                      }}
                      onPress={() => {
                        this.sendOtp();
                      }}
                    >
                      {translate("SEND AGAIN")}
                    </Button>
                  )}
                </View>
              )}

              {!this.state.OtpView && (
                <View style={{ flex: 1, width: "100%" }}>
                  <StepIndicator
                    customStyles={{
                      stepIndicatorSize: moderateScale(25),
                      currentStepIndicatorSize: moderateScale(30),
                      separatorStrokeWidth: 2,
                      currentStepStrokeWidth: 3,
                      stepStrokeCurrentColor: theme.colors.secondary,
                      stepStrokeWidth: 3,
                      stepStrokeFinishedColor: theme.colors.secondary,
                      stepStrokeUnFinishedColor: theme.colors.gray04,
                      separatorFinishedColor: theme.colors.secondary,
                      separatorUnFinishedColor: theme.colors.gray05,
                      stepIndicatorFinishedColor: theme.colors.secondary,
                      stepIndicatorUnFinishedColor: theme.colors.gray04,
                      stepIndicatorCurrentColor: theme.colors.secondary,
                      stepIndicatorLabelFontSize: moderateScale(15),
                      currentStepIndicatorLabelFontSize: 13,
                      stepIndicatorLabelCurrentColor: theme.colors.white,
                      stepIndicatorLabelFinishedColor: theme.colors.white,
                      stepIndicatorLabelUnFinishedColor: theme.colors.white,
                      labelColor: theme.colors.secondary,
                      labelSize: moderateScale(12),
                      currentStepLabelColor: theme.colors.secondary,
                    }}
                    currentPosition={this.state.currentPosition}
                    onPress={(position) => {
                      this.setState({ currentPosition: position });
                    }}
                    labels={[
                      "Phone Number",
                      "Personal Info",
                      "Country City",
                      "Passwords",
                      "Social Media",
                    ]}
                  />
                </View>
              )}
              {!this.state.OtpView && (
                <View
                  style={{
                    flex: 1,
                    width: "100%",
                    marginTop: moderateScale(10),
                    borderWidth: moderateScale(1),
                    borderRadius: moderateScale(10),
                    borderColor: theme.colors.primary,
                  }}
                >
                  <View
                    style={{
                      alignSelf: "center",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      padding: moderateScale(20),
                    }}
                  >
                    {this.state.currentPosition === 0 && (
                      <View style={{ width: "100%" }}>
                        <TextInput
                          label={translate("Email address")}
                          style={{
                            borderRadius: 5,
                            borderColor: theme.colors.gray05,
                            backgroundColor: theme.colors.gray06,
                            borderRadius: moderateScale(10),
                            borderWidth: 1,
                            height: 45,
                            paddingStart: 10,
                            ...(I18nManager.isRTL
                              ? { paddingEnd: 10, textAlign: "right" }
                              : {}),
                          }}
                          returnKeyType="next"
                          value={this.state.email}
                          placeholder={translate("Email address")}
                          onChangeText={(value) =>
                            this.setState({ email: value })
                          }
                          autoCapitalize="none"
                          autoCompleteType="email"
                          placeholderTextColor={theme.colors.gray02}
                          textContentType="emailAddress"
                          keyboardType="email-address"
                        />

                        <Input
                          labelStyle={{ color: theme.colors.secondary }}
                          containerStyle={{
                            paddingLeft: 0,
                            paddingRight: 0,
                            marginTop: moderateScale(0),
                          }}
                          inputContainerStyle={{
                            borderRadius: 5,
                            borderColor: theme.colors.gray05,
                            backgroundColor: theme.colors.gray06,
                            borderRadius: moderateScale(10),
                            borderWidth: 1,
                            height: 45,
                            paddingStart: 10,
                            ...(I18nManager.isRTL
                              ? { paddingEnd: 10, textAlign: "right" }
                              : {}),
                          }}
                          placeholderTextColor={theme.colors.gray}
                          inputStyle={{
                            textAlignVertical: "center",
                            height: "100%",
                            ...(I18nManager.isRTL
                              ? { textAlign: "right" }
                              : {}),
                          }}
                          onSubmitEditing={() => {
                            if (this.checkCanMove())
                              this.setState({ currentPosition: 1 });
                          }}
                          returnKeyType="next"
                          placeholderTextColor={theme.colors.gray02}
                          leftIcon={
                            <TouchableOpacity
                              style={{
                                flexDirection: "row",
                                flexDireaction: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                                height: "80%",
                                borderEndWidth: moderateScale(1),
                                borderColor: theme.colors.secondary,
                                marginEnd: moderateScale(10),
                                marginTop: "10%",
                              }}
                              onPress={() => {
                                this.setState({ selectCountry: true });
                              }}
                            >
                              <Text
                                style={[
                                  {
                                    textAlign: "center",
                                    color: theme.colors.black,
                                    fontSize: moderateScale(15),
                                    marginEnd: moderateScale(10),
                                    marginStart: moderateScale(-15),
                                  },
                                ]}
                              >
                                {"+" + this.state.callingCode}
                              </Text>
                            </TouchableOpacity>
                          }
                          placeholder="Phone"
                          defaultValue={this.state.phone}
                          onChangeText={(value) =>
                            this.setState({ phone: value })
                          }
                          autoCapitalize="none"
                          autoCompleteType="tel"
                          textContentType={"telephoneNumber"}
                          keyboardType="phone-pad"
                        />
                      </View>
                    )}

                    {this.state.currentPosition === 1 && (
                      <View style={{ width: "100%" }}>
                        <TextInput
                          label={translate("Frist Name")}
                          style={{
                            borderRadius: 5,
                            borderColor: theme.colors.gray05,
                            backgroundColor: theme.colors.gray06,
                            borderRadius: moderateScale(10),
                            borderWidth: 1,
                            height: 45,
                            paddingStart: 10,
                            ...(I18nManager.isRTL
                              ? { paddingEnd: 10, textAlign: "right" }
                              : {}),
                          }}
                          returnKeyType="next"
                          value={this.state.first_name}
                          placeholderTextColor={theme.colors.gray02}
                          placeholder={translate("Frist Name")}
                          onChangeText={(value) =>
                            this.setState({ first_name: value })
                          }
                          autoCapitalize="none"
                        />

                        <TextInput
                          label={translate("Last Name")}
                          style={{
                            borderRadius: 5,
                            borderColor: theme.colors.gray05,
                            backgroundColor: theme.colors.gray06,
                            borderRadius: moderateScale(10),
                            borderWidth: 1,
                            height: 45,
                            paddingStart: 10,
                            ...(I18nManager.isRTL
                              ? { paddingEnd: 10, textAlign: "right" }
                              : {}),
                          }}
                          returnKeyType="next"
                          value={this.state.last_name}
                          placeholder={translate("Last Name")}
                          onChangeText={(value) =>
                            this.setState({ last_name: value })
                          }
                          autoCapitalize="none"
                          placeholderTextColor={theme.colors.gray02}
                          autoCompleteType="name"
                          textContentType="name"
                        />

                        <ModalDatePicker
                          style={{
                            borderRadius: 5,
                            borderColor: theme.colors.gray05,
                            backgroundColor: theme.colors.gray06,
                            borderRadius: moderateScale(10),
                            borderWidth: 1,
                            height: 45,
                            paddingStart: 10,
                            ...(I18nManager.isRTL
                              ? { paddingEnd: 10, textAlign: "right" }
                              : {}),
                            width: "100%",
                            marginBottom: moderateScale(10),
                            justifyContent: "center",
                            alignContent: "center",
                            alignItems: "center",
                          }}
                          onDateChanged={(date) => {
                            console.log("A date has been picked: ", date);
                            this.setState({ dateOfBirth: date.date });
                          }}
                          startDate={new Date()}
                          renderDate={({ year, month, day, date }) => {
                            return (
                              <Text
                                style={[
                                  styles.text,
                                  !moment(this.state.dateOfBirth).isValid()
                                    ? styles.placeholderText
                                    : {},
                                ]}
                              >
                                {moment(this.state.dateOfBirth).isValid()
                                  ? moment(this.state.dateOfBirth).format("ll")
                                  : "Select Date of Birth"}
                              </Text>
                            );
                          }}
                        />

                        <RNPickerSelect
                          textInputProps={{
                            borderRadius: 5,
                            borderColor: theme.colors.gray05,
                            backgroundColor: theme.colors.gray06,
                            borderRadius: moderateScale(10),
                            borderWidth: 1,
                            height: 45,
                            paddingStart: 10,
                            ...(I18nManager.isRTL
                              ? { paddingEnd: 10, textAlign: "right" }
                              : {}),
                            marginBottom: moderateScale(10),
                          }}
                          Icon={() => {
                            return (
                              <View
                                style={{
                                  height: 45,
                                  justifyContent: "center",
                                  alignItems: "center",
                                  alignContent: "center",
                                }}
                              >
                                <Icon
                                  name="caret-down"
                                  size={22}
                                  style={{ marginEnd: 10 }}
                                  color={theme.colors.gray03}
                                />
                              </View>
                            );
                          }}
                          value={this.state.Gender}
                          style={{ marginBottom: moderateScale(10) }}
                          placeholder={{
                            label: "Select Gender",
                            value: "",
                            color: theme.colors.gray02,
                          }}
                          placeholderTextColor={theme.colors.gray02}
                          onValueChange={(value) =>
                            this.setState({ Gender: value })
                          }
                          items={[
                            { label: "Male", value: "male" },
                            { label: "Female", value: "female" },
                          ]}
                        />
                      </View>
                    )}

                    {this.state.currentPosition === 2 && (
                      <View style={{ width: "100%" }}>
                        <RNPickerSelect
                          textInputProps={{
                            borderRadius: 5,
                            borderColor: theme.colors.gray05,
                            backgroundColor: theme.colors.gray06,
                            borderRadius: moderateScale(10),
                            borderWidth: 1,
                            height: 45,
                            paddingStart: 10,
                            ...(I18nManager.isRTL
                              ? { paddingEnd: 10, textAlign: "right" }
                              : {}),
                            marginBottom: moderateScale(10),
                          }}
                          Icon={() => {
                            return (
                              <View
                                style={{
                                  height: 45,
                                  justifyContent: "center",
                                  alignItems: "center",
                                  alignContent: "center",
                                }}
                              >
                                <Icon
                                  name="caret-down"
                                  size={22}
                                  style={{ marginEnd: 10 }}
                                  color={theme.colors.gray03}
                                />
                              </View>
                            );
                          }}
                          style={{ marginBottom: moderateScale(10) }}
                          placeholder={{
                            label: "Select Country",
                            value: "",
                            color: theme.colors.gray02,
                          }}
                          value={this.state.country}
                          placeholderTextColor={theme.colors.gray02}
                          onValueChange={(value) =>
                            this.setState({ country: value })
                          }
                          items={this.state.Countries}
                        />

                        <TextInput
                          label={translate("City")}
                          style={{
                            borderRadius: 5,
                            borderColor: theme.colors.gray05,
                            backgroundColor: theme.colors.gray06,
                            borderRadius: moderateScale(10),
                            borderWidth: 1,
                            height: 45,
                            paddingStart: 10,
                            ...(I18nManager.isRTL
                              ? { paddingEnd: 10, textAlign: "right" }
                              : {}),
                          }}
                          returnKeyType="next"
                          value={this.state.city}
                          placeholderTextColor={theme.colors.gray02}
                          placeholder={translate("City")}
                          onChangeText={(value) =>
                            this.setState({ city: value })
                          }
                          autoCapitalize="none"
                        />
                      </View>
                    )}

                    {this.state.currentPosition === 3 && (
                      <View style={{ width: "100%" }}>
                        <TextInput
                          label={translate("Password")}
                          style={{
                            borderRadius: 5,
                            borderColor: theme.colors.gray05,
                            backgroundColor: theme.colors.gray06,
                            borderRadius: moderateScale(10),
                            borderWidth: 1,
                            height: 45,
                            paddingStart: 10,
                            ...(I18nManager.isRTL
                              ? { paddingEnd: 10, textAlign: "right" }
                              : {}),
                          }}
                          returnKeyType="next"
                          placeholder={translate("Password")}
                          value={this.state.password}
                          placeholderTextColor={theme.colors.gray02}
                          onChangeText={(value) =>
                            this.setState({ password: value })
                          }
                          secureTextEntry
                        />

                        <TextInput
                          label={translate("Repeat Password")}
                          style={{
                            borderRadius: 5,
                            borderColor: theme.colors.gray05,
                            backgroundColor: theme.colors.gray06,
                            borderRadius: moderateScale(10),
                            borderWidth: 1,
                            height: 45,
                            paddingStart: 10,
                            ...(I18nManager.isRTL
                              ? { paddingEnd: 10, textAlign: "right" }
                              : {}),
                          }}
                          returnKeyType="next"
                          placeholder={translate("Repeat Password")}
                          value={this.state.conformPassword}
                          placeholderTextColor={theme.colors.gray02}
                          onChangeText={(value) =>
                            this.setState({ conformPassword: value })
                          }
                          secureTextEntry
                        />

                        <Text
                          style={{
                            marginTop: moderateScale(10),
                            marginHorizontal: moderateScale(10),
                            color: theme.colors.secondary,
                            paddingBottom: moderateScale(20),
                          }}
                        >
                          *Password must contain at least one letter and one
                          number
                        </Text>
                      </View>
                    )}

                    {this.state.currentPosition === 4 && (
                      <View style={{ width: "100%" }}>
                        <Input
                          labelStyle={{ color: theme.colors.secondary }}
                          containerStyle={{ paddingLeft: 0, paddingRight: 0 }}
                          inputContainerStyle={{
                            borderRadius: 5,
                            borderColor: theme.colors.gray05,
                            backgroundColor: theme.colors.gray06,
                            borderRadius: moderateScale(10),
                            borderWidth: 1,
                            height: 45,
                            ...(I18nManager.isRTL
                              ? { paddingEnd: 10, textAlign: "right" }
                              : {}),
                            marginBottom: moderateScale(10),
                          }}
                          inputStyle={{
                            textAlignVertical: "center",
                            height: "100%",
                            ...(I18nManager.isRTL
                              ? { textAlign: "right" }
                              : {}),
                            fontSize: moderateScale(12),
                          }}
                          returnKeyType="next"
                          leftIcon={
                            <Icon
                              name="facebook"
                              size={22}
                              style={{ marginEnd: 10 }}
                              color={theme.colors.gray03}
                            />
                          }
                          placeholder={translate("Facebook link")}
                          placeholderTextColor={theme.colors.gray02}
                          value={this.state.facebook}
                          onChangeText={(value) =>
                            this.setState({ facebook: value })
                          }
                        />

                        <Input
                          labelStyle={{ color: theme.colors.secondary }}
                          containerStyle={{ paddingLeft: 0, paddingRight: 0 }}
                          inputContainerStyle={{
                            borderRadius: 5,
                            borderColor: theme.colors.gray05,
                            backgroundColor: theme.colors.gray06,
                            borderRadius: moderateScale(10),
                            borderWidth: 1,
                            height: 45,
                            ...(I18nManager.isRTL
                              ? { paddingEnd: 10, textAlign: "right" }
                              : {}),
                            marginBottom: moderateScale(10),
                          }}
                          inputStyle={{
                            textAlignVertical: "center",
                            height: "100%",
                            ...(I18nManager.isRTL
                              ? { textAlign: "right" }
                              : {}),
                            fontSize: moderateScale(12),
                          }}
                          returnKeyType="next"
                          onSubmitEditing={() => {
                            this.onPress();
                          }}
                          leftIcon={
                            <Icon
                              name="instagram"
                              size={22}
                              style={{ marginEnd: 10 }}
                              color={theme.colors.gray03}
                            />
                          }
                          placeholder={translate("Instagram link")}
                          placeholderTextColor={theme.colors.gray02}
                          value={this.state.instragram}
                          onChangeText={(value) =>
                            this.setState({ instragram: value })
                          }
                        />
                      </View>
                    )}

                    <Button
                      isDisabled={!this.checkCanMove()}
                      mode="contained"
                      isLoading={this.state.isLoading}
                      style={{
                        borderColor: "transparent",
                        color: theme.colors.white,
                        backgroundColor: theme.colors.secondary,
                        borderRadius: moderateScale(10),
                        marginTop: moderateScale(20),
                      }}
                      textStyle={{
                        fontSize: moderateScale(20),
                        color: theme.colors.white,
                        fontWeight: "bold",
                      }}
                      onPress={() => this.onPress()}
                    >
                      {translate(
                        this.state.currentPosition !== 4 ? "Next" : "Register"
                      )}
                    </Button>
                  </View>
                </View>
              )}
            </KeyboardAwareScrollView>
            <View
              style={{
                backgroundColor: theme.colors.primary,
                height: 5,
                width: "100%",
                zIndex: 2,
                position: "absolute",
                bottom: 0,
              }}
            />
          </View>
          <View style={{ height: Dimensions.get("screen").height / 20 }} />
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      login: bindActionCreators(loginActions, dispatch),
    },
  };
};

const styles = StyleSheet.create({
  container_scrolling: {
    flex: 1,
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    marginTop: 0,
  },
  label: {
    color: theme.colors.gray04,
  },
  labelOr: {
    marginBottom: 10,
    fontSize: 20,
    marginTop: 10,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  container: {
    flex: 1,
    paddingEnd: 15,
    paddingStart: 15,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  separatorContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 10,
  },
  separatorLine: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    height: StyleSheet.hairlineWidth,
    borderColor: theme.colors.gray,
    borderWidth: 0.5,
  },
  separatorOr: {
    color: theme.colors.secondary,
    marginHorizontal: 20,
    fontSize: 18,
  },
  transparentButton: {
    marginTop: 30,
    borderColor: "#3B5699",
    borderWidth: 2,
  },
  inline: {
    flexDirection: "row",
  },
  buttonBlueText: {
    fontSize: 20,
    color: "#3B5699",
  },
  buttonBigText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  containerSocial: {
    width: "90%",
    flexDirection: "column",
  },
  GooglePlusStyle: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dc4e41",
    borderWidth: 1,
    borderColor: theme.colors.black,
    height: 40,
    borderRadius: 5,
    margin: 5,
  },
  FacebookStyle: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#485a96",
    borderWidth: 1,
    borderColor: theme.colors.black,
    height: 40,
    borderRadius: 5,
    margin: 5,
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
  },
  TextStyle: {
    color: "#fff",
    marginTop: 1,
    fontWeight: "600",
    marginStart: 10,
    marginRight: 20,
  },
  SeparatorLine: {
    backgroundColor: theme.colors.black,
    width: 1,
    height: 40,
  },
  placeholderText: {
    color: theme.colors.gray02,
  },
  text: {
    width: "100%",
    color: theme.colors.black,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Register));
