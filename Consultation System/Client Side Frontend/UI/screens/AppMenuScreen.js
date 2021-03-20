import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, Dimensions,View, Platform, TouchableOpacity, ActivityIndicator, TextInput} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/FontAwesome'
import {LinearGradient} from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import blueElephantImage from '../images/blueElephant.png';

const AppMenuScreen = ({navigation}) =>{
    React.useLayoutEffect(() => {
        navigation.setOptions({headerShown: false});
      }, [navigation]);
  return (
    <View style={styles.container}>
        <View style={styles.header}>
                <Animatable.Image 
                    animation="bounceIn"
                    duraton="1500"
                    source={blueElephantImage} 
                    style={styles.logo}
                    //resizeMode='cover'
                />
            </View>
      
      <Animatable.View style={styles.footer} animation='fadeInUpBig'>
      <TouchableOpacity
                    style={[
                      styles.picker, {
                          marginTop: 15
              }]}>
                    <LinearGradient
                        colors={['#c79840', '#c39c4f']}
                        style={styles.picker}
                    >
                        <Text style={[styles.textPicker, {
                            color:'#fff'
                        }]}>Problem Identification</Text>
                    </LinearGradient>
      </TouchableOpacity> 
      <TouchableOpacity
                    style={[
                      styles.picker, {
                          marginTop: 15
              }]}>
                    <LinearGradient
                        colors={['#c79840', '#c39c4f']}
                        style={styles.picker}
                    >
                        <Text style={[styles.textPicker, {
                            color:'#fff'
                        }]}>Problem Resolution</Text>
                    </LinearGradient>
      </TouchableOpacity> 
      <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}
                    style={[
                        styles.picker, {
                            marginTop: 15
                }]}
                >
                    <LinearGradient
                        colors={['#c79840', '#c39c4f']}
                        style={styles.picker}
                    >
                        <Text style={[styles.textPicker, {
                            color:'#fff'
                        }]}>Online Consultation</Text>
                    </LinearGradient>
      </TouchableOpacity> 
            </Animatable.View>
    </View>
  );
}


export default AppMenuScreen;
const {height} = Dimensions.get("screen");
const height_logo = height * 0.30;

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
    flex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center'
},
  picker: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      borderRadius: 10,
      flexDirection: 'row',
  },
  textPicker: {
      fontSize: 18,
      fontWeight: 'bold',
      alignItems: 'flex-start',
      marginLeft: 15,
      marginTop: 13
  },
  pickerIcon: {
    marginLeft: 100,
    alignItems: 'flex-end',
    marginTop: 15
  },
  
  logo: {
    width: height_logo,
    height: height_logo
},
});
