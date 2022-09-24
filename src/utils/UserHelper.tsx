import {Linking} from 'react-native';
import * as yup from 'yup';
import ApiConfig from '../config/apiConfig';
import apiClient from '../config/clients';
import {navigate} from '../navigation/RootNavigation';
import {showTost, validURL} from './helper';
import {getLocation} from './LocationHelper';

export const readBarcode = async (barcode: any) => {
  try {
    let schema = yup.object().shape({
      url: yup.string().url(),
      urlValue: yup.string(),
    });
    const str = barcode;
    const strsplit = str.split('/');
    console.log('strsplit', strsplit);
    if (strsplit.length != 5) {
      throw 'Please scan a valif TYC QR Code';
    }
    const validateData = await schema.isValid({
      url: str,
      urlValue: strsplit[4],
    });

    if (!validateData) {
      throw 'Please scan a valid TYC QR Code';
    }
    console.log('dd', strsplit[3], strsplit[4]);

    const locationData: any = await getLocation();
    if (strsplit[3] == 'p') {
      const findUser = {
        query: strsplit[4],
      };
      console.log('findUser', findUser);

      apiClient
        .post(ApiConfig.getByIdOrUsername, findUser)
        .then((res: any) => {
          console.log('res**', res);
          const postData = {
            userId: res.data.id,
            ...locationData,
          };
          console.log('postData', postData);

          apiClient
            .post(ApiConfig.scanNFCbyUserId, postData)
            .then((res: any) => {
              console.log('data ', res);
              const data = res.data;
              if (data?.ack == 0) {
                showTost(data?.message);
              } else if (data?.isDirect) {
                const urlObj = data[data.activeProfile].filter(
                  (e: any) => e.id == data.activeDirect,
                );
                Linking.openURL(validURL(urlObj[0].uri));
              } else {
                console.log('strsplit[4]', strsplit[4], data.id);
                navigate('Contacts', {
                  screen: 'PublicProfile',
                  params: {userId: data.id},
                });
              }
            });
        })
        .catch((error: any) => {
          console.log('error', error);
          showTost('No Profile Found');
        });
    } else {
      //tags
      const postData = {
        serialNo: strsplit[4],
        ...locationData,
      };
      console.log('postData', postData);

      apiClient
        .post(ApiConfig.scanNFCbySerialNo, postData)
        .then((res: any) => {
          console.log('res**', res);

          const data = res.data;
          if (data?.ack == 0) {
            showTost(data?.message);
          } else if (data?.isDirect) {
            const urlObj = data[data.activeProfile].filter(
              (e: any) => e.id == data.activeDirect,
            );
            Linking.openURL(validURL(urlObj[0].uri));
          } else {
            navigate('Contacts', {
              screen: 'PublicProfile',
              params: {userId: data.id},
            });
          }
        })
        .catch((error: any) => {
          console.log('error api', error);
          showTost('No Profile Found');
        });
    }
  } catch (error) {
    showTost('Please scan a valid TYC QR Code');
  }
};