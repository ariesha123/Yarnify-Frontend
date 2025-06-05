import { StyleSheet, Text, View, StatusBar, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Bottomnavbar from '../../Components/Bottomnavbar';
import TopNavbar from '../../Components/TopNavbar';
import FollowersRandomPost from '../../Components/FollowersRandomPost';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MainPage = ({ navigation }) => {
  const [userdata, setUserdata] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('user')
      .then(data => {
        setUserdata(JSON.parse(data));
      })
      .catch(err => alert(err));
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5e7e7" />
      <TopNavbar navigation={navigation} page="Mainpage" notify="Notification" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <FollowersRandomPost />
      </ScrollView>
      <Bottomnavbar navigation={navigation} page="Mainpage" />
    </View>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50, // ensures it doesn’t overlap status bar
  },
  scrollContainer: {
    paddingBottom: 100, // space for bottom navbar
    paddingHorizontal: 10,
  },
});
