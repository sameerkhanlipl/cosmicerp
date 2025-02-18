// import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
// import moment from 'moment';
// import React, {memo, useCallback, useRef, useState} from 'react';
// import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
// import {packing_set_order_complete} from '../../api/apis';
// import {packing_set_order_complete_body} from '../../api/BodyTypes';
// import {packing_complete_orders_response} from '../../api/ResponseTypes';
// import {images} from '../../assets/images';
// import {Font500, Font700} from '../../components/fonts/Fonts';
// import Button from '../../components/styles/Button';
// import CommonHeader from '../../components/styles/CommonHeader';
// import Input, {InputRef} from '../../components/styles/Input';
// import {colors} from '../../constants/colors';
// import {fontFamily} from '../../constants/fontFamily';
// import {AppNavigationProp, AppStackParamList} from '../../stacks/StackTypes';
// import {checkInput} from '../../utils/CheckInput';
// import {error, ShowToast} from '../../utils/ErrorHandler';

// type PackingAddCompletedOrderRouteProp = RouteProp<
//   AppStackParamList,
//   'PackingAddCompletedOrder'
// >;

// enum Step {
//   YES = 'Yes',
//   NO = 'No',
// }

// const PackingAddCompletedOrder = () => {
//   const route = useRoute<PackingAddCompletedOrderRouteProp>();

//   const ItemData = route?.params?.data;

//   const {goBack} = useNavigation<AppNavigationProp>();

//   const [selectedStep, setSelectedStep] = useState<Step>(Step.YES);
//   const [loader, setLoader] = useState(false);

//   const labour = useRef<InputRef>(null);
//   const date = useRef<InputRef>(null);
//   const bags = useRef<InputRef>(null);
//   const steping_required = useRef<InputRef>(null);

//   const onCompleteOrderHandler = useCallback(async () => {
//     if (
//       checkInput(labour?.current?.get(), 'Labour Require for complete order')
//     ) {
//       return;
//     }

//     if (checkInput(bags?.current?.get(), 'Bags Require for complete order')) {
//       return;
//     }

//     if (
//       checkInput(
//         steping_required?.current?.get(),
//         'Steping Require for complete order',
//       )
//     ) {
//       return;
//     }

//     const body: packing_set_order_complete_body = {
//       packing_production_order_id: ItemData?.packing_production_order_id,
//       labour_name: labour?.current?.get(),
//       date: date?.current?.get(),
//       steping_required: steping_required?.current?.get(),
//       bags_per_box_qty: bags?.current?.get(),
//     };

//     try {
//       setLoader(true);
//       const response: {data: packing_complete_orders_response} =
//         await packing_set_order_complete(body);
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
//       <CommonHeader title="Packing Orders" />
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollRoot}>
//         <View style={styles.container}>
//           <Font500 style={styles.orderId}>{ItemData.order_id}</Font500>
//           <View style={styles.detail}>
//             <View style={styles.detailContainer}>
//               <View style={styles.detailSubContainer}>
//                 <Font500 style={styles.label}>{'Product Name : '}</Font500>
//                 <Font700 style={styles.value}>{ItemData?.packing_name}</Font700>
//               </View>
//             </View>
//             <View style={styles.line} />
//             <View style={styles.detailContainer}>
//               <View style={styles.detailSubContainer}>
//                 <Font500 style={styles.label}>{'P. Type : '}</Font500>
//                 <Font700 style={styles.value}>{'14X280'}</Font700>
//               </View>
//               <View style={styles.detailSubContainer}>
//                 <Font500 style={styles.label}>{'Colors : '}</Font500>
//                 <Font700 style={styles.value}>{ItemData?.color}</Font700>
//               </View>
//             </View>
//             <View style={styles.line} />
//             <View style={styles.detailContainer}>
//               <View style={styles.detailSubContainer}>
//                 <Font500 style={styles.label}>{'P. Name : '}</Font500>
//                 <Font700 style={styles.value}>{'ABC'}</Font700>
//               </View>
//               <View style={styles.detailSubContainer}>
//                 <Font500 style={styles.label}>{'Width : '}</Font500>
//                 <Font700 style={styles.value}>{ItemData?.width}</Font700>
//               </View>
//             </View>
//             <View style={styles.line} />
//             <View style={styles.detailContainer}>
//               <View style={styles.detailSubContainer}>
//                 <Font500 style={styles.label}>{'Carton : '}</Font500>
//                 <Font700 style={styles.value}>{'5'}</Font700>
//               </View>
//               <View style={styles.detailSubContainer}>
//                 <Font500 style={styles.label}>{'Length : '}</Font500>
//                 <Font700 style={styles.value}>{ItemData?.length}</Font700>
//               </View>
//             </View>
//             <View style={styles.line} />
//             <View style={styles.detailContainer}>
//               <View style={styles.detailSubContainer}>
//                 <Font500 style={styles.label}>{'Sticker : '}</Font500>
//                 <Font700 style={styles.value}>{'YES'}</Font700>
//               </View>
//               <View style={styles.detailSubContainer}>
//                 <Font500 style={styles.label}>{'Rolls : '}</Font500>
//                 <Font700 style={styles.value}>{'100'}</Font700>
//               </View>
//             </View>
//             <View style={styles.line} />
//             <View style={styles.detailContainer}>
//               <View style={styles.detailSubContainer}>
//                 <Font500 style={styles.label}>{'Pipe : '}</Font500>
//                 <Font700 style={styles.value}>{'14x208'}</Font700>
//               </View>
//               <View style={styles.detailSubContainer}>
//                 <Font500 style={styles.label}>{'Bharati : '}</Font500>
//                 <Font700 style={styles.value}>{'30'}</Font700>
//               </View>
//             </View>
//             <Button
//               icon={images.print}
//               iconStyle={{height: 28, width: 28}}
//               buttonTextStyle={styles.printButtonText}
//               buttonContainerStyle={styles.printButton}>
//               {'Print'}
//             </Button>
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
//           <Input
//             ref={bags}
//             config={{placeholder: '2'}}
//             rootStyle={styles.inputContainer}
//             label="Bags/Box Qty"
//           />

//           <View style={styles.stepContainer}>
//             <Font500 style={styles.stepLabel}>{'STEPING REQUIRED'}</Font500>
//             <View style={styles.stepSubContainer}>
//               <Pressable
//                 onPress={() => setSelectedStep(Step.YES)}
//                 style={[
//                   selectedStep === Step.YES ? styles.selectedStep : styles.step,
//                 ]}>
//                 <Font500
//                   style={[
//                     selectedStep === Step.YES
//                       ? styles?.selectedStepValue
//                       : styles?.stepValue,
//                   ]}>
//                   {Step.YES}
//                 </Font500>
//               </Pressable>
//               <Pressable
//                 onPress={() => setSelectedStep(Step.NO)}
//                 style={[
//                   selectedStep === Step.NO ? styles.selectedStep : styles.step,
//                 ]}>
//                 <Font500
//                   style={[
//                     selectedStep === Step.NO
//                       ? styles?.selectedStepValue
//                       : styles?.stepValue,
//                   ]}>
//                   {Step.NO}
//                 </Font500>
//               </Pressable>
//             </View>
//           </View>

//           <Input
//             ref={steping_required}
//             config={{placeholder: 'Steping Required'}}
//             rootStyle={styles.inputContainer}
//             label="Remarks"
//           />
//         </View>
//         <Button
//           loader={loader}
//           icon={images.complete}
//           iconStyle={styles.buttonIcon}
//           onPress={onCompleteOrderHandler}
//           buttonTextStyle={styles.buttonText}
//           buttonContainerStyle={styles.button}>
//           {'Save'}
//         </Button>
//       </ScrollView>
//     </View>
//   );
// };

// export default memo(PackingAddCompletedOrder);

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
//   printButton: {
//     marginTop: 26,
//     borderWidth: 1,
//     marginBottom: 19,
//     marginHorizontal: 16,
//     borderColor: colors.color_22534F,
//     backgroundColor: colors.color_F4F8F7,
//   },
//   printButtonText: {
//     color: colors.color_22534F,
//     paddingHorizontal: 6,
//     fontFamily: fontFamily.Font500,
//   },
//   inputContainer: {
//     marginTop: 16,
//   },
//   stepContainer: {
//     marginTop: 14,
//   },
//   stepLabel: {
//     fontSize: 14,
//     marginBlock: 13,
//   },
//   stepSubContainer: {
//     flexDirection: 'row',
//   },
//   selectedStep: {
//     height: 37,
//     width: 100,
//     marginRight: 20,
//     borderRadius: 6,
//     borderWidth: 1,
//     paddingRight: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//     borderColor: colors.color_22534F,
//     backgroundColor: colors.color_22534F,
//   },
//   step: {
//     height: 37,
//     width: 100,
//     marginRight: 20,
//     borderRadius: 6,
//     borderWidth: 1,
//     paddingRight: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//     borderColor: colors.color_0B2624,
//     backgroundColor: colors.white,
//   },
//   stepIcon: {
//     height: 20,
//     width: 20,
//   },
//   selectedStepValue: {
//     fontSize: 14,
//     color: colors.white,
//   },
//   stepValue: {
//     fontSize: 14,
//     color: colors.color_0B2624,
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
import moment from "moment";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  Alert,
  TouchableOpacity
} from "react-native";
import {
  packing_delete_order,
  packing_order_history,
  packing_set_make_order_complete,
  packing_set_order_complete
} from "../../api/apis";
import {
  packing_delete_order_body,
  packing_order_history_body,
  packing_set_make_order_complete_body,
  packing_set_order_complete_body
} from "../../api/BodyTypes";
import {
  packing_complete_orders_response,
  packing_delete_orders_response,
  packing_make_complete_orders_response,
  packing_order_history_listing_response
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
import { error, ShowToast } from "../../utils/ErrorHandler";
import EmptyList from "../../components/styles/EmptyList";
import PackingOrderHistoryItems, {
  PackingOrderHistoryItemType
} from "./PackingOrderHistoryItems";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import PrintModal, { PrintModalRef } from "../../components/model/PrintModal";
import DatePickerModel, {
  DatePickerModelRef
} from "../../components/model/DatePickerModel";

type PackingAddCompletedOrderRouteProp = RouteProp<
  AppStackParamList,
  "PackingAddCompletedOrder"
>;

enum Step {
  YES = "Yes",
  NO = "No"
}

const PackingAddCompletedOrder = () => {
  const route = useRoute<PackingAddCompletedOrderRouteProp>();

  const ItemData = route?.params?.data;

  const { goBack } = useNavigation<AppNavigationProp>();
  const [selectedStep, setSelectedStep] = useState<Step>(Step.YES);

  const [loader, setLoader] = useState(false);
  const [completedqty, setCompletedQty] = useState<any>("");
  const [remaningqty, setRemanigQty] = useState<any>("");

  const labour = useRef<InputRef>(null);
  // const date = useRef<InputRef>(null);
  const bags = useRef<InputRef>(null);
  const steping_required = useRef<InputRef>(null);
  const remark = useRef<InputRef>(null);
  const onCompleteOrderHandler = async () => {
    if (
      checkInput(labour?.current?.get(), "Labour Require for complete order")
    ) {
      return;
    }

    if (checkInput(bags?.current?.get(), "Bags Require for complete order")) {
      return;
    }
    if (checkInput(selectedStep, "Steping Require for complete order")) {
      return;
    }

    if (
      checkInput(remark?.current?.get(), "Remark Require for complete order")
    ) {
      return;
    }
    const new_date = datePickerRef.current?.value();
    const final_date = moment(new_date).format("DD-MM-YYYY");
    const body: packing_set_order_complete_body = {
      packing_production_order_id: ItemData?.packing_production_order_id,
      labour_name: labour?.current?.get(),
      date: final_date,
      steping_required: selectedStep,
      bags_per_box_qty: bags?.current?.get(),
      remark: remark?.current?.get()
    };
    console.log("bodyyy", body);

    try {
      setLoader(true);
      const response: { data: packing_complete_orders_response } =
        await packing_set_order_complete(body);
      labour?.current?.set("");
      bags?.current?.set("");
      remark?.current?.set("");

      await getList();
      ShowToast(response?.data?.message);
      if (response?.data?.data?.status === "completed") {
        goBack();
      }
      //  goBack();
      setLoader(false);
    } catch (err) {
      setLoader(false);
      error(err);
    } finally {
      setLoader(false);
    }
  };

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
            labour?.current?.get(),
            "Labour Require for complete order"
          ) ||
          checkInput(bags?.current?.get(), "Bags Require for complete order") ||
          checkInput(selectedStep, "Steping Require for complete order")
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
    const body: packing_set_make_order_complete_body = {
      packing_production_order_id: ItemData?.packing_production_order_id
    };
    console.log("body : ", body);
    try {
      setLoader(true);
      const response: { data: packing_make_complete_orders_response } =
        await packing_set_make_order_complete(body);
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

  const [list, setList] = useState<PackingOrderHistoryItemType[]>([]);

  const [refresh, setRefresh] = useState<boolean>(false);

  const focus = useIsFocused();

  const getList = useCallback(async () => {
    const body: packing_order_history_body = {
      packing_production_order_id: ItemData?.packing_production_order_id
    };

    try {
      setLoader(true);
      const response: { data: packing_order_history_listing_response } =
        await packing_order_history(body);

      setList(response?.data?.data);
      setCompletedQty(response?.data?.required_qty);
      setRemanigQty(response?.data?.remaining);

      if (response?.data?.data) {
        const first_item = response?.data?.data[0];
        const first_step = first_item?.steping_required;
     
        if (first_step === "Yes") {
          setSelectedStep(Step.YES);
        } else if (first_step === "No") setSelectedStep(Step.NO);
      } else {
        console.log("");
      }

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
    const body: packing_order_history_body = {
      packing_production_order_id: ItemData?.packing_production_order_id
    };

    try {
      setRefresh(true);
      const response: { data: packing_order_history_listing_response } =
        await packing_order_history(body);
      setList(response?.data?.data);

      setLoader(false);
    } catch (err: any) {
      setRefresh(false);
      error(err);
    } finally {
      setRefresh(false);
    }
  }, [ItemData, setRefresh]);

  const onDeleteOrderHandler = async (id: any) => {
    const body: packing_delete_order_body = {
      id: id
    };
    console.log("body : ", body);
    try {
      setLoader(true);
      const response: { data: packing_delete_orders_response } =
        await packing_delete_order(body);
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
    ({ item }: { item: PackingOrderHistoryItemType }) => {
      return (
        <PackingOrderHistoryItems
          data={item}
          onDelete={() => showAlertAndCallFunction("Delete", item.id)}
          status={ItemData?.status}
          ItemData={ItemData}
        />
      );
    },
    [onDeleteOrderHandler]
  );

  const printModel = useRef<PrintModalRef>(null);

  const onPrintModalOPen = useCallback(() => {
    printModel?.current?.open();
  }, []);

  const ItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

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

  return (
    <View style={styles.root}>
      <CommonHeader title="Packing Orders" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollRoot}
      >
        <View style={styles.container}>
          <Font500 style={styles.orderId}>{ItemData.serial_number}</Font500>
          {ItemData?.packing_internal_notes && (
            <View style={styles.detail}>
              <View style={styles.remarkContainer}>
                <Font500 style={styles.label}>{"Remark : "}</Font500>
                <Font700 style={styles.remarkvalue}>
                  {ItemData?.packing_internal_notes}
                </Font700>
              </View>
            </View>
          )}
          <View style={styles.detail}>
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Product Name : "}</Font500>
                <Font700 style={[styles.value, { width: wp("45%") }]}>
                  {ItemData?.product_name}
                </Font700>
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
                <Font500 style={styles.label}>{"Colors : "}</Font500>
                <Font700 style={styles.value}>{ItemData?.color}</Font700>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{`Bundles\n(Bag/Box): `}</Font500>
                <Font700 style={styles.value}>
                  {ItemData?.qty_in_bags_per_box}
                </Font700>
              </View>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"P. Type : "}</Font500>
                <Font700 style={styles.value}>
                  {ItemData?.sticching_packing_type}
                </Font700>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
              {/* <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"P. Name : "}</Font500>
                <Font700 style={styles.value}>{ItemData?.packing_name}</Font700>
              </View> */}

              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Width : "}</Font500>
                <Font700 style={styles.value}>{ItemData?.width}</Font700>
              </View>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Length : "}</Font500>
                <Font700 style={styles.value}>{ItemData?.length}</Font700>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Gauge : "}</Font500>
                <Font700 style={styles.value}>{ItemData?.gage}</Font700>
              </View>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Bharti : "}</Font500>
                <Font700 style={styles.value}>
                  {ItemData?.packing_bharti}
                </Font700>
              </View>
            </View>

            <View style={styles.line} />
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Rolls : "}</Font500>
                <Font700 style={styles.value}>{ItemData?.rolls}</Font700>
              </View>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Pipe : "}</Font500>
                <Font700 style={styles.value}>{ItemData?.pipe_size}</Font700>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Sticker : "}</Font500>
                <Font700 style={[styles.value, { width: wp("60%") }]}>
                  {ItemData?.sticker_name}
                </Font700>
              </View>
            </View>
            <View style={styles.line} />

            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Outer Name : "}</Font500>
                <Font700 style={[styles.value, { width: wp("50%") }]}>
                  {ItemData?.outer_name}
                </Font700>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{"Carton : "}</Font500>
                <Font700 style={[styles.value, { width: wp("60%") }]}>
                  {ItemData?.packing_carton}
                </Font700>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>
                  {`Packing\nMarital Name : `}
                </Font500>
                <Font700 style={[styles.value, { width: wp("50%") }]}>
                  {ItemData?.material_name}
                </Font700>
              </View>
            </View>
            {/* <View style={styles.line} />
            <Button
              icon={images.print}
              iconStyle={{ height: 28, width: 28 }}
              buttonTextStyle={styles.printButtonText}
              buttonContainerStyle={styles.printButton}
              onPress={onPrintModalOPen}
            >
              {"Print"}
            </Button> */}
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
              <Input
                ref={bags}
                keyboardType="number-pad"
                config={{ placeholder: "2" }}
                rootStyle={styles.inputContainer}
                label="Bags/Box Qty"
              />

              <View style={styles.stepContainer}>
                <Font500 style={styles.stepLabel}>
                  {"STRAPPING REQUIRED"}
                </Font500>
                <View style={styles.stepSubContainer}>
                  <Pressable
                    onPress={() =>
                      remaningqty === completedqty
                        ? setSelectedStep(Step.YES)
                        : ""
                    }
                    style={[
                      selectedStep === Step.YES
                        ? styles.selectedStep
                        : styles.step
                    ]}
                  >
                    <Font500
                      style={[
                        selectedStep === Step.YES
                          ? styles?.selectedStepValue
                          : styles?.stepValue
                      ]}
                    >
                      {Step.YES}
                    </Font500>
                  </Pressable>
                  <Pressable
                    onPress={() =>
                      remaningqty === completedqty
                        ? setSelectedStep(Step.NO)
                        : ""
                    }
                    style={[
                      selectedStep === Step.NO
                        ? styles.selectedStep
                        : styles.step
                    ]}
                  >
                    <Font500
                      style={[
                        selectedStep === Step.NO
                          ? styles?.selectedStepValue
                          : styles?.stepValue
                      ]}
                    >
                      {Step.NO}
                    </Font500>
                  </Pressable>
                </View>
                {remaningqty === completedqty && (
                  <Font500 style={styles.strapping_label}>
                    {
                      "First-order strapping will be set for all further orders*"
                    }
                  </Font500>
                )}
              </View>

              <Input
                ref={remark}
                config={{ placeholder: "Remark Required" }}
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
            <View style={styles.detailContainerOrder}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>
                  {"Strapping Required : "}
                </Font500>
                <Font700 style={styles.value}>{selectedStep}</Font700>
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
            //     <PackingItems
            //       onPress={onNavigatePackingAddCompletedOrder}
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
          {remaningqty !== completedqty && (
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
      <PrintModal
        title={"Print"}
        subTitle={"Show Length?"}
        item={ItemData}
        ref={printModel}
        onPress={onPrintModalOPen}
      />
    </View>
  );
};

export default memo(PackingAddCompletedOrder);

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
    // justifyContent:'space-between'
  },
  remarkContainer: {
    paddingHorizontal: 13,
    paddingVertical: 10
  },
  detailSubContainer: {
    width: wp("42%"),
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
  strapping_label: {
    fontSize: 12,
    color: colors.red,
    marginBlock: 8
  },
  remarkvalue: { fontSize: 14, color: colors.color_0B2624 },
  value: { fontSize: 14, color: colors.color_0B2624, width: wp("25%") },
  line: {
    height: 1,
    backgroundColor: colors.color_E8DBDF
  },
  printButton: {
    marginTop: 26,
    borderWidth: 1,
    marginBottom: 19,
    marginHorizontal: 16,
    borderColor: colors.color_22534F,
    backgroundColor: colors.color_F4F8F7
  },
  printButtonText: {
    color: colors.color_22534F,
    paddingHorizontal: 6,
    fontFamily: fontFamily.Font500
  },
  inputContainer: {
    marginTop: 16
  },
  stepContainer: {
    marginTop: 14
  },
  stepLabel: {
    fontSize: 14,
    marginBlock: 8
  },
  stepSubContainer: {
    flexDirection: "row"
  },
  selectedStep: {
    height: 37,
    width: 100,
    marginRight: 20,
    borderRadius: 6,
    borderWidth: 1,
    paddingRight: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    borderColor: colors.color_22534F,
    backgroundColor: colors.color_22534F
  },
  step: {
    height: 37,
    width: 100,
    marginRight: 20,
    borderRadius: 6,
    borderWidth: 1,
    paddingRight: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    borderColor: colors.color_0B2624,
    backgroundColor: colors.white
  },
  stepIcon: {
    height: 20,
    width: 20
  },
  selectedStepValue: {
    fontSize: 14,
    color: colors.white
  },
  stepValue: {
    fontSize: 14,
    color: colors.color_0B2624
  },
  buttonView: {
    flexDirection: "row",
    marginBottom: hp("6%"),
    justifyContent: "space-between",
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
    fontSize: wp("4%"),
    paddingHorizontal: 6,
    fontFamily: fontFamily.Font500
  },
  ///
  list: { flexGrow: 1 },
  orderHistory: {
    fontSize: 18,
    marginBottom: 20
  },
  itemSeparator: { height: 20 },
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
