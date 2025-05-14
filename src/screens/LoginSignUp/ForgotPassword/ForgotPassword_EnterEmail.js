
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { containerFull, goback, logo2 } from '../../../common css/pagecss'
import { MaterialIcons } from '@expo/vector-icons';
import { formbtn, formHead2, formHead3, formInput } from '../../../common css/formsCss';
import logo from '../../../../assets/Logo.png'


const ForgotPassword_EnterEmail= ({navigation}) => {
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
  <TextInput placeholder="Enter your email" style= {formInput} />
  <Text style = {formbtn}
      onPress={() => navigation.navigate('ForgotPassword_EnterVerificationCode')}>
      Next
  </Text>
          
    </View>
  )
}

export default ForgotPassword_EnterEmail

const styles = StyleSheet.create({})