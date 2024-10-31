import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC, memo, useState} from 'react';
import {Image, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {images} from '../assets/images';
import {Font400, Font500, Font600} from '../components/fonts/Fonts';
import {colors} from '../constants/colors';
import Button from '../components/styles/Button';

type SelectRoleProps = NativeStackScreenProps<AuthStackParamList, 'SelectRole'>;

const Roles: string[] = [
  'Extruder',
  'Rewinder',
  'Worker',
  'Lamination',
  'Packer',
  'Shilai',
];

const SelectRole: FC<SelectRoleProps> = ({navigation}: SelectRoleProps) => {
  const {top} = useSafeAreaInsets();

  const [selectedRole, setSelectedRole] = useState('');

  return (
    <View style={[styles.root, {paddingTop: top}]}>
      <ScrollView contentContainerStyle={styles.scrollRoot}>
        <Pressable onPress={navigation.goBack}>
          <Image
            source={images.back}
            resizeMode="contain"
            style={styles.backIcon}
          />
        </Pressable>
        <Font600 style={styles.title}>{'Select your Role'}</Font600>
        <Font400
          style={
            styles.subTitle
          }>{`Based on your work you have to select role `}</Font400>
        <View style={styles.roleMainContainer}>
          {Roles?.map((ele: string, index: number) => (
            <Pressable
              style={[
                styles.roleContainer,
                ele === selectedRole ? styles?.selectedRoleContainer : {},
              ]}
              key={index?.toString()}
              onPress={setSelectedRole?.bind(null, ele)}>
              <Font500
                style={[
                  styles.role,
                  ele === selectedRole ? styles.selectedRole : {},
                ]}>
                {ele}
              </Font500>
            </Pressable>
          ))}
        </View>
        <Button buttonContainerStyle={styles.button}>{'Continua'}</Button>
      </ScrollView>
    </View>
  );
};

export default memo(SelectRole);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollRoot: {
    flexGrow: 1,
    paddingHorizontal: 27,
  },
  backIcon: {
    height: 28,
    width: 28,
  },
  title: {
    fontSize: 30,
    marginTop: 40,
  },
  subTitle: {
    marginVertical: 28,
    color: colors.transparent_black_7,
  },
  roleMainContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  roleContainer: {
    height: 42,
    borderWidth: 1,
    borderRadius: 21,
    paddingHorizontal: 30,
    justifyContent: 'center',
    borderColor: colors.color_D5E4E3,
    marginRight: 13,
    marginBottom: 13,
  },
  selectedRoleContainer: {
    borderColor: colors.color_22534F,
    backgroundColor: colors.color_22534F,
  },
  role: {
    fontSize: 14,
    color: colors.transparent_black_7,
  },
  selectedRole: {
    color: colors.white,
  },
  button: {
    marginTop: 28,
  },
});
