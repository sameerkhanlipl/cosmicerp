import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import CommonHeader from '../../components/styles/CommonHeader';
import {AppNavigationProp, AppStackParamList} from '../../stacks/StackTypes';
import StitchingItems, {StitchingItemType} from './StitchingItems';
import StitchingOrderHistoryItems, {
  StitchingOrderHistoryItemType,
} from './StitchingOrderHistoryItems';
import {stitching_order_history_body} from '../../api/BodyTypes';
import {stitching_order_history_listing_response} from '../../api/ResponseTypes';
import {stitching_order_history} from '../../api/apis';
import {error} from '../../utils/ErrorHandler';
import EmptyList from '../../components/styles/EmptyList';
import {colors} from '../../constants/colors';

const ItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

type StitchingOrderHistoryRouteProps = RouteProp<
  AppStackParamList,
  'StitchingOrderHistory'
>;

const StitchingOrderHistory = () => {
  const {navigate} = useNavigation<AppNavigationProp>();

  const route = useRoute<StitchingOrderHistoryRouteProps>();

  const [list, setList] = useState<StitchingOrderHistoryItemType[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  const ItemData = route?.params?.data;

  const getList = useCallback(async () => {
    const body: stitching_order_history_body = {
      order_id: ItemData?.order_id,
    };

    try {
      setLoader(true);
      const response: {data: stitching_order_history_listing_response} =
        await stitching_order_history(body);
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
    const body: stitching_order_history_body = {
      order_id: ItemData?.order_id,
    };

    try {
      setRefresh(true);
      const response: {data: stitching_order_history_listing_response} =
        await stitching_order_history(body);
      setList(response?.data?.data);
      setRefresh(false);
    } catch (err: any) {
      setRefresh(false);
      error(err);
    } finally {
      setRefresh(false);
    }
  }, [ItemData, setRefresh]);

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

export default memo(StitchingOrderHistory);

const styles = StyleSheet.create({
  root: {flex: 1},
  list: {flexGrow: 1, padding: 25, paddingBottom: 200},
  itemSeparator: {height: 20},
});
