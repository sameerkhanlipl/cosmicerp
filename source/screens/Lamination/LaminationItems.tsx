import moment from 'moment';
import React, {FC, memo, useCallback} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {images} from '../../assets/images';
import {Font400, Font500, Font700} from '../../components/fonts/Fonts';
import {colors} from '../../constants/colors';

export type LaminationItemType = {
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

type LaminationItemsProps = {
  data: LaminationItemType;
  onPress: (data: LaminationItemType) => void;
};

const LaminationItems: FC<LaminationItemsProps> = ({data, onPress}) => {
  const {order_id, product_name, date} = data;

  const onPressHandler = useCallback(() => {
    onPress(data);
  }, [data, onPress]);

  return (
    <Pressable onPress={onPressHandler} style={styles.item}>
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
        </View>
        <View style={styles.line} />
        <View style={styles.subContainer}>
          <View style={styles.detail}>
            <Font500 style={styles.label}>{'Laminationa Type : '}</Font500>
            <Font700 style={styles.value}>{'Cutter'}</Font700>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.subContainer}>
          <View style={styles.detail}>
            <Font500 style={styles.label}>{'Paper Mill : '}</Font500>
            <Font700 style={styles.value}>{'10'}</Font700>
          </View>
          <View style={styles.detail}>
            <Font500 style={styles.label}>{'Reel Size : '}</Font500>
            <Font700 style={styles.value}>{2}</Font700>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.subContainer}>
          <View style={styles.detail}>
            <Font500 style={styles.label}>{'Meter : '}</Font500>
            <Font700 style={styles.value}>{'2'}</Font700>
          </View>
          <View style={styles.detail}>
            <Font500 style={styles.label}>{'KG : '}</Font500>
            <Font700 style={styles.value}>{2}</Font700>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default memo(LaminationItems);

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
