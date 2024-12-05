import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {memo} from 'react';
import {colors} from '../constants/colors';
import ExtruderAddCompletedOrder from '../screens/Extruder/ExtruderAddCompletedOrder';
import ExtruderMaterialOut from '../screens/Extruder/ExtruderMaterialOut';
import ExtruderOrderHistory from '../screens/Extruder/ExtruderOrderHistory';
import LaminationMaterialOut from '../screens/Lamination/LaminationMaterialOut';
import PackingAddCompletedOrder from '../screens/Packing/PackingAddCompletedOrder';
import PackingOrderHistory from '../screens/Packing/PackingOrderHistory';
import RewindingAddCompletedOrder from '../screens/Rewinding/RewindingAddCompletedOrder';
import RewindingOrderHistory from '../screens/Rewinding/RewindingOrderHistory';
import ProfileDetail from '../screens/User/ProfileDetail';
import MainStack from './MainStack';
import {AppStackParamList} from './StackTypes';
import LaminationOrderHistory from '../screens/Lamination/LaminationOrderHistory';
import LaminationAddCompletedOrder from '../screens/Lamination/LaminationAddCompletedOrder';
import StitchingOrderHistory from '../screens/Stitching/StitchingOrderHistory';
import StitchingAddCompletedOrder from '../screens/Stitching/StitchingAddCompletedOrder';
import LaminationMaterialIn from '../screens/Lamination/LaminationMaterialIn';
import LaminationSearchOrders from '../screens/Lamination/LaminationSearchOrders';

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
          options={{animation: 'slide_from_bottom'}}
          component={LaminationSearchOrders}
          name="LaminationSearchOrders"
        />
        <NativeStack.Screen
          component={LaminationMaterialOut}
          name="LaminationMaterialOut"
        />
        <NativeStack.Screen
          component={LaminationMaterialIn}
          name="LaminationMaterialIn"
        />
        <NativeStack.Screen
          component={LaminationOrderHistory}
          name="LaminationOrderHistory"
        />
        <NativeStack.Screen
          component={LaminationAddCompletedOrder}
          name="LaminationAddCompletedOrder"
        />
        <NativeStack.Screen
          component={ExtruderOrderHistory}
          name="ExtruderOrderHistory"
        />
        <NativeStack.Screen
          component={ExtruderAddCompletedOrder}
          name="ExtruderAddCompletedOrder"
        />
        <NativeStack.Screen component={ProfileDetail} name="ProfileDetail" />
        <NativeStack.Screen
          component={ExtruderMaterialOut}
          name="ExtruderMaterialOut"
        />
        <NativeStack.Screen
          component={PackingOrderHistory}
          name="PackingOrderHistory"
        />
        <NativeStack.Screen
          component={PackingAddCompletedOrder}
          name="PackingAddCompletedOrder"
        />
        <NativeStack.Screen
          component={RewindingOrderHistory}
          name="RewindingOrderHistory"
        />
        <NativeStack.Screen
          component={RewindingAddCompletedOrder}
          name="RewindingAddCompletedOrder"
        />
        <NativeStack.Screen
          component={StitchingOrderHistory}
          name="StitchingOrderHistory"
        />
        <NativeStack.Screen
          component={StitchingAddCompletedOrder}
          name="StitchingAddCompletedOrder"
        />
      </NativeStack.Navigator>
    </NavigationContainer>
  );
};

export default memo(AppStack);
