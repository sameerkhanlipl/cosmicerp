import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {memo, useCallback, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import CommonHeader from '../../components/styles/CommonHeader';
import {AppNavigationProp, AppStackParamList} from '../../stacks/StackTypes';
import PackingItems, {PackingItemType} from './PackingItems';
import PackingOrderHistoryItems, {
  PackingOrderHistoryItemType,
} from './PackingOrderHistoryItems';

const ItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

type PackingOrderHistoryRouteProps = RouteProp<
  AppStackParamList,
  'PackingOrderHistory'
>;

const PackingOrderHistory = () => {
  const {navigate} = useNavigation<AppNavigationProp>();

  const route = useRoute<PackingOrderHistoryRouteProps>();

  const [list] = useState<PackingOrderHistoryItemType[]>([
    {
      date: new Date()?.toString(),
      labour_name: 'Ramesh',
      bag_box: '2',
      pending_qty: '10',
      size: {length: 14, width: 28},
      remark: 'This handy tool helps you create dummy text for all',
    },
    {
      date: new Date()?.toString(),
      labour_name: 'Ramesh',
      bag_box: '2',
      pending_qty: '10',
      size: {length: 14, width: 28},
      remark: 'This handy tool helps you create dummy text for all',
    },
    {
      date: new Date()?.toString(),
      labour_name: 'Ramesh',
      bag_box: '2',
      pending_qty: '10',
      size: {length: 14, width: 28},
      remark: 'This handy tool helps you create dummy text for all',
    },
    {
      date: new Date()?.toString(),
      labour_name: 'Ramesh',
      bag_box: '2',
      pending_qty: '10',
      size: {length: 14, width: 28},
      remark: 'This handy tool helps you create dummy text for all',
    },
  ]);

  const ItemData = route?.params?.data;

  const onNavigatePackingAddCompletedOrder = useCallback(
    (data: PackingItemType) => {
      navigate('PackingAddCompletedOrder', {data: data});
    },
    [],
  );

  const renderItemHandler = useCallback(
    ({item}: {item: PackingOrderHistoryItemType}) => {
      return <PackingOrderHistoryItems data={item} />;
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
            <PackingItems
              onPress={onNavigatePackingAddCompletedOrder}
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

export default memo(PackingOrderHistory);

const styles = StyleSheet.create({
  root: {flex: 1},
  list: {flexGrow: 1, padding: 25, paddingBottom: 200},
  itemSeparator: {height: 20},
});
