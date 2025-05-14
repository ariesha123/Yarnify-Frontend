import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React from 'react'
import { containerFull } from '../../common css/pagecss'
import { formHead } from '../../common css/formsCss'
import Bottomnavbar from '../../Components/Bottomnavbar'
import TopNavbar from '../../Components/TopNavbar'
import FollowersRandomPost from '../../Components/FollowersRandomPost'


const MainPage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <TopNavbar navigation={navigation} />
      <Bottomnavbar navigation={navigation} />
      <FollowersRandomPost/>
    
    

      
    </View>
  )
}

export default MainPage

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'pink',
    paddingVertical: 100,
  }
})