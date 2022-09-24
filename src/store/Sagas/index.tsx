import * as Eff from 'redux-saga/effects';
import {watchLoginAsync} from './LoginSaga';
import {watchUserSignupAsync} from './UserSignupSaga';
import {watchUserDataAsync} from './UserSaga';
import {filesWatcher} from './fileManager.saga';

const fork = Eff.fork;
const all = Eff.all;

export default function* watch() {
  yield all([
    fork(watchLoginAsync),
    fork(watchUserSignupAsync),
    fork(watchUserDataAsync),
    fork(filesWatcher),
  ]);
}
