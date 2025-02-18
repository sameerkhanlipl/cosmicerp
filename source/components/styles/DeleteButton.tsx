import React, {FC, memo, ReactNode} from 'react';
import {
  Image,
  ImageRequireSource,
  ImageStyle,
  Pressable,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {Font500, Font600} from '../fonts/Fonts';
import {colors} from '../../constants/colors';

export type ButtonProps = {
//   loader?: boolean;
//   onPress?: () => void;
//   buttonContainerStyle?: ViewStyle | ViewStyle[];
//   buttonTextStyle?: TextStyle;
//   children: ReactNode;
//   iconStyle?: ImageStyle;
//   icon?: ImageRequireSource;
};

const DeleteButton: FC<ButtonProps> = ({
//   loader,
//   onPress,
//   buttonContainerStyle,
//   buttonTextStyle = {},
//   children,
//   iconStyle,
//   icon,
}) => {
  return (
  
       <View style={styles.deleteButton}>
              <Font500 style={styles.deleteTxt}>{"Delete"}</Font500>
            </View>
  );
};

export default memo(DeleteButton);

const styles = StyleSheet.create({
  buttonContainer: {
    height: 52,
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.color_42958F,
  },
  buttonText: {
    fontSize: 18,
    color: colors.white,
  },

  deleteButton: {
    padding: 2,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
     borderColor: colors.color_22534F,
        backgroundColor: colors.color_F4F8F7,
  },
  deleteTxt: { fontSize: 14, color: "red" },
});
