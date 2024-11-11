import React, {memo, useCallback, useState} from 'react';
import {Dimensions, FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {images} from '../../assets/images';
import {Font500} from '../../components/fonts/Fonts';
import Button from '../../components/styles/Button';
import CommonHeader from '../../components/styles/CommonHeader';
import Input from '../../components/styles/Input';
import {colors} from '../../constants/colors';
import {fontFamily} from '../../constants/fontFamily';
import LaminationMaterialOutItems, {
  LaminationMaterialOutItemType,
} from './LaminationMaterialOutItems';

const ListHeaderComponent = () => (
  <Font500 style={styles.listHeaderTitle}>{'List of Material Out'}</Font500>
);

const ItemSeparatorComponent = () => <View style={styles.itemSeparator} />;

const LaminationMaterialOut = () => {
  const [list] = useState<LaminationMaterialOutItemType[]>([
    {
      date: new Date()?.toString(),
      category: 'HM',
      product: 'Asrene5205',
      bags: 10,
    },
    {
      date: new Date()?.toString(),
      category: 'HM',
      product: 'Asrene5205',
      bags: 10,
    },
    {
      date: new Date()?.toString(),
      category: 'HM',
      product: 'Asrene5205',
      bags: 10,
    },
    {
      date: new Date()?.toString(),
      category: 'HM',
      product: 'Asrene5205',
      bags: 10,
    },
    {
      date: new Date()?.toString(),
      category: 'HM',
      product: 'Asrene5205',
      bags: 10,
    },
  ]);

  const renderItemHandler = useCallback(
    ({item}: {item: LaminationMaterialOutItemType}) => (
      <LaminationMaterialOutItems data={item} />
    ),
    [],
  );

  return (
    <View style={styles.root}>
      <CommonHeader title={'Lamination - Material Type'} />
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Input label="Date" rootStyle={styles.input} />
          <Input label="Machine" rootStyle={styles.input} />
          <Input label="Material Type" rootStyle={styles.input} />
          <Input label="Sub-Category" rootStyle={styles.input} />
          <View style={styles.inputContainer}>
            <Input
              label="Bags"
              rootStyle={[
                styles.input,
                {width: Dimensions.get('window').width / 2 - 34},
              ]}
            />
            <Input
              label="KG"
              rootStyle={[
                styles.input,
                {width: Dimensions.get('window').width / 2 - 34},
              ]}
            />
          </View>
          <Button
            icon={images.complete}
            iconStyle={{height: 28, width: 28}}
            buttonTextStyle={styles.buttonText}
            buttonContainerStyle={styles.button}>
            {'Make it Complete'}
          </Button>
        </View>
        <FlatList
          data={list}
          scrollEnabled={false}
          renderItem={renderItemHandler}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={ListHeaderComponent}
          ItemSeparatorComponent={ItemSeparatorComponent}
          keyExtractor={(_, index: number) => index?.toString()}
        />
      </ScrollView>
    </View>
  );
};

export default memo(LaminationMaterialOut);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 24,
    backgroundColor: colors.color_F4F8F7,
  },
  input: {
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 36,
  },
  buttonText: {
    fontSize: 16,
    paddingHorizontal: 6,
    fontFamily: fontFamily.Font500,
  },
  listHeaderTitle: {
    fontSize: 18,
    marginBottom: 21,
  },
  list: {
    padding: 24,
    paddingBottom: 100,
    borderTopWidth: 1,
    borderColor: colors.color_D5E4E3,
  },
  itemSeparator: {
    height: 20,
  },
});
