import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { containerFull, goback, logo2 } from '../../../common css/pagecss'
import { MaterialIcons } from '@expo/vector-icons';
import { formbtn, formHead2, formHead3, formInput } from '../../../common css/formsCss';
import logo from '../../../../assets/Logo.png'


const ForgetPassword_EnterVerificationCode = ({navigation, route}) => {

  const { useremail, userVerificationCode } = route.params;
    console.log(useremail, userVerificationCode)

    const [verificationCode, setVerificationCode] = React.useState('');


    const handleVerificationCode = () => {

        if (verificationCode != userVerificationCode) {
            alert('Invalid Verification Code')
        }
        else {
            alert('Verification Code Matched')
            navigation.navigate('ForgotPassword_ChoosePassword', { email: useremail })
        }

        // navigation.navigate('ForgotPassword_ChoosePassword')
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
      <Text style={formHead3}> A verification code has been sent to your email </Text>
      <TextInput placeholder="Enter a 6-Digit Code" style= {formInput} 
           onChangeText={(text) => setVerificationCode(text)}
      />
      <Text style = {formbtn}
          onPress={() =>  handleVerificationCode() } >
          Next
      </Text>
              
        </View>
  )
}

export default ForgetPassword_EnterVerificationCode

const styles = StyleSheet.create({})