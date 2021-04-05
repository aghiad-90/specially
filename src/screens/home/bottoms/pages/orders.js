import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../../../actions/Actions';
import Constants from 'expo-constants';
//view
import {
    View,
    ScrollView,
    StyleSheet,
    Image,
    TouchableOpacity, ImageBackground
} from 'react-native';
import { theme } from '../../../../core/theme';
import { StatusBar } from 'react-native';
import { Text } from '../../../../components/widget';
import Icon from "react-native-vector-icons/FontAwesome";
import ActionSheet from 'react-native-actionsheet'
import Button from 'apsl-react-native-button'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import OrderListing from '../childs/orderListing';
import { translate } from '../../../../utils/utils';
import Header from '../childs/Header';



class Orders extends Component {


    state = { isLoading: true, }
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            refreshing: true,
            list: [],
            sortBy: translate('AllOrders'),
            optionsSort: [translate('AllOrders'), translate('Pending'), translate('Preparing'), translate('Completed'), translate('Canceled'), translate('Cancel')],
            selectedMeal: {},
            page: 0,
            sortByIndex: -1,
            lastindex: -1,
            animatingLoadMore: false,
            noMoreorders: false,
            somethingWentWrong: false,
            Empity: false
        }

        this.handleOrderClick = this.handleOrderClick.bind(this);
        this.handleRateOrderClick = this.handleRateOrderClick.bind(this);
        this.handleReOrderClick = this.handleReOrderClick.bind(this);
        this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this);
        this.loadRefresh = this.loadRefresh.bind(this);


    }



    componentDidMount() {
        this.loadData();
    }
    loadRefresh() {
        this.setState({ isLoading: true, animating: true, refreshing: true })
        this.loadData();
    }
    loadData() {
        this.setState({ isLoading: true, animating: true, refreshing: true })
        setTimeout(() => {
            this.props.actions.orders.fetchOrders({ page: 0, sortBy: this.state.sortByIndex }, this.onSuccess, this.onError);
        }, 1000);
    }
    handleLoadMoreClick() {
        this.state.page = this.state.page + 1;
        this.state.animatingLoadMore = true
        this.setState({ page: this.state.page, animatingLoadMore: this.state.animatingLoadMore })
        this.props.actions.orders.fetchOrders({ page: this.state.page, sortBy: -1 }, this.onSuccess, this.onError);

    }


    onSuccess = (data) => {
        console.log('Orders', data.data.Orders);
        setTimeout(() => {
            this.setState({ isLoading: false, refreshing: false })
        }, 500);
        if (data.code === 200) {
            if (this.state.animatingLoadMore) {
                var allOrders = this.state.list.concat(data.data.Orders);
                var noMoreorders = false;
                if (data.data.Orders.length < 11 || data.data.Orders.length === 0) {
                    noMoreorders = true;
                }

                setTimeout(() => {
                    this.setState({ list: allOrders, somethingWentWrong: false, animating: false, animatingLoadMore: false, noMoreorders: noMoreorders, Empity: false })
                }, 1000);

            } else {
                this.setState({ list: [] })

                if (data.data.Orders.length !== 0) {
                    this.setState({ list: data.data.Orders, isLoading: false, animatingLoadMore: false, animating: false, noMoreorders: false, page: 0, somethingWentWrong: false, Empity: false })
                } else {
                    this.setState({ list: [], isLoading: false, animatingLoadMore: false, animating: false, noMoreorders: false, page: 0, somethingWentWrong: false, Empity: true })
                }

            }


        } else {
            this.setState({ list: [], isLoading: false, somethingWentWrong: true, Empity: true })

        }

    }
    onError = (error) => {
        this.setState({ list: [], isLoading: false, somethingWentWrong: true, animating: false, refreshing: false, Empity: true })
        // console.log('Orders', error);
    }

    handleOrderClick(listing) {
        // console.log(listing)
        this.props.navigation.navigate('OrderDetails', { selectedOrder: listing });
    }
    handleReOrderClick(listing) {
        // console.log(listing)
        this.props.navigation.navigate('checkoutReorder', { selectedOrder: listing });
    }
    handleRateOrderClick(listing) {
        this.props.navigation.navigate('OrderRate', { selectedOrder: listing });
    }

    componentWillReceiveProps(nextProps) {
        // console.log("Orders", nextProps);
        this.loadData()
    }

    render() {
        return (
            <View style={styles.container_scrolling}>
                <StatusBar backgroundColor="transparent" barStyle="light-content" />
                <ImageBackground source={require('app/assets/Background.jpg')} style={{ width: '100%', height: '100%', position: 'absolute', }}></ImageBackground>

                <Header  color={theme.colors.primary}  back={true} options={true} optionsclick={() => { this.sort.show() }} Text={translate('MyOrders')} backclick={() => { this.props.navigation.pop() }} />
                <View style={styles.wrapper}>
                    {/* <SearchBar /> */}

                    {this.state.Empity &&
                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', alignContent: 'center', alignSelf: 'center', marginTop: moderateScale(60) }}>
                            <Image resizeMode="stretch" source={require('app/assets/noorders.png')} style={{ width: moderateScale(170), height: moderateScale(170), }} />
                            <Text style={{ color: theme.colors.secondary, padding: moderateScale(15), fontSize: moderateScale(20), fontWeight: 'bold' }}>{'No orders found :)'}</Text>
                        </View>
                    }
                    <View style={{ flex: 1, flexDirection: 'column' }}>

                        {!this.state.somethingWentWrong &&
                            <View
                                style={styles.scrollview}
                                contentContainerStyle={styles.scrollViewContent}>
                                <OrderListing
                                    orders={this.state.list}
                                    handleLoadMoreClick={this.handleLoadMoreClick}
                                    animatingLoadMore={this.state.animatingLoadMore}
                                    noMoreorders={this.state.noMoreorders}
                                    handleRateOrderClick={this.handleRateOrderClick}
                                    handleReOrderClick={this.handleReOrderClick}
                                    loadRefresh={this.loadRefresh}
                                    isLoading={this.state.isLoading}
                                    handleOrderClick={this.handleOrderClick} />
                            </View>
                        }
                        {this.state.somethingWentWrong &&
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
                                <Text style={{ color: theme.colors.white, marginTop: '40%', fontSize: 20, textAlign: 'center', textTransform: 'capitalize' }}>{translate('WentWrong')}</Text>
                                <Button mode="contained" isLoading={this.state.animating} style={{ backgroundColor: theme.colors.white, borderColor: 'transparent', color: theme.colors.primary, borderRadius: 0, marginTop: 30, width: 150, alignSelf: 'center' }} textStyle={{
                                    fontSize: 15,
                                    fontWeight: '600',
                                    color: theme.colors.primary,
                                }}
                                    onPress={() => this.loadData()}>
                                    {translate('Error')}</Button>
                            </View>
                        }
                    </View>


                </View>
                <ActionSheet
                    ref={o => this.sort = o}
                    title={translate('SortBy')}
                    options={this.state.optionsSort}
                    cancelButtonIndex={5}
                    onPress={(index) => {
                        if (index != 5) {
                            this.setState({ sortBy: this.state.optionsSort[index], sortByIndex: index - 1 })
                            this.setState({ isLoading: true });
                            this.props.actions.orders.fetchOrders({ page: 0, sortBy: index - 1 }, this.onSuccess, this.onError);
                        }
                    }}
                />
            </View>
        );
    }

}

const mapStateToProps = (state) => ({
    data: {

    }
})


const mapDispatchToProps = (dispatch) => ({
    actions: {
        orders: bindActionCreators(loginActions, dispatch)
    }
})

const styles = StyleSheet.create({
    container_scrolling: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    wrapper: {
        flex: 1,
    },
    scrollview: {
        paddingTop: 20,
        marginBottom: 40
    },
    scrollViewContent: {
        paddingBottom: 20,
    },
    categories: {
        marginBottom: 10,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject
    },
    InnerWrapper: {
        justifyContent: 'flex-end',
        right: 0,
        right: 0,
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
    innerCard: {
        height: scale(25),
        paddingStart: 10,
        paddingEnd: 10,
        backgroundColor: theme.colors.secondary,
        borderColor: theme.colors.white,
        borderWidth: 1,
        marginEnd: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    listingType: {
        color: theme.colors.white,
        fontSize: moderateScale(10),
        textAlign: 'center',
        alignItems: 'center',

    }
    ,
    crossrating: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginEnd: 10,
        marginTop: 10,
        zIndex: 4,
        width: '10%',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Orders))
