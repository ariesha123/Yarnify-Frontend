
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { containerFull, goback, hr80, logo1 } from '../../common css/pagecss'
import logo from '../../../assets/Logo.png'
import { formbtn, formHead, formHead2, formHead3, formInput, formTextLinkCenter, formTextLinkRight } from '../../common css/formsCss'
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddPost = ({ navigation }) => {
    const [postdescription, setpostdescription] = useState('')
    const [loading1, setLoading1] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [post, setPost] = useState('')

    const pickImage = async () => {
        setLoading1(true)
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5, // Reduced quality to make base64 string smaller
            base64: true // This is important for getting base64 data
        })

        if (!result.canceled) {
            const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
            setLoading1(false)
            setPost(base64Image)
        } else {
            setLoading1(false)
            setPost(null)
        }
    }

    const handleUpload = () => {
        if (!post) {
            alert('Please select an image')
            return
        }

        AsyncStorage.getItem('user')
            .then(data => {
                setLoading2(true)
                fetch('http://192.168.0.102:3000/addpost', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: JSON.parse(data).user.email,
                        post: post, // Now sending base64 string
                        postdescription: postdescription
                    })
                })
                .then(res => res.json())
                .then(data => {
                    if (data.message == 'Post added successfully') {
                        alert('Post added successfully')
                        setLoading2(false)
                        navigation.navigate('My_UserProfile')
                    } else {
                        alert('Something went wrong, please try again')
                        setLoading2(false)
                    }
                })
                .catch(err => {
                    alert('Network error, please try again')
                    setLoading2(false)
                })
            })
    }

    return (
        <View style={containerFull}>
            <TouchableOpacity onPress={() => navigation.navigate('Settings_1')} style={goback}>
                <MaterialIcons name="arrow-back-ios" size={24} color="gray" />
                <Text style={{
                    color: 'gray',
                    fontSize: 16,
                }}>Go Back</Text>
            </TouchableOpacity>

            <Image source={logo} style={logo1} />
            {
                loading1 ? <ActivityIndicator size="large" color="white" /> :
                    <>
                        <Text style={formHead2}>Add New Post</Text>
                        {
                            post ?
                                <TouchableOpacity onPress={() => pickImage()}>
                                    <Image source={{ uri: post }} style={{
                                        width: 200, height: 200,
                                        marginVertical: 10,
                                    }} />
                                </TouchableOpacity>
                                :
                                <Text style={styles.addpost} onPress={() => pickImage()}>
                                    Click here to select a new post
                                </Text>
                        }
                    </>
            }

            <Text style={formHead2}>Change Description</Text>
            <TextInput placeholder="Enter new description" style={formInput}
                onChangeText={(text) => setpostdescription(text)}
                multiline={true}
                numberOfLines={5}
            />

            {
                loading2 ? <ActivityIndicator size="large" color="white" /> :
                    <Text style={formbtn} onPress={() => handleUpload()}>
                        Upload
                    </Text>
            }
        </View>
    )
}

export default AddPost

const styles = StyleSheet.create({
    addpost: {
        fontSize: 20,
        fontWeight: '100',
        color: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 50,
        width: '80%',
        textAlign: 'center',
        marginVertical: 20,
    }
})