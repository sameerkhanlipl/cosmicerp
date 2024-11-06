import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {Linking, Modal, Platform, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch} from 'react-redux';
import {images} from '../../assets/images';
import {LABEL} from '../../constant/LABEL';
import {colors} from '../../constant/colors';
import Font400 from '../fonts/Font400';
import Font800 from '../fonts/Font800';
import {logout} from '../redux/authSlice';
import {useAppSelector} from '../redux/hooks';
import Button from '../styles/Button';
import {error} from '../tost/error';

const {UPDATE} = LABEL;

type UpdateModelRef = {
  open: () => void;
};

const UpdateModel = forwardRef<UpdateModelRef>((_, ref) => {
  const [show, setShow] = useState(false);
  const user = useAppSelector(state => state?.auth?.user);
  const dispatch = useDispatch();

  useImperativeHandle(
    ref,
    () => {
      return {
        open: () => setShow(true),
      };
    },
    [],
  );

  const updateAppHandler = useCallback(async () => {
    if (user) {
      try {
        // await logOut();
        dispatch(logout());
      } catch (err) {
        error(err);
      }
    }
    Linking.openURL(
      Platform.OS === 'android'
        ? 'https://play.google.com/store/apps/details?id=com.reflowx&hl=en_IN'
        : 'https://apps.apple.com/in/app/reflowx/id6529528951',
    ).catch(err => console.error('An error occurred', err));
  }, [dispatch, user]);

  return (
    <Modal
      statusBarTranslucent={true}
      visible={show}
      transparent={true}
      animationType="fade">
      <View style={styles.model}>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <View style={styles.logoContainer}>
              <FastImage
                source={images.app_logo}
                resizeMode="contain"
                style={styles.logo}
              />
            </View>
            <View style={styles.appDetailContainer}>
              <Font800 style={styles.title}>{'Reflowx'}</Font800>
              <Font800 style={styles.subTitle}>
                {'New Version Available!'}
              </Font800>
            </View>
          </View>
          <Font400 style={styles.instruction}>
            {
              'A new version of the app is available with exciting updates and improvements. Please update to the latest version for the best experience.'
            }
          </Font400>
          <View style={styles.buttonContainer}>
            <Button
              onPress={updateAppHandler}
              buttonContainerStyle={styles.confirmButton}>
              {UPDATE}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
});

export default memo(UpdateModel);

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
    borderRadius: 10,
    width: '89%',
  },
  titleContainer: {
    marginBottom: 10,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBlockColor: colors.lightGray,
    paddingVertical: 10,
  },
  logoContainer: {
    width: 56,
    height: 56,
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: {height: 2, width: 0},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 28,
    width: 28,
  },
  title: {
    fontSize: 22,
    marginBottom: 5,
    color: colors.colorA42242,
  },
  subTitle: {
    fontSize: 18,
    color: colors.darkGray,
  },
  instruction: {
    fontSize: 12,
    marginBottom: 20,
    color: colors.gray,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  confirmButton: {
    flex: 1,
    height: 40,
    paddingHorizontal: 20,
    marginLeft: 10,
  },
  appDetailContainer: {paddingHorizontal: 20},
});
