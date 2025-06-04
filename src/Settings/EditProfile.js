import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { formHead, formHead2, formHead3 } from '../common css/pagecss';
import AsyncStorage from '@react-native-async-storage/async-storage';
const EditProfile = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Ionicons name="chevron-back-circle" size={30} color="black" style={styles.gohomeicon}

                onPress={() => navigation.navigate('Settings1')}
            />
            

             <Text style={styles.txt1}
                onPress={() => navigation.navigate('UploadProfilePicture')}
                >Change Profile Picture</Text>
            <Text style={styles.txt1}
                onPress={() => navigation.navigate('ChangeUsername')}
            >Change Username</Text>
            <Text style={styles.txt1}
                onPress={() => navigation.navigate('ChangeDescription')}
            >Change Description</Text>

        </View>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(234, 193, 193)',
        top:50
    },
    txt1: {
        marginTop: 20,
        color: 'black',
        fontSize: 20,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    }
})