import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {memo, useCallback, useRef, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {stitching_set_order_complete_body} from '../../api/BodyTypes';
import {stitching_complete_orders_response} from '../../api/ResponseTypes';
import {images} from '../../assets/images';
import {Font500, Font700} from '../../components/fonts/Fonts';
import Button from '../../components/styles/Button';
import CommonHeader from '../../components/styles/CommonHeader';
import Input, {InputRef} from '../../components/styles/Input';
import {colors} from '../../constants/colors';
import {fontFamily} from '../../constants/fontFamily';
import {AppNavigationProp, AppStackParamList} from '../../stacks/StackTypes';
import {checkInput} from '../../utils/CheckInput';
import {stitching_set_order_complete} from '../../api/apis';
import {error, ShowToast} from '../../utils/ErrorHandler';
import moment from 'moment';

type StitchingAddCompletedOrderRouteProp = RouteProp<
  AppStackParamList,
  'StitchingAddCompletedOrder'
>;

const StitchingAddCompletedOrder = () => {
  const {goBack} = useNavigation<AppNavigationProp>();

  const route = useRoute<StitchingAddCompletedOrderRouteProp>();

  const ItemData = route?.params?.data;

  const [loader, setLoader] = useState(false);

  const labour = useRef<InputRef>(null);
  const date = useRef<InputRef>(null);
  const bundle = useRef<InputRef>(null);
  const qty = useRef<InputRef>(null);
  const remark = useRef<InputRef>(null);

  const onCompleteOrderHandler = useCallback(async () => {
    if (
      checkInput(labour?.current?.get(), 'Labour Require for complete order')
    ) {
      return;
    }

    if (
      checkInput(bundle?.current?.get(), 'Bundle Require for complete order')
    ) {
      return;
    }

    if (
      checkInput(qty?.current?.get(), 'Qty per Bdl Require for complete order')
    ) {
      return;
    }
    if (
      checkInput(remark?.current?.get(), 'Remark Require for complete order')
    ) {
      return;
    }

    const body: stitching_set_order_complete_body = {
      stitching_production_order_id: ItemData?.stitching_production_order_id,
      labour_name: labour?.current?.get(),
      date: date?.current?.get(),
      qty_per_bdl: qty?.current?.get(),
      bdl_qty: bundle?.current?.get(),
      remark: remark?.current?.get(),
    };

    try {
      setLoader(true);
      const response: {data: stitching_complete_orders_response} =
        await stitching_set_order_complete(body);
      ShowToast(response?.data?.message);
      goBack();
      setLoader(false);
    } catch (err) {
      setLoader(false);
      error(err);
    } finally {
      setLoader(false);
    }
  }, [ItemData, goBack]);

  return (
    <View style={styles.root}>
      <CommonHeader title="Stitching Orders" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollRoot}>
        <View style={styles.container}>
          <Font500 style={styles.orderId}>{ItemData.order_id}</Font500>
          <View style={styles.detail}>
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Product Name : '}</Font500>
                <Font700 style={styles.value}>{ItemData?.product_name}</Font700>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Bharti : '}</Font500>
                <Font700 style={styles.value}>{'100 Rolls'}</Font700>
              </View>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Colors : '}</Font500>
                <Font700 style={styles.value}>{'Red'}</Font700>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Qty Per Bdl : '}</Font500>
                <Font700 style={styles.value}>{'2'}</Font700>
              </View>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Bundle : '}</Font500>
                <Font700 style={styles.value}>{'10'}</Font700>
              </View>
            </View>
          </View>
          <Input
            ref={labour}
            config={{placeholder: 'Labour Name'}}
            rootStyle={styles.inputContainer}
            label="Labour Name"
          />
          <Input
            ref={date}
            default_value={moment().format('DD-MM-YYYY')}
            rootStyle={styles.inputContainer}
            label="Date (DD-MM-YYYY)"
            config={{editable: false}}
          />
          <View style={styles.unitContainer}>
            <Input
              ref={bundle}
              config={{placeholder: '100 KG'}}
              rootStyle={[styles.unitInput]}
              label="Bundle Qty"
            />
            <Input
              ref={qty}
              config={{placeholder: '28”'}}
              rootStyle={[styles.unitInput]}
              label="Qty Per Bdl"
            />
          </View>
          <Input
            ref={remark}
            config={{placeholder: 'Remark'}}
            rootStyle={styles.inputContainer}
            label="Remark"
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

export default memo(StitchingAddCompletedOrder);

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
  value: {flex: 1, fontSize: 14, color: colors.color_0B2624},
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
    marginRight: 9,
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
