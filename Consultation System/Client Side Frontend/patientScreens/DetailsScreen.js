import 'react-native-gesture-handler';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Platform, TouchableOpacity, TextInput} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';


const DetailsScreen = () =>{
  const [date, setDate] = useState(new Date("2020-09-02T12:00:00"));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View style={styles.container}>
      <View style={styles.button}>
      <TouchableOpacity
                    onPress={showDatepicker}
                    style={styles.picker}
                >
                    <LinearGradient
                        colors={['#a8c4c7', '#7ea4a6']}
                        style={styles.picker}
                    >
                        <Text style={[styles.textPicker, {
                            color:'#fff'
                        }]}>Set Date</Text>
                        <FontAwesome
                            style={styles.pickerIcon}
                            name="calendar"
                            color="#36586f"
                            size={22}
                        />
                    </LinearGradient>
      </TouchableOpacity> 

      <TouchableOpacity
                    onPress={showTimepicker}
                    style={[
                      styles.picker, {
                          marginTop: 15
              }]}>
                    <LinearGradient
                        colors={['#a8c4c7', '#7ea4a6']}
                        style={styles.picker}
                    >
                        <Text style={[styles.textPicker, {
                            color:'#fff'
                        }]}>Set Time</Text>
                        <FontAwesome
                            style={styles.pickerIcon}
                            name="clock-o"
                            color="#36586f"
                            size={22}
                        />
                    </LinearGradient>
      </TouchableOpacity> 
      </View>
      
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 20
  },
  picker: {
      width: '80%',
      height: 50,
      justifyContent: 'center',
      borderRadius: 10,
      flexDirection: 'row'
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
  }
});
