import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

const TopNavbar = ({ navigation, page, notify }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          {/* You can place a title or logo here if needed */}
        </View>

        <View style={styles.iconsContainer}>
          {notify === 'Notification' && (
            <Ionicons
              name="notifications"
              size={24}
              color="black"
              style={styles.icon}
              onPress={() => navigation.navigate('NotificationPage')}
            />
          )}

          {page === 'Mainpage' && (
            <Ionicons
              name="chatbubbles"
              size={24}
              color="black"
              style={styles.icon}
              onPress={() => navigation.navigate('All_Chats')}
            />
          )}

          {page === 'My_UserProfile' && (
            <Ionicons
              name="settings-sharp"
              size={24}
              color="black"
              style={styles.icon}
              onPress={() => navigation.navigate('Settings1')}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TopNavbar;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  leftContainer: {
    flex: 1,
  },
  iconsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  icon: {
    marginLeft: 16,
  },
});
