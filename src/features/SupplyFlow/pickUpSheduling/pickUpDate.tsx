import React, { useEffect, useMemo, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Pressable,
  View,
  ScrollView,
} from "react-native";
import { Spacer } from "../../../components/common/Spacer";
import dayjs from "dayjs";
import { colors } from "../../../globals/colors";
import { TextBold, TextField } from "../../../components/TextField/TextField";
import {
  Fonts,
  BORDER_RADIUS_SIZE,
  MEDIUM_PADDING_SIZE,
  REGULAR_PADDING_SIZE,
  LARGE_PADDING_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
} from "../../../globals/themes";
import Button from "../../../components/Button/Button";
import { globalStyle } from "../../../globals/globalStyles";
import CheckBox from "../../../components/CheckBox/CheckBox";
import OrderReceivedView from "./OrderReceivedView";
import CongratulationsModal from "../../../components/CongratulationsModal/CongratulationsModal";
import { availableDate } from "./constants";
import { useAppDispatch } from "../../../redux/store";
import {
  BottomModalActions,
  postOrderReturnActions,
} from "../../../redux/actions/combineAction";
import { useSelector } from "react-redux";
import {
  selectPostOrderReturnLoading,
  selectPostOrderReturnSuccess,
  selectPostOrderReturnSuccessData,
  selectUserId,
} from "../../../redux/selectors";
import { dateTOepoch } from "../../../utils/dateUtils";
import toast from "../../../services/toast";
import { LoadingIndicator } from "../../../components/LoadingIndicator";
import { DropDown } from "../../../components/Dropdown/DropDown";
import { axiosInstance } from "../../../helpers/axiosHelper";
import CongratulationScreen from "../../CongratulationScreen/CongratulationScreen";
import {
  playPause,
  releaseAudio,
  initializeAudio,
} from "../../../utils/soundUtils";
import Tooltip from "react-native-walkthrough-tooltip";
import { DynamicIcon } from "@src/utils/Dynamic/DynamicIcon";
import TooltipComp from "@src/components/TooltipComp/TooltipComp";
import { useTranslation } from "react-i18next";
import { FastImage } from "@src/components/image";
import { FileImagePicker } from "@src/components/ImagePicker/FileImagePicker";
import { uploadImage } from "@src/services/uploadImage";
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

// const availableTime = [
//   {
//     id: 1,
//     from: '8:00 AM',
//     to: '12:00 PM'
//   },
//   {
//     id: 2,
//     from: '2:00 PM',
//     to: '6:00 PM'
//   }
// ];

export const PickUpDate = ({ navigation, route }) => {
  useEffect(() => {
    initializeAudio();
    return () => {
      releaseAudio();
    };
  }, []);

  const { t } = useTranslation();

  const { data } = route?.params;
  const dispatch = useAppDispatch();
  const [selectedDate, setselectedDate] = useState<Date>(null);
  const [selectedTime, setselectedTime] = useState({
    id: 0,
    isSelected: false,
    from: "",
    to: "",
  });
  const [isModalVisible, setisModalVisible] = useState(false);
  const postSuccess = useSelector(selectPostOrderReturnSuccess);
  const successData = useSelector(selectPostOrderReturnSuccessData);
  const isLoading = useSelector(selectPostOrderReturnLoading);
  const [totalAmount, setTotalAmount] = useState(0);
  const [month, setMonth] = useState(dayjs().format("MMMM"));
  const customerId = useSelector(selectUserId);
  const [recyclerList, setRecyclerList] = useState([]);
  const [recyclerId, setRecyclerId] = useState();

  const [toolTipVisible, setToolTipVisible] = useState(false);
  const [toolTipVisible1, setToolTipVisible1] = useState(false);

  const [image, setImage] = useState(null);
  const [invoiceImage, setInvoiceImage] = useState(null);
  const [submitting, setIsSubmitting] = useState(false);

  const filterItem: any = useMemo(() => {
    var totalAmount = 0;
    data.map((item, index) => {
      totalAmount = totalAmount + item.quantity * item.sp;
    });
    setTotalAmount(totalAmount);
  }, [data]);

  const _onPressDate = (selectedDate: Date, month) => () => {
    setMonth(month);
    setselectedDate(selectedDate);
  };

  const _onTimeSelected = (selectedTimeProps: any) => {
    setselectedTime(selectedTimeProps);
  };
  const getRecylers = async () => {
    const response = await axiosInstance.get(`users?type=RECYCLER`);
    const updatedList = response?.data?.map((obj) => {
      return {
        id: obj?.id,
        label: obj?.personalDetails?.name,
        value: obj?.id,
        ...obj,
      };
    });
    setRecyclerList(updatedList);
  };
  useEffect(() => {
    getRecylers();
  }, []);

  const _onConfirmPress = async () => {
    if (!recyclerId) {
      toast.danger({
        message: t("Please select the recycler!"),
      });
      return;
    }

    if (!image) {
      return toast.danger({ message: t("Please add the registration plate") });
    }
    if (!invoiceImage) {
      return toast.danger({ message: t("Please add the material picture") });
    }

    setIsSubmitting(true);
    const imageUrl = image && (await uploadImage(image));
    const invoiceImageUrl = invoiceImage && (await uploadImage(invoiceImage));
    setIsSubmitting(false);
    // if (!selectedDate) {
    //   toast.danger({
    //     message: t("Please select the pickup date!"),
    //   });
    //   return;
    // }
    // else if (!selectedTime.from) {
    //   toast.danger({
    //     message: 'Please select the pickup time!'
    //   });
    //   return;
    // }

    const formatedData = [...data]?.map((item) => {
      return {
        itemId: item?.itemId,
        itemName: item?.itemName,
        quantity: item?.quantity,
        price: item?.sp,
        deduction: item?.deduction ?? 0.0,
      };
    });
    const recyclerInfo = recyclerList.find(
      (item) => item?.value === recyclerId
    );
    console.log(recyclerInfo, "00000000");
    // navigation.navigate("TransportationInfo", {
    navigation.navigate("Receipt", {
      data: {
        orderType: "RETURN",
        data: [
          {
            categoryId: data?.[0]?.categoryId,
            categoryName: data?.[0]?.categoryName,
            items: formatedData,
          },
        ],
        totalAmount: totalAmount,
        totalDeductionAmount: 2,
        note: "",
        userId: customerId,
        // pickupDate: dateTOepoch(selectedDate),
        // pickupSlot: `${selectedTime.from} to ${selectedTime.to}`,
        recyclerId: recyclerId || customerId,
        recyclerInfo,
        transportImage: imageUrl,
        invoiceImg: invoiceImageUrl,
      },
    });
    // dispatch(
    //   postOrderReturnActions.postReturnOrder({
    //     customerId: "", //TODO: need to add later
    //     orderType: "RETURN",
    //     data: [
    //       {
    //         categoryId: data?.[0]?.categoryId,
    //         items: formatedData,
    //       },
    //     ],
    //     totalAmount: totalAmount,
    //     totalDeductionAmount: 2,
    //     note: "",
    //     userId: customerId,
    //     pickupDate: dateTOepoch(selectedDate),
    //     pickupSlot: `${selectedTime.from} to ${selectedTime.to}`,
    //     centerId: recyclerId,
    //   })
    // );
  };

  useEffect(() => {
    if (postSuccess) {
      setisModalVisible(true);
      playPause();
    }
  }, [postSuccess]);

  const _onRequestClose = () => {
    setisModalVisible(false);
    dispatch(
      postOrderReturnActions.update({ success: false, successData: {} })
    );
    navigation.navigate("LandingStack");
  };

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      // contentContainerStyle={{  }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.mainContainer}>
        <View style={styles.dropDownView}>
          <DropDown
            tooltipPosition="bottom"
            tooltipChild={
              <TextField>
                Select the facility where you are dispatching the material. If
                you can not find the facility in the list please contact the
                support team
              </TextField>
            }
            lebel={t("Waste Management Co.")}
            placeholder={t("Select Waste Management Co.")}
            rightIconName="sort-down"
            setSelectedValue={setRecyclerId}
            combineOnPress={(rest) =>
              dispatch(
                BottomModalActions.toggleBottomModal({
                  title: t("Select Waste Management Co."),
                  showList: true,
                  data: recyclerList,
                  ...rest,
                })
              )
            }
          />

          <Spacer spacing={10} />

          <TextField
            style={{
              color: colors.primary,
              fontWeight: "bold",
            }}
          >
            {t("Registration Plate")} :{"  "}
            <TooltipComp
              children={
                <FastImage
                  source={require("../../../assets/tooltips/platenumber.jpg")}
                  style={{ width: 225, height: 220 }}
                  resizeMode="cover"
                />
              }
              tooltipPosition={"top"}
            />
          </TextField>
          <Spacer spacing={3} />
          <TextField style={{ color: colors.gray, fontSize: 14 }}>
            {t("Click the image of registration plate")}
          </TextField>
          <Spacer spacing={10} />

          <View style={{}}>
            <FileImagePicker setImage={setImage} title={t("Capture Picture")} />
          </View>
          <Spacer spacing={10} />
          <TextField
            style={{
              color: colors.primary,
              fontWeight: "bold",
            }}
          >
            {t("Material Picture")} :{"  "}
            <TooltipComp
              children={
                <FastImage
                  source={require("../../../assets/tooltips/materialimage.jpg")}
                  style={{ width: 225, height: 220 }}
                  resizeMode="cover"
                />
              }
              tooltipPosition={"top"}
            />
          </TextField>
          <Spacer spacing={3} />
          <TextField style={{ color: colors.gray, fontSize: 14 }}>
            {t("Click the image of material")}
          </TextField>
          <Spacer spacing={10} />
          <View style={{}}>
            <FileImagePicker
              setImage={setInvoiceImage}
              title={t("Capture Picture")}
            />
          </View>
        </View>

        {/* <View style={styles.calendarView}>
        <View
          style={{
            marginHorizontal: 20,
            marginBottom: 20,
            flexDirection: "row",
            gap: 5,
          }}
        >
          <TextBold>{month} </TextBold>
          <TooltipComp
            children={
              <TextField>
                Expected date by when the material will reach the supplier
              </TextField>
            }
            tooltipPosition={"bottom"}
          />
        </View>

        <View style={styles.flexRow}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 15,
            }}
          >
            {availableDate?.map((item) => {
              return (
                <TouchableOpacity
                  key={item.date}
                  style={[
                    styles.box,
                    !!selectedDate &&
                      selectedDate === item?.fullDate &&
                      styles.selectedBoxStyle,
                  ]}
                  onPress={_onPressDate(item?.fullDate, item?.month)}
                >
                  <TextField
                    style={[
                      styles.dateText,
                      !!selectedDate &&
                        selectedDate === item?.fullDate &&
                        styles.selectedDateStyle,
                    ]}
                  >
                    {item.date.padStart(2, "0")}
                  </TextField>
                  <TextField
                    style={[
                      styles.dayTitle,
                      !!selectedDate &&
                        selectedDate === item.fullDate &&
                        styles.selectedDateStyle,
                    ]}
                  >
                    {item.day}
                  </TextField>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View> */}

        <Spacer spacing={10} />

        <Button
          title={t("Confirm")}
          onPress={_onConfirmPress}
          disabled={isLoading || isModalVisible}
        >
          {submitting && <LoadingIndicator activityColor="white" />}
        </Button>

        <Spacer spacing={10} />

        <CongratulationsModal
          modalVisible={isModalVisible}
          onRequestClose={_onRequestClose}
        >
          <CongratulationScreen
            onRequestClose={_onRequestClose}
            heading=""
            message={` You have successfully placed a Supply order request. You will be initimated once the Recycler accepts the order. Check your supply order log for details.`}
            bottomContent={
              <View style={{ ...globalStyle.container }}>
                <Button
                  style={{
                    width: "80%",
                    backgroundColor: colors.white,
                    borderColor: colors.primary,
                    borderWidth: 1,
                  }}
                  textStyle={{ color: colors.primary }}
                  title={"Ok"}
                  onPress={_onRequestClose}
                />
              </View>
            }
          />
        </CongratulationsModal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignContent: "center",
    backgroundColor: colors.backgroundColor,
    paddingTop: REGULAR_PADDING_SIZE,
    paddingHorizontal: MEDIUM_PADDING_SIZE,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  dayTitle: {
    fontSize: 12,
    lineHeight: 22,
    textTransform: "uppercase",
  },
  timeText: {
    fontSize: 16,
    lineHeight: 22,
    color: colors.secondary,
  },
  marginTop: {
    marginTop: BORDER_RADIUS_SIZE,
  },
  marginLeft: {
    marginLeft: BORDER_RADIUS_SIZE,
  },
  dateText: {
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: 0.4,
  },
  selectedDateStyle: {
    color: colors.white,
  },
  checkBoxContainer: {
    flex: 0.1,
  },
  calendarView: {
    borderRadius: BORDER_RADIUS_SIZE,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: colors.white,
    paddingVertical: LARGE_PADDING_SIZE,
  },
  Icon: {
    height: 80,
    width: 80,
  },
  headerTitle: {
    color: colors.primary,
  },
  stepTitle: {
    marginBottom: BORDER_RADIUS_SIZE,
  },
  MainContainer: {
    flex: 1,
    padding: 6,
    alignItems: "center",
    backgroundColor: "white",
  },
  box: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryBG,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 14,
    width: 60,
    height: 70,
    marginHorizontal: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedBoxStyle: {
    backgroundColor: colors.primary,
  },
  text: {
    fontSize: 25,
    color: "red",
    padding: 3,
    marginBottom: 10,
    textAlign: "center",
  },
  timeFlexRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: MEDIUM_PADDING_SIZE,
    paddingVertical: 6,
  },
  flexRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  lineSeparator: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginVertical: MEDIUM_PADDING_SIZE,
    marginHorizontal: MEDIUM_PADDING_SIZE,
  },
  leftButtonStyle: {
    width: "45%",
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.white,
    marginRight: MEDIUM_PADDING_SIZE,
  },
  textStyle: {
    color: colors.dark,
  },
  dropDownView: {
    borderRadius: BORDER_RADIUS_SIZE,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: colors.white,
    padding: MEDIUM_PADDING_SIZE,
    paddingVertical: REGULAR_PADDING_SIZE,
  },
});
