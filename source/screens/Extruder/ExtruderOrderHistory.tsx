import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {memo, useCallback, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import CommonHeader from '../../components/styles/CommonHeader';
import {AppNavigationProp, AppStackParamList} from '../../stacks/StackTypes';
import ExtruderOrderHistoryItems, {
  ExtruderOrderHistoryItemType,
} from './ExtruderOrderHistoryItems';
import ExtrudersItems, {ExtrudersItemType} from './ExtrudersItems';

const ItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

type ExtruderOrderHistoryRouteProps = RouteProp<
  AppStackParamList,
  'ExtruderOrderHistory'
>;

const ExtruderOrderHistory = () => {
  const {navigate} = useNavigation<AppNavigationProp>();

  const route = useRoute<ExtruderOrderHistoryRouteProps>();

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
    [navigate],
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
        ListHeaderComponent={
          <>
            <ExtrudersItems
              onPress={onNavigateExtruderAddCompletedOrder}
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

export default memo(ExtruderOrderHistory);

const styles = StyleSheet.create({
  root: {flex: 1},
  list: {flexGrow: 1, padding: 25, paddingBottom: 200},
  itemSeparator: {height: 20},
});
