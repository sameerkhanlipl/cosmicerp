import moment from 'moment';
import React, {FC, memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Font500, Font700} from '../../components/fonts/Fonts';
import {colors} from '../../constants/colors';

export type ExtruderOrderHistoryItemType = {
  id: number | string;
  extruder_production_order_id: number | string;
  machine: string;
  shift: string;
  qty: number | string;
  this_orders_completed_quantity: number | string;
  size: number | string;
  created_at: string;
  updated_at: string;
};

type ExtruderOrderHistoryItemsProps = {
  data: ExtruderOrderHistoryItemType;
};

const ExtruderOrderHistoryItems: FC<ExtruderOrderHistoryItemsProps> = ({
  data,
}) => {
  const {created_at, machine, shift, qty, size} = data;

  return (
    <View style={styles.item}>
      <Font500 style={styles.date}>
        {moment(created_at).format('DD/MM/YYYY')}
      </Font500>
      <View style={styles.line} />
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Font500 style={styles.label}>{'Machine : '}</Font500>
          <Font700 style={styles.value}>{machine}</Font700>
        </View>
      </View>
      <View style={styles.line} />
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Font500 style={styles.label}>{'Shift : '}</Font500>
          <Font700 style={styles.value}>{shift}</Font700>
        </View>
      </View>
      <View style={styles.line} />
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Font500 style={styles.label}>{'Qty : '}</Font500>
          <Font700 style={styles.value}>{qty + 'KG'}</Font700>
        </View>
        <View style={styles.subContainer}>
          <Font500 style={styles.label}>{'Size : '}</Font500>
          <Font700 style={styles.value}>{size + '"'}</Font700>
        </View>
      </View>
    </View>
  );
};

export default memo(ExtruderOrderHistoryItems);

const styles = StyleSheet.create({
  item: {
    borderRadius: 12,
    backgroundColor: colors.color_F4F8F7,
    paddingHorizontal: 19,
    paddingBottom: 22,
    paddingTop: 15,
    borderWidth: 1,
    borderColor: colors.color_D5E4E3,
  },
  date: {
    fontSize: 14,
    color: colors.color_777777,
  },
  line: {
    height: 1,
    backgroundColor: colors.color_D5E4E3,
    marginVertical: 9,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {fontSize: 14, color: colors.color_777777},
  value: {fontSize: 14},
});
