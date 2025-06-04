import React, { useEffect } from 'react';
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
} from 'react-native';
import Bottomnavbar from '../../Components/Bottomnavbar';
import TopNavbar from '../../Components/TopNavbar';
import nopic from '../../../assets/nopic.jpeg';
import { Foundation } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const My_UserProfile = ({ navigation }) => {
  const [userdata, setUserdata] = React.useState(null);

  const loaddata = async () => {
    AsyncStorage.getItem('user')
      .then(async (value) => {
        fetch('http://192.168.0.101:3000/userdata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(value).token,
          },
          body: JSON.stringify({ email: JSON.parse(value).user.email }),
        })
          .then(res => res.json()).then(data => {
            if (data.message === 'User Found') {
              setUserdata(data.user);
            } else {
              alert('Login Again');
              navigation.navigate('Login');
            }
          })
          .catch(() => navigation.navigate('Login'));
      })
      .catch(() => navigation.navigate('Login'));
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
                {userdata.profilepic.length > 0 ? (
                  <Image style={styles.profilepic} source={{ uri: userdata.profilepic }} />
                ) : (
                  <Image style={styles.profilepic} source={nopic} />
                )}
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
                      <Image key={item.post} style={styles.postpic} source={{ uri: item.post }} />
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
    backgroundColor: 'rgb(229, 206, 206)',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgb(229, 206, 206)',
  },
  scrollContainer: {
    paddingBottom: 100, // space for bottom navbar
  },
  c1: {
    width: '100%',
    alignItems: 'center',
  },
  profilepic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    margin: 10,
    marginTop: 60,
  },
  txt: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    backgroundColor: 'rgb(223, 136, 136)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  txt1: {
    color: 'black',
    fontSize: 15,
  },
  txt2: {
    color: 'black',
    fontSize: 20,
  },
  c11: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  c111: {
    alignItems: 'center',
  },
  vr1: {
    width: 1,
    height: 50,
    backgroundColor: 'black',
  },
  description: {
    color: 'black',
    fontSize: 15,
    backgroundColor: 'rgb(229, 206, 206)',
    width: '90%',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    marginBottom: 20,
  },
  postpic: {
    width: '30%',
    height: 120,
    margin: 5,
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
    zIndex: 10,
  },
});
