import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {rewinding_complete_orders} from '../../api/apis';
import {rewinding_order_listing_response} from '../../api/ResponseTypes';
import EmptyList from '../../components/styles/EmptyList';
import {AppNavigationProp} from '../../stacks/StackTypes';
import {error} from '../../utils/ErrorHandler';
import {colors} from '../../constants/colors';
import RewindingItems, {RewindingItemType} from './RewindingItems';

const ItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

const RewindingCompleteOrders = () => {
  const [list, setList] = useState<RewindingItemType[]>([]);
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const {navigate} = useNavigation<AppNavigationProp>();

  const focus = useIsFocused();

  const getList = useCallback(async () => {
    try {
      setLoader(true);
      const response: {data: rewinding_order_listing_response} =
        await rewinding_complete_orders();
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
    if (focus) {
      getList();
    }
  }, [getList, focus]);

  const refreshList = useCallback(async () => {
    try {
      setRefresh(true);
      const response: {data: rewinding_order_listing_response} =
        await rewinding_complete_orders();
      setList(response?.data?.data);
     
      setRefresh(false);
    } catch (err: any) {
      error(err);
      setRefresh(false);
    } finally {
      setRefresh(false);
    }
  }, []);

  // const onNavigateRewindingOrderHistory = useCallback(
  //   (data: RewindingItemType) => {
  //     navigate('RewindingOrderHistory', {data: data});
  //   },
  //   [navigate],
  // );


  const onNavigateRewindingOrderHistory = useCallback(
    (data: RewindingItemType) => {
      navigate('RewindingAddCompletedOrder', {data: data});
    },
    [navigate],
  );

  const renderItemHandler = useCallback(
    ({item}: {item: RewindingItemType}) => {
      return (
        <RewindingItems onPress={onNavigateRewindingOrderHistory} data={item} />
      );
    },
    [onNavigateRewindingOrderHistory],
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
        refreshControl={
          <RefreshControl
            tintColor={colors.color_22534F}
            refreshing={refresh}
            onRefresh={refreshList}
          />
        }
      />
    </View>
  );
};

export default memo(RewindingCompleteOrders);

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
