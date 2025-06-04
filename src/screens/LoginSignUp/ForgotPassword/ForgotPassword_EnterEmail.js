
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native'
import React from 'react'
import { containerFull, goback, logo2 } from '../../../common css/pagecss'
import { MaterialIcons } from '@expo/vector-icons';
import { formbtn, formHead2, formHead3, formInput } from '../../../common css/formsCss';
import logo from '../../../../assets/Logo.png'


const ForgotPassword_EnterEmail= ({navigation}) => {

  const [email, setEmail] = React.useState('')
    const [loading, setLoading] = React.useState(false)


    const handleEmail = () => {
        if (email === '') {
            alert('Please enter email')
        }

        else {
            setLoading(true)
            fetch('http://192.168.0.100:3000/verifyfp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            })
                .then(res => res.json()).then(data => {
                    if (data.error === "Invalid Credentials") {
                        // alert('Invalid Credentials')
                        alert('Invalid Credentials')
                        setLoading(false)
                    }
                    else if (data.message === "Verification Code Sent to your Email") {
                        setLoading(false)
                        alert(data.message);

                        navigation.navigate('ForgotPassword_EnterVerificationCode', {
                            useremail: data.email,
                            userVerificationCode: data.VerificationCode
                        })

                    }
                })
        }
    }
  
  
    return (
  
  <View style={containerFull}>
  <TouchableOpacity onPress={() => navigation.navigate('Login')} style={goback}>
  <MaterialIcons name="arrow-back-ios" size={24} color="gray" />
  <Text style={{
      color: 'black',
      fontSize: 16,
  }}
     
  >Go Back</Text>
  </TouchableOpacity>
     
  <Image source={logo} style={logo2} />
  <Text style={formHead3}> Verify your email </Text>
  <TextInput placeholder="Enter your email" style= {formInput} 
  onChangeText={(text) => setEmail(text)}/>
  {
    loading ? <ActivityIndicator size="large" color="pink" /> :
                    <Text style={formbtn}
                        onPress={() => handleEmail()} >
                        Next
                    </Text>
  }
  
    </View>
  )
}

export default ForgotPassword_EnterEmail

const styles = StyleSheet.create({})