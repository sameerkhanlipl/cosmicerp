import { useNavigation } from "@react-navigation/native";
import React, { memo, useCallback, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import { images } from "../../assets/images";
import Button from "../../components/styles/Button";
import Header from "../../components/styles/Header";
import { colors } from "../../constants/colors";
import { fontFamily } from "../../constants/fontFamily";
import { AppNavigationProp } from "../../stacks/StackTypes";
import LaminationCompleteOrders from "./LaminationCompleteOrders";
import LaminationPendingOrders from "./LaminationPendingOrders";

const { width } = Dimensions.get("window");

const Lamination = () => {
  const [activeTab, setActiveTab] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const { navigate } = useNavigation<AppNavigationProp>();

  const switchTab = (tabIndex: number) => {
    setActiveTab(tabIndex);
    Animated.timing(translateX, {
      toValue: tabIndex * width,
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  const onNavigateLaminationMaterialOut = useCallback(() => {
    navigate("LaminationMaterialOut");
  }, [navigate]);

  const onNavigateLaminationMaterialIn = useCallback(() => {
    navigate("LaminationMaterialIn");
  }, [navigate]);

  const onNavigateSearchOrders = useCallback(() => {
    navigate("LaminationSearchOrders");
  }, [navigate]);

  return (
    <View style={styles.root}>
      <Header
        title="Lamination Order"
        onSearchIconPress={onNavigateSearchOrders}
      />
      <View style={styles.tabContainer}>
        <Animated.View
          style={[
            styles.indicator,
            {
              transform: [
                {
                  translateX: translateX.interpolate({
                    inputRange: [0, width],
                    outputRange: [0, width / 2]
                  })
                }
              ]
            }
          ]}
        />
        <Pressable style={styles.tab} onPress={() => switchTab(0)}>
          <Text
            style={[styles.tabLabel, activeTab === 0 && styles.activeLabel]}
          >
            {"Pending Orders"}
          </Text>
        </Pressable>
        <Pressable style={styles.tab} onPress={() => switchTab(1)}>
          <Text
            style={[styles.tabLabel, activeTab === 1 && styles.activeLabel]}
          >
            {"Completed Orders"}
          </Text>
        </Pressable>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={onNavigateLaminationMaterialOut}
          icon={images.material_out}
          buttonContainerStyle={styles.materialOutButton}
          iconStyle={styles.materialOutIconStyle}
          buttonTextStyle={styles.materialOutButtonText}
        >
          {"Material Out"}
        </Button>
        <Button
          onPress={onNavigateLaminationMaterialIn}
          icon={images.material_out}
          buttonContainerStyle={styles.materialInButton}
          iconStyle={styles.materialInIconStyle}
          buttonTextStyle={styles.materialInButtonText}
        >
          {"Material In"}
        </Button>
      </View>
      <Animated.View
        style={[
          styles.screenContainer,
          {
            transform: [{ translateX: Animated.multiply(translateX, -1) }]
          }
        ]}
      >
        <LaminationPendingOrders />
        <LaminationCompleteOrders />
      </Animated.View>
    </View>
  );
};

export default memo(Lamination);

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    position: "relative"
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.color_22534F
  },
  tabLabel: {
    fontSize: 14,
    fontFamily: fontFamily.Font400,
    color: colors.transparent_white_8
  },
  activeLabel: {
    fontSize: 14,
    color: colors.white,
    fontFamily: fontFamily.Font500
  },
  indicator: {
    position: "absolute",
    height: 3,
    bottom: 0,
    zIndex: 1,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: colors.white,
    width: Dimensions.get("window").width * 0.35,
    marginHorizontal: Dimensions.get("window").width * 0.075
  },
  screenContainer: {
    flexDirection: "row",
    width: width * 2
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0"
  },
  buttonContainer: {
    zIndex: 1,
    right: 22,
    flexDirection: "row",
    position: "absolute",
    bottom: 10
  },
  materialOutButton: {
    height: 32,
    marginRight: 2,
    borderRadius: 0,
    paddingHorizontal: 10,
    borderTopLeftRadius: 29,
    borderBottomLeftRadius: 29,
    backgroundColor: colors.color_42958F
  },
  materialOutIconStyle: {
    height: 22,
    width: 22
  },
  materialOutButtonText: {
    fontSize: 10,
    paddingLeft: 6,
    fontFamily: fontFamily.Font500
  },
  materialInButton: {
    height: 32,
    borderRadius: 0,
    paddingHorizontal: 10,
    borderTopRightRadius: 29,
    borderBottomRightRadius: 29,
    flexDirection: "row-reverse",
    backgroundColor: colors.color_42958F
  },
  materialInIconStyle: {
    height: 22,
    width: 22,
    transform: [{ scaleX: -1 }]
  },
  materialInButtonText: {
    fontSize: 10,
    paddingRight: 6,
    fontFamily: fontFamily.Font500
  }
});
