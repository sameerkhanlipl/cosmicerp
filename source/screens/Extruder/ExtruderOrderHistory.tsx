import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../stacks/StackTypes';

type ExtruderOrderHistoryProps = NativeStackScreenProps<
  AppStackParamList,
  'ExtruderOrderHistory'
>;

const ExtruderOrderHistory: FC<ExtruderOrderHistoryProps> = () => {
  return (
    <View>
      <Text>ExtruderOrderHistory</Text>
    </View>
  );
};

export default ExtruderOrderHistory;

const styles = StyleSheet.create({});
