import { StyleSheet, Text, View, Image, TextInput, ActivityIndicator} from 'react-native'
import React from 'react'
import logo from '../../../../assets/Logo.png'
import { containerFull, hr80, logo1 } from '../../../common css/pagecss'
import { formbtn, formHead, formInput, formTextLinkCenter, formTextLinkRight } from '../../../common css/formsCss'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const handleLogin = () => {
        if (email == '' || password == '') {
            alert('Please enter email and password')
        }
        else {
            setLoading(true)
            fetch('http://192.168.0.101:3000/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
                .then(res => res.json())
                .then(async data => {
                    if (data.error) {
                        setLoading(false)
                        alert(data.error)
                    }
                    else if (data.message == 'Successfully Signed In') {
                        setLoading(false)
                        await AsyncStorage.setItem('user', JSON.stringify(data))
                        navigation.navigate('Mainpage', { data })
                    }
                })
                .catch(err => {
                    setLoading(false)
                    alert(err)
                })
        }
        // navigation.navigate('MainPage')
    }
    return (
        <View style={containerFull}>
            <Image source={logo} style={logo1} />
            <Text style={formHead}>Login</Text>
            <TextInput placeholder="Enter Your Email" style={formInput}
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput placeholder="Enter Your Password" style={formInput}
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
            />
            <Text style={formTextLinkRight}
                onPress={() => navigation.navigate('ForgotPassword_EnterEmail')}
            >Forgot Password?</Text>

            {
                loading ?
                    <ActivityIndicator size="large" color="white" />
                    :
                    <Text style={formbtn} onPress={
                        () => handleLogin()
                    }>
                        Submit
                    </Text>
            }


            <View style={hr80}></View>


            <Text style={formTextLinkCenter}>
                Don't have an account?<Text style={{ color: 'black' }}
                    onPress={() => navigation.navigate('SignUp_EnterEmail')}
                >Signup</Text>
            </Text>

        </View>
    )
}

export default Login

const styles = StyleSheet.create({})