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
  Text,
  FlatList,
  RefreshControl,
  Alert,
  TouchableOpacity
} from "react-native";
import {
  lamination_delete_order_body,
  lamination_delete_order_complete_body,
  lamination_order_history_body,
  lamination_set_make_order_complete_body,
  lamination_set_order_complete_body
} from "../../api/BodyTypes";
import {
  lamination_complete_orders_response,
  lamination_delete_orders_response,
  lamination_make_complete_orders_response,
  lamination_order_history_listing_response
} from "../../api/ResponseTypes";
import {
  lamination_delete_order,
  lamination_order_history,
  lamination_set_make_order_complete,
  lamination_set_order_complete
} from "../../api/apis";
import { images } from "../../assets/images";
import { Font500, Font700 } from "../../components/fonts/Fonts";
import Button from "../../components/styles/Button";
import CommonHeader from "../../components/styles/CommonHeader";
import DropDown, {
  DropDownRef,
  DropDownType
} from "../../components/styles/DropDown";
import Input, { InputRef } from "../../components/styles/Input";
import { colors } from "../../constants/colors";
import { fontFamily } from "../../constants/fontFamily";
import { AppNavigationProp, AppStackParamList } from "../../stacks/StackTypes";
import { checkInput } from "../../utils/CheckInput";
import { error, ShowToast } from "../../utils/ErrorHandler";
import LaminationOrderHistoryItems, {
  LaminationOrderHistoryItemType
} from "./LaminationOrderHistoryItems";
import LaminationItems, { LaminationItemType } from "./LaminationItems";
import EmptyList from "../../components/styles/EmptyList";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { defaultSerializeQueryArgs } from "@reduxjs/toolkit/query";
import DatePickerModel, {
  DatePickerModelRef
} from "../../components/model/DatePickerModel";

const ItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

type LaminationAddCompletedOrderRouteProp = RouteProp<
  AppStackParamList,
  "LaminationAddCompletedOrder"
>;

const machineListing: DropDownType[] = [
  { title: "Machine 1", value: "Machine 1" },
  { title: "Machine 2", value: "Machine 2" },
  { title: "Machine 3", value: "Machine 3" },
  { title: "Machine 4", value: "Machine 4" },
  { title: "Machine 5", value: "Machine 5" }
];

const LaminationAddCompletedOrder = () => {
  const { navigate } = useNavigation<AppNavigationProp>();
  const route = useRoute<LaminationAddCompletedOrderRouteProp>();
  const route_data = route?.params?.data;

  const { goBack } = useNavigation<AppNavigationProp>();

  const ItemData = route?.params?.data;

  const [completedqty, setCompletedQty] = useState<any>("");
  const [remaningqty, setRemanigQty] = useState<any>("");
  const [loader, setLoader] = useState<boolean>(false);

  const machine = useRef<DropDownRef>(null);
  //const date = useRef<InputRef>(null);
  const meter = useRef<InputRef>(null);

  const onCompleteOrderHandler = useCallback(async () => {
    if (checkInput(meter?.current?.get(), "Meter Require for complete order")) {
      return;
    }
    if (
      checkInput(
        machine?.current?.get()?.value,
        "Please Select Machine, Machine is Require for complete order"
      )
    ) {
      return;
    }
    const new_date = datePickerRef.current?.value();
    const final_date = moment(new_date).format("DD-MM-YYYY");
    const body: lamination_set_order_complete_body = {
      lamination_production_order_id: ItemData?.production_order_id,
      machine: machine?.current?.get()?.value,
      // date: date?.current?.get(),
      date: final_date,
      meter: meter?.current?.get()
    };
    console.log("body : ", body);

    try {
      setLoader(true);
      const response: { data: lamination_complete_orders_response } =
        await lamination_set_order_complete(body);
      meter?.current?.set("");
      await getList();
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
  }, [ItemData, goBack]);

  // const showAlertAndCallFunction = (status: any, id: any) => {
  //   //SAVE
  //   if (status == "Save") {
  //     if (checkInput(meter?.current?.get(), "Meter Require for complete order")) {
  //       return;
  //     }
  //     if (
  //       checkInput(
  //         machine?.current?.get()?.value,
  //         "Please Select Machine, Machine is Require for complete order"
  //       )
  //     ) {
  //       return;
  //     }
  //     Alert.alert(
  //       'Confirmation',
  //       'Are you sure you want to save?',
  //       [
  //         {
  //           text: 'Cancel',
  //           onPress: () => console.log('Action cancelled'),
  //           style: 'cancel',
  //         },
  //         {
  //           text: 'Yes',
  //           onPress: onCompleteOrderHandler,
  //         },
  //       ],
  //       { cancelable: false }
  //     );
  //   }

  //   //COMPLETE
  //   else if (status == "Comp") {
  //     if (remaningqty == completedqty) {
  //       ShowToast("Order Require for make it complete")
  //       return;
  //     }
  //     Alert.alert(
  //       'Confirmation',
  //       'Are you sure you want to make it complete?',
  //       [
  //         {
  //           text: 'Cancel',
  //           onPress: () => console.log('Action cancelled'),
  //           style: 'cancel',
  //         },
  //         {
  //           text: 'Yes',
  //           onPress: onMakeCompleteOrderHandler,
  //         },
  //       ],
  //       { cancelable: false }
  //     );
  //   }

  //   //DELETE
  //   else if (status == "Delete") {
  //     Alert.alert(
  //       'Confirmation',
  //       'Are you sure you want to delete?',
  //       [
  //         {
  //           text: 'Cancel',
  //           onPress: () => console.log('Action cancelled'),
  //           style: 'cancel',
  //         },
  //         {
  //           text: 'Yes',
  //           onPress: () => onDeleteOrderHandler(id),
  //         },
  //       ],
  //       { cancelable: false }
  //     );
  //   }
  // };

  const showAlertAndCallFunction = (status: string, id: any) => {
    const showConfirmationAlert = (message: string, onConfirm: () => void) => {
      Alert.alert(
        "Confirmation",
        message,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Action cancelled"),
            style: "cancel"
          },
          {
            text: "Yes",
            onPress: onConfirm
          }
        ],
        { cancelable: false }
      );
    };

    switch (status) {
      case "Save":
        if (
          checkInput(
            meter?.current?.get(),
            "Meter Require for complete order"
          ) ||
          checkInput(
            machine?.current?.get()?.value,
            "Please Select Machine, Machine is Require for complete order"
          )
        ) {
          return;
        }
        showConfirmationAlert(
          "Are you sure you want to save?",
          onCompleteOrderHandler
        );
        break;

      case "Comp":
        if (remaningqty === completedqty) {
          ShowToast("Order Require for make it complete");
          return;
        }
        showConfirmationAlert(
          "Are you sure you want to make it complete?",
          onMakeCompleteOrderHandler
        );
        break;

      case "Delete":
        showConfirmationAlert("Are you sure you want to delete?", () =>
          onDeleteOrderHandler(id)
        );
        break;

      default:
        console.warn(`Unknown status: ${status}`);
        break;
    }
  };

  const onMakeCompleteOrderHandler = async () => {
    if (remaningqty == completedqty) {
      ShowToast("Order Require for make it complete");
      return;
    }
    const body: lamination_set_make_order_complete_body = {
      lamination_production_order_id: ItemData?.production_order_id
    };
    console.log("body : ", body);
    try {
      setLoader(true);
      const response: { data: lamination_make_complete_orders_response } =
        await lamination_set_make_order_complete(body);
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
  };

  const focus = useIsFocused();
  const [list, setList] = useState<LaminationOrderHistoryItemType[]>([]);
  // const [loader, setLoader] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  const getList = useCallback(async () => {
    const body: lamination_order_history_body = {
      lamination_production_order_id: ItemData?.production_order_id
    };
    try {
      setLoader(true);
      const response: { data: lamination_order_history_listing_response } =
        await lamination_order_history(body);

      setList(response?.data?.data);
      setCompletedQty(response?.data?.required_meters);
      setRemanigQty(response?.data?.remainingQty);
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
    const body: lamination_order_history_body = {
      lamination_production_order_id: ItemData?.production_order_id
    };

    try {
      setRefresh(true);
      const response: { data: lamination_order_history_listing_response } =
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

  const onDeleteOrderHandler = async (id: any) => {
    const body: lamination_delete_order_body = {
      id: id
    };
    console.log("body : ", body);

    try {
      setLoader(true);
      const response: { data: lamination_delete_orders_response } =
        await lamination_delete_order(body);
      getList();
      ShowToast(response?.data?.message);
      setLoader(false);
    } catch (err) {
      setLoader(false);
      error(err);
    } finally {
      setLoader(false);
    }
  };

  const renderItemHandler = useCallback(
    ({ item }: { item: LaminationOrderHistoryItemType }) => {
      return (
        <LaminationOrderHistoryItems
          data={item}
          onDelete={() => showAlertAndCallFunction("Delete", item.id)}
          status={route_data?.status}
        />
      );
    },
    [showAlertAndCallFunction]
  );

  const datePickerRef = useRef<DatePickerModelRef>(null);
  const [date, setDate] = useState(moment().format("DD-MM-YYYY"));

  const handleConfirm = () => {
    const selectedDate = datePickerRef.current?.value();

    if (selectedDate) {
      setDate(moment(selectedDate).format("DD-MM-YYYY"));
    }
    datePickerRef.current?.close();
  };

  const handleClose = () => {
    const current_date = new Date();
    setDate(moment(current_date).format("DD-MM-YYYY"));
  };

  const openDatePicker = () => {
    datePickerRef.current?.open(new Date());
  };

  return (
    <View style={styles.root}>
      <CommonHeader title="Lamination Orders" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollRoot}
      >
        <View style={styles.container}>
          <Font500 style={styles.orderId}>{ItemData?.serial_number}</Font500>
          {route_data?.lamination_internal_notes && (
            <View style={styles.detail}>
              <View style={styles.remarkContainer}>
                <Font500 style={styles.label}>{"Remark : "}</Font500>
                <Font700 style={[styles.value, { width: wp("70%") }]}>
                  {route_data?.lamination_internal_notes}
                </Font700>
              </View>
            </View>
          )}

          <View style={styles.detail}>
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Work Order Date : "}</Font500>
                <Font700 style={styles.value}>
                  {moment(route_data?.date).format("DD/MM/YYYY")}
                </Font700>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Lamination Type : "}</Font500>
                <Font700 style={styles.value}>
                  {route_data?.lamination_type}
                </Font700>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Paper Name : "}</Font500>
                <Font700 style={[styles.value, { width: wp("45%") }]}>
                  {route_data?.lamination_material_name}
                </Font700>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"GSM : "}</Font500>
                <Font700 style={styles.value}>{route_data?.gsm}</Font700>
              </View>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Width : "}</Font500>
                <Font700 style={styles.value}>{route_data?.width}</Font700>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Meter : "}</Font500>
                <Font700 style={[styles.value, { width: wp("20%") }]}>
                  {route_data?.meter}
                  {/* {route_data?.meter.replace(/,/g, '').split('.')[0]} */}
                </Font700>
                {/* <Font700 style={styles.value}>{Math.floor(Number(route_data?.meter))}</Font700> */}
              </View>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Paper KG : "}</Font500>
                <Font700 style={[styles.value, { width: wp("20%") }]}>
                  {/* {Number(route_data?.paper_kg)?.toFixed(2)} */}
                  {route_data?.paper_kg}
                </Font700>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Film KG : "}</Font500>
                <Font700 style={styles.value}>{route_data?.film_kg}</Font700>
              </View>
            </View>
          </View>
          {route_data?.status === "pending" && (
            <View>
              <DropDown
                ref={machine}
                rootStyle={styles.inputContainer}
                data={machineListing}
                label="Machine"
              />
              {/* <Input
                ref={date}
                default_value={moment().format("DD-MM-YYYY")}
                rootStyle={styles.inputContainer}
                label="Date (DD-MM-YYYY)"
                config={{ editable: false }}
              /> */}
              <Font500 style={styles.datelabel}>Date (DD-MM-YYYY)</Font500>
              <TouchableOpacity
                style={styles.dateContainer}
                onPress={openDatePicker}
              >
                <Text style={styles.dateText}>{date}</Text>
              </TouchableOpacity>
              {/* DatePickerModel component */}
              <DatePickerModel
                ref={datePickerRef}
                onConfirm={handleConfirm}
                onClose={handleClose}
              />
              <Input
                ref={meter}
                keyboardType="number-pad"
                config={{ placeholder: "100 Meter" }}
                rootStyle={styles.inputContainer}
                label="Meter"
              />
            </View>
          )}
          {/* <Font500 style={styles.pending_qty}>
            {'pending quantity : ' + route_data?.production_qty}
          </Font500> */}
        </View>

        <View style={styles.container}>
          <Font500 style={styles.orderHistory}>{"Order History #"}</Font500>
          {/* {list?.length != 0 && ( */}
          <View style={{ marginVertical: 10 }}>
            <View style={styles.line} />
            {/* <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Total : "}</Font500>
                <Font700 style={[styles.value, { width: wp("45%") }]}>
                  {route_data?.meter}
                </Font700>
              </View>
            </View> */}
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
          {/* )} */}
          <FlatList
            data={list}
            renderItem={renderItemHandler}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index: number) => index?.toString()}
            // ListHeaderComponent={
            //   <>
            //     <LaminationItems
            //       onPress={onNavigateLaminationAddCompletedOrder}
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
          {remaningqty != completedqty && (
            <Button
              loader={loader}
              // icon={images.complete}
              // iconStyle={styles.buttonIcon}
              onPress={() => showAlertAndCallFunction("Comp", null)}
              buttonTextStyle={styles.buttonText}
              buttonContainerStyle={[
                styles.button,
                {
                  backgroundColor:
                    // colors.color_22534F
                    colors.red
                }
              ]}
            >
              {"Make It Complete"}
            </Button>
          )}
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

export default memo(LaminationAddCompletedOrder);

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
  detailContainerOrder: {
    flexDirection: "row",
    paddingHorizontal: 13,
    marginVertical: 5
  },
  detailSubContainer: {
    flex: 1,
    flexDirection: "row"
  },
  label: {
    fontSize: 14,
    color: colors.color_777777
  },
  value: { fontSize: 14, color: colors.color_0B2624, width: 190 },
  line: {
    height: 1,
    backgroundColor: colors.color_E8DBDF
  },
  inputContainer: {
    marginTop: 16
  },
  dateContainer: {
    height: 50,
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: colors.white,
    borderColor: colors.color_D5E4E3,
    flexDirection: "row",
    alignItems: "center"
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
  buttonView: {
    flexDirection: "row",
    marginBottom: hp("6%"),
    justifyContent: "space-between",
    paddingHorizontal: wp("6%")
  },
  button: {
    flex: 1,
    paddingHorizontal: wp("1%"),
    marginHorizontal: wp("0.5%")
  },
  buttonIcon: { height: 28, width: 28 },
  buttonText: {
    fontSize: wp("4%"),
    paddingHorizontal: 6,
    fontFamily: fontFamily.Font500
  },
  pending_qty: {
    fontSize: 12,
    paddingTop: 10,
    color: colors.darkGray
  },
  list: { flexGrow: 1 },
  itemSeparator: { height: 20 },
  orderHistory: {
    fontSize: 18
    //marginBottom: 20
  },
  datelabel: {
    fontSize: 14,
    paddingVertical: 4,
    marginTop: 16
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 13,
    includeFontPadding: false,
    fontFamily: fontFamily.Font500,
    color: colors.transparent_black
  }
});
