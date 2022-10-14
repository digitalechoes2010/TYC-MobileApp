/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image,
  Platform,
  Text,
  // TextInput,
} from 'react-native';
import {Button, Card, Dialog, FAB, Portal, TextInput} from 'react-native-paper';
import theme from '../../../config/themeConfig';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';
import {Component} from 'react';
import metrics from '../../../utils/metrics';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {IUserProfileItems, ProfileTypes} from '../../../store/Models/Api/User';
import SIcon from 'react-native-vector-icons/FontAwesome5';
import styles from '../../AuthContainer/SignIn/LoginStyle';
import {
  deleteUserProfileItem,
  updateUserProfileItem,
} from '../../../store/Actions/UserActions';
import {validURL,validURLS,dialCall} from '../../../utils/helper';
import apiClient from '../../../config/clients';
import ApiConfig from '../../../config/apiConfig';
import {Formik} from 'formik';
import * as yup from 'yup';
import * as Icons from '../../../assets/images/icons/icon';
import {ScrollView} from 'react-native-gesture-handler';
import BusinessComponent from './BusinessComponent';
import Geocoder from 'react-native-geocoding';

const yourModuleName = require('react-native-openanything');

Geocoder.init("AIzaSyAQBIpYoqg-PiWDQg2nGT8bcgeCNz0LUzs");

interface IPublicProfileDialog {
  selectedItem: any;
}

class TabItem extends React.Component<
  {
    item: IUserProfileItems;
    index: number;
    directStatus?: boolean;
    currentActiveLink?: string;
    onItemClick(item: IUserProfileItems): void;
    profileData: any;
  },
  any
> {
  constructor(props: any) {
    super(props);
  }
 

  render() {
    const {item, onItemClick, directStatus} = this.props;
    return (
      <View
        style={{
          flex: 0.5,
          paddingVertical: metrics.moderateScale(20),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => {
            onItemClick(item);
          }}>
          <View
            style={[
              {
                width: 70,
                height: 70,
                // backgroundColor: 'red',
                shadowColor: '#000',
                shadowOffset: {
                  width: Platform.OS === 'ios' ? 5 : 10,
                  height: Platform.OS === 'ios' ? 5 : 10,
                },
                shadowOpacity: 0.5,
                shadowRadius: 1,
                elevation: 5,
                borderRadius: 10,
                padding: 5,
                backgroundColor: '#fff',
              },
              this.props.profileData.isDirect &&
                this.props.profileData.activeDirect == item.id && {
                  borderWidth: 2,
                  borderColor: theme.colors.accent,
                },
            ]}>
            <Image
              source={Icons[item.image]}
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                width: '100%',
                height: '100%',
                borderRadius: 10,
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

class ProfileTabs extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      showItem: false,
      selectedItem: {},
      profileType: this.getProfile(this.props.type),
      ctsocialProfiles: this.props?.ctUserData?.socialProfiles ?? [],
      ctbusinessProfiles: this.props?.ctUserData?.businessProfiles ?? [],
    };
  }
  private renderItem = ({
    item,
    index,
  }: {
    item: IUserProfileItems;
    index: number;
  }) => {
    return (
      <TabItem
        item={item}
        index={index}
        directStatus={this.props.profileData.isDirect}
        currentActiveLink={this.props.profileData.activeDirect}
        onItemClick={this.onClickItem}
        profileData={this.props.profileData}
      />
    );
  };
  getData = () => {
    const {profileData, ctUserData} = this.props;
    let type = this.props.type;
    switch (type) {
      case ProfileTypes.SOCIAL:
        return ctUserData
          ? this.state.ctsocialProfiles
          : profileData.socialProfiles;
      case ProfileTypes.BUSINESS:
        return ctUserData
          ? this.state.ctbusinessProfiles
          : profileData.businessProfiles;
    }
  };
  onClickItem = (item: IUserProfileItems) => {
    if (this.props.ctUserData) {
      const postData = {
        appId: item.id,
        userId: this.props.ctUserData.id,
      };
      console.log(postData);
      console.log('ctUserData', this.props.ctUserData.id);

      apiClient
        .patch(ApiConfig.profilesCountOnScan + this.state.profileType, postData)
        .then((data: any) => {
          console.log('success***', data.data);
          this.setState({
            ctsocialProfiles: data.data.socialProfiles,
            ctbusinessProfiles: data.data.businessProfiles,
          });
        })
        .catch((error: any) => {
          console.log(error);
        });
    }

    this.setState({showItem: true, selectedItem: item});
  };
  hideDialog = () => {
    this.setState({showItem: false, selectedItem: {}});
  };
  getProfile = (type: string) => {
    switch (type) {
      case ProfileTypes.SOCIAL:
        return 'socialProfiles';
      case ProfileTypes.BUSINESS:
        return 'businessProfiles';
    }
  };

 removeLastWord = (str:any) => {
    const lastIndexOfSpace = str.lastIndexOf(' ');
  
    if (lastIndexOfSpace === -1) {
      return str;
    }
  
    return str.substring(0, lastIndexOfSpace);
  }
   //handle links that are not URL
  openhandler = (item: any) => {
    if(item.name=='Text'){
      yourModuleName.Text(item.uri);
  }
  else if (item.name=='Email') {
    yourModuleName.Email(item.uri);
  }
  else if (item.name=='Call'){
    dialCall(item.uri);
  }
  else if (item.name=='Address'){
    Geocoder.from(item.uri)
		.then(json => {
			var location = json.results[0].geometry.location;
      this.onDirectionButton(location.lat, location.lng, item.uri);
		})
		.catch(error => console.warn(error));
  }
  else {
   Linking.openURL(validURLS(item.uri,item.name));
    
  }
  }

  onDirectionButton(latitude: any, longitude: any, label: any) {
    const lat = latitude;
    const lng = longitude;
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${lat},${lng}`;
    const customLabel = label;
    const url = Platform.select({
      ios: `${scheme}${customLabel}@${latLng}`,
      android: `${scheme}${latLng}(${customLabel})`,
    });

    Linking.openURL(url);
  }

  handleDelete = () => {
    console.log(this.state, this.state.profileType, this.state.selectedItem.id);

    this.props.deleteProfileItem(
      this.state.profileType,
      this.state.selectedItem.id,
    );
    setTimeout(() => {
      this.hideDialog();
    });
  };
  handleUpdate = (data: any) => {
    this.setState(
      {
        selectedItem: {
          ...this.state.selectedItem,
          uri: data.currentTxt,
        },
      },
      () => {
        this.props.updateProfileItem(
          this.state.profileType,
          this.state.selectedItem,
        );
      },
    );
  };
  capitalizeFirstLetter = (string: String) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
  };

  PublicProfileSocialLinks = ({selectedItem}: IPublicProfileDialog) => (
    <View style={{flexDirection: 'column'}}>
      <Image
        source={Icons[selectedItem.image]}
        style={{
          width: 80,
          height: 80,
          borderRadius: 5,
          alignSelf: 'center',
        }}
      />

      <TouchableOpacity onPress={() => Linking.openURL(selectedItem.uri)}>
        <Text
          style={{textAlign: 'center', marginTop: metrics.verticalScale(30)}}>
          {selectedItem.uri}
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          alignSelf: 'center',
          marginTop: 20,
          justifyContent: 'center',
          marginBottom: 10,
        }}>
        <Button
          mode={'contained'}
          contentStyle={[styles.buttonContent]}
          style={[{width: '45%'}]}
          labelStyle={styles.buttonLabel}
          onPress={() => {
            this.openhandler(selectedItem);
            setTimeout(() => {
             this.hideDialog();
           }, 100);
           }}>
          Open
        </Button>
      </View>
    </View>
  );
  setCurentItemText = () => {};

  render() {
    const {profileData} = this.props;
    const {selectedItem, showItem} = this.state;

    return (
      <View style={{flex: 1}}>
        <FlatList
          data={this.getData()}
          extraData={this.getData()}
          numColumns={2}
          keyExtractor={(_, i) => String(i)}
          renderItem={this.renderItem}
          ListEmptyComponent={
            !this.props?.ctUserData?.id ? (
              <View
                style={{
                  // flex: 1,
                  flexDirection: 'row',
                  padding: metrics.moderateScale(20),
                }}>
                <View
                  style={{
                    flex: 0.5,
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                  }}>
                  <Card
                    style={{
                      borderRadius: 20,
                      backgroundColor: 'black',
                      flex: 1,
                      width: 90,
                      height: 90,
                    }}
                    onPress={() =>
                      this.props.navigation.navigate('AddLinks', {
                        type: this.props.type,
                      })
                    }>
                    <Card.Content
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <MaskedView
                        maskElement={
                          <Icon
                            name={'view-grid-plus-outline'}
                            color={theme.colors.surface}
                            size={metrics.moderateScale(50)}
                          />
                        }>
                        <LinearGradient
                          colors={[
                            theme.colors.accentDark,
                            theme.colors.accent,
                          ]}>
                          <Icon
                            name={'view-grid-plus-outline'}
                            color={'transparent'}
                            size={metrics.moderateScale(50)}
                          />
                        </LinearGradient>
                      </MaskedView>
                    </Card.Content>
                  </Card>
                </View>
              </View>
            ) : (
              <Text
                style={{
                  textAlign: 'center',
                  marginTop: metrics.moderateScale(30),
                }}>
                No Data Found
              </Text>
            )
          }
          ListHeaderComponent={
            this.props.type != ProfileTypes.SOCIAL ? (
              <BusinessComponent
                profileData={
                  this.props?.ctUserData?.id
                    ? this.props.ctUserData
                    : this.props.profileData
                }
                type={this.props?.ctUserData?.id ? 'ctUserData' : 'profileData'}
              />
            ) : null
          }
        />

        <Portal>
          <Dialog
            visible={showItem}
            onDismiss={this.hideDialog}
            style={{
              // position: 'absolute',
              maxWidth: metrics.moderateScale(400),
              // height: metrics.screenHeight * 0.6,
              width: metrics.screenWidth - metrics.moderateScale(30),
              alignSelf: 'center',
              borderRadius: 25,
            }}>
            <Dialog.Actions
              style={{
                paddingHorizontal: 0,
                position: 'absolute',
                right: 0,
              }}>
              <Button
                onPress={this.hideDialog}
                icon={() => <Icon name={'close-circle-outline'} size={40} />}>
                {''}
              </Button>
            </Dialog.Actions>
            <Dialog.Title
              style={{
                alignSelf: 'center',
                marginTop: metrics.verticalScale(10),
              }}>
              {this.capitalizeFirstLetter(selectedItem.name)}
            </Dialog.Title>
            <Dialog.Content>
              {this.props.publicProfile ? (
                <this.PublicProfileSocialLinks selectedItem={selectedItem} />
              ) : (
                <View
                  style={{
                    flexDirection: 'column',
                    marginVertical: metrics.verticalScale(30),
                  }}>
                  <Image
                    source={Icons[selectedItem.image]}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 5,
                      alignSelf: 'center',
                    }}
                  />
                  <Formik
                    initialValues={{
                      currentTxt: this.state.selectedItem.uri,
                    }}
                    onSubmit={values => this.handleUpdate(values)}
                    validationSchema={yup.object().shape({
                      currentTxt: yup.string().required(),
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
                      <>
                        <View style={styles.formContainer}>
                          <View style={styles.inputContainerStyle}>
                           { console.log("ss", selectedItem.image)}
                            <TextInput
                              autoCapitalize="none"
                              label="url"
                              mode={'outlined'}
                              value={values.currentTxt}
                              onChangeText={handleChange('currentTxt')}
                              onBlur={() => setFieldTouched('currentTxt')}
                              outlineColor={theme.colors.darkgray}
                              keyboardType={'default'}
                              left={
                                <TextInput.Icon
                                  name={({size}) => {
                                    return (
                                      <Image
                                      source={Icons[selectedItem.image]}
                                        style={{
                                          width: size,
                                          height: size,
                                          alignSelf: 'center',
                                        }}
                                      />
                                    );
                                  }}
                                />
                              }
                            />
                            {touched.currentTxt && errors.currentTxt && (
                              <Text style={styles.error}>
                                {errors.currentTxt}
                              </Text>
                            )}
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: '100%',
                            marginTop: 20,
                            justifyContent: 'space-between',
                            marginBottom: 10,
                          }}>
                          <Button
                            mode={'contained'}
                            contentStyle={[styles.buttonContent]}
                            style={[{width: '45%'}]}
                            labelStyle={styles.buttonLabel}
                            onPress={() => {
                             this.openhandler(selectedItem);
                             setTimeout(() => {
                              this.hideDialog();
                            }, 100);
                            }}>
                            Open
                          </Button>
                          <Button
                            mode={'contained'}
                            contentStyle={styles.buttonContent}
                            style={[{width: '45%'}]}
                            labelStyle={styles.buttonLabel}
                            onPress={this.handleDelete}>
                            delete
                          </Button>
                        </View>
                        <Button
                          mode={'contained'}
                          contentStyle={styles.buttonContent}
                          // style={[styles.button, {width: '80%'}]}
                          labelStyle={styles.buttonLabel}
                          color={theme.colors.textDark}
                          onPress={handleSubmit}>
                          Save
                        </Button>
                      </>
                    )}
                  </Formik>
                </View>
              )}
            </Dialog.Content>
          </Dialog>
        </Portal>
        {!this.props?.ctUserData?.id &&
          this.getData() &&
          this.getData().length > 0 &&
          !profileData.isDirect && (
            <FAB
              style={tabStyles.fab}
              small
              icon="plus"
              onPress={() =>
                this.props.navigation.navigate('AddLinks', {
                  type: this.props.type,
                })
              }
            />
          )}
      </View>
    );
  }
}
const mapStateToProps = (state: any, ownProps: any) => {
  return {
    profileData: state.UserReducer,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateProfileItem: (profileType: any, request: any) =>
    dispatch(updateUserProfileItem(profileType, request)),
  deleteProfileItem: (profileType: any, id: string) =>
    dispatch(deleteUserProfileItem(profileType, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileTabs);

const tabStyles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: metrics.moderateScale(16),
    right: 0,
    bottom: metrics.verticalScale(20),
  },
});
