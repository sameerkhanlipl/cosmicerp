import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import PinchableView from 'react-native-pinchable';
import {images} from '../../assets/images';
import {colors} from '../../constant/colors';
import Font600 from '../fonts/Font600';

export type ImageModelRef = {
  open: () => void;
  close: () => void;
};

type ImageModelProps = {
  image: string;
  title: string;
};

const windowWidth = Dimensions.get('screen').width;

const ImageModel = forwardRef<ImageModelRef, ImageModelProps>((props, ref) => {
  const {image, title} = props;
  const [imageSize, setImageSize] = useState<
    {height: number | undefined; width: number | undefined} | undefined
  >();
  const [show, setShow] = useState(false);

  const close = useCallback(() => {
    setShow(false);
  }, []);

  useImperativeHandle(
    ref,
    () => {
      return {
        open: () => setShow(true),
        close: close,
      };
    },
    [close],
  );

  useEffect(() => {
    if (!image) {
      return;
    }
    Image.getSize(
      image,
      (w, h) => {
        if (w > 0 && h > 0) {
          setImageSize({height: (windowWidth * h) / w, width: windowWidth});
        }
      },
      error => {
        console.log('ERROR :: ', error);
      },
    );
  }, [image]);

  const imageHeight: number =
    imageSize?.width && imageSize?.height && imageSize?.height > 0
      ? imageSize?.height - (imageSize?.height / imageSize?.width) * 42
      : 0;

  const cancelHandler = useCallback(() => {
    setShow(false);
  }, []);

  return (
    // <Confirmation ref={modelRef}>
    <Modal transparent={true} visible={show} animationType="fade">
      <View style={styles.model}>
        <View style={styles.root}>
          <Pressable onPress={cancelHandler} style={styles.iconContainer}>
            <FastImage
              source={images.close}
              style={styles.closeIcon}
              resizeMode="contain"
            />
          </Pressable>
          <View style={styles.header}>
            <Font600 style={styles.title}>{title}</Font600>
          </View>
          <PinchableView minimumZoomScale={1} maximumZoomScale={3}>
            <FastImage
              source={{uri: image}}
              style={[styles.imageStyle, {height: imageHeight}]}
              resizeMode="contain"
            />
          </PinchableView>
        </View>
      </View>
    </Modal>
  );
});

export default memo(ImageModel);

const styles = StyleSheet.create({
  model: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
  },
  root: {
    minHeight: 400,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    borderRadius: 14,
    paddingVertical: 10,
    marginHorizontal: 20,
  },
  iconContainer: {
    width: 50,
    height: 30,
    paddingVertical: 5,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  closeIcon: {
    height: 15,
    width: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  title: {
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
    color: colors.colorA42242,
  },
  imageStyle: {
    width: '100%',
    paddingVertical: 20,
    minHeight: 150,
  },
});
