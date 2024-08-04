import {
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  TextBold,
  TextField,
  TextSemiBold,
} from "@src/components/TextField/TextField";
import { colors } from "@src/globals/colors";
import { Spacer } from "@src/components/common/Spacer";
import { MEDIUM_PADDING_SIZE } from "@src/globals/themes";
import { users } from "@src/services/api";
import { epochToHumanReadable } from "@src/utils/dateUtils";
import { FastImage } from "@src/components/image";
import { NoDataView } from "@src/components/NoDataView";
import Tooltip from "react-native-walkthrough-tooltip";
import { DynamicIcon } from "@src/utils/Dynamic/DynamicIcon";
import TooltipComp from "@src/components/TooltipComp/TooltipComp";
import { useTranslation } from "react-i18next";

const Deals = () => {
  const [dealsList, setDealsList] = useState();
  const [toolTipVisible, setToolTipVisible] = useState(false);
  const [toolTipVisible1, setToolTipVisible1] = useState(false);

  useEffect(() => {
    users.getDeals().then((res) => {
      if (res?.data) {
        setDealsList(res?.data?.data);
      }
    });
  }, []);

  const { t } = useTranslation();

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: MEDIUM_PADDING_SIZE - 5,
        paddingVertical: 20,
        backgroundColor: colors.backgroundColor,
      }}
    >
      <FlatList
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        data={dealsList}
        ItemSeparatorComponent={() => <Spacer spacing={5} />}
        ListEmptyComponent={
          <NoDataView message={t("No deals currently applicable")} />
        }
        renderItem={({ item, index }) => (
          <ImageBackground
            source={require("../../../assets/others/pointbanner.png")}
            resizeMode="contain"
            style={{
              borderRadius: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              height: 122,
              paddingHorizontal: 25,
            }}
          >
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <View
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: 100,
                    backgroundColor: colors.shaded,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FastImage
                    source={{ uri: item?.itemIcon }}
                    style={{ width: 22, height: 22 }}
                    resizeMode={"contain"}
                  />
                </View>
                <TextSemiBold
                  style={{
                    color: colors.white,
                    fontWeight: "bold",
                  }}
                >
                  {item?.itemName}
                </TextSemiBold>
              </View>
              <Spacer spacing={5} />
              <TextSemiBold
                style={{
                  color: colors.white,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {epochToHumanReadable(item?.end)}
                {"  "}

                <TooltipComp
                  children={
                    <TextField>
                      {t("The deal price is valid till this date")}
                    </TextField>
                  }
                  tooltipPosition={"bottom"}
                />
              </TextSemiBold>
            </View>

            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <TextBold
                    style={{
                      color: colors.white,
                      fontSize: 16,
                      lineHeight: 38,
                      textAlign: "center",
                    }}
                  >
                    BONUS
                  </TextBold>
                  <TooltipComp
                    children={
                      <TextField>
                        {t("This is the current buying price of this material")}
                      </TextField>
                    }
                    tooltipPosition={"bottom"}
                  />
                </View>
                <TextBold
                  style={{
                    color: colors.white,
                    fontSize: 28,
                    lineHeight: 38,
                  }}
                >
                  RM {item?.dealPrice}/KG
                </TextBold>
              </View>
            </View>
          </ImageBackground>
        )}
        keyExtractor={(res) => res.id}
      />
    </View>
  );
};

export default Deals;

const styles = StyleSheet.create({});
