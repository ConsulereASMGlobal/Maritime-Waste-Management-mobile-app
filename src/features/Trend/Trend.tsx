import {
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TextField, TextMedium } from "../../components/TextField/TextField";
import { colors } from "../../globals/colors";
import { Spacer } from "../../components/common/Spacer";
import {
  BORDER_RADIUS_SIZE,
  MEDIUM_PADDING_SIZE,
  REGULAR_PADDING_SIZE,
} from "../../globals/themes";
import ColoredBottle from "../../assets/svgIcon/ColoredBottle.svg";
import FutureBottle from "../../assets/svgIcon/nextBottle.svg";
import MissedBottle from "../../assets/svgIcon/missedBottle.svg";
import QRCode from "react-native-qrcode-svg";
import Button from "../../components/Button/Button";
import { routes } from "../../navigation/routes";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectAnalytics, selectProfile } from "../../redux/selectors";
import { orderAPI } from "../../services/api";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import dayjs from "dayjs";
import { analyticsActions } from "@src/redux/actions/combineAction";
import BarChart from "@src/components/Charts/BarGraph";
import { useTranslation } from "react-i18next";

const streak = [
  { id: 1, title: "Day 1", status: "future" },
  { id: 2, title: "Day 2", status: "future" },
  { id: 3, title: "Day 3", status: "future" },
  { id: 4, title: "Day 4", status: "future" },
  { id: 5, title: "Day 5", status: "future" },
  { id: 6, title: "Day 6", status: "future" },
  { id: 7, title: "Day 7", status: "future" },
];

const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Trend = () => {
  const [pointHistory, setPointHistory] = useState<any>();
  const [streakData, setStreakData] = useState({});
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const { t } = useTranslation();

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      orderAPI.getStreak().then((res) => {
        console.log(res?.data?.data, "se");
        setLoading(false);
        if (res?.data) {
          setStreakData(res?.data?.data);
          setPointHistory({
            points: res?.data?.userPoint,
            multiplier: res?.data?.streakMultiplier,
          });
        }
      });
    }
  }, [isFocused]);
  useEffect(() => {
    const selectedDays: any = streakData;

    const today = new Date();

    for (const day of streak) {
      const dayDate = new Date(today);
      dayDate.setDate(today.getDate() - (7 - day.id));
      const dayDateString = dayDate.toISOString().split("T")[0];
      day.title = weekday[dayDate.getDay()];

      if (selectedDays[dayDateString]) {
        day.status = "collected";
      } else if (day.id === 7) {
        day.status = "future";
      } else {
        day.status = "missed";
      }
    }
  }, [streakData]);

  ///////////////////////// BAR GRAPHS ////////////////

  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);
  const _onRefresh = () => {
    dispatch(analyticsActions.getAnalytics());
  };

  useEffect(() => {
    isFocused && dispatch(analyticsActions.getAnalytics());
  }, [isFocused]);

  const [shouldAnimate, setShouldAnimate] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      setShouldAnimate(true);
      return () => {
        setShouldAnimate(false);
      };
    }, [])
  );

  const analytics = useSelector(selectAnalytics);
  const data = analytics?.data;
  const today = dayjs();
  const labels = [...Array(7)]
    .map((_, i) => today.subtract(i, "day").format("YYYY-MM-DD"))
    .reverse();

  const barData = labels?.map((label: any) => ({
    label: dayjs(label).format("ddd"),
    value: (data?.collectionDetails && data?.collectionDetails[label]) ?? 0,
  }));

  const productionDetailsData = labels?.map((label: any) => ({
    label: dayjs(label).format("ddd"),
    value: (data?.productionDetails && data?.productionDetails[label]) ?? 0,
  }));

  const returnDetailsData = labels?.map((label: any) => ({
    label: dayjs(label).format("ddd"),
    value: (data?.returnDetails && data?.returnDetails[label]) ?? 0,
  }));

  const FirstRoute = () => (
    <View style={{ flex: 1 }}>
      {barData && (
        <BarChart
          data={barData}
          height={180}
          barWidth={20}
          animate={shouldAnimate}
        />
      )}
    </View>
  );

  const SecondRoute = () => (
    <View style={{ flex: 1 }}>
      {productionDetailsData && (
        <BarChart
          data={productionDetailsData}
          height={180}
          barWidth={20}
          animate={shouldAnimate}
        />
      )}
    </View>
  );

  const ThirdRoute = () => (
    <View style={{ flex: 1 }}>
      {returnDetailsData && (
        <BarChart
          data={returnDetailsData}
          height={180}
          barWidth={20}
          animate={shouldAnimate}
        />
      )}
    </View>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: t("Last 7 days collected qty (kgs)") },
    // { key: "second", title: "Processed" },
    // { key: "third", title: "Supplied" },
  ]);

  const layout = useWindowDimensions();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={{
          paddingBottom: 35,
        }}
        style={{
          flex: 1,
          backgroundColor: colors.white,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainContainer}>
          <View
            style={{
              borderWidth: 4,
              borderRadius: BORDER_RADIUS_SIZE,
              borderColor: colors.primaryLight,
            }}
          >
            <View style={{ padding: MEDIUM_PADDING_SIZE }}>
              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                }}
              >
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <TextField
                    style={{
                      color: colors.primaryLight2,
                      fontSize: 18,
                      lineHeight: 28,
                      fontWeight: "bold",
                    }}
                  >
                    {t("Your Daily Streak")}
                  </TextField>
                  {/* <TextField
                    style={{ fontSize: 12, lineHeight: 18, color: colors.dark }}
                  >
                    Drop plastics everyday to build your streak and earn points!
                  </TextField> */}
                </View>
                {/* <View style={{ alignItems: "center" }}>
                  <ImageBackground
                    source={require("../../assets/img/blueImage.png")}
                    style={{
                      minWidth: 96,
                      height: 75,
                      alignItems: "center",
                      justifyContent: "center",
                      paddingHorizontal: 10,
                    }}
                  >
                    <TextField
                      style={{
                        fontWeight: "bold",
                        fontSize: 24,
                        lineHeight: 28,
                        color: colors.white,
                      }}
                    >
                      {pointHistory?.points || 0}
                    </TextField>
                    <TextField
                      style={{
                        color: colors.white,
                        fontSize: 12,
                        fontWeight: "700",
                      }}
                    >
                      POINTS
                    </TextField>
                    {pointHistory?.multiplier ? (
                      <View
                        style={{
                          position: "absolute",
                          top: -8,
                          right: -5,
                          backgroundColor: colors.orange,
                          borderRadius: 100,
                          padding: 5,
                          justifyContent: "center",
                          alignItems: "center",
                          minWidth: 25,
                          minHeight: 25,
                        }}
                      >
                        <TextField
                          style={{
                            color: colors.white,
                            fontSize: 14,
                            lineHeight: 14,
                            fontWeight: "700",
                          }}
                        >
                          x{pointHistory?.multiplier}
                        </TextField>
                      </View>
                    ) : null}
                  </ImageBackground>
                </View> */}
              </View>
              <Spacer spacing={10} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {
                  streak?.map((item) => (
                    <View key={item?.id} style={{ alignItems: "center" }}>
                      {item?.status === "future" ? (
                        <FutureBottle />
                      ) : item?.status === "missed" ? (
                        <MissedBottle />
                      ) : (
                        <ColoredBottle />
                      )}
                      <Spacer spacing={2} />

                      <TextField
                        style={{ fontSize: 11, color: colors.primary }}
                      >
                        {item?.title}
                      </TextField>
                    </View>
                  ))
                  // )
                }
              </View>
            </View>
          </View>
          <Spacer spacing={20} />

          <View style={{ flex: 1, height: 300 }}>
            <TabView
              style={{
                backgroundColor: colors.shaded,
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
              }}
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width: layout.width }}
              renderTabBar={(props) => (
                <TabBar
                  tabStyle={{
                    alignSelf: "flex-start",
                  }}
                  {...props}
                  style={{
                    backgroundColor: colors.secondary,
                  }}
                  indicatorStyle={{ backgroundColor: colors.primary }}
                  renderLabel={({ route, color, focused }) => (
                    <TextMedium
                      style={{
                        color: focused ? colors.white : colors.secondary2,
                        margin: 8,
                        alignSelf: "flex-start",
                        alignItems: "flex-start",
                      }}
                    >
                      {route.title}
                    </TextMedium>
                  )}
                />
              )}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: REGULAR_PADDING_SIZE,
    paddingHorizontal: REGULAR_PADDING_SIZE,
    backgroundColor: colors.white,
  },
});

export default Trend;
