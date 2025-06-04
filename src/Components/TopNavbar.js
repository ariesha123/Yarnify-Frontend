import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { icons1, icons2, icons3, logo2, logo3 } from '../common css/pagecss'
import Ionicons from '@expo/vector-icons/Ionicons';
import { formHead, formHead2, formHead3, formHead4 } from '../common css/formsCss';


const TopNavbar = ({navigation, page, notify }) => {

  //console.log(page)
  return (
    <View style={styles.container}>
     <Text style={formHead4}> </Text>
      <View style={styles.iconsContainer}>
            {
              notify == 'Notification' &&
                    <Ionicons name="notifications" size={24} color="black" style={icons2} 
                onPress={
                () => navigation.navigate('NotificationPage')
                      }
            
            />
            }
            
            {
              page == 'Mainpage' && 
                 <Ionicons name="chatbubbles" size={24} color="black" style={icons2} 
                  onPress={ () => navigation.navigate('All_Chats') }/>
            }

             {
                page === 'My_UserProfile' &&
                <Ionicons name="settings-sharp" size={24} color="black" style={icons2} onPress
                    ={
                        () => navigation.navigate('Settings1')
                    } />
            }
            
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
        alignItems: 'center',
        width: '100%',
        paddingVertical: 10,
        position: 'absolute',
        top: 0,
        zIndex: 100,
        backgroundColor: "rgb(241, 212, 212)",
    
  },

  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})