import { createStackNavigator, createAppContainer } from "react-navigation";
import Splash from "../screens/other/Splash";
import BottomTabNavigator from "./TabNavigator";
import About from "../screens/home/bottoms/pages/about";
import ViewForMedia from "../screens/home/bottoms/pages/ViewForMedia";

import ContactUs from "../screens/home/bottoms/pages/contactus";
import bePartner from "../screens/home/bottoms/pages/bePartner";

import Gallery from "../screens/home/bottoms/pages/Gallery";
import Requests from "../screens/home/bottoms/pages/Requests";
import MyRequests from "../screens/home/bottoms/pages/MyRequests";
import Money from "../screens/home/bottoms/pages/Money";
import Pricing from "../screens/home/bottoms/pages/Pricing";
import NewsDetails from "../screens/home/bottoms/pages/NewsDetails";

import Profile from "../screens/home/bottoms/pages/profile";

import Login from "../screens/home/bottoms/auth/Login";
import Register from "../screens/home/bottoms/auth/Register";
import ForgetPassword from "../screens/home/bottoms/auth/ForgetPassword";

import CeleberateDetails from "../screens/home/bottoms/pages/CeleberateDetails";
import MyMood from "../screens/home/bottoms/pages/MyMood";

import CeleberateBooking from "../screens/home/bottoms/pages/CeleberateBooking";
import MakeBooking from "../screens/home/bottoms/pages/MakeBooking";
import MyContract from "../screens/home/bottoms/pages/MyContract";
import Dashboard from "../screens/home/bottoms/pages/Dashboard";
import VerificationProcesss from "../screens/home/bottoms/pages/VerificationProcesss";

import Search from "../screens/home/bottoms/search";

/**
 * Main Navigator for the App
 * @type {Const}
 * @returns it will retrun an Object of Components
 */

const AppStackNavigator = createStackNavigator({
  splash: {
    screen: Splash,
    navigationOptions: {
      header: null,
    },
  },
  home: {
    screen: BottomTabNavigator,
    navigationOptions: {
      header: null,
    },
  },
  CeleberateDetails: {
    screen: CeleberateDetails,
    navigationOptions: {
      header: null,
    },
  },
  MyMood: {
    screen: MyMood,
    navigationOptions: {
      header: null,
    },
  },
  CeleberateBooking: {
    screen: CeleberateBooking,
    navigationOptions: {
      header: null,
    },
  },
  MakeBooking: {
    screen: MakeBooking,
    navigationOptions: {
      header: null,
    },
  },
  search: {
    screen: Search,
    navigationOptions: {
      header: null,
    },
  },
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      header: null,
    },
  },
  VerificationProcesss: {
    screen: VerificationProcesss,
    navigationOptions: {
      header: null,
    },
  },
  MyContract: {
    screen: MyContract,
    navigationOptions: {
      header: null,
    },
  },
  Gallery: {
    screen: Gallery,
    navigationOptions: {
      header: null,
    },
  },
  Requests: {
    screen: Requests,
    navigationOptions: {
      header: null,
    },
  },
  Money: {
    screen: Money,
    navigationOptions: {
      header: null,
    },
  },
  MyRequests: {
    screen: MyRequests,
    navigationOptions: {
      header: null,
    },
  },
  Pricing: {
    screen: Pricing,
    navigationOptions: {
      header: null,
    },
  },
  NewsDetails: {
    screen: NewsDetails,
    navigationOptions: {
      header: null,
    },
  },

  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  Register: {
    screen: Register,
    navigationOptions: {
      header: null,
    },
  },
  ForgetPassword: {
    screen: ForgetPassword,
    navigationOptions: {
      header: null,
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      header: null,
    },
  },

  About: {
    screen: About,
    navigationOptions: {
      header: null,
    },
  },
  ViewForMedia: {
    screen: ViewForMedia,
    navigationOptions: {
      header: null,
    },
  },
  bePartner: {
    screen: bePartner,
    navigationOptions: {
      header: null,
    },
  },
  ContactUs: {
    screen: ContactUs,
    navigationOptions: {
      header: null,
    },
  },
});
const App = createAppContainer(AppStackNavigator);

export default App;
