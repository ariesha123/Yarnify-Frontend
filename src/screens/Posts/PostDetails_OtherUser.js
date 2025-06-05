import React, { useEffect, useState } from 'react'; 
import {
  View, Text, StyleSheet, Image, TouchableOpacity, TextInput,
  ScrollView, ActivityIndicator, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';

const PostDetails_OtherUser  = ({ route }) => {
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(''); // New state for username
  const [loading, setLoading] = useState(true);

  console.log('Received route.params:', route.params);

  const loadPost = async () => {
    try {
      setLoading(true);
      const userStr = await AsyncStorage.getItem('user');
      const loggedUser  = JSON.parse(userStr);
      if (!loggedUser ) {
        throw new Error('User  not found in storage');
      }

      setUserId(loggedUser .user._id);
      setUsername(loggedUser .user.username); // Set the username

      const res = await fetch('http://192.168.0.101:3000/postdetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loggedUser .token}`
        },
        body: JSON.stringify({ postId })
      });

      const data = await res.json();
      console.log('Post fetch response:', data);

      if (data.post) {
        setPost(data.post);
        const likedByUser  = data.post.likes?.some(like => like.user?._id === loggedUser .user._id);
        setLiked(likedByUser );
      } else {
        Alert.alert('Error', 'Post not found or malformed response.');
        console.error('No post in response:', data);
      }
    } catch (err) {
      console.error('Error loading post:', err);
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      const userStr = await AsyncStorage.getItem('user');
      const loggedUser  = JSON.parse(userStr);

      await fetch('http://192.168.0.101:3000/togglelike', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loggedUser .token}`
        },
        body: JSON.stringify({ postId })
      });

      // Toggle the liked state
      setLiked(prevLiked => !prevLiked);
      loadPost();
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

  const handleComment = async () => {
    if (!comment.trim()) return;

    try {
      const userStr = await AsyncStorage.getItem('user');
      const loggedUser  = JSON.parse(userStr);

      await fetch('http://192.168.0.101:3000/addcomment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loggedUser .token}`
        },
        body: JSON.stringify({
          postId,
          text: comment
        })
      });

      setComment('');
      loadPost();
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  useEffect(() => {
    loadPost();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#f7b2b7" />
        <Text>Loading post...</Text>
      </View>
    );
  }

  if (!post) {
    return (
      <View style={styles.loader}>
        <Text>Post not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: post.post }} style={styles.image} />
      <View style={styles.actions}>
        <TouchableOpacity onPress={handleLike}>
          <FontAwesome
            name={liked ? 'heart' : 'heart-o'}
            size={30}
            color={liked ? '#f7b2b7' : 'black'} // Pink when liked
          />
        </TouchableOpacity>
        <Text>{post.likes?.length || 0} likes</Text>
      </View>
      <View style={styles.commentBox}>
        <TextInput
          placeholder="Add a comment..."
          style={styles.input}
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity onPress={handleComment}>
          <Text style={styles.send}>Post</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.commentsSection}>
        {post.comments?.map((com, index) => (
          <View key={index} style={styles.commentItem}>
            <Text style={styles.commentUser }>@{com.user?.username || 'user'}:</Text>
            <Text style={styles.commentText}>{com.text}</Text>
          </View>
        ))}
        {/* Display the new comment with the username */}
        {comment && (
          <View style={styles.commentItem}>
            <Text style={styles.commentUser }>@{username}:</Text>
            <Text style={styles.commentText}>{comment}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default PostDetails_OtherUser ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 400,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
  commentBox: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
  },
  send: {
    marginLeft: 10,
    color: '#f7b2b7',
    fontWeight: 'bold',
  },
  commentsSection: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  commentUser: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  commentText: {
    flex: 1,
  },
});
