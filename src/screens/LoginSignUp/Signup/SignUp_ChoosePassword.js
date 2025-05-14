import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { containerFull, goback, logo2 } from '../../../common css/pagecss'
import { MaterialIcons } from '@expo/vector-icons';
import { formbtn, formHead2, formInput } from '../../../common css/formsCss';
import logo from '../../../../assets/Logo.png'

const SignUp_ChoosePassword = ({navigation}) => {
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
                <TextInput placeholder=" Enter your password" style= {formInput}  secureTextEntry/>
                <TextInput placeholder=" Confirm password" style= {formInput}  secureTextEntry/>
                <Text style = {formbtn}
                      onPress={() => navigation.navigate('SignUp_AccountCreated')}>
                      Next
                </Text>
                     
               </View>
  )
}

export default SignUp_ChoosePassword

const styles = StyleSheet.create({})