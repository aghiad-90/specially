import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, FlatList, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../../../actions/Actions';
import { theme } from "../../../../core/theme";
import { moderateScale, scale } from 'react-native-size-matters';
import { Text } from '../../../../components/widget';
import { translate } from '../../../../utils/utils';
import moment from 'moment'
import { TextInput } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Icon from 'react-native-vector-icons/Ionicons'
import * as Apis from '../../../../services/Apis';

import { PopupOptions } from '../../../../components/options';





class CeleberatyUdateCover extends Component {



    constructor(props) {

        super(props);
        this.state = {
            options: false, isLoading: false, text: ''
        }
        this.inputRefs = {
        };
    }



    componentDidMount() {
        this.scrooltoBottom()
    }

    scrooltoBottom() {
        setTimeout(() => {
            try {
                this.FlatListRef.scrollToEnd();
            } catch (ex) { }
        }, 500);
    }



    checkIfSameUser(item) {
        return this.props.data.userInfo._id === item.userObj._id;
    }



    render() {

        return (

            <View style={{
                marginTop: 10,
                borderRadius: 20, width: '100%',
                justifyContent: 'center', alignItems: "center", flexDirection: 'column', height: '100%'
            }}>

                {this.props.viewableItems.comments &&
                    <Text style={styles.heading}>{'('}{this.props.viewableItems.comments.totalResults}{') '}{translate('Comments').toUpperCase()}</Text>
                }
                <View style={{ backgroundColor: theme.colors.black, width: '100%', height: moderateScale(1), marginTop: moderateScale(10) }} />



                <View style={{ flex: 1, width: '100%', flexDirection: 'column' }}>
                    <View style={{ flex: 1, }}>

                        {this.props.viewableItems.comments &&
                            <FlatList
                                ref={(ref) => (this.FlatListRef = ref)}
                                data={this.props.viewableItems.comments.results}
                                extraData={this.props.viewableItems.comments.results}
                                onContentSizeChange={() => { if (this.FlatListRef) this.FlatListRef.scrollToEnd() }}
                                onLayout={() => { if (this.FlatListRef) this.FlatListRef.scrollToEnd() }}
                                contentContainerStyle={{
                                    // paddingBottom: moderateScale(50),
                                    marginTop: moderateScale(10), marginHorizontal: moderateScale(10),
                                }}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item, index }) => (
                                    <View
                                        key={'comments-' + index}
                                        style={{
                                            flex: 1,
                                            flexDirection: 'column',
                                            marginBottom: moderateScale(10), backgroundColor: theme.colors.gray07,
                                            marginHorizontal: moderateScale(5), padding: moderateScale(10), borderRadius: moderateScale(10)
                                        }}>
                                        <View onPress={() => {

                                        }} style={{ flexDirection: 'column', width: '100%' }}>

                                            <View style={{
                                                flex: 1, flexDirection: 'column',
                                                marginHorizontal: moderateScale(5), marginBottom: moderateScale(10)
                                            }}>

                                                <View style={{ flexDirection: 'row', marginBottom: moderateScale(5) }}>


                                                    <View style={{ flexDirection: 'row', flex: 1 }}>
                                                        <Text style={[{
                                                            fontWeight: 'bold',
                                                            fontSize: moderateScale(15), color: theme.colors.black, marginEnd: moderateScale(20)
                                                        }]}>{item.userObj.first_name + ' ' + item.userObj.last_name}</Text>

                                                        <Text style={[{
                                                            fontWeight: 'bold',
                                                            fontSize: moderateScale(8), color: theme.colors.secondary, paddingRight: moderateScale(10),
                                                        }]}>{moment(item.createdAt).format('DD MMM YYYY')}</Text>

                                                    </View>



                                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>


                                                        {this.props.isRightUser  || this.checkIfSameUser(item)  &&
                                                            <TouchableOpacity style={{}} style={{}} onPress={() => {
                                                                PopupOptions.show({
                                                                    type: 'Success',
                                                                    title: 'Delete Confrim',
                                                                    button: true,
                                                                    textBody: 'Do you want to remove this comment?',
                                                                    buttonText: 'Confirm',
                                                                    duration: 500,
                                                                    iamge: require('../../../../assets/assets/delete_warning.gif'),
                                                                    callback: () => {
                                                                        Apis.Delete('comments/' + (item.id ? item.id : item._id), {}).then((data) => {
                                                                            this.props.viewableItems.comments.results.splice(index, 1);
                                                                            this.props.refreshCommeents(this.props.viewableItems.comments)
                                                                        }).catch((error) => {
                                                                            console.log(error);
                                                                            this.setState({ isLoading: false })
                                                                        })

                                                                        PopupOptions.hide();
                                                                    }
                                                                })

                                                            }}>
                                                                <Icon size={moderateScale(20)} name="ios-trash" color={theme.colors.gray02} />
                                                            </TouchableOpacity>


                                                        }

                                                        {this.props.isRightUser || this.checkIfSameUser(item) &&
                                                            <TouchableOpacity style={{
                                                                borderRadius: moderateScale(10),
                                                                paddingVertical: moderateScale(5), marginStart: moderateScale(10)
                                                            }} onPress={() => { this.edit(index) }}>
                                                                <View>
                                                                    <Text style={[{
                                                                        textAlign: 'center',
                                                                        fontSize: moderateScale(15),
                                                                        color: theme.colors.secondary, fontWeight: 'bold'
                                                                    }]}>{item.edit ? 'Done' : 'Edit'}</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        }
                                                    </View>

                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={[{
                                                        fontWeight: 'bold',
                                                        fontSize: moderateScale(15), color: theme.colors.gray02, flex: 1, marginEnd: moderateScale(20)
                                                    }]}>{item.text}</Text>

                                                    <TouchableOpacity style={{}} style={{}} onPress={() => {




                                                        if (this.props.data.userInfo.email) {





                                                            this.props.viewableItems.comments.results[index].isLike = !this.props.viewableItems.comments.results[index].isLike;
                                                            if (this.props.viewableItems.comments.results[index].isLike)
                                                                this.props.viewableItems.comments.results[index].likes = this.props.viewableItems.comments.results[index].likes + 1;
                                                            else {
                                                                this.props.viewableItems.comments.results[index].likes = this.props.viewableItems.comments.results[index].likes - 1;
                                                            }
                                                            this.props.refreshCommeents(this.props.viewableItems.comments)



                                                            this.setState({ isLoading: false })
                                                            Apis.Post('comments/like/' + item._id, {}).then((data) => {
                                                                this.setState({ isLoading: false })
                                                            }).catch((error) => {
                                                                this.setState({ isLoading: false })


                                                                this.props.viewableItems.comments.results[index].isLike = !this.props.viewableItems.comments.results[index].isLike;
                                                                if (this.props.viewableItems.comments.results[index].isLike)
                                                                    this.props.viewableItems.comments.results[index].likes = this.props.viewableItems.comments.results[index].likes + 1;
                                                                else {
                                                                    this.props.viewableItems.comments.results[index].likes = this.props.viewableItems.comments.results[index].likes - 1;
                                                                }
                                                                this.props.refreshCommeents(this.props.viewableItems.comments)


                                                            })

                                                        } else {

                                                            PopupOptions.show({
                                                                type: 'Success',
                                                                title: 'Login',
                                                                button: true,
                                                                textBody: 'Please Login To Make Action on this Media,',
                                                                buttonText: 'Login',
                                                                duration: 500,
                                                                callback: () => {
                                                                    this.props.navigation.navigate('Login')
                                                                    PopupOptions.hide();
                                                                }
                                                            })
                                                        }



                                                    }}>
                                                        <View style={{ flexDirection: 'row', marginHorizontal: moderateScale(2), justifyContent: 'center', alignItems: 'center' }}>
                                                            <Text style={[{
                                                                fontWeight: 'bold',
                                                                fontSize: moderateScale(10), color: theme.colors.secondary, paddingRight: moderateScale(5),
                                                            }]}>{item.likes}</Text>

                                                            <Image source={item.isLike ? require('app/assets/assets/ic_heart_red.png') : require('app/assets/assets/ic_heart_red_empty.png')} resizeMode={'contain'} style={{
                                                                height: moderateScale(20), width: moderateScale(20),
                                                            }} />
                                                        </View>
                                                    </TouchableOpacity>

                                                </View>

                                            </View>


                                        </View>

                                    </View>
                                )}
                                keyExtractor={(item, index) => index}
                            />
                        }


                    </View>




                    <View style={{ width: '100%', paddingBottom: moderateScale(40), marginTop: moderateScale(10) }}>
                        <KeyboardAvoidingView
                            behavior='position'
                        >
                            <View style={{
                                flexDirection: 'column',
                                backgroundColor: theme.colors.primary + '80',
                                padding: moderateScale(10), width: '95%',
                                alignSelf: 'center', borderRadius: moderateScale(20)
                            }}>
                                <Text style={[{
                                    fontWeight: 'bold',
                                    fontSize: moderateScale(15), color: theme.colors.black, marginEnd: moderateScale(20), textAlign: 'left'
                                }]}>{this.props.data.userInfo.email ? this.props.data.userInfo.first_name + ' ' + this.props.data.userInfo.last_name : 'Hello Guest'}</Text>

                                <View style={{
                                    flexDirection: 'row', marginTop: moderateScale(5)
                                }}>


                                    <TextInput
                                        placeholder="Add a comment..."
                                        keyboardType="twitter"
                                        style={{
                                            flex: 1,
                                            minHeight: moderateScale(40),
                                            fontSize: moderateScale(14), backgroundColor: 'white', borderRadius: moderateScale(20), paddingStart: moderateScale(10)
                                        }}
                                        value={this.state.text}
                                        onChangeText={(value) => { this.setState({ text: value }) }} // handle input changes

                                    />

                                    <TouchableOpacity
                                        style={{
                                            height: moderateScale(40),
                                            paddingHorizontal: moderateScale(10),
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                        onPress={() => {

                                            if (this.props.data.userInfo.email) {

                                                if (this.state.text === '') {
                                                    return;
                                                }

                                                this.setState({ isLoading: true })
                                                Apis.Post('comments/post/' + this.props.viewableItems._id, { text: this.state.text }).then((data) => {
                                                    this.setState({ text: '', isLoading: false });
                                                    this.props.fetchComments();
                                                    this.scrooltoBottom()
                                                }).catch((error) => {
                                                    this.setState({ isLoading: false })
                                                    console.log(error);
                                                    this.setState({ isLoading: false })
                                                })

                                            } else {

                                                PopupOptions.show({
                                                    type: 'Success',
                                                    title: 'Login',
                                                    button: true,
                                                    textBody: 'Please Login To Make Action on this Media,',
                                                    buttonText: 'Login',
                                                    duration: 500,
                                                    callback: () => {
                                                        this.props.navigation.navigate('Login')
                                                        PopupOptions.hide();
                                                    }
                                                })
                                            }


                                        }}
                                    >
                                        {this.state.isLoading && <ActivityIndicator />}
                                        {!this.state.isLoading && <Icon size={moderateScale(25)} name="md-send" color={theme.colors.gray02} />}

                                    </TouchableOpacity>
                                </View>

                            </View>

                        </KeyboardAvoidingView>
                    </View>

                    <KeyboardSpacer />



                </View>




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
        fontSize: moderateScale(10),
        color: theme.colors.secondary,
        width: '100%', fontWeight: '800', alignSelf: 'center', width: "100%", textAlign: 'center',
        borderBottomWidth: moderateScale(1), borderBottomColor: theme.colors.secondary,
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    keyboardAvoidingView: {
        flexGrow: 1, flexShrink: 1,
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        justifyContent: "space-evenly",
    },
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
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(CeleberatyUdateCover))


