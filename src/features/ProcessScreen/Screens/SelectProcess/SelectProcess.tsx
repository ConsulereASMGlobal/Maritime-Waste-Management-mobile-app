import React, { useEffect } from "react";
import { StyleSheet, View, Pressable, FlatList } from "react-native";
import {
  HALF_MEDIUM_PADDING_SIZE,
  LARGE_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
} from "../../../../globals/themes";
import { colors } from "../../../../globals/colors";
import { useNavigation } from "@react-navigation/native";
import { routes } from "../../../../navigation/routes";
import { TextField } from "../../../../components/TextField/TextField";
import { FastImage } from "../../../../components/image/index";
import { useDispatch, useSelector } from "react-redux";
import { processesActions } from "../../../../redux/actions/combineAction";
import { selectProcesses } from "../../../../redux/selectors";
import { LoadingIndicator } from "../../../../components/LoadingIndicator";

export const SelectProcess = ({ route }) => {
  const navigation = useNavigation<any>();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(processesActions.getProcesses());
  }, [dispatch]);

  const processes = useSelector(selectProcesses);

  const processList = processes?.data?.map((each: any) => ({
    id: each.id,
    title: each.name,
    iconName: each.icon,
    goto: routes?.process?.preSort,
    inMaterials: each.inMaterials,
    outMaterials: each.outMaterials,
  }));
  console.log(processes?.data[0]?.inMaterials, "hiaudf");
  const renderItem = ({ item }: any) => (
    <Pressable
      key={item.id}
      style={styles.box}
      onPress={() =>
        item?.goto
          ? navigation.navigate(`${item?.goto}`, {
              process: {
                id: item.id,
                title: item.title,
                icon: item.iconName,
              },
              inMaterials: item.inMaterials,
              outMaterials: item.outMaterials,
            })
          : alert("No Permission")
      }
    >
      <View
        style={{
          backgroundColor: colors.primary,
          padding: 16,
          borderRadius: 30,
          alignItems: "center",
        }}
      >
        <FastImage
          source={{ uri: item?.iconName }}
          resizeMode="contain"
          style={styles.imageStyle}
        />
      </View>
      <TextField
        style={{
          textAlign: "center",
          color: colors.neutral_dark,
          fontWeight: "bold",
        }}
      >
        {item.title}
      </TextField>
    </Pressable>
  );

  return (
    <View style={{ backgroundColor: colors.backgroundColor, flex: 1 }}>
      {processes?.data ? (
        <FlatList
          data={processList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          style={{ flex: 1 }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ padding: MEDIUM_PADDING_SIZE }}
          scrollEnabled={true}
          bounces={true}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <LoadingIndicator activityColor={colors.primary} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { paddingHorizontal: LARGE_PADDING_SIZE, marginVertical: 15 },

  box: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: colors.white,
    width: "48%",
    height: 168,
    paddingHorizontal: LARGE_PADDING_SIZE,
    borderRadius: 16,
    marginVertical: HALF_MEDIUM_PADDING_SIZE,
    paddingVertical: MEDIUM_PADDING_SIZE,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  textTitle: { marginTop: 10, fontSize: 18, lineHeight: 25 },
  imgStyle: { width: 75, height: 75 },
  imageStyle: {
    width: 32,
    height: 32,
  },
});
