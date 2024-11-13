import {RouteProp, useRoute} from '@react-navigation/native';
import React, {memo, useCallback, useRef, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {images} from '../../assets/images';
import {Font500, Font700} from '../../components/fonts/Fonts';
import Button from '../../components/styles/Button';
import CommonHeader from '../../components/styles/CommonHeader';
import Input, {InputRef} from '../../components/styles/Input';
import {colors} from '../../constants/colors';
import {fontFamily} from '../../constants/fontFamily';
import {AppStackParamList} from '../../stacks/StackTypes';
import moment from 'moment';
import DropDown, {
  DropDownRef,
  DropDownType,
} from '../../components/styles/DropDown';
import {checkInput} from '../../utils/CheckInput';
import {lamination_set_order_complete_body} from '../../api/BodyTypes';
import {lamination_set_order_complete} from '../../api/apis';
import {error} from '../../utils/ErrorHandler';

type LaminationAddCompletedOrderRouteProp = RouteProp<
  AppStackParamList,
  'LaminationAddCompletedOrder'
>;

const machineListing: DropDownType[] = [
  {title: 'Machine 1', value: 'machine_1'},
  {title: 'Machine 2', value: 'machine_2'},
  {title: 'Machine 3', value: 'machine_3'},
  {title: 'Machine 4', value: 'machine_4'},
  {title: 'Machine 5', value: 'machine_5'},
];

const LaminationAddCompletedOrder = () => {
  const route = useRoute<LaminationAddCompletedOrderRouteProp>();

  const ItemData = route?.params?.data;

  const [loader, setLoader] = useState<boolean>(false);

  const machine = useRef<DropDownRef>(null);
  const date = useRef<InputRef>(null);
  const meter = useRef<InputRef>(null);

  const onCompleteOrderHandler = useCallback(async () => {
    if (checkInput(meter?.current?.get(), 'Meter Require for complete order')) {
      return;
    }

    const body: lamination_set_order_complete_body = {
      date: date?.current?.get(),
      lamination_production_order_id: ItemData?.lamination_id,
      machine: machine?.current?.get()?.value,
      meter: meter?.current?.get(),
    };

    try {
      setLoader(true);
      const response = await lamination_set_order_complete(body);
      console.log('response?.dat', response?.data);
      setLoader(false);
    } catch (err) {
      setLoader(false);
      error(err);
    } finally {
      setLoader(false);
    }
  }, [ItemData]);

  return (
    <View style={styles.root}>
      <CommonHeader title="Lamination Orders" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollRoot}>
        <View style={styles.container}>
          <Font500 style={styles.orderId}>{ItemData.order_id}</Font500>
          <View style={styles.detail}>
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Lamination Type : '}</Font500>
                <Font700 style={styles.value}>{'Cutter'}</Font700>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Paper Mill : '}</Font500>
                <Font700 style={styles.value}>{'2'}</Font700>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'GSM : '}</Font500>
                <Font700 style={styles.value}>{'2'}</Font700>
              </View>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Reel Size : '}</Font500>
                <Font700 style={styles.value}>{'2'}</Font700>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Meter : '}</Font500>
                <Font700 style={styles.value}>{'2'}</Font700>
              </View>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'KG : '}</Font500>
                <Font700 style={styles.value}>{'2'}</Font700>
              </View>
            </View>
          </View>
          <DropDown
            ref={machine}
            rootStyle={styles.inputContainer}
            data={machineListing}
            label="Machine"
          />
          <Input
            ref={date}
            config={{value: moment().format('DD-MM-YYYY'), editable: false}}
            rootStyle={styles.inputContainer}
            label="Date (DD-MM-YYYY)"
          />
          <Input
            ref={meter}
            config={{placeholder: '100'}}
            rootStyle={styles.inputContainer}
            label="Meter"
          />
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

export default memo(LaminationAddCompletedOrder);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollRoot: {
    flexGrow: 1,
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
  inputContainer: {
    marginTop: 16,
  },
  infoIcon: {
    height: 28,
    width: 28,
  },
  unitContainer: {
    marginTop: 33,
    flexDirection: 'row',
  },
  unitInput: {
    flex: 1,
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
