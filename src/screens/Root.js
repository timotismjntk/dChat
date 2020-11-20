import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

// import screens
import Welcome from '../screens/Welcome';
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
//
import Devices from '../screens/Devices';
import QRCode from '../screens/QRCode';

const Root = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Welcome"
          component={Welcome}
        />
        <Stack.Screen
          name="StepOne"
          component={StepOne}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StepTwo"
          component={StepTwo}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StepThree"
          component={StepThree}
          options={{headerShown: false}}
        />
        {/* --- */}
        <Stack.Screen
          name="ImportAccount"
          component={ImportAccount}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EnterOldPhone"
          component={EnterOldPhone}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EnterOldEmail"
          component={EnterOldEmail}
          options={{headerShown: false}}
        />
        {/* --- */}
        <Stack.Screen
          name="CreateNewAccount"
          component={CreateNewAccount}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EnterNewPassword"
          component={EnterNewPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AutoAddFriend"
          component={AutoAddFriend}
          options={{headerShown: false}}
        />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
