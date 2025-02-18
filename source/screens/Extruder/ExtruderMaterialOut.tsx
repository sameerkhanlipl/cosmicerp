import React, { memo, useCallback, useState } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  View
} from "react-native";
import { images } from "../../assets/images";
import { Font500 } from "../../components/fonts/Fonts";
import Button from "../../components/styles/Button";
import CommonHeader from "../../components/styles/CommonHeader";
import Input from "../../components/styles/Input";
import { colors } from "../../constants/colors";
import { fontFamily } from "../../constants/fontFamily";
import ExtruderMaterialOutItems, {
  ExtruderMaterialOutItemType
} from "./ExtruderMaterialOutItems";

const ListHeaderComponent = () => (
  <Font500 style={styles.listHeaderTitle}>{"List of Material Out"}</Font500>
);

const ItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

const ExtruderMaterialOut = () => {
  const [list] = useState<ExtruderMaterialOutItemType[]>([
    {
      date: new Date()?.toString(),
      category: "HM",
      product: "Asrene5205",
      bags: 10
    },
    {
      date: new Date()?.toString(),
      category: "HM",
      product: "Asrene5205",
      bags: 10
    },
    {
      date: new Date()?.toString(),
      category: "HM",
      product: "Asrene5205",
      bags: 10
    },
    {
      date: new Date()?.toString(),
      category: "HM",
      product: "Asrene5205",
      bags: 10
    },
    {
      date: new Date()?.toString(),
      category: "HM",
      product: "Asrene5205",
      bags: 10
    }
  ]);

  const renderItemHandler = useCallback(
    ({ item }: { item: ExtruderMaterialOutItemType }) => (
      <ExtruderMaterialOutItems data={item} />
    ),
    []
  );

  return (
    <View style={styles.root}>
      <CommonHeader title={"Extruder - Material Type"} />
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Input label="Date" rootStyle={styles.input} />
          <Input label="Machine" rootStyle={styles.input} />
          <Input label="Material Type" rootStyle={styles.input} />
          <Input label="Sub-Category" rootStyle={styles.input} />
          <View style={styles.inputContainer}>
            <Input
              label="Bags"
              rootStyle={[
                styles.input,
                { width: Dimensions.get("window").width / 2 - 34 }
              ]}
            />
            <Input
              label="KG"
              rootStyle={[
                styles.input,
                { width: Dimensions.get("window").width / 2 - 34 }
              ]}
            />
          </View>
          <Button
            icon={images.complete}
            iconStyle={styles.buttonIcon}
            buttonTextStyle={styles.buttonText}
            buttonContainerStyle={styles.button}
          >
            {"Save"}
          </Button>
        </View>
        <FlatList
          data={list}
          scrollEnabled={false}
          renderItem={renderItemHandler}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={ListHeaderComponent}
          ItemSeparatorComponent={ItemSeparatorComponent}
          keyExtractor={(_, index: number) => index?.toString()}
        />
      </ScrollView>
    </View>
  );
};

export default memo(ExtruderMaterialOut);

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  container: {
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 24,
    backgroundColor: colors.color_F4F8F7
  },
  input: {
    marginTop: 20
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  buttonIcon: { height: 28, width: 28 },
  button: {
    marginTop: 36
  },
  buttonText: {
    fontSize: 16,
    paddingHorizontal: 6,
    fontFamily: fontFamily.Font500
  },
  listHeaderTitle: {
    fontSize: 18,
    marginBottom: 21
  },
  list: {
    padding: 24,
    paddingBottom: 100,
    borderTopWidth: 1,
    borderColor: colors.color_D5E4E3
  },
  itemSeparator: {
    height: 20
  }
});

// import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
// import {Dimensions, FlatList, ScrollView, StyleSheet, View} from 'react-native';
// import {images} from '../../assets/images';
// import {Font500} from '../../components/fonts/Fonts';
// import Button from '../../components/styles/Button';
// import CommonHeader from '../../components/styles/CommonHeader';
// import Input, { InputRef } from '../../components/styles/Input';
// import {colors} from '../../constants/colors';
// import {fontFamily} from '../../constants/fontFamily';
// import ExtruderMaterialOutItems, {
//   ExtruderMaterialOutItemType,
// } from './ExtruderMaterialOutItems';
// import DropDown, { DropDownRef, DropDownType } from '../../components/styles/DropDown';
// import { LaminationMaterialOutItemType } from '../Lamination/LaminationMaterialOutItems';
// import moment from 'moment';
// import { get_unit_label_response, material_name_listing_response, material_out_listing_response, material_out_response, material_type_listing_response, sub_categories_listing_response } from '../../api/ResponseTypes';
// import { get_material_name_listing, get_material_sub_categories_listing, get_material_type_listing, get_unit_label, material_out, material_out_listing } from '../../api/apis';
// import { error, ShowToast } from '../../utils/ErrorHandler';
// import { material_out_body } from '../../api/BodyTypes';
// import { checkInput } from '../../utils/CheckInput';
// import { useSelector } from 'react-redux';
// import {RootState} from '../../store/store';

// const ListHeaderComponent = () => (

  
//   <Font500 style={styles.listHeaderTitle}>{'List of Material Out'}</Font500>
// );

// const ItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

// const ExtruderMaterialOut = () => {
//   const user = useSelector((state: RootState) => state?.app?.user);
//   const date = useRef<InputRef>(null);
//   const materialType = useRef<DropDownRef>(null);
//   const subCategory = useRef<DropDownRef>(null);
//   const materialName = useRef<DropDownRef>(null);
//     const unit_1 = useRef<InputRef>(null);
//     const unit_2 = useRef<InputRef>(null);

//     const [unit1Label, setUnit1Label] = useState<string | undefined>('');
//     const [unit2Label, setUnit2Label] = useState<string | undefined>('');

//   const [list, setList] = useState<ExtruderMaterialOutItemType[]>([]);

//     const [listOfMaterialTypes, setListOfMaterialTypes] = useState<
//       DropDownType[] | []
//     >([]);

//     const [selectedMaterialTypes, setSelectedMaterialTypes] = useState<
//       DropDownType | undefined
//     >();

//     const [listOfSubCategory, setListOfSubCategory] = useState<
//       DropDownType[] | []
//     >([]);

//     const [selectedSubCategory, setSelectedSubCategory] = useState<
//       DropDownType | undefined
//     >();

//     const [listOfMaterialName, setListOfMaterialName] = useState<
//       DropDownType[] | []
//     >([]);

//     const [selectedMaterialName, setSelectedMaterialName] = useState<
//       DropDownType | undefined
//     >();

//   // const [list] = useState<ExtruderMaterialOutItemType[]>([
//   //   {
//   //     date: new Date()?.toString(),
//   //     category: 'HM',
//   //     product: 'Asrene5205',
//   //     bags: 10,
//   //   },
//   //   {
//   //     date: new Date()?.toString(),
//   //     category: 'HM',
//   //     product: 'Asrene5205',
//   //     bags: 10,
//   //   },
//   //   {
//   //     date: new Date()?.toString(),
//   //     category: 'HM',
//   //     product: 'Asrene5205',
//   //     bags: 10,
//   //   },
//   //   {
//   //     date: new Date()?.toString(),
//   //     category: 'HM',
//   //     product: 'Asrene5205',
//   //     bags: 10,
//   //   },
//   //   {
//   //     date: new Date()?.toString(),
//   //     category: 'HM',
//   //     product: 'Asrene5205',
//   //     bags: 10,
//   //   },
//   // ]);

//    const [loader, setLoader] = useState(false);
//     const [refresh, setRefresh] = useState(false);

//     const getListOfFields = useCallback(async () => {
//       try {
//         setLoader(true);
//         const response: {data: material_type_listing_response} =
//           await get_material_type_listing();
//         setListOfMaterialTypes(
//           response?.data?.data?.map(
//             (ele: {id: number | string; name: string}): DropDownType => ({
//               title: ele?.name,
//               value: ele?.id?.toString(),
//             }),
//           ),
//         );
//         setLoader(false);
//       } catch (err: any) {
//         setLoader(false);
//         error(err);
//       } finally {
//         setLoader(false);
//       }
//     }, []);

//     useEffect(() => {
//       getListOfFields();
//     }, [getListOfFields]);

//     const getListOfMaterialSubCategoriesByCategoryId = useCallback(async () => {
//       try {
//         setLoader(true);
//         const response: {
//           data: sub_categories_listing_response;
//         } = await get_material_sub_categories_listing({
//           parent_category_id: selectedMaterialTypes?.value,
//         });

//         // setListOfSubCategory(
//         //   response?.data?.data?.map(
//         //     (ele: {id: number | string; sub_cat_name: string}) => {
//         //       return {title: ele?.sub_cat_name, value: ele?.id?.toString()};
//         //     },
//         //   ),
//         // );
//         setListOfSubCategory(
//           response?.data?.data
//             ?.filter((ele: {sub_cat_name: string}) =>
//               ['Paper Reel', 'Lamination Film', 'Gum'].includes(ele.sub_cat_name)
//             )
//             .map((ele: {id: number | string; sub_cat_name: string}) => {
//               return {title: ele?.sub_cat_name, value: ele?.id?.toString()};
//             })
//         );

//         setLoader(false);
//       } catch (err: any) {
//         setLoader(false);
//       } finally {
//         setLoader(false);
//       }
//     }, [selectedMaterialTypes]);

//     useEffect(() => {
//       if (selectedMaterialTypes) {
//         getListOfMaterialSubCategoriesByCategoryId();
//       }
//     }, [selectedMaterialTypes, getListOfMaterialSubCategoriesByCategoryId]);

//     const getListOfMaterialName = useCallback(async () => {
//       try {
//         setLoader(true);
//         const response: {
//           data: material_name_listing_response;
//         } = await get_material_name_listing({
//           parent_category_id: selectedMaterialTypes?.value,
//           sub_category_id: selectedSubCategory?.value,
//         });
//         setListOfMaterialName(
//           response?.data?.data?.map(
//             (ele: {id: number | string; material_name: string}) => {
//               return {title: ele?.material_name, value: ele?.id?.toString()};
//             },
//           ),
//         );

//         setLoader(false);
//       } catch (err: any) {
//         setListOfMaterialName([]);
//         setLoader(false);
//       } finally {
//         setLoader(false);
//       }
//     }, [selectedMaterialTypes, selectedSubCategory]);

//     useEffect(() => {
//       if (selectedSubCategory && selectedMaterialTypes) {
//         getListOfMaterialName();
//       }
//     }, [getListOfMaterialName, selectedMaterialTypes, selectedSubCategory]);




//       const getUnitsLabel = useCallback(async () => {
//         try {
//           setLoader(true);
//           const response: {
//             data: get_unit_label_response;
//           } = await get_unit_label({
//             material_id: selectedMaterialName?.value?.toString(),
//           });
//     console.log("labellll",response?.data)
//           setUnit1Label(response?.data?.unit1Label?.toString());
//           setUnit2Label(response?.data?.unit2Label?.toString());
//           setLoader(false);
//         } catch (err: any) {
//           setListOfMaterialName([]);
//           setLoader(false);
//         } finally {
//           setLoader(false);
//         }
//       }, [selectedMaterialName]);
    
//       useEffect(() => {
//         if (selectedMaterialName) {
//           getUnitsLabel();
//         }
//       }, [getUnitsLabel, selectedMaterialName]);



//         const getList = useCallback(async () => {
//           try {
//             setLoader(true);
//             const response: {data: material_out_listing_response} =
//               await material_out_listing();
//             setList(response?.data?.data);
//             setLoader(false);
//           } catch (err: any) {
//             error(err);
//             setLoader(false);
//           } finally {
//             setLoader(false);
//           }
//         }, []);
      
//         useEffect(() => {
//           getList();
//         }, [getList]);
      
//         const refreshList = useCallback(async () => {
//           try {
//             setRefresh(true);
//             const response: {data: material_out_listing_response} =
//               await material_out_listing();
//             setList(response?.data?.data);
//             setRefresh(false);
//           } catch (err: any) {
//             error(err);
//             setRefresh(false);
//           } finally {
//             setRefresh(false);
//           }
//         }, []);

//   const renderItemHandler = useCallback(
//     ({item}: {item: ExtruderMaterialOutItemType}) => (
//       <ExtruderMaterialOutItems data={item} />
//     ),
//     [],
//   );


//   const onMakeItCompleteHandler = useCallback(async () => {
//     // if (checkInput(machine?.current?.get()?.value, 'Select Machine')) {
//     //   return;
//     // }
//     if (
//       checkInput(materialType?.current?.get()?.value, 'Select Material Type')
//     ) {
//       return;
//     }
//     if (checkInput(subCategory?.current?.get()?.value, 'Select Sub Category')) {
//       return;
//     }
//     if (
//       checkInput(materialName?.current?.get()?.value, 'Select Material Name')
//     ) {
//       return;
//     }
//     if (checkInput(unit_1?.current?.get(), 'Unit 1 is Require ')) {
//       return;
//     }
//     if (
//       unit1Label &&
//       unit2Label?.toString()?.length !== 0 &&
//       checkInput(unit_2?.current?.get(), 'Unit 2 is Require ')
//     ) {
//       return;
//     }

//     setLoader(true);

//     let body: material_out_body = {
//       date: date?.current?.get(),
//       //machine: machine?.current?.get()?.value,
//       machine:"",
//       material_category_type: materialType?.current?.get()?.value,
//       material_sub_category: subCategory?.current?.get()?.value,
//       material_name: materialName?.current?.get()?.value,
//       unit1: unit1Label,
//       unit1_value: unit_1?.current?.get(),
//       user_id: user?.id,
//     };

//     if (unit2Label && unit2Label?.toString()?.length !== 0) {
//       body = {...body, unit2: unit2Label, unit2_value: unit_2?.current?.get()};
//     }

//     try {
//       const response: {data: material_out_response} = await material_out(body);
//      ShowToast(response?.data?.message);
//       unit_1?.current?.set('');
//       unit_2?.current?.set('');
//       refreshList();
//       setLoader(false);
//     } catch (err: any) {
//       setLoader(false);
//       error(err);
//        } finally {
//       setLoader(false);
//     }
//   }, [user, unit1Label, unit2Label, refreshList]);




//   return (
//     <View style={styles.root}>
//       <CommonHeader title={'Extruder - Material Type'} />
//       <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
//         <View style={styles.container}>
//           {/* <Input label="Date" rootStyle={styles.input} />
//           <Input label="Machine" rootStyle={styles.input} />
//           <Input label="Material Type" rootStyle={styles.input} />
//           <Input label="Sub-Category" rootStyle={styles.input} /> */}
//              <Input
//             ref={date}
//             rightIcon={images.date}
//             label="Date (DD-MM-YYYY)"
//             rootStyle={styles.input}
//             config={{editable: false}}
//             rightIconStyle={styles.dateIcon}
//             default_value={moment().format('DD-MM-YYYY')}
//           />
//           {/* <DropDown
//             data={machineListing}
//             ref={machine}
//             label="Machine"
//             rootStyle={styles.input}
//           /> */}
//           <DropDown
//             ref={materialType}
//             label="Material Type"
//             rootStyle={styles.input}
//             data={listOfMaterialTypes}
//             onSelect={setSelectedMaterialTypes}
//           />
//           <DropDown
//             ref={subCategory}
//             label="Sub-Category"
//             rootStyle={styles.input}
//             data={listOfSubCategory}
//             onSelect={setSelectedSubCategory}
//           />
//           <DropDown
//             ref={materialName}
//             label="Material Name"
//             rootStyle={styles.input}
//             data={listOfMaterialName}
//             onSelect={setSelectedMaterialName}
//             search={true}
//           />
//           <View style={styles.inputContainer}>
//             <Input
//               label="Bags"
//               rootStyle={[
//                 styles.input,
//                 {width: Dimensions.get('window').width / 2 - 34},
//               ]}
//             />
//             <Input
//               label="KG"
//               rootStyle={[
//                 styles.input,
//                 {width: Dimensions.get('window').width / 2 - 34},
//               ]}
//             />
//           </View>
//           <Button
//             icon={images.complete}
//             iconStyle={styles.buttonIcon}
//             buttonTextStyle={styles.buttonText}
//             buttonContainerStyle={styles.button}>
//             {'Save'}
//           </Button>
//         </View>
//         <FlatList
//           data={list}
//           scrollEnabled={false}
//           renderItem={renderItemHandler}
//           contentContainerStyle={styles.list}
//           showsVerticalScrollIndicator={false}
//           ListHeaderComponent={ListHeaderComponent}
//           ItemSeparatorComponent={ItemSeparatorComponent}
//           keyExtractor={(_, index: number) => index?.toString()}
//         />
//       </ScrollView>
//     </View>
//   );
// };

// export default memo(ExtruderMaterialOut);

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//   },
//   container: {
//     paddingTop: 16,
//     paddingBottom: 20,
//     paddingHorizontal: 24,
//     backgroundColor: colors.color_F4F8F7,
//   },
//   input: {
//     marginTop: 20,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   buttonIcon: {height: 28, width: 28},
//   button: {
//     marginTop: 36,
//   },
//   buttonText: {
//     fontSize: 16,
//     paddingHorizontal: 6,
//     fontFamily: fontFamily.Font500,
//   },
//   listHeaderTitle: {
//     fontSize: 18,
//     marginBottom: 21,
//   },
//   list: {
//     padding: 24,
//     paddingBottom: 100,
//     borderTopWidth: 1,
//     borderColor: colors.color_D5E4E3,
//   },
//   itemSeparator: {
//     height: 20,
//   },
//   dateIcon: {
//     height: 24,
//     width: 24,
//   },
// });
