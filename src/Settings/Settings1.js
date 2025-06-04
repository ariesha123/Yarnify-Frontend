import {  StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { formHead, formHead2, formHead3 } from '../common css/formsCss';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Settings1 = ({ navigation }) => {
    const logout = () => {
        AsyncStorage.removeItem('user').then(() => {
            alert('Logged out successfully')
            navigation.navigate('Login')
        })
    }
    return (
        <View style={styles.container}>
            <Ionicons name="chevron-back-circle" size={30} color="black" style={styles.gohomeicon}

                onPress={() => navigation.navigate('My_UserProfile')}
            />
            

            <Text style={styles.txt1}
                onPress={() => navigation.navigate('EditProfile')}
            >Edit Profile</Text>
            <Text style={styles.txt1}
                onPress={() => navigation.navigate('ChangePassword')}
            >Change Password</Text>
            
            <Text style={styles.txt1} onPress={
                () => logout()
            }>Logout</Text>
        </View>
    )
}

export default Settings1

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        top: 30,
        backgroundColor: 'rgb(234, 193, 193)'
    },
    txt1: {
        marginTop: 30,
        color: 'black',
        fontSize: 20,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    }
})