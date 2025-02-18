import moment from "moment";
import React, { FC, memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Font500, Font600, Font700 } from "../../components/fonts/Fonts";
import { colors } from "../../constants/colors";

export type LaminationOrderHistoryItemType = {
  created_at: string;
  date: string;
  id: number | string;
  lamination_production_order_id: number | string;
  machine: string;
  meter: number | string;
  this_orders_completed_quantity: number | string;
  updated_at: string;
  rewinding_qty_in_rolls: number | string;
};

type LaminationOrderHistoryItemsProps = {
  data: LaminationOrderHistoryItemType;
  onDelete: () => void;
  status:string
};

const LaminationOrderHistoryItems: FC<LaminationOrderHistoryItemsProps> = ({
  data,
  onDelete,
  status
}) => {
  const {
    date,
    machine,
    meter,
    this_orders_completed_quantity,
    rewinding_qty_in_rolls
  } = data;





  return (
    <View style={styles.item}>
      <View style={styles.delContainer}>
        <Font500 style={styles.date}>
          {date}
        </Font500>
        
                {status == "pending" &&
        <TouchableOpacity style={styles.deleteButton} onPress={()=>onDelete()}>
          <Font500 style={styles.deleteTxt}>{"Delete"}</Font500>
        </TouchableOpacity>
}
      </View>

      <View style={styles.line} />
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Font500 style={styles.label}>{"Machine : "}</Font500>
          <Font700 style={styles.value}>{machine}</Font700>
        </View>
      </View>
      <View style={styles.line} />
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Font500 style={styles.label}>{"Meter : "}</Font500>
          <Font700 style={styles.value}>{meter}</Font700>
        </View>
        <View style={styles.subContainer}>
          <Font500 style={styles.label}>{"Total Meter : "}</Font500>
          <Font700 style={styles.value}>
            {this_orders_completed_quantity + ""}
            {/* {rewinding_qty_in_rolls + ''}  */}
          </Font700>
        </View>
      </View>
   
    </View>
  );
};

export default memo(LaminationOrderHistoryItems);

const styles = StyleSheet.create({
  item: {
    borderRadius: 12,
    backgroundColor: colors.white,
    paddingHorizontal: 19,
    paddingBottom: 22,
    paddingTop: 15,
    borderWidth: 1,
    borderColor: colors.color_D5E4E3
  },
  date: {
    fontSize: 14,
    color: colors.color_777777
  },
  line: {
    height: 1,
    backgroundColor: colors.color_D5E4E3,
    marginVertical: 9
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  subContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  delContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 2,
    alignItems: "center"
  },
  deleteButton: {
    padding: 2,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    
  },
  deleteTxt: { fontSize: 14, color: "red" },
  label: { fontSize: 14, color: colors.color_777777 },
  value: { fontSize: 14 }
});
