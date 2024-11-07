import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC, useState} from 'react';
import {Image, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {images} from '../../assets/images';
import {Font500, Font700} from '../../components/fonts/Fonts';
import Button from '../../components/styles/Button';
import CommonHeader from '../../components/styles/CommonHeader';
import Input from '../../components/styles/Input';
import {colors} from '../../constants/colors';
import {fontFamily} from '../../constants/fontFamily';
import {AppStackParamList} from '../../stacks/StackTypes';

type ExtruderAddCompletedOrderProps = NativeStackScreenProps<
  AppStackParamList,
  'ExtruderAddCompletedOrder'
>;

enum Sift {
  DAY = 'Day',
  NIGHT = 'Night',
}

const ExtruderAddCompletedOrder: FC<ExtruderAddCompletedOrderProps> = ({
  route,
}: ExtruderAddCompletedOrderProps) => {
  const [selectedSift, setSelectedSift] = useState<Sift>(Sift.DAY);

  const ItemData = route?.params?.data;
  return (
    <View style={styles.root}>
      <CommonHeader title="Extruders orders" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollRoot}>
        <View style={styles.container}>
          <Font500 style={styles.orderId}>{ItemData.order_id}</Font500>
          <View style={styles.detail}>
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Gauge'}</Font500>
                <Font700 style={styles.value}>{ItemData?.length}</Font700>
              </View>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Size'}</Font500>
                <Font700 style={styles.value}>{ItemData?.width + '"'}</Font700>
              </View>
            </View>
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Colors'}</Font500>
                <Font700 style={styles.value}>{ItemData?.color}</Font700>
              </View>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Qty'}</Font500>
                <Font700 style={styles.value}>
                  {ItemData?.production_qty + 'KG'}
                </Font700>
              </View>
            </View>
          </View>
          <View style={styles.recipeContainer}>
            <Font500 style={styles.recipeLabel}>{'Recipe Name :  '}</Font500>
            <Font700 style={styles.recipeValue}>{'50 KG Fillers'}</Font700>
            <Image
              style={styles.infoIcon}
              resizeMode="contain"
              source={images.info}
            />
          </View>
          <Input
            config={{placeholder: 'Machine 1'}}
            rootStyle={styles.inputContainer}
            label="Machine"
          />
          <Input
            config={{placeholder: '09/05/2024'}}
            rootStyle={styles.inputContainer}
            label="Date"
          />

          <View style={styles.siftContainer}>
            <Font500 style={styles.siftLabel}>{'Shift'}</Font500>
            <View style={styles.siftSubContainer}>
              <Pressable
                onPress={() => setSelectedSift(Sift.DAY)}
                style={[
                  selectedSift === Sift.DAY ? styles.selectedSift : styles.sift,
                ]}>
                <Image
                  tintColor={
                    selectedSift === Sift.DAY
                      ? colors?.white
                      : colors?.color_0B2624
                  }
                  source={images.day}
                  resizeMode="contain"
                  style={styles.siftIcon}
                />
                <Font500
                  style={[
                    selectedSift === Sift.DAY
                      ? styles?.selectedSiftValue
                      : styles?.siftValue,
                  ]}>
                  {Sift.DAY}
                </Font500>
              </Pressable>
              <Pressable
                onPress={() => setSelectedSift(Sift.NIGHT)}
                style={[
                  selectedSift === Sift.NIGHT
                    ? styles.selectedSift
                    : styles.sift,
                ]}>
                <Image
                  tintColor={
                    selectedSift === Sift.NIGHT
                      ? colors?.white
                      : colors?.color_0B2624
                  }
                  source={images.night}
                  resizeMode="contain"
                  style={styles.siftIcon}
                />
                <Font500
                  style={[
                    selectedSift === Sift.NIGHT
                      ? styles?.selectedSiftValue
                      : styles?.siftValue,
                  ]}>
                  {Sift.NIGHT}
                </Font500>
              </Pressable>
            </View>
          </View>

          <View style={styles.unitContainer}>
            <Input
              config={{placeholder: '100 KG'}}
              rootStyle={[styles.unitInput, {marginRight: 9}]}
              label="Qty"
            />
            <Input
              config={{placeholder: '28”'}}
              rootStyle={[styles.unitInput, {marginLeft: 9}]}
              label="Size"
            />
          </View>
        </View>
        <Button
          buttonTextStyle={styles.buttonText}
          buttonContainerStyle={styles.button}>
          {'Make it Complete'}
        </Button>
      </ScrollView>
    </View>
  );
};

export default ExtruderAddCompletedOrder;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollRoot: {
    flexGrow: 1,
  },
  container: {
    padding: 17,
    marginTop: 32,
    borderWidth: 1,
    borderRadius: 12,
    marginHorizontal: 24,
    borderColor: colors.color_D5E4E3,
    backgroundColor: colors.color_F4F8F7,
  },
  orderId: {
    fontSize: 18,
  },
  detail: {
    marginTop: 23,
    borderRadius: 12,
    paddingVertical: 9,
    paddingHorizontal: 11,
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
  detailContainer: {
    flex: 1,
  },
  detailSubContainer: {
    marginVertical: 9,
    flexDirection: 'row',
  },
  label: {
    flex: 1,
  },
  value: {flex: 1},
  recipeContainer: {
    marginTop: 25,
    borderRadius: 12,
    marginBottom: 9,
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 13,
    backgroundColor: colors.color_D5E4E3,
  },
  recipeLabel: {
    fontSize: 14,
    color: colors.color_777777,
  },
  recipeValue: {
    fontSize: 14,
    color: colors.color_0B2624,
    flex: 1,
  },
  inputContainer: {
    marginTop: 16,
  },
  infoIcon: {
    height: 28,
    width: 28,
  },
  siftContainer: {
    marginTop: 14,
  },
  siftLabel: {
    fontSize: 14,
    marginBlock: 13,
  },
  siftSubContainer: {
    flexDirection: 'row',
  },
  selectedSift: {
    height: 41,
    marginRight: 20,
    borderRadius: 6,
    borderWidth: 1,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderColor: colors.color_22534F,
    backgroundColor: colors.color_22534F,
  },
  sift: {
    height: 41,
    marginRight: 20,
    borderRadius: 6,
    borderWidth: 1,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderColor: colors.color_0B2624,
    backgroundColor: colors.white,
  },
  siftIcon: {
    height: 20,
    width: 20,
  },
  selectedSiftValue: {
    fontSize: 14,
    color: colors.white,
  },
  siftValue: {
    fontSize: 14,
    color: colors.color_0B2624,
  },
  unitContainer: {
    marginTop: 33,
    flexDirection: 'row',
  },
  unitInput: {
    flex: 1,
  },
  button: {
    marginVertical: 46,
    marginHorizontal: 24,
  },
  buttonText: {
    fontFamily: fontFamily.Font500,
  },
});
