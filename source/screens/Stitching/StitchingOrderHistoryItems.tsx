import moment from 'moment';
import React, {FC, memo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Font500, Font700} from '../../components/fonts/Fonts';
import {colors} from '../../constants/colors';
import DeleteButton from '../../components/styles/DeleteButton';

export type StitchingOrderHistoryItemType = {
  date: string;
  contractor: string;
  rolls: string;
  color: string;
  size: {length: string | number; width: string | number};
  remark: string;
  labour_name:string;
  bdl_qty:string;
};

type StitchingOrderHistoryItemsProps = {
  data: StitchingOrderHistoryItemType;
  onDelete: () => void;
  status: string;
};

const StitchingOrderHistoryItems: FC<StitchingOrderHistoryItemsProps> = ({
  data,
  onDelete,
  status
}) => {
  const {date, contractor, remark,labour_name,bdl_qty} = data;

  return (
    <View style={styles.item}>
      <View style={styles.delContainer}>
      {/* <Font500 style={styles.date}>{moment(date).format('DD/MM/yyyy')}</Font500> */}
      <Font500 style={styles.date}>{date}</Font500>
      {status == "pending" &&
               <TouchableOpacity onPress={() => onDelete()}>
                 <DeleteButton />
               </TouchableOpacity>
             }
      </View>
   
      <View style={styles.line} />
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Font500 style={styles.label}>{'Labour Name : '}</Font500>
          <Font700 style={styles.value}>{labour_name}</Font700>
        </View>
      </View>
      <View style={styles.line} />
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Font500 style={styles.label}>{'Bundle Qty : '}</Font500>
          <Font700 style={styles.value}>{bdl_qty}</Font700>
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
    backgroundColor: colors.white,
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
  delContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 2,
    alignItems: "center"
  },
});
