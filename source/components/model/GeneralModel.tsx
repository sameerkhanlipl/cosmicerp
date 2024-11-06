import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {Font500, Font800} from '../fonts/Fonts';
import Button from '../styles/Button';
import {colors} from '../../constants/colors';

export type GeneralModelRef = {
  open: () => void;
  close: () => void;
};

type GeneralModelProps = {
  title?: string;
  subTitle?: string;
  onPress?: () => void;
};

const GeneralModel = forwardRef<GeneralModelRef, GeneralModelProps>(
  ({title, subTitle, onPress}, ref) => {
    const [visible, setVisible] = useState(false);

    const close = useCallback(() => {
      setVisible(false);
    }, []);

    useImperativeHandle(
      ref,
      () => {
        return {
          open: () => setVisible(true),
          close: close,
        };
      },
      [close],
    );

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
            <Font500 style={styles.subTitle}>{subTitle}</Font500>
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

export default memo(GeneralModel);

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
});
