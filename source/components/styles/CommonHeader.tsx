import React, {FC, memo} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {images} from '../../assets/images';
import {Font500} from '../fonts/Fonts';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../constants/colors';

type CommonHeaderProps = {
  title: string;
};

const CommonHeader: FC<CommonHeaderProps> = ({title}) => {
  const {top} = useSafeAreaInsets();
  const {goBack} = useNavigation();

  return (
    <View style={[styles.root, {paddingTop: top + 10}]}>
      <Pressable
        onPress={goBack}
        style={[styles.backIconContainer, {top: top + 10}]}>
        <Image
          source={images.back}
          resizeMode="contain"
          style={styles.backIcon}
          tintColor={colors.white}
        />
      </Pressable>
      <Font500 style={styles.title}>{title}</Font500>
    </View>
  );
};

export default memo(CommonHeader);

const styles = StyleSheet.create({
  root: {
    paddingTop: 24,
    paddingBottom: 21,
    flexDirection: 'row',
    backgroundColor: colors.color_22534F,
  },
  backIconContainer: {
    zIndex: 1,
    position: 'absolute',
    left: 24,
  },
  backIcon: {
    width: 28,
    height: 28,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: colors.white,
  },
});
