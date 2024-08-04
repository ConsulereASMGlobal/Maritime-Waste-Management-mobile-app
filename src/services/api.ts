import { axiosInstance } from "../helpers/axiosHelper";
import { LoginPayload } from "../redux/reducers/authSlice";
import { GLOBAL_CONSTANT } from "../static/globalConstant";
export const authAPI = {
  login: (data: LoginPayload) => axiosInstance.post("user/login", data),
};
export const passwordAPI = {
  forgot: (data: Object) => axiosInstance.put(`user/resetPassword`, data),
  changePassword: (data: Object) =>
    axiosInstance.put("user/changePassword", data),
};
export const validationAPI = {
  sendOTP: ({ mobile, prefix, from }: any) =>
    axiosInstance.get(
      `sendOtp?mobile=${mobile}&countryCode=${prefix}&from=${from}`
    ),
  verifyOTP: (data: Object) => axiosInstance.post("validateOtp", data),
};

export const ProfileAPI = {
  getProfile: ({ id }: any) => axiosInstance.get(`users/${id}`),
  setFirebaseToken: (data: Object) =>
    axiosInstance.post("register-user-token", data),
  registerUser: (data: Object) => axiosInstance.post("user/register", data),
  updateUser: ({ id, data }: any) =>
    axiosInstance.put(`users/${id}/update`, data),
  getRegisteredUser: ({ mobile }: any) =>
    axiosInstance.get(`userDetail?mobile=${mobile}&type=CUSTOMER`),
  deleteUser: ({ userId }: any) =>
    axiosInstance.put(`users/${userId}/status=DELETED`),
  getPointHisotry: () => axiosInstance.get(`user/points`),
};

export const orderAPI = {
  getOrders: (status: any) =>
    axiosInstance.get(`collect/orders?page=1&status=${status}`),
  getOrdersByCusomter: (status: any) =>
    axiosInstance.get(`collect/orders?page=1&status=${status}`),
  getOrdersWithId: ({ id }: any) =>
    axiosInstance.get(`collect/orders/${id}?page=1&status=CREATED`),
  getReturn: (status: string) =>
    axiosInstance.get(`return/orders?status=${status}&page=1`),
  postOrders: (data: object) => axiosInstance.post(`order`, data),
  updateOrder: ({ orderId, data }: any) =>
    axiosInstance.put(`orders/${orderId}/update`, data),
  getCategory: () =>
    axiosInstance.get(`clients/${GLOBAL_CONSTANT.clientId}/categories`),
  getCategoryPrice: (categoryId: any) =>
    axiosInstance.get(`categories/${categoryId}/price`),
  getSubCategory: (catId: string) =>
    axiosInstance.get(`categories/${catId}/items`),
  getCategoryStock: (catid: string) =>
    axiosInstance.get(`stock?category=${catid}`),
  getProductions: () => axiosInstance.get(`productions`),
  postProduction: (data: Object) => axiosInstance.post("production", data),
  changeStatus: (data: Object) => axiosInstance.put("order/changeStatus", data),
  getStreak: () => axiosInstance.get(`user/streak`),
};

export const notificationAPI = {
  getNotifications: ({ userId }: any) =>
    axiosInstance.get(`notifications/users/${userId}`),
  deleteNotificaion: ({ id }: any) =>
    axiosInstance.delete(`notifications/${id}`),
};

export const processAPI = {
  getProcesses: () => axiosInstance.get(`materialProcesses`),
};

export const analyticsAPI = {
  getAnalytics: () => axiosInstance.get("analytics"),
};
export const bankAPI = {
  getBankList: () => axiosInstance.get("banks"),
};

export const users = {
  getSMART_CENTRE: () => axiosInstance.get("users?type=SMART_CENTRE"),
  getRecycler: () => axiosInstance.get("users?type=RECYCLER"),
  getPickupPoint: () => axiosInstance.get("users?type=PICKUP_POINT"),
  getFranchise: () => axiosInstance.get("users?type=FRANCHISE"),
  getCUSTOMER: (status: any) =>
    axiosInstance.get(`users?type=CUSTOMER&status=${status}`),
  activateCustomer: ({ userId, status }: any) =>
    axiosInstance.put(`user/${userId}/status?type=CUSTOMER&status=${status}`),
  getDeals: () => axiosInstance.get("deals"),
};
// /v1/api/user/{userId}/status?type=CUSTOMER&status=ACTIVE
