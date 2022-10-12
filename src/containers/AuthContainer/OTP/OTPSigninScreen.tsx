/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Alert, View} from 'react-native';
import {connect} from 'react-redux';
import {Button, Snackbar, Text, withTheme} from 'react-native-paper';
import styles from '../SignIn/LoginStyle';
import AuthTop from '../../../components/AuthTop';
import OTPInputView from '@twotalltotems/react-native-otp-input/dist';
import PhoneInput from 'react-native-phone-number-input';
import {isValidNumber} from 'react-native-phone-number-input';
import metrics from '../../../utils/metrics';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {requestLogin} from '../../../store/Actions/LoginActions';
import {ILoginRequest} from '../../../store/Models/Api/Login';
import {Dispatch} from 'redux';
import apiClient from '../../../config/clients';
import ApiConfig from '../../../config/apiConfig';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Loader from '../../../components/Loader';
import {getCallingCode} from 'react-native-country-picker-modal';

class OTPSigninScreenEmail extends Component<any, any> {
  private otpInput: any;
  constructor(props: any) {
    super(props);
    this.state = {
      OTPSent: false,
      OTP: '',
      mobile: '',
      countryCode: 'US',
      callingCode: '1',
      OTPVerified: false,
      isValid: false,
      showError: Object.keys(this.props.loginStore.errors).length !== 0,
      isResend: true,
      isLoading: false,
    };
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (
      prevProps.loginStore.isLoading !== this.props.loginStore.isLoading &&
      Object.keys(this.props.loginStore.errors).length !== 0
    ) {
      this.setState({showError: true});
    }
  }
  sendOtp = () => {
    this.setState({isLoading: true});
    console.log('state mobile', this.state);
    // const postdata = {
    //   mobile: this.state.mobile,
    //   accountType: 'mobile',
    //   callingCode: this.state.callingCode,
    //   countryCode: this.state.countryCode,
    // };
    const postdata = {
      mobileNo: this.state.mobile,
      // accountType: 'mobile',
      callingCode: this.state.callingCode,
      countryCode: this.state.countryCode,
    };
    console.log('postdata', postdata);

    apiClient
      // .post(ApiConfig.mobileLogin, postdata)
      .post(ApiConfig.sendLoginMobileOtp, postdata)
      .then((data: any) => {
        console.log('logindata', data);
        this.setState(
          {OTPSent: true, isResend: true, OTP: '', isLoading: false},
          () => {
            setTimeout(() => {
              this.setState({isResend: false});
            }, 30000);
          },
        );
      })
      .catch((error: any) => {
        this.setState({isLoading: false}, () =>
          Alert.alert('Error', 'Something Went Wrong.'),
        );
        console.log(error);
      });
  };

  otpVerify = () => {
    if (this.state.OTP.length == 4) {
      this.props.doLogin({
        mobile: this.state.mobile,
        otp: parseInt(this.state.OTP),
        accountType: 'mobile',
        callingCode: this.state.callingCode,
        countryCode: this.state.countryCode,
      });
    } else {
      Alert.alert('Error', 'Please Enter OTP.');
    }
  };

  phoneRegExp =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
  render() {
    const {loginStore} = this.props;
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{flex: 1}}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled">
        <View style={styles.signIncontainer}>
          <AuthTop
            title={
              this.state.OTPSent ? 'OTP Confirmation' : 'Sign In with Mobile'
            }
            style={styles.logoContainerSignIn}
          />
          <Snackbar
            visible={this.state.showError}
            onDismiss={() => this.setState({showError: !this.state.showError})}
            duration={500}>
            {loginStore.errors.message
              ? loginStore.errors.message
              : 'Something Went Wrong'}
          </Snackbar>

          {(this.state.OTPSent && (
            <>
              <View
                style={[
                  styles.formContainer,
                  {alignItems: 'center', flex: 1.5},
                ]}>
                <View style={styles.textLinkContainer}>
                  <Text style={styles.highlightText}>
                    OTP has been sent to your registered mobile number.
                  </Text>
                </View>
                {!this.state.isLoading && (
                  <OTPInputView
                    ref={input => (this.otpInput = input)}
                    style={{width: '80%', height: metrics.verticalScale(200)}}
                    pinCount={4}
                    onCodeChanged={code => {
                      this.setState({
                        OTP: code,
                        OTPEntered: code.length >= 4,
                      });
                    }}
                    autoFocusOnLoad={false}
                    codeInputFieldStyle={styles.borderStyleBase}
                    codeInputHighlightStyle={styles.borderStyleHighLighted}
                    // clearInputs={this.state.isLoading}
                    // onCodeFilled={code => {
                    //   this.setState({OTPVerified: true, OTP: code});
                    // }}
                  />
                )}
                {/* <OTPInputView
                  ref={input => (this.otpInput = input)}
                  style={{width: '80%', height: metrics.verticalScale(200)}}
                  pinCount={4}
                  onCodeChanged={code => {
                    this.setState({
                      OTP: code,
                      OTPEntered: code.length >= 4,
                    });
                  }}
                  autoFocusOnLoad={false}
                  codeInputFieldStyle={styles.borderStyleBase}
                  codeInputHighlightStyle={styles.borderStyleHighLighted}
                  // clearInputs={this.state.isLoading}
                  // onCodeFilled={code => {
                  //   this.setState({OTPVerified: true, OTP: code});
                  // }}
                /> */}
              </View>
              <TouchableOpacity
                onPress={() => this.sendOtp()}
                disabled={this.state.isResend}>
                <View style={styles.textLinkContainer}>
                  <Text
                    style={[
                      styles.highlightText,
                      this.state.isResend && {color: 'gray'},
                    ]}>
                    Resend OTP ?
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={[styles.buttonContainer]}>
                <Button
                  mode={'contained'}
                  style={styles.button}
                  labelStyle={styles.buttonLabel}
                  disabled={!this.state.OTPEntered || loginStore.isLoading}
                  loading={loginStore.isLoading}
                  onPress={() => this.otpVerify()}>
                  {this.state.OTPEntered ? 'Verify' : 'Continue'}
                </Button>
              </View>
            </>
          )) || (
            <>
              <View style={[styles.formContainer, {flex: 1.5}]}>
                <PhoneInput
                  placeholder="Enter phone number"
                  value={this.state.mobile}
                  defaultCode={'US'}
                  onChangeCountry={e => {
                    this.setState({
                      countryCode: e.cca2,
                      callingCode: e.callingCode[0],
                    });
                  }}
                  onChangeText={text => {
                    this.setState({
                      mobile: text,
                      isValid: isValidNumber(text, this.state.countryCode),
                    });
                  }}
                  onChangeFormattedText={text =>
                    this.setState({
                      isValid: isValidNumber(text, this.state.countryCode),
                    })
                  }
                  containerStyle={{
                    width: '100%',
                    borderRadius: 5,
                  }}
                  textContainerStyle={styles.textInput}
                  textInputStyle={{padding: 0, flex: 1}}
                  layout={'first'}
                />
                <Text style={styles.error}>
                  {this.state.mobile === ''
                    ? 'Mobile Number is required'
                    : !this.state.isValid
                    ? 'Enter a Valid Number'
                    : ''}
                </Text>
              </View>
              <View style={[styles.buttonContainer]}>
                <Button
                  mode={'contained'}
                  style={styles.button}
                  labelStyle={styles.buttonLabel}
                  disabled={!this.state.isValid}
                  onPress={() => {
                    if (this.state.isValid) {
                      this.sendOtp();
                      // setTimeout(() => {
                      //   this.otpInput.focusField(0);
                      // }, 150);
                    }
                  }}>
                  {this.state.OTPEntered ? 'Verify' : 'Continue'}
                </Button>
              </View>
            </>
          )}
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    loginStore: state.loginReducer,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => ({
  doLogin: (request: ILoginRequest) => dispatch(requestLogin(request)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(OTPSigninScreenEmail));
