import { RootState } from "./store";

// Selectors
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsLogging = (state: RootState) => state.auth.logging;

export const selectOrderList = (state: RootState) => state.orderList.orders;
export const selectOrderListLoading = (state: RootState) =>
  state.orderList.loading;
export const selectProductionList = (state: RootState) =>
  state.productionList.productions;

export const selectOrderWithId = (state: RootState) =>
  state.receiptDetail.orders;

export const selectReturnList = (state: RootState) => state.returnList.returns;
export const selectReturnListLoading = (state: RootState) =>
  state.returnList.loading;

export const selectProfile = (state: RootState) => state.getProfile?.profile;
export const selectProfileLoading = (state: RootState) =>
  state.getProfile?.loading;
export const selectUserId = (state: RootState) =>
  state.auth.currentUser?.userId;
export const selectUserType = (state: RootState) =>
  state.auth.currentUser?.userType;
export const selectToken = (state: RootState) => state.auth.currentUser?.token;

export const selectCategory = (state: RootState) =>
  state.categoryList.categories;
export const selectCategoryLoading = (state: RootState) =>
  state.categoryList.loading;
export const selectSubCategory = (state: RootState) =>
  state.categoryList.subCategories;
export const categoriesPrice = (state: RootState) =>
  state.categoryPrice.categoriesPrice;
export const categoriesPriceLoading = (state: RootState) =>
  state.categoryPrice.loading;
export const stockCategory = (state: RootState) => state.getStocks.stockList;
export const stockCategoryLoading = (state: RootState) =>
  state.getStocks.loading;
export const selectPostOrderReturnSuccess = (state: RootState) =>
  state.postOrderReturn.success;
export const selectPostOrderReturnSuccessData = (state: RootState) =>
  state.postOrderReturn.successData;

export const selectPostOrderSuccessData = (state: RootState) =>
  state.postOrder.orders;

export const selectPostOrderReturnLoading = (state: RootState) =>
  state.postOrderReturn.loading;

export const selectNotificationList = (state: RootState) =>
  state?.notification?.notifications;

export const selectNotificationCount = (state: RootState) =>
  state.notification.notifications?.length;

export const selectInfo = (state: RootState) => state.infoList;

export const showBotomOverlay = (state: RootState) => state.bottomModal;
export const selectProcesses = (state: RootState) =>
  state.getProcesses.processes;

export const selectAnalytics = (state: RootState) =>
  state.getAnalytics.analytics;
