import React, {FC, useCallback,memo} from 'react';
import {Text, View,Pressable,Image,StyleSheet} from 'react-native';
import { colors } from '../../constants/colors';
import { Font400, Font500, Font700 } from '../../components/fonts/Fonts';
import moment from 'moment';
import { images } from '../../assets/images';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export type PackingProductionOrderType = {
  alias_sku: string;
  bags_per_bdl: string;
  color: string;
  customer_id: string;
  customer_order_id: number;
  date: string;
  film_kg: string|number;
  film_name: string;
  film_weight: string;
  gage: string;
  gsm: string;
  lamination_material_name: string;
  lamination_material_weight: string;
  lamination_production_order_id: number;
  lamination_type: string;
  length: string;
  machine: string;
  meter: number;
  order_id: string;
  paper_kg: number;
  pending_bundle_qty: string;
  pipe_size: string;
  product_name: string;
  production_order_id: number;
  production_qty: number;
  rolls_in_1_bdl: string;
  status: string;
  total_order_qty: string;
  width: string;
  serial_number:string
};

export type PackingSearchOrderItemType = {
  packing_production_order_id: number;
  customer_id: string;
  customer_order_id: number;
  order_id: string;
  product_name: string;
  date: string;
  color: string;
  length: string;
  width: string;
  pipe_size: string;
  packing_name: string;
  total_order_qty: string;
  bags_per_bdl: string;
  gage: string;
  pending_bundle_qty: string;
  production_order_id: number;
  production_qty: number;
  stitching_id: string;
  alias_sku: string;
  material_name: string | null;
  status: string;
  rolls_in_1_bdl: string;
  sticching_packing_type: string;
  packing_sticker: string;
  packing_carton: string;
  packing_bhart: string;
  packing_bharti:string;
  serial_number:string
};

type PackingSearchOrderItemProps = {
  data: PackingSearchOrderItemType;
  onPress: (value: PackingSearchOrderItemType) => void;
};

const PackingSearchOrderItem: FC<PackingSearchOrderItemProps> = ({data, onPress}) => {
    const {
      order_id,
      product_name,
      date,
      color,
      length,
      width,
      pending_bundle_qty,
      pipe_size,
      material_name,
      rolls_in_1_bdl,
      sticching_packing_type,
      packing_sticker,
      packing_carton,
      packing_bhart,
      packing_bharti,
      serial_number,
    } = data;
  
    const onPressHandler = useCallback(() => {
      onPress(data);
    }, [data, onPress]);
  return (
     <Pressable onPress={onPressHandler} style={styles.item}>
        <View style={styles.header}>
          <Font400 style={styles.order_id}>{serial_number}</Font400>
          <Image
            style={styles.goIcon}
            source={images.right_arrow}
            resizeMode="contain"
          />
        </View>
        <View style={styles.container}>
          <Font700 config={{numberOfLines: 1}} style={styles.product_name}>
            {product_name}
          </Font700>
          <View style={styles.line} />
          <View style={styles.subContainer}>
            <View style={styles.detail}>
              <Font500 style={styles.label}>{'Date : '}</Font500>
              <Font700 style={styles.value}>
                {moment(date).format('DD/MM/YYYY')}
              </Font700>
            </View>
            <View style={styles.detail}>
              <Font500 style={styles.label}>{'Bundles : '}</Font500>
              <Font700 style={styles.value}>{pending_bundle_qty}</Font700>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.subContainer}>
            <View style={styles.detail}>
              <Font500 style={styles.label}>{'Colors : '}</Font500>
              <Font700 style={styles.value}>{color}</Font700>
            </View>
            <View style={styles.detail}>
              <Font500 style={styles.label}>{'Width : '}</Font500>
              <Font700 style={styles.value}>{width}</Font700>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.subContainer}>
            <View style={styles.detail}>
              <Font500 style={styles.label}>{'Length : '}</Font500>
              <Font700 style={styles.value}>{length}</Font700>
            </View>
            <View style={styles.detail}>
              <Font500 style={styles.label}>{'Pipe : '}</Font500>
              <Font700 style={styles.value}>{pipe_size}</Font700>
            </View>
          </View>
          <View style={styles.line} />
          <View style={styles.subContainer}>
            <View style={styles.detail}>
              <Font500 style={styles.label}>{'Packing Marital Name : '}</Font500>
              <Font700 style={[styles.value,{width:wp("40%")}]}>{material_name}</Font700>
            </View>
          </View>
        </View>
      </Pressable>
  );
};


export default memo(PackingSearchOrderItem);

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.white,
    borderColor: colors.color_D5E4E3,
  },
  header: {
    paddingLeft: 14,
    paddingRight: 22,
    paddingVertical: 9,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.color_D5E4E3,
  },
  order_id: {
    fontSize: 12,
  },
  goIcon: {
    width: 4,
    height: 8,
  },
  container: {
    paddingVertical: 9,
    paddingHorizontal: 17,
  },
  product_name: {
    fontSize: 14,
    color: colors.color_0B2624,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detail: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  line: {
    height: 1,
    marginVertical: 9,
    backgroundColor: colors.color_D5E4E3,
  },
  label: {
    fontSize: 14,
    color: colors.color_777777,
    marginRight: 2,
  },
  value: {
    fontSize: 14,
    color: colors.color_0B2624,
  },
});