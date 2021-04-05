import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../../../actions/Actions';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Modal,
    ActivityIndicator,
    I18nManager,
    Alert,
} from 'react-native';
import { theme } from '../../../../core/theme';
import { StatusBar } from 'react-native';
import TextInputSearch from '../../../../components/widget/TextInputSearch';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import FilterCategories from '../../bottoms/childs/filterCategories';
import { Text } from '../../../../components/widget';
import ResturentsListing from '../../bottoms/childs/ResturentsListing';
import Button from 'apsl-react-native-button'
import ContentLoader, { Rect } from 'react-content-loader/native'
import { showDanger, translate, showSuccess } from '../../../../utils/utils';
import { moderateScale, scale } from 'react-native-size-matters';
import { Dimensions } from 'react-native';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { ImageBackground } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';



class Filters extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            sortBy: translate('Featured'),
            sort_by: 1,
            searchText: '',
            selectCategory: false,
            modalVisible: false,
            initalLoad: true,
            animating: true,
            page: 0,
            lastindex: -1,
            cartquantity: 1,
            animatingLoadMore: false,
            noMoreProducts: false,
            somethingWentWrong: false,
            selectedMeal: {},
            list: [],
            filter_list: [

            ],
            initParams: { sort_by: 1, page: 0 },
            optionsSort: [translate('Featured'), translate('HighRatted'), translate('LowPrice'), translate('HighPrice'), translate('BestServed'), translate('Cancel')]
        }

        this.handleDealClick = this.handleDealClick.bind(this);
        this.handleFavClick = this.handleFavClick.bind(this);
        this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this);
        this.handleCategoryClick = this.handleCategoryClick.bind(this);
        this.onSubmitEditing = this.onSubmitEditing.bind(this);
        this.hideModel = this.hideModel.bind(this);

    }

    hideModel() {
        this.setState({ modalVisible: !this.state.modalVisible })
    }





    componentWillReceiveProps(nextProps) {
        // console.log("nextProps");
        // console.log(nextProps);
    }


    componentDidMount() {
        this.setState({ filter_list: this.state.filter_list })
        this.props.actions.Actions.categories(this.onSuccessCategory, this.onErrorCategory);
        this.fetchfilter(this.state.initParams);
    }


    fetchfilter(body) {

        if (!this.state.animatingLoadMore) {
            this.setState({ animating: true });
        }
        // console.log('body', body);
        this.props.actions.Actions.fetchFilter(body, this.onSuccess, this.onError);

    }

    onSuccess = (data) => {

        console.log('FilterApi', data);
        if (data.code === 200) {

            if (this.state.animatingLoadMore) {
                for (let k in data.data.Products) {
                    if (data.data.Products[k].Favourite) {
                        data.data.Products[k].FAV = true;
                    } else {
                        data.data.Products[k].FAV = false;
                    }
                }
                var allProducts = this.state.list.concat(data.data.Products);
                var noMoreProducts = false;
                if (data.data.Products < 11 || data.data.Products.length === 0) {
                    noMoreProducts = true;
                }

                setTimeout(() => {
                    this.setState({ list: allProducts, somethingWentWrong: false, animating: false, animatingLoadMore: false, noMoreProducts: noMoreProducts })
                    // console.log('allProducts', this.state.noMoreProducts)
                }, 1000);

            } else {
                for (let k in data.data.Products) {
                    if (data.data.Products[k].Favourite) {
                        data.data.Products[k].FAV = true;
                    } else {
                        data.data.Products[k].FAV = false;
                    }
                }
                setTimeout(() => {
                    this.setState({ list: data.data.Products, somethingWentWrong: false, animating: false, animatingLoadMore: false, noMoreProducts: false })
                }, 500);

            }



        } else {

            this.setState({ list: [], somethingWentWrong: true })
        }
    }
    onError = (error) => {
        this.setState({ list: [], somethingWentWrong: true, animating: false })
        // console.log('FilterApi', error);
    }



    onSuccessCategory = (data) => {
        console.log('FilterCategories', data);

        if (data.code === 200) {
            this.setState({ filter_list: data.data, initalLoad: false })
        }


    }
    onErrorCategory = (error) => {
        this.setState({ initalLoad: false })
        console.log('FilterCategories', error);
    }



    onSubmitEditing() {
        // console.log(this.state.searchText);
        this.FilterCalulations();
    }


    handleCategoryClick(selected, index) {
        console.log(selected, index)
        // this.state.initParams = { page: this.state.page }
        // selected.selected = !selected.selected;
        // this.state.filter_list[index] = selected;

        // // unselect others
        // for (let k in this.state.filter_list) {
        //     if (index != k) {
        //         this.state.filter_list[k].selected = false;
        //     }
        // }
        // this.setState({ filter_list: this.state.filter_list });
        // this.FilterCalulations();


    }

    FilterCalulations() {
        for (let k in this.state.filter_list) {
            if (this.state.filter_list[k].selected) {
                this.state.initParams.category_id = this.state.filter_list[k].category_id;
                this.state.initParams.page = 0
            }
        }



        if (this.state.sort_by) {
            this.state.initParams.sort_by = this.state.sort_by;
        }
        this.state.initParams.keyword = this.state.searchText;

        console.log('this.state', this.state.initParams);

        if (this.state.somethingWentWrong) {
            this.props.actions.Actions.categories(this.onSuccessCategory, this.onErrorCategory);
            this.fetchfilter(this.state.initParams);
        } else {
            this.fetchfilter(this.state.initParams);
        }
    }



    handleDealClick(listing) {
        this.props.actions.Actions.setselectedProduct(listing);
        this.props.navigation.navigate('ProductView')
    }

    handleLoadMoreClick() {

        this.state.page = this.state.page + 1;
        this.state.animatingLoadMore = true
        this.setState({ page: this.state.page, animatingLoadMore: this.state.animatingLoadMore })
        this.state.initParams.page = this.state.page;
        this.fetchfilter(this.state.initParams)

    }


    handleFavClick(listing, index) {
        // console.log('SelectedMeal', index);
        listing.FAV = !listing.FAV;
        listing.isLoading = true;
        this.state.list[index] = listing;
        this.setState({ list: this.state.list, lastindex: index })
        if (!listing.FAV) {
            this.props.actions.Actions.favouriteProducts({ status: 0, meal_id: listing.meal_id }, this.onSuccessFavourite, this.onErrorFavourite);
        } else {
            this.props.actions.Actions.favouriteProducts({ status: 1, meal_id: listing.meal_id }, this.onSuccessFavourite, this.onErrorFavourite);
        }
    }



    addToCart(check, Product) {


        console.log(Product);

        Product.cartquantity = 1;
        Product.cartOptions = [];
        Product.productOptionUnique = '' + Product.product_id;
        if (this.props.data.cart.list) {
            for (let k in this.props.data.cart.list) {
                if (this.props.data.cart.list[k].product_id.toString() === Product.product_id.toString()) {
                    founded = true;
                    Product.cartquantity = this.props.data.cart.list[k].cartquantity;
                    Product.cartquantity = this.props.data.cart.list[k].cartquantity;;
                }
            }
        }


        const { hideModel, cart } = this.props;
        if (check == 'view') {
            hideModel();
            setTimeout(() => {
                if (!cart) {
                    this.props.navigation.navigate('Cart');
                }
            }, 500);
            return;
        }
        this.setState({ submit: true });

        if (check === '+' || check === 'add') {


            var move = true;
            var productOptionUnique = '';
            if (Product?.product_options?.length !== 0) {


                Product.cartOptions = [];

                for (let k in this.state.DATA) {
                    var checkfor = false;
                    for (let kk in this.state.DATA[k].data.list) {
                        if (this.state.DATA[k].data.list[kk].selected) {
                            Product.cartOptions.push(this.state.DATA[k].data.list[kk]);
                            productOptionUnique = productOptionUnique + '-' + this.state.DATA[k].data.list[kk].filter_option_id + '-' + this.state.DATA[k].data.list[kk].title
                            checkfor = true;
                        }
                    }

                    if (!checkfor) {
                        this.setState({ submit: false });
                        move = false;
                        this.dropDownAlertRef.alertWithType('info', translate('Message'), translate('Please select') + ' ' + this.state.DATA[k].title);
                    }
                }
            }

            console.log('checkfor', productOptionUnique);
            console.log('checkfor', this.state.selectedCheck);
            console.log('checkfor', this.props.data.cart);

            // if (move) {
            //     this.setState({ submit: false });
            //     return;
            // }

            if (check === '+' || check === 'add') {
                this.setState({ cartquantity: this.state.cartquantity + 1, viewCart: true });
            } else {
                this.setState({ cartquantity: 1, viewCart: false });
            }


        }

        console.log('State cartquantity', this.state.cartquantity);
        if (check === '-') {
            if (this.state.cartquantity >= 2)
                this.setState({ cartquantity: this.state.cartquantity - 1 });
            if (this.state.cartquantity === 1) {


                let check = false;
                let index = -1;
                for (let k in this.props.data.cart.list) {
                    if (this.props.data.cart.list[k].product_id === Product.product_id) {
                        this.props.data.cart.list[k].cartquantity = 0;
                        check = true;
                        index = k;
                    }
                }

                if (check) {
                    this.remove({}, index);
                }

                this.setState({ submit: false });
                return;

            }
        }


        console.log('State cartquantity', this.state.cartquantity);

        if (!move) {
            this.setState({ submit: false });
            return;
        }
        if (this.state.cartquantity === 0) {
            this.state.cartquantity = 1;
        }
        Product.cartquantity = this.state.cartquantity;

        setTimeout(() => {
            this.setState({ submit: false })
            if (this.props.data.cart.list) {
                for (let k in this.props.data.cart.list) {
                    if (this.props.data.cart.list[k].shop_id !== Product.shop_id) {
                        this.alertForChange(k, Product);
                        return;
                    }
                }


                let check = false;
                let index = -1;
                for (let k in this.props.data.cart.list) {
                    if (this.props.data.cart.list[k].product_id === Product.product_id) {
                        this.props.data.cart.list[k].cartquantity = this.state.cartquantity;
                        check = true;
                        index = k;
                    }
                }
                console.log(check);

                if (check) {
                    this.props.data.cart.list[index] = Product;
                } else {
                    console.log(Product);
                    if (Product.shop) {
                        this.props.data.cart.list.push(Product);
                    }

                }

                this.props.actions.Actions.setCartUpdates(this.props.data.cart);
                showSuccess(Product.name + ' * ' + Product.cartquantity + ' added into cart');
                ReactNativeHapticFeedback.trigger('impactLight', {
                    enableVibrateFallback: true,
                    ignoreAndroidSystemSettings: false
                });

            } else {
                console.log(Product);
                this.props.data.cart.list = [];
                if (Product.shop)
                    this.props.data.cart.list.push(Product);
                this.props.actions.Actions.setCartUpdates(this.props.data.cart);
                showSuccess(Product.name + ' added into cart');
                ReactNativeHapticFeedback.trigger('impactLight', {
                    enableVibrateFallback: true,
                    ignoreAndroidSystemSettings: false
                });

            }


        }, 100);
    }



    async alertForChange(k, Product) {
        Alert.alert(
            translate('Message'),
            translate('Are you sure you want to leave') + ' ' + this.props.data.cart.list[k].shop.title + " ?",
            [
                {
                    text: translate('Yes'), onPress: () => {
                        this.props.data.cart.list = [];
                        this.props.data.cart.list.push(Product);
                        this.props.actions.Actions.setCartUpdates(this.props.data.cart);
                        showSuccess(Product.name + ' * ' + Product.cartquantity + ' ' + translate('added into cart'));
                        ReactNativeHapticFeedback.trigger('impactLight', {
                            enableVibrateFallback: true,
                            ignoreAndroidSystemSettings: false
                        });

                        return;
                    }
                },
                {
                    text: translate('Cancel'), onPress: () => {
                        return;

                    }, style: 'cancel',
                },
            ],
            { cancelable: false },
        );
    }



    onSuccessFavourite = (data) => {
        for (let k in this.state.list) {
            this.state.list[k].isLoading = false;
        }
        if (data.code === 200) {
            setTimeout(() => {
                this.setState({ list: this.state.list })
            }, 400);
        } else {

            var listing = this.state.list[this.state.lastindex];
            listing.FAV = !listing.FAV;
            listing.isLoading = false;
            this.state.list[this.state.lastindex] = listing;
            setTimeout(() => {
                this.setState({ list: this.state.list })
            }, 400);
            if (data.code === 401) {
                this.props.navigation.navigate('Login');
            } else {
                showDanger(translate('tryagain'));
            }
        }
    }
    onErrorFavourite = (error) => {
        // console.log('favouriteProducts', error);
    }

    _dropdown;

    render() {
        // console.log(this.state.filter_list)

        let deviceSize = 0;

        if (Dimensions.get('screen').height < 800) {
            deviceSize = deviceSize - 3;
        }

        return (
            <View style={styles.container_scrolling}>
                <StatusBar backgroundColor="transparent" barStyle="light-content" />
                <ImageBackground source={require('app/assets/Background.jpg')} style={{ width: '100%', height: '100%', position: 'absolute', }}></ImageBackground>
                <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
                <View style={[styles.wrapper, { flexDirection: 'column', }]}>
                    <View style={{ height: 55 + getStatusBarHeight() + deviceSize, paddingTop: getStatusBarHeight(), flexDirection: 'row', backgroundColor: theme.colors.primary }}>

                        <View style={{ alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.pop();
                                }}>
                                <Image source={require('app/assets/BACKBUTTON.png')} style={{ marginLeft: 15, marginRight: 15, marginTop: -3, height: scale(20), width: scale(20), ...I18nManager.isRTL ? { transform: [{ rotate: '180deg' }] } : {} }} resizeMode="contain" />
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            height: moderateScale(35) + deviceSize,
                            marginTop: moderateScale(5),
                            marginEnd: moderateScale(15),
                            flex: 1, backgroundColor: theme.colors.white,
                            borderRadius: moderateScale(20),
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.12,
                            shadowRadius: 1.22,
                            elevation: 3,
                        }}>
                            <View
                                style={{ flex: 1 }}
                                onPress={() => {
                                }}>
                                <View style={{ marginStart: 8, marginEnd: 8, marginTop: 6.5, marginBottom: 6.5, flex: 1, flexDirection: 'row', alignContent: 'center', alignItems: 'center', }}>
                                    <View style={{ flex: 1, flexDirection: 'row', ...I18nManager.isRTL ? { flexDirection: 'row-reverse' } : { flexDirection: 'row-reverse' } }}>
                                        <TextInputSearch onChangeText={(value) => this.setState({ searchText: value })} value={this.state.searchText} onSubmitEditing={this.onSubmitEditing} style={{ marginStart: 10, color: theme.colors.primary, opacity: 0.75, fontSize: moderateScale(16), ...I18nManager.isRTL ? { textAlign: 'right' } : {}, }} ></TextInputSearch>
                                        {this.state.searchText !== '' && !this.state.animating &&
                                            <TouchableOpacity onPress={() => {
                                                this.state.searchText = '';
                                                this.setState({ searchText: this.state.searchText });
                                                this.onSubmitEditing();
                                            }}>

                                            </TouchableOpacity>
                                        }
                                    </View>
                                    <View style={{ width: 1, height: '80%', borderColor: theme.colors.gray03, borderWidth: 0.5, fontWeight: '300', position: 'absolute', zIndex: 1, right: 0, marginRight: 50 }}></View>
                                    {!this.state.animating &&
                                        <View>
                                            <Image source={require('app/assets/search.png')} style={{ height: scale(25), width: scale(25), bottom: scale(0), marginLeft: 10, marginRight: 10, fontWeight: '500' }} />
                                        </View>

                                    }
                                    {this.state.animating &&
                                        <ActivityIndicator animating={this.state.animating} color={theme.colors.primary} hidesWhenStopped={true} style={{ position: 'absolute', zIndex: 1, height: 40, width: 39, right: 0 }} />
                                    }
                                </View>
                            </View>
                        </View>




                    </View>
                    <View style={{ paddingBottom: 10, marginTop: 0 }}>
                        {!this.state.initalLoad && !this.state.somethingWentWrong &&
                            <FilterCategories filters={this.state.filter_list} handleCategoryClick={this.handleCategoryClick} />
                        }
                        {this.state.somethingWentWrong &&
                            <ContentLoader height={28} width={'100%'} speed={1} style={{ marginLeft: 12, marginRight: 22, }} backgroundColor={'#333'} foregroundColor={'#333'} >
                                <Rect x="0%" y="0" rx="0" ry="0" width="24%" height="100%" />
                                <Rect x="25%" y="0" rx="0" ry="0" width="20%" height="100%" />
                                <Rect x="46%" y="0" rx="0" ry="0" width="20%" height="100%" />
                                <Rect x="67%" y="0" rx="0" ry="0" width="20%" height="100%" />
                                <Rect x="88%" y="0" rx="0" ry="0" width="20%" height="100%" />
                            </ContentLoader>}
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column' }}>

                        <View style={{ zIndex: 1, flex: 1, flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row', paddingStart: 20, margin: 2, alignItems: 'center' }}>
                                <Text style={{ color: theme.colors.white, fontSize: moderateScale(20) }}>{'Showing'.toUpperCase()} {'('}{this.state.list.length}{')'} </Text>
                            </View>

                            {this.state.animating && !this.state.somethingWentWrong && !this.state.animatingLoadMore &&
                                <View style={{ flexDirection: 'column' }}>
                                    {/* <View style={{ height: 145, flexDirection: 'column', marginTop: 20 }}>

                                        <ContentLoader height={145} width={'100%'} speed={1} style={{ marginLeft: 22, marginRight: 22, }} backgroundColor={theme.colors.secondary} foregroundColor={theme.colors.gray} >
                                            <Rect x={I18nManager.isRTL ? "11%" : "0%"} y="0" rx="0" ry="0" width="35%" height="110" />
                                            <Rect x={I18nManager.isRTL ? "5%" : "0%"} y="115" rx="0" ry="0" width="18%" height="15" />
                                            <Rect x={I18nManager.isRTL ? "30%" : "20%"} y="110.5" rx="0" ry="0" width="20%" height="25" />
                                        </ContentLoader>


                                        <ContentLoader height={110} width={'89%'} speed={1} style={{ marginLeft: 22, marginRight: 22, position: 'absolute', borderWidth: 0.5, borderColor: theme.colors.white, }} backgroundColor={theme.colors.secondary} foregroundColor={theme.colors.gray}
                                            foregroundOpacity={0.001} interval={0.1}>
                                            <Rect x="45%" y="10" rx="0" ry="0" width="35%" height="20" />
                                            <Rect x="45%" y="40" rx="0" ry="0" width="50%" height="30" />
                                            <Rect x="45%" y="80" rx="0" ry="0" width="45%" height="15" />
                                        </ContentLoader>

                                    </View>


                                    <View style={{ height: 145, flexDirection: 'column' }}>

                                        <ContentLoader height={145} width={'100%'} speed={1} style={{ marginLeft: 22, marginRight: 22, }} backgroundColor={theme.colors.secondary} foregroundColor={theme.colors.gray} >
                                            <Rect x={I18nManager.isRTL ? "11%" : "0%"} y="0" rx="0" ry="0" width="35%" height="110" />
                                            <Rect x={I18nManager.isRTL ? "5%" : "0%"} y="115" rx="0" ry="0" width="18%" height="15" />
                                            <Rect x={I18nManager.isRTL ? "30%" : "20%"} y="110.5" rx="0" ry="0" width="20%" height="25" />
                                        </ContentLoader>


                                        <ContentLoader height={110} width={'89%'} speed={1} style={{ marginLeft: 22, marginRight: 22, position: 'absolute', borderWidth: 0.5, borderColor: theme.colors.white }} backgroundColor={theme.colors.secondary} foregroundColor={theme.colors.gray}
                                            foregroundOpacity={0.001} interval={0.1}>
                                            <Rect x="45%" y="10" rx="0" ry="0" width="35%" height="20" />
                                            <Rect x="45%" y="40" rx="0" ry="0" width="50%" height="30" />
                                            <Rect x="45%" y="80" rx="0" ry="0" width="45%" height="15" />
                                        </ContentLoader>

                                    </View>



                                    <View style={{ height: 145, flexDirection: 'column' }}>

                                        <ContentLoader height={145} width={'100%'} speed={1} style={{ marginLeft: 22, marginRight: 22, }} backgroundColor={theme.colors.secondary} foregroundColor={theme.colors.gray} >
                                            <Rect x={I18nManager.isRTL ? "11%" : "0%"} y="0" rx="0" ry="0" width="35%" height="110" />
                                            <Rect x={I18nManager.isRTL ? "5%" : "0%"} y="115" rx="0" ry="0" width="18%" height="15" />
                                            <Rect x={I18nManager.isRTL ? "30%" : "20%"} y="110.5" rx="0" ry="0" width="20%" height="25" />
                                        </ContentLoader>


                                        <ContentLoader height={110} width={'89%'} speed={1} style={{ marginLeft: 22, marginRight: 22, position: 'absolute', borderWidth: 0.5, borderColor: theme.colors.white }} backgroundColor={theme.colors.secondary} foregroundColor={theme.colors.gray}
                                            foregroundOpacity={0.001} interval={0.1}>
                                            <Rect x="45%" y="10" rx="0" ry="0" width="35%" height="20" />
                                            <Rect x="45%" y="40" rx="0" ry="0" width="50%" height="30" />
                                            <Rect x="45%" y="80" rx="0" ry="0" width="45%" height="15" />
                                        </ContentLoader>

                                    </View>



                                    <View style={{ height: 145, flexDirection: 'column' }}>

                                        <ContentLoader height={145} width={'100%'} speed={1} style={{ marginLeft: 22, marginRight: 22, }} backgroundColor={theme.colors.secondary} foregroundColor={theme.colors.gray} >
                                            <Rect x={I18nManager.isRTL ? "11%" : "0%"} y="0" rx="0" ry="0" width="35%" height="110" />
                                            <Rect x={I18nManager.isRTL ? "5%" : "0%"} y="115" rx="0" ry="0" width="18%" height="15" />
                                            <Rect x={I18nManager.isRTL ? "30%" : "20%"} y="110.5" rx="0" ry="0" width="20%" height="25" />
                                        </ContentLoader>

                                        <ContentLoader height={110} width={'89%'} speed={1} style={{ marginLeft: 22, marginRight: 22, position: 'absolute', borderWidth: 0.5, borderColor: theme.colors.white }} backgroundColor={theme.colors.secondary} foregroundColor={theme.colors.gray}
                                            foregroundOpacity={0.001} interval={0.1}>
                                            <Rect x="45%" y="10" rx="0" ry="0" width="35%" height="20" />
                                            <Rect x="45%" y="40" rx="0" ry="0" width="50%" height="30" />
                                            <Rect x="45%" y="80" rx="0" ry="0" width="45%" height="15" />
                                        </ContentLoader>

                                    </View> */}
                                </View>}
                            {!this.state.animating && !this.state.somethingWentWrong &&
                                <View style={{ flex: 1, marginTop: moderateScale(5) }}>
        
                                    <ResturentsListing
                                        listings={this.state.list}
                                        handleClick={this.handleDealClick}
                                        showAddToFav={false}
                                        addtocart={(item) => { this.addToCart('add', item) }}
                                        handleLoadMoreClick={this.handleLoadMoreClick}
                                        animatingLoadMore={this.state.animatingLoadMore}
                                        noMoreProducts={this.state.noMoreProducts}
                                    />
                                </View>
                            }
                            {this.state.somethingWentWrong &&
                                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
                                    <Text style={{ color: theme.colors.white, marginTop: '40%', fontSize: 20, textAlign: 'center', textTransform: 'capitalize' }}>something went wrong please try again</Text>
                                    <Button mode="contained" isLoading={this.state.animating} style={{ backgroundColor: theme.colors.white, borderColor: 'transparent', color: theme.colors.primary, borderRadius: 0, marginTop: 30, width: 150, alignSelf: 'center' }} textStyle={{
                                        fontSize: 15,
                                        fontWeight: '600',
                                        color: theme.colors.primary,
                                    }}
                                        onPress={() => this.FilterCalulations()}>
                                        {translate('tryagain')}</Button>
                                </View>
                            }

                        </View>


                    </View>
                </View>

            </View >
        );


    }


}

const mapStateToProps = (state) => ({
    data: {
        navigation: state,
        cart: state.app.cart,
    }
})


const mapDispatchToProps = (dispatch) => ({
    actions: {
        Actions: bindActionCreators(loginActions, dispatch)
    }
})


const styles = StyleSheet.create({
    container_scrolling: {
        flex: 1,
        flexDirection: 'column',
    },
    wrapper: {
        flex: 1,
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
        paddingEnd: 10,
        paddingTop: 7,
        paddingBottom: 7,
        backgroundColor: theme.colors.secondary,
        borderColor: theme.colors.white,
        borderWidth: 1,
        marginEnd: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 35,
        height: 35,
    },
    listingType: {
        color: theme.colors.white,
        fontSize: moderateScale(10),
        textAlign: 'center',
        alignItems: 'center',
    },
    crossrating: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginEnd: 10,
        marginTop: 10,
        zIndex: 4,
        width: '10%',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Filters))


