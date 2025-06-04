import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React, {useState} from 'react'
import { containerFull, goback, logo2 } from '../../../common css/pagecss'
import { MaterialIcons } from '@expo/vector-icons';
import { formbtn, formHead2, formInput } from '../../../common css/formsCss';
import logo from '../../../../assets/Logo.png'

const SignUp_ChoosePassword = ({navigation, route }) => {
      const { email, username } = route.params;
    const [password, setpassword] = useState('')
    const [confirmpassword, setconfirmpassword] = useState('')
    const [loading, setLoading] = useState(false)


    const handlePassword = () => {

        // navigation.navigate('Signup_AccountCreated')
        if (password == '' || confirmpassword == '') {
            alert('Please enter password')
        } else if (password != confirmpassword) {
            alert('Password does not match')
        }
        else {
            setLoading(true)
            fetch('http://192.168.0.101:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, username: username, password: password })
            })
                .then(res => res.json()).then(
                    data => {
                        if (data.message === "User Registered Successfully") {
                            setLoading(false)
                            alert(data.message);
                            navigation.navigate('SignUp_AccountCreated')
                        }
                        else {
                            setLoading(false)
                            alert("Please try again");
                        }
                    }
                )
        }
    }

  return (
    <View style={containerFull}>
                
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={goback}>
                <MaterialIcons name="arrow-back-ios" size={24} color="gray" />
                <Text style=
                {{
                      color: 'black',
                      fontSize: 16,
                }}
                
               >Go Back</Text>
               </TouchableOpacity>
                
                <Image source={logo} style={logo2} />
                <Text style={formHead2}>Choose a strong password</Text>
                <TextInput placeholder=" Enter your password" style= {formInput}  secureTextEntry
                        onChangeText={(text) => setpassword(text)}
                />
                <TextInput placeholder=" Confirm password" style= {formInput}  secureTextEntry
                        onChangeText={(text) => setconfirmpassword(text)}
                />
                <Text style = {formbtn}
                      onPress={() => handlePassword()}>
                      Next
                </Text>
                     
               </View>
  )
}

export default SignUp_ChoosePassword

const styles = StyleSheet.create({})