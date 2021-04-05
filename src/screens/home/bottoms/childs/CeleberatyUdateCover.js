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



class CeleberatyUdateCover extends Component {



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
        if (response.uri)
            this.setState({ uplaodfile: true, uplaodfileresponse: response })



        var data = new FormData();
        var photo = {
            uri: response.uri,
            type: response.type,
            name: 'uplaod.' + String(response.uri).split('/')[String(response.uri).split('/').length - 1],
        };
        data.append('file', photo);
        this.setState({ isLoading: true })

        this.setState({ isLoading: true })
        Apis.Post('file/image', data).then((data) => {
            console.log('colver data', data)
            this.props.data.userInfo.cover_image = data.originalname
            this.props.actions.product.updateProfile(this.props.data.userInfo, ((done) => {


                this.setState({ isLoading: false });
                if (this.props.readload) {
                    this.props.readload()
                }
                showSuccessPopup('Cover image successfully update.', 'Success!');


            }), ((error) => {
                this.setState({ isLoading: false });
                if (this.props.readload) {
                    this.props.readload()
                }

            }));




        }).catch((error) => {
            console.log(error);
            this.setState({ isLoading: false })
        })
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
                if (this.props.readload) {
                    this.props.readload()
                }
            }, 500);
        }).catch((error) => {
            console.log(error);
            this.setState({ isLoading: false })
        })
    }




    render() {

        return (
            <View style={{ flexDirection: 'row', position: 'absolute', top: moderateScale(5), left: moderateScale(20) }}>
                {this.props.isRightUser &&
                    <TouchableOpacity onPress={() => {

                        this.handlePress({ options: ["Select image", "Take image", "Cancel"], destructiveIndex: 2, image: true })

                    }} style={{
                        width: moderateScale(80),
                        height: moderateScale(20), backgroundColor: theme.colors.gray06 + '',
                        borderRadius: moderateScale(50), marginHorizontal: moderateScale(5), justifyContent: 'center', alignItems: 'center', position: 'absolute'
                    }}>
                        <Text style={{ color: theme.colors.black, fontSize: moderateScale(10) }}>
                            Update Cover</Text>
                    </TouchableOpacity>
                }
                <Loader isLoading={this.state.isLoading} />





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
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(CeleberatyUdateCover))


