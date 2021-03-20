import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import PatientScreen from '../patientScreens/HomeScreen'
import AppMenuScreen from './AppMenuScreen';

const RootStack = createStackNavigator();

export default function RootStackScreen({navigation}) {
  return (
        <RootStack.Navigator initialRouteName="Home">
            <RootStack.Screen name="SplashScreen" component={SplashScreen} />
            <RootStack.Screen name="AppMenuScreen" component={AppMenuScreen} />
            <RootStack.Screen name="SignInScreen" component={SignInScreen} />
            <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
        </RootStack.Navigator>
  );
}