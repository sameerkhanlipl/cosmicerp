import {RouteProp, useRoute} from '@react-navigation/native';
import React, {memo, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {images} from '../../assets/images';
import {Font500, Font700} from '../../components/fonts/Fonts';
import Button from '../../components/styles/Button';
import CommonHeader from '../../components/styles/CommonHeader';
import Input from '../../components/styles/Input';
import {colors} from '../../constants/colors';
import {fontFamily} from '../../constants/fontFamily';
import {AppStackParamList} from '../../stacks/StackTypes';

type PackingAddCompletedOrderRouteProp = RouteProp<
  AppStackParamList,
  'PackingAddCompletedOrder'
>;

enum Step {
  YES = 'Yes',
  NO = 'No',
}

const PackingAddCompletedOrder = () => {
  const route = useRoute<PackingAddCompletedOrderRouteProp>();

  const [selectedStep, setSelectedStep] = useState<Step>(Step.YES);

  const ItemData = route?.params?.data;
  return (
    <View style={styles.root}>
      <CommonHeader title="Packing Orders" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollRoot}>
        <View style={styles.container}>
          <Font500 style={styles.orderId}>{ItemData.order_id}</Font500>
          <View style={styles.detail}>
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Product Name : '}</Font500>
                <Font700 style={styles.value}>{ItemData?.packing_name}</Font700>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'P. Type : '}</Font500>
                <Font700 style={styles.value}>{'14X280'}</Font700>
              </View>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Colors : '}</Font500>
                <Font700 style={styles.value}>{ItemData?.color}</Font700>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'P. Name : '}</Font500>
                <Font700 style={styles.value}>{'ABC'}</Font700>
              </View>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Width : '}</Font500>
                <Font700 style={styles.value}>{ItemData?.width}</Font700>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Carton : '}</Font500>
                <Font700 style={styles.value}>{'5'}</Font700>
              </View>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Length : '}</Font500>
                <Font700 style={styles.value}>{ItemData?.length}</Font700>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Sticker : '}</Font500>
                <Font700 style={styles.value}>{'YES'}</Font700>
              </View>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Rolls : '}</Font500>
                <Font700 style={styles.value}>{'100'}</Font700>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.detailContainer}>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Pipe : '}</Font500>
                <Font700 style={styles.value}>{'14x208'}</Font700>
              </View>
              <View style={styles.detailSubContainer}>
                <Font500 style={styles.label}>{'Bharati : '}</Font500>
                <Font700 style={styles.value}>{'30'}</Font700>
              </View>
            </View>
            <Button
              icon={images.print}
              iconStyle={{height: 28, width: 28}}
              buttonTextStyle={styles.printButtonText}
              buttonContainerStyle={styles.printButton}>
              {'Print'}
            </Button>
          </View>
          <Input
            config={{placeholder: 'Labour Name'}}
            rootStyle={styles.inputContainer}
            label="Labour Name"
          />
          <Input
            config={{placeholder: '09/05/2024'}}
            rootStyle={styles.inputContainer}
            label="Date"
          />
          <Input
            config={{placeholder: '2'}}
            rootStyle={styles.inputContainer}
            label="Bags/Box Qty"
          />

          <View style={styles.stepContainer}>
            <Font500 style={styles.stepLabel}>{'STEPING REQUIRED'}</Font500>
            <View style={styles.stepSubContainer}>
              <Pressable
                onPress={() => setSelectedStep(Step.YES)}
                style={[
                  selectedStep === Step.YES ? styles.selectedStep : styles.step,
                ]}>
                <Font500
                  style={[
                    selectedStep === Step.YES
                      ? styles?.selectedStepValue
                      : styles?.stepValue,
                  ]}>
                  {Step.YES}
                </Font500>
              </Pressable>
              <Pressable
                onPress={() => setSelectedStep(Step.NO)}
                style={[
                  selectedStep === Step.NO ? styles.selectedStep : styles.step,
                ]}>
                <Font500
                  style={[
                    selectedStep === Step.NO
                      ? styles?.selectedStepValue
                      : styles?.stepValue,
                  ]}>
                  {Step.NO}
                </Font500>
              </Pressable>
            </View>
          </View>

          <Input
            config={{placeholder: 'Remarks'}}
            rootStyle={styles.inputContainer}
            label="Remarks"
          />
        </View>
        <Button
          icon={images.complete}
          iconStyle={{height: 28, width: 28}}
          buttonTextStyle={styles.buttonText}
          buttonContainerStyle={styles.button}>
          {'Make it Complete'}
        </Button>
      </ScrollView>
    </View>
  );
};

export default memo(PackingAddCompletedOrder);

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
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 3,
    marginTop: 23,
  },
  detailContainer: {
    flexDirection: 'row',
    paddingHorizontal: 13,
    paddingVertical: 10,
  },
  detailSubContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  label: {
    fontSize: 14,
    color: colors.color_777777,
  },
  value: {fontSize: 14, color: colors.color_0B2624},
  line: {
    height: 1,
    backgroundColor: colors.color_E8DBDF,
  },
  printButton: {
    marginTop: 26,
    borderWidth: 1,
    marginBottom: 19,
    marginHorizontal: 16,
    borderColor: colors.color_22534F,
    backgroundColor: colors.color_F4F8F7,
  },
  printButtonText: {
    color: colors.color_22534F,
    paddingHorizontal: 6,
    fontFamily: fontFamily.Font500,
  },
  inputContainer: {
    marginTop: 16,
  },
  stepContainer: {
    marginTop: 14,
  },
  stepLabel: {
    fontSize: 14,
    marginBlock: 13,
  },
  stepSubContainer: {
    flexDirection: 'row',
  },
  selectedStep: {
    height: 37,
    width: 100,
    marginRight: 20,
    borderRadius: 6,
    borderWidth: 1,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderColor: colors.color_22534F,
    backgroundColor: colors.color_22534F,
  },
  step: {
    height: 37,
    width: 100,
    marginRight: 20,
    borderRadius: 6,
    borderWidth: 1,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderColor: colors.color_0B2624,
    backgroundColor: colors.white,
  },
  stepIcon: {
    height: 20,
    width: 20,
  },
  selectedStepValue: {
    fontSize: 14,
    color: colors.white,
  },
  stepValue: {
    fontSize: 14,
    color: colors.color_0B2624,
  },
  button: {
    marginVertical: 46,
    marginHorizontal: 24,
  },
  buttonText: {
    fontSize: 16,
    paddingHorizontal: 6,
    fontFamily: fontFamily.Font500,
  },
});
