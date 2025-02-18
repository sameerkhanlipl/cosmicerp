// import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
// import React, {memo, useCallback, useRef, useState} from 'react';
// import {ScrollView, StyleSheet, View} from 'react-native';
// import {stitching_set_order_complete_body} from '../../api/BodyTypes';
// import {stitching_complete_orders_response} from '../../api/ResponseTypes';
// import {images} from '../../assets/images';
// import {Font500, Font700} from '../../components/fonts/Fonts';
// import Button from '../../components/styles/Button';
// import CommonHeader from '../../components/styles/CommonHeader';
// import Input, {InputRef} from '../../components/styles/Input';
// import {colors} from '../../constants/colors';
// import {fontFamily} from '../../constants/fontFamily';
// import {AppNavigationProp, AppStackParamList} from '../../stacks/StackTypes';
// import {checkInput} from '../../utils/CheckInput';
// import {stitching_set_order_complete} from '../../api/apis';
// import {error, ShowToast} from '../../utils/ErrorHandler';
// import moment from 'moment';

// type StitchingAddCompletedOrderRouteProp = RouteProp<
//   AppStackParamList,
//   'StitchingAddCompletedOrder'
// >;

// const StitchingAddCompletedOrder = () => {
//   const {goBack} = useNavigation<AppNavigationProp>();

//   const route = useRoute<StitchingAddCompletedOrderRouteProp>();

//   const ItemData = route?.params?.data;

//   const [loader, setLoader] = useState(false);

//   const labour = useRef<InputRef>(null);
//   const date = useRef<InputRef>(null);
//   const bundle = useRef<InputRef>(null);
//   const qty = useRef<InputRef>(null);
//   const remark = useRef<InputRef>(null);

//   const onCompleteOrderHandler = useCallback(async () => {
//     if (
//       checkInput(labour?.current?.get(), 'Labour Require for complete order')
//     ) {
//       return;
//     }

//     if (
//       checkInput(bundle?.current?.get(), 'Bundle Require for complete order')
//     ) {
//       return;
//     }

//     if (
//       checkInput(qty?.current?.get(), 'Qty per Bdl Require for complete order')
//     ) {
//       return;
//     }
//     if (
//       checkInput(remark?.current?.get(), 'Remark Require for complete order')
//     ) {
//       return;
//     }

//     const body: stitching_set_order_complete_body = {
//       stitching_production_order_id: ItemData?.stitching_production_order_id,
//       labour_name: labour?.current?.get(),
//       date: date?.current?.get(),
//       qty_per_bdl: qty?.current?.get(),
//       bdl_qty: bundle?.current?.get(),
//       remark: remark?.current?.get(),
//     };

//     try {
//       setLoader(true);
//       const response: {data: stitching_complete_orders_response} =
//         await stitching_set_order_complete(body);
//       ShowToast(response?.data?.message);
//       goBack();
//       setLoader(false);
//     } catch (err) {
//       setLoader(false);
//       error(err);
//     } finally {
//       setLoader(false);
//     }
//   }, [ItemData, goBack]);

//   return (
//     <View style={styles.root}>
//       <CommonHeader title="Stitching Orders" />
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollRoot}>
//         <View style={styles.container}>
//           <Font500 style={styles.orderId}>{ItemData.order_id}</Font500>
//           <View style={styles.detail}>
//             <View style={styles.detailContainer}>
//               <View style={styles.detailSubContainer}>
//                 <Font500 style={styles.label}>{'Product Name : '}</Font500>
//                 <Font700 style={styles.value}>{ItemData?.product_name}</Font700>
//               </View>
//             </View>
//             <View style={styles.line} />
//             <View style={styles.detailContainer}>
//               <View style={styles.detailSubContainer}>
//                 <Font500 style={styles.label}>{'Bharti : '}</Font500>
//                 <Font700 style={styles.value}>{'100 Rolls'}</Font700>
//               </View>
//               <View style={styles.detailSubContainer}>
//                 <Font500 style={styles.label}>{'Colors : '}</Font500>
//                 <Font700 style={styles.value}>{'Red'}</Font700>
//               </View>
//             </View>
//             <View style={styles.line} />
//             <View style={styles.detailContainer}>
//               <View style={styles.detailSubContainer}>
//                 <Font500 style={styles.label}>{'Qty Per Bdl : '}</Font500>
//                 <Font700 style={styles.value}>{'2'}</Font700>
//               </View>
//               <View style={styles.detailSubContainer}>
//                 <Font500 style={styles.label}>{'Bundle : '}</Font500>
//                 <Font700 style={styles.value}>{'10'}</Font700>
//               </View>
//             </View>
//           </View>
//           <Input
//             ref={labour}
//             config={{placeholder: 'Labour Name'}}
//             rootStyle={styles.inputContainer}
//             label="Labour Name"
//           />
//           <Input
//             ref={date}
//             default_value={moment().format('DD-MM-YYYY')}
//             rootStyle={styles.inputContainer}
//             label="Date (DD-MM-YYYY)"
//             config={{editable: false}}
//           />
//           <View style={styles.unitContainer}>
//             <Input
//               ref={bundle}
//               config={{placeholder: '100 KG'}}
//               rootStyle={[styles.unitInput]}
//               label="Bundle Qty"
//             />
//             <Input
//               ref={qty}
//               config={{placeholder: '28”'}}
//               rootStyle={[styles.unitInput]}
//               label="Qty Per Bdl"
//             />
//           </View>
//           <Input
//             ref={remark}
//             config={{placeholder: 'Remark'}}
//             rootStyle={styles.inputContainer}
//             label="Remark"
//           />
//         </View>
//         <Button
//           loader={loader}
//           onPress={onCompleteOrderHandler}
//           icon={images.complete}
//           iconStyle={styles.buttonIcon}
//           buttonTextStyle={styles.buttonText}
//           buttonContainerStyle={styles.button}>
//           {'Save'}
//         </Button>
//       </ScrollView>
//     </View>
//   );
// };

// export default memo(StitchingAddCompletedOrder);

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//   },
//   scrollRoot: {
//     flexGrow: 1,
//     paddingBottom: 100,
//   },
//   container: {
//     padding: 17,
//     marginTop: 32,
//     borderWidth: 1,
//     borderRadius: 12,
//     marginHorizontal: 24,
//     borderColor: colors.color_D5E4E3,
//     backgroundColor: colors.color_F4F8F7,
//   },
//   orderId: {
//     fontSize: 18,
//   },
//   detail: {
//     backgroundColor: colors.white,
//     borderRadius: 12,
//     paddingVertical: 3,
//     marginTop: 23,
//   },
//   detailContainer: {
//     flexDirection: 'row',
//     paddingHorizontal: 13,
//     paddingVertical: 10,
//   },
//   detailSubContainer: {
//     flex: 1,
//     flexDirection: 'row',
//   },
//   label: {
//     fontSize: 14,
//     color: colors.color_777777,
//   },
//   value: {flex: 1, fontSize: 14, color: colors.color_0B2624},
//   line: {
//     height: 1,
//     backgroundColor: colors.color_E8DBDF,
//   },
//   inputContainer: {
//     marginTop: 16,
//   },
//   infoIcon: {
//     height: 28,
//     width: 28,
//   },
//   unitContainer: {
//     marginTop: 33,
//     flexDirection: 'row',
//   },
//   unitInput: {
//     flex: 1,
//     marginRight: 9,
//   },
//   button: {
//     marginVertical: 46,
//     marginHorizontal: 24,
//   },
//   buttonIcon: {height: 28, width: 28},
//   buttonText: {
//     fontSize: 16,
//     paddingHorizontal: 6,
//     fontFamily: fontFamily.Font500,
//   },
// });

import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  Alert,
  TouchableOpacity
} from "react-native";
import {
  stitching_delete_order_body,
  stitching_order_history_body,
  stitching_set_make_order_complete_body,
  stitching_set_order_complete_body
} from "../../api/BodyTypes";
import {
  stitching_complete_orders_response,
  stitching_delete_orders_response,
  stitching_make_complete_orders_response,
  stitching_order_history_listing_response
} from "../../api/ResponseTypes";
import { images } from "../../assets/images";
import { Font400, Font500, Font700 } from "../../components/fonts/Fonts";
import Button from "../../components/styles/Button";
import CommonHeader from "../../components/styles/CommonHeader";
import Input, { InputRef } from "../../components/styles/Input";
import { colors } from "../../constants/colors";
import { fontFamily } from "../../constants/fontFamily";
import { AppNavigationProp, AppStackParamList } from "../../stacks/StackTypes";
import { checkInput } from "../../utils/CheckInput";
import {
  stitching_delete_order,
  stitching_order_history,
  stitching_set_make_order_complete,
  stitching_set_order_complete
} from "../../api/apis";
import { error, ShowToast } from "../../utils/ErrorHandler";
import moment from "moment";
import EmptyList from "../../components/styles/EmptyList";
import StitchingOrderHistoryItems, {
  StitchingOrderHistoryItemType
} from "./StitchingOrderHistoryItems";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import DatePickerModel, { DatePickerModelRef } from "../../components/model/DatePickerModel";

type StitchingAddCompletedOrderRouteProp = RouteProp<
  AppStackParamList,
  "StitchingAddCompletedOrder"
>;

const StitchingAddCompletedOrder = () => {
  const { goBack } = useNavigation<AppNavigationProp>();

  const route = useRoute<StitchingAddCompletedOrderRouteProp>();

  const ItemData = route?.params?.data;

  const [loader, setLoader] = useState(false);
  const [completedqty, setCompletedQty] = useState<any>("");
  const [remaningqty, setRemanigQty] = useState<any>("");

  const labour = useRef<InputRef>(null);
  // const date = useRef<InputRef>(null);
  const bundle = useRef<InputRef>(null);
  const qty = useRef<InputRef>(null);
  const remark = useRef<InputRef>(null);

  const onCompleteOrderHandler = useCallback(async () => {
    if (
      checkInput(labour?.current?.get(), "Labour Require for complete order")
    ) {
      return;
    }

    if (
      checkInput(bundle?.current?.get(), "Bundle Require for complete order")
    ) {
      return;
    }

    if (
      checkInput(qty?.current?.get(), "Qty per Bdl Require for complete order")
    ) {
      return;
    }
    if (
      checkInput(remark?.current?.get(), "Remark Require for complete order")
    ) {
      return;
    }
    const new_date = datePickerRef.current?.value()
    const final_date = moment(new_date).format('DD-MM-YYYY')
    const body: stitching_set_order_complete_body = {
      stitching_production_order_id: ItemData?.stitching_production_order_id,
      labour_name: labour?.current?.get(),
      date: final_date,
      qty_per_bdl: qty?.current?.get(),
      bdl_qty: bundle?.current?.get(),
      remark: remark?.current?.get()
    };

    try {
      setLoader(true);
      const response: { data: stitching_complete_orders_response } =
        await stitching_set_order_complete(body);
      labour?.current?.set("");
      qty?.current?.set("");
      bundle?.current?.set("");
      remark?.current?.set("");
      await getList();
      ShowToast(response?.data?.message);
      if (response?.data?.data?.stitchingOrder?.status === "completed") {
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
        if (checkInput(labour?.current?.get(), "Labour Require for complete order") ||
          checkInput(bundle?.current?.get(), "Bundle Require for complete order") ||
          checkInput(qty?.current?.get(), "Qty per Bdl Require for complete order") ||
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

    const body: stitching_set_make_order_complete_body = {
      stitching_production_order_id: ItemData?.stitching_production_order_id,
    };
    console.log("body : ", body);
    try {
      setLoader(true);
      const response: { data: stitching_make_complete_orders_response } =
        await stitching_set_make_order_complete(body);
      ShowToast(response?.data?.message);
      setLoader(false);
      
      if (response?.data?.data?.stitchingOrder?.status === "completed") {
        goBack();
      }
    } catch (err) {
      setLoader(false);
      error(err);
    } finally {
      setLoader(false);
    }
  }

  const [list, setList] = useState<StitchingOrderHistoryItemType[]>([]);

  const [refresh, setRefresh] = useState<boolean>(false);

  const getList = useCallback(async () => {
    const body: stitching_order_history_body = {
      stitching_production_order_id: ItemData?.stitching_production_order_id
    };

    try {
      setLoader(true);
      const response: { data: stitching_order_history_listing_response } =
        await stitching_order_history(body);
       
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
    getList();
  }, [getList]);

  const refreshList = useCallback(async () => {
    const body: stitching_order_history_body = {
      stitching_production_order_id: ItemData?.stitching_production_order_id
    };

    try {
      setRefresh(true);
      const response: { data: stitching_order_history_listing_response } =
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



  const onDeleteOrderHandler = async (id: any) => {
  
    const body: stitching_delete_order_body = {
      id: id,
    };
    console.log("body : ", body);
    try {
      setLoader(true);
      const response: { data: stitching_delete_orders_response } =
        await stitching_delete_order(body);
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
    ({ item }: { item: StitchingOrderHistoryItemType }) => {
      return (
        <StitchingOrderHistoryItems
          data={item}
          onDelete={() => showAlertAndCallFunction("Delete", item.id)}
          status={ItemData?.status}
        />
      );
    },
    [onDeleteOrderHandler]
  );


  const ItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

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


  return (
    <View style={styles.root}>
      <CommonHeader title="Stitching Orders" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollRoot}
      >
        <View style={styles.container}>
          <Font500 style={styles.orderId}>{ItemData.serial_number}</Font500>
            {ItemData?.stitching_internal_notes &&
                      <View style={styles.detail}>
                        <View style={styles.remarkContainer}>
                          <Font500 style={styles.label}>{"Remark : "}</Font500>
                          <Font700 style={styles.value}>
                            {ItemData?.stitching_internal_notes}
                          </Font700>
                        </View>
                      </View>
                    }
  
          <View style={styles.detail}>
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Product Name : "}</Font500>
                <Font700 style={styles.value}>{ItemData?.product_name}</Font700>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Date : "}</Font500>
                <Font700 style={styles.value}>
                  {moment(ItemData?.date).format("DD/MM/YYYY")}
                </Font700>
              </View>
            
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Bundle : "}</Font500>
                <Font700 style={styles.value}>{ItemData?.production_qty}</Font700>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Bharti : "}</Font500>
                <Font700 style={styles.value}>{ItemData?.sticching_bharti}</Font700>
              </View>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Colors : "}</Font500>
                <Font700 style={styles.value}>{ItemData?.color}</Font700>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
            <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Bag/Box Per Bdl : "}</Font500>
                <Font700 style={styles.value}>{ItemData?.bags_per_bdl}</Font700>
              </View>
            
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
              
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Sticker : "}</Font500>
                <Font700 style={styles.value}>{ItemData?.sticker}</Font700>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
              
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Packing Material Name : "}</Font500>
                <Font700 style={styles.value}>{ItemData?.packing_material_name}</Font700>
              </View>
            </View>
             
            <View style={styles.line} />
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font700 style={styles.value}>
                {ItemData?.sticching_bharti + ' X ' + ItemData?.sticching_bag + ' X ' + ItemData?.production_qty}
                </Font700>
              </View>
            </View>
          </View>
          {ItemData?.status === "pending" && (
            <View>
              <Input
                ref={labour}
                config={{ placeholder: "Labour Name" }}
                rootStyle={styles.inputContainer}
                label="Labour Name"
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
              <View style={styles.unitContainer}>
                <Input
                  ref={bundle}
                  keyboardType="number-pad"
                  config={{ placeholder: "100 KG" }}
                  rootStyle={[styles.unitInput]}
                  label="Bundle Qty"
                />
                <Input
                  ref={qty}
                  keyboardType="number-pad"
                  config={{ placeholder: "28”" }}
                  rootStyle={[styles.unitInput]}
                  label="Qty Per Bdl"
                />
              </View>
              <Input
                ref={remark}
                config={{ placeholder: "Remark" }}
                rootStyle={styles.inputContainer}
                label="Remark"
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
            //     <StitchingItems
            //       onPress={onNavigateStitchingAddCompletedOrder}
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
            refreshControl={
              <RefreshControl
                tintColor={colors.color_22534F}
                refreshing={refresh}
                onRefresh={refreshList}
              />
            }
          />
        </View>
      </ScrollView>
      {ItemData?.status === "pending" && (
        <View style={styles.buttonView}>
          {remaningqty !== completedqty &&
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

export default memo(StitchingAddCompletedOrder);

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
  value: { flex: 1, fontSize: 14, color: colors.color_0B2624 },
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
    flex: 1,
    marginRight: 9
  },
  buttonView: {
    flexDirection: 'row',
    marginBottom: hp("6%"),
    justifyContent: 'space-between',
    paddingHorizontal: wp("6%")
  },
  button: {
    // marginHorizontal: wp("6%"),
    // marginBottom: hp("6.5%")
    flex: 1,
    marginHorizontal: wp("0.5%"),
    paddingHorizontal: wp("1%")
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
