import * as loginReducer from './LoginReducer';
import * as AuthenticationReducer from './AuthenticationReducer';
import * as UserReducer from './UserReducer';
import * as SignupReducer from './UserSignupReducer';
import * as FileUploadReducer from './FileManager.reducer';
export default Object.assign(
  loginReducer,
  AuthenticationReducer,
  UserReducer,
  SignupReducer,
  FileUploadReducer,
);
