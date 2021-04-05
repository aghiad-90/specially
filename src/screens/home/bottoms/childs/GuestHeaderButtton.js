import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Modal, ActionSheetIOS, I18nManager } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../../../actions/Actions';
import { theme } from "../../../../core/theme";
import { moderateScale } from 'react-native-size-matters';
import Icon from "react-native-vector-icons/FontAwesome";
import { Text } from '../../../../components/widget';
import * as ImagePicker from 'react-native-image-picker';
import * as Apis from '../../../../services/Apis';
import { showSuccessPopup, translate } from '../../../../utils/utils';
import Loader from '../../../../components/widget/loader';



class CeleberatyHeaderButtton extends Component {



    constructor(props) {

        super(props);
        this.state = {
            options: false, isLoading: false
        }
        this.inputRefs = {
        };
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
        this.setState({ uplaodfile: false, isLoading: true })
        Apis.Post(url, data).then((data) => {
            setTimeout(() => {
                showSuccessPopup('Thanks for uplaoding.', 'Success!');
                setTimeout(() => {
                    this.props.navigation.navigate('CeleberateDetails', { item: this.props.data.userInfo })
                }, 500);
                this.setState({ isLoading: false })
            }, 2000);
        }).catch((error) => {
            console.log(error);
            this.setState({ isLoading: false })
        })
    }






    render() {

        return (
            <View style={{
                flexDirection: 'row',
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            }}>
                <TouchableOpacity onPress={() => { this.setState({ options: true }) }} style={{
                    width: moderateScale(55),
                    height: moderateScale(55), backgroundColor: theme.colors.secondary, borderRadius: moderateScale(50), marginHorizontal: moderateScale(10), justifyContent: 'center', alignItems: 'center'
                }}>


                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: moderateScale(5), height: moderateScale(5), borderRadius: moderateScale(50), backgroundColor: theme.colors.white, marginHorizontal: moderateScale(1.5) }} />
                        <View style={{ width: moderateScale(5), height: moderateScale(5), borderRadius: moderateScale(50), backgroundColor: theme.colors.gray02, marginHorizontal: moderateScale(1.5) }} />
                    </View>


                </TouchableOpacity>
                <Loader isLoading={this.state.isLoading} />

                {this.state.options &&
                    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: "center", }}>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={this.state.options}
                            onRequestClose={() => {
                                this.setState({ options: false })
                            }}
                            onDismiss={() => {
                                this.setState({ options: false })
                            }}>


                            <View style={{
                                flex: 1,
                                alignItems: 'center',
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                                backgroundColor: theme.colors.gray03 + '70'
                            }}>



                                <TouchableOpacity onPress={() => {
                                    this.setState({ options: false });
                                }}
                                    style={{ flex: 1, height: '100%', width: '90%', flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginHorizontal: moderateScale(30) }}>
                                    <TouchableOpacity onPress={() => {
                                        this.setState({ options: false });
                                        setTimeout(() => {
                                            this.props.navigation.navigate('Register')
                                        }, (100));
                                    }} style={{ width: moderateScale(80), height: moderateScale(80), backgroundColor: theme.colors.white, borderRadius: moderateScale(50), marginHorizontal: moderateScale(10), justifyContent: 'center', alignItems: 'center' }}>


                                        <Icon
                                            name="sign-in"
                                            size={moderateScale(30)}
                                            color={theme.colors.black}
                                        />
                                        <Text style={{
                                            color: theme.colors.black,
                                            fontSize: moderateScale(10), textAlign: 'center', textTransform: 'capitalize', fontWeight: 'bold', marginTop: moderateScale(8)
                                        }}>{'Register'}</Text>

                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => {
                                        this.setState({ options: false }); setTimeout(() => {

                                            this.props.navigation.navigate('Login')

                                        }, 100);
                                    }} style={{ width: moderateScale(80), height: moderateScale(80), backgroundColor: '#988E8C', borderRadius: moderateScale(50), marginHorizontal: moderateScale(10), justifyContent: 'center', alignItems: 'center' }}>


                                        <Icon
                                            name="lock"
                                            size={moderateScale(28)}
                                            color={theme.colors.white}
                                        />
                                        <Text style={{
                                            color: theme.colors.white,
                                            fontSize: moderateScale(10), textAlign: 'center', textTransform: 'capitalize', fontWeight: 'bold', marginTop: moderateScale(8)
                                        }}>{'Login'}</Text>


                                    </TouchableOpacity>


                                </TouchableOpacity>

                            </View>
                        </Modal>
                    </View>
                }




            </View>

        );
    }

}

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
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(CeleberatyHeaderButtton))


