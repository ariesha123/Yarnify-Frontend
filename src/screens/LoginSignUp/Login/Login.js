import { StyleSheet, Text, View, Image, TextInput} from 'react-native'
import React from 'react'
import logo from '../../../../assets/Logo.png'
import { containerFull, hr80,  logo1 } from '../../../common css/pagecss'
import { formbtn, formHead, formInput, formTextLinkCenter, formTextLinkRight } from '../../../common css/formsCss'

const Login = ({navigation}) => {
  return (
    <View style={containerFull}>
      <Image source={logo}  style={logo1}/>
      <Text style= {formHead}>Login</Text>
      <TextInput placeholder='Enter your Email' style={formInput} />
      <TextInput placeholder='Enter your Password' style={formInput} secureTextEntry={true} />
      <Text style={formTextLinkRight}
                onPress={() => navigation.navigate('ForgotPassword_EnterEmail')}>Forgot Password?</Text>
      <Text style={formbtn} 
            onPress={() => navigation.navigate('Mainpage') }> Submit </Text>
      <View style={hr80}></View>

      <Text style={formTextLinkCenter}>
                Don't have an account? <Text style={{ color: 'black' }}
                    onPress={() => navigation.navigate('SignUp_EnterEmail')}
                >Signup</Text>
            </Text>

                        

    </View>
  )
}

export default Login
  
const styles = StyleSheet.create({
  logo: {
    width: 100, 
    height: 100,
    resizeMode: 'contain',

  },
})