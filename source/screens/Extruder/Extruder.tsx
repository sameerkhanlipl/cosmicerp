import React, {FC, memo, useCallback, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Header from '../../components/styles/Header';
import ExtruderCompleteOrders from './ExtruderCompleteOrders';
import ExtruderPendingOrders from './ExtruderPendingOrders';
import {fontFamily} from '../../constants/fontFamily';
import {colors} from '../../constants/colors';
import Button from '../../components/styles/Button';
import {images} from '../../assets/images';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../stacks/StackTypes';

const {width} = Dimensions.get('window');

type ExtruderProps = NativeStackScreenProps<AppStackParamList, 'MainStack'>;

const Extruder: FC<ExtruderProps> = ({navigation}: ExtruderProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  const switchTab = (tabIndex: number) => {
    setActiveTab(tabIndex);

    Animated.timing(translateX, {
      toValue: tabIndex * width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const onNavigateExtruderMaterialOut = useCallback(() => {
    navigation.navigate('ExtruderMaterialOut');
  }, []);

  return (
    <View style={styles.root}>
      <Header title="Extruders Orders" />
      <View style={styles.tabContainer}>
        <Animated.View
          style={[
            styles.indicator,
            {
              transform: [
                {
                  translateX: translateX.interpolate({
                    inputRange: [0, width],
                    outputRange: [0, width / 2],
                  }),
                },
              ],
            },
          ]}
        />
        <Pressable style={styles.tab} onPress={() => switchTab(0)}>
          <Text
            style={[styles.tabLabel, activeTab === 0 && styles.activeLabel]}>
            {'Pending Orders'}
          </Text>
        </Pressable>
        <Pressable style={styles.tab} onPress={() => switchTab(1)}>
          <Text
            style={[styles.tabLabel, activeTab === 1 && styles.activeLabel]}>
            {'Complete Orders'}
          </Text>
        </Pressable>
      </View>

      <Button
        onPress={onNavigateExtruderMaterialOut}
        icon={images.material_out}
        buttonContainerStyle={styles.button}
        iconStyle={styles.iconStyle}
        buttonTextStyle={styles.buttonText}>
        {'Material Out'}
      </Button>

      <Animated.View
        style={[
          styles.screenContainer,
          {
            transform: [{translateX: Animated.multiply(translateX, -1)}],
          },
        ]}>
        <ExtruderPendingOrders />
        <ExtruderCompleteOrders />
      </Animated.View>
    </View>
  );
};

export default memo(Extruder);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    position: 'relative',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.color_22534F,
  },
  tabLabel: {
    fontSize: 14,
    fontFamily: fontFamily.Font400,
    color: colors.transparent_white_8,
  },
  activeLabel: {
    fontSize: 14,
    color: colors.white,
    fontFamily: fontFamily.Font500,
  },
  indicator: {
    position: 'absolute',
    height: 3,
    bottom: 0,
    zIndex: 1,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: colors.white,
    width: Dimensions.get('window').width * 0.35,
    marginHorizontal: Dimensions.get('window').width * 0.075,
  },
  screenContainer: {
    flexDirection: 'row',
    width: width * 2,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  button: {
    zIndex: 1,
    right: 22,
    bottom: 17,
    height: 42,
    elevation: 4,
    shadowRadius: 4,
    borderRadius: 29,
    shadowOpacity: 0.2,
    position: 'absolute',
    paddingHorizontal: 20,
    shadowColor: colors.black,
    shadowOffset: {height: 2, width: 0},
    backgroundColor: colors.color_42958F,
  },
  iconStyle: {
    height: 22,
    width: 22,
  },
  buttonText: {
    fontSize: 14,
    paddingLeft: 6,
    fontFamily: fontFamily.Font500,
  },
});
