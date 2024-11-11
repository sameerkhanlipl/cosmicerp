import React, {memo, useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {lamination_pending_orders} from '../../api/apis';
import {lamination_order_listing_response} from '../../api/ResponseTypes';
import EmptyList from '../../components/styles/EmptyList';
import {error} from '../../utils/ErrorHandler';
import LaminationItems, {LaminationItemType} from './LaminationItems';
import {useNavigation} from '@react-navigation/native';
import {AppNavigationProp} from '../../stacks/StackTypes';

const ItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

const LaminationPendingOrders = () => {
  const [list, setList] = useState<LaminationItemType[]>([]);
  const [loader, setLoader] = useState(false);

  const {navigate} = useNavigation<AppNavigationProp>();

  const getList = useCallback(async () => {
    try {
      setLoader(true);
      const response: {data: lamination_order_listing_response} =
        await lamination_pending_orders();
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

  const onNavigateLaminationOrderHistory = useCallback(
    (data: LaminationItemType) => {
      navigate('LaminationOrderHistory', {data: data});
    },
    [navigate],
  );

  const renderItemHandler = useCallback(
    ({item}: {item: LaminationItemType}) => {
      return (
        <LaminationItems
          onPress={onNavigateLaminationOrderHistory}
          data={item}
        />
      );
    },
    [onNavigateLaminationOrderHistory],
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
          <EmptyList loader={loader} message="Not have any pending Orders!" />
        }
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
