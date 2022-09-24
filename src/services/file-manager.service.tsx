import apiClient from '../config/clients';
import ApiConfig from '../config/apiConfig';

export function submitMediaService(files: any) {
  let formData = new FormData();
  formData.append('file', files.postData);

  return apiClient
    .post(ApiConfig.fileUpload, formData)
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(err => {
      console.log(err);
      return err.message;
    });
}
