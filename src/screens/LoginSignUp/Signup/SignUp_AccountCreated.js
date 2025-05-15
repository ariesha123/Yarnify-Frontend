import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { containerFull, goback, logo2, row } from '../../../common css/pagecss'
import { MaterialIcons } from '@expo/vector-icons';
import { formbtn1, formHead2 } from '../../../common css/formsCss';
import logo from '../../../../assets/Logo.png'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const SignUp_AccountCreated = ({navigation}) => {
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
    <View style= {row}>
    <MaterialCommunityIcons name="check-decagram" size={32} color="pink" />
    <Text style= {formHead2}> Account Created Successfully</Text>
    </View>
      <Text style = {formbtn1}
            onPress={() => navigation.navigate('Login')}>
            Start Exploring
      </Text>                  
    </View>

  )
}

export default SignUp_AccountCreated

const styles = StyleSheet.create({})