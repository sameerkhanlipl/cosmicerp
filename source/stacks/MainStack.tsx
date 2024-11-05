import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {FC, memo, ReactNode} from 'react';
import {Image, StyleSheet} from 'react-native';
import {images} from '../assets/images';
import {colors} from '../constants/colors';
import {fontFamily} from '../constants/fontFamily';
import Extruder from '../screens/Extruder/Extruder';
import Lamination from '../screens/Lamination/Lamination';
import Packing from '../screens/Packing/Packing';
import Rewinding from '../screens/Rewinding/Rewinding';
import Silai from '../screens/Silai/Silai';
import {MainParamList} from './StackTypes';

const BottomStack = createBottomTabNavigator<MainParamList>();

type TabBarIconProps = {
  color: string;
  icon: number;
};

const TabIcon: FC<TabBarIconProps> = ({color, icon}) => (
  <Image
    tintColor={color}
    resizeMode="contain"
    style={styles.icon}
    source={icon}
  />
);

const MainStack = () => {
  return (
    <BottomStack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: colors.transparent_black_4,
        tabBarActiveTintColor: colors.color_22534F,
        tabBarItemStyle: {
          borderTopWidth: 1,
          borderTopColor: colors.lightGray,
        },
        headerTitleStyle: {
          fontFamily: fontFamily.Font600,
          fontSize: 12,
        },
      }}
      sceneContainerStyle={{backgroundColor: colors.color_F3FAF9}}>
      <BottomStack.Screen
        component={Extruder}
        name="Extruder"
        options={{
          tabBarIcon: ({color}): ReactNode => (
            <TabIcon color={color} icon={images.extruder} />
          ),
        }}
      />
      <BottomStack.Screen
        component={Packing}
        name="Packing"
        options={{
          tabBarIcon: ({color}): ReactNode => (
            <TabIcon color={color} icon={images.packing} />
          ),
        }}
      />
      <BottomStack.Screen
        component={Silai}
        name="Silai"
        options={{
          tabBarIcon: ({color}): ReactNode => (
            <TabIcon color={color} icon={images.silai} />
          ),
        }}
      />
      <BottomStack.Screen
        component={Rewinding}
        name="Rewinding"
        options={{
          tabBarIcon: ({color}): ReactNode => (
            <TabIcon color={color} icon={images.rewinding} />
          ),
        }}
      />
      <BottomStack.Screen
        component={Lamination}
        name="Lamination"
        options={{
          tabBarIcon: ({color}): ReactNode => (
            <TabIcon color={color} icon={images.lamination} />
          ),
        }}
      />
    </BottomStack.Navigator>
  );
};

export default memo(MainStack);

const styles = StyleSheet.create({
  icon: {
    height: 28,
    width: 28,
  },
});
