import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useSelector } from "react-redux";

import { TextField, TextMedium } from "@src/components/TextField/TextField";
import { MEDIUM_PADDING_SIZE, REGULAR_PADDING_SIZE } from "@src/globals/themes";
import { colors } from "@src/globals/colors";
import { routes } from "@src/navigation/routes";
import OrderSvgIcon from "@src/assets/MoreScreenIcons/OrderSvgIcon";
import { selectProfile } from "@src/redux/selectors";
import SupplyOrderHistoryIcon from "@src/assets/MoreScreenIcons/SupplyOrderHistoryIcon";
import ProductionReportIcon from "@src/assets/MoreScreenIcons/ProductionReportIcon";
import ReceivedHistoryIcon from "@src/assets/MoreScreenIcons/ReceivedHistoryIcon";
import { Spacer } from "@src/components/common/Spacer";
import { ScrollContainerLayout } from "@src/components/Layouts/ScrollContainerLayout";
import CustomHeader from "@src/components/CustomHeader";
import { CustomIcon } from "@src/components/CustomSvg/CustomSVGIcon";
import { useTranslation } from "react-i18next";

const components: any = {
  collect: OrderSvgIcon,
  process: ProductionReportIcon,
  supply: SupplyOrderHistoryIcon,
  receive: ReceivedHistoryIcon,
};
// const CustomIcon = (iconName: any) => {
//   const IconComponent = components[iconName];
//   return <IconComponent size={40} color={colors.secondary} />;
// };

const PICKUP_POINT_List = [
  {
    id: 1,
    title: "Accepted Materials",
    description: "View collection records",
    icon: "acceptedMaterialHistory",
    route: routes.history.collectHistory,
  },
  {
    id: 2,
    title: "Processing",
    description: "View processing records",
    icon: "processingHistory",
    route: routes.history.productionHistory,
  },
  {
    id: 3,
    title: "Supplied Materials",
    description: "View supplied records",
    icon: "suppliedHistroy",
    route: routes.history.supplyHistory,
  },

  {
    id: 5,
    title: "Collection Agent",
    icon: "collectionAgentHistory",
    route: routes.history.collectionAgentList,
  },
];
const SMART_CENTRE_List = [
  {
    id: 4,
    title: "Receive",
    description: "View received history",
    icon: "history",
    route: routes.history.receiveHistory,
  },
];

const AllHistory = ({ navigation }: any) => {
  const profileData = useSelector(selectProfile);
  const userType = profileData?.userType;
  const [options, setOptions] = useState(
    userType === "PICKUP_POINT" ? PICKUP_POINT_List : SMART_CENTRE_List
  );

  const { t } = useTranslation();

  return (
    <ScrollContainerLayout
      style={styles.mainContainer}
      contentStyle={{ paddingBottom: 25 }}
      topBgColor={colors.secondary}
    >
      {/* <CustomHeader title={"History"} /> */}
      {/* <Spacer spacing={20} /> */}
      {options?.map((item) => (
        <Pressable
          onPress={() =>
            navigation.navigate("HistoryStack", { screen: item?.route })
          }
          style={{ marginHorizontal: 1, marginTop: 2 }}
          key={item?.id}
        >
          <View style={styles.card}>
            <View style={styles.circleView}>
              {item?.icon && CustomIcon(item?.icon, 30, colors.white)}
            </View>
            <View>
              <TextField style={styles.textStyle}>{t(item?.title)}</TextField>
              {/* <TextField style={styles.descTxt}>{item?.description}</TextField> */}
            </View>
          </View>
        </Pressable>
      ))}
    </ScrollContainerLayout>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: REGULAR_PADDING_SIZE,
    paddingHorizontal: REGULAR_PADDING_SIZE / 2,
    backgroundColor: colors.backgroundColor,
  },
  card: {
    // height: 120,
    backgroundColor: colors.white,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderRadius: 8,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginBottom: MEDIUM_PADDING_SIZE,
    paddingHorizontal: MEDIUM_PADDING_SIZE,
    paddingVertical: 20,
  },
  textStyle: {
    color: colors.neutral,
    fontWeight: "600",
    textAlign: "center",
  },
  circleView: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  descTxt: {
    fontSize: 14,
  },
});

export default AllHistory;
