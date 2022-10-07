/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Text} from 'react-native-paper';
import theme from '../../../config/themeConfig';
import styles from '../../AuthContainer/SignIn/LoginStyle';
import {Button, TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import * as yup from 'yup';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const BusinessCardDetails = ({inputData, handleUpdate, isOwn}: any) => {
  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled">
      <View
        style={{
          flexDirection: 'column',
        }}>
        <Formik
          initialValues={inputData}
          onSubmit={values => handleUpdate(values)}
          validationSchema={yup.object().shape({
            // phone: yup.string().required(),
          })}>
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit,
          }) => (
            <ScrollView style={styles.scrollHeight}>
              <View style={styles.formContainer2}>
                <View style={styles.inputContainerStyle}>
                  <TextInput
                    autoCapitalize="none"
                    label="phone"
                    mode={'outlined'}
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    onBlur={() => setFieldTouched('phone')}
                    outlineColor={theme.colors.darkgray}
                    keyboardType={'phone-pad'}
                    disabled={isOwn == 'ctUserData'}
                  />
                  {touched.phone && errors.phone && (
                    <Text style={styles.error}>{errors.phone}</Text>
                  )}
                </View>
                <View style={styles.inputContainerStyle}>
                  <TextInput
                    autoCapitalize="none"
                    label="email"
                    mode={'outlined'}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={() => setFieldTouched('email')}
                    outlineColor={theme.colors.darkgray}
                    keyboardType={'email-address'}
                    disabled={isOwn == 'ctUserData'}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.error}>{errors.email}</Text>
                  )}
                </View>
                <View style={styles.inputContainerStyle}>
                  <TextInput
                    autoCapitalize="none"
                    label="skills"
                    mode={'outlined'}
                    value={values.skills}
                    onChangeText={handleChange('skills')}
                    onBlur={() => setFieldTouched('skills')}
                    outlineColor={theme.colors.darkgray}
                    keyboardType={'default'}
                    disabled={isOwn == 'ctUserData'}
                  />
                  {touched.skills && errors.skills && (
                    <Text style={styles.error}>{errors.skills}</Text>
                  )}
                </View>
                <View style={styles.inputContainerStyle}>
                  <TextInput
                    autoCapitalize="none"
                    label="job"
                    mode={'outlined'}
                    value={values.job}
                    onChangeText={handleChange('job')}
                    onBlur={() => setFieldTouched('job')}
                    outlineColor={theme.colors.darkgray}
                    keyboardType={'default'}
                    disabled={isOwn == 'ctUserData'}
                  />
                  {touched.job && errors.job && (
                    <Text style={styles.error}>{errors.job}</Text>
                  )}
                </View>
                <View style={styles.inputContainerStyle}>
                  <TextInput
                    autoCapitalize="none"
                    label="industry"
                    mode={'outlined'}
                    value={values.industry}
                    onChangeText={handleChange('industry')}
                    onBlur={() => setFieldTouched('industry')}
                    outlineColor={theme.colors.darkgray}
                    keyboardType={'default'}
                    disabled={isOwn == 'ctUserData'}
                  />
                  {touched.industry && errors.industry && (
                    <Text style={styles.error}>{errors.industry}</Text>
                  )}
                </View>
                <View style={styles.inputContainerStyle}>
                  <TextInput
                    autoCapitalize="none"
                    label="education"
                    mode={'outlined'}
                    value={values.education}
                    onChangeText={handleChange('education')}
                    onBlur={() => setFieldTouched('education')}
                    outlineColor={theme.colors.darkgray}
                    keyboardType={'default'}
                    disabled={isOwn == 'ctUserData'}
                  />
                  {touched.education && errors.education && (
                    <Text style={styles.error}>{errors.education}</Text>
                  )}
                </View>
                <View style={styles.inputContainerStyle}>
                  <TextInput
                    autoCapitalize="none"
                    label="interests"
                    mode={'outlined'}
                    value={values.interests}
                    onChangeText={handleChange('interests')}
                    onBlur={() => setFieldTouched('interests')}
                    outlineColor={theme.colors.darkgray}
                    keyboardType={'default'}
                    disabled={isOwn == 'ctUserData'}
                  />
                  {touched.interests && errors.interests && (
                    <Text style={styles.error}>{errors.interests}</Text>
                  )}
                </View>
                <View style={styles.inputContainerStyle}>
                  <TextInput
                    autoCapitalize="none"
                    label="address"
                    mode={'outlined'}
                    value={values.address}
                    onChangeText={handleChange('address')}
                    onBlur={() => setFieldTouched('address')}
                    outlineColor={theme.colors.darkgray}
                    keyboardType={'default'}
                    disabled={isOwn == 'ctUserData'}
                  />
                  {touched.address && errors.address && (
                    <Text style={styles.error}>{errors.address}</Text>
                  )}
                </View>
              </View>
              {isOwn != 'ctUserData' && (
                <Button
                  mode={'contained'}
                  contentStyle={styles.buttonContent}
                  style={styles.button}
                  labelStyle={styles.buttonLabel}
                  color={theme.colors.textDark}
                  onPress={handleSubmit}>
                  Save
                </Button>
              )}
              <View style={{height: 50}} />
            </ScrollView>
          )}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
};
export default BusinessCardDetails;
