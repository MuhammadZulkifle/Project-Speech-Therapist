import React from 'react';
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { View, Text, TouchableOpacity, Dimensions,StyleSheet,StatusBar,Image } from 'react-native';

import elephantImage from '../images/elephant.png';

export default function SplashScreen({navigation}) {
    React.useLayoutEffect(() => {
        navigation.setOptions({headerShown: false});
      }, [navigation]);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Animatable.Image 
                    animation="bounceIn"
                    duraton="1500"
                    source={elephantImage} 
                    style={styles.logo}
                    //resizeMode='cover'
                />
            </View>

            <Animatable.View style={styles.footer} animation='fadeInUpBig'>
                <Text style={styles.title}>Speech Therapist</Text>
                <Text style={styles.text}>Speech Problems Identification and Rectification Facility</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AppMenuScreen')} >
                    <LinearGradient
                    colors={['#a8c4c7', '#7ea4a6']}
                    style={styles.signIn}
                    >
                        <Text style={styles.textSign} >Proceed to Menu</Text>
                        <View >
                            
                        <MaterialIcons 
                        name="navigate-next"
                        color="#fff"
                        size={20}
                        
                    />
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
  }

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#a8c4c7'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#36586f',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: '#75999f',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
});