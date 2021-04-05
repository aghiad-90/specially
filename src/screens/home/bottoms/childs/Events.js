import React, { Component } from 'react';
import { View, StyleSheet, Image, FlatList, TouchableOpacity, I18nManager, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../../../actions/Actions';
import { theme } from "../../../../core/theme";
import { moderateScale, scale } from 'react-native-size-matters';
import { Text } from '../../../../components/widget';
import { BASE_API_URL_IMAEG_ORIGINAL } from '../../../../services/config';
import moment from 'moment';
import { translate } from '../../../../utils/utils';
import { getStatusBarHeight } from 'react-native-status-bar-height';



class News extends Component {


    constructor(props) {
        super(props);

    }


    render() {

        console.log(this.props.events)

        return (
            <View style={{
                backgroundColor: theme.colors.white, marginTop: moderateScale(0), margin: moderateScale(5), flex: 1, opacity: 0.1,
            }}>
                {this.props.events.length !== 0 &&
                    <FlatList
                        data={this.props.events}
                        numColumns={2}
                        refreshControl={
                            <RefreshControl refreshing={this.props.isLoading} tintColor={theme.colors.secondary} onRefresh={() => {
                                this.props.onRefresh()
                            }} />
                        }
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ marginTop: moderateScale(20) }}
                        renderItem={({ item, index }) => (
                            <View
                                key={'top-category-' + index}
                                style={{
                                    flex: 1 / 2,
                                    flexDirection: 'column',
                                    margin: moderateScale(5),
                                    shadowColor: theme.colors.primary,
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.20,
                                    shadowRadius: 1.41, backgroundColor: theme.colors.white, borderRadius: moderateScale(10), borderWidth: moderateScale(1), borderColor: theme.colors.primary
                                }}>
                                <TouchableOpacity onPress={() => {

                                }} style={{ flexDirection: 'column', width: '100%' }}>

                                    <View style={{ height: moderateScale(150), width: '100%', justifyContent: 'center', zIndex: 10, }}>
                                        <Image source={{ uri: (BASE_API_URL_IMAEG_ORIGINAL + item.image) }} resizeMode={'cover'} style={{
                                            height: moderateScale(150), width: '100%', borderRadius: moderateScale(0), borderRadius: moderateScale(10), zIndex: 2,
                                        }} />
                                    </View>

                                    <View style={{ width: '100%', zIndex: 0, marginTop: moderateScale(5) }}>


                                        <View style={{
                                            flex: 1, flexDirection: 'row',
                                            alignItems: 'center', alignContent: 'center', marginHorizontal: moderateScale(5), marginBottom: moderateScale(5), borderBottomWidth: moderateScale(0.5), borderBottomColor: theme.colors.gray05, paddingBottom: moderateScale(5)
                                        }}>
                                            <Text style={[{
                                                fontWeight: 'bold',
                                                fontSize: moderateScale(20),
                                                textTransform: 'capitalize', color: theme.colors.secondary,
                                                textAlign: 'center',
                                            }]}>{item.title}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={[{
                                                fontWeight: 'bold',
                                                fontSize: moderateScale(15),
                                                textTransform: 'capitalize', flex: 1,
                                                marginHorizontal: moderateScale(5), marginHorizontal: moderateScale(5)
                                            }]}>{item.location}</Text>

                                            <Text style={[{
                                                fontWeight: 'bold',
                                                fontSize: moderateScale(15),
                                                textTransform: 'capitalize',
                                                marginHorizontal: moderateScale(5), marginHorizontal: moderateScale(5)
                                            }]}>{item.price + '$'}</Text>
                                        </View>

                                        <Text style={[{
                                            fontWeight: 'bold',
                                            fontSize: moderateScale(10),
                                            textTransform: 'capitalize',
                                            marginHorizontal: moderateScale(5), marginHorizontal: moderateScale(5), alignSelf: 'flex-end'
                                        }]}>{moment(new Date(item.date)).format('d MMM YYYY')}</Text>
                                        <View style={{
                                            flex: 1, flexDirection: 'row',
                                            alignItems: 'center', alignContent: 'center', marginBottom: moderateScale(5), marginTop: moderateScale(3), justifyContent: 'center'
                                        }}>

                                            <TouchableOpacity onPress={() => { }} style={{
                                                marginHorizontal: moderateScale(0), backgroundColor: theme.colors.secondary,
                                                width: '90%', height: moderateScale(30), alignItems: 'center', borderRadius: moderateScale(10), justifyContent: 'center', borderColor: theme.colors.secondary, borderWidth: moderateScale(0.5), alignSelf: 'center'
                                            }}>
                                                <Text style={[styles.heading, {
                                                    ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold', textAlign: 'center',
                                                    color: theme.colors.white, fontSize: moderateScale(13),
                                                }]}>{'Book Live'}</Text>
                                            </TouchableOpacity>


                                        </View>
                                    </View>
                                </TouchableOpacity>

                            </View>



                        )}
                        showsVerticalScrollIndicator={false}

                        keyExtractor={(item, index) => index.toString()}
                    />

                }

                {this.props.events.length === 0 && !this.props.isLoading &&
                    <View style={{
                        flexDirection: 'column', alignItems: 'center', alignContent: 'center', alignSelf: 'center', marginTop: moderateScale(40)
                    }}>
                        <Image resizeMode="contain"
                            style={{
                                height: moderateScale(100), width: moderateScale(100), marginEnd: moderateScale(5)
                            }}
                            source={require('app/assets/assets/logwithname.png')}
                        />
                        <Text style={{
                            color: theme.colors.secondary,
                            fontSize: moderateScale(20), textAlign: 'center', margin: moderateScale(10), textTransform: 'capitalize', marginBottom: moderateScale(20), marginTop: moderateScale(0)
                        }}>{translate('Sorry no items found'.toUpperCase()).toUpperCase()}</Text>
                    </View>
                }




            </View>
        );
    }

}


const styles = StyleSheet.create({
    container_scrolling: {
        flex: 1,
        backgroundColor: theme.colors.white,

    },
    wrapper: {
        flex: 1,
        backgroundColor: theme.colors.gray06
    },
    wrapperCategory: {
        paddingRight: 0,
        paddingStart: scale(8),
        flex: 1
    },

    exampleContainer: {
        paddingVertical: moderateScale(15),
    },
    sliderContentContainer: {
        paddingVertical: 0,
    },
    slider: {
        marginTop: 0,
        overflow: 'visible',
    },
    card: {
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    heading: {
        fontSize: moderateScale(14),
        color: theme.colors.primary,
        width: '100%', fontWeight: '500', alignSelf: 'flex-start'
    }
});



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
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(News))


