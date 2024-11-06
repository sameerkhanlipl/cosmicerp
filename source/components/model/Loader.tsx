import React, {FC, memo} from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';

import {colors} from '../../constant/colors';

type LoaderProps = {
  loader: boolean;
};

const Loader: FC<LoaderProps> = props => {
  const {loader} = props;

  return (
    <Modal
      visible={loader}
      transparent={true}
      statusBarTranslucent={true}
      animationType="fade">
      <View style={styles.model}>
        <View style={styles.container}>
          <ActivityIndicator size={'small'} color={colors.black} />
        </View>
      </View>
    </Modal>
  );
};

export default memo(Loader);

const styles = StyleSheet.create({
  model: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.transparent_black,
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
  },
});
