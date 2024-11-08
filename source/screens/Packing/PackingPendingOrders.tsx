import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {AppNavigationProp} from '../../stacks/StackTypes';
import PackingItems, {PackingItemType} from './PackingItems';

const ItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

const PackingPendingOrders = () => {
  const [list] = useState<PackingItemType[]>([
    {
      packing_production_order_id: 2,
      customer_id: '85',
      customer_order_id: 56,
      order_id: 'COS-55',
      product_name: 'Jumbo White Easel Drawing Paper Roll (44cm x 50meter)',
      date: '2024-11-05 11:41:45',
      color: 'Orange',
      length: '50',
      width: '1970',
      pipe_size: '0',
      packing_name: 'HMD',
      total_order_qty: '2583',
      bags_per_bdl: '12',
      gage: '0',
      pending_bundle_qty: '120',
      production_order_id: 25,
      production_qty: 21,
      stitching_id: '2',
      alias_sku: 'B08D24YTPS',
      material_name: null,
      status: 'completed',
    },
  ]);

  const {navigate} = useNavigation<AppNavigationProp>();

  const onNavigatePackingOrderHistory = useCallback((data: PackingItemType) => {
    navigate('PackingOrderHistory', {data: data});
  }, []);

  const renderItemHandler = useCallback(({item}: {item: PackingItemType}) => {
    return <PackingItems onPress={onNavigatePackingOrderHistory} data={item} />;
  }, []);

  return (
    <View style={styles.root}>
      <FlatList
        data={list}
        renderItem={renderItemHandler}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparatorComponent}
        keyExtractor={(_, index: number): string => index?.toString()}
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
