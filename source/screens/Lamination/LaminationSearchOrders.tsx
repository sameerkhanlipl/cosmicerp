import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {images} from '../../assets/images';
import CommonHeader from '../../components/styles/CommonHeader';
import {ExtrudersItemType} from '../Extruder/ExtrudersItems';
import {LaminationItemType} from '../Lamination/LaminationItems';
import {PackingItemType} from '../Packing/PackingItems';
import {RewindingItemType} from '../Rewinding/RewindingItems';
import {StitchingItemType} from '../Stitching/StitchingItems';

const LaminationSearchOrders = () => {
  const [] = useState<
    | LaminationItemType[]
    | ExtrudersItemType[]
    | RewindingItemType[]
    | PackingItemType[]
    | StitchingItemType[]
    | []
  >([]);

  return (
    <View style={styles.root}>
      <CommonHeader title={'Search Order Of Lamination'} icon={images.close} />
    </View>
  );
};

export default LaminationSearchOrders;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
