import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from "./src/Components/Login";
import LoginC from "./src/Components/LoginC";
import Registro  from "./src/Components/Registro";

const RootStack = createStackNavigator(
  { 
    LoginC:{screen: LoginC, navigationOptions:{headerShown:false}},
    Login:{screen: Login, navigationOptions:{title:'Login'}},
    Registro:{screen: Registro},
  }
);
const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}