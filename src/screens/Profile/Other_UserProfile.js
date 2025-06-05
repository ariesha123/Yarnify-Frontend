import React, { useEffect, useState } from 'react'; 
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import Bottomnavbar from '../../Components/Bottomnavbar';
import TopNavbar from '../../Components/TopNavbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import nopic from '../../../assets/nopic.jpeg';
import { Foundation } from '@expo/vector-icons';

const Other_UserProfile = ({ navigation, route }) => {
  const [userdata, setUserdata] = useState(null);
  const [issameuser, setIssameuser] = useState(false);
  const [isfollowing, setIsfollowing] = useState(false);

  const { user } = route.params;

  const ismyprofile = (otheruser) => {
    AsyncStorage.getItem('user').then((loggeduser) => {
      const loggeduserobj = JSON.parse(loggeduser);
      setIssameuser(loggeduserobj.user._id === otheruser._id);
    });
  };

  const loaddata = async () => {
    try {
      const res = await fetch('http://192.168.0.101:3000/otheruserdata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email }),
      });
      const data = await res.json();
      if (data.message === 'User Found') {
        setUserdata(data.user);
        ismyprofile(data.user);
        CheckFollow(data.user);
      } else {
        Alert.alert('User Not Found');
        navigation.navigate('SearchUserPage');
      }
    } catch (err) {
      Alert.alert('Something went wrong');
      navigation.navigate('SearchUserPage');
    }
  };

  const FollowThisUser = async () => {
    const loggeduser = await AsyncStorage.getItem('user');
    const loggeduserobj = JSON.parse(loggeduser);
    fetch('http://192.168.0.101:3000/followuser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        followfrom: loggeduserobj.user.email,
        followto: userdata.email,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'User Followed') {
          setIsfollowing(true);
          loaddata();
        } else {
          Alert.alert('Error', 'Something went wrong');
        }
      });
  };

  const UnfollowThisUser = async () => {
    const loggeduser = await AsyncStorage.getItem('user');
    const loggeduserobj = JSON.parse(loggeduser);
    fetch('http://192.168.0.101:3000/unfollowuser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        followfrom: loggeduserobj.user.email,
        followto: userdata.email,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'User Unfollowed') {
          setIsfollowing(false);
          loaddata();
        } else {
          Alert.alert('Error', 'Something went wrong');
        }
      });
  };

  const CheckFollow = async (otheruser) => {
    const loggeduser = await AsyncStorage.getItem('user');
    const loggeduserobj = JSON.parse(loggeduser);
    fetch('http://192.168.0.101:3000/checkfollow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        followfrom: loggeduserobj.user.email,
        followto: otheruser.email,
      }),
    })
      .then(res => res.json())
      .then(data => {
        setIsfollowing(data.message === 'User in following list');
      });
  };

  useEffect(() => {
    loaddata();
  }, []);

  // Helper: filter duplicate posts and sort newest first
  const getUniqueSortedPosts = (posts) => {
    if (!posts) return [];
    const uniquePosts = posts.filter(
      (post, index, self) => index === self.findIndex(p => p._id === post._id)
    );
    // Sort descending by createdAt (if exists)
    return uniquePosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.container}>
        <TopNavbar navigation={navigation} page="Other_UserProfile" />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Foundation
            name="refresh"
            size={24}
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

                {!issameuser && (
                  <View style={styles.row}>
                    <TouchableOpacity
                      style={[styles.followBtn, isfollowing && styles.unfollowBtn]}
                      onPress={isfollowing ? UnfollowThisUser : FollowThisUser}
                    >
                      <Text style={styles.followText}>
                        {isfollowing ? 'Following' : 'Follow'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.messageBtn}
                      onPress={() =>
                        navigation.navigate('MessagePage', {
                          fuseremail: userdata.email,
                          fuserid: userdata._id,
                        })
                      }
                    >
                      <Text style={styles.messageText}>Message</Text>
                    </TouchableOpacity>
                  </View>
                )}

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

              {(isfollowing || issameuser) ? (
                getUniqueSortedPosts(userdata.posts).length > 0 ? (
                  <View style={styles.c1}>
                    <Text style={styles.txt}>Posts</Text>
                    <View style={styles.c13}>
                      {getUniqueSortedPosts(userdata.posts).map((item, index) => (
                        <TouchableOpacity
                          key={item._id ? item._id : `post-${index}`}
                          onPress={() =>
                            
                              navigation.navigate('PostDetails_OtherUser', { postId: item._id })
                          }
                        >
                          <Image style={styles.postpic} source={{ uri: item.post }} />
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                ) : (
                  <View style={styles.c2}>
                    <Text style={styles.txt1}>This user has not posted anything yet</Text>
                  </View>
                )
              ) : (
                <View style={styles.c2}>
                  <Text style={styles.txt1}>Follow to see posts</Text>
                </View>
              )}
            </>
          ) : (
            <ActivityIndicator size="large" color="black" />
          )}
        </ScrollView>
        <Bottomnavbar navigation={navigation} page="SearchUserPage" />
      </View>
    </SafeAreaView>
  );
};

export default Other_UserProfile;

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
  row: {
    flexDirection: 'row',
    marginTop: 10,
  },
  followBtn: {
    backgroundColor: '#0AD6A0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  unfollowBtn: {
    backgroundColor: '#ccc',
  },
  followText: {
    color: 'white',
    fontWeight: 'bold',
  },
  messageBtn: {
    backgroundColor: '#f7b2b7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  messageText: {
    color: 'black',
    fontWeight: 'bold',
  },
  c2: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
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
    justifyContent: 'center',
    marginBottom: 20,
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
