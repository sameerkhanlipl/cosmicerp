import React, {memo, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Header from '../../components/styles/Header';
import {colors} from '../../constants/colors';
import {fontFamily} from '../../constants/fontFamily';
import LaminationPendingOrders from './LaminationPendingOrders';
import LaminationCompleteOrders from './LaminationCompleteOrders';

const {width} = Dimensions.get('window');

const Lamination = () => {
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

  return (
    <View style={styles.root}>
      <Header title="Lamination Order" />
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

      {/* Tab Screens */}
      <Animated.View
        style={[
          styles.screenContainer,
          {
            transform: [{translateX: Animated.multiply(translateX, -1)}],
          },
        ]}>
        <LaminationPendingOrders />
        <LaminationCompleteOrders />
      </Animated.View>
    </View>
  );
};

export default memo(Lamination);

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
});
