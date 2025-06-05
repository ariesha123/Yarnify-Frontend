
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
  Image,
  ActivityIndicator,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Bottomnavbar from '../../Components/Bottomnavbar';
import TopNavbar from '../../Components/TopNavbar';
import nopic from '../../../assets/nopic.jpeg';
import { Foundation } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const My_UserProfile = ({ navigation }) => {
  const [userdata, setUserdata] = useState(null);

  const loaddata = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (!value) {
        Alert.alert('Error', 'User not found. Please login again.');
        navigation.navigate('Login');
        return;
      }

      const parsedUser = JSON.parse(value);
      const token = parsedUser.token;

      const response = await fetch('http://192.168.0.101:3000/userdata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const text = await response.text();
      console.log('Raw response:', text); 

      try {
        const data = JSON.parse(text);
        if (data.message === 'User Found') {
          setUserdata(data.user);
        } else {
          Alert.alert('Session Expired', 'Please login again.');
          navigation.navigate('Login');
        }
      } catch (e) {
        console.error('Failed to parse response:', e);
        Alert.alert('Server Error', 'Invalid response from server.');
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Load Data Error:', error);
      Alert.alert('Network Error', 'Please check your connection or login again.');
      navigation.navigate('Login');
    }
  };

  useEffect(() => {
    loaddata();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="rgb(229, 206, 206)" barStyle="dark-content" />
      <View style={styles.container}>
        <TopNavbar navigation={navigation} page="My_UserProfile" />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Foundation
            name="refresh"
            size={30}
            color="white"
            style={styles.refresh}
            onPress={loaddata}
          />
          {userdata ? (
            <>
              <View style={styles.c1}>
                <Image
                  style={styles.profilepic}
                  source={userdata.profilepic.length > 0 ? { uri: userdata.profilepic } : nopic}
                />
                <Text style={styles.txt}>@{userdata.username}</Text>

                <View style={styles.c11}>
                  <View style={styles.c111}>
                    <Text style={styles.txt1}>Followers</Text>
                    <Text style={styles.txt2}>{userdata.followers.length}</Text>
                  </View>
                  <View style={styles.vr1}></View>
                  <View style={styles.c111}>
                    <Text style={styles.txt1}>Following</Text>
                    <Text style={styles.txt2}>{userdata.following.length}</Text>
                  </View>
                  <View style={styles.vr1}></View>
                  <View style={styles.c111}>
                    <Text style={styles.txt1}>Posts</Text>
                    <Text style={styles.txt2}>{userdata.posts.length}</Text>
                  </View>
                </View>

                {userdata.description.length > 0 && (
                  <Text style={styles.description}>{userdata.description}</Text>
                )}
              </View>

              {userdata.posts.length > 0 ? (
                <View style={styles.c1}>
                  <Text style={styles.txt}>Your Posts</Text>
                  <View style={styles.c13}>
                    {userdata.posts.map((item) => (
                      <TouchableOpacity
                        key={item._id}
                        onPress={() =>{
                          console.log('Navigating to post:', item._id)
                          navigation.navigate('PostDetails', { postId: item._id })
                        }}
                      >
                        <Image style={styles.postpic} source={{ uri: item.post }} />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ) : (
                <View style={styles.c2}>
                  <Text style={styles.txt1}>You have not posted anything yet</Text>
                </View>
              )}
            </>
          ) : (
            <ActivityIndicator size="large" color="white" />
          )}
        </ScrollView>
        <Bottomnavbar navigation={navigation} page="My_UserProfile" />
      </View>
    </SafeAreaView>
  );
};

export default My_UserProfile;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  c1: {
    width: '100%',
    alignItems: 'center',
  },
  profilepic: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginTop: 40,
    borderWidth: 2,
    borderColor: '#f7b2b7',
  },
  txt: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    backgroundColor: '#f7b2b7',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  txt1: {
    color: 'black',
    fontSize: 14,
  },
  txt2: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  c11: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  c111: {
    alignItems: 'center',
  },
  vr1: {
    width: 1,
    height: 50,
    backgroundColor: '#ccc',
  },
  description: {
    color: '#333',
    fontSize: 14,
    backgroundColor: '#ffe4e6',
    width: '90%',
    padding: 12,
    borderRadius: 10,
    textAlign: 'center',
    marginBottom: 20,
  },
  postpic: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
  c13: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    justifyContent: 'center',
  },
  c2: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  refresh: {
    position: 'absolute',
    top: 10,
    right: 20,
    backgroundColor: '#f7b2b7',
    padding: 8,
    borderRadius: 20,
    zIndex: 10,
  },
});
