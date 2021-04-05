import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Modal, ActionSheetIOS, I18nManager } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../../../actions/Actions';
import { theme } from "../../../../core/theme";
import { moderateScale } from 'react-native-size-matters';
import { TextAnimationShake } from 'react-native-text-effects';
import { BASE_API_URL_IMAEG_ORIGINAL, FONT_FAMILY } from '../../../../services/config';
import Icon from "react-native-vector-icons/FontAwesome";
import { Text } from '../../../../components/widget';
import * as ImagePicker from 'react-native-image-picker';
import * as Apis from '../../../../services/Apis';
import { showSuccessPopup, translate } from '../../../../utils/utils';
import { Input } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Video from 'react-native-video';
import Loader from '../../../../components/widget/loader';
import GuestHeaderButtton from './GuestHeaderButtton';



class CeleberatyHeader extends Component {



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
                showSuccessPopup('Thanks for uplaoding content.', 'Success!');
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
            <View style={{ width: '100%', flexDirection: 'row' }}>
                {!this.props.data.userInfo.email &&

                    <View style={{ width: '100%', backgroundColor: theme.colors.gray07, height: moderateScale(90), justifyContent: 'center', flexDirection: 'row', alignItems: 'center', alignContent: 'center', paddingHorizontal: moderateScale(10), paddingTop: moderateScale(20), marginTop: moderateScale(-25) }}>
                        <TouchableOpacity onPress={() => {  }}>
                            <Image source={require('../../../../assets/assets/logothumpnail.jpg')} resizeMode={"cover"} style={{
                                height: moderateScale(45), width: moderateScale(70), borderRadius: moderateScale(60),
                            }} />
                        </TouchableOpacity>


                        <View style={{ flex: 1, marginHorizontal: moderateScale(10), justifyContent: 'center', flexDirection: 'row', alignItems: 'center', alignContent: 'center', }}>
                            <TextAnimationShake value={'Hi Guest'} delay={100} duration={1000} fontSize={moderateScale(1)} style={{
                                color: theme.colors.black,
                                fontSize: moderateScale(20),
                                textAlign: 'center',
                                fontFamily: 'satisfy',
                                letterSpacing: 0.1
                            }} />
                        </View>

                        <GuestHeaderButtton {...this.props} />

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
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(CeleberatyHeader))


