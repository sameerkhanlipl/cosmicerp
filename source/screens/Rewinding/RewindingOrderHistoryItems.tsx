import moment from "moment";
import React, { FC, memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Font500, Font700 } from "../../components/fonts/Fonts";
import { colors } from "../../constants/colors";
import DeleteButton from "../../components/styles/DeleteButton";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export type RewindingOrderHistoryItemType = {
  date: string;
  remark: string;
  contractor: string;
  created_at: string;
  id: number | string;
  updated_at: string;
  rolls: number | string;
  rewinding_production_order_id: number | string;
  this_orders_completed_quantity: number | string;
  rewinding_qty_in_rolls: number | string;
};

type RewindingOrderHistoryItemsProps = {
  data: RewindingOrderHistoryItemType;
  onDelete: () => void;
  status: string;
};

const RewindingOrderHistoryItems: FC<RewindingOrderHistoryItemsProps> = ({
  data,
  onDelete,
  status
}) => {
  const { date, contractor, rolls, remark } = data;

  return (
    <View style={styles.item}>
        <View style={styles.delContainer}>
      {/* <Font500 style={styles.date}>{moment(date).format("DD/MM/YYYY")}</Font500> */}
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
          <Font500 style={styles.label}>{"Contractor : "}</Font500>
          <Font700 style={[styles.value,{width:wp("25%")}]}>{contractor}</Font700>
        </View>
        <View style={styles.subContainer}>
          <Font500 style={styles.label}>{"Rolls : "}</Font500>
          <Font700 style={styles.value}>{rolls}</Font700>
        </View>
      </View>
      <View style={styles.line} />
      <View style={styles.container}>
        <View style={styles.remarkSubContainer}>
          <Font500 style={styles.label}>{"Remark"}</Font500>
          <Font700 style={styles.value}>{remark}</Font700>
        </View>
      </View>
    </View>
  );
};

export default memo(RewindingOrderHistoryItems);

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
    flexDirection: "row",
    justifyContent:'space-between'
  },
  subContainer: {
    //flex: 1,
    flexDirection: "row"
  },
  remarkSubContainer: {
    flex: 1,
    flexDirection: "column"
  },
  label: { fontSize: 14, color: colors.color_777777 },
  value: { fontSize: 14 },
  delContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 2,
    alignItems: "center"
  },
});
