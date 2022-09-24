import {IFileUploadAction} from '../Models/Actions/FileManager.model';
import {FileUploadConstant} from '../ActionTypes/fileManager.types.d';

const initialState = {
  pending: false,
  success: false,
  fileList: [],
  message: {},
  errors: {},
};

export const FilesManagerReducer = (
  state = initialState,
  action: IFileUploadAction,
) => {
  switch (action.type) {
    case FileUploadConstant.FILE_UPLOAD_REQUEST:
      console.log(action);
      return {
        ...state,
        pending: true,
        success: false,
        files: action.files,
        message: {
          body: 'Submitting Upload',
        },
        errors: {},
      };
    case FileUploadConstant.FILE_UPLOAD_SUCCESS:
      return {
        pending: false,
        success: true,
        message: {
          body: action.message,
        },
        errors: {},
      };
    case FileUploadConstant.FETCH_FILES_REQUEST:
      return {
        ...state,
        pending: true,
        success: false,
        message: {
          body: 'Reterving Images',
        },
        errors: {},
      };
    case FileUploadConstant.FETCH_FILES_SUCCEED:
      return {
        ...state,
        pending: false,
        success: true,
        fileList: action.fileList,
        message: {
          body: 'Fetching Done',
        },
        errors: {},
      };

    case FileUploadConstant.FILE_UPLOAD_ERROR:
      return {
        ...state,
        pending: false,
        success: false,
        message: {},
        errors: {
          body: action.message.toString(),
        },
      };
    case FileUploadConstant.RESET_STORE:
      return initialState;
    default:
      return state;
  }
};
