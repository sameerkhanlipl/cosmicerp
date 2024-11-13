import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {stitching_order_listing_response} from '../../api/ResponseTypes';
import {stitching_complete_orders} from '../../api/apis';
import EmptyList from '../../components/styles/EmptyList';
import {AppNavigationProp} from '../../stacks/StackTypes';
import {error} from '../../utils/ErrorHandler';
import {colors} from '../../constants/colors';
import StitchingItems, {StitchingItemType} from './StitchingItems';

const ItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

const StitchingCompleteOrders = () => {
  const [list, setList] = useState<StitchingItemType[]>([]);
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const {navigate} = useNavigation<AppNavigationProp>();

  const getList = useCallback(async () => {
    try {
      setLoader(true);
      const response: {data: stitching_order_listing_response} =
        await stitching_complete_orders();
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

  const refreshList = useCallback(async () => {
    try {
      setRefresh(true);
      const response: {data: stitching_order_listing_response} =
        await stitching_complete_orders();
      setList(response?.data?.data);
      setRefresh(false);
    } catch (err: any) {
      error(err);
      setRefresh(false);
    } finally {
      setRefresh(false);
    }
  }, []);

  const onNavigateStitchingOrderHistory = useCallback(
    (data: StitchingItemType) => {
      navigate('StitchingOrderHistory', {data: data});
    },
    [navigate],
  );

  const renderItemHandler = useCallback(
    ({item}: {item: StitchingItemType}) => {
      return (
        <StitchingItems onPress={onNavigateStitchingOrderHistory} data={item} />
      );
    },
    [onNavigateStitchingOrderHistory],
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

export default memo(StitchingCompleteOrders);

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
