import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const ChatCard = ({ chat }) => {
    
    //console.log(chat)
    return (
    <View style={styles.ChatCard}>
      <Image source ={{ uri: chat.profileimage}} style= {styles.image}> 

      </Image>

      <View style={styles.c1}>
        <Text style={styles.username}> {chat.username} </Text>
         <Text style={styles.lastmessage}> {chat.lastmessage} </Text>
      </View>
    </View>
  )
}

export default ChatCard

const styles = StyleSheet.create({

    ChatCard: 
    {
        width: "100%",
        //height: 40,
        backgroundColor: 'pink',
        marginTop: 10,
        borderRadius: 20,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },

    image: {

        width: 50,
        height: 50,
        borderRadius: 50,

    },

    username: {
        color: "black",
        fontSize: 20,

    },
    
    c1:
    {
        marginLeft: 10,
    },

    lastmessage: {
        color: "black",
        fontSize: 19
    }
})