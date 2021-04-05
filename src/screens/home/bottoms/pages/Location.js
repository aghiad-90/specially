/**
 * Airbnb Clone App
 * @author: Andy
 * @Url: https://www.cubui.com
 */

import React, { Component } from 'react';
import {
  View,
  StyleSheet, StatusBar, TouchableOpacity, Image, Dimensions, ActivityIndicator
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../../../actions/Actions';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
import { Platform } from 'react-native';
import { theme } from '../../../../core/theme';
import { translate } from '../../../../utils/utils';
import Header from '../childs/Header'
import { ImageBackground } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Text } from '../../../../components/widget';
import Button from 'apsl-react-native-button'





class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      currentArea: '',
      favouriteListings: [],
      lat: 0,
      lng: 0,
      Operations: true,
      initial: true
    };



  }




  OnLocationSelected = (details) => {
    if (details) {
      console.log('details'.details);
      this.props.actions.locations.setdefaultLocation({ location: details.formatted_address, geometry: { lat: details.geometry.location.lat, lng: details.geometry.location.lng } });
      this._gotoCurrentLocation();
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    // this._gotoCurrentLocation();

  }



  _gotoCurrentLocation() {
    this.map.animateToRegion({
      latitude: this.props.data.selectedLocation.geometry.lat,
      longitude: this.props.data.selectedLocation.geometry.lng,
      latitudeDelta: 0.01122,
      longitudeDelta: 0.01121,
    });
  }

  render() {

    let initallocation = ''

    if (initallocation === translate('locationsError')) {
      initallocation = '';
    }


    return (

      < View style={styles.wrapper} >
        <StatusBar backgroundColor={theme.colors.secondary} barStyle="light-content" />

        {Platform.OS === 'android' &&
          <View style={{ position: 'absolute', alignSelf: 'center' }}>
            <Image source={require('app/assets/pin.png')} style={{ width: 40, height: 60, zIndex: 10, marginBottom: 100 }} />
          </View>
        }

        <View style={{ backgroundColor: theme.colors.primary, }}>
          <Header search={false} navigation={this.props.navigation} Text={'Choose your location'} back={true} />
          <View style={{ width: '100%', position: 'absolute', top: getStatusBarHeight() + moderateScale(41), height: '100%' }}>
            <View style={[styles.mainContainer]}>
              <GooglePlacesAutocomplete
                placeholder={'Search Location'}
                minLength={5} // minimum length of text to search
                autoFocus={false}
                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                listViewDisplayed='true'    // true/false/undefined
                fetchDetails={true}
                renderDescription={row => row.description} // custom description render
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                  this.OnLocationSelected(details);
                }}

                getDefaultValue={() => initallocation}

                query={{
                  // available options: https://developers.google.com/places/web-service/autocomplete
                  key: 'AIzaSyD7HvvWPuPC6h0lo42MPvCANnTHSnf0Jp8',
                  language: 'en', // language of the results
                  types: { country: 'UAE' } // default: 'geocode'
                }}

                styles={{
                  container: {
                    // backgroundColor: theme.colors.secondary,
                  },
                  textInputContainer: {
                    width: '100%', backgroundColor: theme.colors.primary,
                    height: (50),
                    borderWidth: 0,
                    alignSelf: 'center',
                    opacity: 0.9,
                    borderBottomWidth: 0,
                    borderTopWidth: 0,

                  },
                  textInput: {
                    borderWidth: 1, borderColor: theme.colors.gray05,
                    backgroundColor: theme.colors.secondary,
                    fontFamily: "Montserrat-Regular", letterSpacing: 0.3,
                    fontFamily: "GillSans",
                    marginTop: 10.5,
                    backgroundColor: theme.colors.white,
                    borderRadius: 20,
                    paddingStart: 20,
                    paddingStart: 20,
                    height: 35, borderRadius: 20,
                    color: theme.colors.black,
                  },
                  description: {
                    fontWeight: 'bold',
                    opacity: 0.5,
                    zIndex: 2,
                    color: theme.colors.white,
                    backgroundColor: 'black'

                  },
                  predefinedPlacesDescription: {
                    backgroundColor: theme.colors.secondary,
                    backgroundColor: 'black'
                  },

                }}
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                GoogleReverseGeocodingQuery={{
                  // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }}
                GooglePlacesSearchQuery={{
                  // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                  rankby: 'distance',
                  // type: 'cafe'
                }}

                GooglePlacesDetailsQuery={{
                  // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                  fields: 'formatted_address,geometry',
                }}
                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

                debounce={200}
              />

            </View>

          </View>


        </View>



        <MapView
          ref={ref => { this.map = ref; }}
          style={[styles.mapStyle, { justifyContent: 'center', alignContent: 'center', alignItems: 'center', paddingBottom: 50, zIndex: -1 }]}
          initialRegion={{
            latitude: this.state.lat,
            longitude: this.state.lng,
            latitudeDelta: 0.00122,
            longitudeDelta: 0.00121,
          }}
          showsUserLocation={true}
          onRegionChangeComplete={event => {


            if (this.state.initial) {
              this.setState({ initial: false });

              if (this.props.data.selectedLocation.geometry) {
                this.setState({ lat: this.props.data.selectedLocation.geometry.lat, lng: this.props.data.selectedLocation.geometry.lng });
                this._gotoCurrentLocation()
              }
              return;
            }
            this.setState({ isLoading: true });

            console.log('map change event', event.latitude)
            Geocoder.geocodePosition({
              lat: event.latitude,
              lng: event.longitude
            }).then(res => {
              setTimeout(() => {
                this.setState({ isLoading: false });
              }, 400);
              console.log(res[0].subLocality);
              this.props.actions.locations.setdefaultLocation({ location: res[0].formattedAddress, geometry: { lat: event.latitude, lng: event.longitude, } });

            }).catch(err => {
              console.log(err)
            })

          }}
          provider={PROVIDER_GOOGLE}>
          <Image source={require('app/assets/pin.png')} resizeMode="contain" style={{ width: 40, height: 60, zIndex: 10 }} />

        </MapView>

        <ImageBackground resizeMode="stretch" source={require('app/assets/cardback.png')} style={[
          {
            marginHorizontal: moderateScale(10), flexDirection: 'column',
            justifyContent: 'center', alignContent: 'center', alignItems: 'center',
            marginVertical: moderateScale(40), position: 'absolute', bottom: 0, alignSelf: 'center',
            paddingHorizontal: moderateScale(20), paddingVertical: moderateScale(0), width: '90%',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          },]}>
          <TouchableOpacity style={styles.layoutselect} onPress={() => {


            this.map.animateToRegion({
              latitude: this.props.data.selectedLocation.geometry.lat,
              longitude: this.props.data.selectedLocation.geometry.lng,
              latitudeDelta: 0.00122,
              longitudeDelta: 0.00121,
            });
          }}>

            <View style={{
              flexDirection: 'row', width: '100%', marginTop: moderateScale(15),
              backgroundColor: theme.colors.gray05, padding: moderateScale(5), paddingEnd: moderateScale(5),
              justifyContent: 'center', alignSelf: 'center', alignItems: 'center'
            }}>
              <Text numberOfLines={1} style={{
                color: theme.colors.primary, fontSize: moderateScale(15), fontWeight: '500', flex: 1
              }}>
                {this.props.data.selectedLocation.location}
              </Text>

              {!this.state.isLoading &&
                <Image source={require('app/assets/locationpin.png')} resizeMode={'contain'} style={{ width: moderateScale(20), height: moderateScale(20) }} />
              }
              {this.state.isLoading &&
                <View style={{ width: moderateScale(30), height: moderateScale(20) }}>
                  <ActivityIndicator color={theme.colors.primary} />
                </View>
              }
            </View>
          </TouchableOpacity>


          <ImageBackground resizeMode="stretch" source={require('app/assets/buttonback.png')} style={{
            width: moderateScale(200), marginBottom: moderateScale(10), marginTop: moderateScale(10),
            height: moderateScale(40)
          }}>
            <Button mode="contained" isDisabled={this.state.facebookLoading || this.state.googleLoading} isLoading={this.state.isLoading} style={{
              borderColor: 'transparent', color: theme.colors.white, borderRadius: 5, width: '100%',
            }} textStyle={{
              fontSize: moderateScale(19),
              color: theme.colors.primary,
              lineHeight: 26, fontWeight: '500'
            }}
              onPress={() => {
                this.props.navigation.pop();
                this.props.actions.locations.refreashAppLocation({});
              }}>
              {translate('Set location')}</Button>
          </ImageBackground>



        </ImageBackground>


      </View >
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: theme.colors.backgroundColor,
    backgroundColor: 'transparent',
    justifyContent: 'center'

  },
  locatoncontainer: {
    height: '100%', width: '100%', alignContent: 'center',
    position: 'absolute',
    alignItems: 'center', alignSelf: 'center', justifyContent: 'center',
    flexDirection: 'row', backgroundColor: 'transparent', zIndex: 1
  },
  mainContainer: {
    width: '100%',
    position: 'absolute',
    height: '100%'
  },
  categories: {
    marginBottom: 20,
  },
  layoutselect: {

  },
  title: {
    color: theme.colors.primary,
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 6,
    textAlign: 'center',
    padding: 5,
    textAlignVertical: 'center'
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: '100%'
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    flex: 1

  },
});


const mapStateToProps = (state) => ({
  data: {
    selectedLocation: state.login.selectedLocation,
    selectedRequest: state.app.selectedRequest,
  },
})
const mapDispatchToProps = (dispatch) => ({
  actions: {
    locations: bindActionCreators(loginActions, dispatch)
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Location))

