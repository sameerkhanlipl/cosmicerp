import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {Modal, Platform, Pressable, StyleSheet, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import ImagePicker from 'react-native-image-crop-picker';
import {PERMISSIONS} from 'react-native-permissions';
import {colors} from '../../constant/colors';
import {CheckPermissions} from '../../permissions/CheckPermissions';
import {permissionDenied} from '../../permissions/PermissionDenied';
import {RequestPermissions} from '../../permissions/RequestPermissions';
import Font500 from '../fonts/Font500';
import Font800 from '../fonts/Font800';
import Button from '../styles/Button';

export type FetchImageModelRef = {
  open: () => void;
  close: () => void;
};

type FetchImageModelProps = {
  onImageChange: (value: any) => void;
};

const FetchImageModel = forwardRef<FetchImageModelRef, FetchImageModelProps>(
  ({onImageChange}, ref) => {
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

    const imagePickerHandler = useCallback(() => {
      ImagePicker.openPicker({
        maxFiles: 1,
        width: 512,
        height: 512,
        cropping: true,
        quality: 0.25,
        multiple: false,
        mediaType: 'photo',
        compressImageQuality: 0.2,
      })
        .then((image: any) => {
          onImageChange(image);
        })
        .catch(error => {
          console.log('error', error);
        });
    }, [onImageChange]);

    const imageTakeHandler = useCallback(() => {
      ImagePicker.openCamera({
        width: 512,
        height: 512,
        quality: 0.25,
        mediaType: 'photo',
        compressImageQuality: 0.2,
        cropping: true,
      })
        .then(image => {
          onImageChange(image);
        })
        .catch(error => {
          console.log('error', error);
        });
    }, [onImageChange]);

    const onOpenCameraHandler = useCallback(async () => {
      setTimeout(async () => {
        const permission =
          Platform.OS === 'android'
            ? [PERMISSIONS.ANDROID.CAMERA]
            : [PERMISSIONS.IOS.CAMERA];

        const checkResult = await CheckPermissions(permission);

        switch (checkResult) {
          case 0:
            const requestStatus = await RequestPermissions(permission);
            if (requestStatus === 1) {
              imageTakeHandler();
            } else {
              permissionDenied();
            }
            break;
          case -1:
            permissionDenied();
            break;
          case 1:
            imageTakeHandler();
            break;
        }
      }, 100);
    }, [imageTakeHandler]);

    const onOpenGalleryHandler = useCallback(async () => {
      const osVer = await DeviceInfo.getApiLevel();

      setTimeout(async () => {
        const permissions =
          Platform.OS === 'android'
            ? osVer < 33
              ? [
                  PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
                  PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
                ]
              : [PERMISSIONS.ANDROID.READ_MEDIA_IMAGES]
            : [PERMISSIONS.IOS.PHOTO_LIBRARY];

        const checkResult = await CheckPermissions(permissions);

        switch (checkResult) {
          case 0:
            const requestStatus = await RequestPermissions(permissions);
            if (requestStatus === 1) {
              imagePickerHandler();
            } else {
              permissionDenied();
            }
            break;
          case -1:
            permissionDenied();
            break;

          case 1:
            imagePickerHandler();
            break;
        }
      }, 100);
    }, [imagePickerHandler]);

    return (
      <Modal
        transparent={true}
        statusBarTranslucent={true}
        animationType="fade"
        visible={visible}>
        <Pressable onPress={close} style={styles.model}>
          <Pressable onPress={() => {}} style={styles.container}>
            <View style={styles.titleContainer}>
              <Font800 style={styles.title}>{'Change Profile Photo'}</Font800>
            </View>
            <Font500>
              {'Choose an option to update your profile picture.'}
            </Font500>
            <View style={styles.buttonContainer}>
              <Button
                onPress={onOpenCameraHandler}
                buttonContainerStyle={styles.cancelButton}
                buttonTextStyle={styles.cancelButtonText}>
                {'Take Photo'}
              </Button>
              <Button
                onPress={onOpenGalleryHandler}
                buttonContainerStyle={styles.confirmButton}>
                {'Pick Image'}
              </Button>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    );
  },
);

export default memo(FetchImageModel);

const styles = StyleSheet.create({
  model: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.transparent_black,
  },
  success: {
    position: 'absolute',
    height: 60,
    width: 60,
    top: -30,
    alignSelf: 'center',
  },
  container: {
    backgroundColor: colors.white,
    padding: 16,
    paddingVertical: 24,
    borderRadius: 10,
    width: '90%',
  },
  titleContainer: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBlockColor: colors.lightGray,
  },
  title: {
    fontSize: 22,
    marginBottom: 5,
    color: colors.colorA42242,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
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
