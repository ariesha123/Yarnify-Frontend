
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native'
import React, {useState} from 'react'
import { containerFull, goback, logo2 } from '../../../common css/pagecss'
import { MaterialIcons } from '@expo/vector-icons';
import { formbtn, formHead2, formInput } from '../../../common css/formsCss';
import logo from '../../../../assets/Logo.png'

const SignUp_ChooseUsername = ({navigation, route}) => {
      const { email } = route.params
    const [username, setusername] = useState('')

    const [loading, setLoading] = useState(false)


    const handleUsername = () => {
        if (username == '') {
            alert('Please enter username')
        }
        else {
            setLoading(true)
            fetch('http://192.168.0.100:3000/changeusername', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    username: username
                })
            })
                .then(res => res.json()).then(
                    data => {
                        if (data.message === "Username Available") {
                            setLoading(false)
                            alert('Username has been set successfully')
                            navigation.navigate('SignUp_ChoosePassword', { email: email, username: username })
                        }
                        else {
                            setLoading(false)
                            alert("Username not available");
                        }
                    }
                ).catch(err => {
                    console.log(err)
                })

        }

        // navigation.navigate('Signup_ChoosePassword')
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
            <Text style={formHead2}>Choose user name</Text>
            <TextInput placeholder=" Enter your username" style= {formInput}
                   onChangeText={(text) => setusername(text)}
            />
            {
                  
                loading ? <ActivityIndicator /> :
            
            <Text style = {formbtn}
                  onPress={() => handleUsername()}>
                  Next
            </Text>
            
            }   
           </View>
   
  )
}

export default SignUp_ChooseUsername

const styles = StyleSheet.create({})