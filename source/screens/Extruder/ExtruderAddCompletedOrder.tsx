import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {memo, useCallback, useRef, useState} from 'react';
import {Image, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {extruder_complete_orders} from '../../api/apis';
import {extruder_set_order_complete_body} from '../../api/BodyTypes';
import {images} from '../../assets/images';
import {Font400, Font500, Font700} from '../../components/fonts/Fonts';
import Button from '../../components/styles/Button';
import CommonHeader from '../../components/styles/CommonHeader';
import DropDown, {
  DropDownRef,
  DropDownType,
} from '../../components/styles/DropDown';
import Input, {InputRef} from '../../components/styles/Input';
import {colors} from '../../constants/colors';
import {fontFamily} from '../../constants/fontFamily';
import {AppNavigationProp, AppStackParamList} from '../../stacks/StackTypes';
import {error, ShowToast} from '../../utils/ErrorHandler';
import moment from 'moment';
import {checkInput} from '../../utils/CheckInput';
import {extruder_complete_orders_response} from '../../api/ResponseTypes';

type ExtruderAddCompletedOrderRouteProp = RouteProp<
  AppStackParamList,
  'ExtruderOrderHistory'
>;

enum Sift {
  DAY = 'day',
  NIGHT = 'night',
}

const machineListing: DropDownType[] = [
  {title: 'Machine 1', value: 'machine_1'},
  {title: 'Machine 2', value: 'machine_2'},
  {title: 'Machine 3', value: 'machine_3'},
  {title: 'Machine 4', value: 'machine_4'},
  {title: 'Machine 5', value: 'machine_5'},
];

const ExtruderAddCompletedOrder = () => {
  const route = useRoute<ExtruderAddCompletedOrderRouteProp>();
  const ItemData = route?.params?.data;

  const {goBack} = useNavigation<AppNavigationProp>();

  const [selectedSift, setSelectedSift] = useState<Sift>(Sift.DAY);
  const [loader, setLoader] = useState<boolean>();

  const machine = useRef<DropDownRef>(null);
  const date = useRef<InputRef>(null);
  const qty = useRef<InputRef>(null);
  const size = useRef<InputRef>(null);

  const onCompleteOrderHandler = useCallback(async () => {
    if (
      checkInput(qty?.current?.get(), 'Quantity Require for complete order')
    ) {
      return;
    }

    if (checkInput(size?.current?.get(), 'Size Require for complete order')) {
      return;
    }

    const body: extruder_set_order_complete_body = {
      date: date?.current?.get(),
      extruder_production_order_id: ItemData?.extruder_production_order_id,
      machine: machine?.current?.get()?.value,
      qty: qty?.current?.get(),
      shift: selectedSift,
      size: size?.current?.get(),
    };

    try {
      setLoader(true);
      const response: {data: extruder_complete_orders_response} =
        await extruder_complete_orders(body);
      ShowToast(response?.data?.message);
      setLoader(false);
      goBack();
    } catch (err) {
      setLoader(false);
      error(err);
    } finally {
      setLoader(false);
    }
  }, [selectedSift, ItemData, goBack]);

  return (
    <View style={styles.root}>
      <CommonHeader title="Extruders orders" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollRoot}>
        <View style={styles.container}>
          <Font500 style={styles.orderId}>{ItemData.order_id}</Font500>
          <View style={styles.detail}>
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Gauge : '}</Font500>
                <Font700 style={styles.value}>{ItemData?.length}</Font700>
              </View>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Size : '}</Font500>
                <Font700 style={styles.value}>{ItemData?.width + '"'}</Font700>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Colors : '}</Font500>
                <Font700 style={styles.value}>{ItemData?.color}</Font700>
              </View>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Qty : '}</Font500>
                <Font700 style={styles.value}>
                  {ItemData?.production_qty + 'KG'}
                </Font700>
              </View>
            </View>
          </View>
          <View style={styles.recipeContainer}>
            <Font500 style={styles.recipeLabel}>{'Recipe Name :  '}</Font500>
            <Font700 style={styles.recipeValue}>{'50 KG Fillers'}</Font700>
            <Image
              style={styles.infoIcon}
              resizeMode="contain"
              source={images.info}
            />
          </View>
          <DropDown
            ref={machine}
            rootStyle={styles.inputContainer}
            data={machineListing}
            label="Machine"
          />
          <Input
            ref={date}
            rightIcon={images.date}
            label="Date (DD-MM-YYYY)"
            config={{editable: false}}
            rightIconStyle={styles.dateIcon}
            rootStyle={styles.inputContainer}
            default_value={moment().format('DD-MM-YYYY')}
          />

          <View style={styles.siftContainer}>
            <Font500 style={styles.siftLabel}>{'Shift'}</Font500>
            <View style={styles.siftSubContainer}>
              <Pressable
                onPress={() => setSelectedSift(Sift.DAY)}
                style={[
                  selectedSift === Sift.DAY ? styles.selectedSift : styles.sift,
                ]}>
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
                      : styles?.siftValue,
                  ]}>
                  {Sift.DAY}
                </Font500>
              </Pressable>
              <Pressable
                onPress={() => setSelectedSift(Sift.NIGHT)}
                style={[
                  selectedSift === Sift.NIGHT
                    ? styles.selectedSift
                    : styles.sift,
                ]}>
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
                      : styles?.siftValue,
                  ]}>
                  {Sift.NIGHT}
                </Font500>
              </Pressable>
            </View>
          </View>

          <View style={styles.unitContainer}>
            <Input
              ref={qty}
              config={{placeholder: '100 KG'}}
              rootStyle={[styles.unitInput]}
              label="Qty"
            />
            <Input
              ref={size}
              config={{placeholder: '28”'}}
              rootStyle={[styles.unitInput]}
              label="Size"
            />
          </View>
          <View style={styles.pending}>
            <Font500 style={styles.pendingMedium}>
              {ItemData?.pending_bundle_qty + ' KG'}
            </Font500>
            <Font400 style={styles.pendingRegular}>{' Pending'}</Font400>
          </View>
        </View>
        <Button
          loader={loader}
          onPress={onCompleteOrderHandler}
          icon={images.complete}
          iconStyle={styles.buttonIcon}
          buttonTextStyle={styles.buttonText}
          buttonContainerStyle={styles.button}>
          {'Make it Complete'}
        </Button>
      </ScrollView>
    </View>
  );
};

export default memo(ExtruderAddCompletedOrder);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollRoot: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  container: {
    padding: 17,
    marginTop: 32,
    borderWidth: 1,
    borderRadius: 12,
    marginHorizontal: 24,
    borderColor: colors.color_D5E4E3,
    backgroundColor: colors.color_F4F8F7,
  },
  orderId: {
    fontSize: 18,
  },
  detail: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 3,
    marginTop: 23,
  },
  detailContainer: {
    flexDirection: 'row',
    paddingHorizontal: 13,
    paddingVertical: 10,
  },
  detailSubContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  label: {
    fontSize: 14,
    color: colors.color_777777,
  },
  value: {fontSize: 14, color: colors.color_0B2624},
  line: {
    height: 1,
    backgroundColor: colors.color_E8DBDF,
  },
  recipeContainer: {
    marginTop: 25,
    borderRadius: 12,
    marginBottom: 9,
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 13,
    backgroundColor: colors.color_D5E4E3,
  },
  recipeLabel: {
    fontSize: 14,
    color: colors.color_777777,
  },
  recipeValue: {
    fontSize: 14,
    color: colors.color_0B2624,
    flex: 1,
  },
  inputContainer: {
    marginTop: 16,
  },
  dateIcon: {
    height: 24,
    width: 24,
  },
  infoIcon: {
    height: 28,
    width: 28,
  },
  siftContainer: {
    marginTop: 14,
  },
  siftLabel: {
    fontSize: 14,
    marginBlock: 13,
  },
  siftSubContainer: {
    flexDirection: 'row',
  },
  selectedSift: {
    height: 41,
    marginRight: 20,
    borderRadius: 6,
    borderWidth: 1,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderColor: colors.color_22534F,
    backgroundColor: colors.color_22534F,
  },
  sift: {
    height: 41,
    marginRight: 20,
    borderRadius: 6,
    borderWidth: 1,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderColor: colors.color_0B2624,
    backgroundColor: colors.white,
  },
  siftIcon: {
    height: 20,
    width: 20,
  },
  selectedSiftValue: {
    fontSize: 14,
    color: colors.white,
  },
  siftValue: {
    fontSize: 14,
    color: colors.color_0B2624,
  },
  unitContainer: {
    marginTop: 33,
    flexDirection: 'row',
  },
  unitInput: {
    flex: 1,
    marginRight: 9,
  },
  pending: {
    paddingLeft: 12,
    paddingTop: 7,
    alignItems: 'center',
    flexDirection: 'row',
  },
  pendingMedium: {
    fontSize: 14,
    color: colors?.color_22534F,
  },
  pendingRegular: {
    fontSize: 14,
    color: colors?.color_777777,
  },
  button: {
    marginVertical: 46,
    marginHorizontal: 24,
  },
  buttonIcon: {height: 28, width: 28},
  buttonText: {
    fontSize: 16,
    paddingHorizontal: 6,
    fontFamily: fontFamily.Font500,
  },
});
