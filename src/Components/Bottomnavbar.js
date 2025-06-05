import { StyleSheet, View, Platform } from 'react-native';
import React from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const Bottomnavbar = ({ navigation, page }) => {
  const activeColor = 'rgb(222, 92, 118)'; 
  const inactiveColor = 'black';

  return (
    <View style={styles.container}>
      <Entypo
        name="home"
        size={24}
        color={page === 'Mainpage' ? activeColor : inactiveColor}
        onPress={() => navigation.navigate('Mainpage')}
      />

      <FontAwesome5
        name="search"
        size={24}
        color={page === 'SearchUserPage' ? activeColor : inactiveColor}
        onPress={() => navigation.navigate('SearchUserPage')}
      />

      <FontAwesome6
        name="add"
        size={24}
        color={page === 'AddPost' ? activeColor : inactiveColor}
        onPress={() => navigation.navigate('AddPost')}
      />

      <MaterialIcons
        name="explore"
        size={26}
        color={page === 'ExplorePage' ? activeColor : inactiveColor}
        onPress={() => navigation.navigate('ExplorePage')}
      />

      <Feather
        name="user"
        size={24}
        color={page === 'My_UserProfile' ? activeColor : inactiveColor}
        onPress={() => navigation.navigate('My_UserProfile')}
      />
    </View>
  );
};

export default Bottomnavbar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 10,
    width: '100%',
    zIndex: 100,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: Platform.OS === 'ios' ? 20 : 10,
    height: Platform.OS === 'ios' ? 90 : 70,
    alignItems: 'center',
  },
});
