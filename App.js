import { StatusBar } from 'expo-status-bar';
import { Settings, StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/LoginSignUp/Login/Login';
import SignUp_EnterEmail from './src/screens/LoginSignUp/Signup/SignUp_EnterEmail';
import SignUp_AccountCreated from './src/screens/LoginSignUp/Signup/SignUp_AccountCreated';
import SignUp_ChoosePassword from './src/screens/LoginSignUp/Signup/SignUp_ChoosePassword';
import SignUp_ChooseUsername from './src/screens/LoginSignUp/Signup/SignUp_ChooseUsername';
import SignUp_EnterVerificationCode from './src/screens/LoginSignUp/Signup/SignUp_EnterVerificationCode';
import ForgotPassword_EnterEmail from './src/screens/LoginSignUp/ForgotPassword/ForgotPassword_EnterEmail';
import ForgotPassword_EnterVerificationCode from './src/screens/LoginSignUp/ForgotPassword/ForgetPassword_EnterVerificationCode';
import ForgotPassword_ChoosePassword from './src/screens/LoginSignUp/ForgotPassword/ForgotPassword_ChoosePassword';
import ForgotPassword_Accountrecovered from './src/screens/LoginSignUp/ForgotPassword/ForgotPassword_Accountrecovered';
import MainPage from './src/screens/Mainpage/MainPage';
import All_Chats from './src/screens/ChatSection/All_Chats';
import SearchUserPage from './src/screens/Mainpage/SearchUserPage';
import NotificationPage from './src/screens/Mainpage/NotificationPage';
import My_UserProfile from './src/screens/Profile/My_UserProfile';
import ExplorePage from './src/screens/Mainpage/ExplorePage';
import Settings1 from './src/Settings/Settings1';
import EditProfile from './src/Settings/EditProfile';
import ChangePassword from './src/Settings/ChangePassword';
import ChangeUsername from './src/Settings/ChangeUsername';
import ChangeDescription from './src/Settings/ChangeDescription';
import Other_UserProfile from './src/screens/Profile/Other_UserProfile';
import MessagePage from './src/screens/ChatSection/MessagePage';
import UploadProfilePicture from './src/Settings/UploadProfilePicture';
import AddPost from './src/screens/Mainpage/AddPost';
import PostDetails from './src/screens/Posts/PostDetails';
import PostDetails_OtherUser from './src/screens/Posts/PostDetails_OtherUser';



const Stack = createNativeStackNavigator();
export default function App() {
  
  return (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{
      headerShown: false,
      animation: 'slide_from_right'
      }}>
      
      <Stack.Screen name="Mainpage" component={MainPage} />
      <Stack.Screen name="Login" component={Login} />

      <Stack.Screen name="SignUp_EnterEmail" component={SignUp_EnterEmail} />
      <Stack.Screen name="SignUp_EnterVerificationCode" component={SignUp_EnterVerificationCode} />
      <Stack.Screen name="SignUp_ChooseUsername" component={SignUp_ChooseUsername} />
      <Stack.Screen name="SignUp_ChoosePassword" component={SignUp_ChoosePassword} />
      <Stack.Screen name="SignUp_AccountCreated" component={SignUp_AccountCreated} />
     
      <Stack.Screen name="ForgotPassword_EnterEmail" component={ForgotPassword_EnterEmail} />
      <Stack.Screen name="ForgotPassword_EnterVerificationCode" component={ForgotPassword_EnterVerificationCode} />
      <Stack.Screen name="ForgotPassword_ChoosePassword" component={ForgotPassword_ChoosePassword} />
      <Stack.Screen name="ForgotPassword_Accountrecovered" component={ForgotPassword_Accountrecovered} />
      <Stack.Screen name="Settings1" component={Settings1} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="ChangeUsername" component={ChangeUsername} />
      <Stack.Screen name="ChangeDescription" component={ChangeDescription} />
      <Stack.Screen name="Other_UserProfile" component={Other_UserProfile} />
      <Stack.Screen name="MessagePage" component={MessagePage} />
       <Stack.Screen name="UploadProfilePicture" component={UploadProfilePicture} />
       <Stack.Screen name="AddPost" component={AddPost} />
      <Stack.Screen name="PostDetails" component={PostDetails} />
      <Stack.Screen name="PostDetails_OtherUser" component={PostDetails_OtherUser} />

      <Stack.Screen name="All_Chats" component={All_Chats} 
          options={{
            animation: "slide_from_right"
          }}
      />                           

      <Stack.Screen name="SearchUserPage" component={SearchUserPage}
          options={{
            animation: "slide_from_right"
          }}/>

      <Stack.Screen name="NotificationPage" component={NotificationPage}
          options={{
            animation: "slide_from_right"
          }}/>

      <Stack.Screen name="My_UserProfile" component={My_UserProfile}
          options={{
            animation: "slide_from_right"
          }}/>

      <Stack.Screen name="ExplorePage" component={ExplorePage}
          options={{
            animation: "slide_from_right"
          }}/>

       

    </Stack.Navigator>
  </NavigationContainer>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
