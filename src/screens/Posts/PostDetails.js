import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  SafeAreaView,
  StatusBar,
  Platform,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Bottomnavbar from '../../Components/Bottomnavbar';
import TopNavbar from '../../Components/TopNavbar';

const PostDetails = ({ navigation, route }) => {
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [userdata, setUserdata] = useState(null);

  console.log('Fetching post with ID:', postId);

  const loadPostDetails = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      const response = await fetch('http://192.168.0.101:3000/postdetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(value).token,
        },
        body: JSON.stringify({ postId: postId }),
      });
      const data = await response.json();
      if (data.message === 'Post found') {
        setPost(data.post);
      }
    } catch (error) {
      console.error('Error loading post details:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserData = async () => {
    const value = await AsyncStorage.getItem('user');
    setUserdata(JSON.parse(value).user);
  };

  useEffect(() => {
    loadPostDetails();
    loadUserData();
  }, []);

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      const value = await AsyncStorage.getItem('user');
      const response = await fetch('http://192.168.0.101:3000/addcomment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(value).token,
        },
        body: JSON.stringify({
          postId: postId,
          text: commentText
        }),
      });
      const data = await response.json();
      if (data.message === 'Comment added') {
        setPost(data.post);
        setCommentText('');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleToggleLike = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      const response = await fetch('http://192.168.0.101:3000/togglelike', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(value).token,
        },
        body: JSON.stringify({ postId: postId }),
      });
      const data = await response.json();
      if (data.message === 'Like toggled') {
        setPost(data.post);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const isLiked = () => {
    if (!post || !userdata) return false;
    return post.likes.some(like => like.user && like.user._id === userdata._id);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f7b2b7" />
      </View>
    );
  }

  if (!post) {
    return (
      <View style={styles.container}>
        <Text>Post not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="rgb(229, 206, 206)" barStyle="dark-content" />
      <View style={styles.container}>
        {/* Back button with TopNavbar */}
        <View style={styles.topNavWithBack}>
          <TouchableOpacity onPress={() => navigation.navigate('My_UserProfile')}>
            <MaterialIcons name="arrow-back" size={28} color="#000" />
          </TouchableOpacity>
          <TopNavbar navigation={navigation} page="PostDetails" />
        </View>

        <ScrollView style={styles.scrollContainer}>
          <View style={styles.postContainer}>
            <Image source={{ uri: post.post }} style={styles.postImage} />

            <View style={styles.actionsContainer}>
              <TouchableOpacity onPress={handleToggleLike}>
                <AntDesign
                  name={isLiked() ? "heart" : "hearto"}
                  size={28}
                  color={isLiked() ? "#f72585" : "#000"}
                />
              </TouchableOpacity>
              <Text style={styles.likeCount}>{post.likes.length} likes</Text>
            </View>

            {post.caption && (
              <View style={styles.captionContainer}>
                <Text style={styles.captionText}>{post.caption}</Text>
              </View>
            )}

            <View style={styles.commentsContainer}>
              <Text style={styles.commentsTitle}>Comments ({post.comments.length})</Text>
              {post.comments.length > 0 ? (
                <FlatList
                  data={post.comments}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => (
                    <View style={styles.commentItem}>
                      <Text style={styles.commentUser}>{item.user ? item.user.username : 'Unknown'}: </Text>
                      <Text style={styles.commentText}>{item.text}</Text>
                    </View>
                  )}
                />
              ) : (
                <Text style={styles.noCommentsText}>No comments yet</Text>
              )}
            </View>
          </View>
        </ScrollView>

        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Add a comment..."
            value={commentText}
            onChangeText={setCommentText}
          />
          <TouchableOpacity onPress={handleAddComment}>
            <Feather name="send" size={24} color="#f7b2b7" />
          </TouchableOpacity>
        </View>
        <Bottomnavbar navigation={navigation} page="PostDetails" />
      </View>
    </SafeAreaView>
  );
};

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
  topNavWithBack: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  scrollContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postContainer: {
    padding: 15,
  },
  postImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    marginBottom: 15,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  likeCount: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  captionContainer: {
    marginBottom: 15,
  },
  captionText: {
    fontSize: 16,
  },
  commentsContainer: {
    marginBottom: 60,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  commentUser: {
    fontWeight: 'bold',
  },
  commentText: {
    flex: 1,
  },
  noCommentsText: {
    color: '#888',
    fontStyle: 'italic',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
});

export default PostDetails;

