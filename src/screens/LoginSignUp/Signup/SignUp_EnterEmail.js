
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native'
import React, {useState} from 'react'
import { containerFull, goback, logo1, logo2 } from '../../../common css/pagecss'
import { MaterialIcons } from '@expo/vector-icons';
import { formbtn, formHead2, formInput } from '../../../common css/formsCss';
import logo from '../../../../assets/Logo.png'



const Signup_EnterEmail = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const handleEmail = () => {
        //setLoading(true)
        // navigation.navigate('Signup_EnterVerificationCode')
        if (email == '') {
            alert('Please enter email')
        }
        else {
            setLoading(true)
            fetch('http://192.168.0.100:3000/verify', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email
                })
            })
                .then(res => res.json()).then(
                    data => {
                        if (data.error === "Invalid Credentials") {
                            // alert('Invalid Credentials')
                            alert('Invalid Credentials')
                            setLoading(false)
                        }
                        else if (data.message === "Verification Code Sent to your Email") {
                            setLoading(false)
                            alert(data.message);
                            navigation.navigate('SignUp_EnterVerificationCode', {
                                useremail: data.email,
                                userVerificationCode: data.VerificationCode
                            })

                        }
                    }
                )
        }
    }
    return (
        <View style={containerFull}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={goback}>

                <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                <Text style={{
                    color: 'black',
                    fontSize: 16,
                }}

                >Go Back</Text>

            </TouchableOpacity>

            <Image source={logo} style={logo2} />
            <Text style={formHead2}>Create a new account</Text>
            <TextInput placeholder="Enter Your Email" style={formInput}

                onChangeText={(text) => {
                    setEmail(text)
                }}
            />
            {
                loading ?
                    <ActivityIndicator size="large" color="pink" />
                    :
                    <Text style={formbtn}
                        onPress={() => handleEmail()}
                    >
                        Next
                    </Text>
            }
        </View>
    )
}

export default Signup_EnterEmail

const styles = StyleSheet.create({})