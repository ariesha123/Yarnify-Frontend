import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'
import { icons1, icons2, icons3 } from '../common css/pagecss'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


const Post_Big_Card = (
    {
        post_image,
        profilepic,
        username,
        likes,
        comments,
    }
) => {
  //console.log(post_image, profilepic, username, likes, comments)  
  //console.log(username)
  //sconsole.log(comments)

  const [isliked, setisliked] = useState(false)
  const [showcomments, setShowcomments] = useState(false)
  
  return (
    <View style={styles.container}>
    <View style={styles.cl}>
    <Image source={{uri : profilepic}} style={styles.profile_pic} />
     <Text style= {styles.username}> {username}</Text>
    </View>
    <Image source={{ uri: post_image}} style={styles.image} />
    
    <View style={styles.s2}>
    {
        isliked ?

        <View style ={styles.s21}> 
            <AntDesign name="heart" size={20} color="red" style={styles.iconliked} 
            onPress={()=> {
                setisliked(false)
            }}/>
            <Text style= {styles.liked}> {likes.length + 1}</Text>
        </View> 
        :
            <View style ={styles.s21}> 
            <AntDesign name="hearto" size={24} color="black" style={icons3} 
            onPress={()=> {
                setisliked(true)
            }}/>
            <Text style= {styles.notliked}> {likes.length}</Text>
        </View> 
    }

    
    <View style={styles.s22}>
       <FontAwesome6 name="comment-alt" size={20} color="black"  style={icons3}
                onPress={
                    () => { setShowcomments(!showcomments)

                    }}/>

    </View>
    </View>
     
     {
        showcomments == true &&
        <View style={styles.s3} > 
        {
            comments.map( (item, index) => {
                return (
                    <View style={styles.s31} key={item.id}>
                        <Text style={styles.commentuser}> {item.username}</Text>
                        <Text style={styles.commenttext}> {item.comment}</Text>
                    </View>
                )
            })
        }
        
        </View>
     }
    </View>

    
  )
}

export default Post_Big_Card

const styles = StyleSheet.create({
    container: {
        width: '100%',
        //height: 400,
        borderRadius: 10,
        backgroundColor: "pink",
        marginVertical: 10,
        overflow: "hidden",
        borderColor: 'rgb(203, 157, 157)',
        borderWidth: 1,
        

    },
    
    cl: 
    {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        backgroundColor: 'rgb(226, 193, 193)'
    },

    profile_pic:
    {
        width: 50,
        height: 50,
        borderRadius: 30,
        borderColor: 'pink',
        borderWidth: 1
    },

    username: 
    {
        color: 'black',
        marginLeft: 10,
        fontSize: 17,
        fontWeight: 'bold'
    },

    image: {
        width: '100%',
        aspectRatio: 1,
        
    
    },

    s2: 
    {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'rgb(218, 167, 167)',
        padding: 10,
        alignItems: 'center'
    },

    s21: 
    {
        //width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    
    notliked: 
    {
        colour: 'grey',
        //marginLeft: 1,
        fontSize: 24
    },

    liked:
    {
        color: '#DC143C',
        //marginLeft: 3,
        fontSize: 20
    },

    iconliked: {
        colour: '#DC143C',
        fontSize: 30,
        marginLeft: 10

    },

    s22: {
        marginLeft: 10,
        flexDirection: "row"
    },

    s3:
    {
        width: '100%',
        backgroundColor: 'rgb(234, 198, 198)',
        padding: 10,

    },

    s31:
    {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 3
    },

    commenttext:{
        color: 'black',
        fontSize: 17,
        marginLeft: 5
    },

    commentuser:{
        
        color: 'black',
        fontSize: 17,
        fontWeight: 'bold'
    }
})