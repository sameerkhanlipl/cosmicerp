import moment from "moment";
import React, { FC, memo } from "react";
import { StyleSheet, View } from "react-native";
import { Font500, Font700 } from "../../components/fonts/Fonts";
import { colors } from "../../constants/colors";
import DeleteButton from "../../components/styles/DeleteButton";

export type ExtruderMaterialOutItemType = {
  date: string;
  category: string;
  product: string;
  bags: number;
  id: number | string;
  user_id: number | string;
 
  machine: string;
  material_category_type: number | string;
  material_sub_category: number | string;
  material_name: number | string;
  unit1: string;
  unit1_value: number | string;
  unit2: number | string | null;
  unit2_value: number | string | null;
  created_at: string;
  updated_at: string;
};

type ExtruderMaterialOutItemsProps = {
  data: ExtruderMaterialOutItemType;
};

const ExtruderMaterialOutItems: FC<ExtruderMaterialOutItemsProps> = ({
  data
}: ExtruderMaterialOutItemsProps) => {
  const { date, category, product, bags } = data;

  return (
    <View style={styles.item}>
      <View style={styles.delContainer}>
        <Font500 style={styles.date}>
          {moment(date)?.format("DD/MM/YYYY")}
        </Font500>
        <DeleteButton />
      </View>
      <View style={styles.line} />
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <Font500 style={styles.label}>{"Category : "}</Font500>
            <Font700 style={styles.value}>{category}</Font700>
          </View>
          <View style={styles.subContainer}>
            <Font500 style={styles.label}>{"Product : "}</Font500>
            <Font700 style={styles.value}>{product}</Font700>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.subContainer}>
            <Font500 style={styles.label}>{"Bags : "}</Font500>
            <Font700 style={styles.value}>{bags}</Font700>
          </View>
          <View style={styles.subContainer}>
            <Font500 style={styles.label}>{"Bags : "}</Font500>
            <Font700 style={styles.value}>{bags}</Font700>
          </View>
        </View>
      </View>
    </View>
  );
};

export default memo(ExtruderMaterialOutItems);

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    paddingTop: 13,
    borderRadius: 12,
    paddingBottom: 9,
    paddingHorizontal: 18,
    borderColor: colors.color_D5E4E3,
    backgroundColor: colors.color_F4F8F7
  },
  date: {
    fontSize: 14,
    color: colors.color_0B2624_5
  },
  line: {
    height: 1,
    marginVertical: 9,
    backgroundColor: colors.color_D5E4E3
  },
  mainContainer: {},
  container: {
    flex: 1,
    flexDirection: "row"
  },
  subContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 9
  },
  label: { fontSize: 14, color: colors.color_777777 },
  value: { fontSize: 14, color: colors.color_0B2624 },
  delContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 2,
    alignItems: "center"
  }
});
