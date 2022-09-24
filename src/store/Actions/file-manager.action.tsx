import {IFileUploadAction} from '../Models/Actions/FileManager.model';
import {FileUploadConstant} from '../ActionTypes/fileManager.types.d';

export const fileUploadRequest = (payload: any): IFileUploadAction => {
  return {
    type: FileUploadConstant.FILE_UPLOAD_REQUEST,
    files: payload.files,
  };
};
export const fileUploadSuccess = (message: any): IFileUploadAction => ({
  type: FileUploadConstant.FILE_UPLOAD_SUCCESS,
  message: message,
});

export const fileUploadError = (message: any): IFileUploadAction => ({
  type: FileUploadConstant.FILE_UPLOAD_ERROR,
  message: message,
});
export const fetchFilesRequest = (): IFileUploadAction => {
  return {
    type: FileUploadConstant.FETCH_FILES_REQUEST,
  };
};
export const fetchFilesSuccess = (
  fileList: Array<object>,
): IFileUploadAction => {
  return {
    type: FileUploadConstant.FETCH_FILES_SUCCEED,
    fileList: fileList,
  };
};
