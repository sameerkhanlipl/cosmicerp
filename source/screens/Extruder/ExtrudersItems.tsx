import React, {FC} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {Font400, Font500, Font700} from '../../components/fonts/Fonts';
import {images} from '../../assets/images';
import {colors} from '../../constants/colors';
import moment from 'moment';

export type ExtrudersItemType = {
  extruder_production_order_id?: number;
  customer_id?: string;
  customer_order_id?: number;
  order_id?: string;
  product_name?: string;
  date?: string;
  gage?: string;
  color?: string;
  production_order_id?: number;
  production_qty?: string;
  pending_bundle_qty?: number;
  lamination_id?: string;
  alias_sku?: string;
  length?: string;
  width?: string;
  bags_per_bdl?: string;
  material_name?: null | string;
  pipe_size?: string;
  machine?: string;
  status?: string;
  total_order_qty?: string;
};

type ExtrudersItemsProps = {
  data: ExtrudersItemType;
};

const ExtrudersItems: FC<ExtrudersItemsProps> = ({data}) => {
  const {
    order_id,
    product_name,
    date,
    color,
    length,
    width,
    pending_bundle_qty,
  } = data;

  return (
    <Pressable style={styles.item}>
      <View style={styles.header}>
        <Font400 style={styles.order_id}>{order_id}</Font400>
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
            <Font500 style={styles.label}>{'Size : '}</Font500>
            <Font700 style={styles.value}>{length + ' X ' + width}</Font700>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.subContainer}>
          <View style={styles.detail}>
            <Font500 style={styles.label}>{'Colors : '}</Font500>
            <Font700 style={styles.value}>{color}</Font700>
          </View>
          <View style={styles.detail}>
            <Font500 style={styles.label}>{'Pending : '}</Font500>
            <Font700 style={styles.value}>{pending_bundle_qty + 'KG'}</Font700>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ExtrudersItems;

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
