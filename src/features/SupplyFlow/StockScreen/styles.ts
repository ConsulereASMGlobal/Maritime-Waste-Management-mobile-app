import { StyleSheet } from "react-native";
import { colors } from "../../../globals/colors";
import {
  BORDER_RADIUS_SIZE,
  Fonts,
  HALF_MEDIUM_PADDING_SIZE,
  MEDIUM_PADDING_SIZE,
  REGULAR_PADDING_SIZE,
} from "../../../globals/themes";

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    paddingHorizontal: HALF_MEDIUM_PADDING_SIZE,
  },
  headerTitle: {
    marginLeft: MEDIUM_PADDING_SIZE,
    marginTop: REGULAR_PADDING_SIZE,
  },
  labelTextStyle: {
    fontSize: 18,
  },
  headerComponentStyle: {
    borderRadius: 12,
    backgroundColor: colors.white,
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    overflow: "hidden",
    marginVertical: MEDIUM_PADDING_SIZE,
    marginHorizontal: MEDIUM_PADDING_SIZE,
    elevation: 4,
  },
  headerValueContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    paddingVertical: HALF_MEDIUM_PADDING_SIZE,
    paddingHorizontal: MEDIUM_PADDING_SIZE,
    borderWidth: 0.5,
    borderColor: "#e8e8e8",
    borderRadius: 2,
  },
  headerViewStyle: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: HALF_MEDIUM_PADDING_SIZE,
    backgroundColor: colors.returnBackground,
    paddingHorizontal: MEDIUM_PADDING_SIZE,
  },
  firstHeaderContainer: {
    flex: 0.1,
    alignItems: "center",
  },
  secondHeaderContainer: {
    flex: 0.3,
    textAlign: "left",
  },
  thirdHeaderContainer: {
    flex: 0.2,
  },
  firstContainer: {
    flex: 0.1,
    alignItems: "center",
    backgroundColor: colors.white,
  },
  secondContainer: {
    flex: 0.3,
    alignItems: "center",
    backgroundColor: colors.white,
  },
  thirdContainer: {
    flex: 0.2,
    alignItems: "center",
  },
  fourthContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
  },
  labelValueStyle: {
    fontSize: 16,
    paddingVertical: 5,
    textAlign: "left",
    textTransform: "capitalize",
  },
  boldHeaderText: {
    textAlign: "left",
    color: colors.primary,
    marginBottom: MEDIUM_PADDING_SIZE,
    marginLeft: MEDIUM_PADDING_SIZE,
  },
  flexRow: {
    width: "100%",
    flexDirection: "row",
  },
  column: {
    backgroundColor: "#f2f2f2",

    margin: 1,
  },
  Icon: {
    height: 80,
    width: 80,
  },
  leftButtonStyle: {
    width: "45%",
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.white,
    marginRight: MEDIUM_PADDING_SIZE,
  },
  buttonStyle: {
    width: "45%",
    marginLeft: MEDIUM_PADDING_SIZE,
  },
  textStyle: {
    color: colors.primary,
  },
  menu: {
    fontSize: 26,
  },
  headerBackgroundTextStyle: {
    fontSize: 20,
    lineHeight: 24,
    color: colors.primary,
  },
  badge: {
    backgroundColor: colors.primary,
    position: "absolute",
    zIndex: 1,
    left: 55,
    top: -5,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 25,
    height: 25,
  },
  button: {
    height: 40,
    width: "30%",
    borderRadius: 8,
    alignSelf: "center",
    backgroundColor: colors.primary,
  },
  confirmText: {
    fontSize: 16,
    color: colors.white,
  },
  iconStyle: {
    alignItems: "flex-start",
    marginRight: 20,
    borderColor: "red",
    borderWidth: 1,
  },
  headerBackgroundStyle: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundColor,
  },
  bellBadge: {
    position: "absolute",
    backgroundColor: colors.primary,
    height: 15,
    width: 15,
    borderRadius: 50,
    top: -5,
    left: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  bellBadgeText: {
    color: "#fff",
    fontSize: 11,
  },
  tabBarLevelStyle: ({ focused, color }) => ({
    color: focused ? color : "#000",
    fontSize: 12,
    textAlign: "center",
    fontFamily: focused ? Fonts.Medium : Fonts.Regular,
  }),
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  circleView: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.dark,
  },
  itemLabel: {
    paddingHorizontal: MEDIUM_PADDING_SIZE,
  },
  flatlistStyle: {
    flexGrow: 0,
  },
  input: {
    fontSize: 16,
    textAlign: "left",
    color: colors.neutral_dark,
  },
  quantityContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  qtyText: {
    fontSize: MEDIUM_PADDING_SIZE,
  },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputBox: {
    fontSize: 16,
    color: colors.neutral_dark,
    borderWidth: 1,
    borderColor: colors.gray,
    height: 48,
    paddingVertical: 0,
    paddingHorizontal: 10,
    borderRadius: 8,
    width: "90%",
    backgroundColor: colors.white,
  },
  mainListContainer: {
    borderRadius: BORDER_RADIUS_SIZE,
    backgroundColor: colors.white,
    marginVertical: HALF_MEDIUM_PADDING_SIZE,
    marginHorizontal: HALF_MEDIUM_PADDING_SIZE,
    padding: MEDIUM_PADDING_SIZE,
    borderWidth: 0.2,
    borderColor: colors.darkGray,
  },
  textIconRow: { flexDirection: "row", alignItems: "center" },
});
