import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import CommonHeader from '../../components/styles/CommonHeader';
import {AppNavigationProp, AppStackParamList} from '../../stacks/StackTypes';
import LaminationItems, {LaminationItemType} from './LaminationItems';
import LaminationOrderHistoryItems, {
  LaminationOrderHistoryItemType,
} from './LaminationOrderHistoryItems';
import {lamination_order_history} from '../../api/apis';
import {lamination_order_history_body} from '../../api/BodyTypes';
import {error} from '../../utils/ErrorHandler';
import EmptyList from '../../components/styles/EmptyList';
import {colors} from '../../constants/colors';
import {lamination_order_history_listing_response} from '../../api/ResponseTypes';

const ItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

type LaminationOrderHistoryRouteProps = RouteProp<
  AppStackParamList,
  'LaminationOrderHistory'
>;

const LaminationOrderHistory = () => {
  const {navigate} = useNavigation<AppNavigationProp>();

  const route = useRoute<LaminationOrderHistoryRouteProps>();

  const [list, setList] = useState<LaminationOrderHistoryItemType[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  const ItemData = route?.params?.data;

  const getList = useCallback(async () => {
    const body: lamination_order_history_body = {
      lamination_production_order_id: ItemData?.production_order_id,
    };

    try {
      setLoader(true);
      const response: {data: lamination_order_history_listing_response} =
        await lamination_order_history(body);
      setList(response?.data?.data);
      setLoader(false);
    } catch (err: any) {
      console.log('err?.data', err?.data);
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
    const body: lamination_order_history_body = {
      lamination_production_order_id: ItemData?.production_order_id,
    };

    try {
      setRefresh(true);
      const response: {data: lamination_order_history_listing_response} =
        await lamination_order_history(body);
      setList(response?.data?.data);
      setRefresh(false);
    } catch (err: any) {
      setRefresh(false);
      error(err);
    } finally {
      setRefresh(false);
    }
  }, [ItemData, setRefresh]);

  const onNavigateLaminationAddCompletedOrder = useCallback(
    (data: LaminationItemType) => {
      navigate('LaminationAddCompletedOrder', {data: data});
    },
    [navigate],
  );

  const renderItemHandler = useCallback(
    ({item}: {item: LaminationOrderHistoryItemType}) => {
      return <LaminationOrderHistoryItems data={item} />;
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
            <LaminationItems
              onPress={onNavigateLaminationAddCompletedOrder}
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

export default memo(LaminationOrderHistory);

const styles = StyleSheet.create({
  root: {flex: 1},
  list: {flexGrow: 1, padding: 25, paddingBottom: 200},
  itemSeparator: {height: 20},
});
