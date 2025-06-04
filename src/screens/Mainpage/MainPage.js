import { StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { containerFull } from '../../common css/pagecss'
import { formHead } from '../../common css/formsCss'
import Bottomnavbar from '../../Components/Bottomnavbar'
import TopNavbar from '../../Components/TopNavbar'
import FollowersRandomPost from '../../Components/FollowersRandomPost'
import AsyncStorage from '@react-native-async-storage/async-storage';


const MainPage = ({navigation}) => {

  const [userdata, setUserdata] = React.useState(null)
    useEffect(() => {
        AsyncStorage.getItem('user')
            .then(data => {
                // console.log('async userdata ', data)
                setUserdata(JSON.parse(data))
            })
            .catch(err => alert(err))
    }, [])

    // console.log('userdata ', userdata)

  return (
    <View style={styles.container}>
      <StatusBar />
      <TopNavbar navigation={navigation} page={"Mainpage"} notify={"Notification"}/>
      <Bottomnavbar navigation={navigation}  page={"Mainpage"}/>
      <FollowersRandomPost/>
    
    

      
    </View>
  )
}

export default MainPage

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(245, 231, 231)',
    paddingVertical: 100,
  }
})