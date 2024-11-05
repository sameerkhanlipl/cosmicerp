import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import MainStack from './MainStack';
import {AppStackParamList} from './StackTypes';

const NativeStack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <NavigationContainer>
      <NativeStack.Navigator screenOptions={{headerShown: false}}>
        <NativeStack.Screen component={MainStack} name="MainStack" />
      </NativeStack.Navigator>
    </NavigationContainer>
  );
};

export default memo(AppStack);

const styles = StyleSheet.create({});
