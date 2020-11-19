import React, {useState, useEffect} from 'react';
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
