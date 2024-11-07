import {StyleSheet, Text, View} from 'react-native';
import React, {FC, memo} from 'react';
import {Font500, Font700} from '../../components/fonts/Fonts';
import moment from 'moment';
import {colors} from '../../constants/colors';

export type ExtruderOrderHistoryItemType = {
  date: string;
  machine: string | number;
  shift: string;
  qty: string | number;
  size: string | number;
};

type ExtruderOrderHistoryItemsProps = {
  data: ExtruderOrderHistoryItemType;
};

const ExtruderOrderHistoryItems: FC<ExtruderOrderHistoryItemsProps> = ({
  data,
}) => {
  const {date, machine, shift, qty, size} = data;

  return (
    <View style={styles.item}>
      <Font500 style={styles.date}>{moment(date).format('DD/MM/yyyy')}</Font500>
      <View style={styles.line} />
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Font500 style={styles.label}>{'Machine'}</Font500>
          <Font700 style={styles.value}>{machine}</Font700>
        </View>
        <View style={styles.subContainer}>
          <Font500 style={styles.label}>{'Shift'}</Font500>
          <Font700 style={styles.value}>{shift}</Font700>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Font500 style={styles.label}>{'Qty'}</Font500>
          <Font700 style={styles.value}>{qty + 'KG'}</Font700>
        </View>
        <View style={styles.subContainer}>
          <Font500 style={styles.label}>{'Size'}</Font500>
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
    paddingBottom: 49,
    paddingTop: 15,
  },
  date: {
    fontSize: 14,
    color: colors.color_777777,
  },
  line: {
    height: 1,
    backgroundColor: colors.color_D5E4E3,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subContainer: {
    flex: 1,
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {flex: 1, fontSize: 14, color: colors.color_777777},
  value: {flex: 1, fontSize: 14},
});
