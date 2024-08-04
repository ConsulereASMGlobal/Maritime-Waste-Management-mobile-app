import { put } from 'redux-saga/effects';

import { call } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { orderAPI } from '../../../services/api';
import { productionActions } from '../../actions/combineAction';

export function* getProductionsSaga() {
  try {
    const response: AxiosResponse = yield call(orderAPI.getProductions);

    const resPayload = response?.data;
    //set Token
    yield put(
      productionActions.productionsSuccesss({
        ...resPayload
      })
    );

    // Redirect to Admin page
  } catch (error) {
    yield put(productionActions.productionsFailure(error)); // Dispatch action
  }
}
