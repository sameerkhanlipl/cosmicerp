import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import moment from "moment";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  Alert,
  TouchableOpacity
} from "react-native";
import {
  rewinding_delete_order_body,
  rewinding_order_history_body,
  rewinding_set_make_order_complete_body,
  rewinding_set_order_complete_body
} from "../../api/BodyTypes";
import {
  rewinding_complete_orders_response,
  rewinding_delete_orders_response,
  rewinding_make_complete_orders_response,
  rewinding_order_history_listing_response
} from "../../api/ResponseTypes";
import {
  rewinding_delete_order,
  rewinding_order_history,
  rewinding_set_make_order_complete,
  rewinding_set_order_complete
} from "../../api/apis";
import { images } from "../../assets/images";
import { Font400, Font500, Font700 } from "../../components/fonts/Fonts";
import Button from "../../components/styles/Button";
import CommonHeader from "../../components/styles/CommonHeader";
import Input, { InputRef } from "../../components/styles/Input";
import { colors } from "../../constants/colors";
import { fontFamily } from "../../constants/fontFamily";
import { AppNavigationProp, AppStackParamList } from "../../stacks/StackTypes";
import { checkInput } from "../../utils/CheckInput";
import { error, ShowToast } from "../../utils/ErrorHandler";
import EmptyList from "../../components/styles/EmptyList";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

import RewindingOrderHistoryItems, {
  RewindingOrderHistoryItemType
} from "./RewindingOrderHistoryItems";
import DatePickerModel, { DatePickerModelRef } from "../../components/model/DatePickerModel";

type RewindingAddCompletedOrderRouteProp = RouteProp<
  AppStackParamList,
  "RewindingAddCompletedOrder"
>;

const RewindingAddCompletedOrder = () => {
  const { goBack } = useNavigation<AppNavigationProp>();

  const route = useRoute<RewindingAddCompletedOrderRouteProp>();

  const ItemData = route?.params?.data;

  const [loader, setLoader] = useState(false);
  const [completedqty, setCompletedQty] = useState<any>("");
  const [remaningqty, setRemanigQty] = useState<any>("");

  const contractor = useRef<InputRef>(null);
  //const date = useRef<InputRef>(null);
  const rolls = useRef<InputRef>(null);
  const remark = useRef<InputRef>(null);

  const onCompleteOrderHandler = useCallback(async () => {
    if (
      checkInput(
        contractor?.current?.get(),
        "Contractor Require for complete order"
      )
    ) {
      return;
    }

    if (checkInput(rolls?.current?.get(), "Rolls Require for complete order")) {
      return;
    }

    if (
      checkInput(remark?.current?.get(), "Remark Require for complete order")
    ) {
      return;
    }
    const new_date = datePickerRef.current?.value()
    const final_date = moment(new_date).format('DD-MM-YYYY')
    const body: rewinding_set_order_complete_body = {
      rewinding_production_order_id: ItemData?.rewinding_production_order_id,
      contractor: contractor?.current?.get(),
      // date: date?.current?.get(),
      date: final_date,

      rolls: rolls?.current?.get(),
      remark: remark?.current?.get()
    };

    try {
      setLoader(true);
      const response: { data: rewinding_complete_orders_response } =
        await rewinding_set_order_complete(body);
 
      contractor?.current?.set("");
      rolls?.current?.set("");
      remark?.current?.set("");
      await getList();
      ShowToast(response?.data?.message);
      if (response?.data?.data?.status === "completed") {
        goBack();
      }
      // goBack();
      setLoader(false);
    } catch (err) {
      setLoader(false);
      error(err);
    } finally {
      setLoader(false);
    }
  }, [ItemData, goBack]);



  const showAlertAndCallFunction = (status: string, id: any) => {
    const showConfirmationAlert = (message: string, onConfirm: () => void) => {
      Alert.alert(
        'Confirmation',
        message,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Action cancelled'),
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: onConfirm,
          },
        ],
        { cancelable: false }
      );
    };

    switch (status) {
      case 'Save':
        if (checkInput(contractor?.current?.get(), "Contractor Require for complete order") ||
          checkInput(rolls?.current?.get(), "Rolls Require for complete order") ||
          checkInput(remark?.current?.get(), "Remark Require for complete order")
        ) {
          return;
        }
        showConfirmationAlert('Are you sure you want to save?', onCompleteOrderHandler);
        break;

      case 'Comp':
        if (remaningqty === completedqty) {
          ShowToast("Order Require for make it complete");
          return;
        }
        showConfirmationAlert('Are you sure you want to make it complete?', onMakeCompleteOrderHandler);
        break;

      case 'Delete':
        showConfirmationAlert('Are you sure you want to delete?', () => onDeleteOrderHandler(id));
        break;

      default:
        console.warn(`Unknown status: ${status}`);
        break;
    }
  };


  const onMakeCompleteOrderHandler = async () => {
    if (remaningqty == completedqty) {
      ShowToast("Order Require for make it complete")
      return;
    }

    const body: rewinding_set_make_order_complete_body = {
      rewinding_production_order_id: ItemData?.rewinding_production_order_id,
    };
    console.log("body : ", body);
    try {
      setLoader(true);
      const response: { data: rewinding_make_complete_orders_response } =
        await rewinding_set_make_order_complete(body);
      ShowToast(response?.data?.message);
      setLoader(false);
      if (response?.data?.data?.status === "completed") {
        goBack();
      }
    } catch (err) {
      setLoader(false);
      error(err);
    } finally {
      setLoader(false);
    }
  }

  const [list, setList] = useState<RewindingOrderHistoryItemType[]>([]);

  const [refresh, setRefresh] = useState<boolean>(false);

  const focus = useIsFocused();

  const getList = useCallback(async () => {
    const body: rewinding_order_history_body = {
      rewinding_production_order_id: ItemData?.rewinding_production_order_id
    };

    try {
      setLoader(true);
      const response: { data: rewinding_order_history_listing_response } =
        await rewinding_order_history(body);
      // console.log("rewinding_list",response?.data?.data)
      setList(response?.data?.data);
      setCompletedQty(response?.data?.required_qty);
      setRemanigQty(response?.data?.remaining);
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
      rewinding_production_order_id: ItemData?.rewinding_production_order_id
    };

    try {
      setRefresh(true);
      const response: { data: rewinding_order_history_listing_response } =
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

  const onDeleteOrderHandler = async (id: any) => {

    const body: rewinding_delete_order_body = {
      id: id,
    };
    console.log("body : ", body);
    try {
      setLoader(true);
      const response: { data: rewinding_delete_orders_response } =
        await rewinding_delete_order(body);
      getList();
      ShowToast(response?.data?.message);
      setLoader(false);

    } catch (err) {
      setLoader(false);
      error(err);
    } finally {
      setLoader(false);
    }
  }

  const renderItemHandler = useCallback(
    ({ item }: { item: RewindingOrderHistoryItemType }) => {
      return (
        <RewindingOrderHistoryItems
          data={item}
          onDelete={() => showAlertAndCallFunction("Delete", item.id)}
          status={ItemData?.status}
        />
      );
    },
    [onDeleteOrderHandler]
  );



  const datePickerRef = useRef<DatePickerModelRef>(null);
  const [date, setDate] = useState(moment().format('DD-MM-YYYY'));

  const handleConfirm = async () => {
    const selectedDate = datePickerRef.current?.value();
    if (selectedDate) {
      setDate(moment(selectedDate).format('DD-MM-YYYY'));
    }
    datePickerRef.current?.close();
  };

  const handleClose = async () => {
    const current_date = new Date
    setDate(moment(current_date).format('DD-MM-YYYY'));
  };

  const openDatePicker = () => {
    datePickerRef.current?.open(new Date());
  };


  const ItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

  return (
    <View style={styles.root}>
      <CommonHeader title="Rewinding Orders" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollRoot}
      >
        <View style={styles.container}>
          <Font500 style={styles.orderId}>{ItemData.order_id}</Font500>
          {ItemData?.rewinding_internal_notes &&
            <View style={styles.detail}>
              <View style={styles.remarkContainer}>
                <Font500 style={styles.label}>{"Remark : "}</Font500>
                <Font700 style={styles.value}>
                  {ItemData?.rewinding_internal_notes}
                </Font700>
              </View>
            </View>
          }
          <View style={styles.detail}>
          <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Alias : "}</Font500>
                <Font700 style={styles.value}>{ItemData?.alias_sku}</Font700>
              </View>
            
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Gauge : "}</Font500>
                <Font700 style={styles.value}>{ItemData?.gage}</Font700>
              </View>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Size : "}</Font500>
                <Font700 style={styles.value}>{ItemData?.width + '"'}</Font700>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
            <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Length : "}</Font500>
                <Font700 style={styles.value}>
                  {" "}
                  {ItemData?.length + " M"}{" "}
                </Font700>
              </View>
        
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Colors : "}</Font500>
                <Font700 style={styles.value}>{ItemData?.color}</Font700>
              </View>
           
             
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Pipe : "}</Font500>
                <Font700 style={[styles.value,{width:wp("60%")}]}>
                  {ItemData?.rewinding_pipe + "MM"}
                </Font700>
              </View>
           
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
           
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Sticker : "}</Font500>
                <Font700 style={[styles.value,{width:wp("60%")}]}>
                  {ItemData?.rewinding_sticker_name}
                </Font700>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
             
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Number of Rolls : "}</Font500>
                <Font700 style={styles.value}>
                  {ItemData?.rewinding_qty_in_rolls + " "}
                </Font700>
              </View>
            </View>
          </View>
          {ItemData?.status === "pending" && (
            <View>
              <Input
                ref={contractor}
                config={{ placeholder: "Contractor" }}
                rootStyle={styles.inputContainer}
                label="Contractor"
              />
              {/* <Input
                ref={date}
                default_value={moment().format("DD-MM-YYYY")}
                rootStyle={styles.inputContainer}
                label="Date (DD-MM-YYYY)"
                config={{ editable: false }}
              /> */}

              <Font500 style={styles.datelabel}>Date (DD-MM-YYYY)</Font500>
              <TouchableOpacity style={styles.dateContainer} onPress={openDatePicker}>
                <Font400 style={styles.dateText}>{date}</Font400>
              </TouchableOpacity>
              {/* DatePickerModel component */}
              <DatePickerModel
                ref={datePickerRef}
                onConfirm={handleConfirm}
                onClose={handleClose}
              />
              <Input
                ref={rolls}
                keyboardType="number-pad"
                config={{ placeholder: "2" }}
                rootStyle={styles.inputContainer}
                label="Rolls"
              />
              <Input
                ref={remark}
                config={{ placeholder: "Remarks", keyboardType: "default" }}
                rootStyle={styles.inputContainer}
                label="Remarks"
              />
            </View>
          )}
        </View>
        <View style={styles.container}>
          <Font500 style={styles.orderHistory}>{"Order History #"}</Font500>
          <View style={{ marginVertical: 10 }}>
            <View style={styles.line} />
            <View style={styles.detailContainerOrder}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Total : "}</Font500>
                <Font700 style={[styles.value, { width: wp("45%") }]}>
                  {completedqty}
                </Font700>
              </View>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Remaining : "}</Font500>
                <Font700 style={[styles.value, { width: wp("45%") }]}>
                  {remaningqty}
                </Font700>
              </View>
            </View>
            <View style={styles.line} />
          </View>
          <FlatList
            data={list}
            renderItem={renderItemHandler}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index: number) => index?.toString()}
            // ListHeaderComponent={
            //   <>
            //     <RewindingItems
            //       onPress={onNavigateRewindingAddCompletedOrder}
            //       data={ItemData}
            //     />
            //     <ItemSeparatorComponent />
            //   </>
            // }
            ItemSeparatorComponent={ItemSeparatorComponent}
            ListEmptyComponent={
              <EmptyList
                loader={loader}
                message="Not have any history of this order!"
              />
            }
          // refreshControl={
          //   <RefreshControl
          //     tintColor={colors.color_22534F}
          //     refreshing={refresh}
          //     onRefresh={refreshList}
          //   />
          // }
          />
        </View>
      </ScrollView>
      {ItemData?.status === "pending" && (
        <View style={styles.buttonView}>
          {remaningqty != completedqty &&
            <Button
              loader={loader}
              // icon={images.complete}
              // iconStyle={styles.buttonIcon}
              onPress={() => showAlertAndCallFunction("Comp", null)}
              buttonTextStyle={styles.buttonText}
              buttonContainerStyle={[styles.button, { backgroundColor: colors.red }]}
            >
              {"Make It Complete"}
            </Button>

          }
          {/* {remaningqty != 0 && */}
          <Button
            loader={loader}
            icon={images.complete}
            iconStyle={styles.buttonIcon}
            onPress={() => showAlertAndCallFunction("Save", null)}
            buttonTextStyle={styles.buttonText}
            buttonContainerStyle={styles.button}
          >
            {"Save"}
          </Button>
          {/* } */}
        </View>
      )}
    </View>
  );
};

export default memo(RewindingAddCompletedOrder);

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  scrollRoot: {
    flexGrow: 1,
    paddingBottom: 100
  },
  container: {
    padding: 17,
    marginTop: 32,
    borderWidth: 1,
    borderRadius: 12,
    marginHorizontal: 24,
    borderColor: colors.color_D5E4E3,
    backgroundColor: colors.color_F4F8F7
  },
  orderId: {
    fontSize: 18
  },
  detail: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 3,
    marginTop: 23
  },
  detailContainer: {
    flexDirection: "row",
    paddingHorizontal: 13,
    paddingVertical: 10
  },
  remarkContainer: {
    paddingHorizontal: 13,
    paddingVertical: 10
  },
  detailSubContainer: {
    flex: 1,
    flexDirection: "row"
  },
  detailContainerOrder: {
    flexDirection: "row",
    paddingHorizontal: 13,
    marginVertical: 5
  },
  label: {
    fontSize: 14,
    color: colors.color_777777
  },
  value: { fontSize: 14, color: colors.color_0B2624 },
  line: {
    height: 1,
    backgroundColor: colors.color_E8DBDF
  },
  inputContainer: {
    marginTop: 16
  },
  infoIcon: {
    height: 28,
    width: 28
  },
  unitContainer: {
    marginTop: 33,
    flexDirection: "row"
  },
  unitInput: {
    flex: 1
  },
  button: {
    // marginHorizontal: wp("6%"),
    // marginBottom: hp("6.5%")
    // width: wp("42%"),
    flex: 1,
    marginHorizontal: wp("0.5%"),
    paddingHorizontal: wp("1%")
  },
  buttonView: {
    flexDirection: 'row',
    marginBottom: hp("6%"),
    justifyContent: 'space-between',
    paddingHorizontal: wp("6%")
  },
  buttonIcon: { height: 28, width: 28 },
  buttonText: {
    fontSize: 16,
    paddingHorizontal: 6,
    fontFamily: fontFamily.Font500
  },
  ////
  list: { flexGrow: 1 },
  itemSeparator: { height: 20 },
  orderHistory: {
    fontSize: 18,
    marginBottom: 20
  },
  dateContainer: {
    height: 50,
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: colors.white,
    borderColor: colors.color_D5E4E3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  datelabel: {
    fontSize: 14,
    paddingVertical: 4,
    marginTop: 16,
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 13,
    includeFontPadding: false,
    fontFamily: fontFamily.Font500,
    color: colors.transparent_black,
  },
});
