import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {memo, useCallback, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import CommonHeader from '../../components/styles/CommonHeader';
import {AppNavigationProp, AppStackParamList} from '../../stacks/StackTypes';
import RewindingItems, {RewindingItemType} from './RewindingItems';
import RewindingOrderHistoryItems, {
  RewindingOrderHistoryItemType,
} from './RewindingOrderHistoryItems';

const ItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

type RewindingOrderHistoryRouteProps = RouteProp<
  AppStackParamList,
  'RewindingOrderHistory'
>;

const RewindingOrderHistory = () => {
  const {navigate} = useNavigation<AppNavigationProp>();

  const route = useRoute<RewindingOrderHistoryRouteProps>();

  const [list] = useState<RewindingOrderHistoryItemType[]>([
    {
      date: new Date()?.toString(),
      contractor: 'Ramesh',
      rolls: '2',
      color: 'Red',
      size: {length: 14, width: 28},
      remark: 'This handy tool helps you create dummy text for all',
    },
    {
      date: new Date()?.toString(),
      contractor: 'Ramesh',
      rolls: '2',
      color: 'Red',
      size: {length: 14, width: 28},
      remark: 'This handy tool helps you create dummy text for all',
    },
    {
      date: new Date()?.toString(),
      contractor: 'Ramesh',
      rolls: '2',
      color: 'Red',
      size: {length: 14, width: 28},
      remark: 'This handy tool helps you create dummy text for all',
    },
    {
      date: new Date()?.toString(),
      contractor: 'Ramesh',
      rolls: '2',
      color: 'Red',
      size: {length: 14, width: 28},
      remark: 'This handy tool helps you create dummy text for all',
    },
    {
      date: new Date()?.toString(),
      contractor: 'Ramesh',
      rolls: '2',
      color: 'Red',
      size: {length: 14, width: 28},
      remark: 'This handy tool helps you create dummy text for all',
    },
  ]);

  const ItemData = route?.params?.data;

  const onNavigateRewindingAddCompletedOrder = useCallback(
    (data: RewindingItemType) => {
      navigate('RewindingAddCompletedOrder', {data: data});
    },
    [],
  );

  const renderItemHandler = useCallback(
    ({item}: {item: RewindingOrderHistoryItemType}) => {
      return <RewindingOrderHistoryItems data={item} />;
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
            <RewindingItems
              onPress={onNavigateRewindingAddCompletedOrder}
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

export default memo(RewindingOrderHistory);

const styles = StyleSheet.create({
  root: {flex: 1},
  list: {flexGrow: 1, padding: 25, paddingBottom: 200},
  itemSeparator: {height: 20},
});
