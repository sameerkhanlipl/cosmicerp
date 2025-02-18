import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View, Image, ViewBase } from "react-native";
import { rewinding_search_orders } from "../../api/apis";
import { rewinding_search_order_body } from "../../api/BodyTypes";
import { rewinding_search_order_listing_response } from "../../api/ResponseTypes";
import { images } from "../../assets/images";
import CommonHeader from "../../components/styles/CommonHeader";
import EmptyList from "../../components/styles/EmptyList";
import { AppNavigationProp } from "../../stacks/StackTypes";
import { error, ShowToast } from "../../utils/ErrorHandler";
import RewindingSearchOrderItem, {
  RewindingSearchOrderItemType
} from "./RewindingSearchOrderItem";
;
import Input, { InputRef } from "../../components/styles/Input";

const ItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

const RewindingSearchOrders = () => {
  const [list, setList] = useState<RewindingSearchOrderItemType[]>([]);
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
      const body: rewinding_search_order_body = {
        search: search?.current?.get()
      };
      const response: { data: rewinding_search_order_listing_response } =
        await rewinding_search_orders(body);
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



  const onNavigateRewindingOrderHistory = useCallback(
    (data: RewindingSearchOrderItemType) => {

       navigate("RewindingAddCompletedOrder", { data: data });
    },
    [navigate]
  );

  const renderItemHandler = useCallback(
    ({ item }: { item: RewindingSearchOrderItemType }) => {
      return (
        <RewindingSearchOrderItem
          onPress={onNavigateRewindingOrderHistory}
          data={item}
        />
      );
    },
    [onNavigateRewindingOrderHistory]
  );

  const onChangeHandle = async (value: any) => {
    console.log("type", value)
    if (value === "" || value === null || value === undefined) {
      setList([]);
    }
  }


  return (
    <View style={styles.root}>
      <CommonHeader title={"Search Order Of Rewinding"} icon={images.close} />
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

export default RewindingSearchOrders;

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
