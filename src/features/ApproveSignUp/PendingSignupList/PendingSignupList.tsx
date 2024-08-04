import { FlatList, Pressable, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { TextField, TextMedium } from "@src/components/TextField/TextField";
import {
  BORDER_RADIUS_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
} from "@src/globals/themes";
import { colors } from "@src/globals/colors";
import { Spacer } from "@src/components/common/Spacer";
import { useNavigation } from "@react-navigation/native";
import { users } from "@src/services/api";
import { NoDataView } from "@src/components/NoDataView";

const PendingSignupList = () => {
  const [status, setStatus] = useState("Pending");
  const navigation = useNavigation<any>();
  const [customerList, setCustomerList] = useState([]);
  useEffect(() => {
    users.getCUSTOMER("INACTIVE").then((res) => {
      setCustomerList(res?.data);
    });
  }, []);
  const renderItem = ({ item }) => (
    <Pressable
      style={styles.mainContainer}
      onPress={() => navigation.navigate("approveDetailScreen", { item })}
    >
      <View style={styles.card}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <TextField>ID : {item.id}</TextField>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <View
              style={[
                styles.statusView,
                {
                  backgroundColor:
                    item?.status === "Completed" ||
                    item?.status === "COMPLETED" ||
                    item?.status === "ACCEPTED" ||
                    item?.status === "Accepted"
                      ? colors.green
                      : item?.status === "INACTIVE" ||
                        item?.status === "inactive" ||
                        item?.status === "Created" ||
                        item?.status === "CREATED"
                      ? colors.yellow
                      : colors.primary,
                },
              ]}
            >
              <TextField
                style={{
                  color:
                    item?.status === "Completed" ||
                    item?.status === "COMPLETED" ||
                    item?.status === "ACCEPTED" ||
                    item?.status === "Accepted"
                      ? colors.white
                      : item?.status === "INACTIVE" ||
                        item?.status === "inactive" ||
                        item?.status === "Created" ||
                        item?.status === "CREATED"
                      ? colors.dark
                      : colors.white,
                  fontSize: 12,
                  lineHeight: 18,
                }}
              >
                {item?.status}
              </TextField>
            </View>
          </View>
        </View>
        <View
          style={{
            height: 0.4,
            backgroundColor: colors.darkGray,
            marginHorizontal: -10,
          }}
        />
        <Spacer spacing={7} />
        <View
          style={{
            flexDirection: "row",
            gap: 10,
          }}
        >
          <View style={{ flex: 4 }}>
            <View style={styles.rowContainer}>
              <TextField>Collection Agent Name</TextField>
              <TextField style={{ width: "50%", textAlign: "right" }}>
                {item?.personalDetails?.name.trim("   ") || "N/A"}
              </TextField>
            </View>
            <Spacer spacing={5} />
            <View style={styles.rowContainer}>
              <TextField>Mobile Number</TextField>
              <TextField>{item?.personalDetails?.mobile}</TextField>
            </View>

            <>
              <Spacer spacing={5} />
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderWidth: 1,
                  borderColor: colors.primary,
                  alignSelf: "flex-start",
                  borderRadius: 8,
                }}
              >
                <TextMedium style={{ color: colors.primary, fontSize: 14 }}>
                  View Details
                </TextMedium>
              </View>
            </>
          </View>
        </View>
      </View>
    </Pressable>
  );
  return (
    <FlatList
      data={customerList}
      renderItem={renderItem}
      // style={styles.flatListStyle}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={NoDataView}
      contentContainerStyle={{ flexGrow: 1 }}
      scrollEnabled={true}
      bounces={true}
      ListFooterComponent={() => <Spacer spacing={25} />}
    />
  );
};

export default PendingSignupList;

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: MEDIUM_PADDING_SIZE / 2,
    paddingHorizontal: HALF_MEDIUM_PADDING_SIZE,
  },
  card: {
    backgroundColor: colors.white,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: BORDER_RADIUS_SIZE,
    elevation: 5,
    padding: MEDIUM_PADDING_SIZE,
    marginBottom: 5,
  },
  circleView: {
    width: 36,
    height: 36,
    borderRadius: 92 / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.shaded,
    padding: 16,
    marginRight: 10,
  },
  statusView: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 3,
    marginBottom: 5,
    borderRadius: 92 / 2,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
