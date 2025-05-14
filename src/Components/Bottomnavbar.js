import { StyleSheet, Text, View, SafeAreaView, Platform} from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import { icons1 } from '../common css/pagecss';



const Bottomnavbar = ({ navigation }) => {
  return (
    
    <View style= {styles.container}>
        <Entypo name="home" size={24} color="black" style={icons1} 
            onPress={() => navigation.navigate ('MainPage')}
        />
              
        <FontAwesome5 name="search" size={24} color="black"  style={icons1} 
            onPress={() => navigation.navigate ('SearchUserPage')}
        />
        <MaterialIcons name="explore" size={24} color="black"  style={icons1} />
        <Feather name="user" size={24} color="black"  style={icons1} 
            onPress={() => navigation.navigate ('My_UserProfile')}
        />
    </View>
   
  )
}

export default Bottomnavbar

const styles = StyleSheet.create({
   container:
   {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 100,
    borderTopWidth: 1,
    paddingVertical: 10,
    height: 100


   } 
  });