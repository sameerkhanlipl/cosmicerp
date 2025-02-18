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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

type DatePickerModelProps = {
  onConfirm: () => void; // Renamed from onPress for clarity
  onClose: () => void;   // Renamed from close to avoid conflicts
};

export type DatePickerModelRef = {
  open: (new_date: string | Date | undefined | null) => void;
  close: () => void;
  value: () => Date;
};

const DatePickerModel = forwardRef<DatePickerModelRef, DatePickerModelProps>(
  ({onConfirm, onClose}, ref) => {
    const [time, setTime] = useState<Date>(new Date()); // More reliable date initialization
    const [visible, setVisible] = useState<boolean>(false);

    const configWithDate: DatePickerProps = { date: time };

    useImperativeHandle(
      ref,
      () => {
        return {
          open: (new_date: string | Date | undefined | null) => {
            setVisible(true);
            if (new_date) {
              setTime(moment(new_date, 'DD-MM-YYYY').toDate()); // Corrected date format
            }
          },
          close: () => setVisible(false),
          value: () => time,
        };
      },
      [time],
    );

    const handleClose = useCallback(() => {
      setVisible(false);
      onClose(); // Call the onClose prop
    }, [onClose]);

    return (
      <Modal
        visible={visible}
        transparent={true}
        statusBarTranslucent={true}
        animationType="fade">
        <View style={styles.model}>
          <View style={styles.content}>
            <View style={styles.titleContainer}>
              <Font800 style={styles.title}>{"Select Date"}</Font800>
            </View>
            <View style={styles.timeContainer}>
              <DatePicker
                mode="date"
                theme={'light'}
                onDateChange={setTime}
                minimumDate={new Date(2000, 0, 1)}
                maximumDate={new Date()}
                {...configWithDate}
              />
            </View>
            <View style={styles.line} />
            <View style={styles.buttonContainer}>
              <Button
                onPress={handleClose}
                buttonContainerStyle={styles.cancelButton}
                buttonTextStyle={styles.cancelButtonText}>
                {'Cancel'}
              </Button>
              <Button
                onPress={onConfirm}
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
    padding: wp("4%"),
    paddingVertical: hp("2%"),
    borderRadius: wp("2%"),
    width: wp("90%"),
  },
  titleContainer: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBlockColor: colors.lightGray,
  },
  title: {
    fontSize: wp("4.5%"),
    marginBottom: 5,
    color: colors.color_22534F,
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
  timeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    marginVertical: hp("1%"),
    height: 1,
    backgroundColor: colors.color_E8DBDF,
  },
});