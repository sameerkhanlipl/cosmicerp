import moment from 'moment';
import React, {FC, memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Font500, Font700} from '../../components/fonts/Fonts';
import {colors} from '../../constants/colors';

export type StitchingOrderHistoryItemType = {
  date: string;
  contractor: string;
  rolls: string;
  color: string;
  size: {length: string | number; width: string | number};
  remark: string;
};

type StitchingOrderHistoryItemsProps = {
  data: StitchingOrderHistoryItemType;
};

const StitchingOrderHistoryItems: FC<StitchingOrderHistoryItemsProps> = ({
  data,
}) => {
  const {date, contractor, remark} = data;

  return (
    <View style={styles.item}>
      <Font500 style={styles.date}>{moment(date).format('DD/MM/yyyy')}</Font500>
      <View style={styles.line} />
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Font500 style={styles.label}>{'Labour Name : '}</Font500>
          <Font700 style={styles.value}>{contractor}</Font700>
        </View>
      </View>
      <View style={styles.line} />
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Font500 style={styles.label}>{'Bundle Qty : '}</Font500>
          <Font700 style={styles.value}>{'100KG'}</Font700>
        </View>
        <View style={styles.subContainer}>
          <Font500 style={styles.label}>{'Qty Per Bdl : '}</Font500>
          <Font700 style={styles.value}>{'2'}</Font700>
        </View>
      </View>
      <View style={styles.line} />
      <View style={styles.container}>
        <View style={[styles.subContainer, {flexDirection: 'column'}]}>
          <Font500 style={styles.label}>{'Remark'}</Font500>
          <Font700 style={styles.value}>{remark}</Font700>
        </View>
      </View>
    </View>
  );
};

export default memo(StitchingOrderHistoryItems);

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
    flexDirection: 'row',
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  label: {fontSize: 14, color: colors.color_777777},
  value: {flex: 1, fontSize: 14},
});
