import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

import ImagePicker from 'react-native-image-crop-picker';
import eleImage from '../images/elephant.png';


const EditProfileScreen = () => {

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Change Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} >
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} >
        <Text style={styles.panelButtonTitle}>Choose From Gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

   const bs = React.createRef();
   const fall = new Animated.Value(1);
    return(
        <View style={styles.container}>
          <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <Animated.View style={{margin: 20,
        opacity: Animated.add(0.2, Animated.multiply(fall, 1.0)),
    }}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() => bs.current.snapTo(0)} >
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground source={eleImage} style={{height: 100, width: 100}} imageStyle={{borderRadius: 15}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon name="camera" size={35} style={styles.profileImage}/>
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.action} marginTop={35}>
          <FontAwesome name="user" color='#36586f' size={20} />
          <TextInput
            placeholder="Amna"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: '#000',
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="user" color='#36586f' size={20} />
          <TextInput
            placeholder="Ikram"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: '#000',
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="phone" color='#36586f' size={20} />
          <TextInput
            placeholder="0900-78601"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: '#000',
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="envelope" color='#36586f' size={20} />
          <TextInput
            placeholder="amna_ikram@gmail.com"
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: '#000',
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="globe" color='#36586f' size={20} />
          <TextInput
            placeholder="Pakistan"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: '#000',
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <Icon name="map-marker-outline" color='#36586f' size={20} />
          <TextInput
            placeholder="Rawalpindi"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: '#000',
              },
            ]}
          />
        </View>

        <View style={styles.action}>
          <Icon name="school" color='#36586f' size={20} />
          <TextInput
            placeholder="Stutter"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: '#000',
              },
            ]}
          />
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-md" color='#36586f' size={21} />
          <TextInput
            placeholder="Mild"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: '#000',
              },
            ]}
          />
        </View>

        <TouchableOpacity style={styles.commandButton} onPress={() => {}}>
          <Text style={styles.panelButtonTitle}>Update</Text>
        </TouchableOpacity>
        </Animated.View>
        </View>
    );
}

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    commandButton: {
      padding: 15,
      borderRadius: 10,
      backgroundColor: '#a8c4c7',
      alignItems: 'center',
      marginTop: 3,
      marginLeft: 10,
      marginRight: 10
    },
    panel: {
      padding: 20,
      backgroundColor: '#FFFFFF',
      paddingTop: 20,
      // borderTopLeftRadius: 20,
      // borderTopRightRadius: 20,
      // shadowColor: '#000000',
      // shadowOffset: {width: 0, height: 0},
      // shadowRadius: 5,
      // shadowOpacity: 0.4,
    },
    header: {
      backgroundColor: '#FFFFFF',
      shadowColor: '#333333',
      shadowOffset: {width: -1, height: -3},
      shadowRadius: 2,
      shadowOpacity: 0.4,
      // elevation: 5,
      paddingTop: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    panelHeader: {
      alignItems: 'center',
    },
    panelHandle: {
      width: 40,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#00000040',
      marginBottom: 10,
    },
    panelTitle: {
      fontSize: 27,
      fontWeight: 'bold',
      height: 35,
      color: '#36586f',
    },
    panelSubtitle: {
      fontSize: 14,
      color: 'gray',
      height: 30,
      marginBottom: 10,
    },
    panelButton: {
      padding: 13,
      borderRadius: 10,
      backgroundColor: '#c79840',
      alignItems: 'center',
      marginVertical: 7,
    },
    panelButtonTitle: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'white',
    },
    action: {
      flexDirection: 'row',
      marginTop: 10,
      marginLeft: 15,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#dddddd',
      paddingBottom: 5,
    },
    actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5,
    },
    textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -5,
      paddingLeft: 30,
      color: '#05375a',
    },
    profileImage:{
        
                    color:'#36586f',
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: 'transparent',
                      borderRadius: 10,
    }
  });