import React, {Component} from 'react';
import {ScrollView, View, Linking, SafeAreaView, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {
  Button,
  Checkbox,
  Snackbar,
  Text,
  TextInput,
  withTheme,
} from 'react-native-paper';
import styles from './LoginStyle';
import AuthTop from '../../../components/AuthTop';
import AuthBottom from '../../../components/AuthBottom';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Dispatch} from 'redux';

import {requestLogin} from '../../../store/Actions/LoginActions';
import {ILoginRequest} from '../../../store/Models/Api/Login';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class SigninScreen extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      checked: false,
      showError: Object.keys(this.props.loginStore.errors).length !== 0,
    };
  }
  handleSubmit = (values: any) => {
    this.props.doLogin(values);
  };
  componentDidUpdate(prevProps: any, prevState: any) {
    if (
      prevProps.loginStore.isLoading !== this.props.loginStore.isLoading &&
      Object.keys(this.props.loginStore.errors).length !== 0
    ) {
      this.setState({showError: true});
    }
  }
  render() {
    const {loginStore} = this.props;
    return (
      <SafeAreaView style={styles.defaultPage}>
        <Snackbar
          visible={this.state.showError}
          onDismiss={() => this.setState({showError: !this.state.showError})}
          duration={500}>
          {loginStore.errors.message
            ? loginStore.errors.message
            : 'Something Went Wrong'}
        </Snackbar>
        <View>
          {loginStore.isLoading ? 
            <ActivityIndicator
              size="large"
              color={'black'}
              style={styles.activityIndicator}
            />
          :
          <>
            <AuthTop title="Sign In With" />
            <AuthBottom
              seperatorText={'sign in'}
              handleSubmit={(values: any) => this.handleSubmit(values)}
            /> 
          </> 
          }
        </View>
      </SafeAreaView>
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
)(withTheme(SigninScreen));
