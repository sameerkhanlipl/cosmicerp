import moment from 'moment';
import React, {FC, memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Font500, Font700} from '../../components/fonts/Fonts';
import {colors} from '../../constants/colors';

export type LaminationMaterialInItemType = {
  id: number | string;
  date: string;
  machine: number | string;
  material_category_type: number | string;
  material_sub_category: number | string;
  material_name: number | string;
  unit1: string;
  unit2: string;
  quantity: number | string;
  created_at: string;
  updated_at: string;
};

type LaminationMaterialInItemsProps = {
  data: LaminationMaterialInItemType;
};

const LaminationMaterialInItems: FC<LaminationMaterialInItemsProps> = ({
  data,
}: LaminationMaterialInItemsProps) => {
  const {date, unit1, unit2, quantity, id} = data;

  return (
    <View style={styles.item}>
      <Font500 style={styles.date}>
        {moment(date)?.format('DD/MM/YYYY')}
      </Font500>
      <View style={styles.line} />
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <Font500 style={styles.label}>{'Id : '}</Font500>
            <Font700 style={styles.value}>{id}</Font700>
          </View>
          <View style={styles.subContainer}>
            <Font500 style={styles.label}>{'Quantity : '}</Font500>
            <Font700 style={styles.value}>{quantity}</Font700>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.subContainer}>
            <Font500 style={styles.label}>{'Uint 1 : '}</Font500>
            <Font700 style={styles.value}>{unit1}</Font700>
          </View>
          <View style={styles.subContainer}>
            <Font500 style={styles.label}>{'Unit 2: '}</Font500>
            <Font700 style={styles.value}>{unit2}</Font700>
          </View>
        </View>
      </View>
    </View>
  );
};

export default memo(LaminationMaterialInItems);

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    paddingTop: 13,
    borderRadius: 12,
    paddingBottom: 9,
    paddingHorizontal: 18,
    borderColor: colors.color_D5E4E3,
    backgroundColor: colors.color_F4F8F7,
  },
  date: {
    fontSize: 14,
    color: colors.color_0B2624_5,
  },
  line: {
    height: 1,
    marginVertical: 9,
    backgroundColor: colors.color_D5E4E3,
  },
  mainContainer: {},
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 9,
  },
  label: {fontSize: 14, color: colors.color_777777},
  value: {fontSize: 14, color: colors.color_0B2624},
});
