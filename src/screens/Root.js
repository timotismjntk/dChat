import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import SplashScreen from 'react-native-splash-screen';
import PushNotification from 'react-native-push-notification';

import deviceAction from '../redux/actions/device';

const Stack = createStackNavigator();
const Register = createStackNavigator();

// import component share modal
import ShareModal from '../components/ShareModal';
import GoToAddFriendFromHeader from '../components/GoToAddFriendFromHeader';
import GotoCreateGroupFromHeader from '../components/GotoCreateGroupFromHeader';

// import screens
import Welcome from '../screens/Welcome';
//
import LoginWithEmail from '../screens/LoginWithEmail';
//
import StepOne from '../screens/StepOne';
import StepTwo from '../screens/StepTwo';
import StepThree from '../screens/StepThree';
//
import ImportAccount from '../screens/ImportAccount';
import EnterOldPhone from '../screens/EnterOldPhone';
import EnterOldEmail from '../screens/EnterOldEmail';
//
import CreateNewAccount from '../screens/CreateNewAccount';
import EnterNewPassword from '../screens/EnterNewPassword';
import AutoAddFriend from '../screens/AutoAddFriend';
//
import Home from '../screens/Home';
import ChatDetail from '../screens/ChatDetail';
import StartNewChat from '../screens/StartNewChat';
//
import SettingAccount from '../screens/SettingAccount';
import UserProfile from '../screens/UserProfile';
//
import AddName from '../screens/AddName';
import AddStatusMessage from '../screens/AddStatusMessage';
import AddUniqueId from '../screens/AddUniqueId';
//
import ProfileDetail from '../screens/ProfileDetail';
//
import ChangePhoneNumberParent from './ChangePhoneNumberParent';
import ChangePhoneNumber from '../screens/ChangePhoneNumber';
import ChangePassword from '../screens/ChangePassword';
import ForgotPassword from '../screens/ForgotPassword';
import ResetPassword from '../screens/ResetPassword';
import VerifyResetCode from '../screens/VerifyResetCode';
//
import ChangeEmail from '../screens/ChangeEmail';
//
import Devices from '../screens/Devices';
import QRCode from '../screens/QRCode';
//
import AddFriend from '../screens/AddFriend';
//
import Friend from '../screens/Friend';
//
import CreateGroup from '../screens/CreateGroup';
//
import PreviewProfileImage from '../screens/PreviewProfileImage';


PushNotification.createChannel(
  {
    channelId: 'dChat',
    channelName: 'dChat Notification Channel',
    channelDescription: 'dChatNotification',
    soundName: 'default',
    importance: 4,
    vibrate: true,
  },
  (created) => console.log(`createdChannel returned '${created}'`),
);

const Root = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const authState = useSelector((state) => state.auth);
  const {isLoginWithNumber, isLogin, isRegistered} = authState;

  const [tokenDevice, setTokenDevice] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    PushNotification.configure({
      onRegister: (token) => {
        setTokenDevice(token.token);
        // console.log(tokenRegistration);
      },

      onNotification: (notification) => {
        console.log('NOTIFICATION:', notification);
        PushNotification.localNotification({
          channelId: 'dChat',
          title: notification.title,
          message: notification.message,
          largeIconUrl: notification.largeIconUrl,
        });
      },

      onRegisterError: (err) => {
        console.error(err.message, err);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (tokenDevice) {
      console.log(tokenDevice);
      dispatch(deviceAction.setDeviceTokenToStateRedux(tokenDevice));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenDevice]);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      {!isLoginWithNumber && !isLogin ? (
        <Stack.Navigator>
          <Register.Screen
            options={{headerShown: false}}
            name="Welcome"
            component={Welcome}
          />
          {/* ---- */}
          <Register.Screen
            name="LoginWithEmail"
            component={LoginWithEmail}
            options={{headerShown: false}}
          />
          {/* ---- */}
          <Register.Screen
            name="StepOne"
            component={StepOne}
            options={{headerShown: false}}
          />
          <Register.Screen
            name="StepTwo"
            component={StepTwo}
            options={{headerShown: false}}
          />
          <Register.Screen
            name="StepThree"
            component={StepThree}
            options={{headerShown: false}}
          />
          {/* --- */}
          <Register.Screen
            name="ImportAccount"
            component={ImportAccount}
            options={{headerShown: false}}
          />
          <Register.Screen
            name="EnterOldPhone"
            component={EnterOldPhone}
            options={{headerShown: false}}
          />
          <Register.Screen
            name="EnterOldEmail"
            component={EnterOldEmail}
            options={{headerShown: false}}
          />
          {/* --- */}
          <Register.Screen
            name="CreateNewAccount"
            component={CreateNewAccount}
            options={{headerShown: false}}
          />
          <Register.Screen
            name="EnterNewPassword"
            component={EnterNewPassword}
            options={{headerShown: false}}
          />
          <Register.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{headerShown: false}}
          />
          <Register.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={{
              headerStyle: {
                elevation: 1,
                shadowOpacity: 0,
                backgroundColor: 'white',
              },
              headerTitle: 'Reset Password',
              headerTitleStyle: {
                fontSize: 18,
                fontWeight: '100',
              },
              headerLeft: () => {
                return null;
              },
            }}
          />
          <Register.Screen
            name="VerifyResetCode"
            component={VerifyResetCode}
            options={{headerShown: false}}
          />
          <Register.Screen
            name="AutoAddFriend"
            component={AutoAddFriend}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChatDetail"
            component={ChatDetail}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="StartNewChat"
            component={StartNewChat}
            options={{
              headerStyle: {
                elevation: 1,
                shadowOpacity: 0,
                backgroundColor: 'white',
                height: 60,
              },
              headerTitle: 'Mulai mengobrol',
              headerTitleStyle: {
                fontSize: 18,
                fontWeight: '100',
              },
              headerLeft: () => {
                return null;
              },
            }}
          />
          <Stack.Screen
            name="SettingAccount"
            component={SettingAccount}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="UserProfile"
            component={UserProfile}
            options={{
              headerStyle: {
                elevation: 1,
                shadowOpacity: 0,
                backgroundColor: 'white',
                height: 60,
              },
              headerTitle: 'Profil',
              headerTitleStyle: {
                fontSize: 18,
                fontWeight: '100',
              },
              headerLeft: () => {
                return null;
              },
            }}
          />
          {/* ---- */}
          <Stack.Screen
            name="AddName"
            component={AddName}
            options={{
              headerStyle: {
                elevation: 1,
                shadowOpacity: 0,
                backgroundColor: 'white',
                height: 60,
              },
              headerTitle: 'Nama Tampilan',
              headerTitleStyle: {
                fontSize: 18,
                fontWeight: '100',
              },
              headerLeft: () => {
                return null;
              },
            }}
          />
          <Stack.Screen
            name="AddStatusMessage"
            component={AddStatusMessage}
            options={{
              headerStyle: {
                elevation: 1,
                shadowOpacity: 0,
                backgroundColor: 'white',
                height: 60,
              },
              headerTitle: 'Pesan Status',
              headerTitleStyle: {
                fontSize: 18,
                fontWeight: '100',
              },
              headerLeft: () => {
                return null;
              },
            }}
          />
          {/* ---- */}
          <Stack.Screen
            name="ChangeEmail"
            component={ChangeEmail}
            options={{
              headerStyle: {
                elevation: 1,
                shadowOpacity: 0,
                backgroundColor: 'white',
                height: 60,
              },
              headerTitle: 'Pendaftaran Email',
              headerTitleStyle: {
                fontSize: 18,
                fontWeight: '100',
              },
              headerLeft: () => {
                return null;
              },
            }}
          />
          {/* ------ */}
          <Stack.Screen
            name="AddUniqueId"
            component={AddUniqueId}
            options={{
              headerStyle: {
                elevation: 1,
                shadowOpacity: 0,
                backgroundColor: 'white',
                height: 60,
              },
              headerTitle: 'ID Pengguna',
              headerTitleStyle: {
                fontSize: 18,
                fontWeight: '100',
              },
              headerLeft: () => {
                return null;
              },
            }}
          />
          {/* ---- */}
          <Stack.Screen
            name="ProfileDetail"
            component={ProfileDetail}
            options={{
              headerStyle: {
                elevation: 1,
                shadowOpacity: 0,
                backgroundColor: 'white',
                height: 60,
              },
              headerTitle: 'Akun',
              headerTitleStyle: {
                fontSize: 18,
                fontWeight: '100',
              },
              headerLeft: () => {
                return null;
              },
            }}
          />
          {/* ---- */}
          <Stack.Screen
            name="ChangePhoneNumberParent"
            component={ChangePhoneNumberParent}
            options={{
              headerStyle: {
                elevation: 1,
                shadowOpacity: 0,
                backgroundColor: 'white',
                height: 60,
              },
              headerTitle: 'Ubah Nomor Telepon',
              headerTitleStyle: {
                fontSize: 18,
                fontWeight: '100',
              },
              headerLeft: () => {
                return null;
              },
            }}
          />
          <Stack.Screen
            name="ChangePhoneNumber"
            component={ChangePhoneNumber}
            options={{
              headerStyle: {
                elevation: 1,
                shadowOpacity: 0,
                backgroundColor: 'white',
                height: 60,
              },
              headerTitle: 'Ubah Nomor Telepon',
              headerTitleStyle: {
                fontSize: 18,
                fontWeight: '100',
              },
              headerLeft: () => {
                return null;
              },
            }}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{
              headerStyle: {
                elevation: 1,
                shadowOpacity: 0,
                backgroundColor: 'white',
                height: 60,
              },
              headerTitle: 'Ubah Kata Sandi',
              headerTitleStyle: {
                fontSize: 18,
                fontWeight: '100',
              },
              headerLeft: () => {
                return null;
              },
            }}
          />
          {/* ----- */}
          <Stack.Screen
            name="Devices"
            component={Devices}
            options={{
              headerStyle: {
                elevation: 1,
                shadowOpacity: 0,
                backgroundColor: 'white',
                height: 60,
              },
              headerTitle: 'Perangkat',
              headerTitleStyle: {
                fontSize: 18,
                fontWeight: '100',
              },
              headerLeft: () => {
                return null;
              },
            }}
          />
          <Stack.Screen
            name="QRCode"
            component={QRCode}
            options={{
              headerStyle: {
                elevation: 1,
                shadowOpacity: 0,
                backgroundColor: 'white',
                height: 60,
              },
              headerTitle: 'Kode QR',
              headerTitleStyle: {
                fontSize: 18,
                fontWeight: '100',
              },
              headerLeft: () => {
                return null;
              },
            }}
          />
          {/* ---- */}
          <Stack.Screen
            name="AddFriend"
            component={AddFriend}
            options={{
              headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                backgroundColor: 'white',
                // height: 60,
              },
              headerTitle: 'Tambah Teman',
              headerTitleStyle: {
                fontSize: 18,
                fontWeight: '100',
              },
              headerLeft: () => {
                return null;
              },
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => setOpenModal(true)}
                  style={{paddingRight: 15}}>
                  <Icon
                    name="share"
                    size={18}
                    style={{transform: [{rotate: '0deg'}]}}
                  />
                  <ShareModal
                    open={openModal}
                    close={() => setOpenModal(false)}
                  />
                </TouchableOpacity>
              ),
            }}
          />
          {/* ------------------- */}
          <Stack.Screen
            name="Friend"
            component={Friend}
            options={{
              headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                backgroundColor: 'white',
                // height: 60,
              },
              headerTitle: 'Teman',
              headerTitleStyle: {
                fontSize: 18,
                fontWeight: '100',
              },
              headerLeft: () => {
                return null;
              },
              headerRight: () => (
                <View style={{flexDirection: 'row'}}>
                  <GoToAddFriendFromHeader />
                  <GotoCreateGroupFromHeader />
                </View>
              ),
            }}
          />
          <Stack.Screen
            name="CreateGroup"
            component={CreateGroup}
            options={{
              headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                backgroundColor: 'white',
                // height: 60,
              },
              headerTitle: 'Buat Grup',
              headerTitleStyle: {
                fontSize: 18,
                fontWeight: '100',
              },
              headerLeft: () => {
                return null;
              },
            }}
          />
          <Stack.Screen
            name="PreviewProfileImage"
            component={PreviewProfileImage}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Root;
