import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import {
  initializeAudio,
  playPause,
  releaseAudio,
} from "@src/utils/soundUtils";
import { orderAPI } from "@src/services/api";
import toast from "@src/services/toast";
import { routes } from "@src/navigation/routes";
import { colors } from "@src/globals/colors";
import { TextField } from "@src/components/TextField/TextField";
import {
  BORDER_RADIUS_SIZE,
  MEDIUM_PADDING_SIZE,
  REGULAR_PADDING_SIZE,
} from "@src/globals/themes";
import { Spacer } from "@src/components/common/Spacer";
import { LoadingIndicator } from "@src/components/LoadingIndicator";
import Button from "@src/components/Button/Button";
import CongratulationsModal from "@src/components/CongratulationsModal/CongratulationsModal";
import CongratulationScreen from "@src/features/CongratulationScreen/CongratulationScreen";
import { useTranslation } from "react-i18next";

export const SelectedProcessSummary = ({ route }) => {
  const navigation = useNavigation<any>();
  const [isModalVisible, setisModalVisible] = useState(false);

  const { preSortData, outputList } = route.params;
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    initializeAudio();
    return () => {
      releaseAudio();
    };
  }, []);

  const onSubmit = () => {
    const postData = { ...preSortData };
    postData.inputMaterialTypeId = preSortData?.inputMaterialTypeId?.id;
    console.log(postData);

    setLoading(true);

    orderAPI.postProduction(postData).then((res) => {
      setLoading(false);
      if (res?.data) {
        setisModalVisible(true);
        playPause();
      } else {
        toast.danger({ message: "Try again!" });
        return;
      }
    });

    // setLoading(false);
    // setisModalVisible(true);
    // playPause();
  };
  const _onRequestClose = () => {
    navigation.navigate(routes.bottomTabs.default);
    setisModalVisible((prevState) => !prevState);
  };

  return (
    <View style={{ backgroundColor: colors.backgroundColor, flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <View style={styles.box}>
            <TextField
              style={[
                {
                  color: colors.neutral_dark,
                  fontSize: 18,
                  fontWeight: "bold",
                },
              ]}
            >
              {t("Production")}
            </TextField>
            <Spacer spacing={8} />
            <View style={styles.rowCont}>
              <TextField>{t("Process")}</TextField>
              <TextField style={styles.rightText}>
                {preSortData?.processName}
              </TextField>
            </View>
            <View style={styles.rowCont}>
              <TextField>{t("Date")}</TextField>
              <TextField style={styles.rightText}>
                {dayjs(Date.now()).format("DD/MM/YYYY")}
              </TextField>
            </View>

            {/* <View style={styles.rowCont}>
              <TextField>Operating Hours</TextField>
              <TextField style={styles.rightText}>
                {preSortData?.operatingHours}
              </TextField>
            </View>
            <View style={styles.rowCont}>
              <TextField>Crew Size</TextField>
              <TextField style={styles.rightText}>
                {preSortData?.teamSize}
              </TextField>
            </View> */}
          </View>
          <Spacer spacing={10} />

          <View style={styles.bottomBox}>
            <View>
              <View style={styles.headingBox}>
                <TextField style={styles.headingText}>
                  {t("Input Material")}
                </TextField>
                <TextField style={styles.headingText}>{t("Qty")}</TextField>
              </View>
              <Spacer spacing={3} />

              <View style={styles.eachListBox}>
                <TextField style={styles.listText}>
                  {preSortData?.inputMaterialTypeId?.label}
                </TextField>
                <TextField style={styles.listText}>
                  {preSortData?.inputQuantity}
                </TextField>
              </View>
            </View>

            <Spacer spacing={20} />

            <View>
              <View style={styles.headingBox}>
                <TextField style={styles.headingText}>
                  {t("Output Material")}
                </TextField>
                <TextField style={styles.headingText}>{t("Qty")}</TextField>
              </View>
              <Spacer spacing={3} />
              {Object.entries(preSortData?.productionItem).map(
                ([key, value]) => (
                  <View style={styles.eachListBox} key={key}>
                    <TextField style={styles.listText}>
                      {outputList.find((each) => each.id === key).name}
                    </TextField>
                    <TextField style={styles.listText}>{value}</TextField>
                  </View>
                )
              )}
              {preSortData.wastage ? (
                <View style={styles.eachListBox} key={"wastage"}>
                  <TextField style={styles.listText}>{t("Wastage")}</TextField>
                  <TextField style={styles.listText}>
                    {preSortData.wastage}
                  </TextField>
                </View>
              ) : (
                <></>
              )}
            </View>
            <Spacer spacing={15} />

            <TextField
              style={{
                textAlign: "right",
                fontSize: 14,
                color: colors.primary,
              }}
            >
              {t("Note: All quantity in Kgs")}
            </TextField>
          </View>
          <Spacer spacing={10} />

          <Button onPress={() => onSubmit()} title={t("Save")}>
            {loading && <LoadingIndicator activityColor="white" />}
          </Button>
          <Spacer spacing={10} />
        </View>
      </ScrollView>

      <CongratulationsModal
        modalVisible={isModalVisible}
        onRequestClose={_onRequestClose}
      >
        <CongratulationScreen
          onRequestClose={_onRequestClose}
          heading=""
          message={t(`Production Record Updated.`)}
          bottomContent={
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button title={t("Done")} onPress={_onRequestClose} />
            </View>
          }
        />
      </CongratulationsModal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: REGULAR_PADDING_SIZE,
    marginVertical: 15,
  },
  box: {
    borderRadius: BORDER_RADIUS_SIZE,
    backgroundColor: colors.white,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: MEDIUM_PADDING_SIZE,
    paddingHorizontal: MEDIUM_PADDING_SIZE,
    marginTop: 15,
    width: "100%",
  },
  rowCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  rightText: {
    marginVertical: 3,
    width: "55%",
    textAlign: "right",
  },

  bottomBox: {
    borderRadius: BORDER_RADIUS_SIZE,
    backgroundColor: colors.white,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: MEDIUM_PADDING_SIZE,
    paddingHorizontal: MEDIUM_PADDING_SIZE,
    width: "100%",
  },
  headingBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  headingText: {
    color: colors.white,
    fontWeight: "bold",
  },
  eachListBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 15,

    borderColor: colors.borderColor,
  },
  listText: { color: colors.neutral_dark },
});
