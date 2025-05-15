import { StyleSheet, Text, View, Image,StatusBar } from 'react-native'
import React, { useState } from 'react'
import TopNavbar from '../../Components/TopNavbar'
import Bottomnavbar from '../../Components/Bottomnavbar'


const NotificationPage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar />
            <TopNavbar navigation={navigation} />
            <Bottomnavbar navigation={navigation} page={"NotificationPage"} />
            <View style={styles.c1}>
                <View style={styles.notification}>
                    <Text>Some Notification</Text>
                </View>
                <View style={styles.notification}>
                    <Text>Some Notification</Text>
                </View>
                <View style={styles.notification}>
                    <Text>Some Notification</Text>
                </View>
                <View style={styles.notification}>
                    <Text>Some Notification</Text>
                </View>
            </View>
        </View>
    )
}

export default NotificationPage

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        paddingVertical: 50,
    },
    c1: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    notification: {
        width: '98%',
        height: 50,
        backgroundColor: 'white',
        marginTop: 10,
    }
})