import React, { Component } from 'react';
import { StyleSheet, StatusBar, Dimensions, Image, View, TouchableOpacity } from 'react-native'
import { theme } from '../../../../core/theme';
import { Block, Text, } from '../../../../components/widget';
import * as loginActions from '../../../../actions/Actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../childs/Header';
import { translate } from '../../../../utils/utils';
import Pdf from 'react-native-pdf';
import Icon from 'react-native-vector-icons/Ionicons';

import { moderateScale } from 'react-native-size-matters';



class MyContract extends Component {


    videoPlayer = [];
    GiftvideoPlayer = [];


    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        }

    }


    componentDidMount() {

    }


    render() {
        const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true };

        return (
            <Block>
                <StatusBar backgroundColor="transparent" barStyle="light-content" />
                <Header search={false} back={false} back={true} navigation={this.props.navigation} backclick={() => { this.props.navigation.pop() }} Text={translate('My Contact')} />


                <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages, filePath) => {
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page, numberOfPages) => {
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link presse: ${uri}`)
                    }}
                    style={{
                        flex: 1,
                        width: Dimensions.get('window').width,
                        height: Dimensions.get('window').height,
                    }} />


                {this.props.data.userInfo.verified === 0 &&
                    <View style={{
                        position: 'absolute', bottom: Dimensions.get('window').height === 812 ? moderateScale(90) : moderateScale(50),
                        right: moderateScale(20),
                        height: moderateScale(50),
                    }}>
                        <TouchableOpacity
                            onPress={() => { this.props.navigation.navigate('VerificationProcesss') }}
                            style={{
                                shadowColor: theme.colors.secondary,
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                justifyContent: 'center',
                                width: moderateScale(50),
                                height: moderateScale(50),
                                backgroundColor: theme.colors.secondary,
                                borderRadius: moderateScale(100), zIndex: 999999, justifyContent: 'center', alignItems: 'center'
                            }}
                        >
                            <Icon name="md-checkmark-circle" color={theme.colors.green} size={moderateScale(25)}
                            />
                        </TouchableOpacity>
                    </View>

                }




            </Block>
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
        about: bindActionCreators(loginActions, dispatch)
    }
})


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        backgroundColor: '#fff',
    },

});
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(MyContract))