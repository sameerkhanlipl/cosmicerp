import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {memo} from 'react';
import {colors} from '../constants/colors';
import Login from '../screens/Auth/Login';
import OtpVerification from '../screens/Auth/OtpVerification';
import SelectRole from '../screens/Auth/SelectRole';
import {AuthStackParamList} from './StackTypes';

const NativeStack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <NavigationContainer>
      <NativeStack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.color_F3FAF9,
          },
        }}>
        <NativeStack.Screen component={Login} name="Login" />
        <NativeStack.Screen
          component={OtpVerification}
          name="OtpVerification"
        />
        <NativeStack.Screen component={SelectRole} name="SelectRole" />
      </NativeStack.Navigator>
    </NavigationContainer>
  );
};

export default memo(AuthStack);
