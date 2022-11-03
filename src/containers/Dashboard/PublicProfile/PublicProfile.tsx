/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, Share, Button} from 'react-native';
import {Snackbar} from 'react-native-paper';
import Header from '../../../components/Header';
import dashboardStyles from '../Styles/DashBoardStyles';
import profileStyles from '../Styles/ProfileStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import ProfileTabs from '../Profile/ProfileTabs';
import {ProfileTypes} from '../../../store/Models/Api/User';
import TabComponent from '../../../components/TabComponent';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import apiClient from '../../../config/clients';
import ApiConfig from '../../../config/apiConfig';
import {StackActions} from '@react-navigation/native';
import {copyLink, makeLink} from '../../../utils/helper';
import Contacts from 'react-native-contacts';
import IIcon from 'react-native-vector-icons/Ionicons';
import metrics from '../../../utils/metrics';
import theme from '../../../config/themeConfig';
import styles from '../Styles/DashBoardStyles';
import countryCodes from './CountriesCodes';
interface IProps {
  navigation: Object;
  route: any;
}

const PublicProfile = ({navigation, route}: any) => {
  const removeFirstWord = (string: any) => {
    const indexOfSpace = string.indexOf(' ');
  
    if (indexOfSpace === -1) {
      return '';
    }
  
    return string.substring(indexOfSpace + 1);
  };
  
  const removeLastWord = (string: any) => {
    const lastIndexOfSpace = string.lastIndexOf(' ');
  
    if (lastIndexOfSpace === -1) {
      return string;
    }
  
    return string.substring(0, lastIndexOfSpace);
  };
  
  const openContactForm = (name: any, email: any, phone: any, address: any, countryCode: any, company: any) => {
    
    if (email && phone && address) {
      let diallingCode = '';
      countryCodes.map((countryCodeDial: any) => {
        if(countryCodeDial.isoCode2 === countryCode)
            return diallingCode = countryCodeDial.countryCodes[0];
        return diallingCode;
      })
      
      let fullAddress = address;
      let fullAddressArray = fullAddress.split(',');
      let firstPartAddress = fullAddressArray[0];
      let secondPartAddress = fullAddressArray[1];
      let thirdPartAddress = fullAddressArray[2];
      let fourthPartAddress = fullAddressArray[3];
      let splitedStreet = firstPartAddress;
      let splitedCity = removeFirstWord(secondPartAddress);
      let splitedStateZipCode = removeFirstWord(thirdPartAddress);
      let splitedState = removeLastWord(splitedStateZipCode);
      let splitedZipCode = thirdPartAddress.split(' ').pop();
      let splitedCountryCode = removeFirstWord(fourthPartAddress);

      var newPerson = {
        displayName: name !== userData.username ? name : userData.username[0].toUpperCase() + userData.username.substring(1) + ' ' + userData.username[0].toUpperCase() + userData.username.substring(1),
        familyName: name !== userData.username ? removeFirstWord(name) : userData.username[0].toUpperCase() + userData.username.substring(1),
        givenName: name !== userData.username ? removeLastWord(name) : userData.username[0].toUpperCase() + userData.username.substring(1),
        emailAddresses: [
          {
            label: 'Other',
            email: email,
          },
        ],
        phoneNumbers: [
          {
            label: 'Mobile',
            number: '+' + diallingCode + ' ' + phone,
          },
        ],
        postalAddresses: [{
          label: 'Home',
          street: splitedStreet,
          city: splitedCity,
          state: splitedState,
          postCode: splitedZipCode,
          country: splitedCountryCode,
        }],
        company: company,
      } 
    } else if (email && phone) {
      let diallingCode = '';
      countryCodes.map((countryCodeDial: any) => {
        if(countryCodeDial.isoCode2 === countryCode)
            return diallingCode = countryCodeDial.countryCodes[0];
        return diallingCode;
      })
      
      var newPerson = {
        displayName: name !== userData.username ? name : userData.username[0].toUpperCase() + userData.username.substring(1) + ' ' + userData.username[0].toUpperCase() + userData.username.substring(1),
        familyName: name !== userData.username ? removeFirstWord(name) : userData.username[0].toUpperCase() + userData.username.substring(1),
        givenName: name !== userData.username ? removeLastWord(name) : userData.username[0].toUpperCase() + userData.username.substring(1),
        emailAddresses: [
          {
            label: 'Other',
            email: email,
          },
        ],
        phoneNumbers: [
          {
            label: 'Mobile',
            number: '+' + diallingCode + ' ' + phone,
          },
        ],
        company: company,
      } 
    } else if (email && address) {
      let fullAddress = address;
      let fullAddressArray = fullAddress.split(',');
      let firstPartAddress = fullAddressArray[0];
      let secondPartAddress = fullAddressArray[1];
      let thirdPartAddress = fullAddressArray[2];
      let fourthPartAddress = fullAddressArray[3];
      let splitedStreet = firstPartAddress;
      let splitedCity = removeFirstWord(secondPartAddress);
      let splitedStateZipCode = removeFirstWord(thirdPartAddress);
      let splitedState = removeLastWord(splitedStateZipCode);
      let splitedZipCode = thirdPartAddress.split(' ').pop();
      let splitedCountryCode = removeFirstWord(fourthPartAddress);
      
      var newPerson = {
        displayName: name !== userData.username ? name : userData.username[0].toUpperCase() + userData.username.substring(1) + ' ' + userData.username[0].toUpperCase() + userData.username.substring(1),
        familyName: name !== userData.username ? removeFirstWord(name) : userData.username[0].toUpperCase() + userData.username.substring(1),
        givenName: name !== userData.username ? removeLastWord(name) : userData.username[0].toUpperCase() + userData.username.substring(1),
        emailAddresses: [
          {
            label: 'Other',
            email: email,
          },
        ],
        postalAddresses: [{
          label: 'Home',
          street: splitedStreet,
          city: splitedCity,
          state: splitedState,
          postCode: splitedZipCode,
          country: splitedCountryCode,
        }],
        company: company,
      } 
    } else if (phone && address) {
      let diallingCode = '';
      countryCodes.map((countryCodeDial: any) => {
        if(countryCodeDial.isoCode2 === countryCode)
            return diallingCode = countryCodeDial.countryCodes[0];
        return diallingCode;
      })
      
      let fullAddress = address;
      let fullAddressArray = fullAddress.split(',');
      let firstPartAddress = fullAddressArray[0];
      let secondPartAddress = fullAddressArray[1];
      let thirdPartAddress = fullAddressArray[2];
      let fourthPartAddress = fullAddressArray[3];
      let splitedStreet = firstPartAddress;
      let splitedCity = removeFirstWord(secondPartAddress);
      let splitedStateZipCode = removeFirstWord(thirdPartAddress);
      let splitedState = removeLastWord(splitedStateZipCode);
      let splitedZipCode = thirdPartAddress.split(' ').pop();
      let splitedCountryCode = removeFirstWord(fourthPartAddress);
      
      var newPerson = {
        displayName: name !== userData.username ? name : userData.username[0].toUpperCase() + userData.username.substring(1) + ' ' + userData.username[0].toUpperCase() + userData.username.substring(1),
        familyName: name !== userData.username ? removeFirstWord(name) : userData.username[0].toUpperCase() + userData.username.substring(1),
        givenName: name !== userData.username ? removeLastWord(name) : userData.username[0].toUpperCase() + userData.username.substring(1),
        phoneNumbers: [
          {
            label: 'Mobile',
            number: '+' + diallingCode + ' ' + phone,
          },
        ],
        postalAddresses: [{
          label: 'Home',
          street: splitedStreet,
          city: splitedCity,
          state: splitedState,
          postCode: splitedZipCode,
          country: splitedCountryCode,
        }],
        company: company,
      } 
    } else if (email) {
      var newPerson = {
        displayName: name !== userData.username ? name : userData.username[0].toUpperCase() + userData.username.substring(1) + ' ' + userData.username[0].toUpperCase() + userData.username.substring(1),
        familyName: name !== userData.username ? removeFirstWord(name) : userData.username[0].toUpperCase() + userData.username.substring(1),
        givenName: name !== userData.username ? removeLastWord(name) : userData.username[0].toUpperCase() + userData.username.substring(1),
        emailAddresses: [
          {
            label: 'Other',
            email: email,
          },
        ],
        company: company,
      } 
    } else if (phone) {
      let diallingCode = '';
      countryCodes.map((countryCodeDial: any) => {
        if(countryCodeDial.isoCode2 === countryCode)
            return diallingCode = countryCodeDial.countryCodes[0];
        return diallingCode;
      })
      
      var newPerson = {
        displayName: name !== userData.username ? name : userData.username[0].toUpperCase() + userData.username.substring(1) + ' ' + userData.username[0].toUpperCase() + userData.username.substring(1),
        familyName: name !== userData.username ? removeFirstWord(name) : userData.username[0].toUpperCase() + userData.username.substring(1),
        givenName: name !== userData.username ? removeLastWord(name) : userData.username[0].toUpperCase() + userData.username.substring(1),
        phoneNumbers: [
          {
            label: 'Mobile',
            number: '+' + diallingCode + ' ' + phone,
          },
        ],
        company: company,
      } 
    } else if (address) {
      let fullAddress = address;
      let fullAddressArray = fullAddress.split(',');
      let firstPartAddress = fullAddressArray[0];
      let secondPartAddress = fullAddressArray[1];
      let thirdPartAddress = fullAddressArray[2];
      let fourthPartAddress = fullAddressArray[3];
      let splitedStreet = firstPartAddress;
      let splitedCity = removeFirstWord(secondPartAddress);
      let splitedStateZipCode = removeFirstWord(thirdPartAddress);
      let splitedState = removeLastWord(splitedStateZipCode);
      let splitedZipCode = thirdPartAddress.split(' ').pop();
      let splitedCountryCode = removeFirstWord(fourthPartAddress);

      var newPerson = {
        displayName: name !== userData.username ? name : userData.username[0].toUpperCase() + userData.username.substring(1) + ' ' + userData.username[0].toUpperCase() + userData.username.substring(1),
        familyName: name !== userData.username ? removeFirstWord(name) : userData.username[0].toUpperCase() + userData.username.substring(1),
        givenName: name !== userData.username ? removeLastWord(name) : userData.username[0].toUpperCase() + userData.username.substring(1),
        postalAddresses: [{
          label: 'Home',
          street: splitedStreet,
          city: splitedCity,
          state: splitedState,
          postCode: splitedZipCode,
          country: splitedCountryCode,
        }],
        company: company,
      } 
    } else {
      var newPerson = {
        displayName: name !== userData.username ? name : userData.username[0].toUpperCase() + userData.username.substring(1) + ' ' + userData.username[0].toUpperCase() + userData.username.substring(1),
        familyName: name !== userData.username ? removeFirstWord(name) : userData.username[0].toUpperCase() + userData.username.substring(1),
        givenName: name !== userData.username ? removeLastWord(name) : userData.username[0].toUpperCase() + userData.username.substring(1),
        company: company,
      }
    };

    Contacts.openContactForm(newPerson);
    
  };

  const insets = useSafeAreaInsets();
  // const userData = useSelector((state: any) => state.UserReducer);
  const [userData, setuserData] = useState({});
  const [isVisible, setVisible] = useState({status: false, message: ''});
  useEffect(() => {
    apiClient
      .get(ApiConfig.getNfcUserDetails + route.params?.userId)
      .then((data: any) => {
        console.log('getNfcUserDetails', data);
        setuserData(data.data);
      })
      .catch((error: any) => {
        console.log(error);
        navigation.navigate('Home');
        setVisible({status: true, message: error.message});
        // navigation.dispatch(StackActions.replace('Home'));
      });
  }, [route.params?.userId]);
  const routes = [
    {key: 'first', title: 'Social'},
    {key: 'second', title: 'Business'},
  ];
  const scene = ({route}: any) => {
    switch (route.key) {
      case 'first':
        return (
          <ProfileTabs
            navigation={navigation}
            type={ProfileTypes.SOCIAL}
            contactUserId={route.params?.userId}
            // itemSlected={this.itemSelected}
          />
        );
      case 'second':
        return (
          <ProfileTabs
            navigation={navigation}
            type={ProfileTypes.BUSINESS}
            contactUserId={route.params?.userId}

            // itemSlected={this.itemSelected}
          />
        );
      default:
        return null;
    }
  };
  return (
    <>
      <View style={[dashboardStyles.dashboardContainer]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            height: 60,
            marginBottom: insets.top,
          }}>
          <IIcon
            name={'md-arrow-back-outline'}
            size={30}
            color={'black'}
            style={{width: '30%', marginLeft: 10}}
            onPress={() => navigation.goBack()}
          />
          <Text
            style={{
              alignItems: 'center',
              fontSize: 22,
              fontWeight: 'bold',
            }}>
            Public Profile
          </Text>
        </View>
        <View
          style={[dashboardStyles.topContainer, {justifyContent: 'center'}]}>
          <View style={dashboardStyles.imageContainer}>
            <View style={dashboardStyles.imageHolder}>
              {(userData?.profilePic?.length > 2 && (
                <Image
                  source={{uri: userData?.profilePic}}
                  style={profileStyles.profileImg}
                />
              )) || (
                <Icon
                  name={'camera'}
                  style={profileStyles.cameraIcon}
                  size={40}
                />
              )}
            </View>
          </View>
        </View>
        <View style={dashboardStyles.userInfo}>
          <Text style={[dashboardStyles.userName, {textAlign: 'center', textTransform: 'capitalize', marginTop: 10}]}>
            {userData.name ?? userData.username}
          </Text>
          <TouchableOpacity
            disabled={userData ? false : true}
            onPress={() =>
              openContactForm(
                userData.name ? userData.name : userData.username,
                userData.buisnessCard && Array.isArray(userData.buisnessCard) ? userData.buisnessCard[1].uri : userData.email,
                userData.userBio,
                userData.address,
                userData.gender,
                userData.buisnessCard && Array.isArray(userData.buisnessCard) ? userData.buisnessCard[4].uri : '',
              )
            }
            style={[
              styles.dashBoardButtonContainer1,
              {backgroundColor: theme.colors.primary},
            ]}>
            <Text style={styles.t1}>ADD CONTACT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              copyLink(makeLink(userData));
              Share.share({
                message: makeLink(userData),
              });
            }}>
            <Text style={dashboardStyles.userLink}>{makeLink(userData)}</Text>
          </TouchableOpacity>
        </View>
        <View style={dashboardStyles.bottomContainer}>
          {userData.profileTabType && (
            <TabComponent
              publicProfile={true}
              scenes={scene}
              routes={routes}
              profileTabType={userData?.profileTabType ?? 'Both'}
              ctUserData={userData}
            />
          )}
        </View>
      </View>
      <Snackbar
        visible={isVisible.status}
        duration={1000}
        onDismiss={() => setVisible({...isVisible, status: false})}
        action={{
          label: 'Done',
          onPress: () => {
            // Do something
          },
        }}>
        {isVisible.message}
      </Snackbar>
    </>
  );
};

export default PublicProfile;
