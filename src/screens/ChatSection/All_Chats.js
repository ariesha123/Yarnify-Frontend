import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { formHead2 } from '../../common css/formsCss';
import ChatCard from '../../Cards/ChatCard';
import { searchbar } from '../../common css/pagecss';
import AsyncStorage from '@react-native-async-storage/async-storage';

const All_Chats = ({ navigation }) => {
  const [chats, setChats] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [userdata, setUserdata] = useState(null);

  const loadchats = () => {
    AsyncStorage.getItem('user')
      .then(data => {
        setUserdata(JSON.parse(data));
        let userid = JSON.parse(data).user._id;

        fetch('http://192.168.0.101:3000/getusermessages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userid }),
        })
          .then(res => res.json())
          .then(data => {
            data.sort((a, b) => (a.date > b.date ? -1 : 1));
            setChats(data);
          })
          .catch(() => {
            alert('Something went wrong');
            setChats([]);
          });
      })
      .catch(err => alert(err));
  };

  // Reload chats every time screen is focused
  useFocusEffect(
    useCallback(() => {
      loadchats();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <Ionicons
        name="chevron-back-circle"
        size={24}
        color="black"
        style={styles.gohomeicon}
        onPress={() => {
          console.log('Back pressed: navigating to Mainpage');
          navigation.navigate('Mainpage');
        }}
      />

      <View style={styles.c1}>
        <Text style={formHead2}>Messages</Text>
        <TextInput
          style={searchbar}
          placeholder="Search"
          onChangeText={text => setKeyword(text)}
        />
      </View>

      <View style={styles.c2}>
        {chats !== null &&
          chats
            .filter(chat => {
              if (keyword === '') return true;
              return (
                chat.username.toLowerCase().includes(keyword.toLowerCase()) ||
                chat.lastmessage.toLowerCase().includes(keyword.toLowerCase())
              );
            })
            .map(chat => (
              <ChatCard key={chat.fuserid} chat={chat} navigation={navigation} />
            ))}
      </View>
    </ScrollView>
  );
};

export default All_Chats;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(241, 181, 181)',
  },
  gohomeicon: {
    position: 'absolute',
    top: 15,
    left: 20,
    zIndex: 10,
    color: 'white',
    fontSize: 30,
  },
  c1: {
    width: '95%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    backgroundColor: 'rgb(214, 162, 162)',
    alignSelf: 'center',
    borderRadius: 20,
    borderColor: 'gray',
    borderWidth: 1,
    top: 10,
  },
  searchbar: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    fontSize: 18,
  },
  c2: {
    width: '100%',
    padding: 10,
  },
});
