import GetLocation from 'react-native-get-location';
import {PermissionsAndroid} from 'react-native';
import Geocoder from 'react-native-geocoding';

export const getLocation = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkPermission = await requestLocationPermission();
      if (checkPermission) {
        const cords = await GetLocation.getCurrentPosition({
          enableHighAccuracy: false,
          timeout: 15000,
        });
        Geocoder.init('AIzaSyAQBIpYoqg-PiWDQg2nGT8bcgeCNz0LUzs');
        const address = await Geocoder.from({
          latitude: cords.latitude,
          longitude: cords.longitude,
        });
        console.log('address', address);

        let geometry = address.results[0].geometry.location;
        let country = null;
        let city = null;
        address.results[0].address_components.map((e: any) => {
          if (e.types[1] == 'political' && e.types[0] == 'locality') {
            city = e.long_name;
          }
          if (e.types[1] == 'political' && e.types[0] == 'country') {
            country = e.long_name;
          }
        });
        const postData = {
          location: {lat: geometry.lat, long: geometry.lng},
          tapAddress: address.results[0].formatted_address,
          country,
          city,
        };
        resolve(postData);
      } else {
        resolve({
          location: {lat: 0, long: 0},
          tapAddress: '',
        });
      }
    } catch (error) {
      resolve({
        location: {lat: 0, long: 0},
        tapAddress: '',
      });
    }
  });
};
export const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    ]);
    return granted;
  } catch (err) {
    return false;
  }
};
