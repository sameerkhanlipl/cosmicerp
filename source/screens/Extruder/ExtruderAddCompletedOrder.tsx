// import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
// import React, {memo, useCallback, useRef, useState} from 'react';
// import {Image, Pressable, ScrollView, StyleSheet, View} from 'react-native';
// import {extruder_complete_orders} from '../../api/apis';
// import {extruder_set_order_complete_body} from '../../api/BodyTypes';
// import {images} from '../../assets/images';
// import {Font400, Font500, Font700} from '../../components/fonts/Fonts';
// import Button from '../../components/styles/Button';
// import CommonHeader from '../../components/styles/CommonHeader';
// import DropDown, {
//   DropDownRef,
//   DropDownType,
// } from '../../components/styles/DropDown';
// import Input, {InputRef} from '../../components/styles/Input';
// import {colors} from '../../constants/colors';
// import {fontFamily} from '../../constants/fontFamily';
// import {AppNavigationProp, AppStackParamList} from '../../stacks/StackTypes';
// import {error, ShowToast} from '../../utils/ErrorHandler';
// import moment from 'moment';
// import {checkInput} from '../../utils/CheckInput';
// import {extruder_complete_orders_response} from '../../api/ResponseTypes';

// type ExtruderAddCompletedOrderRouteProp = RouteProp<
//   AppStackParamList,
//   'ExtruderOrderHistory'
// >;

// enum Sift {
//   DAY = 'day',
//   NIGHT = 'night',
// }

// const machineListing: DropDownType[] = [
//   {title: 'Machine 1', value: 'machine_1'},
//   {title: 'Machine 2', value: 'machine_2'},
//   {title: 'Machine 3', value: 'machine_3'},
//   {title: 'Machine 4', value: 'machine_4'},
//   {title: 'Machine 5', value: 'machine_5'},
// ];

// const ExtruderAddCompletedOrder = () => {
//   const route = useRoute<ExtruderAddCompletedOrderRouteProp>();
//   const ItemData = route?.params?.data;

//   const {goBack} = useNavigation<AppNavigationProp>();

//   const [selectedSift, setSelectedSift] = useState<Sift>(Sift.DAY);
//   const [loader, setLoader] = useState<boolean>();

//   const machine = useRef<DropDownRef>(null);
//   const date = useRef<InputRef>(null);
//   const qty = useRef<InputRef>(null);
//   const size = useRef<InputRef>(null);

//   const onCompleteOrderHandler = useCallback(async () => {
//     if (
//       checkInput(qty?.current?.get(), 'Quantity Require for complete order')
//     ) {
//       return;
//     }

//     if (checkInput(size?.current?.get(), 'Size Require for complete order')) {
//       return;
//     }

//     const body: extruder_set_order_complete_body = {
//       date: date?.current?.get(),
//       extruder_production_order_id: ItemData?.extruder_production_order_id,
//       machine: machine?.current?.get()?.value,
//       qty: qty?.current?.get(),
//       shift: selectedSift,
//       size: size?.current?.get(),
//     };

//     try {
//       setLoader(true);
//       const response: {data: extruder_complete_orders_response} =
//         await extruder_complete_orders(body);
//       ShowToast(response?.data?.message);
//       setLoader(false);
//       goBack();
//     } catch (err) {
//       setLoader(false);
//       error(err);
//     } finally {
//       setLoader(false);
//     }
//   }, [selectedSift, ItemData, goBack]);

//   return (
//     <View style={styles.root}>
//       <CommonHeader title="Extruders orders" />
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollRoot}>
//         <View style={styles.container}>
//           <Font500 style={styles.orderId}>{ItemData.order_id}</Font500>
//           <View style={styles.detail}>
//             <View style={styles.detailContainer}>
//               <View style={styles.detailSubContainer}>
//                 <Font500 style={styles.label}>{'Gauge : '}</Font500>
//                 <Font700 style={styles.value}>{ItemData?.length}</Font700>
//               </View>
//               <View style={styles.detailSubContainer}>
//                 <Font500 style={styles.label}>{'Size : '}</Font500>
//                 <Font700 style={styles.value}>{ItemData?.width + '"'}</Font700>
//               </View>
//             </View>
//             <View style={styles.line} />
//             <View style={styles.detailContainer}>
//               <View style={styles.detailSubContainer}>
//                 <Font500 style={styles.label}>{'Colors : '}</Font500>
//                 <Font700 style={styles.value}>{ItemData?.color}</Font700>
//               </View>
//               <View style={styles.detailSubContainer}>
//                 <Font500 style={styles.label}>{'Qty : '}</Font500>
//                 <Font700 style={styles.value}>
//                   {ItemData?.production_qty + 'KG'}
//                 </Font700>
//               </View>
//             </View>
//           </View>
//           <View style={styles.recipeContainer}>
//             <Font500 style={styles.recipeLabel}>{'Recipe Name :  '}</Font500>
//             <Font700 style={styles.recipeValue}>{''}</Font700>
//             <Image
//               style={styles.infoIcon}
//               resizeMode="contain"
//               source={images.info}
//             />
//           </View>
//           <DropDown
//             ref={machine}
//             rootStyle={styles.inputContainer}
//             data={machineListing}
//             label="Machine"
//           />
//           <Input
//             ref={date}
//             rightIcon={images.date}
//             label="Date (DD-MM-YYYY)"
//             config={{editable: false}}
//             rightIconStyle={styles.dateIcon}
//             rootStyle={styles.inputContainer}
//             default_value={moment().format('DD-MM-YYYY')}
//           />

//           <View style={styles.siftContainer}>
//             <Font500 style={styles.siftLabel}>{'Shift'}</Font500>
//             <View style={styles.siftSubContainer}>
//               <Pressable
//                 onPress={() => setSelectedSift(Sift.DAY)}
//                 style={[
//                   selectedSift === Sift.DAY ? styles.selectedSift : styles.sift,
//                 ]}>
//                 <Image
//                   tintColor={
//                     selectedSift === Sift.DAY
//                       ? colors?.white
//                       : colors?.color_0B2624
//                   }
//                   source={images.day}
//                   resizeMode="contain"
//                   style={styles.siftIcon}
//                 />
//                 <Font500
//                   style={[
//                     selectedSift === Sift.DAY
//                       ? styles?.selectedSiftValue
//                       : styles?.siftValue,
//                   ]}>
//                   {Sift.DAY}
//                 </Font500>
//               </Pressable>
//               <Pressable
//                 onPress={() => setSelectedSift(Sift.NIGHT)}
//                 style={[
//                   selectedSift === Sift.NIGHT
//                     ? styles.selectedSift
//                     : styles.sift,
//                 ]}>
//                 <Image
//                   tintColor={
//                     selectedSift === Sift.NIGHT
//                       ? colors?.white
//                       : colors?.color_0B2624
//                   }
//                   source={images.night}
//                   resizeMode="contain"
//                   style={styles.siftIcon}
//                 />
//                 <Font500
//                   style={[
//                     selectedSift === Sift.NIGHT
//                       ? styles?.selectedSiftValue
//                       : styles?.siftValue,
//                   ]}>
//                   {Sift.NIGHT}
//                 </Font500>
//               </Pressable>
//             </View>
//           </View>

//           <View style={styles.unitContainer}>
//             <Input
//               ref={qty}
//               config={{placeholder: '100 KG'}}
//               rootStyle={[styles.unitInput]}
//               label="Qty"
//             />
//             <Input
//               ref={size}
//               config={{placeholder: '28”'}}
//               rootStyle={[styles.unitInput]}
//               label="Size"
//             />
//           </View>
//           <View style={styles.pending}>
//             <Font500 style={styles.pendingMedium}>
//               {ItemData?.pending_bundle_qty + ' KG'}
//             </Font500>
//             <Font400 style={styles.pendingRegular}>{' Pending'}</Font400>
//           </View>
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

// export default memo(ExtruderAddCompletedOrder);

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
//   value: {fontSize: 14, color: colors.color_0B2624},
//   line: {
//     height: 1,
//     backgroundColor: colors.color_E8DBDF,
//   },
//   recipeContainer: {
//     marginTop: 25,
//     borderRadius: 12,
//     marginBottom: 9,
//     alignItems: 'center',
//     flexDirection: 'row',
//     paddingVertical: 15,
//     paddingHorizontal: 13,
//     backgroundColor: colors.color_D5E4E3,
//   },
//   recipeLabel: {
//     fontSize: 14,
//     color: colors.color_777777,
//   },
//   recipeValue: {
//     fontSize: 14,
//     color: colors.color_0B2624,
//     flex: 1,
//   },
//   inputContainer: {
//     marginTop: 16,
//   },
//   dateIcon: {
//     height: 24,
//     width: 24,
//   },
//   infoIcon: {
//     height: 28,
//     width: 28,
//   },
//   siftContainer: {
//     marginTop: 14,
//   },
//   siftLabel: {
//     fontSize: 14,
//     marginBlock: 13,
//   },
//   siftSubContainer: {
//     flexDirection: 'row',
//   },
//   selectedSift: {
//     height: 41,
//     marginRight: 20,
//     borderRadius: 6,
//     borderWidth: 1,
//     paddingRight: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     borderColor: colors.color_22534F,
//     backgroundColor: colors.color_22534F,
//   },
//   sift: {
//     height: 41,
//     marginRight: 20,
//     borderRadius: 6,
//     borderWidth: 1,
//     paddingRight: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     borderColor: colors.color_0B2624,
//     backgroundColor: colors.white,
//   },
//   siftIcon: {
//     height: 20,
//     width: 20,
//   },
//   selectedSiftValue: {
//     fontSize: 14,
//     color: colors.white,
//   },
//   siftValue: {
//     fontSize: 14,
//     color: colors.color_0B2624,
//   },
//   unitContainer: {
//     marginTop: 33,
//     flexDirection: 'row',
//   },
//   unitInput: {
//     flex: 1,
//     marginRight: 9,
//   },
//   pending: {
//     paddingLeft: 12,
//     paddingTop: 7,
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   pendingMedium: {
//     fontSize: 14,
//     color: colors?.color_22534F,
//   },
//   pendingRegular: {
//     fontSize: 14,
//     color: colors?.color_777777,
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

import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  Alert,
  TouchableOpacity
} from "react-native";
import {
  extruder_complete_orders,
  extruder_delete_order,
  extruder_order_history,
  extruder_set_make_order_complete,
  extruder_set_order_complete
} from "../../api/apis";
import {
  exruder_delete_order_body,
  extruder_delete_order_body,
  extruder_order_history_body,
  extruder_set_make_order_complete_body,
  extruder_set_order_complete_body
} from "../../api/BodyTypes";
import { images } from "../../assets/images";
import { Font400, Font500, Font700 } from "../../components/fonts/Fonts";
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
import { error, ShowToast } from "../../utils/ErrorHandler";
import moment from "moment";
import { checkInput } from "../../utils/CheckInput";
import {
  extruder_complete_orders_response,
  extruder_delete_orders_response,
  extruder_make_complete_orders_response,
  extruder_order_history_listing_response
} from "../../api/ResponseTypes";
import EmptyList from "../../components/styles/EmptyList";
import ExtruderOrderHistoryItems, {
  ExtruderOrderHistoryItemType
} from "./ExtruderOrderHistoryItems";
import ExtrudersItems, { ExtrudersItemType } from "./ExtrudersItems";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import DatePickerModel, {
  DatePickerModelRef
} from "../../components/model/DatePickerModel";
import RecipeModal, {
  RecipeModallRef,
  RecipeModalRef
} from "../../components/model/RecipeModal";

type ExtruderAddCompletedOrderRouteProp = RouteProp<
  AppStackParamList,
  "ExtruderOrderHistory"
>;

enum Sift {
  DAY = "day",
  NIGHT = "night"
}

const machineListing: DropDownType[] = [
  { title: "Machine 1", value: "Machine 1" },
  { title: "Machine 2", value: "Machine 2" },
  { title: "Machine 3", value: "Machine 3" },
  { title: "Machine 4", value: "Machine 4" },
  { title: "Machine 5", value: "Machine 5" }
];

const ExtruderAddCompletedOrder = () => {
  const route = useRoute<ExtruderAddCompletedOrderRouteProp>();
  const ItemData = route?.params?.data;

  const { goBack } = useNavigation<AppNavigationProp>();
  const [selectedSift, setSelectedSift] = useState<Sift>(Sift.DAY);
  const [loader, setLoader] = useState<boolean>();
  const [completedqty, setCompletedQty] = useState<any>("");
  const [remaningqty, setRemanigQty] = useState<any>("");

  const machine = useRef<DropDownRef>(null);
  //const date = useRef<InputRef>(null);
  const qty = useRef<InputRef>(null);
  const size = useRef<InputRef>(null);

  const onCompleteOrderHandler = useCallback(async () => {
    if (
      checkInput(qty?.current?.get(), "Quantity Require for complete order")
    ) {
      return;
    }
    if (checkInput(size?.current?.get(), "Size Require for complete order")) {
      return;
    }

    const new_date = datePickerRef.current?.value();
    const final_date = moment(new_date).format("DD-MM-YYYY");
    const body: extruder_set_order_complete_body = {
      // date: date?.current?.get(),
      date: final_date,
      extruder_production_order_id: ItemData?.extruder_production_order_id,
      machine: machine?.current?.get()?.value,
      qty: qty?.current?.get(),
      shift: selectedSift,
      size: size?.current?.get()
    };
    console.log("body", body);
    try {
      setLoader(true);
      const response: { data: extruder_complete_orders_response } =
        await extruder_set_order_complete(body);
      qty?.current?.set("");
      size?.current?.set("");
      await getList();
      ShowToast(response?.data?.message);
      setLoader(false);
      if (response?.data?.data?.status === "completed") {
        goBack();
      }
      // goBack();
    } catch (err) {
      setLoader(false);
      error(err);
    } finally {
      setLoader(false);
    }
  }, [selectedSift, ItemData, goBack]);

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
            qty?.current?.get(),
            "Quantity Require for complete order"
          ) ||
          checkInput(size?.current?.get(), "Size Require for complete order")
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
    const body: extruder_set_make_order_complete_body = {
      extruder_production_order_id: ItemData?.extruder_production_order_id
    };
    console.log("body : ", body);
    try {
      setLoader(true);
      const response: { data: extruder_make_complete_orders_response } =
        await extruder_set_make_order_complete(body);
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

  const [list, setList] = useState<ExtruderOrderHistoryItemType[]>([]);

  const [refresh, setRefresh] = useState<boolean>(false);

  const focus = useIsFocused();

  const getList = useCallback(async () => {
    const body: extruder_order_history_body = {
      extruder_production_order_id: ItemData?.extruder_production_order_id
    };

    try {
      setLoader(true);
      const response: { data: extruder_order_history_listing_response } =
        await extruder_order_history(body);

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
    const body: extruder_order_history_body = {
      extruder_production_order_id: ItemData?.extruder_production_order_id
    };

    try {
      setRefresh(true);
      const response: { data: extruder_order_history_listing_response } =
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

  const onDeleteOrderHandler = async (id: any) => {
    const body: extruder_delete_order_body = {
      id: id
    };

    try {
      setLoader(true);
      const response: { data: extruder_delete_orders_response } =
        await extruder_delete_order(body);
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
    ({ item }: { item: ExtruderOrderHistoryItemType }) => {
      return (
        <ExtruderOrderHistoryItems
          data={item}
          onDelete={() => showAlertAndCallFunction("Delete", item.id)}
          status={ItemData?.status}
        />
      );
    },
    [onDeleteOrderHandler]
  );

  const datePickerRef = useRef<DatePickerModelRef>(null);
  const [date, setDate] = useState(moment().format("DD-MM-YYYY"));

  const handleConfirm = async () => {
    const selectedDate = datePickerRef.current?.value();
    if (selectedDate) {
      setDate(moment(selectedDate).format("DD-MM-YYYY"));
    }
    datePickerRef.current?.close();
  };

  const handleClose = async () => {
    const current_date = new Date();
    setDate(moment(current_date).format("DD-MM-YYYY"));
  };

  const openDatePicker = () => {
    datePickerRef.current?.open(new Date());
  };

  const ItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

  const recipeModel = useRef<RecipeModalRef>(null);

  const onRecipeModalOPen = useCallback(() => {
    recipeModel?.current?.open();
  }, []);

  return (
    <View style={styles.root}>
      <CommonHeader title="Extruders orders" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollRoot}
      >
        <View style={styles.container}>
          <Font500 style={styles.orderId}>{ItemData.serial_number}</Font500>
          {ItemData?.extrusion_internal_notes && (
            <View style={styles.detail}>
              <View style={styles.remarkContainer}>
                <Font500 style={styles.label}>{"Remark : "}</Font500>
                <Font700 style={styles.value}>
                  {ItemData?.extrusion_internal_notes}
                </Font700>
              </View>
            </View>
          )}

          <View style={styles.detail}>
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Gauge : "}</Font500>
                <Font700 style={styles.value}>{ItemData?.gage}</Font700>
              </View>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Size : "}</Font500>
                <Font700 style={styles.value}>
                  {ItemData?.extrusion_size + "X" + ItemData?.gage}
                </Font700>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Colors : "}</Font500>
                <Font700 style={styles.value}>{ItemData?.color}</Font700>
              </View>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Qty : "}</Font500>
                <Font700 style={styles.value}>
                {/* {ItemData?.extrusion_qty_of_packing.replace(/,/g, '').split('.')[0]+" KG"}  */}
                  {ItemData?.extrusion_qty_of_packing + "KG"}
                </Font700>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Recipe Name : "}</Font500>
                <Font700 style={styles.value}>{ItemData?.recipe_name}</Font700>
              </View>
            </View>
          </View>
          <View style={styles.recipeContainer}>
            <Font500 style={styles.recipeLabel}>{"Recipe Name :  "}</Font500>
            <Font700 style={styles.recipeValue}>
              {ItemData?.recipe_name}
            </Font700>
            <TouchableOpacity onPress={onRecipeModalOPen}>
              <Image
                style={styles.infoIcon}
                resizeMode="contain"
                source={images.info}
              />
            </TouchableOpacity>
          </View>
          {ItemData?.status === "pending" && (
            <View>
              <DropDown
                ref={machine}
                rootStyle={styles.inputContainer}
                data={machineListing}
                label="Machine"
              />
              {/* <Input
                ref={date}
                rightIcon={images.date}
                label="Date (DD-MM-YYYY)"
                config={{ editable: false }}
                rightIconStyle={styles.dateIcon}
                rootStyle={styles.inputContainer}
                default_value={moment().format("DD-MM-YYYY")}
              /> */}

              <Font500 style={styles.datelabel}>Date (DD-MM-YYYY)</Font500>
              <TouchableOpacity
                style={styles.dateContainer}
                onPress={openDatePicker}
              >
                <Font400 style={styles.dateText}>{date}</Font400>
              </TouchableOpacity>
              {/* DatePickerModel component */}
              <DatePickerModel
                ref={datePickerRef}
                onConfirm={handleConfirm}
                onClose={handleClose}
              />

              <View style={styles.siftContainer}>
                <Font500 style={styles.siftLabel}>{"Shift"}</Font500>
                <View style={styles.siftSubContainer}>
                  <Pressable
                    onPress={() => setSelectedSift(Sift.DAY)}
                    style={[
                      selectedSift === Sift.DAY
                        ? styles.selectedSift
                        : styles.sift
                    ]}
                  >
                    <Image
                      tintColor={
                        selectedSift === Sift.DAY
                          ? colors?.white
                          : colors?.color_0B2624
                      }
                      source={images.day}
                      resizeMode="contain"
                      style={styles.siftIcon}
                    />
                    <Font500
                      style={[
                        selectedSift === Sift.DAY
                          ? styles?.selectedSiftValue
                          : styles?.siftValue
                      ]}
                    >
                      {Sift.DAY}
                    </Font500>
                  </Pressable>
                  <Pressable
                    onPress={() => setSelectedSift(Sift.NIGHT)}
                    style={[
                      selectedSift === Sift.NIGHT
                        ? styles.selectedSift
                        : styles.sift
                    ]}
                  >
                    <Image
                      tintColor={
                        selectedSift === Sift.NIGHT
                          ? colors?.white
                          : colors?.color_0B2624
                      }
                      source={images.night}
                      resizeMode="contain"
                      style={styles.siftIcon}
                    />
                    <Font500
                      style={[
                        selectedSift === Sift.NIGHT
                          ? styles?.selectedSiftValue
                          : styles?.siftValue
                      ]}
                    >
                      {Sift.NIGHT}
                    </Font500>
                  </Pressable>
                </View>
              </View>

              <View style={styles.unitContainer}>
                <Input
                  ref={qty}
                  keyboardType="number-pad"
                  config={{ placeholder: "100 KG" }}
                  rootStyle={[styles.unitInput]}
                  label="Qty"
                />
                <Input
                  ref={size}
                  keyboardType="number-pad"
                  config={{ placeholder: "28”" }}
                  rootStyle={[styles.unitInput]}
                  label="Size"
                />
              </View>
              <View style={styles.pending}>
                <Font500 style={styles.pendingMedium}>
                  {ItemData?.pending_bundle_qty + " KG"}
                </Font500>
                <Font400 style={styles.pendingRegular}>{" Pending"}</Font400>
              </View>
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
                <Font700 style={[styles.value, { width: wp("20%")}]}>
                  {completedqty}
                </Font700>
              </View>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Remaining : "}</Font500>
                <Font700 style={[styles.value, { width: wp("20%") }]}>
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
            //     <ExtrudersItems
            //       onPress={onNavigateExtruderAddCompletedOrder}
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
                { backgroundColor: colors.red }
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
      <RecipeModal
        title={"Recipe"}
        subTitle={"Show Length?"}
        Item={ItemData}
        ref={recipeModel}
        onPress={onRecipeModalOPen}
      />
    </View>
  );
};

export default memo(ExtruderAddCompletedOrder);

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
  label: {
    fontSize: 14,
    color: colors.color_777777
  },
  value: { fontSize: 14, color: colors.color_0B2624 },
  line: {
    height: 1,
    backgroundColor: colors.color_E8DBDF
  },
  recipeContainer: {
    marginTop: 25,
    borderRadius: 12,
    marginBottom: 9,
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 13,
    backgroundColor: colors.color_D5E4E3
  },
  recipeLabel: {
    fontSize: 14,
    color: colors.color_777777
  },
  recipeValue: {
    fontSize: 14,
    color: colors.color_0B2624,
    flex: 1
  },
  inputContainer: {
    marginTop: 16
  },
  dateIcon: {
    height: 24,
    width: 24
  },
  infoIcon: {
    height: 28,
    width: 28
  },
  siftContainer: {
    marginTop: 14
  },
  siftLabel: {
    fontSize: 14,
    marginBlock: 13
  },
  siftSubContainer: {
    flexDirection: "row"
  },
  selectedSift: {
    height: 41,
    marginRight: 20,
    borderRadius: 6,
    borderWidth: 1,
    paddingRight: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderColor: colors.color_22534F,
    backgroundColor: colors.color_22534F
  },
  sift: {
    height: 41,
    marginRight: 20,
    borderRadius: 6,
    borderWidth: 1,
    paddingRight: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderColor: colors.color_0B2624,
    backgroundColor: colors.white
  },
  siftIcon: {
    height: 20,
    width: 20
  },
  selectedSiftValue: {
    fontSize: 14,
    color: colors.white
  },
  siftValue: {
    fontSize: 14,
    color: colors.color_0B2624
  },
  unitContainer: {
    marginTop: 33,
    flexDirection: "row"
  },
  unitInput: {
    flex: 1,
    marginRight: 9
  },
  pending: {
    paddingLeft: 12,
    paddingTop: 7,
    alignItems: "center",
    flexDirection: "row"
  },
  pendingMedium: {
    fontSize: 14,
    color: colors?.color_22534F
  },
  pendingRegular: {
    fontSize: 14,
    color: colors?.color_777777
  },
  buttonView: {
    flexDirection: "row",
    marginBottom: hp("6%"),
    justifyContent: "space-between",
    paddingHorizontal: wp("6%")
  },
  button: {
    flex: 1,
    // marginHorizontal: wp("6%"),
    // marginBottom: hp("6.5%")
    // width: wp("42%"),
    paddingHorizontal: wp("1%"),
    marginHorizontal: wp("0.5%")
  },
  buttonIcon: { height: 28, width: 28 },
  buttonText: {
    fontSize: wp("4%"),
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
  /////
  detailContainerOrder: {
    flexDirection: "row",
    paddingHorizontal: 13,
    marginVertical: 5
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
