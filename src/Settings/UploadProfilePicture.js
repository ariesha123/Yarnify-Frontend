
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { containerFull, goback, logo2 } from '../common css/pagecss';
import logo from '../../assets/Logo.png';
import { formbtn, formHead3 } from '../common css/formsCss';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UploadProfilePicture = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
            base64: true,
        });

        if (!result.canceled) {
            return `data:image/jpeg;base64,${result.assets[0].base64}`;
        }
        return null;
    };

    const handleUpload = async () => {
        try {
            setLoading(true);

            const userData = await AsyncStorage.getItem('user');
            const { user } = JSON.parse(userData);

            const base64Image = await pickImage();
            if (!base64Image) {
                setLoading(false);
                return;
            }

            const response = await fetch('http://192.168.0.101:3000/setprofilepic', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: user.email,
                    profilepic: base64Image,
                }),
            });

            const data = await response.json(); // ✅ Only parse once!

            console.log('Server Response:', data);

            if (data.message === 'Profile picture updated successfully') {
                alert('Profile picture updated successfully');
                navigation.navigate('Settings1');
            } else if (data.error === 'Invalid Credentials') {
                alert('Invalid Credentials');
                navigation.navigate('Login');
            } else {
                alert('Please Try Again');
            }
        } catch (err) {
            console.error('Upload Error:', err);
            alert('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={containerFull}>
            <TouchableOpacity onPress={() => navigation.navigate('Settings1')} style={goback}>
                <MaterialIcons name="arrow-back-ios" size={24} color="gray" />
                <Text style={{ color: 'gray', fontSize: 16 }}>Go Back</Text>
            </TouchableOpacity>

            <Image source={logo} style={logo2} />
            <Text style={formHead3}>Choose a profile picture</Text>

            {loading ? (
                <ActivityIndicator size="large" color="white" />
            ) : (
                <Text style={formbtn} onPress={handleUpload}>
                    Upload
                </Text>
            )}
        </View>
    );
};

export default UploadProfilePicture;

const styles = StyleSheet.create({});
