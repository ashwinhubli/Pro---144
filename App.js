import React from 'react';
import HomeScreen from './screens/home'
import PopularScreen from './screens/popular';
import RecommendationScreen from './screens/recommendation';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import { RFValue } from 'react-native-responsive-fontsize';


export default function App() {
  return <AppContainer/>
}

const AppTabNavigator= createMaterialTopTabNavigator({
  RecommendedArticles:{
    screen: RecommendationScreen,
    navigationOptions:{
      tabBarLabel:"Recommended",
      tabBarOptions:{
        tabStyle:{backgroundColor:"#ffff"},
        labelStyle:{color:"#000"},
        indicatorStyle:{backgroundColor:"#000"}
      }
    }
  },
  PopularArticles:{
    screen: PopularScreen,
    navigationOptions:{
      tabBarLabel:"Popular",
      tabBarOptions:{
        tabStyle:{backgroundColor:"#ffff"},
        labelStyle:{color:"#000"},
        indicatorStyle:{backgroundColor:"#000"}
      }
    }
  }
})

const AppStackNavigator = createStackNavigator(
  {
    Home :{
      screen: HomeScreen,
      navigationOptions:{
        headerShown:false
      }
    },
  appTopNavigation:{
    screen: AppTabNavigator,
    navigationOptions:{
      headerBackTitle: null,
      headerTintColor: "#fff",
      headerTitle:"Recommend Articles",
      headerStyle:{
        backgroundColor: "#d500f9"
      }
    ,
    headerTitleStyle:{
     fontWeight: "bold",
     fontSize: RFValue(20)
    }
  }
  }
  },
 {initialRouteName:"Home"} 
)

const AppContainer = createAppContainer(AppStackNavigator)