import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routes } from "./routes";
import { colors } from "../globals/colors";
import { HeaderBackBtn } from "./AuthStack";
import { useNavigation } from "@react-navigation/native";
import { CollectOrderList } from "@src/features/AllHistory/orderList/CollectOrder";
import { SupplyOrderList } from "@src/features/AllHistory/orderList/SupplyOrderList";
import { History } from "@src/features/AllHistory/ReceiveHistory/History";
import { ProductionReport } from "@src/features/AllHistory/ProductionReport";
import { CollectionAgentList } from "@src/features/AllHistory/CollectionAgentList/CollectionAgentList";
import { useTranslation } from "react-i18next";

const StackNavigation = createNativeStackNavigator();

export function HistoryStack() {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <StackNavigation.Navigator
      screenOptions={() => ({
        headerBackTitleVisible: false,
        headerShown: true,
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: colors.backgroundColor,
        },
        headerLeft: () => <HeaderBackBtn navigation={navigation} />,
      })}
    >
      <StackNavigation.Screen
        name={t(routes.history.collectHistory)}
        component={CollectOrderList}
        options={{
          headerShown: true,
          headerLeft: () => <HeaderBackBtn navigation={navigation} />,
          title: t("History"),
        }}
      />
      <StackNavigation.Screen
        name={routes.history.supplyHistory}
        component={SupplyOrderList}
        options={{
          headerShown: true,
          headerLeft: () => <HeaderBackBtn navigation={navigation} />,
          title: t("History"),
        }}
      />
      <StackNavigation.Screen
        name={routes.history.collectionAgentList}
        component={CollectionAgentList}
        options={{
          headerShown: true,
          headerLeft: () => <HeaderBackBtn navigation={navigation} />,
          title: t("History"),
        }}
      />
      <StackNavigation.Screen
        name={routes.history.receiveHistory}
        component={History}
        options={{
          headerShown: true,
          headerLeft: () => <HeaderBackBtn navigation={navigation} />,
          title: t("History"),
        }}
      />
      <StackNavigation.Screen
        name={routes.history.productionHistory}
        component={ProductionReport}
        options={{
          headerShown: true,
          headerLeft: () => <HeaderBackBtn navigation={navigation} />,
          title: t("History"),
        }}
      />
    </StackNavigation.Navigator>
  );
}
