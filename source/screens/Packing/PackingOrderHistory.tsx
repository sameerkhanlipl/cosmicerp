import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {packing_order_history_body} from '../../api/BodyTypes';
import {packing_order_history_listing_response} from '../../api/ResponseTypes';
import {packing_order_history} from '../../api/apis';
import CommonHeader from '../../components/styles/CommonHeader';
import {AppNavigationProp, AppStackParamList} from '../../stacks/StackTypes';
import PackingItems, {PackingItemType} from './PackingItems';
import PackingOrderHistoryItems, {
  PackingOrderHistoryItemType,
} from './PackingOrderHistoryItems';
import {error} from '../../utils/ErrorHandler';
import EmptyList from '../../components/styles/EmptyList';
import {colors} from '../../constants/colors';

const ItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

type PackingOrderHistoryRouteProps = RouteProp<
  AppStackParamList,
  'PackingOrderHistory'
>;

const PackingOrderHistory = () => {
  const {navigate} = useNavigation<AppNavigationProp>();

  const route = useRoute<PackingOrderHistoryRouteProps>();

  const [list, setList] = useState<PackingOrderHistoryItemType[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  const ItemData = route?.params?.data;

  const getList = useCallback(async () => {
    const body: packing_order_history_body = {
      packing_production_order_id: ItemData?.packing_production_order_id,
    };

    try {
      setLoader(true);
      const response: {data: packing_order_history_listing_response} =
        await packing_order_history(body);
      setList(response?.data?.data);
      setLoader(false);
    } catch (err: any) {
      setLoader(false);
      error(err);
    } finally {
      setLoader(false);
    }
  }, [ItemData, setLoader]);

  useEffect(() => {
    getList();
  }, [getList]);

  const refreshList = useCallback(async () => {
    const body: packing_order_history_body = {
      packing_production_order_id: ItemData?.packing_production_order_id,
    };

    try {
      setRefresh(true);
      const response: {data: packing_order_history_listing_response} =
        await packing_order_history(body);
      setList(response?.data?.data);
      setLoader(false);
    } catch (err: any) {
      setRefresh(false);
      error(err);
    } finally {
      setRefresh(false);
    }
  }, [ItemData, setRefresh]);

  const onNavigatePackingAddCompletedOrder = useCallback(
    (data: PackingItemType) => {
      navigate('PackingAddCompletedOrder', {data: data});
    },
    [navigate],
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
        ListHeaderComponent={
          <>
            <PackingItems
              onPress={onNavigatePackingAddCompletedOrder}
              data={ItemData}
            />
            <ItemSeparatorComponent />
          </>
        }
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListEmptyComponent={
          <EmptyList
            loader={loader}
            message="Not have any history of this order!"
          />
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

export default memo(PackingOrderHistory);

const styles = StyleSheet.create({
  root: {flex: 1},
  list: {flexGrow: 1, padding: 25, paddingBottom: 200},
  itemSeparator: {height: 20},
});
