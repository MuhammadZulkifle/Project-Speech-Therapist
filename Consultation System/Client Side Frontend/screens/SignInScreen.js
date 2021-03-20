import React from 'react';
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { View, Text, TouchableOpacity, TextInput,Platform,StyleSheet ,StatusBar,Alert } from 'react-native';

import { AuthContext } from '../components/context';
//import useFetch from 'react-fetch-hook'
import Users from '../models/users';


export default function SignInScreen({navigation}) {

    React.useLayoutEffect(() => {
        navigation.setOptions({headerShown: false});
      }, [navigation]);
    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const { signIn } = React.useContext(AuthContext);

    const textInputChange = (val) => {
        if( val.length >= 4 ) {
            setData({
                ...data,
                email: val,
                check_textInputChange: false,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: true,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.length >= 8 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if(val.contains)
        if( val.length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const loginHandle = (mailID, password) => {
        const foundUser = Users.filter( item => {
            return mailID == item.email && password == item.password;
        } );

        if ( data.email.length == 0 || data.password.length == 0 ) {
            Alert.alert('Wrong Input!', 'Fields cannot be empty.', [
                {text: 'Okay'}
            ]);
            return;
        }

        if ( foundUser.length == 0 ) {
            Alert.alert('Invalid User!', 'Email or password is incorrect.', [
                {text: 'Okay'}
            ]);
            return;
        }
        navigation.navigate("PatientScreen");
        signIn(foundUser);
    }

  return (

    <View style={styles.container}>
        <View style={styles.header}>
            <StatusBar backgroundColor='#a8c4c7' barStyle="light-content"/>
            <Text style={styles.text_header}>Sign In</Text>
        </View>

        <Animatable.View style={styles.footer} animation='fadeInUpBig'>
            <Text style={styles.text_footer}>Email</Text>
            <View style={styles.action}>
                <FontAwesome
                    name="user"
                    color="#36586f"
                    size={20}
                />
                <TextInput
                    placeholder="Your Email"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                />
                {data.check_textInputChange ?
                    <Animatable.View animation="bounceIn">
                        <Feather
                        name="check-circle"
                        color="#36586f"
                        size={13}
                    />
                    </Animatable.View>
                : null}

            </View>
            { data.isValidUser ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
                    </Animatable.View>
                }

            <Text style={[styles.text_footer,{
                marginTop: 35
            }]}>Password</Text>

            <View style={styles.action}>
                <FontAwesome
                    name="lock"
                    color="#36586f"
                    size={20}
                />
                <TextInput
                    placeholder="Your Password"
                    style={styles.textInput}
                    autoCapitalize="none"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity onPress={updateSecureTextEntry}> 
                    {data.secureTextEntry ?
                        <Feather
                            name="eye-off"
                            color="#36586f"
                            sixe={20}
                        />
                    :
                        <Feather
                            name="eye"
                            color="#36586f"
                            sixe={20}
                        />
                    }
                </TouchableOpacity>
            </View>

            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Use 8 or more characters.</Text>
            </Animatable.View>
            }

            <View style={styles.button}>
                <TouchableOpacity
                    onPress= {() => {loginHandle(data.email, data.password)}}
                    style={styles.signIn}
                >
                    <LinearGradient
                        colors={['#a8c4c7', '#7ea4a6']}
                        style={styles.signIn}
                    >
                        <Text style={[styles.textSign, {
                            color:'#fff'
                        }]}>Sign In</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => navigation.navigate('SignUpScreen')}
                    style ={[
                        styles.signIn, {
                            borderColor: '#a8c4c7',
                            borderWidth: 1,
                            marginTop: 15
                }]}>
                    <Text style={[styles.textSign, {
                        color: '#a8c4c7'
                    }]}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </Animatable.View>
</View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#a8c4c7'
    },
    header: {
        flex: 1.3,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 2.5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#36586f',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#36586f',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#c79840',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });