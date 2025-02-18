import React, {
    forwardRef,
    memo,
    useCallback,
    useImperativeHandle,
    useState
} from "react";
import { Alert, Modal, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Font400, Font500, Font600, Font800 } from "../fonts/Fonts";
import Button from "../styles/Button";
import { colors } from "../../constants/colors";
import RNPrint from "react-native-print";
import { ShowToast } from "../../utils/ErrorHandler";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EmptyList from "../styles/EmptyList";

export type RecipeModalRef = {
    open: () => void;
    close: () => void;
};

interface PrintItem {
    alias_sku?: string;
    serial_number?: string;
    product_name?: string;
    pending_bundle_qty?: string | number;
    length?: string | number;
    rolls_in_1_bdl?: string | number;
    material_name?: string;
    color?: string;
    packing_sticker?: string;
    MAX?: number | string;
    MIN?: number | string;
    bdl_kg?: string;
    order_id?: string;
    production_order_id?: string;
    labour_name: string;
    recipe_materials: []
}

type RecipeModalProps = {
    title?: string;
    subTitle?: string;
    Item?: PrintItem;
    onPress?: () => void;
    labour_name: string;
};
const RecipeModal = forwardRef<RecipeModalRef, RecipeModalProps>(
    ({ title, subTitle, onPress, Item }, ref) => {
        const [visible, setVisible] = useState(false);
        const [select, setSelect] = useState("");
        const [loader, setLoader] = useState(false);

        const dispatch = useDispatch<AppDispatch>();
        const user = useSelector((state: RootState) => state?.app?.user);

        const close = useCallback(() => {
            setSelect("");
            setVisible(false);
        }, []);

        useImperativeHandle(
            ref,
            () => {
                return {
                    open: () => setVisible(true),
                    close: close
                };
            },
            [close]
        );

        return (
            <Modal
                visible={visible}
                transparent={true}
                statusBarTranslucent={true}
                animationType="fade"
            >
                <View style={styles.model}>
                    <View style={styles.content}>
                        <View style={styles.titleContainer}>
                            <Font800 style={styles.title}>{title}</Font800>
                        </View>
                        <ScrollView horizontal={true}>
                            {Item?.recipe_materials.length === 0 ?
                                (
                                    <EmptyList loader={loader} message="Not have any Recipe!" />
                                ) : (
                                    <View style={styles.showContainer}>
                                        <View style={styles.headerContainer}>
                                            <Font600 style={styles.label}> {"Material Sub category"}</Font600>
                                            <Font600 style={styles.label}> {"Material Name"}</Font600>
                                            <Font600 style={styles.label}> {"Top Layer %"}</Font600>
                                            <Font600 style={styles.label}> {"Middle Layer %"}</Font600>
                                            <Font600 style={styles.label}> {"Percentage %"}</Font600>
                                        </View>
                                        {Item?.recipe_materials.map((item: any, index: any) => (
                                            <View style={[styles.valueContainer, { borderBottomWidth: index != Item?.recipe_materials.length - 1 ? 0.5 : 0 }]}>
                                                <Font600 style={styles.value}> {item?.submaterial_name}</Font600>
                                                <Font600 style={styles.value}> {item?.material_name}</Font600>
                                                <Font600 style={styles.value}> {item?.up}</Font600>
                                                <Font600 style={styles.value}> {item?.downs}</Font600>
                                                <Font600 style={styles.value}> {item?.percentage}</Font600>
                                            </View>
                                        ))
                                        }
                                    </View>
                                )
                            }
                        </ScrollView>
                        <View style={styles.buttonContainer}>
                            <Button
                                onPress={close}
                                buttonContainerStyle={styles.cancelButton}
                                buttonTextStyle={styles.cancelButtonText}
                            >
                                {"Cancel"}
                            </Button>

                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
);

export default memo(RecipeModal);

const styles = StyleSheet.create({
    model: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.transparent_black
    },
    content: {
        backgroundColor: colors.white,
        padding: wp("2%"),
        paddingVertical: 24,
        borderRadius: 10,
        width: "95%"
    },
    titleContainer: {
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBlockColor: colors.lightGray
    },
    title: {
        fontSize: 22,
        marginBottom: 5,
        color: colors.color_22534F
    },
    label: {
        fontSize: wp("2.5%"),
        marginBottom: 5,
        color: colors.color_777777,
        width: wp("21%"),
        textAlign: 'center',

    },
    value: {
        fontSize: wp("2.5%"),
        marginBottom: 5,
        color: colors.black,
        width: wp("21%"),
        textAlign: 'center',

    },
    subTitle: {
        marginBottom: 20
    },
    buttonContainer: {
        flexDirection: "row"
    },
    showContainer: {
        // alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 0.5,
        borderRadius: 5,
        padding: wp("2%"),
        marginVertical: hp("1%"),

    },
    headerContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        //  paddingHorizontal: 10,
        marginVertical: hp("0.5%"),
        borderBottomWidth: 1,

        // padding: 10,
        // borderRadius: 5
    },
    valueContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        //  paddingHorizontal: 10,
        marginVertical: hp("0.5%"),
        borderBottomWidth: 0.5,
        // padding: 10,
        // borderRadius: 5
    },
    showButton: {
        // flex: 1,
        borderRadius: 5,
        paddingHorizontal: 20,

        borderWidth: 0.5,
        backgroundColor: colors.white
    },
    showButtonSelect: {
        // flex: 1,
        borderRadius: 5,
        paddingHorizontal: 20,
        backgroundColor: colors.color_22534F,
        borderWidth: 0.5
    },
    showButtonText: {
        color: colors.black
    },
    showButtonTextSelect: {
        color: colors.white
    },
    cancelButton: {
        flex: 1,
        height: 40,
        paddingHorizontal: 20,
        backgroundColor: colors.white,
        borderWidth: 1,
      
    },
    cancelButtonText: {
        color: colors.black
    },
    confirmButton: {
        flex: 1,
        height: 40,
        paddingHorizontal: 20,
        marginLeft: 10
    }
});
