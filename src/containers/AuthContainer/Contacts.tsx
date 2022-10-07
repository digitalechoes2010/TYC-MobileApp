/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  FlatList,
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform
} from 'react-native';
import {Avatar, Badge, Card, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Header from '../../components/Header';
import theme from '../../config/themeConfig';
import metrics from '../../utils/metrics';

import apiClient from '../../config/clients';
import ApiConfig from '../../config/apiConfig';
import Loader from '../../components/Loader';
import GDText from '../../components/GreadientText';

export interface datatype {
  userId: string;
  nfcId?: string;
  userName: string;
  tapCount: string;
  location: string;
  lat: string;
  lng: string;
  profilePic?: string;
}

class Contacts extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      contacts: [],
      isLoading: true,
      currentPage: null,
      page: 1,
      size: 20,
      total: 0,
    };
    let _unsubscribe: any = null;
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  componentDidMount = () => {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      // do something
      this.getData();
    });
  };

  getData = () => {
    let page = this.state.page;

    apiClient
      .get(ApiConfig.getContactsbyUserId + page)
      .then((data: any) => {
        console.log('contact data', data);
        const res = data.data;
        if (data.status === 200) {
          const mapData = res.contacts.map((e: any) => {
            return {
              userId: e.contactId,
              userName:
                e.contactUserDetails?.name ?? e.contactUserDetails?.username,
              location: e.contactUserDetails.address,
              lat: e?.location.lat,
              lng: e?.location.long,
              profilePic: e.contactUserDetails?.profilePic,
            };
          });
          this.setState(
            {
              total: res.total && res.total,
              page: parseInt(res.page),
              size: res.size && res.size,
              contacts: [...this.state.contacts, ...mapData],
            },
            () => {
              console.log('contacts', this.state.contacts);
              console.log(this.state.isLoading);
            },
          );
        }
      })
      .catch((error: any) => {
        console.log(error.response);
        this.setState({
          isLoading: false,
        });
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  removeFirstWord = (string: any) => {
    const indexOfSpace = string.indexOf(' ');

    if (indexOfSpace === -1) {
      return '';
    }

    return string.substring(indexOfSpace + 1);
  };

  openMap = async (street: any, city: any, zipCode: any) => {
    const destination = encodeURIComponent(`${street} ${zipCode}, ${city}`);
    const provider = Platform.OS === 'ios' ? 'apple' : 'google';
    const link = `http://maps.${provider}.com/?daddr=${destination}`;
    try {
      const supported = await Linking.canOpenURL(link);
      if (supported) Linking.openURL(link);
    } catch (error) {
      console.log(error);
    }
  };

  renderItemComponent = (item: datatype) => (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        this.props.navigation.navigate('PublicProfile', {userId: item.userId})
      }>
      <Card style={styles.card}>
        <Card.Content style={styles.content}>
          <Avatar.Image
            source={{
              uri: item.profilePic ?? 'https://i.pravatar.cc/300',
            }}
          />
          <View style={styles.dataList}>
            <Text style={{fontWeight: 'bold'}}>{item.userName}</Text>
            <Text lineBreakMode={'tail'} style={{marginTop: 5}}>
              <Text style={{fontWeight: 'bold'}}>location:</Text>{' '}
              {item.location}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.openMap(
                item.location.split(',')[0],
                this.removeFirstWord(item.location.split(',')[1]),
                item.location.split(',')[2].split(' ').pop(),
              );
            }}>
            <Avatar.Icon
              icon={'google-maps'}
              size={metrics.moderateScale(65)}
              // color="red"
            />
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  render() {
    if (this.state.isLoading) {
      return <Loader />;
    }
    return (
      <View>
        <Header title="Your TYC Network" />

        {this.state.contacts.length == 0 ? (
          <View
            style={{
              height: 200,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#000'}}>No data found</Text>
          </View>
        ) : (
          <FlatList
            data={this.state.contacts}
            keyExtractor={(_, i) => String(i)}
            renderItem={({item}: {item: datatype}) => {
              return this.renderItemComponent(item);
            }}
            ListFooterComponent={() => {
              return (
                <View style={{paddingBottom: metrics.moderateScale(110)}} />
              );
            }}
            onEndReachedThreshold={1}
            onEndReached={() =>
              this.setState(
                (prev: any) => ({page: prev.page + 1}),
                this.getData,
              )
            }
          />
        )}
      </View>
    );
  }
}

export default Contacts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: metrics.scale(15),
  },
  card: {
    borderRadius: 25,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatar: {},
  dataList: {
    width: '50%',
  },
  icon: {},
  tapBadge: {
    padding: metrics.scale(10),
    width: metrics.moderateScale(50),
    height: metrics.verticalScale(50),
    borderRadius: 25,
    backgroundColor: theme.colors.accentDark,
    fontWeight: 'bold',
  },
  barTopText: {
    fontWeight: '700',
    fontSize: 30,
    textTransform: 'uppercase',
  },
});
