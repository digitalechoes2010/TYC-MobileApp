/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Image,
  LogBox,
  Platform,
  ScrollView,
  TouchableHighlight,
  View,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {Button, Text, TextInput, withTheme} from 'react-native-paper';
import profileStyles from '../Styles/ProfileStyles';
import styles from '../../AuthContainer/SignIn/LoginStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../../config/themeConfig';
import ActionSheet from 'react-native-actionsheet';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import metrics from '../../../utils/metrics';
import {Formik, validateYupSchema} from 'formik';
import PhoneInput from 'react-native-phone-number-input';
import * as yup from 'yup';
import {Dispatch} from 'redux';
import apiClient from '../../../config/clients';
import ApiConfig from '../../../config/apiConfig';
import {useDispatch} from 'react-redux';
import {setUserdata} from '../../../store/Actions/UserActions';
import {userUpdateRequest} from '../../../store/Actions/UserActions';
import {fileUploadRequest} from '../../../store/Actions/file-manager.action';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {showTost} from '../../../utils/helper';
import Loader from '../../../components/Loader';
import axios from 'axios';
// import {decode as atob, encode as btoa} from 'base-64';
// import {decode as atob, encode as btoa} from 'js-base64';
import {phone} from 'phone';
import { Buffer } from "buffer";
import { getCountryCallingCodeAsync } from 'react-native-country-picker-modal/lib/CountryService';
class ProfileSetupScreen extends Component<any, any> {
  private ActionSheet: any;
  constructor(props: any) {
    super(props);
    this.state = {
      imageData: undefined,
      camLoading: false,
      countryCodeState: this.props.userData.gender,
      nationalFormatState: this.props.userData.userBio,
      changed: false,
      valueChanged: false,
      inputData: {
        phone: '',
        email: '',
        skills: '',
        job: '',
        industry: '',
        education: '',
        interests: '',
        address: '',
      }
    };
  }
  
  componentDidMount() {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    this.loadData();
  }

  loadData = () => {
    if (
      this.props.userData.buisnessCard &&
      this.props.userData.buisnessCard.length > 0
    ) {
      this.props.userData.buisnessCard.map((e: any) => {
      this.state.inputData[e.name] = e.uri;
      });
    }
    this.setState({inputData: Object.assign({}, this.state.inputData)});
  };

  phoneRegExp =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
    
    addressRegExp =
    /^[a-zA-Z0-9\s]+\,\s[a-zA-Z0-9\s]+\,\s[a-zA-Z\s]+\s[0-9]+\,\s[a-zA-Z\s]*$/;
  openActionSheet = () => {
    this.ActionSheet.show();
  };
  x='';
  // twilioFunction = async (values:any) => {
  //   if (this.state.changed === false) {
  //     if(this.state.valueChanged === true) {
  //     this.setState({changed: true});
  //     console.log("SSSS", this.state.changed);
  //     const username = 'AC57b5522b8d53aa6c6e2dd566345eb975';
  //     const password = '0938c49ebc48e94368ea639720eb96d9';
  //     await axios
  //     .get(
  //       'https://lookups.twilio.com/v1/PhoneNumbers/' + values,
  //       {
  //         headers: {
  //         Authorization: 'Basic ' + btoa(username + ':' + password)
  //         }
  //       }
  //     )
  //     .then(response => {
  //       console.log("Twilio Response", response.data);
  //       this.setState({countryCodeState: response.data.country_code});
  //       this.setState({nationalFormatState: response.data.national_format});
  //       console.log('Country Code:',this.state.countryCodeState);
  //       console.log('National Format:',this.state.nationalFormatState);
  //       this.x=response.data.country_code;
  //     })
  //     .catch(err => {
  //       console.log('Twilio Error:', err);
  //     });
  //    } else {
  //     this.setState({countryCodeState: this.props.userData.gender});
  //     this.setState({nationalFormatState: this.props.userData.userBio});
  //     console.log("No Phone", values.gender);
  //    }
  //   } 
  // }

  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'TYC Camera Permission',
          message:
            'TYC App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  chooseImage = async (num: number) => {
    await this.requestCameraPermission();
    const imgConfig: any = {
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.8,
      maxWidth: 400,
      maxHeight: 400,
    };
    switch (num) {
      case 0:
        launchCamera(imgConfig, this.captureImage);
        break;
      case 1:
        launchImageLibrary(imgConfig, this.captureImage);
    }
  };
  captureImage = async (data: any) => {
    this.setState({camLoading: true});
    if (data.assets) {
      const {assets} = data;
      const imageData: any = assets[0];
      console.log('imageData', imageData);

      this.setState({
        imgData: {
          ...imageData,
          uri:
            Platform.OS === 'android'
              ? imageData.uri
              : imageData.uri.replace('file://', ''),
        },
      });
      await this.uploadTest(imageData);
    } else {
      this.setState({camLoading: false});
      showTost('Image not Fuond');
    }
  };
  uploadTest = async (imageData: any) => {
    // console.log('imageData', imageData);
    try {
      const file = await fetch(imageData.uri);
      const blob = await file.blob();
      console.log(file);
      const files = {
        files: blob,
        fileMeta: {
          fileName: this.props.userData.username,
          type: blob.type,
          size: blob.size,
        },
        type: 'avatar',
        postData: {
          uri: imageData.uri,
          type: imageData.type,
          name: this.props.userData.username,
        },
      };
      this.props.uploadFile(files);
      this.setState({camLoading: false});
    } catch (error) {
      this.setState({camLoading: false});
      showTost('Unable to upload the image');
    }
  };

  updateBusinessCard = async (params: any) => {
    let payload: {uri: any; name: string}[] = [];
    Object.keys(params).map(function (key, index) {
      payload.push({
        uri: params[key],
        name: key,
      });
    });
    await apiClient
      .patch(ApiConfig.buisnessCard, {
        buisnessCard: payload,
      })
      .then((data: any) => {
        this.props.doUpdateBusinessCard(data.data);
      })
      .catch((error: any) => {
        Alert.alert('Error', 'Something Went Wrong.');
      })
  };

  trimFunction = async (values:any) => {
    if(this.state.valueChanged === true && phone(values.userBio).isValid === true) {
      const buisnessData = {
        phone: Array.isArray(this.props.userData.buisnessCard) ? this.props.userData.buisnessCard[0].uri : '',
        email: Array.isArray(this.props.userData.buisnessCard) ? values.email : '',
        skills: Array.isArray(this.props.userData.buisnessCard) ? this.props.userData.buisnessCard[2].uri : '',
        job: Array.isArray(this.props.userData.buisnessCard) ? this.props.userData.buisnessCard[3].uri : '',
        industry: Array.isArray(this.props.userData.buisnessCard) ? values.company : '',
        education: Array.isArray(this.props.userData.buisnessCard) ? this.props.userData.buisnessCard[5].uri : '',
        interests: Array.isArray(this.props.userData.buisnessCard) ? this.props.userData.buisnessCard[6].uri : '',
        address: Array.isArray(this.props.userData.buisnessCard) ? this.props.userData.buisnessCard[7].uri : '',
      }
      this.setState({inputData: buisnessData});
      this.setState({countryCodeState: phone(values.userBio).countryIso2});
      this.setState({nationalFormatState: values.userBio.replace(phone(values.userBio).countryCode, "")});
      const updatedObject = {
        name: values.name,
        address: values.address,
        gender: this.state.countryCodeState,
        userBio: this.state.nationalFormatState,
        mobile: '',
        callingCode: undefined,
        countryCode: undefined,
      };
      await this.updateBusinessCard(this.state.inputData);
      await this.props.doUserUpdate(updatedObject);
      Alert.alert('Success', 'Information Successfully Updated.');
      console.log("Number Full Details:", phone(values));
    } else if(this.state.valueChanged === true && phone(values).isValid === false) {
      this.setState({countryCodeState: this.props.userData.gender});
      this.setState({nationalFormatState: this.props.userData.userBio});
      Alert.alert('Error', 'Invalid Number Format.');
    } else {
      const buisnessData = {
        phone: Array.isArray(this.props.userData.buisnessCard) ? this.props.userData.buisnessCard[0].uri : '',
        email: Array.isArray(this.props.userData.buisnessCard) ? values.email : '',
        skills: Array.isArray(this.props.userData.buisnessCard) ? this.props.userData.buisnessCard[2].uri : '',
        job: Array.isArray(this.props.userData.buisnessCard) ? this.props.userData.buisnessCard[3].uri : '',
        industry: Array.isArray(this.props.userData.buisnessCard) ? values.company : '',
        education: Array.isArray(this.props.userData.buisnessCard) ? this.props.userData.buisnessCard[5].uri : '',
        interests: Array.isArray(this.props.userData.buisnessCard) ? this.props.userData.buisnessCard[6].uri : '',
        address: Array.isArray(this.props.userData.buisnessCard) ? this.props.userData.buisnessCard[7].uri : '',
      }
      this.setState({inputData: buisnessData});
      const updatedObject = {
        name: values.name,
        address: values.address,
        gender: this.state.countryCodeState,
        userBio: this.state.nationalFormatState,
        mobile: '',
        callingCode: undefined,
        countryCode: undefined,
      };
      await this.updateBusinessCard(this.state.inputData);
      await this.props.doUserUpdate(updatedObject);
      Alert.alert('Success', 'Information Successfully Updated.');
    }
  }

  handleSubmit = async (values: any) => {
    await this.trimFunction(values);
  };

  render() {
    const {imgData, camLoading} = this.state;
    const {userData, fileReducer} = this.props;
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{flex: 1}}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled">
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={profileStyles.profileContainer}>
            <View style={profileStyles.imageContainer}>
              <TouchableHighlight
                style={profileStyles.imageHolder}
                onPress={() => (camLoading ? {} : this.openActionSheet())}>
                {fileReducer.pending || camLoading ? (
                  <Loader />
                ) : (
                  ((imgData || userData.profilePic.length > 2) && (
                    <Image
                      source={{
                        uri:
                          userData.profilePic.length > 2
                            ? userData.profilePic
                            : imgData.uri,
                      }}
                      style={profileStyles.profileImg}
                    />
                  )) || (
                    <Icon
                      name={'camera'}
                      style={profileStyles.cameraIcon}
                      size={metrics.moderateScale(40)}
                    />
                  )
                )}
              </TouchableHighlight>
            </View>
            <Formik
              initialValues={{
                name: userData?.name ? userData?.name : '',
                email: userData.buisnessCard && Array.isArray(userData.buisnessCard) ? userData.buisnessCard[1].uri : '',
                company: userData.buisnessCard && Array.isArray(userData.buisnessCard) ? userData.buisnessCard[4].uri : '',
                mobile: userData?.countryCode
                  ? userData.mobile.replace(userData.callingCode, '')
                  : userData.mobile,
                countryCode: userData?.countryCode,
                callingCode: userData?.callingCode,
                gender: this.state.countryCodeState,
                address: userData?.address,
                userBio: userData?.userBio,

              }}
              onSubmit={values => this.handleSubmit(values)}
              validationSchema={yup.object().shape({
                // name: yup.string().required(),
                address: yup
                  .string()
                  .matches(this.addressRegExp, 'Invalid Address Format'),
                  // .required('Mobile is required'),
                  email: yup.string().email('Invalid Email Format'),
              })}>
              {({
                values,
                handleChange,
                errors,
                setFieldTouched,
                touched,
                isValid,
                handleSubmit,
                setFieldValue,
              }) => (
                <>
                {console.log("Value Changed", this.state.valueChanged)}
                  <View style={profileStyles.informationContainer}>
                    <View style={{flexDirection: 'column', marginBottom: 10}}>
                      <View style={profileStyles.formRow}>
                        <Icon
                          name={'user'}
                          size={25}
                          style={profileStyles.formIcon}
                        />
                        <TextInput
                          style={[styles.textInput, profileStyles.input]}
                          label={'Name'}
                          value={values.name}
                          placeholder={'Full Name'}
                          mode={'outlined'}
                          outlineColor={theme.colors.background}
                          onBlur={() => setFieldTouched('name')}
                          onChangeText={handleChange('name')}
                        />
                      </View>
                      {touched.name && errors.name && (
                        <Text style={styles.error}>{errors.name}</Text>
                      )}
                    </View>
                    <View style={{flexDirection: 'column', marginBottom: 10}}>
                      <View style={profileStyles.formRow}>
                        <MaterialCommunityIcons
                          name={'email'}
                          size={25}
                          style={profileStyles.formIcon}
                        />
                        <TextInput
                          style={[styles.textInput, profileStyles.input]}
                          label={'Email'}
                          value={values.email}
                          placeholder={'Email Address'}
                          mode={'outlined'}
                          outlineColor={theme.colors.background}
                          onBlur={() => setFieldTouched('email')}
                          onChangeText={handleChange('email')}
                        />
                      </View>
                      {touched.email && errors.email && (
                        <Text style={styles.error}>{errors.email}</Text>
                      )}
                    </View>

                    <View style={{flexDirection: 'column', marginBottom: 10}}>
                      <View style={profileStyles.formRow}>
                        <Icon
                          name={'building'}
                          size={25}
                          style={profileStyles.formIcon}
                        />
                        <TextInput
                          style={[styles.textInput, profileStyles.input]}
                          label={'Company'}
                          value={values.company}
                          placeholder={'Company'}
                          mode={'outlined'}
                          outlineColor={theme.colors.background}
                          onBlur={() => setFieldTouched('company')}
                          onChangeText={handleChange('company')}
                        />
                      </View>
                      {touched.company && errors.company && (
                        <Text style={styles.error}>{errors.company}</Text>
                      )}
                    </View>
                    {userData?.countryCode && userData?.mobile && (
                      <View style={{flexDirection: 'column', marginBottom: 10}}>
                        <View
                          style={[
                            profileStyles.formRow,
                            {justifyContent: 'flex-end', flexDirection: 'row'},
                          ]}>
                          <Icon
                            name={'mobile'}
                            size={30}
                            style={profileStyles.formIcon}
                          />
                          <Text
                            style={{
                              position: 'absolute',
                              left: '16%',
                              zIndex: 5,
                              top: Platform.OS === 'ios' ? 0 : -9,
                              color: theme.colors.backdrop,
                              fontSize: 12,
                            }}>
                            Shared Phone number
                          </Text>

                          <PhoneInput
                            placeholder="Enter shared phone number"
                            value={parseInt(values.mobile).toString()}
                            disabled={true}
                            onChangeCountry={e => {
                              setFieldValue('countryCode', e.cca2);
                              setFieldValue('callingCode', e.callingCode[0]);
                            }}
                            onChangeText={() => {
                              !touched.mobile ? setFieldTouched('mobile') : '';
                            }}
                            onChangeFormattedText={handleChange('mobile')}
                            defaultCode={userData.countryCode}
                            containerStyle={{
                              flex: 1,
                              alignItems: 'center',
                              borderRadius: 5,
                            }}
                            textContainerStyle={styles.textInput}
                            textInputStyle={{padding: 0, flex: 1}}
                            layout={'first'}
                          />
                        </View>
                        {touched.mobile && errors.mobile && (
                          <Text style={styles.error}>{errors.mobile}</Text>
                        )}
                      </View>
                    )}

                    <View style={{marginBottom: 10}}>
                      <View style={profileStyles.formRow}>
                        <Icon
                          name={'address-card'}
                          size={20}
                          style={profileStyles.formIcon}
                        />
                        <TextInput
                          style={[styles.textInput, profileStyles.input]}
                          label={'Address'}
                          mode={'outlined'}
                          value={values.address}
                          placeholder={'Street, City, State ZipCode, Country'}
                          outlineColor={theme.colors.background}
                          onBlur={() => setFieldTouched('address')}
                          onChangeText={handleChange('address')}
                        />
                      </View>
                      {touched.address && errors.address && (
                          <Text style={styles.error}>{errors.address}</Text>
                        )}
                    </View>
                    <View style={profileStyles.formRow}>
                      <Icon
                        name={'mobile'}
                        size={30}
                        style={profileStyles.formIcon}
                      />
                      <Text
                        style={{
                          position: 'absolute',
                          left: '16%',
                          zIndex: 5,
                          top: Platform.OS === 'ios' ? 0 : -9,
                          color: theme.colors.backdrop,
                          fontSize: 12,
                        }}>
                        Phone
                      </Text>
                      <PhoneInput
                        placeholder="Enter Phone Number"
                        defaultCode={
                          userData.gender ? userData.gender : 'US'
                        }
                        value={values.userBio}
                        disabled={false}
                        onChangeText={() => {
                          !touched.userBio ? setFieldTouched('userBio') : '';
                          this.setState({valueChanged: true});
                        }}
                        onChangeCountry={e => {
                          setFieldValue('gender', e.cca2);
                        }}
                        onChangeFormattedText={handleChange('userBio')}
                        containerStyle={{
                          flex: 1,
                          alignItems: 'center',
                          borderRadius: 5,
                        }}
                        textContainerStyle={styles.textInput}
                        textInputStyle={{padding: 0, flex: 1}}
                        layout={'first'}
                      />
                    </View>
                  </View>

                  <View style={[profileStyles.button]}>
                    <Button
                      mode={'contained'}
                      labelStyle={styles.buttonLabel}
                      disabled={!isValid || userData.isLoading}
                      onPress={handleSubmit}
                      style={[styles.button, {marginBottom: 30}]}
                      contentStyle={[styles.buttonContent]}
                      loading={userData.isLoading}>
                      Save Changes
                    </Button>
                  </View>
                </>
              )}
            </Formik>



            <ActionSheet
              ref={o => (this.ActionSheet = o)}
              title={'Choose One'}
              options={['Camera', 'Gallery', 'Cancel']}
              cancelButtonIndex={2}
              onPress={index => {
                this.chooseImage(index);
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    userData: state.UserReducer,
    fileReducer: state.FilesManagerReducer,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => ({
  doUserUpdate: (request: any) => dispatch(userUpdateRequest(request)),
  doUpdateBusinessCard: (request: any) => dispatch(setUserdata(request)),
  uploadFile: (files: object) => {
    dispatch(fileUploadRequest({files: files}));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(ProfileSetupScreen));
function values(values: any) {
  throw new Error('Function not implemented.');
}