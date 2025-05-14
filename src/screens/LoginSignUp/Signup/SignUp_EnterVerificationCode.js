
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { containerFull, goback, logo2 } from '../../../common css/pagecss'
import { MaterialIcons } from '@expo/vector-icons';
import { formbtn, formHead2, formInput } from '../../../common css/formsCss';
import logo from '../../../../assets/Logo.png'

const SignUp_EnterVerificationCode = ({navigation}) => {
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
      <Text style={formHead2}>A verification code has been sent to your e-mail</Text>
      <TextInput placeholder=" Enter a 6-digit code" style= {formInput} />
      <Text style = {formbtn}
            onPress={() => navigation.navigate('SignUp_ChooseUsername')}>
            Next
      </Text>
           
     </View>
  )
}

export default SignUp_EnterVerificationCode

const styles = StyleSheet.create({})