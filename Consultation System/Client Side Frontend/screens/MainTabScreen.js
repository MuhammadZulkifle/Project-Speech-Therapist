import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { View } from 'react-native';

import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import BookedAppointmentsScreen from './BookedAppointmentsScreen';
import ProfileScreen from './ProfileScreen';
import EditProfileScreen from './EditProfileScreen';
import ScheduledSlotsScreen from './ScheduledSlotsScreen';

const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const ScheduleStack = createStackNavigator();
const AppointmentsStack = createStackNavigator();

const HomeStackScreen = ({navigation}) =>(
  <HomeStack.Navigator screenOptions={{
    headerStyle:{
      backgroundColor: '#a8c4c7'
    },
    headerTintColor: '#fff',
    headerTitleStyle:{
      fontWeight: 'bold'
    }
  }}>
    <HomeStack.Screen name="Home" component={HomeScreen}  options={{
      headerLeft: () =>(
        <Icon.Button name="menu" size={25}
        backgroundColor="#a8c4c7" onPress= {
          () => navigation. openDrawer()
        }></Icon.Button>
      )
    }} />
  </HomeStack.Navigator>
);

const ScheduleStackScreen = ({navigation}) =>(
  <ScheduleStack.Navigator screenOptions={{
    headerStyle:{
      backgroundColor: '#a8c4c7'
    },
    headerTintColor: '#fff',
    headerTitleStyle:{
      fontWeight: 'bold'
    }
  }}>
    <ScheduleStack.Screen name="Schedule" component={ScheduledSlotsScreen} options={{
      headerLeft: () =>(
        <Icon.Button name="menu" size={25}
        backgroundColor="#a8c4c7" onPress= {
          () => navigation. openDrawer()
        }></Icon.Button>
      ),
      headerRight: () => (
        <View style={{marginRight: 10}}>
          <MaterialCommunityIcons.Button
            name="account-edit"
            backgroundColor="transparent"
            size={25}
            onPress={() => navigation.navigate('SetSlot')}
          />
        </View>
      ),
    }}/>
    <ScheduleStack.Screen
        name="SetSlot"
        options={{
          title: '',
        }}
        component={DetailsScreen}
      />
  </ScheduleStack.Navigator>
);

const AppointmentsStackScreen = ({navigation}) =>(
  <AppointmentsStack.Navigator screenOptions={{
    headerStyle:{
      backgroundColor: '#a8c4c7'
    },
    headerTintColor: '#fff',
    headerTitleStyle:{
      fontWeight: 'bold'
    }
  }}>
    <AppointmentsStack.Screen name="BookedAppointments" component={BookedAppointmentsScreen}  options={{
      headerLeft: () =>(
        <Icon.Button name="menu" size={25}
        backgroundColor="#a8c4c7" onPress= {
          () => navigation. openDrawer()
        }></Icon.Button>
      )
    }} />
  </AppointmentsStack.Navigator>
);

const ProfileStackScreen = ({navigation}) =>(
  <ProfileStack.Navigator screenOptions={{
    headerStyle:{
      backgroundColor: '#a8c4c7',
      elevation: 0
    },
    headerTintColor: '#fff',
    headerTitleStyle:{
      fontWeight: 'bold'
    }
  }}>
    <ProfileStack.Screen name="Profile" component={ProfileScreen}  options={{
      headerLeft: () =>(
        <Icon.Button name="menu" size={25}
        backgroundColor="#a8c4c7" onPress= {
          () => navigation.openDrawer()
        }></Icon.Button>
      ),
      headerRight: () => (
        <View style={{marginRight: 10}}>
          <MaterialCommunityIcons.Button
            name="account-edit"
            backgroundColor="transparent"
            size={25}
            onPress={() => navigation.navigate('EditProfile')}
          />
        </View>
      ),
    }} />
    <ProfileStack.Screen
        name="EditProfile"
        options={{
          title: 'Edit Profile',
        }}
        component={EditProfileScreen}
      />
  </ProfileStack.Navigator>
);

const Tab = createMaterialBottomTabNavigator();

export default function MainTabScreen() {
    return (
        <Tab.Navigator
        initialRouteName="Home"
        activeColor="#fff"
        style={{ backgroundColor: 'tomato' }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarColor: '#a8c4c7',
            tabBarIcon: ({ color }) => (
              <Icon name="home" color={color} size={26} />
            ),
          }}
        />
        
        <Tab.Screen
          name="Profile"
          component={ProfileStackScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarColor: '#a8c4c7',
            tabBarIcon: ({ color }) => (
              <Icon name="person" color={color} size={26} />
            ),
          }}
        />
        
        <Tab.Screen
          name="Schedule"
          component={ScheduleStackScreen}
          options={{
            tabBarLabel: 'Schedule',
            tabBarColor: '#a8c4c7',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="calendar" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="BookedAppointments"
          component={AppointmentsStackScreen}
          options={{
            tabBarLabel: 'Appointments',
            tabBarColor: '#a8c4c7',
            tabBarIcon: ({ color }) => (
              <FontAwesome name="clock-o" color={color} size={26}/>
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
