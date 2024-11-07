import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import MainStack from './MainStack';
import {AppStackParamList} from './StackTypes';
import ExtruderOrderHistory from '../screens/Extruder/ExtruderOrderHistory';
import ExtruderAddCompletedOrder from '../screens/Extruder/ExtruderAddCompletedOrder';
import ProfileDetail from '../screens/User/ProfileDetail';
import {colors} from '../constants/colors';

const NativeStack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <NavigationContainer>
      <NativeStack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: colors.white},
        }}>
        <NativeStack.Screen component={MainStack} name="MainStack" />
        <NativeStack.Screen
          component={ExtruderOrderHistory}
          name="ExtruderOrderHistory"
        />
        <NativeStack.Screen
          component={ExtruderAddCompletedOrder}
          name="ExtruderAddCompletedOrder"
        />
        <NativeStack.Screen component={ProfileDetail} name="ProfileDetail" />
      </NativeStack.Navigator>
    </NavigationContainer>
  );
};

export default memo(AppStack);

const styles = StyleSheet.create({});
