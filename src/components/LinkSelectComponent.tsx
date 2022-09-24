import React from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Dialog, Portal, Text, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import styles from '../containers/AuthContainer/SignIn/LoginStyle';
import {updateUserProfile} from '../store/Actions/UserActions';
import * as Icons from '../assets/images/icons/icon';
import {Formik} from 'formik';
import * as yup from 'yup';

export type Item = {image: string; name: string; icon: string};
export const Links: any = {
  'Social Media': [
    {image: 'Instagram', name: 'Instagram', icon: 'instagram-square'},
    {image: 'Snapchat', name: 'Snapchat', icon: 'snapchat-square'},
    {image: 'Facebook', name: 'Facebook', icon: 'facebook-square'},
    {image: 'Twitter', name: 'Twitter', icon: 'twitter-square'},
    {image: 'Linkedin', name: 'Linkedin', icon: 'linkedin'},
    {image: 'Youtube', name: 'Youtube', icon: 'youtube-square'},
    {image: 'Twitch', name: 'Twitch', icon: 'twitch'},
    {image: 'Pinterest', name: 'Pinterest', icon: 'pinterest-square'},
    {image: 'Tictok', name: 'Tiktok', icon: 'tictok-square'},
    {image: 'Onlyfans', name: 'Onlyfans', icon: 'onlyfans-square'},
  ],
  Contact: [
    {image: 'Email', name: 'Email', icon: 'mail-bulk'},
    {image: 'Whatsapp', name: 'Whatsapp', icon: 'whatsapp'},
    {image: 'Text', name: 'Text', icon: 'envelope-open-text'},
    {image: 'Pin', name: 'Address', icon: 'pin'},
    {image: 'Call', name: 'Call', icon: 'contact'},
  ],
  Music: [
    {image: 'Spotify', name: 'Spotify', icon: 'spotify'},
    {image: 'Itunes', name: 'Apple Music', icon: 'apple'},
    {image: 'Soundcloud', name: 'Sound Cloud', icon: 'Sound cloud'},
  ],
  Payments: [
    {image: 'Paypal', name: 'Paypal', icon: 'cc-paypal'},
    {image: 'Venmo', name: 'Venmo', icon: 'vimeo-square'},
    {image: 'Cashapp', name: 'Cash App', icon: 'cashapp'},
  ],
  More: [
    {image: 'Yelp', name: 'Yelp', icon: 'yelp'},
    {image: 'Calendly', name: 'Calendly', icon: 'calendar-plus'},
    {image: 'Linktree', name: 'Linktree', icon: 'tree'},
    {image: 'CustomLink', name: 'Custom Link', icon: 'envelope-open-text'},
  ],
};

class LinkSelectComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      dialogShow: false,
      selectedLinks:
        this.props.route.params.type === 'SOCIAL'
          ? this.props.userData.socialProfiles
          : this.props.userData?.businessProfiles ?? [],
      currentSocial: '',
      currentLink: '',
      type: this.props.route.params.type,
      isChanged: false,
      labels: '',
      erroroflink: '',
      outline: 'green',
      title: 'Link',
      keyboard: 'default',
      country: '',
      show: 'false',
    };
  }
  // labelhandling = () => {
  //   console.log(this.state.currentSocial.name);
  //   if (this.state.currentSocial.name == 'Text'){
  //     this.setState({labels:'76355255',});
  //   }
  //     else {
  //       this.setState({labels:'https',});
  //     }
  // };
  openAlert = (strg: any) => {
    alert(strg);
  };
  //validation for link adding, you will find all add link regexes here
  validateEmail(value: string) {
    if (!value) {
      this.setState({erroroflink: 'Required', outline: 'red'});
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) &&
      this.state.currentSocial.name == 'Email'
    ) {
      this.setState({
        erroroflink: 'Invalid email address, please enter in correct format.',
        outline: 'red',
      });
    } else if (
      !/^[\w](?!.*?\.{2})[\w.]{1,28}[\w]$/i.test(value) &&
      this.state.currentSocial.name == 'Instagram'
    ) {
      this.setState({
        erroroflink:
          'Invalid Instagram Username, please enter in correct format.',
        outline: 'red',
      });
    } else if (
      !/^[\w](?!.*?\.{2})[\w.]{1,13}[\w]$/i.test(value) &&
      this.state.currentSocial.name == 'Snapchat'
    ) {
      this.setState({
        erroroflink:
          'Invalid Snapchat Username, please enter in correct format.',
        outline: 'red',
      });
    } else if (
      !/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{2,24}$/i.test(value) &&
      this.state.currentSocial.name == 'Tiktok'
    ) {
      this.setState({
        erroroflink: 'Invalid Tiktok Username, please enter in correct format.',
        outline: 'red',
      });
    } else if (
      !/^[a-zA-Z0-9_]{4,15}$/i.test(value) &&
      this.state.currentSocial.name == 'Twitter'
    ) {
      this.setState({
        erroroflink:
          'Invalid Twitter Username, please enter in correct format.',
        outline: 'red',
      });
    } else if (
      !/^((http(s)?:\/\/([w]{3}\.)?linkedin\.com\/)(pub|in|profile)\/([a-zA-Z0-9-]{5,30})\/?)$/i.test(
        value,
      ) &&
      this.state.currentSocial.name == 'Linkedin'
    ) {
      this.setState({
        erroroflink: 'Invalid Linkedin Link, please enter in correct format.',
        outline: 'red',
      });
    } else if (
      !/^(?:(?:http|https):\/\/)?(?:www.|m.)?facebook.com\/(?!home.php)(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\.-]+)$/i.test(
        value,
      ) &&
      this.state.currentSocial.name == 'Facebook'
    ) {
      this.setState({
        erroroflink: 'Invalid Facebook Link, please enter in correct format.',
        outline: 'red',
      });
    } else if (
      !/^^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$$/i.test(
        value,
      ) &&
      this.state.currentSocial.name == 'Youtube'
    ) {
      this.setState({
        erroroflink: 'Invalid Youtube Link, please enter in correct format.',
        outline: 'red',
      });
    } else if (
      !/^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/i.test(
        value,
      ) &&
      this.state.currentSocial.name == 'Pinterest'
    ) {
      this.setState({
        erroroflink: 'Invalid Pinterest Link, please enter in correct format.',
        outline: 'red',
      });
    } else if (
      !/^(#)?[a-zA-Z0-9][\w]{2,24}$/i.test(value) &&
      this.state.currentSocial.name == 'Twitch'
    ) {
      this.setState({
        erroroflink: 'Invalid Twitch username, please enter in correct format.',
        outline: 'red',
      });
    } else if (
      !/^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/i.test(
        value,
      ) &&
      this.state.currentSocial.name == 'Onlyfans'
    ) {
      this.setState({
        erroroflink: 'Invalid Onlyfans Link, please enter in correct format.',
        outline: 'red',
      });
    } else if (
      !/^[0-9]{4,24}$/i.test(value) &&
      this.state.currentSocial.name == 'Whatsapp'
    ) {
      this.setState({erroroflink: 'Invalid number ', outline: 'red'});
    } else if (
      !/^[0-9]{4,24}$/i.test(value) &&
      this.state.currentSocial.name == 'Text'
    ) {
      this.setState({erroroflink: 'Invalid number ', outline: 'red'});
    } else if (
      !/^[0-9]{4,24}$/i.test(value) &&
      this.state.currentSocial.name == 'Call'
    ) {
      this.setState({erroroflink: 'Invalid number ', outline: 'red'});
    } else if (
      !/^[0-9]{4,24}$/i.test(value) &&
      this.state.currentSocial.name == 'Contact Card'
    ) {
      this.setState({erroroflink: 'Invalid number ', outline: 'red'});

    } else if (
      !/^[a-zA-Z0-9\s]+\,\s[a-zA-Z0-9\s]+\,\s[a-zA-Z0-9\s]*$/i.test(
        value,
      ) && 
      this.state.currentSocial.name == 'Address'
     
    ) {
      this.setState({erroroflink: 'Invalid address', outline: 'red'});
    } else if (
      !/^(https:\/\/open.spotify.com(.*))$/i.test(
        value,
      ) &&
      this.state.currentSocial.name == 'Spotify'
    ) {
      this.setState({
        erroroflink: 'Invalid Spotify Link, please enter in correct format.',
        outline: 'red',
      });
    } else if (
      !/^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/i.test(
        value,
      ) &&
      this.state.currentSocial.name == 'Apple Music'
    ) {
      this.setState({
        erroroflink:
          'Invalid Apple Music Link, please enter in correct format.',
        outline: 'red',
      });
    } else if (
      !/^https?:\/\/(soundcloud\.com|snd\.sc)\/(.*)$/i.test(
        value,
      ) &&
      this.state.currentSocial.name == 'Sound Cloud'
    ) {
      this.setState({
        erroroflink: 'Invalid SoundCloud Link, please enter in correct format.',
        outline: 'red',
      });
    } else if (
      !/^paypal\.me\/.+$/i.test(value) &&
      this.state.currentSocial.name == 'Paypal'
    ) {
      this.setState({
        erroroflink: 'Invalid paypal link, please enter in correct format.',
        outline: 'red',
      });
    } else if (
      !/^[a-zA-Z0-9_-]{5,16}$/i.test(value) &&
      this.state.currentSocial.name == 'Venmo'
    ) {
      this.setState({
        erroroflink: 'Invalid Venmo Username, please enter in correct format.',
        outline: 'red',
      });
    } else if (
      !/^(?:\s*[#$][_a-z\d-]+)+$$/i.test(value) &&
      this.state.currentSocial.name == 'Cash App'
    ) {
      this.setState({
        erroroflink: 'Invalid Cashtag, please enter in correct format. ',
        outline: 'red',
      });
    } else if (
      !/^https?:\/\/([w]{3}\.)?(linktr.ee)\/(.*)$/i.test(
        value,
      ) &&
      this.state.currentSocial.name == 'Linktree'
    ) {
      this.setState({
        erroroflink: 'Invalid Linktree Link, please enter in correct format.',
        outline: 'red',
      });
    } else if (
      !/^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/i.test(
        value,
      ) &&
      this.state.currentSocial.name == 'Calendly'
    ) {
      this.setState({
        erroroflink: 'Invalid Calendly Link, please enter in correct format.',
        outline: 'red',
      });
    } else if (
      !/^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/i.test(
        value,
      ) &&
      this.state.currentSocial.name == 'Yelp'
    ) {
      this.setState({
        erroroflink: 'Invalid Yelp Link, please enter in correct format.',
        outline: 'red',
      });
    } else if (
      !/^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/i.test(
        value,
      ) &&
      this.state.currentSocial.name == 'Custom Link'
    ) {
      this.setState({
        erroroflink: 'Invalid link, please enter in correct format.',
        outline: 'red',
      });
    } else {
      this.setState({erroroflink: '', outline: 'green'});
    }
  }

  // (https://cash.app/$yourcashtag)
  // https://wa.me/1XXXXXXXXXX
  addUpdateLinks = () => {
    this.props.setProfile(
      this.props.route.params.type,
      this.state.selectedLinks,
    );
    this._unsubscribe();
    this.props.navigation.goBack();
  };

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener(
      'beforeRemove',
      (e: any) => {
        if (!this.state.isChanged) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert(
          'Discard changes?',
          'You have unsaved changes. Are you sure to discard them and leave the screen?',
          [
            {
              text: 'Save Changes',
              style: 'cancel',
              onPress: () => this.addUpdateLinks(),
            },
            {
              text: 'Discard',
              style: 'destructive',
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => this.props.navigation.dispatch(e.data.action),
            },
          ],
        );
      },
    );
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  showDialog = (item: any) => {
    let exist = this.state.selectedLinks.find(
      (i: {name: any}) => i.name === item.name,
    );
    console.log('exist', item);
    // error handling based on link type
    if (
      item.name == 'Instagram' ||
      item.name == 'Snapchat' ||
      item.name == 'Twitter' ||
      item.name == 'Tiktok' ||
      item.name == 'Twitch'
    ) {
      this.setState({
        labels: 'Enter username',
        title: 'username',
        keyboard: 'default',
      });
    } else if (
      item.name == 'Onlyfans' ||
      item.name == 'Calendly' ||
      item.name == 'yelp' ||
      item.name == 'Linktree' ||
      item.name == 'Custom Link' ||
      item.name == 'Pinterest'
    ) {
      this.setState({
        labels: 'www.**** or https://****',
        title: 'link',
        keyboard: 'url',
      });
    } else if (
      item.name == 'Address'
    ) {
      this.setState({
        labels: 'Street, City, State ZipCode',
        title: 'address',
        keyboard: 'url',
      });
    }else if (item.name == 'Facebook') {
      this.setState({
        labels: 'https://www.facebook.com/profile.php?...',
        title: 'link',
        keyboard: 'url',
      });
    } else if (item.name == 'Youtube') {
      this.setState({
        labels: 'youtube.com/xxxx',
        title: 'link',
        keyboard: 'url',
      });
    } else if (item.name == 'Linkedin') {
      this.setState({
        labels: 'Any linkedin link',
        title: 'link',
        keyboard: 'url',
      });
    } else if (item.name == 'Email') {
      this.setState({
        labels: 'Enter email address',
        title: 'email',
        keyboard: 'email-address',
      });
    } else if (item.name == 'Whatsapp') {
      this.setState({
        labels: '(country code)+(number)',
        title: 'country code + number',
        keyboard: 'phone-pad',
      });
    } else if (
      item.name == 'Call' ||
      item.name == 'Contact Card' ||
      item.name == 'Text'
    ) {
      this.setState({
        labels: 'phone number',
        title: 'phone number',
        keyboard: 'phone-pad',
      });
    } else if (item.name == 'Spotify') {
      this.setState({
        labels: 'Any Spotify link',
        title: 'link',
        keyboard: 'url',
      });
    } else if (item.name == 'Apple Music') {
      this.setState({
        labels: 'Any Apple music link',
        title: 'link',
        keyboard: 'url',
      });
    } else if (item.name == 'Sound Cloud') {
      this.setState({
        labels: 'https://soundcloud.app.goo.gl/...',
        title: 'link',
        keyboard: 'url',
      });
    } else if (item.name == 'Paypal') {
      this.setState({
        labels: 'paypal.me/XXXXXXXXXX',
        title: 'paypal.me link',
        keyboard: 'url',
      });
    } else if (item.name == 'Venmo') {
      this.setState({
        labels: 'Enter username',
        title: 'Venmo username',
        keyboard: 'default',
      });
    } else if (item.name == 'Cash App') {
      this.setState({
        labels: '$yourcashtag',
        title: '$Cashtag',
        keyboard: 'default',
      });
    } else {
      this.setState({labels: '', title: 'link'});
    }
    this.setState({
      dialogShow: true,
      currentSocial: item,
      currentLink: exist ? exist.uri : '',
    });
  };
  //this hide discards all changes
  hideDialog = () => {
    this.setState({
      dialogShow: false,
      currentSocial: '',
      currentLink: '',
      isChanged: false,
    });
  };
  //this hide saves the changes after hidding popup
  hideDialogfordone = () => {
    if (this.state.erroroflink == '') {
      this.setState({dialogShow: false, currentSocial: '', currentLink: ''});
    } else {
      this.openAlert(this.state.erroroflink);
    }
  };
  makeSelectedLinks = () => {
    const {currentSocial, currentLink, selectedLinks} = this.state;
    let found = false;
    let links = selectedLinks.map((i: any) => {
      if (i.name === currentSocial.name) {
        i.uri = currentLink;
        found = true;
      }
      return i;
    });
    return found
      ? links
      : [
          ...this.state.selectedLinks,
          {...this.state.currentSocial, uri: currentLink},
        ];
  };
  saveDialogValue = (data: any) => {
    // console.log('data', data);

    this.setState(
      {
        // dialogShow: false,
        // currentLink: data.currentLink,
        currentLink: data,
        isChanged: true,
      },
      () => {
        this.setState({
          selectedLinks: this.makeSelectedLinks(),
          // currentLink: '',
          // currentSocial: '',
        });
      },
    );
  };
  renderItemComponent = (item: Item) => (
    <View style={{...linkSelectStyle.container, backgroundColor: 'white'}}>
      {/* {item.icon ? (
        <SIcon
          name={`${item.icon}`}
          size={40}
          color={theme.colors[`${item.name}`]}
          style={linkSelectStyle.image}
        />
      ) : ( */}
      <Image
        source={Icons[item.image]}
        style={[
          linkSelectStyle.image,
          {backgroundColor: 'white', width: 40, height: 40},
        ]}
      />
      {/* )} */}

      <Text style={linkSelectStyle.itemName}>{item.name}</Text>
      <TouchableOpacity
        style={linkSelectStyle.action}
        onPress={() => this.showDialog(item)}>
        <Icon
          name={
            this.state.selectedLinks.some((i: any) => {
              return i.name === item.name;
            })
              ? 'eye'
              : 'eye-off'
          }
          color={
            this.state.selectedLinks.some((i: any) => {
              return i.name === item.name;
            })
              ? 'green'
              : 'grey'
          }
          size={30}
        />
      </TouchableOpacity>
    </View>
  );

  ItemSeprator = () => (
    <View
      style={{
        height: 2,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}
    />
  );

  render() {
    const {dialogShow} = this.state;
    const {userData, route, setProfile} = this.props;
    const {title, type} = this.props.route.params;
    console.log(this.props);
    return (
      <>
        <FlatList
          data={Links[title]}
          extraData={this.state.selectedLinks}
          keyExtractor={(_, i) => String(i)}
          renderItem={({item}: {item: Item}) => this.renderItemComponent(item)}
          ItemSeparatorComponent={this.ItemSeprator}
        />
        <Button
          mode={'contained'}
          onPress={() => this.addUpdateLinks()}
          disabled={userData.isLoading}
          labelStyle={styles.buttonLabel}
          style={{...styles.button, marginVertical: 15, marginBottom: 50}}
          contentStyle={[
            styles.buttonContent,
            {paddingHorizontal: 0, paddingVertical: 0},
          ]}
          loading={userData.isLoading}>
          Save Changes
        </Button>
        <Portal>
          <Dialog
            visible={dialogShow}
            onDismiss={this.hideDialog}
            style={{borderRadius: 30, borderWidth: 1}}>
            <Dialog.Title>Enter the {this.state.title} </Dialog.Title>
            <Formik
              initialValues={{
                currentLink: this.state.currentLink,
              }}
              // onSubmit={values => this.saveDialogValue(values)}
              onSubmit={values => {}}
              validationSchema={yup.object().shape({
                currentLink: yup.string().required('Please enter the link'),
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
                  <Dialog.Content>
                    <TextInput
                      label={this.state.labels}
                      mode="outlined"
                      style={{backgroundColor: 'white'}}
                      outlineColor={this.state.outline}
                      value={this.state.currentLink}
                      keyboardType={this.state.keyboard}
                      onChangeText={currentLink => {
                        this.saveDialogValue(currentLink);
                        this.validateEmail(currentLink);
                        // this.setState({currentLink});
                      }}
                      // onChange={(e: any) =>
                      //   !this.state.isChanged &&
                      //   this.setState({isChanged: true})
                      // }
                      onBlur={() => setFieldTouched('currentLink')}
                    />

                    {touched.currentLink && errors.currentLink && (
                      <Text style={styles.error}>{this.state.erroroflink}</Text>
                    )}
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button
                      onPress={this.hideDialog}
                      color={'red'}
                      labelStyle={{fontWeight: 'bold'}}>
                      Cancel
                    </Button>
                    <Button
                      onPress={this.hideDialogfordone}
                      // onPress={handleSubmit}
                      color={'green'}
                      labelStyle={{fontWeight: 'bold'}}>
                      Done
                    </Button>
                  </Dialog.Actions>
                </>
              )}
            </Formik>
          </Dialog>
        </Portal>
      </>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    userData: state.UserReducer,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => ({
  setProfile: (profileType: any, request: any) => {
    console.log('userprofile', request);

    dispatch(updateUserProfile(profileType, request));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LinkSelectComponent);
const linkSelectStyle = StyleSheet.create({
  container: {flex: 3, flexDirection: 'row', alignItems: 'center'},
  image: {
    margin: 10,
    padding: 5,
  },
  itemName: {
    flex: 1.8,
    fontSize: 16,
    paddingHorizontal: 40,
    color: '#8232A4',
    fontWeight: 'bold',
  },
  action: {
    flex: 0.5,
  },
  mainWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
