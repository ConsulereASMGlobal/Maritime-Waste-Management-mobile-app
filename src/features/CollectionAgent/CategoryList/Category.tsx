import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { Spacer } from "../../../components/common/Spacer";
import { FastImage } from "../../../components/image";
import { LoadingIndicator } from "../../../components/LoadingIndicator";
import { NoDataView } from "../../../components/NoDataView";
import {
  TextBold,
  TextField,
  TextMedium,
} from "../../../components/TextField/TextField";
import { colors } from "../../../globals/colors";
import {
  BORDER_RADIUS_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
  REGULAR_PADDING_SIZE,
  screenWidth,
} from "../../../globals/themes";
import { routes } from "../../../navigation/routes";
import {
  BottomModalActions,
  getCategoryActions,
} from "../../../redux/actions/combineAction";
import {
  selectCategory,
  selectProfile,
  selectUserId,
} from "../../../redux/selectors";
import { RootState, useAppDispatch } from "../../../redux/store";
import { useTranslation } from "react-i18next";
import { DropDown } from "../../../components/Dropdown/DropDown";

interface Props {
  route: any;
  navigation: any;
}

export const CategoryScreen = ({}: Props) => {
  const dispatch = useAppDispatch();

  const navigation = useNavigation();
  const categories = useSelector(selectCategory);
  const isLoading = useSelector(
    (state: RootState) => state.categoryList.loading
  );

  const customerId = useSelector(selectUserId);
  const profileData = useSelector(selectProfile);

  const scrapCategoryRender = ({ item, index }) => {
    const _handleCategoryRoute = () => {
      navigation.navigate(routes.quality.default, {
        customerId: customerId,
        userId: profileData?.pickupointId,
        data: [
          {
            categoryId: item?.id,
            icon: item?.icon,
            name: item?.name,
          },
        ],
      });
    };
    return (
      <TouchableOpacity
        style={styles.mainContainer}
        onPress={_handleCategoryRoute}
      >
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 100,
            backgroundColor: colors.primary,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FastImage
            source={{ uri: item?.icon }}
            style={styles.Icon}
            resizeMode={"contain"}
          />
        </View>
        <TextMedium style={styles.textTitle}>{item?.name}</TextMedium>
        <Spacer spacing={8} />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    dispatch(getCategoryActions.getCategory());
  }, []);

  const { t } = useTranslation();

  const ships = [
    { id: 1, label: "Ship 1", value: 1 },
    { id: 2, label: "Ship 2", value: 2 },
    { id: 3, label: "Ship 3", value: 3 },
  ];

  const [selectedShip, setSelectedShip] = useState();

  return (
    <ScrollView style={{ backgroundColor: colors.backgroundColor, flex: 1 }}>
      <View style={styles.mainWrapper}>
        <View
          style={{
            marginHorizontal: REGULAR_PADDING_SIZE,
          }}
        >
          <Spacer spacing={10} />
          <TextField
            style={{
              paddingBottom: 5,
              fontSize: 14,
            }}
          >
            Ship
          </TextField>
          <DropDown
            placeholder="Select Ship"
            rightIconName="sort-down"
            setSelectedValue={setSelectedShip}
            combineOnPress={(rest) =>
              dispatch(
                BottomModalActions.toggleBottomModal({
                  title: "Select Ship",
                  showList: true,
                  data: ships,
                  ...rest,
                })
              )
            }
          />
        </View>
        <TextBold style={styles.stepTitle}>
          {t("Select the material category")}
        </TextBold>
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <FlatList
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            data={categories}
            renderItem={scrapCategoryRender}
            contentContainerStyle={styles.contentContainerStyle}
            ListEmptyComponent={NoDataView}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
  },
  mainContainer: {
    alignItems: "center",
    height: 170,
    width: screenWidth / 2.4,
    justifyContent: "center",
    borderRadius: BORDER_RADIUS_SIZE,
    marginVertical: HALF_MEDIUM_PADDING_SIZE,
    marginHorizontal: HALF_MEDIUM_PADDING_SIZE,
    backgroundColor: colors.white,
    borderColor: "#EDEDED",
    borderWidth: 1,
  },
  contentContainerStyle: {
    flex: 1,
    marginTop: 16,
    backgroundColor: colors.backgroundColor,
    marginHorizontal: MEDIUM_PADDING_SIZE,
    paddingBottom: 20,
  },
  Icon: {
    height: 40,
    width: 40,
  },
  textTitle: {
    fontSize: 16,
    marginTop: MEDIUM_PADDING_SIZE,
  },
  stepTitle: {
    fontSize: 18,
    marginTop: REGULAR_PADDING_SIZE,
    marginHorizontal: REGULAR_PADDING_SIZE,
  },
});
