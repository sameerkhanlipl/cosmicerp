import moment from "moment";
import React, { FC, memo, useCallback } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { images } from "../../assets/images";
import { Font400, Font500, Font700 } from "../../components/fonts/Fonts";
import { colors } from "../../constants/colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
export type StitchingItemType = {
  stitching_production_order_id: number;
  customer_id: string;
  customer_order_id: number;
  order_id: string;
  product_name: string;
  date: string;
  bags_per_bdl: string;
  color: string;
  total_order_qty: string;
  gage: string;
  pending_bundle_qty: string;
  production_order_id: number;
  production_qty: number;
  packing_id: string;
  alias_sku: string;
  length: string;
  width: string;
  material_name: string | null;
  pipe_size: string;
  status: string;
  serial_number: string;
  stitching_internal_notes: string;
  packing_material_name: string;
  sticching_bharti: string;
  sticching_bag: string;
  sticker: string;
};

type StitchingItemProps = {
  data: StitchingItemType;
  onPress: (value: StitchingItemType) => void;
};

const StitchingItems: FC<StitchingItemProps> = ({ data, onPress }) => {
  const {
    order_id,
    product_name,
    date,
    color,
    length,
    width,
    production_qty,
    pending_bundle_qty,
    bags_per_bdl,
    serial_number,
    stitching_internal_notes,
    packing_material_name,
    sticching_bharti,
    sticching_bag,
    sticker
  } = data;

  const onPressHandler = useCallback(() => {
    onPress(data);
  }, [onPress, data]);

  return (
    <Pressable onPress={onPressHandler} style={styles.item}>
      <View style={styles.header}>
        <Font400 style={styles.order_id}>{serial_number}</Font400>
        <Image
          style={styles.goIcon}
          source={images.right_arrow}
          resizeMode="contain"
        />
      </View>
      <View style={styles.container}>
        <Font700 config={{ numberOfLines: 1 }} style={styles.product_name}>
          {product_name}
        </Font700>
        <View style={styles.line} />
        <View style={styles.subContainer}>
          <View style={styles.detail}>
            <Font500 style={styles.label}>{"Date : "}</Font500>
            <Font700 style={styles.value}>
              {moment(date).format("DD/MM/YYYY")}
            </Font700>
          </View>
          <View style={styles.detail}>
            <Font500 style={styles.label}>{"Bag/Box Per Bdl : "}</Font500>
            <Font700 style={styles.value}>{bags_per_bdl}</Font700>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.subContainer}>
          <View style={styles.detail}>
            <Font500 style={styles.label}>{"Bundle : "}</Font500>
            <Font700 style={styles.value}>{production_qty}</Font700>
          </View>
          <View style={styles.detail}>
            <Font500 style={styles.label}>{"Color : "}</Font500>
            <Font700 style={styles.value}>{color}</Font700>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.subContainer}>
          <View style={styles.detail}>
            <Font500 style={styles.label}>{"Sticker : "}</Font500>
            <Font700 style={styles.value}>{sticker}</Font700>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.subContainer}>
          <View style={styles.detail}>
            <Font500
              style={styles.label}
            >{`Packing\nMaterial Name : `}</Font500>
            <Font700 style={[styles.value, { width: wp("50%") }]}>
              {packing_material_name}
            </Font700>
          </View>
        </View>

        <View style={styles.line} />
        <View style={styles.subContainer}>
          <View style={styles.detail}>
            <Font700 style={styles.value}>
              {sticching_bharti +
                " X " +
                sticching_bag +
                " X " +
                production_qty}
            </Font700>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default memo(StitchingItems);

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: colors.white,
    borderColor: colors.color_D5E4E3
  },
  header: {
    paddingLeft: 14,
    paddingRight: 22,
    paddingVertical: 9,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.color_D5E4E3
  },
  order_id: {
    fontSize: 12
  },
  goIcon: {
    width: 4,
    height: 8
  },
  container: {
    paddingVertical: 9,
    paddingHorizontal: 17
  },
  product_name: {
    fontSize: 14,
    color: colors.color_0B2624
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  detail: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  line: {
    height: 1,
    marginVertical: 9,
    backgroundColor: colors.color_D5E4E3
  },
  label: {
    fontSize: 14,
    color: colors.color_777777,
    marginRight: 2
  },
  value: {
    fontSize: 14,
    color: colors.color_0B2624
  }
});
