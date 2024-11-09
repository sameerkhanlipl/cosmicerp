import React, {FC, memo} from 'react';
import {ColorValue, Dimensions, Image, StyleSheet, View} from 'react-native';
import {images} from '../../assets/images';
import {Font700} from '../fonts/Fonts';
import {colors} from '../../constants/colors';

type EmptyListProps = {
  loader: boolean;
  message: string;
  tintColor?: ColorValue;
};

const EmptyList: FC<EmptyListProps> = props => {
  const {loader, message, tintColor} = props;

  return (
    <View style={styles.root}>
      <Image
        tintColor={tintColor ? tintColor : colors.color_22534F}
        source={images.empty}
        resizeMode="contain"
        style={styles.image}
      />
      <Font700
        style={[
          styles.text,
          {color: tintColor ? tintColor : colors.color_22534F},
        ]}>
        {loader ? 'Loading...' : message}
      </Font700>
    </View>
  );
};

export default memo(EmptyList);

const styles = StyleSheet.create({
  root: {
    paddingVertical: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
  },
  image: {
    height: 60,
    width: 60,
  },
  text: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 10,
    textAlign: 'center',
    paddingHorizontal: 70,
  },
});
