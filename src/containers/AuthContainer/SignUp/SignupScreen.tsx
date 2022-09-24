/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Alert, Dimensions, ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import {Button, Snackbar, Text, TextInput, withTheme} from 'react-native-paper';
import AuthTop from '../../../components/AuthTop';
import AuthBottom from '../../../components/AuthBottom';
import styles from '../SignIn/LoginStyle';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Formik} from 'formik';
import * as yup from 'yup';
import 'yup-phone';
import {
  clearSignupStore,
  disableRegLoader,
  requestSignup,
  saveRegData,
} from '../../../store/Actions/SignupActions';
import {Dispatch} from 'redux';
import {IUserSignUpRequest} from '../../../store/Models/Api/User';
import {NativeStackNavigationProp} from 'react-native-screens/native-stack';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getOtpFromEmail} from '../../../services/Signup.service';
import {requestLogin} from '../../../store/Actions/LoginActions';
import {ILoginRequest} from '../../../store/Models/Api/Login';
interface ISignupProps {
  doSignup(request: IUserSignUpRequest): object;
  signupStore: any;
  navigation: NativeStackNavigationProp<any>;
  theme: any;
  clearStore(): void;
  disableLoader(): void;
  saveRegData(request: IUserSignUpRequest): void;
  doLogin(request: any): void;
}
class SignupScreen extends Component<ISignupProps, any> {
  constructor(props: ISignupProps) {
    super(props);
    this.state = {
      checked: false,
      email: '',
      mobile: '',
      password: '',
      confirmPassword: '',
      showError: Object.keys(this.props.signupStore.errors).length !== 0,
    };
    this.props.clearStore();
  }

  handleSubmit = async (values: any) => {
    console.log(values);
    if (
      values?.accountType &&
      (values.accountType == 'google' ||
        values.accountType == 'facebook' ||
        values.accountType == 'apple')
    ) {
      this.props.doLogin(values);
    } else {
      delete values.cnfPassword;
      this.props.saveRegData(values);
      const res = await getOtpFromEmail(values.email);
      console.log('res', res);
      if (res.data.ack == 1) {
        this.props.disableLoader();
        this.props.navigation.navigate('OTPAuthEmail');
      } else {
        this.props.disableLoader();
        Alert.alert('error', 'Email already registerd. Please login!');
      }
    }
  };
  componentDidUpdate(prevProps: any, prevState: any) {
    if (
      prevProps.signupStore.isLoading !== this.props.signupStore.isLoading &&
      Object.keys(this.props.signupStore.errors).length !== 0
    ) {
      this.setState({showError: true});
    }
  }

  render() {
    const {signupStore} = this.props;
    signupStore.isSuccess
      ? this.props.navigation.navigate('Home', {screen: 'ProfileSetup'})
      : '';
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{flex: 1}}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled">
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <Snackbar
            visible={this.state.showError}
            onDismiss={() => this.setState({showError: !this.state.showError})}
            duration={500}>
            {signupStore.errors.message
              ? signupStore.errors.message
              : 'Password Error'}
          </Snackbar>

          <View style={styles.signIncontainer}>
            <AuthTop
              title={'Sign Up'}
              style={[
                styles.logoContainerSignUp,
                {height: Dimensions.get('window').height * 0.1, minHeight: 100},
              ]}
            />
            <View style={[styles.textLinkContainer, {marginTop: 10}]}>
              <Text style={styles.boldText}> Already a User?</Text>
              <TouchableOpacity
                style={{flex: 2, alignSelf: 'flex-end'}}
                onPress={() => this.props.navigation.navigate('SignIn')}>
                <Text style={{...styles.highlightText, fontSize: 18}}>
                  {' '}
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
            <Formik
              enableReinitialize
              initialValues={{
                email: signupStore.email,
                password: signupStore.password,
                cnfPassword: signupStore.password,
              }}
              onSubmit={values => this.handleSubmit(values)}
              validationSchema={yup.object().shape({
                email: yup.string().email().required(),
                password: yup
                  .string()
                  .min(4)
                  .max(20, 'Password should not excced 20 chars.')
                  .required(),
                cnfPassword: yup
                  .string()
                  .oneOf([yup.ref('password'), null], 'Passwords must match')
                  .required('Please confirm your password'),
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
                  <View style={[styles.formContainerSignUp]}>
                    <View style={styles.inputContainerStyle}>
                      <TextInput
                        label="Email"
                        mode={'outlined'}
                        style={styles.textInput}
                        onChangeText={handleChange('email')}
                        onBlur={() => setFieldTouched('email')}
                        outlineColor={this.props.theme.colors.background}
                        value={values.email.toLowerCase()}
                        keyboardType={'email-address'}
                      />
                      {touched.email && errors.email && (
                        <Text style={styles.error}>{errors.email}</Text>
                      )}
                    </View>
                    {/* <View style={styles.inputContainerStyle}>
                      <PhoneInput
                        placeholder="Enter phone number"
                        value={values.mobile}
                        onChangeCountry={e => {
                          console.log(e);
                          setFieldValue('countryCode', e.cca2);
                          setFieldValue('callingCode', e.callingCode[0]);
                        }}
                        onChangeText={() => {
                          console.log(touched);
                          !touched.mobile ? setFieldTouched('mobile') : '';
                        }}
                        onChangeFormattedText={handleChange('mobile')}
                        defaultCode={
                          signupStore.countryCode
                            ? signupStore.countryCode
                            : 'US'
                        }
                        containerStyle={{
                          width: '100%',
                          borderRadius: 5,
                        }}
                        textContainerStyle={styles.textInput}
                        textInputStyle={{padding: 0, flex: 1}}
                        layout={'first'}
                      />
                      {touched.mobile && errors.mobile && (
                        <Text style={styles.error}>{errors.mobile}</Text>
                      )}
                    </View> */}
                    <View style={styles.inputContainerStyle}>
                      <TextInput
                        mode={'outlined'}
                        label="Password"
                        secureTextEntry={true}
                        textContentType={'password'}
                        onChangeText={handleChange('password')}
                        onBlur={() => setFieldTouched('password')}
                        style={styles.textInput}
                        outlineColor={this.props.theme.colors.background}
                      />
                      {touched.password && errors.password && (
                        <Text style={styles.error}>{errors.password}</Text>
                      )}
                    </View>
                    <View style={styles.inputContainerStyle}>
                      <TextInput
                        mode={'outlined'}
                        label="Confirm Password"
                        style={styles.textInput}
                        secureTextEntry={true}
                        outlineColor={this.props.theme.colors.background}
                        onChangeText={handleChange('cnfPassword')}
                        onBlur={() => setFieldTouched('cnfPassword')}
                      />
                      {touched.cnfPassword && errors.cnfPassword && (
                        <Text style={styles.error}>{errors.cnfPassword}</Text>
                      )}
                    </View>
                  </View>

                  <View style={[{flex: 0.1}]}>
                    <Button
                      mode={'contained'}
                      contentStyle={styles.buttonContent}
                      style={styles.button}
                      labelStyle={styles.buttonLabel}
                      disabled={!isValid}
                      onPress={handleSubmit}
                      loading={signupStore.isLoading}>
                      Sign up
                    </Button>
                  </View>
                </>
              )}
            </Formik>
            <AuthBottom
              seperatorText={'sign up'}
              handleSubmit={(values: any) => this.handleSubmit(values)}
            />
          </View>
        </ScrollView>
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
  doSignup: (request: IUserSignUpRequest) => dispatch(requestSignup(request)),
  clearStore: () => dispatch(clearSignupStore()),
  disableLoader: () => dispatch(disableRegLoader()),
  saveRegData: (request: IUserSignUpRequest) => dispatch(saveRegData(request)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(SignupScreen));
