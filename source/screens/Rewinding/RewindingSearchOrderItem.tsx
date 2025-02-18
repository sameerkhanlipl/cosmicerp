import React, {FC, useCallback,memo} from 'react';
import {Text, View,Pressable,Image,StyleSheet} from 'react-native';
import { colors } from '../../constants/colors';
import { Font400, Font500, Font700 } from '../../components/fonts/Fonts';
import moment from 'moment';
import { images } from '../../assets/images';

export type LaminationProductionOrderType = {
  alias_sku: string;
  bags_per_bdl: string;
  color: string;
  customer_id: string;
  customer_order_id: number;
  date: string;
  film_kg: string|number;
  film_name: string;
  film_weight: string;
  gage: string;
  gsm: string;
  lamination_material_name: string;
  lamination_material_weight: string;
  lamination_production_order_id: number;
  lamination_type: string;
  length: string;
  machine: string;
  meter: number;
  order_id: string;
  paper_kg: number;
  pending_bundle_qty: string;
  pipe_size: string;
  product_name: string;
  production_order_id: number;
  production_qty: number;
  rolls_in_1_bdl: string;
  status: string;
  total_order_qty: string;
  width: string;
  serial_number:string
};

export type LaminationSearchOrderItemType = {
  rewinding_production_order_id: number;
  customer_id: string;
  customer_order_id: number;
  order_id: string;
  product_name: string;
  date: string;
  gage: string;
  color: string;
  pending_bundle_qty: string;
  rewinding_pipe: string;
  rewinding_sticker: string;
  production_order_id: number;
  production_qty: number;
  extruder_id: string;
  alias_sku: string;
  length: string;
  width: string;
  bags_per_bdl: string;
  material_name: string | null;
  pipe_size: string;
  status: string;
  total_order_qty: string;
  rewinding_sticker_name :string;
  rewinding_qty_in_rolls:string|number;
  serial_number:string,
};

type LaminationSearchOrderItemProps = {
  data: LaminationSearchOrderItemType;
  onPress: (value: LaminationSearchOrderItemType) => void;
};

const LaminationSearchOrderItem: FC<LaminationSearchOrderItemProps> = ({data, onPress}) => {
    const {
      order_id,
    product_name,
    date,
    color,
    length,
    width,
    pending_bundle_qty,
    pipe_size,
    rewinding_sticker_name,
    serial_number,
    alias_sku,
    rewinding_sticker
    } = data;
  
    const onPressHandler = useCallback(() => {
      onPress(data);
    }, [data, onPress]);
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
           <Font700 config={{numberOfLines: 1}} style={styles.product_name}>
             {product_name}
           </Font700>
           <View style={styles.line} />
           <View style={styles.subContainer}>
           <View style={styles.detail}>
               <Font500 style={styles.label}>{'Alias : '}</Font500>
               <Font700 style={styles.value}>{alias_sku}</Font700>
             </View>
             <View style={styles.detail}>
               <Font500 style={styles.label}>{'Date : '}</Font500>
               <Font700 style={styles.value}>
                 {moment(date).format('DD/MM/YYYY')}
               </Font700>
             </View>
          
           </View>
           <View style={styles.line} />
           <View style={styles.subContainer}>
           <View style={styles.detail}>
               <Font500 style={styles.label}>{'Size : '}</Font500>
               <Font700 style={styles.value}>{length + ' X ' + width}</Font700>
             </View>
             <View style={styles.detail}>
               <Font500 style={styles.label}>{'Colors : '}</Font500>
               <Font700 style={styles.value}>{color}</Font700>
             </View>
          
           </View>
           <View style={styles.line} />
           <View style={styles.subContainer}>
           <View style={styles.detail}>
               {/* <Font500 style={styles.label}>{'Pending : '}</Font500> */}
               <Font500 style={styles.label}>{'QTY : '}</Font500>
               {/* <Font700 style={styles.value}>{pending_bundle_qty + 'KG'}</Font700> */}
               <Font700 style={styles.value}>{pending_bundle_qty + ''}</Font700>
             </View>
             <View style={styles.detail}>
               <Font500 style={styles.label}>{'Pipe : '}</Font500>
               <Font700 style={styles.value}>
                 {pipe_size ? pipe_size + ' MM' : ''}
               </Font700>
             </View>
        
           </View>
           <View style={styles.line} />
           <View style={styles.subContainer}>
           <View style={styles.detail}>
               <Font500 style={styles.label}>{'Stickers : '}</Font500>
               <Font700 style={[styles.value,{}]}>{rewinding_sticker_name}</Font700>
             </View>
             </View>
         </View>
       </Pressable>
  );
};


export default memo(LaminationSearchOrderItem);

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.white,
    borderColor: colors.color_D5E4E3,
  },
  header: {
    paddingLeft: 14,
    paddingRight: 22,
    paddingVertical: 9,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.color_D5E4E3,
  },
  order_id: {
    fontSize: 12,
  },
  goIcon: {
    width: 4,
    height: 8,
  },
  container: {
    paddingVertical: 9,
    paddingHorizontal: 17,
  },
  product_name: {
    fontSize: 14,
    color: colors.color_0B2624,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detail: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  line: {
    height: 1,
    marginVertical: 9,
    backgroundColor: colors.color_D5E4E3,
  },
  label: {
    fontSize: 14,
    color: colors.color_777777,
    marginRight: 2,
  },
  value: {
    fontSize: 14,
    color: colors.color_0B2624,
  },
});