import React, {memo, useCallback, useRef} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {images} from '../../assets/images';
import {Font400, Font500} from '../../components/fonts/Fonts';
import GeneralModel, {
  GeneralModelRef,
} from '../../components/model/GeneralModel';
import CommonHeader from '../../components/styles/CommonHeader';
import {colors} from '../../constants/colors';
import {logout} from '../../store/appSlice';
import {AppDispatch} from '../../store/store';

const ProfileDetail = () => {
  const logoutModel = useRef<GeneralModelRef>(null);
  const dispatch = useDispatch<AppDispatch>();

  const onLogoutHandler = useCallback(() => {
    dispatch(logout());
  }, []);

  const onLogoutModelOPen = useCallback(() => {
    logoutModel?.current?.open();
  }, []);

  return (
    <View style={styles.root}>
      <GeneralModel
        title={'Confirm Logout'}
        subTitle={'Are you sure you want to log out of your account?'}
        ref={logoutModel}
        onPress={onLogoutHandler}
      />
      <CommonHeader title={'My Profile'} />
      <View style={styles.header}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg',
            }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.userDetails}>
          <Font500 style={styles.name}>{'Aaftab shekh'}</Font500>
          <Font400 style={styles.role}>{'supervisor'}</Font400>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.subContainer}>
          <View style={styles.iconContainer}>
            <Image
              source={images.phone_number}
              resizeMode="contain"
              style={styles.icon}
            />
          </View>
          <View style={styles.detail}>
            <Font400 style={styles.label}>{'Phone Number'}</Font400>
            <Font500 config={{numberOfLines: 1}} style={styles.value}>
              {'7383770936'}
            </Font500>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.subContainer}>
          <View style={styles.iconContainer}>
            <Image
              source={images.mail}
              resizeMode="contain"
              style={styles.icon}
            />
          </View>
          <View style={styles.detail}>
            <Font400 style={styles.label}>{'Email'}</Font400>
            <Font500 config={{numberOfLines: 1}} style={styles.value}>
              {'aaftabshekhdeveloper@gmail,com'}
            </Font500>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.subContainer}>
          <View style={styles.iconContainer}>
            <Image
              source={images.date}
              resizeMode="contain"
              style={styles.icon}
            />
          </View>
          <View style={styles.detail}>
            <Font400 style={styles.label}>{'Joining Date'}</Font400>
            <Font500 config={{numberOfLines: 1}} style={styles.value}>
              {'14 Sep 2013'}
            </Font500>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.subContainer}>
          <View style={styles.iconContainer}>
            <Image
              source={images.last_login}
              resizeMode="contain"
              style={styles.icon}
            />
          </View>
          <View style={styles.detail}>
            <Font400 style={styles.label}>{'Last Login'}</Font400>
            <Font500 config={{numberOfLines: 1}} style={styles.value}>
              {'Today, 21:10'}
            </Font500>
          </View>
        </View>

        <Pressable onPress={onLogoutModelOPen} style={[styles.logoutButton]}>
          <Image
            source={images.logout}
            resizeMode="contain"
            style={styles.icon}
          />
          <Font500 style={styles.logout}>{'Logout'}</Font500>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default memo(ProfileDetail);

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: colors.color_22534F},
  header: {
    paddingVertical: 33,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.color_22534F,
  },
  imageContainer: {
    width: 90,
    height: 90,
    marginLeft: 37,
    borderRadius: 45,
    overflow: 'hidden',
  },
  image: {
    height: 90,
    width: 90,
  },
  userDetails: {
    paddingLeft: 17,
  },
  name: {
    fontSize: 24,
    color: colors.white,
  },
  role: {
    fontSize: 15,
    color: colors.transparent_white_6,
  },
  container: {
    flex: 1,
    paddingTop: 44,
    paddingHorizontal: 37,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: colors.white,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.color_EBECEC,
  },
  icon: {
    height: 28,
    width: 28,
  },
  detail: {
    paddingHorizontal: 19,
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 14,
    color: colors.transparent_black,
  },
  value: {
    fontSize: 18,
  },
  line: {
    height: 1,
    marginVertical: 25,
    backgroundColor: colors.color_D5E4E3,
  },
  logoutButton: {
    zIndex: 1,
    height: 41,
    bottom: 40,
    borderWidth: 1,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    width: Dimensions.get('window').width - 64,
  },
  logout: {
    fontSize: 14,
  },
});
