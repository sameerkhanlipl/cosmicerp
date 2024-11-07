import React, {memo, useCallback, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import LaminationItems, {LaminationItemType} from './LaminationItems';

const ItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

const LaminationPendingOrders = () => {
  const [list] = useState<LaminationItemType[]>([
    {
      extruder_production_order_id: 4,
      customer_id: '68',
      customer_order_id: 48,
      order_id: '47-23Oct',
      product_name: 'S. ANDHRA PEARL 26*42 1200',
      date: '2024-10-23 14:12:22',
      gage: '0',
      color: 'Pink',
      production_order_id: 20,
      production_qty: '1',
      pending_bundle_qty: 100,
      lamination_id: '',
      alias_sku: '40226*42 1200',
      length: '42.00',
      width: '26.00',
      bags_per_bdl: '12',
      material_name: null,
      pipe_size: '',
      machine: '',
      status: 'pending',
      total_order_qty: '200',
    },
    {
      extruder_production_order_id: 6,
      customer_id: '70',
      customer_order_id: 50,
      order_id: '49-23Oct',
      product_name: 'S. ANDHRA PEARL 26*42 1200',
      date: '2024-10-23 14:22:56',
      gage: '0',
      color: 'yellow',
      production_order_id: 22,
      production_qty: '100',
      pending_bundle_qty: 100,
      lamination_id: '',
      alias_sku: '40226*42 1200',
      length: '42.00',
      width: '26.00',
      bags_per_bdl: '12',
      material_name: null,
      pipe_size: '',
      machine: '',
      status: 'pending',
      total_order_qty: '200',
    },
    {
      extruder_production_order_id: 5,
      customer_id: '69',
      customer_order_id: 49,
      order_id: '48-23Oct',
      product_name: "SYN. COSMIC GOLD+ TRANSPARENT 14'' 3MTR-432",
      date: '2024-10-23 14:21:09',
      gage: '100',
      color: 'Orange',
      production_order_id: 21,
      production_qty: '325',
      pending_bundle_qty: 800,
      lamination_id: '',
      alias_sku: 'GOLDPLUSTRAN3',
      length: '7.30',
      width: '14.00',
      bags_per_bdl: '25',
      material_name: null,
      pipe_size: '550',
      machine: '',
      status: 'pending',
      total_order_qty: '1125',
    },
  ]);

  const renderItemHandler = useCallback(
    ({item}: {item: LaminationItemType}) => {
      return <LaminationItems data={item} />;
    },
    [],
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
      />
    </View>
  );
};

export default memo(LaminationPendingOrders);

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
