import moment from 'moment';
import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import DatePicker, {DatePickerProps} from 'react-native-date-picker';
import {colors} from '../../constants/colors';
import {Font800} from '../fonts/Fonts';
import Button from '../styles/Button';

type DatePickerModelProps = {
  onPress: () => void;
  config: DatePickerProps;
  title?: string;
};

export type DatePickerModelRef = {
  open: (new_date: string | Date | undefined | null) => void;
  close: () => void;
  value: () => Date;
};

const DatePickerModel = forwardRef<DatePickerModelRef, DatePickerModelProps>(
  ({onPress, config, title}, ref) => {
    const [time, setTime] = useState<Date>(new Date('12-12-2012'));
    const [visible, setVisible] = useState<boolean>(false);

    const configWithDate = {...config, date: time};

    useImperativeHandle(
      ref,
      () => {
        return {
          open: (new_date: string | Date | undefined | null) => {
            setVisible(true);
            if (new_date) {
              setTime(new Date(moment(new_date, 'dd-mm-yyyy')?.toDate()));
            }
          },
          close: () => setVisible(false),
          value: () => time,
        };
      },
      [time],
    );

    const close = useCallback(() => {
      setVisible(false);
    }, []);

    return (
      <Modal
        visible={visible}
        transparent={true}
        statusBarTranslucent={true}
        animationType="fade">
        <View style={styles.model}>
          <View style={styles.content}>
            <View style={styles.titleContainer}>
              <Font800 style={styles.title}>{title}</Font800>
            </View>
            <View style={styles.timeContainer}>
              <DatePicker
                mode="date"
                theme={'light'}
                onDateChange={setTime}
                {...configWithDate}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                onPress={close}
                buttonContainerStyle={styles.cancelButton}
                buttonTextStyle={styles.cancelButtonText}>
                {'Cancel'}
              </Button>
              <Button
                onPress={onPress}
                buttonContainerStyle={styles.confirmButton}>
                {'Confirm'}
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  },
);

export default memo(DatePickerModel);

const styles = StyleSheet.create({
  model: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.transparent_black,
  },
  content: {
    backgroundColor: colors.white,
    padding: 16,
    paddingVertical: 24,
    borderRadius: 10,
    width: '89%',
  },
  titleContainer: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBlockColor: colors.lightGray,
  },
  title: {
    fontSize: 22,
    marginBottom: 5,
    color: colors.color_22534F,
  },
  subTitle: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  cancelButton: {
    flex: 1,
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    marginRight: 10,
  },
  cancelButtonText: {
    color: colors.black,
  },
  confirmButton: {
    flex: 1,
    height: 40,
    paddingHorizontal: 20,
    marginLeft: 10,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.black,
  },
  buttonText: {
    color: colors.white,
  },
});
