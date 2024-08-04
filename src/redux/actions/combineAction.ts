import { authSlice } from '../reducers/authSlice';
import { getOrderSlice } from '../reducers/Order/getOrdersSlice';
import { getProductionSlice } from '../reducers/Production/getProductionsSlice';
import { getReturnSlice } from '../reducers/Return/getReturnsSlice';
import { postOrderSlice } from '../reducers/Order/postOrdersSlice';
import { getProfileSlice } from '../reducers/Profile/getProfileSlice';
import { PostReturnSlice } from '../reducers/Return/orderReturnsSlice';
import { getCategorySlice } from '../reducers/getCategoryReducer/getCategoryReducer';
import { GetCategorySlice } from '../reducers/getCaterogyPriceReducer/getCategoryPriceReducer';
import { getStockSlice } from '../reducers/getStockReducer/GetStockReducer';
import { getNotificationSlice } from '../reducers/notification/notificationReducer';
import { storeInfoSlice } from '../reducers/storeInfo/storeInfoSlice';
import { getOrderWithIdSlice } from '../reducers/Order/getOrdersWithIdSlice';
import { getBottomModalSlice } from '../reducers/BottomModal/bottomModalSlice';
import { getProcessesSlice } from '../reducers/getProcesses/getProcessesSlice';
import { getAnalyticsSlice } from '../reducers/Analytics/getAnalytics';
import { onBoardSlice } from '../reducers/onBoardSlice';

// Actions
export const authActions = authSlice.actions;

export const orderActions = getOrderSlice.actions;
export const productionActions = getProductionSlice.actions;
export const orderWithIdActions = getOrderWithIdSlice.actions;
export const returnActions = getReturnSlice.actions;
export const postOrderActions = postOrderSlice.actions;

export const profileActions = getProfileSlice.actions;
export const analyticsActions = getAnalyticsSlice.actions;
export const postOrderReturnActions = PostReturnSlice.actions;
export const getCategoryActions = getCategorySlice.actions;
export const getCategoryPriceActions = GetCategorySlice.actions;
export const getCategoryStockActions = getStockSlice.actions;

export const notificationActions = getNotificationSlice.actions;
export const setInfoActions = storeInfoSlice.actions;

export const BottomModalActions = getBottomModalSlice.actions;
export const processesActions = getProcessesSlice.actions;

export const onBoradActions = onBoardSlice.actions;
