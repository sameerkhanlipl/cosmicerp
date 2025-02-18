import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {extruder_complete_orders} from '../../api/apis';
import {extruder_order_listing_response} from '../../api/ResponseTypes';
import EmptyList from '../../components/styles/EmptyList';
import {AppNavigationProp} from '../../stacks/StackTypes';
import {error} from '../../utils/ErrorHandler';
import {colors} from '../../constants/colors';
import ExtrudersItems, {ExtrudersItemType} from './ExtrudersItems';

const ItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

const ExtruderCompleteOrders = () => {
  const [list, setList] = useState<ExtrudersItemType[]>([]);
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const {navigate} = useNavigation<AppNavigationProp>();

  const focus = useIsFocused();

  const getList = useCallback(async () => {
    try {
      setLoader(true);
      const response: {data: extruder_order_listing_response} =
        await extruder_complete_orders();
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
      const response: {data: extruder_order_listing_response} =
        await extruder_complete_orders();
      setList(response?.data?.data);
      setRefresh(false);
    } catch (err: any) {
      error(err);
      setRefresh(false);
    } finally {
      setRefresh(false);
    }
  }, []);

  // const onNavigateExtruderOrderHistory = useCallback(
  //   (data: ExtrudersItemType) => {
  //     navigate('ExtruderOrderHistory', {data: data});
  //   },
  //   [navigate],
  // );


    const onNavigateExtruderOrderHistory = useCallback(
      (data: ExtrudersItemType) => {
        navigate('ExtruderAddCompletedOrder', {data: data});
      },
      [navigate],
    );

  const renderItemHandler = useCallback(
    ({item}: {item: ExtrudersItemType}) => {
      return (
        <ExtrudersItems onPress={onNavigateExtruderOrderHistory} data={item} />
      );
    },
    [onNavigateExtruderOrderHistory],
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

export default memo(ExtruderCompleteOrders);

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
