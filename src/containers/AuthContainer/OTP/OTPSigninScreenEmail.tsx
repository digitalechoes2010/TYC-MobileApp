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
import {requestSignupEmail} from '../../../store/Actions/SignupActions';
import {IUserSignUpRequest} from '../../../store/Models/Api/User';

class OTPSigninScreen extends Component<any, any> {
  private otpInput: any;
  constructor(props: any) {
    super(props);
    this.state = {
      OTPSent: true,
      OTP: '',
      OTPVerified: false,
      isValid: false,
      isResend: true,
      isLoading: false,
    };
  }

  componentDidUpdate(prevProps: any, prevState: any) {}

  otpVerify = () => {
    if (this.state.OTP.length == 4) {
      this.props.doSignup({
        email: this.props.signupStore.email,
        password: this.props.signupStore.password,
        otp: this.state.OTP,
      });
    } else {
      Alert.alert('Error', 'Please Enter OTP.');
    }
  };

  phoneRegExp =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
  render() {
    const {signupStore} = this.props;
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{flex: 1}}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled">
        <View style={styles.signIncontainer}>
          <AuthTop
            title={'Email OTP Confirmation'}
            style={styles.logoContainerSignIn}
          />

          <View
            style={[styles.formContainer, {alignItems: 'center', flex: 1.5}]}>
            <View style={styles.textLinkContainer}>
              <Text style={styles.highlightText}>
                OTP has been sent to your email.
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
          </View>
          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
          <View style={[styles.buttonContainer]}>
            <Button
              mode={'contained'}
              style={styles.button}
              labelStyle={styles.buttonLabel}
              disabled={!this.state.OTPEntered || signupStore.isLoading}
              loading={signupStore.isLoading}
              onPress={() => this.otpVerify()}>
              {this.state.OTPEntered ? 'Verify' : 'Continue'}
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    signupStore: state.SignupReducer,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => ({
  doLogin: (request: ILoginRequest) => dispatch(requestLogin(request)),
  doSignup: (request: IUserSignUpRequest) =>
    dispatch(requestSignupEmail(request)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(OTPSigninScreen));
