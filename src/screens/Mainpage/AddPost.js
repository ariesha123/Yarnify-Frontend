import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddPost = ({ navigation }) => {
  const [postdescription, setpostdescription] = useState('');
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [post, setPost] = useState(null);

  const pickImage = async () => {
    setLoading1(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setPost(base64Image);
    }
    setLoading1(false);
  };

  const handleUpload = async () => {
    if (!post) {
      alert('Please select an image');
      return;
    }

    try {
      const data = await AsyncStorage.getItem('user');
      if (!data) throw new Error('User not found in storage');

      const { token } = JSON.parse(data);

      setLoading2(true);

      const response = await fetch('http://192.168.0.101:3000/addpost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          caption: postdescription,
          post: post,
        }),
      });

      const resData = await response.json();

      if (resData.message === 'Post added successfully') {
        alert('Post added successfully');
        navigation.navigate('My_UserProfile');
      } else {
        alert(resData.error || 'Something went wrong, please try again');
      }
    } catch (err) {
      console.error(err);
      alert('Network error, please try again');
    } finally {
      setLoading2(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Mainpage')} style={styles.goBack}>
        <MaterialIcons name="arrow-back-ios" size={24} color="black" />
        <Text style={styles.goBackText}>Go Back</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Add New Post</Text>

      {loading1 ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
          {post ? (
            <Image source={{ uri: post }} style={styles.image} />
          ) : (
            <Text style={styles.imagePlaceholder}>Click here to select a new post</Text>
          )}
        </TouchableOpacity>
      )}

      <Text style={styles.label}>Change Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter new description"
        multiline
        numberOfLines={4}
        value={postdescription}
        onChangeText={setpostdescription}
      />

      {loading2 ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <TouchableOpacity style={styles.uploadBtn} onPress={handleUpload}>
          <Text style={styles.uploadBtnText}>Upload</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  goBack: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
  },
  goBackText: {
    fontSize: 16,
    color: 'black',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  imagePlaceholder: {
    color: '#999',
    fontSize: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    height: 100,
    borderColor: '#f7b2b7',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#ffe4e6',
    textAlignVertical: 'top',
  },
  uploadBtn: {
    width: '100%',
    padding: 15,
    backgroundColor: '#f7b2b7',
    borderRadius: 10,
    alignItems: 'center',
  },
  uploadBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});
