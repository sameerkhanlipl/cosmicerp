import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View, Image } from "react-native";
import { extruder_search_orders } from "../../api/apis";
import { exruder_search_order_body } from "../../api/BodyTypes";
import { extruder_search_order_listing_response } from "../../api/ResponseTypes";
import { images } from "../../assets/images";
import CommonHeader from "../../components/styles/CommonHeader";
import EmptyList from "../../components/styles/EmptyList";
import { AppNavigationProp } from "../../stacks/StackTypes";
import { error, ShowToast } from "../../utils/ErrorHandler";
import ExtruderSearchOrderItem, {
  ExtruderSearchOrderItemType
} from "./ExtruderSearchOrderItem";

import Input, { InputRef } from "../../components/styles/Input";

const ItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

const ExtruderSearchOrders = () => {
  const [list, setList] = useState<ExtruderSearchOrderItemType[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  //  const [search, setSearch] = useState<string>("18Dec24-01");
  const search = useRef<InputRef>(null);
  const { navigate } = useNavigation<AppNavigationProp>();
  const focus = useIsFocused();
  const getList = useCallback(async () => {
    if (!search?.current?.get()) {
      ShowToast("Please Enter Order Id");
      return;
    }
    try {
      setLoader(true);
      const body: exruder_search_order_body = {
        search: search?.current?.get()
      };
      const response: { data: extruder_search_order_listing_response } =
        await extruder_search_orders(body);
      setList(response?.data);
      setLoader(false);
    } catch (err: any) {
      console.log("ele?.data", err?.data);
      error(err);
      setLoader(false);
    } finally {
      setLoader(false);
    }
  }, [search]);

  const onNavigateExtruderOrderHistory = useCallback(
    (data: ExtruderSearchOrderItemType) => {
      navigate("ExtruderAddCompletedOrder", { data: data });
    },
    [navigate]
  );

  const renderItemHandler = useCallback(
    ({ item }: { item: ExtruderSearchOrderItemType }) => {
      return (
        <ExtruderSearchOrderItem
          onPress={onNavigateExtruderOrderHistory}
          data={item}
        />
      );
    },
    [onNavigateExtruderOrderHistory]
  );

  const onChangeHandle = async (value: any) => {
    if (value === "" || value === null || value === undefined) {
      setList([]);
    }
  };

  return (
    <View style={styles.root}>
      <CommonHeader title={"Search Order Of Extruder"} icon={images.close} />
      <Input
        ref={search}
        label=""
        config={{
          // maxLength: 10,
          keyboardType: "default",
          placeholder: "Enter Your Order Id"
        }}
        rootStyle={{ marginHorizontal: 10, marginVertical: 10 }}
        rightIcon={images.search}
        rightIconStyle={{ height: 25, width: 25 }}
        rightIconPress={() => getList()}
        onReturn={() => getList()}
        onChangHandler={(value: any) => onChangeHandle(value)}
      />
      <FlatList
        data={list}
        renderItem={renderItemHandler}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparatorComponent}
        keyExtractor={(_, index: number): string => index?.toString()}
        ListEmptyComponent={
          search?.current?.get() ? (
            <EmptyList loader={loader} message="Not have any Orders!" />
          ) : (
            <EmptyList loader={loader} message="Search to get Orders!" />
          )
        }
      />
    </View>
  );
};

export default ExtruderSearchOrders;

const styles = StyleSheet.create({
  root: { flex: 1, paddingTop: 4 },
  list: {
    flexGrow: 1,
    padding: 25,
    paddingBottom: 200
  },
  itemSeparator: {
    height: 20
  }
});
