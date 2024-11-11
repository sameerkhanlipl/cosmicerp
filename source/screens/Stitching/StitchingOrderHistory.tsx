import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {memo, useCallback, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import CommonHeader from '../../components/styles/CommonHeader';
import {AppNavigationProp, AppStackParamList} from '../../stacks/StackTypes';
import StitchingItems, {StitchingItemType} from './StitchingItems';
import StitchingOrderHistoryItems, {
  StitchingOrderHistoryItemType,
} from './StitchingOrderHistoryItems';

const ItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

type StitchingOrderHistoryRouteProps = RouteProp<
  AppStackParamList,
  'StitchingOrderHistory'
>;

const StitchingOrderHistory = () => {
  const {navigate} = useNavigation<AppNavigationProp>();

  const route = useRoute<StitchingOrderHistoryRouteProps>();

  const [list] = useState<StitchingOrderHistoryItemType[]>([
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

  const onNavigateStitchingAddCompletedOrder = useCallback(
    (data: StitchingItemType) => {
      navigate('StitchingAddCompletedOrder', {data: data});
    },
    [navigate],
  );

  const renderItemHandler = useCallback(
    ({item}: {item: StitchingOrderHistoryItemType}) => {
      return <StitchingOrderHistoryItems data={item} />;
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
        ListHeaderComponent={
          <>
            <StitchingItems
              onPress={onNavigateStitchingAddCompletedOrder}
              data={ItemData}
            />
            <ItemSeparatorComponent />
          </>
        }
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
  );
};

export default memo(StitchingOrderHistory);

const styles = StyleSheet.create({
  root: {flex: 1},
  list: {flexGrow: 1, padding: 25, paddingBottom: 200},
  itemSeparator: {height: 20},
});
