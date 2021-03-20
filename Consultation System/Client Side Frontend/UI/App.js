import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, Text, Button, View, ActivityIndicator } from 'react-native';

import RootStackScreen from './screens/RootStackScreen';
import { useEffect } from 'react';


import { AuthContext } from './components/context';
import AsyncStorage from '@react-native-community/async-storage';

import MainTabScreen from './screens/MainTabScreen';
import { DrawerContent } from './screens/DrawerContent';
const Drawer = createDrawerNavigator();

const App = () =>{

  //const [isLoading, setIsLoading] = React.useState(true);
  //const [userToken, setUserToken] = React.useState(null); 

  const initialLoginState = {
    isLoading: true,
    mailID: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          emailID: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          mailID: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          mailID: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };
  
  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

   const authContext = React.useMemo(() => ({
    signIn: async(foundUser) => {
      console.log(`User :   ${foundUser.username}`);
      console.log(`User :   ${foundUser.username}`);
      const userToken = String(foundUser[0].userToken);
      const mailID = foundUser[0].email;
        try {
          await AsyncStorage.setItem('userToken', serToken);
        } catch(e) {
          console.log(e);
        }
      dispatch({ type: 'LOGIN', id: mailID, token: userToken});
   },
    signOut: async() => {
      try {
        await AsyncStorage.removeItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT'});
    },
    signUp: () => {
      //setUserToken('fgkj');
      //setIsLoading(false);
    },
  }), []);

  useEffect(() => {
    setTimeout(async() => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000);
  }, []);

  if(loginState.isLoading){
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  

  return(
    <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          { loginState.userToken !== null ? (
            <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
              <Drawer.Screen name="Screen" component={MainTabScreen} />
            </Drawer.Navigator>
            
            )
          :
          <RootStackScreen />
          }
      </NavigationContainer>
    </AuthContext.Provider>
    
  );
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
