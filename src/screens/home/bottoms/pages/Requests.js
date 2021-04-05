import React, { Component } from 'react';
import { StyleSheet, StatusBar, View, ScrollView, Dimensions, I18nManager, Image, FlatList, Modal } from 'react-native'
import { theme } from '../../../../core/theme';
import { Block, Text, } from '../../../../components/widget';
import * as loginActions from '../../../../actions/Actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../childs/Header';
import { moderateScale } from 'react-native-size-matters';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { translate } from '../../../../utils/utils';
import Icon from 'react-native-vector-icons/FontAwesome'
import RNPickerSelect from 'react-native-picker-select';
import * as Apis from '../../../../services/Apis';
import moment from 'moment'
import Loader from '../../../../components/widget/loader';
import Button from 'apsl-react-native-button'
import { Input } from 'react-native-elements';
import { FONT_FAMILY } from '../../../../services/config';







class Requests extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isLoading: true, selected: -1, type: -1, data: [{}, {}, {}], params: { page: 1 }, requests: [], type: '', status: "", requestDetails: false, selectedRuquest: {}
        }

        this.fetchRequests()
    }


    fetchRequests() {
        this.setState({ isLoading: true })
        setTimeout(() => {
            var url = 'request?requestTo=' + this.props.data.userInfo._id;
            if (this.state.type !== '')
                url = url + '&type=' + this.state.type;
            if (this.state.status !== '')
                url = url + '&status=' + this.state.status;
            console.log(this.state.params)
            Apis.Get(url, this.state.params).then((data) => {
                console.log('data', data.results)
                this.setState({ isLoading: false, requests: data.results })
            }).catch((error) => {
                console.log(error);
                this.setState({ isLoading: false })
            })
        }, 100);
    }


    updateResuquest(status) {
        var request = JSON.parse(JSON.stringify(this.state.selectedRuquest))
        request.status = status;
        request.country = request.country._id;
        request.duration = request.duration._id;
        console.log(request)
        this.setState({ isLoading: true })
        setTimeout(() => {
            var url = 'request/' + request._id;
            Apis.Put(url, request).then((data) => {
                console.log('data', data)
                this.fetchRequests()
                this.setState({ isLoading: false, requestDetails: false });


                setTimeout(() => {
                    this.props.actions.Request.refreashNotifications();
                }, 200);

            }).catch((error) => {
                console.log(error);
                this.setState({ isLoading: false })
            })
        }, 100);
    }


    render() {
        return (
            <Block>
                <StatusBar backgroundColor="transparent" barStyle="light-content" />

                <Header search={false} backPrimary={false} back={true} navigation={this.props.navigation} backclick={() => { this.props.navigation.pop() }} Text={translate('Requests')} />


                <Loader isLoading={this.state.isLoading} />

                <View style={{ height: moderateScale(55), }}>
                    <ScrollView horizontal={true} contentContainerStyle={{ height: moderateScale(35), }} showsHorizontalScrollIndicator={false}>
                        <View style={{
                            margin: moderateScale(20), borderRadius: moderateScale(10), marginTop: moderateScale(-15)
                            , flexDirection: 'row', bottom: moderateScale(-30), zIndex: 2
                        }}>
                            <View style={[{
                                justifyContent: 'center', alignContent: 'center', alignItems: 'center', borderRadius: moderateScale(0), marginHorizontal: moderateScale(4),
                            }, this.state.selected === 1 ? { backgroundColor: theme.colors.secondary, } : { backgroundColor: theme.colors.gray07, }]}>
                                <TouchableOpacity onPress={() => { this.setState({ selected: 1, type: '0' }); this.fetchRequests() }}>
                                    <Text style={[{ color: theme.colors.white, fontSize: moderateScale(13), padding: moderateScale(5), fontWeight: '600', textAlign: 'center', paddingHorizontal: moderateScale(10), }, this.state.selected === 1 ? {} : { color: theme.colors.secondary }]}>{translate('Online Talk')}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ height: '100%', width: 1, backgroundColor: 'white' }} />

                            <View style={[{
                                justifyContent: 'center', alignContent: 'center', alignItems: 'center', borderRadius: moderateScale(0), marginHorizontal: moderateScale(4),
                            }, this.state.selected === 2 ? { backgroundColor: theme.colors.secondary, } : { backgroundColor: theme.colors.gray07, }]}>
                                <TouchableOpacity onPress={() => { this.setState({ selected: 2, type: '1' }); this.fetchRequests() }}>
                                    <Text style={[{ color: theme.colors.white, fontSize: moderateScale(13), padding: moderateScale(5), fontWeight: '600', textAlign: 'center', paddingHorizontal: moderateScale(10), }, this.state.selected === 2 ? {} : { color: theme.colors.secondary }]}>{translate('Ads Requests')}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ height: '100%', width: 1, backgroundColor: 'white' }} />

                            <View style={[{
                                justifyContent: 'center', alignContent: 'center', alignItems: 'center', borderRadius: moderateScale(0), marginHorizontal: moderateScale(4),
                            }, this.state.selected === 3 ? { backgroundColor: theme.colors.secondary, } : { backgroundColor: theme.colors.gray07, }]}>
                                <TouchableOpacity onPress={() => { this.setState({ selected: 3, type: '2' }); this.fetchRequests() }}>
                                    <Text style={[{ color: theme.colors.white, fontSize: moderateScale(13), padding: moderateScale(5), fontWeight: '600', textAlign: 'center', paddingHorizontal: moderateScale(10), }, this.state.selected === 3 ? {} : { color: theme.colors.secondary }]}>{translate('Invitation Requests')}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[{
                                justifyContent: 'center', alignContent: 'center', alignItems: 'center', borderRadius: moderateScale(0), marginHorizontal: moderateScale(4),
                            }, this.state.selected === 4 ? { backgroundColor: theme.colors.secondary, } : { backgroundColor: theme.colors.gray07, }]}>
                                <TouchableOpacity onPress={() => { this.setState({ selected: 4, type: '3' }); this.fetchRequests() }}>
                                    <Text style={[{ color: theme.colors.white, fontSize: moderateScale(13), padding: moderateScale(5), fontWeight: '600', textAlign: 'center', paddingHorizontal: moderateScale(10), }, this.state.selected === 4 ? {} : { color: theme.colors.secondary }]}>{translate('Book Hour')}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[{
                                justifyContent: 'center', alignContent: 'center', alignItems: 'center', borderRadius: moderateScale(0), marginHorizontal: moderateScale(4),
                            }, this.state.selected === 5 ? { backgroundColor: theme.colors.secondary, } : { backgroundColor: theme.colors.gray07, }]}>
                                <TouchableOpacity onPress={() => { this.setState({ selected: 5, type: '4' }); this.fetchRequests() }}>
                                    <Text style={[{ color: theme.colors.white, fontSize: moderateScale(13), padding: moderateScale(5), fontWeight: '600', textAlign: 'center', paddingHorizontal: moderateScale(10), }, this.state.selected === 5 ? {} : { color: theme.colors.secondary }]}>{translate('Gift Video')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>

                <View style={{ padding: 10, paddingStart: -10 }} >
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Text style={{ color: theme.colors.gray04, fontSize: moderateScale(15), paddingHorizontal: moderateScale(15), ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold' }}>{translate('Sort By')}</Text>

                        <RNPickerSelect
                            textInputProps={{
                                borderColor: theme.colors.gray05, backgroundColor: theme.colors.gray07, borderRadius: moderateScale(10),
                                height: moderateScale(40), marginHorizontal: moderateScale(10), ...I18nManager.isRTL ? { paddingEnd: 10, textAlign: 'right' } : {}, paddingHorizontal: moderateScale(10),
                                minWidth: moderateScale(Dimensions.get('window').width - moderateScale(160)), borderWidth: moderateScale(1), borderColor: theme.colors.secondary
                            }}
                            Icon={() => {
                                return (
                                    <View style={{ height: moderateScale(40), justifyContent: 'center', alignItems: 'center', alignContent: 'center', top: moderateScale(10), right: moderateScale(10) }}>
                                        <Icon
                                            name="caret-down"
                                            size={22}
                                            style={{ marginEnd: moderateScale(10), position: 'absolute', right: moderateScale(5), bottom: moderateScale(19) }}
                                            color={theme.colors.secondary}
                                        />
                                    </View>
                                )
                            }}
                            style={{ marginBottom: moderateScale(10), paddingHorizontal: moderateScale(10), flex: 1 }}
                            placeholder={
                                {
                                    label: 'All Requests',
                                    value: '',
                                    color: theme.colors.gray02
                                }
                            }
                            placeholderTextColor={theme.colors.black}
                            onDonePress={() => {
                                this.fetchRequests()
                            }}
                            onClose={() => {
                                this.fetchRequests()
                            }}
                            onValueChange={(value) => {
                                this.setState({ status: value });
                            }}
                            items={[
                                { value: '0', label: 'Waiting for Response' },
                                { value: '1', label: 'Accpeted' },
                                { value: '2', label: 'Rejected' },
                            ]}
                        />
                    </View>

                </View>

                <View style={{ width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{ width: '95%', height: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                        <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: moderateScale(250) }}>
                            <View style={{ padding: 10, paddingStart: -10 }} >



                                <Text style={[{ color: theme.colors.black, fontSize: moderateScale(15), padding: moderateScale(5), paddingHorizontal: moderateScale(10), marginTop: moderateScale(20), textAlign: 'right' }]}>{'لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار  النشوة وتمجيد الألم نشأت بالفعل، وسأعرض لك التفاصيل لتكتشف حقيقة وأساس تلك السعادة البشرية، فلا أحد يرفض أو يكره أو يتجنب الشعور بالسعادة، ولكن بفضل هؤلاء الأشخاص الذين لا يدركون بأن السعادة لا بد أن نستشعرها بصورة أكثر عقلانية ومنطقية فيعرضهم هذا لمواجهة الظروف الأليمة، وأكرر بأنه لا يوجد من يرغب في الحب ونيل المنال ويتلذذ بالآلام، الألم هو الألم ولكن نتيجة لظروف ما قد تكمن السعاده فيما نتحمله من كد وأسي..'}</Text>



                                <View style={{
                                    backgroundColor: theme.colors.white, marginTop: moderateScale(10), margin: moderateScale(5)
                                }}>
                                    {this.state.requests.length !== 0 &&
                                        <FlatList
                                            data={this.state.requests}
                                            showsVerticalScrollIndicator={false}
                                            contentContainerStyle={{ marginTop: moderateScale(40), marginBottom: moderateScale(40) }}
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
                                                        shadowRadius: 1.41, backgroundColor: theme.colors.white, borderRadius: moderateScale(20), borderColor: theme.colors.primary, borderWidth: moderateScale(1), padding: moderateScale(10)
                                                    }}>
                                                    <TouchableOpacity onPress={() => {

                                                        this.setState({ requestDetails: true, selectedRuquest: item })

                                                    }} style={{ flexDirection: 'column', width: '100%' }}>

                                                        <View style={{ width: '100%', zIndex: 0, marginTop: moderateScale(0) }}>



                                                            <Text style={[{
                                                                fontWeight: 'bold',
                                                                fontSize: moderateScale(17), color: theme.colors.secondary
                                                            }]}>{item.requestby.first_name + ' ' + item.requestby.last_name}</Text>


                                                            <View style={{
                                                                flex: 1, flexDirection: 'row',
                                                                alignItems: 'center', alignContent: 'center', marginBottom: moderateScale(5), borderBottomWidth: moderateScale(0.5), borderBottomColor: theme.colors.gray05, paddingBottom: moderateScale(5)
                                                            }}>
                                                                <Text style={[{
                                                                    fontWeight: 'bold',
                                                                    fontSize: moderateScale(15),
                                                                }]}>{item.type === '0' ? 'Online Talk' : item.type === '1' ? 'Ads Request' : item.type === '2' ? 'Invitation Request' : item.type === '3' ? 'Book Hour' : item.type === '4' ? 'Gift Video' : ''}</Text>
                                                            </View>
                                                            <View style={{
                                                                flex: 1, flexDirection: 'row',
                                                                alignItems: 'center', alignContent: 'center', marginBottom: moderateScale(5), marginTop: moderateScale(3)
                                                            }}>


                                                                <View style={{
                                                                    flexDirection: 'row',
                                                                    alignItems: 'center', alignContent: 'center', marginBottom: moderateScale(5), borderRadius: moderateScale(50), borderWidth: moderateScale(0.5), flex: 1, borderColor: theme.colors.primary, marginHorizontal: moderateScale(10)
                                                                }}>
                                                                    <Image resizeMode="contain"
                                                                        style={{
                                                                            height: moderateScale(20), width: moderateScale(20), marginEnd: moderateScale(5)
                                                                        }}
                                                                        source={require('app/assets/assets/date.png')}
                                                                    />
                                                                    <View style={[{
                                                                        fontWeight: 'bold',
                                                                        fontSize: moderateScale(8), flex: 1, backgroundColor: theme.colors.primary, height: moderateScale(20), textAlign: 'center', borderRadius: moderateScale(50), justifyContent: 'center', alignContent: 'center'
                                                                    }]}>
                                                                        <Text style={[{
                                                                            fontWeight: 'bold',
                                                                            fontSize: moderateScale(8), textAlign: 'center', borderRadius: moderateScale(50)
                                                                        }]}>{moment(new Date(item.dateTime)).format('DD MMM YYYY')}</Text>
                                                                    </View>
                                                                </View>


                                                                <View style={{
                                                                    flexDirection: 'row',
                                                                    alignItems: 'center', alignContent: 'center', marginBottom: moderateScale(5), borderRadius: moderateScale(50), borderWidth: moderateScale(0.5), flex: 1, borderColor: theme.colors.primary, marginHorizontal: moderateScale(10)
                                                                }}>
                                                                    <Image resizeMode="contain"
                                                                        style={{
                                                                            height: moderateScale(20), width: moderateScale(20), marginEnd: moderateScale(5)
                                                                        }}
                                                                        source={require('app/assets/assets/time.png')}
                                                                    />
                                                                    <View style={[{
                                                                        fontWeight: 'bold',
                                                                        fontSize: moderateScale(8), flex: 1, backgroundColor: theme.colors.primary, height: moderateScale(20), textAlign: 'center', borderRadius: moderateScale(50), justifyContent: 'center', alignContent: 'center'
                                                                    }]}>
                                                                        <Text style={[{
                                                                            fontWeight: 'bold',
                                                                            fontSize: moderateScale(8), textAlign: 'center', borderRadius: moderateScale(50)
                                                                        }]}>{item.status === '0' ? 'Waiting For Reponse' : item.status === '1' ? 'Accepted' : 'Rejected'}</Text>
                                                                    </View>
                                                                </View>

                                                            </View>



                                                            <View style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center', alignContent: 'center', marginBottom: moderateScale(5), borderRadius: moderateScale(50), borderWidth: moderateScale(0.5), flex: 1, borderColor: theme.colors.primary, paddingVertical: moderateScale(0)
                                                            }}>
                                                                <Image resizeMode="contain"
                                                                    style={{
                                                                        height: moderateScale(20), width: moderateScale(20), marginHorizontal: moderateScale(5)
                                                                    }}
                                                                    source={require('app/assets/assets/pin.png')}
                                                                />
                                                                <View style={[{
                                                                    fontWeight: 'bold',
                                                                    fontSize: moderateScale(10), flex: 1, backgroundColor: theme.colors.gray06, height: moderateScale(20), textAlign: 'center', borderRadius: moderateScale(50), justifyContent: 'center', alignContent: 'center'
                                                                }]}>
                                                                    <Text style={[{
                                                                        fontWeight: 'bold',
                                                                        fontSize: moderateScale(10), textAlign: 'center', borderRadius: moderateScale(50)
                                                                    }]}>{item.city + ' ,' + item.country.title}</Text>
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

                                    {this.state.requests.length === 0 && !this.state.isLoading &&
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



                            </View>
                        </ScrollView>
                    </View>
                </View>


                {this.state.requestDetails &&
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.requestDetails}
                        onRequestClose={() => {
                            this.setState({ requestDetails: false })
                        }}
                        onDismiss={() => {
                            this.setState({ requestDetails: false })
                        }}>
                        <View
                            style={{
                                width: '100%',
                                height: '100%', justifyContent: 'center', alignSelf: 'center', backgroundColor: theme.colors.gray03 + '70'
                            }}>
                            <View style={{
                                width: '90%',
                                backgroundColor: "white",
                                alignSelf: 'center', borderRadius: moderateScale(10), paddingTop: moderateScale(2), paddingVertical: moderateScale(10)
                            }}>


                                <View style={{
                                    marginTop: 20,
                                    borderRadius: 20,
                                }}>

                                    <View style={{ marginEnd: moderateScale(10), position: 'absolute', right: moderateScale(5), top: moderateScale(-5), zIndex: 9999, }}>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({ requestDetails: false })
                                        }}>
                                            <Icon
                                                name="times-circle"
                                                size={22}
                                                color={theme.colors.secondary}
                                            />
                                        </TouchableOpacity>

                                    </View>



                                    <Text style={[styles.heading, { borderBottomWidth: moderateScale(0.5), }]}>{translate('Request Details').toUpperCase()}</Text>


                                    <View style={{ paddingHorizontal: moderateScale(20), marginTop: moderateScale(10) }}>
                                        <Text style={[{
                                            borderBottomWidth: moderateScale(0.5),
                                            fontSize: moderateScale(15),
                                            color: theme.colors.black,
                                            width: '100%', alignSelf: 'center', marginVertical: moderateScale(0), marginTop: moderateScale(0), paddingHorizontal: moderateScale(5), ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginBottom: moderateScale(10)
                                        }]}>{translate('Full Name')}</Text>

                                        <View style={{ borderRadius: moderateScale(10), backgroundColor: theme.colors.gray06, borderRadius: moderateScale(10), paddingVertical: moderateScale(10), paddingHorizontal: moderateScale(25) }}>
                                            <Text style={[{
                                                fontSize: moderateScale(15),
                                                color: theme.colors.black,
                                                width: '100%', alignSelf: 'center', marginTop: moderateScale(0), ...I18nManager.isRTL ? { textAlign: 'left' } : {},
                                            }]}>{this.state.selectedRuquest.requestby.first_name + ' ' + this.state.selectedRuquest.requestby.last_name}</Text>
                                        </View>

                                    </View>


                                    <View style={{ paddingHorizontal: moderateScale(20), marginTop: moderateScale(20) }}>
                                        <Text style={[{
                                            borderBottomWidth: moderateScale(0.5),
                                            fontSize: moderateScale(15),
                                            color: theme.colors.black,
                                            width: '100%', alignSelf: 'center', marginVertical: moderateScale(0), marginTop: moderateScale(0), paddingHorizontal: moderateScale(5), ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginBottom: moderateScale(10)
                                        }]}>{translate('Profection')}</Text>

                                        <View style={{ borderRadius: moderateScale(10), backgroundColor: theme.colors.gray06, borderRadius: moderateScale(10), paddingVertical: moderateScale(10), paddingHorizontal: moderateScale(25) }}>
                                            <Text style={[{
                                                fontSize: moderateScale(15),
                                                color: theme.colors.black,
                                                width: '100%', alignSelf: 'center', marginTop: moderateScale(0), ...I18nManager.isRTL ? { textAlign: 'left' } : {},
                                            }]}>{this.state.selectedRuquest.profession}</Text>
                                        </View>
                                    </View>



                                    <View style={{ paddingHorizontal: moderateScale(20), marginTop: moderateScale(20) }}>
                                        <Text style={[{
                                            borderBottomWidth: moderateScale(0.5),
                                            fontSize: moderateScale(15),
                                            color: theme.colors.black,
                                            width: '100%', alignSelf: 'center', marginVertical: moderateScale(0), marginTop: moderateScale(0), paddingHorizontal: moderateScale(5), ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginBottom: moderateScale(10)
                                        }]}>{translate('Subject')}</Text>

                                        <View style={{ borderRadius: moderateScale(10), backgroundColor: theme.colors.gray06, borderRadius: moderateScale(10), paddingVertical: moderateScale(10), paddingHorizontal: moderateScale(25) }}>
                                            <Text style={[{
                                                fontSize: moderateScale(15),
                                                color: theme.colors.black,
                                                width: '100%', alignSelf: 'center', marginTop: moderateScale(0), ...I18nManager.isRTL ? { textAlign: 'left' } : {},
                                            }]}>{this.state.selectedRuquest.subject}</Text>
                                        </View>

                                    </View>



                                    <View style={{ paddingHorizontal: moderateScale(20), marginTop: moderateScale(20) }}>
                                        {this.state.selectedRuquest.type == 3 &&
                                            <Text style={[{
                                                borderBottomWidth: moderateScale(0.5),
                                                fontSize: moderateScale(15),
                                                color: theme.colors.black,
                                                width: '100%', alignSelf: 'center', marginVertical: moderateScale(0), marginTop: moderateScale(0), paddingHorizontal: moderateScale(5), ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginBottom: moderateScale(10)
                                            }]}>{translate('Profection')}</Text>}
                                        {this.state.selectedRuquest.type == 3 &&
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Input
                                                    labelStyle={{ color: theme.colors.secondary }}
                                                    defaultValue={this.state.last_name}
                                                    containerStyle={{ paddingLeft: 0, paddingRight: 0, flex: 1 }}
                                                    inputContainerStyle={{
                                                        width: '100%', height: moderateScale(40),
                                                        ...I18nManager.isRTL ? { paddingHorizontal: moderateScale(10) } : { paddingHorizontal: moderateScale(10) }, borderBottomWidth: 0, backgroundColor: theme.colors.gray06, marginTop: moderateScale(5), borderRadius: moderateScale(40)
                                                    }}
                                                    inputStyle={{ textAlignVertical: 'center', height: '100%', ...I18nManager.isRTL ? { textAlign: 'right' } : {}, fontFamily: FONT_FAMILY }}
                                                    returnKeyType="done"
                                                    placeholderTextColor={theme.colors.gray02}
                                                    placeholder="Enter the Price"
                                                    value={this.state.price}
                                                    keyboardType="numeric"
                                                    onChangeText={(value) => this.setState({ price: value })}
                                                />
                                            </View>
                                        }

                                    </View>





                                    <View style={{ paddingHorizontal: moderateScale(20), marginTop: moderateScale(20) }}>
                                        <Text style={[{
                                            borderBottomWidth: moderateScale(0.5),
                                            fontSize: moderateScale(15),
                                            color: theme.colors.black,
                                            width: '100%', alignSelf: 'center', marginVertical: moderateScale(0), marginTop: moderateScale(0), paddingHorizontal: moderateScale(5), ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginBottom: moderateScale(10)
                                        }]}>{translate('You will Get:')} <Text style={[{
                                            borderBottomWidth: moderateScale(0.5),
                                            fontSize: moderateScale(15),
                                            color: theme.colors.black,
                                            width: '100%', alignSelf: 'center', marginVertical: moderateScale(0), marginTop: moderateScale(0), paddingHorizontal: moderateScale(5), ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginBottom: moderateScale(10), fontWeight: 'bold'
                                        }]}>{this.state.selectedRuquest.cost + '$'}</Text></Text>
                                    </View>




                                    {this.state.selectedRuquest.status === '0' &&
                                        <View style={{ paddingVertical: moderateScale(20), width: '100%' }}>
                                            <Button isLoading={this.state.isLoading} style={{
                                                borderColor: theme.colors.secondary, marginTop: moderateScale(5),
                                                borderRadius: moderateScale(0), borderWidth: 0, backgroundColor: theme.colors.secondary, width: '80%', alignSelf: 'center',
                                            }} textStyle={{ fontSize: moderateScale(16), color: theme.colors.white, fontWeight: '600' }}
                                                onPress={() => {
                                                    this.updateResuquest('1')
                                                }}>{translate('ACCEPT')}</Button>


                                            <Button isLoading={this.state.isLoading} style={{
                                                borderColor: theme.colors.primary, marginTop: moderateScale(5),
                                                borderRadius: moderateScale(0), borderWidth: 0, backgroundColor: theme.colors.primary, width: '80%', alignSelf: 'center',
                                            }} textStyle={{ fontSize: moderateScale(16), color: theme.colors.white, fontWeight: '600' }}
                                                onPress={() => {

                                                    this.updateResuquest('2')
                                                }}>{translate('REJECT')}</Button>
                                        </View>
                                    }



                                </View>
                            </View>
                        </View>
                    </Modal>

                }


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
        Request: bindActionCreators(loginActions, dispatch)
    }
})


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: moderateScale(20),
        color: theme.colors.primary, fontWeight: 'bold',
        width: '100%', alignSelf: 'center', marginVertical: moderateScale(10), marginTop: moderateScale(0), paddingHorizontal: moderateScale(25), ...I18nManager.isRTL ? { textAlign: 'left' } : {},
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Requests))