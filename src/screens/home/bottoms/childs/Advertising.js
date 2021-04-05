import React, { Component } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Linking, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../../../actions/Actions';
import { theme } from "../../../../core/theme";
import { moderateScale, scale } from 'react-native-size-matters';
import { BASE_API_URL_VIDEOS } from '../../../../services/config';




class Advertising extends Component {


    constructor(props) {
        super(props);

    }


    render() {


        return (
            <View style={{
                backgroundColor: theme.colors.white,
            }}>
                {this.props.advertising.length !== 0 &&
                    <FlatList
                        data={this.props.advertising}
                        horizontal={true}
                        contentContainerStyle={{
                            borderRadius: moderateScale(10), height: moderateScale(200), flex: 1
                        }}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <View
                                key={'top-category-' + index}
                                style={{
                                    borderRadius: moderateScale(10), height: moderateScale(200), width: "100%"
                                }}>


                                <TouchableOpacity style={{
                                    borderRadius: moderateScale(20),
                                }} onPress={() => {
                                    Linking.openURL(item.link);
                                }}>
                                    <ImageBackground source={{ uri: BASE_API_URL_VIDEOS + item.url }}
                                        imageStyle={{ borderRadius: moderateScale(10) }}
                                        style={{
                                            height: moderateScale(200),
                                            width: '100%', alignSelf: 'center', borderRadius: moderateScale(10),
                                        }} />
                                </TouchableOpacity>

                            </View>



                        )}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                    />

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
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Advertising))


