import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableHighlight,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { add } from 'react-native-reanimated';

import {SwipeListView} from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import ScheduledSlots from '../models/ScheduledSlots';

const ScheduledSlotsScreen = () => {

    const [listData, setListData] = useState(
        ScheduledSlots.map((ScheduledSlotsItem, index) => ({
          key: `${index}`,
          day: ScheduledSlotsItem.day,
          month: ScheduledSlotsItem.month,
          time: ScheduledSlotsItem.time,
        })),
      );
        
      const VisibleItem = props => {
        const { data } = props;
        return (
          <View style={styles.rowFront} >
                <TouchableHighlight
                  style={styles.rowFrontVisible}
                  onPress={() => console.log('Element touched')}
                  underlayColor={'#aaa'}
                  >
                <View flexDirection='row'>
                    <View alignItems='center' >
                        <Text style={styles.day} >
                        {data.item.day}{data.item.month}
                        </Text>
                    </View>
                    <View justifyContent='center' alignItems='center' marginLeft={150}>
                        <Text style={styles.time} >
                            {data.item.time}
                            </Text>
                    </View>
                </View>
                </TouchableHighlight>
                </View>
            );
            
      };

      const renderItem = (data, rowMap) => {
        return (
          <VisibleItem data={data} />
        );
      };

      const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
          rowMap[rowKey].closeRow();
        }
      };

      const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        setListData(newData);
      };

      const HiddenItemWithActions = props => {
          const{ swipeAnimatedValue, onClose, onDelete} = props;
          return(
            <View style={styles.rowBack}>
            <Text>Left</Text>
            <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={onClose}>
            <MaterialCommunityIcons
              name="close-circle-outline"
              size={25}
              style={styles.trash}
              color="#fff"
            />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={onDelete}>
            <Animated.View 
            style={[
                styles.trash,
                {
                  transform: [
                    {
                      scale: swipeAnimatedValue.interpolate({
                        inputRange: [-90, -45],
                        outputRange: [1, 0],
                        extrapolate: 'clamp',
                      }), },],},
              ]}>

            <MaterialCommunityIcons
              name="trash-can-outline"
              size={25}
              style={styles.trash}
              color="#fff"
            />
            </Animated.View>
            </TouchableOpacity>
        </View>
          );
      }

      const renderHiddenItem = (data, rowMap) => {
        return (
            <HiddenItemWithActions
              data={data}
              rowMap={rowMap}
              onClose={() => closeRow(rowMap, data.item.key)}
              onDelete={() => deleteRow(rowMap, data.item.key)}
            />
          );
      };
    return (
        <View style={styles.container} marginTop={40}>
          <StatusBar barStyle="dark-content"/>
          <SwipeListView
            data={listData}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={75}
            rightOpenValue={-150}
            disableRightSwipe
          />
        </View>
        
      );
};

export default ScheduledSlotsScreen;

const styles = StyleSheet.create({
  container: {
      marginTop: 20,
      alignItems: 'center',
      backgroundColor: '#f4f4f4',
      flex: 1,
    },
    text_header: {
      marginBottom: 20,
      color: '#36586f',
      fontWeight: 'bold',
      fontSize: 30
  },
backTextWhite: {
  color: '#FFF',
},
rowFront: {
  backgroundColor: '#FFF',
  borderRadius: 5,
  height: 60,
  margin: 5,
  marginBottom: 15,
  shadowColor: '#999',
  shadowOffset: {width: 0, height: 1},
  shadowOpacity: 0.8,
  shadowRadius: 2,
  elevation: 5,
  width: 350, height: 90
},
rowFrontVisible: {
  backgroundColor: '#FFF',
  borderRadius: 5,
  height: 90,
  padding: 10,
  marginBottom: 15,
},
rowBack: {
  alignItems: 'center',
  backgroundColor: '#DDD',
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingLeft: 15,
  margin: 5,
  marginBottom: 15,
  borderRadius: 5,
  width: 350, height: 90
},
backRightBtn: {
  alignItems: 'flex-end',
  bottom: 0,
  justifyContent: 'center',
  position: 'absolute',
  top: 0,
  width: 75,
  paddingRight: 17,
},
backRightBtnLeft: {
  backgroundColor: '#a8c4c7',
  right: 74,
},
backRightBtnRight: {
  backgroundColor: '#c79840',
  right: 0,
  borderTopRightRadius: 5,
  borderBottomRightRadius: 5,
},
trash: {
  height: 25,
  width: 25,
  marginRight: 7,
},
day: {
  fontSize: 25,
  fontWeight: 'bold',
  marginBottom: 5,
  color: '#a8c4c7',
  marginLeft: 10
},
time: {
  fontSize: 13,
  color: '#999',
},
patientTitle:{
    fontSize: 14,
    color: '#999',
},
patientTitle:{
  fontSize: 14,
  color: '#999',
},
patientDetails:{
  fontSize: 14,
  color: '#36586f',
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