import {FileUploadConstant} from '../../actionTypes/fileManager.types.d';

export interface IFileUploadAction {
  type: FileUploadConstant;
  files?: any;
  fileList?: Array<object>;
  message?: any;
  success?: boolean;
}
