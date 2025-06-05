import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const Post_Big_Card = ({
  post_image,
  profilepic,
  username,
  likes,
  comments,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: profilepic }} style={styles.profilePic} />
        <Text style={styles.username}>{username}</Text>
      </View>

      <Image source={{ uri: post_image }} style={styles.postImage} resizeMode="cover" />

      <View style={styles.actions}>
        <View style={styles.likeSection}>
          {isLiked ? (
            <>
              <AntDesign
                name="heart"
                size={24}
                color="red"
                style={styles.icon}
                onPress={() => setIsLiked(false)}
              />
              <Text style={styles.liked}>{likes.length + 1}</Text>
            </>
          ) : (
            <>
              <AntDesign
                name="hearto"
                size={24}
                color="black"
                style={styles.icon}
                onPress={() => setIsLiked(true)}
              />
              <Text style={styles.notLiked}>{likes.length}</Text>
            </>
          )}
        </View>

        <FontAwesome6
          name="comment-alt"
          size={20}
          color="black"
          style={styles.icon}
          onPress={() => setShowComments(!showComments)}
        />
      </View>

      {showComments && (
        <View style={styles.commentsContainer}>
          {comments.map((item) => (
            <View key={item.id} style={styles.commentRow}>
              <Text style={styles.commentUser}>{item.username}:</Text>
              <Text style={styles.commentText}>{item.comment}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default Post_Big_Card;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7b2b7',
    borderRadius: 12,
    marginVertical: 10,
    overflow: 'hidden',
    borderColor: '#c99d9d',
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffe4e6',
    padding: 8,
  },
  profilePic: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  postImage: {
    width: '100%',
    height: 250,
    backgroundColor: '#fff',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffe4e6',
    padding: 10,
  },
  likeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  icon: {
    marginRight: 5,
  },
  liked: {
    color: '#DC143C',
    fontSize: 16,
  },
  notLiked: {
    color: '#555',
    fontSize: 16,
  },
  commentsContainer: {
    backgroundColor: '#eadede',
    padding: 10,
  },
  commentRow: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  commentUser: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#000',
    marginRight: 5,
  },
  commentText: {
    fontSize: 15,
    color: '#000',
  },
});
