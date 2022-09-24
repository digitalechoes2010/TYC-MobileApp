import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../ActionTypes';
import {
  IUserdeleteProfileItemAction,
  IUserDetailRequestState,
  IUserDetailResponseState,
  IUserUpdateProfileItemAction,
  IUserUpdateRequestState,
} from '../Models/Actions/User';
import {
  userUpdateService,
  userDirectToggleService,
  socialProfileService,
  updateProfileService,
  updateProfileItemService,
  deleteProfileItemService,
} from '../../services/user.service';
import {
  deleteUserProfileItemResponse,
  setUserdata,
  updateUserProfileItem,
  updateUserProfileItemResponse,
  userDirectToggle,
  userErrorResponse,
  // userProfileTabChange,
} from '../Actions/UserActions';

export function* updateUser(action: IUserDetailRequestState) {
  console.log(action);
  try {
    const response = yield call(userUpdateService, action.request);
    console.log(response);

    if (response.status === 200) {
      const {data} = response;
      console.log('success', data);

      yield put(setUserdata(data));
    } else {
      throw response.data.error;
    }
  } catch (err) {
    yield put(userErrorResponse({errors: err}));
  }
}

export function* toggleDirect(action: any) {
  try {
    const response = yield call(userDirectToggleService, action.request);
    if (response.status === 200) {
      const {data} = response;

      yield put(userDirectToggle(data));
    } else {
      throw response.data.error;
    }
  } catch (err) {
    yield put(userErrorResponse({errors: err}));
  }
}
export function* requestProfileUpdate(action: IUserUpdateRequestState) {
  try {
    const response = yield call(
      updateProfileService,
      action.profileType,
      action.request,
    );
    if (response.status === 200) {
      const {data} = response;
      yield put(setUserdata(data));
    } else {
      throw response.data.error;
    }
  } catch (err) {
    yield put(userErrorResponse({errors: err}));
  }
}
export function* requestProfileItemUpdate(
  action: IUserUpdateProfileItemAction,
) {
  try {
    const response = yield call(
      updateProfileItemService,
      action.profileType,
      action.request,
    );
    const {data} = response;
    yield put(updateUserProfileItemResponse(action.profileType, data));
  } catch (err) {
    yield put(userErrorResponse({errors: err}));
  }
}
export function* deleteProfileItem(action: IUserdeleteProfileItemAction) {
  try {
    const response = yield call(
      deleteProfileItemService,
      action.profileType,
      action.id,
    );
    if (response.status === 204) {
      yield put(deleteUserProfileItemResponse(action.profileType, action.id));
    } else {
      throw new Error('Something Bad Happened');
    }
  } catch (err) {
    yield put(userErrorResponse({errors: err}));
  }
}

export function* profileTabChange() {
  try {
    // const response = yield call(
    //   updateProfileItemService,
    //   action.profileType,
    //   action.request,
    // );
    // const {data} = response;
    // yield put(updateUserProfileItemResponse(action.profileType, data));
  } catch (err) {
    yield put(userErrorResponse({errors: err}));
  }
}
export function* watchUserDataAsync() {
  yield takeLatest(types.UPDATE_USER_REQUEST, updateUser);
  yield takeLatest(types.USER_DIRECT_TOGGLE_START, toggleDirect);
  yield takeLatest(types.UPDATE_USER_PP_REQUEST, requestProfileUpdate);
  yield takeLatest(types.USER_P_ITEM_DELETE_REQUEST, deleteProfileItem);

  yield takeLatest(types.UPDATE_USER_P_ITEM_REQUEST, requestProfileItemUpdate);
  // yield takeLatest(types.USER_PROFILE_TAB_CHANGE, profileTabChange);
}
