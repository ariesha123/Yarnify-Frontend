import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React from 'react'
import { containerFull } from '../../common css/pagecss'
import { formHead } from '../../common css/formsCss'
import Bottomnavbar from '../../Components/Bottomnavbar'
import TopNavbar from '../../Components/TopNavbar'
import FollowersRandomPost from '../../Components/FollowersRandomPost'

const My_UserProfile = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <TopNavbar navigation={navigation} />
      <Bottomnavbar navigation={navigation} page= {"My_UserProfile"} />
      <Text style={formHead}> Your Profile</Text>
    
    

      
    </View>
  )
}

export default My_UserProfile

const styles = StyleSheet.create({
  
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'pink',
    paddingVertical: 100,
  }
})