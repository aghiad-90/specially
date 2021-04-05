import React, { Component } from 'react';
import { StyleSheet, StatusBar, ActionSheetIOS, Image, View, TouchableOpacity } from 'react-native'
import { theme } from '../../../../core/theme';
import { Block, Text, } from '../../../../components/widget';
import * as loginActions from '../../../../actions/Actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../childs/Header';
import { translate } from '../../../../utils/utils';

import { moderateScale } from 'react-native-size-matters';




import * as ImagePicker from 'react-native-image-picker';
import * as Apis from '../../../../services/Apis';
import { showSuccessPopup } from '../../../../utils/utils';
import Loader from '../../../../components/widget/loader';
import { BASE_API_URL_IMAEG_ORIGINAL } from '../../../../services/config';




class VerificationProcesss extends Component {


    videoPlayer = [];
    GiftvideoPlayer = [];


    constructor(props) {
        super(props);
        this.state = {
            isLoading: false, uri: '', response: {}
        }

    }


    componentDidMount() {

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
                            quality: 0.5,
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
                            quality: 0.5,
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
        this.setState({ uri: response.uri, response: response })
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

        console.log(this.props.data.userInfo)

        return (
            <Block>
                <StatusBar backgroundColor="transparent" barStyle="light-content" />
                <Header search={false} back={false} back={true} navigation={this.props.navigation} backclick={() => { this.props.navigation.pop() }} Text={translate('Verification Processs')} />



                <View style={{ marginTop: moderateScale(10) }}>



                    <Text style={{ color: theme.colors.black, fontSize: moderateScale(15), fontWeight: '500', textTransform: 'capitalize', alignSelf: 'center', textAlign: 'center', padding: moderateScale(20), }}>
                        {'verified your account by uploading your authorized document'}
                    </Text>

                    <View style={{ flexDirection: 'row', width: '80%', alignSelf: 'center' }}>
                        <TouchableOpacity onPress={() => {

                            this.handlePress({ options: ["Select image", "Take image", "Cancel"], destructiveIndex: 2, image: true })

                        }} style={{
                            height: moderateScale(35), backgroundColor: theme.colors.gray06 + '',
                            borderRadius: moderateScale(50), marginHorizontal: moderateScale(10), justifyContent: 'center', alignItems: 'center', flex: 1
                        }}>
                            <Text style={{ color: theme.colors.black, fontSize: moderateScale(15), fontWeight: '400' }}>
                                Choose Image</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {



                            var response = this.state.response;

                            if (response.uri) {

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
                                    console.log('colver data', data.original.path)
                                    this.props.data.userInfo.veriticaiton_image = data.originalname
                                    this.props.actions.updateProfile(this.props.data.userInfo, ((done) => {

                                        this.setState({ isLoading: false });
                                        showSuccessPopup('Uploaded successfully.', 'Success!');
                                        this.props.navigation.pop();


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


                        }} style={{
                            height: moderateScale(35), backgroundColor: theme.colors.secondary + '',
                            borderRadius: moderateScale(50), marginHorizontal: moderateScale(10), justifyContent: 'center', alignItems: 'center', flex: 1
                        }}>
                            <Text style={{ color: theme.colors.white, fontSize: moderateScale(15), fontWeight: '400' }}>
                                Upload</Text>
                        </TouchableOpacity>
                    </View>



                    <View style={{ flexDirection: 'row', width: '80%', alignSelf: 'center', borderWidth: moderateScale(1), height: moderateScale(300), marginTop: moderateScale(50), borderRadius: moderateScale(15), padding: moderateScale(10), }}>
                        <Image source={{ uri: this.state.uri }} style={{ width: '100%', height: '100%', borderRadius: moderateScale(15) }} />
                    </View>


                </View>
                <Loader isLoading={this.state.isLoading} />




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
    actions: bindActionCreators(loginActions, dispatch)
})


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        backgroundColor: '#fff',
    },

});
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(VerificationProcesss))