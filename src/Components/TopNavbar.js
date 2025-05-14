import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { icons1, icons2, icons3, logo2, logo3 } from '../common css/pagecss'
import Ionicons from '@expo/vector-icons/Ionicons';
import { formHead, formHead2, formHead3, formHead4 } from '../common css/formsCss';


const TopNavbar = ({navigation}) => {
  return (
    <View style={styles.container}>
     <Text style={formHead4}> Yarnify</Text>
      <View style={styles.iconsContainer}>
            <Ionicons name="notifications" size={24} color="black" style={icons2} 
                onPress={
                () => navigation.navigate('NotificationPage')
                      }
            
            />
            <Ionicons name="chatbubbles" size={24} color="black" style={icons2} 
                  onPress={
                () => navigation.navigate('All_Chats')
                      }/>
        </View>
    </View>
  )
}

export default TopNavbar

const styles = StyleSheet.create({
  container:
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    width: '99%',
    height: 50,
    paddingVertical: 10,
    position: 'absolute',
    zIndex: 100,
    top: 30,
    backgroundColor: "pink",
    
  },

  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})