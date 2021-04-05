import React, { Component } from 'react';
import { View, StyleSheet, Image, FlatList, TouchableOpacity, Share } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../../../actions/Actions';
import { theme } from "../../../../core/theme";
import { moderateScale, scale } from 'react-native-size-matters';
import { Text } from '../../../../components/widget';
import { BASE_API_URL_IMAEG_ORIGINAL } from '../../../../services/config';
import moment from 'moment';
import { translate } from '../../../../utils/utils';
import Icon from 'react-native-vector-icons/FontAwesome'
import dynamicLinks from '@react-native-firebase/dynamic-links';




class News extends Component {


    constructor(props) {
        super(props);

    }


    render() {


        return (
            <View style={{
                backgroundColor: theme.colors.white, marginTop: moderateScale(10), margin: moderateScale(5), paddingBottom: moderateScale(100)
            }}>
                {this.props.news.length !== 0 &&
                    <FlatList
                        data={this.props.news}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ marginTop: moderateScale(40) }}
                        renderItem={({ item, index }) => (
                            <View
                                key={'top-category-' + index}
                                style={{
                                    flex: 1,
                                    flexDirection: 'column',
                                    margin: moderateScale(5),
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.20,
                                    shadowRadius: 1.41, backgroundColor: theme.colors.white, borderRadius: moderateScale(10)
                                }}>
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.navigate('NewsDetails', { item: item })
                                }} style={{ flexDirection: 'column', width: '100%' }}>
                                    <View style={{ height: moderateScale(150), width: '100%', justifyContent: 'center', zIndex: 10, }}>
                                        <Image source={{ uri: (BASE_API_URL_IMAEG_ORIGINAL + item.images[0]) }} resizeMode={'cover'} style={{
                                            height: moderateScale(150), width: '100%', borderRadius: moderateScale(0), borderRadius: moderateScale(10), zIndex: 2,
                                        }} />

                                        <TouchableOpacity style={{ position: 'absolute', zIndex: 10, right: 0, top: 0, marginEnd: moderateScale(5), marginTop: moderateScale(5) }} onPress={async () => {

                                            await dynamicLinks().buildShortLink({
                                                link: 'https://sbisiali.com/news/' + item._id,
                                                // domainUriPrefix is created in your Firebase console
                                                domainUriPrefix: 'https://sbisiali.page.link',
                                                // "banner". This also needs setting up before hand
                                                social: {
                                                    descriptionText: item.source_name,
                                                    imageUrl: (BASE_API_URL_IMAEG_ORIGINAL + item.images[0]),
                                                    title: item.name

                                                },
                                                ios: {
                                                    bundleId: 'com.crowd.spesially',
                                                },
                                                android: {
                                                    packageName: 'com.crowddigital.espacialty',
                                                },
                                                analytics: {
                                                    campaign: 'banner',
                                                },
                                            }).then(async (data) => {

                                                try {
                                                    const result = await Share.share({
                                                        message: data,
                                                    });
                                                    if (result.action === Share.sharedAction) {
                                                        if (result.activityType) {
                                                            // shared with activity type of result.activityType
                                                        } else {
                                                            // shared
                                                        }
                                                    } else if (result.action === Share.dismissedAction) {
                                                        // dismissed
                                                    }
                                                } catch (error) {
                                                    alert(error.message);
                                                }

                                            }).catch((error) => {
                                                console.log(error)
                                            });

                                        }}>
                                            <Icon size={moderateScale(30)} name="share-square" color={theme.colors.primary} style={{
                                                height: moderateScale(30), width: moderateScale(30),
                                            }} />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ width: '100%', zIndex: 0, marginTop: moderateScale(10) }}>

                                        <View style={{
                                            flex: 1, flexDirection: 'row',
                                            alignItems: 'center', alignContent: 'center', marginHorizontal: moderateScale(5), marginBottom: moderateScale(5), borderBottomWidth: moderateScale(0.5), borderBottomColor: theme.colors.gray05, paddingBottom: moderateScale(5)
                                        }}>
                                            <Image resizeMode="contain"
                                                style={{
                                                    height: moderateScale(15), width: moderateScale(15), marginEnd: moderateScale(5)
                                                }}
                                                source={require('app/assets/assets/link.png')}
                                            />
                                            <Text num style={[{
                                                fontWeight: 'bold',
                                                fontSize: moderateScale(12), flex: 1
                                            }]}>{item.source_name}</Text>
                                            {Number(item.istrending) === 1
                                                && <Image resizeMode="contain"
                                                    style={{
                                                        height: moderateScale(15), width: moderateScale(15), marginEnd: moderateScale(5)
                                                    }}
                                                    source={require('app/assets/assets/hot.gif')}
                                                />
                                            }
                                        </View>
                                        <Text style={[{
                                            fontWeight: 'bold',
                                            fontSize: moderateScale(15),
                                            marginHorizontal: moderateScale(5),
                                        }]}>{item.title}</Text>

                                        <View style={{
                                            flex: 1, flexDirection: 'row',
                                            alignItems: 'center', alignContent: 'center', marginBottom: moderateScale(5), marginTop: moderateScale(3)
                                        }}>


                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center', alignContent: 'center', marginHorizontal: moderateScale(5), marginBottom: moderateScale(5), borderRadius: moderateScale(5), borderWidth: moderateScale(0.5), padding: moderateScale(2), paddingHorizontal: moderateScale(5)
                                            }}>
                                                <Image resizeMode="contain"
                                                    style={{
                                                        height: moderateScale(10), width: moderateScale(10), marginEnd: moderateScale(5)
                                                    }}
                                                    source={require('app/assets/assets/time.png')}
                                                />
                                                <Text style={[{
                                                    fontWeight: 'bold',
                                                    fontSize: moderateScale(8),
                                                }]}>{moment(new Date(item.dateTime)).format('ll')}</Text>
                                            </View>


                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center', alignContent: 'center', marginHorizontal: moderateScale(5), marginBottom: moderateScale(5), borderRadius: moderateScale(5), borderWidth: moderateScale(0.5), padding: moderateScale(2), paddingHorizontal: moderateScale(5)
                                            }}>
                                                <Icon size={moderateScale(10)} name="eye" color={'#3f729b'} style={{
                                                    height: moderateScale(10), width: moderateScale(10), marginEnd: moderateScale(5)
                                                }} />

                                                <Text style={[{
                                                    fontWeight: 'bold',
                                                    fontSize: moderateScale(8),
                                                }]}>{item.views + ' views'}</Text>
                                            </View>

                                        </View>
                                    </View>
                                </TouchableOpacity>

                            </View>



                        )}
                        showsVerticalScrollIndicator={false}

                        keyExtractor={(item, index) => index.toString()}
                    />

                }

                {this.props.news.length === 0 && !this.props.isLoading &&
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


