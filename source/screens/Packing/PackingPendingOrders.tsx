import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {packing_order_listing_response} from '../../api/ResponseTypes';
import {packing_pending_orders} from '../../api/apis';
import EmptyList from '../../components/styles/EmptyList';
import {AppNavigationProp} from '../../stacks/StackTypes';
import {error} from '../../utils/ErrorHandler';
import PackingItems, {PackingItemType} from './PackingItems';

const ItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

const PackingPendingOrders = () => {
  const [list, setList] = useState<PackingItemType[]>([]);

  const [loader, setLoader] = useState(false);

  const {navigate} = useNavigation<AppNavigationProp>();

  const getList = useCallback(async () => {
    try {
      setLoader(true);
      const response: {data: packing_order_listing_response} =
        await packing_pending_orders();
      setList(response?.data?.data);
      setLoader(false);
    } catch (err: any) {
      error(err);
      setLoader(false);
    } finally {
      setLoader(false);
    }
  }, []);

  useEffect(() => {
    getList();
  }, [getList]);

  const onNavigatePackingOrderHistory = useCallback(
    (data: PackingItemType) => {
      // navigate('PackingOrderHistory', {data: data});
    },
    [navigate],
  );

  const renderItemHandler = useCallback(
    ({item}: {item: PackingItemType}) => {
      return (
        <PackingItems onPress={onNavigatePackingOrderHistory} data={item} />
      );
    },
    [onNavigatePackingOrderHistory],
  );

  return (
    <View style={styles.root}>
      <FlatList
        data={list}
        renderItem={renderItemHandler}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparatorComponent}
        keyExtractor={(_, index: number): string => index?.toString()}
        ListEmptyComponent={
          <EmptyList loader={loader} message="Not have any completed Orders!" />
        }
      />
    </View>
  );
};

export default memo(PackingPendingOrders);

const styles = StyleSheet.create({
  root: {flex: 1, paddingTop: 4},
  list: {
    flexGrow: 1,
    padding: 25,
    paddingBottom: 200,
  },
  itemSeparator: {
    height: 20,
  },
});
