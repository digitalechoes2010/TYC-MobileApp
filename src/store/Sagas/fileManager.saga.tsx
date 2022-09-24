import {put, takeLatest, call} from 'redux-saga/effects';
import {IFetchMediaResponse} from '../Models/Api/FileManger.api.model';
import {submitMediaService} from '../../services/file-manager.service';
import {FileUploadConstant} from '../ActionTypes/fileManager.types.d';
import {
  fileUploadError,
  fileUploadSuccess,
} from '../Actions/file-manager.action';
import {setUserImagedata} from '../Actions/UserActions';

function* submitUploadMedia(files: any) {
  try {
    console.log('saga start');

    const filesInfo: IFetchMediaResponse = yield call(
      submitMediaService,
      files.files,
    );
    console.log('filesInfo', filesInfo);

    if (filesInfo.status === 200) {
      const {data} = filesInfo;
      console.log('data.url', data.url);

      yield put(setUserImagedata({profilePic: data.url}));
      yield put(fileUploadSuccess('success'));
    } else {
      yield put(fileUploadError('Failed'));

      // throw new Error('Something Bad Happened');
    }
  } catch (error) {
    yield put(fileUploadError('Failed'));
  }
}
export function* filesWatcher() {
  yield takeLatest(FileUploadConstant.FILE_UPLOAD_REQUEST, submitUploadMedia);
}
