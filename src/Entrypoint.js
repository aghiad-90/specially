import React, { Component } from "react";
import { Platform, NativeModules } from "react-native";
import { Provider } from "react-redux";
import FlashMessage from "react-native-flash-message";
import { theme } from "./core/theme";
import creatSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/rootSaga";
import { createStore, applyMiddleware } from "redux";
import allReducers from "./reducers";
import { setI18nConfig } from "../src/utils/utils";
import { getSettings } from "./utils/storage";
import RootStackNavigator from "./navigation/AppNavigation";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import moment from "moment";
import { Root } from "./components/popup-ui";
import { RootOptions } from "./components/options";

import { TextInput } from "react-native";
import { momentConf } from "./services/config";
TextInput.defaultProps.selectionColor = "black";
console.disableYellowBox = true;
let anLocale = require("moment/locale/en-au");

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, allReducers);

const sagaMiddleware = creatSagaMiddleware();
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
let persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

/**
 *
 *
 * @param {Object} Store  store of the entire App
 * @param {Object} theme  used by the App
 * @returns it will return a redux Provider
 */

class Entrypoint extends Component {
  /**
   * Async function to call getSetting function to get the language settings when the component renderd
   *
   */

  componentDidMount() {
    this.Language();
  }

  /**
   * get the language settings when the render die
   *
   */

  componentWillUnmount() {
    this.Language();
  }

  /**
   * Async function to call getSetting function to get the language settings
   *
   */

  async Language() {
    await getSettings()
      .then((settings) => {
        // // console.log('Settings', settings)
        if (settings) {
          if (settings.language) {
            setI18nConfig("ar");
            moment.locale("ar", momentConf.config);
            this.forceUpdate();
          } else {
            setI18nConfig("en");
            moment.locale("en", anLocale);
            this.forceUpdate();
          }
        } else {
          const deviceLanguage =
            Platform.OS === "ios"
              ? NativeModules.SettingsManager.settings.AppleLocale ||
                NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
              : NativeModules.I18nManager.localeIdentifier;

          console.log(
            "deviceLanguage",
            deviceLanguage.toString().split("_")[0]
          );

          if (
            deviceLanguage
              .toString()
              .split("-")[0]
              .toString()
              .trim() === "ar"
          ) {
            console.log("deviceLanguage", "ar");
            moment.locale("ar", momentConf.config);
            moment.locale(
              deviceLanguage.toString().split("_")[0],
              momentConf.config
            );
            setI18nConfig(deviceLanguage.toString().split("_")[0]);
          } else {
            console.log("deviceLanguage", "en");
            moment.locale("en", anLocale);
            moment.locale(deviceLanguage.toString().split("_")[0], anLocale);
            setI18nConfig(deviceLanguage.toString().split("_")[0]);
          }

          this.forceUpdate();
        }
      })
      .catch((error) => {
        const deviceLanguage =
          Platform.OS === "ios"
            ? NativeModules.SettingsManager.settings.AppleLocale ||
              NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
            : NativeModules.I18nManager.localeIdentifier;

        console.log("Error deviceLanguage", error);

        setI18nConfig("en");
        moment.locale("en", anLocale);
        this.forceUpdate();
      });
  }

  render() {
    return (
      <Provider store={store} theme={theme}>
        <RootOptions>
          <Root>
            <PersistGate loading={null} persistor={persistor}>
              <RootStackNavigator />
            </PersistGate>
            <FlashMessage position="top" />
          </Root>
        </RootOptions>
      </Provider>
    );
  }
}

export default Entrypoint;
