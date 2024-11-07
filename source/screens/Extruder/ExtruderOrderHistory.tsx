import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC, memo, useCallback, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import CommonHeader from '../../components/styles/CommonHeader';
import {AppNavigationProp, AppStackParamList} from '../../stacks/StackTypes';
import ExtruderOrderHistoryItems, {
  ExtruderOrderHistoryItemType,
} from './ExtruderOrderHistoryItems';
import ExtrudersItems, {ExtrudersItemType} from './ExtrudersItems';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

type ExtruderOrderHistoryProps = NativeStackScreenProps<
  AppStackParamList,
  'ExtruderOrderHistory'
>;

const ItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

const ExtruderOrderHistory: FC<ExtruderOrderHistoryProps> = ({
  route,
}: ExtruderOrderHistoryProps) => {
  const {navigate} = useNavigation<AppNavigationProp>();

  const [list] = useState<ExtruderOrderHistoryItemType[]>([
    {
      date: new Date().toString(),
      machine: 1,
      shift: 'day',
      qty: '100',
      size: '28',
    },
    {
      date: new Date().toString(),
      machine: 1,
      shift: 'day',
      qty: '100',
      size: '28',
    },
    {
      date: new Date().toString(),
      machine: 1,
      shift: 'day',
      qty: '100',
      size: '28',
    },
    {
      date: new Date().toString(),
      machine: 1,
      shift: 'day',
      qty: '100',
      size: '28',
    },
  ]);

  const ItemData = route?.params?.data;

  const onNavigateExtruderAddCompletedOrder = useCallback(
    (data: ExtrudersItemType) => {
      navigate('ExtruderAddCompletedOrder', {data: data});
    },
    [],
  );

  const renderItemHandler = useCallback(
    ({item}: {item: ExtruderOrderHistoryItemType}) => {
      return <ExtruderOrderHistoryItems data={item} />;
    },
    [],
  );

  return (
    <View style={styles.root}>
      <CommonHeader title={'Order History #' + ItemData?.order_id} />
      <FlatList
        data={list}
        renderItem={renderItemHandler}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index: number) => index?.toString()}
        ListHeaderComponent={() => (
          <>
            <ExtrudersItems
              onPress={onNavigateExtruderAddCompletedOrder}
              data={ItemData}
            />
            <ItemSeparatorComponent />
          </>
        )}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
  );
};

export default memo(ExtruderOrderHistory);

const styles = StyleSheet.create({
  root: {flex: 1},
  list: {flexGrow: 1, padding: 25, paddingBottom: 200},
  itemSeparator: {height: 20},
});
