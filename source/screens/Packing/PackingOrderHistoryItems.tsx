import moment from 'moment';
import React, { FC, memo, useCallback, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Font500, Font700 } from '../../components/fonts/Fonts';
import { colors } from '../../constants/colors';
import DeleteButton from '../../components/styles/DeleteButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Button from '../../components/styles/Button';
import { images } from '../../assets/images';
import { fontFamily } from '../../constants/fontFamily';
import PrintModal, { PrintModalRef } from '../../components/model/PrintModal';


export type PackingOrderHistoryItemType = {
  date: string;
  labour_name: string;
  bag_box: string;
  pending_qty: string;
  size: { length: string | number; width: string | number };
  remark: string;
  bags_per_box_qty: string
  steping_required:string
};

export type PackingItemType = {
  packing_production_order_id: number;
  customer_id: string;
  customer_order_id: number;
  order_id: string;
  product_name: string;
  date: string;
  color: string;
  length: string;
  width: string;
  pipe_size: string;
  packing_name: string;
  total_order_qty: string;
  bags_per_bdl: string;
  gage: string;
  pending_bundle_qty: string;
  production_order_id: number;
  production_qty: number;
  stitching_id: string;
  alias_sku: string;
  material_name: string | null;
  status: string;
  rolls_in_1_bdl: string;
  sticching_packing_type: string;
  packing_sticker: string;
  packing_carton: string;
  packing_bhart: string;
  packing_bharti:string;
  serial_number:string;
  packing_internal_notes:string
  outer_name:string
 
};

type PackingOrderHistoryItemsProps = {
  data: PackingOrderHistoryItemType;
  onDelete: () => void;
  status: string;
  ItemData:PackingItemType
};

const PackingOrderHistoryItems: FC<PackingOrderHistoryItemsProps> = ({
  data,
  onDelete,
  status,
  ItemData
}) => {
  const { date, labour_name, bag_box, pending_qty, size, remark, bags_per_box_qty,steping_required } = data;
  const printModel = useRef<PrintModalRef>(null);

  const onPrintModalOPen = useCallback(() => {
    printModel?.current?.open();
  }, []);
  return (
    <View style={styles.item}>
      <View style={styles.delContainer}>
        {/* <Font500 style={styles.date}>{moment(date).format('DD/MM/yyyy')}</Font500> */}
        <Font500 style={styles.date}>{date}</Font500>
        <Button
          icon={images.print}
          iconStyle={{ height: hp("2%"), width: wp("5%") }}
          buttonTextStyle={styles.printButtonText}
          buttonContainerStyle={styles.printButton}
        onPress={onPrintModalOPen}
        >
          {"Print"}
        </Button>
        {status == "pending" &&
          <TouchableOpacity onPress={() => onDelete()}>
            <DeleteButton />
          </TouchableOpacity>
        }
      </View>
      <View style={styles.line} />
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Font500 style={styles.label}>{'Labour : '}</Font500>
          <Font700 style={[styles.value, { width: wp("30%") }]}>{labour_name}</Font700>
        </View>
        <View style={styles.subContainer}>
          <Font500 style={styles.label}>{'Bag : '}</Font500>
          <Font700 style={styles.value}>{bags_per_box_qty}</Font700>
        </View>
      </View>
      <View style={styles.line} />
   
      <View style={styles.container}>
        <View style={[styles.subContainer, { flexDirection: 'column' }]}>
          <Font500 style={styles.label}>{'Remark'}</Font500>
          <Font700 style={styles.value}>{remark}</Font700>
        </View>
      </View>
        <PrintModal
              title={"Print"}
              subTitle={"Show Length?"}
              item={ItemData}
              ref={printModel}
              onPress={onPrintModalOPen}
              labour_name={labour_name}
            />
    </View>
  );
};

export default memo(PackingOrderHistoryItems);

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
    justifyContent: 'space-between'
  },
  subContainer: {
    // flex: 1,
    flexDirection: 'row',
  },
  label: { fontSize: 14, color: colors.color_777777 },
  value: { fontSize: 14 },
  delContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 2,
    alignItems: "center",
   
  },
  printButton: {
    height:hp("3%"),
    // marginTop: 26,
    borderWidth: 1,
    // marginBottom: 19,
    //marginHorizontal: 16,
    borderColor: colors.color_22534F,
    backgroundColor: colors.color_F4F8F7,
    paddingHorizontal:wp("1%")
  },
  printButtonText: {
    fontSize: wp("3.5%"),
    color: colors.color_22534F,
    paddingHorizontal: wp("1%"),
    fontFamily: fontFamily.Font500
  },
});
