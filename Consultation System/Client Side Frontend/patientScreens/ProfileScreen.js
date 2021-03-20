import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, SafeAreaView, Button, View } from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple, TouchableOpacity
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



import eleImage from '../images/elephant.png';

export default function ProfileScreen() {
  

  return (
    <SafeAreaView style={styles.container}>
      
      
    <View style={styles.userInfoSection}>
    
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image 
            source={eleImage} 
            size={80}
          />
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
              color:'#36586f'
            }]}>Amna Ikram</Title>
          </View>
        </View>

        <View style={styles.userInfoSection} marginLeft={-20}>
        <View style={styles.row} marginTop={35}>
          <Icon style={styles.contactImage}
              name= "map-marker-radius"/>
          <Text style={styles.contactText}>Rawalpindi, Pakistan</Text>
        </View>
        <View style={styles.row}>
          <Icon style={styles.contactImage}
              name= "phone"/>
          <Text style={styles.contactText}>0900-78601</Text>
        </View>
        <View style={styles.row}>
          <Icon style={styles.contactImage}
              name= "email"/>
          <Text style={styles.contactText}>amna_ikram@gmail.com</Text>
        </View>
        </View>
      </View>

      <View style={styles.slotsBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title color= '#36586f'>2</Title>
            <Caption>Scheduled Appointments</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title color='#36586f'>0</Title>
            <Caption >Pending Payments</Caption>
          </View>
      </View>

      <View style={styles.menuWrapper}>

        <TouchableRipple style={styles.infoBoxWrapper}>
          <View style={styles.menuItem}> 
            <FontAwesome name="user-md" color='#c79840' size={25}/>
            <Text style={styles.menuItemText}>Speech Problem</Text>
            <View style={styles.margin}>
            <Caption >Stutter</Caption>

            </View>
          </View>
        </TouchableRipple>

        <TouchableRipple style={styles.infoBoxWrapper}>
          <View style={styles.menuItem}> 
            <FontAwesome name="user-md" color='#c79840' size={25}/>
            <Text style={styles.menuItemText}>Problem Level  </Text>
            <View style={styles.margin}>
            <Caption >Mild</Caption>

            </View>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:25
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  slotsBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 80,
    marginTop: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 60,
    marginTop: 25,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: -5,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#36586f',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  contactText:{
    color:"#777777", 
    marginLeft: 20
  },
  contactImage:{
    color:"#777777", 
    fontSize: 15
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
  caption:{
    fontSize: 14,
    color: '#999',
  },
  margin:{
    marginLeft: 55
  }
});