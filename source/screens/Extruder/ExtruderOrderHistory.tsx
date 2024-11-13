import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {extruder_order_history} from '../../api/apis';
import {extruder_order_history_body} from '../../api/BodyTypes';
import {extruder_order_history_listing_response} from '../../api/ResponseTypes';
import CommonHeader from '../../components/styles/CommonHeader';
import EmptyList from '../../components/styles/EmptyList';
import {colors} from '../../constants/colors';
import {AppNavigationProp, AppStackParamList} from '../../stacks/StackTypes';
import {error} from '../../utils/ErrorHandler';
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

  const [list, setList] = useState<ExtruderOrderHistoryItemType[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  const ItemData = route?.params?.data;

  const getList = useCallback(async () => {
    const body: extruder_order_history_body = {
      extruder_production_order_id: ItemData?.extruder_production_order_id,
    };

    console.log('body', body);

    try {
      setLoader(true);
      const response: {data: extruder_order_history_listing_response} =
        await extruder_order_history(body);
      console.log('response?.data data', response?.data);
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
    const body: extruder_order_history_body = {
      extruder_production_order_id: ItemData?.extruder_production_order_id,
    };

    try {
      setRefresh(true);
      const response: {data: extruder_order_history_listing_response} =
        await extruder_order_history(body);
      setList(response?.data?.data);
      setRefresh(false);
    } catch (err: any) {
      setRefresh(false);
      error(err);
    } finally {
      setRefresh(false);
    }
  }, [ItemData, setRefresh]);

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

export default memo(ExtruderOrderHistory);

const styles = StyleSheet.create({
  root: {flex: 1},
  list: {flexGrow: 1, padding: 25, paddingBottom: 200},
  itemSeparator: {height: 20},
});
