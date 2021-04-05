import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Icon from "react-native-vector-icons/Ionicons";
import { bindActionCreators } from 'redux';
import * as loginActions from '../../../../actions/Actions';
import { theme } from "../../../../core/theme";
import { moderateScale, scale } from 'react-native-size-matters';
import { Text } from '../../../../components/widget';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { I18nManager } from 'react-native';
import IconBadge from 'react-native-icon-badge';
import { translate } from '../../../../utils/utils';
import SearchBar from 'react-native-search-bar';




class Header extends Component {






    render() {

        return (
            <View style={{
                paddingTop: getStatusBarHeight() + moderateScale(0), opacity: 1, backgroundColor: theme.colors.white,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
            }}>


                <View style={{
                    width: '100%',
                    position: 'absolute',
                    height: moderateScale(85),
                    paddingTop: getStatusBarHeight() + moderateScale(0), opacity: 0.5,
                }} />

                <View style={[{
                    flexDirection: 'row', backgroundColor: 'transparent',
                    paddingVertical: moderateScale(5),
                    alignItems: 'center',
                }]}>
                    <View style={{
                        flex: 1.8
                    }}>
                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'flex-start', flex: 1, }} onPress={() => {

                            if (this.props.backPrimary) {
                                this.props.hideModel()
                            } else {
                                if (this.props.backclick) {
                                    this.props.backclick()
                                }
                                else {
                                    this.props.navigation.navigate('Browse');
                                }
                            }
                        }
                        }>
                            {this.props.back &&
                                <Image source={require('app/assets/BACKBUTTON.png')} resizeMode="contain" style={{ height: scale(25), width: scale(25), marginHorizontal: moderateScale(10), ...I18nManager.isRTL ? { transform: [{ rotate: '180deg' }] } : {} }} />
                            }
                            {this.props.logoleft &&
                                <Image source={require('app/assets/assets/logwithname.png')} style={{
                                    height: scale(30), width: scale(100), marginHorizontal: moderateScale(10)
                                }} />
                            }

                        </TouchableOpacity>
                    </View>
                    {!this.props.searchView &&
                        <View style={[{
                            flex: 2.8,
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column'
                        }]}>


                            <View style={{
                                width: '100%', height: moderateScale(35), flexDirection: 'column',
                                justifyContent: 'center', alignItems: 'center', alignSelf: 'center', alignContent: 'center', 
                            }} />



                            {this.props.Text !== '' &&
                                <Text style={{
                                    textAlign: 'center', width: '100%', position: 'absolute',
                                    fontSize: moderateScale(15),
                                    color: theme.colors.secondary, textTransform: 'capitalize', alignSelf: 'center', fontWeight: '900'
                                }}>{this.props.Text}</Text>
                            }

                            {this.props.logo &&
                                <Image source={require('app/assets/assets/logwithname.png')} style={{
                                    height: scale(30), width: scale(100),
                                    position: 'absolute',
                                }} />
                            }
                        </View>
                    }

                    {this.props.share &&
                        <View style={[{
                            flex: 1.8, justifyContent: 'flex-end', alignContent: 'flex-end', alignItems: 'flex-end'
                        }]}>
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'flex-start', flex: 1, marginEnd: moderateScale(10) }} onPress={() => { this.props.shareClick() }}>
                                <Icon size={moderateScale(25)} name="ios-share-alt" color={theme.colors.primary} />
                            </TouchableOpacity>

                        </View>

                    }


                    {this.props.searchView &&
                        <View style={[{
                            flex: 11.8,
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column', height: moderateScale(40)
                        }]}>


                            <SearchBar
                                style={{ width: '100%', height: '100%', borderRadius: moderateScale(0) }}
                                ref="searchBar"
                                textFieldBackgroundColor={theme.colors.gray01}
                                showsCancelButtonWhileEditing={false}
                                onSearchButtonPress={(text) => {
                                    this.props.searchCeleb(text)
                                }}
                                onCancelButtonPress={() => {
                                    this.props.searchCeleb('')
                                }}
                                onChangeText={(text) => { if (text === '') this.props.searchCeleb('') }}
                                placeholder="Search"
                                hideBackground={true}
                            />

                        </View>

                    }




                    {!this.props.searchView && !this.props.share &&
                        <TouchableOpacity
                            onPress={() => {
                                if (this.props.search) {
                                    this.props.navigation.navigate('search')
                                }
                            }}
                            style={[{
                                flex: 1.8,
                                justifyContent: 'center',
                                alignContent: 'center',
                                alignItems: 'flex-end',
                                flexDirection: 'column',
                                marginHorizontal: moderateScale(10),
                            }]}>
                            {this.props.search &&
                                <Image resizeMode="contain" source={require('app/assets/search.png')} style={{
                                    height: scale(15), width: scale(15), tintColor: theme.colors.secondary
                                }} />
                            }
                        </TouchableOpacity>

                    }




                </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Header))


