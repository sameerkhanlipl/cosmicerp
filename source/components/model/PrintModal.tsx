import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState
} from "react";
import { Alert, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { Font400, Font500, Font600, Font800 } from "../fonts/Fonts";
import Button from "../styles/Button";
import { colors } from "../../constants/colors";
import RNPrint from "react-native-print";
import { ShowToast } from "../../utils/ErrorHandler";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { packing_order_history_body } from "../../api/BodyTypes";
import { packing_order_history_listing_response } from "../../api/ResponseTypes";
import { packing_order_history } from "../../api/apis";
import { PackingOrderHistoryItemType } from "../../screens/Packing/PackingOrderHistoryItems";

export type PrintModalRef = {
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
}

type PrintModalProps = {
  title?: string;
  subTitle?: string;
  item?: PrintItem;
  onPress?: () => void;
  labour_name: string;
};
const PrintModal = forwardRef<PrintModalRef, PrintModalProps>(
  ({ title, subTitle, onPress, item, labour_name }, ref) => {
    const [visible, setVisible] = useState(false);
    const [select, setSelect] = useState("");

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

    const [list, setList] = useState<PackingOrderHistoryItemType[]>([]);
    const getList = async () => {
      const body: packing_order_history_body = {
        packing_production_order_id: item?.packing_production_order_id
      };
      try {
        const response: { data: packing_order_history_listing_response } =
          await packing_order_history(body);
        setList(response?.data?.data);
      } catch (err: any) {
      } finally {
      }
    };

    useEffect(() => {
      getList();
    }, [ref]);

    const data = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
      { id: 7 },
      { id: 8 },
      { id: 9 },
      { id: 10 },
      { id: 11 },
      { id: 12 },
      { id: 13 },
      { id: 14 },
      { id: 15 },
      { id: 16 },
      { id: 17 },
      { id: 18 },
      { id: 19 },
      { id: 20 },
      { id: 21 }
    ];

    const handlePrint = async () => {
      if (select == "") {
        ShowToast("Please select show or not length");
        return;
      }

      // Combine all HTML content into a single string
      const htmlContent = list
        .map(
          (items) => `
        <div class="label">
            <div class="spaced">
               <span>${item?.alias_sku || "N/A"}</span>
               <span>${moment(new Date()).format("DD/MM/YYYY")}</span>
               <span>O.NO: ${item?.serial_number || "Not Available"}</span>
            </div>
            <h1 style="font-size: 14px">${
              item?.product_name || "No Product Name"
            }</h1>

            <table>
                <tr>
                    <th>AVG K.G</th>
                    <th>Length</th>
                    <th>Rolls</th>
                    <th>Packed By</th>
                </tr>
                <tr>
                    <td class="center">${item?.bdl_kg || "N/A"}</td>
                    <td class="center">${
                      select === "Yes" ? item?.length : "N/A"
                    }</td>
                    <td class="center">${item?.rolls_in_1_bdl || "N/A"}</td>
                    <td class="center">${labour_name || "N/A"}</td>
                </tr>
            </table>
            <h2 class="center">${item?.material_name || "No Material"} - ${
            item?.color || "No Color"
          } - ${item?.packing_sticker || "No Sticker"}</h2>
            <table>
                <tr>
                    <th>Min (K.G)</th>
                    <th>Max (K.G)</th>
                    <th>WO No.</th>
                </tr>
                <tr>
                    <td class="center">${item?.MIN || "N/A"}</td>
                    <td class="center">${item?.MAX || "N/A"}</td>
                    <td class="center">${
                      item?.production_order_id || "N/A"
                    }</td>
                </tr>
            </table>
        </div>
      `
        )
        .join(""); // Join all HTML strings into one string

      // Wrap labels into a container that groups items in two columns per row
      const twoColumnsHTML = `
        <div style="display: flex; flex-wrap: wrap;">
          ${htmlContent}
        </div>
      `;

      // CSS styles
      const styles = `
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;

                display: flex;
                flex-wrap: wrap;
               height: 189px; /* 50mm */
            }
            .label {
               width: 379px;  /* 100mm */
                height: 189px; /* 50mm */
                border: 2px solid black;
                padding: 6px;
                background-color: #e6e6fa; /* Light purple to mimic the label color */
                box-sizing: border-box; /* Ensure padding is included in width/height calculation */
                margin: 11px ; /* Add margin between rows */
            }
            .spaced {
                margin: 4px 0;
                font-size: 10px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
            }
            .center {
                text-align: center;
                font-size: 14px;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                font-size: 10px;
                margin-top: 6px;
            }
            table, th, td {
                border: 1px solid black;
            }
            th, td {
                padding: 3px;
            }
            th {
                text-align: left;
            }
            td {
                text-align: center;
            }
        </style>
      `;

      const fullHTMLContent = `${styles}<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Label</title></head><body>${twoColumnsHTML}</body></html>`;

      try {
        await RNPrint.print({
          html: fullHTMLContent // Pass the full HTML content (with styles and labels)
        });
        console.log("Print or PDF saved successfully!");
        setVisible(false);
      } catch (error) {
        console.log("Error while printing or saving PDF:", error);
        setVisible(false);
      }
    };

    //   const handlePrint = async () => {
    //     if (select == "") {
    //       ShowToast("Please select show or not length");
    //       return;
    //     }

    //     // Combine all HTML content into a single string
    //     const htmlContent = `
    //   <html lang="en">
    //   <head>
    //       <meta charset="UTF-8">
    //       <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //       <title>Label</title>
    //       <style>
    //           body {
    //               font-family: Arial, sans-serif;
    //               margin: 0;
    //               padding: 0;
    //               display: flex;
    //               flex-wrap: wrap;
    //               height: 189px; /* 50mm */
    //                  }
    //           .label {
    //               width: 379px;  /* 100mm */
    //               height: 189px; /* 50mm */
    //              margin:10px;
    //               border: 2px solid black;
    //               padding: 6px;  /* Adjust padding to fit content */
    //               background-color: #e6e6fa; /* light purple to mimic the label color */
    //               box-sizing: border-box; /* Ensure padding is included in the width/height calculation */

    //           }
    //           .label h1 {
    //               font-size: 16px; /* Smaller font size for product name */
    //               margin: 4px 0;
    //               text-align: left;
    //               line-height: 1.2;
    //               word-wrap: break-word;
    //               font-weight: normal;
    //           }
    //           table {
    //               width: 100%;
    //               border-collapse: collapse;
    //               font-size: 10px; /* Adjust table font size */
    //               margin-top: 6px;
    //           }
    //           table, th, td {
    //               border: 1px solid black;
    //           }
    //           th, td {
    //               padding: 3px; /* Smaller padding for the table */
    //           }
    //           th {
    //               text-align: left;
    //           }
    //           td {
    //               text-align: center;
    //           }
    //           .spaced {
    //               margin: 4px 0; /* Adds vertical spacing between rows */
    //               font-size: 10px;
    //               display: flex; /* Enable flexbox */
    //               flex-direction: row; /* Arrange items in a row */
    //               justify-content: space-between; /* Distribute space evenly */
    //               align-items: center; /* Align items vertically in the center */
    //           }
    //           .center {
    //               text-align: center;
    //               font-size: 14px;
    //           }
    //       </style>
    //   </head>
    //   <body>
    //   ${data.map(
    //     (items: any, index: any) => `
    //       <div class="label">
    //           <div class="spaced">
    //              <span>${item?.alias_sku || ""}</span>
    //              <span>${moment(new Date()).format("DD/MM/YYYY")}</span>
    //              <span>O.NO : ${item?.serial_number || ""}</span>
    //           </div>
    //            <h1 style="font-size: 14px">${item?.product_name || ""}</h1>

    //           <table>
    //               <tr>
    //                   <th>AVG K.G</th>
    //                   <th>Length</th>
    //                   <th>Rolls</th>
    //                   <th>Packed By</th>
    //               </tr>
    //               <tr>
    //                   <td class="center">${item?.bdl_kg || ""}</td>
    //                   <td class="center">${
    //                     select === "Yes" ? item?.length : ""
    //                   }</td>
    //                   <td class="center">${item?.rolls_in_1_bdl || ""}</td>
    //                   <td class="center">${labour_name || ""}</td>
    //               </tr>
    //           </table>
    //           <h2 class="center">${item?.material_name || ""} - ${
    //       item?.color || ""
    //     } - ${item?.packing_sticker || ""}</h2>
    //           <table>
    //               <tr>
    //                   <th>Min (K.G)</th>
    //                   <th>Max (K.G)</th>
    //                   <th>WO No.</th>
    //               </tr>
    //               <tr>
    //                   <td class="center">${item?.MIN || ""}</td>
    //                   <td class="center">${item?.MAX || ""}</td>
    //                   <td class="center">${item?.production_order_id || ""}</td>
    //               </tr>
    //           </table>
    //       </div>`
    //   )}

    //   </body>
    //   </html>
    // `;

    //     try {
    //       await RNPrint.print({
    //         html: htmlContent // Pass the HTML content to the print function
    //       });
    //       console.log("Print or PDF saved successfully!");
    //       setVisible(false);
    //     } catch (error) {
    //       console.log("Error while printing or saving PDF:", error);
    //       setVisible(false);
    //     }
    //   };

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
            <View style={styles.showContainer}>
              <Font600 style={styles.showButtonText}>
                {"Show Length : "}
              </Font600>
              <TouchableOpacity
                style={
                  select === "Yes" ? styles.showButtonSelect : styles.showButton
                }
                onPress={() => setSelect("Yes")}
              >
                <Font400
                  style={
                    select === "Yes"
                      ? styles.showButtonTextSelect
                      : styles.showButtonText
                  }
                >
                  {"Yes"}
                </Font400>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  select === "No" ? styles.showButtonSelect : styles.showButton
                }
                onPress={() => setSelect("No")}
              >
                <Font400
                  style={
                    select === "No"
                      ? styles.showButtonTextSelect
                      : styles.showButtonText
                  }
                >
                  {"No"}
                </Font400>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                onPress={close}
                buttonContainerStyle={styles.cancelButton}
                buttonTextStyle={styles.cancelButtonText}
              >
                {"Cancel"}
              </Button>
              <Button
                onPress={() =>
                  // onPress
                  handlePrint()
                }
                buttonContainerStyle={styles.confirmButton}
              >
                {"Confirm"}
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
);

export default memo(PrintModal);

const styles = StyleSheet.create({
  model: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.transparent_black
  },
  content: {
    backgroundColor: colors.white,
    padding: 16,
    paddingVertical: 24,
    borderRadius: 10,
    width: "89%"
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
  subTitle: {
    marginBottom: 20
  },
  buttonContainer: {
    flexDirection: "row"
  },
  showContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: 15,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 5
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
    marginRight: 10
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
