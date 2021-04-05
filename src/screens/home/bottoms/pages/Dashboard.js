import React, { Component } from 'react';
import { StyleSheet, StatusBar, View, Image } from 'react-native'
import { theme } from '../../../../core/theme';
import { Block, Text, } from '../../../../components/widget';
import * as loginActions from '../../../../actions/Actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../childs/Header';
import { moderateScale } from 'react-native-size-matters';
import { showSuccessPopup, translate } from '../../../../utils/utils';
import { TouchableOpacity } from 'react-native-gesture-handler';



class Dashboard extends Component {


    videoPlayer = [];
    GiftvideoPlayer = [];


    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        }

    }


    componentDidMount() {
        console.log(this.props.data.userInfo)
    }


    render() {

        return (
            <Block>
                <StatusBar backgroundColor="transparent" barStyle="light-content" />
                <Header search={false} back={false} back={true} navigation={this.props.navigation} backclick={() => { this.props.navigation.pop() }} Text={translate('Dashboard')} />
                <View style={{ flexDirection: 'row', marginTop: moderateScale(0), width: '100%', padding: moderateScale(20) }}>
                    <View style={{
                        backgroundColor: theme.colors.white,
                        borderRadius: moderateScale(4),
                        alignSelf: 'center', marginVertical: moderateScale(5),
                        shadowColor: theme.colors.gray03, shadowOffset: {
                            width: 0,
                            height: 2,
                        }, shadowOpacity: 0.25, shadowRadius: 3.84, flex: 1, height: moderateScale(160), marginEnd: moderateScale(10)
                    }}>
                        <TouchableOpacity activeOpacity={this.props.data.userInfo.verified ? 0.6 : 1} style={{ width: '100%', height: '100%', ... this.props.data.userInfo.verified ? {} : { backgroundColor: theme.colors.gray06 } }} onPress={() => {
                            if (this.props.data.userInfo.verified)
                                this.props.navigation.navigate('Requests')
                        }}>
                            <View style={{ flexDirection: 'column', justifyContent: 'center', flex: 1 }}>

                                <View style={{ flexDirection: 'column', alignSelf: 'center', justifyContent: 'center', alignContent: 'center', alignItems: 'center', }}>
                                    <Image source={require('app/assets/assets/requests.png')} resizeMode={'stretch'} style={{
                                        height: moderateScale(50), width: moderateScale(50), marginHorizontal: moderateScale(10), marginTop: moderateScale(20)
                                    }} />
                                    <Text style={[styles.heading, {
                                        fontWeight: '500', textAlign: 'center',
                                        color: theme.colors.secondary, fontSize: moderateScale(19), marginHorizontal: moderateScale(0), marginVertical: moderateScale(10)
                                    }]}>{'Requests'}</Text>
                                </View>

                                <View style={{ flexDirection: 'column' }}>
                                    <View style={{ width: '70%', height: moderateScale(.6), backgroundColor: theme.colors.gray05, alignSelf: 'center' }} />
                                    <Text style={[{
                                        fontWeight: '500', textAlign: 'center',
                                        color: theme.colors.secondary, fontSize: moderateScale(10), marginHorizontal: moderateScale(0), marginVertical: moderateScale(10), width: '100%', textTransform: 'capitalize'
                                    }]}>{'check requests'}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        backgroundColor: theme.colors.white,
                        borderRadius: moderateScale(4),
                        alignSelf: 'center', marginVertical: moderateScale(5),
                        shadowColor: theme.colors.gray03, shadowOffset: {
                            width: 0,
                            height: 2,
                        }, shadowOpacity: 0.25, shadowRadius: 3.84, flex: 1, height: moderateScale(160), marginEnd: moderateScale(10)
                    }}>
                        <TouchableOpacity onPress={() => {
                            showSuccessPopup('Sit tight Sbisiali team is working on it.', 'Coming Soon', null)
                        }} activeOpacity={this.props.data.userInfo.verified ? 0.6 : 1} style={{ width: '100%', height: '100%', ... this.props.data.userInfo.verified ? {} : { backgroundColor: theme.colors.gray06 } }}>
                            <View style={{ flexDirection: 'column', justifyContent: 'center', flex: 1 }}>

                                <View style={{ flexDirection: 'column', alignSelf: 'center', justifyContent: 'center', alignContent: 'center', alignItems: 'center', }}>
                                    <Image source={require('app/assets/assets/workshops.png')} resizeMode={'stretch'} style={{
                                        height: moderateScale(50), width: moderateScale(50), marginHorizontal: moderateScale(10), marginTop: moderateScale(20)
                                    }} />
                                    <Text style={[styles.heading, {
                                        fontWeight: '500', textAlign: 'center',
                                        color: theme.colors.secondary, fontSize: moderateScale(19), marginHorizontal: moderateScale(0), marginVertical: moderateScale(10)
                                    }]}>{'WorkShops'}</Text>
                                </View>

                                <View style={{ flexDirection: 'column' }}>
                                    <View style={{ width: '70%', height: moderateScale(.6), backgroundColor: theme.colors.gray05, alignSelf: 'center' }} />
                                    <Text style={[{
                                        fontWeight: '500', textAlign: 'center',
                                        color: theme.colors.secondary, fontSize: moderateScale(10), marginHorizontal: moderateScale(0), marginVertical: moderateScale(10), width: '100%', textTransform: 'capitalize'
                                    }]}>{'check workshops'}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>


                </View>


                <View style={{ flexDirection: 'row', marginTop: moderateScale(0), width: '100%', padding: moderateScale(20), marginTop: moderateScale(-40) }}>

                    <View style={{
                        backgroundColor: theme.colors.white,
                        borderRadius: moderateScale(4),
                        alignSelf: 'center', marginVertical: moderateScale(5),
                        shadowColor: theme.colors.gray03, shadowOffset: {
                            width: 0,
                            height: 2,
                        }, shadowOpacity: 0.25, shadowRadius: 3.84, flex: 1, height: moderateScale(160), marginEnd: moderateScale(10)
                    }}>
                        <TouchableOpacity activeOpacity={this.props.data.userInfo.verified ? 0.6 : 1} style={{ width: '100%', height: '100%', ... this.props.data.userInfo.verified ? {} : { backgroundColor: theme.colors.gray06 } }} onPress={() => {
                            if (this.props.data.userInfo.verified)
                                this.props.navigation.navigate('Pricing')
                        }}>
                            <View style={{ flexDirection: 'column', justifyContent: 'center', flex: 1 }}>

                                <View style={{ flexDirection: 'column', alignSelf: 'center', justifyContent: 'center', alignContent: 'center', alignItems: 'center', }}>
                                    <Image source={require('app/assets/assets/money.png')} resizeMode={'stretch'} style={{
                                        height: moderateScale(50), width: moderateScale(50), marginHorizontal: moderateScale(10), marginTop: moderateScale(20)
                                    }} />
                                    <Text style={[styles.heading, {
                                        fontWeight: '500', textAlign: 'center',
                                        color: theme.colors.secondary, fontSize: moderateScale(19), marginHorizontal: moderateScale(0), marginVertical: moderateScale(10)
                                    }]}>{'Money'}</Text>
                                </View>

                                <View style={{ flexDirection: 'column' }}>
                                    <View style={{ width: '70%', height: moderateScale(.6), backgroundColor: theme.colors.gray05, alignSelf: 'center' }} />
                                    <Text style={[{
                                        fontWeight: '500', textAlign: 'center',
                                        color: theme.colors.secondary, fontSize: moderateScale(10), marginHorizontal: moderateScale(0), marginVertical: moderateScale(10), width: '100%', textTransform: 'capitalize'
                                    }]}>{'check your balance'}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        backgroundColor: theme.colors.white,
                        borderRadius: moderateScale(4),
                        alignSelf: 'center', marginVertical: moderateScale(5),
                        shadowColor: theme.colors.gray03, shadowOffset: {
                            width: 0,
                            height: 2,
                        }, shadowOpacity: 0.25, shadowRadius: 3.84, flex: 1, height: moderateScale(160), marginEnd: moderateScale(10)
                    }}>
                        <TouchableOpacity style={{ width: '100%', height: '100%' }} onPress={() => {
                            this.props.navigation.navigate('MyContract')
                        }}>
                            <View style={{ flexDirection: 'column', justifyContent: 'center', flex: 1 }}>

                                <View style={{ flexDirection: 'column', alignSelf: 'center', justifyContent: 'center', alignContent: 'center', alignItems: 'center', }}>
                                    <Image source={require('app/assets/assets/pricing.png')} resizeMode={'stretch'} style={{
                                        height: moderateScale(50), width: moderateScale(50), marginHorizontal: moderateScale(10), marginTop: moderateScale(20)
                                    }} />
                                    <Text style={[styles.heading, {
                                        fontWeight: '500', textAlign: 'center',
                                        color: theme.colors.secondary, fontSize: moderateScale(19), marginHorizontal: moderateScale(0), marginVertical: moderateScale(10)
                                    }]}>{'My Contact'}</Text>
                                </View>

                                <View style={{ flexDirection: 'column' }}>
                                    <View style={{ width: '70%', height: moderateScale(.6), backgroundColor: theme.colors.gray05, alignSelf: 'center' }} />
                                    <Text style={[{
                                        fontWeight: '500', textAlign: 'center',
                                        color: theme.colors.secondary, fontSize: moderateScale(10), marginHorizontal: moderateScale(0), marginVertical: moderateScale(10), width: '100%', textTransform: 'capitalize'
                                    }]}>{'check your contact'}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>


                </View>
                <View style={{ flexDirection: 'row', marginTop: moderateScale(0), width: '100%', padding: moderateScale(20), marginTop: moderateScale(-40) }}>

                    <View style={{
                        backgroundColor: theme.colors.white,
                        borderRadius: moderateScale(4),
                        alignSelf: 'center', marginVertical: moderateScale(5),
                        shadowColor: theme.colors.gray03, shadowOffset: {
                            width: 0,
                            height: 2,
                        }, shadowOpacity: 0.25, shadowRadius: 3.84, flex: 1, height: moderateScale(160), marginEnd: moderateScale(10)
                    }}>
                        <TouchableOpacity activeOpacity={this.props.data.userInfo.verified ? 0.6 : 1} style={{ width: '100%', height: '100%', ... this.props.data.userInfo.verified ? {} : { backgroundColor: theme.colors.gray06 } }} onPress={() => {
                            if (this.props.data.userInfo.verified)
                                this.props.navigation.navigate('Money')
                        }}>
                            <View style={{ flexDirection: 'column', justifyContent: 'center', flex: 1 }}>

                                <View style={{ flexDirection: 'column', alignSelf: 'center', justifyContent: 'center', alignContent: 'center', alignItems: 'center', }}>
                                    <Image source={require('app/assets/assets/mycontact.png')} resizeMode={'stretch'} style={{
                                        height: moderateScale(50), width: moderateScale(50), marginHorizontal: moderateScale(10), marginTop: moderateScale(20)
                                    }} />
                                    <Text style={[styles.heading, {
                                        fontWeight: '500', textAlign: 'center',
                                        color: theme.colors.secondary, fontSize: moderateScale(19), marginHorizontal: moderateScale(0), marginVertical: moderateScale(10)
                                    }]}>{'Pricing'}</Text>
                                </View>

                                <View style={{ flexDirection: 'column' }}>
                                    <View style={{ width: '70%', height: moderateScale(.6), backgroundColor: theme.colors.gray05, alignSelf: 'center' }} />
                                    <Text style={[{
                                        fontWeight: '500', textAlign: 'center',
                                        color: theme.colors.secondary, fontSize: moderateScale(10), marginHorizontal: moderateScale(0), marginVertical: moderateScale(10), width: '100%', textTransform: 'capitalize'
                                    }]}>{'check pricing'}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>


                </View>

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
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Dashboard))