import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import CommonHeader from '../../components/styles/CommonHeader';
import {AppNavigationProp, AppStackParamList} from '../../stacks/StackTypes';
import RewindingItems, {RewindingItemType} from './RewindingItems';
import RewindingOrderHistoryItems, {
  RewindingOrderHistoryItemType,
} from './RewindingOrderHistoryItems';
import {error} from '../../utils/ErrorHandler';
import {rewinding_order_history_body} from '../../api/BodyTypes';
import {rewinding_order_history} from '../../api/apis';
import EmptyList from '../../components/styles/EmptyList';
import {colors} from '../../constants/colors';
import {rewinding_order_history_listing_response} from '../../api/ResponseTypes';

const ItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

type RewindingOrderHistoryRouteProps = RouteProp<
  AppStackParamList,
  'RewindingOrderHistory'
>;

const RewindingOrderHistory = () => {
  const {navigate} = useNavigation<AppNavigationProp>();

  const route = useRoute<RewindingOrderHistoryRouteProps>();

  const [list, setList] = useState<RewindingOrderHistoryItemType[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  const ItemData = route?.params?.data;

  const focus = useIsFocused();

  const getList = useCallback(async () => {
    const body: rewinding_order_history_body = {
      rewinding_production_order_id: ItemData?.rewinding_production_order_id,
    };

    try {
      setLoader(true);
      const response: {data: rewinding_order_history_listing_response} =
        await rewinding_order_history(body);
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
    if (focus) {
      getList();
    }
  }, [getList, focus]);

  const refreshList = useCallback(async () => {
    const body: rewinding_order_history_body = {
      rewinding_production_order_id: ItemData?.rewinding_production_order_id,
    };

    try {
      setRefresh(true);
      const response: {data: rewinding_order_history_listing_response} =
        await rewinding_order_history(body);
      setList(response?.data?.data);
      setRefresh(false);
    } catch (err: any) {
      setRefresh(false);
      error(err);
    } finally {
      setRefresh(false);
    }
  }, [ItemData, setRefresh]);

  const onNavigateRewindingAddCompletedOrder = useCallback(
    (data: RewindingItemType) => {
      navigate('RewindingAddCompletedOrder', {data: data});
    },
    [navigate],
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
        ListHeaderComponent={
          <>
            <RewindingItems
              onPress={onNavigateRewindingAddCompletedOrder}
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

export default memo(RewindingOrderHistory);

const styles = StyleSheet.create({
  root: {flex: 1},
  list: {flexGrow: 1, padding: 25, paddingBottom: 200},
  itemSeparator: {height: 20},
});
