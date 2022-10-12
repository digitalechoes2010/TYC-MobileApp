import React, {Component} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Platform, Linking} from 'react-native';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import ApiConfig from '../../../config/apiConfig';
import apiClient from '../../../config/clients';
import metrics from '../../../utils/metrics';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    width: 50,
    height: 50,
  },
  markerImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    backgroundColor: '#fff',
    padding: 2,
  },
  markerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 300,
  },
});
export default class Maps extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      contacts: [],
      markerDirections: false,
      markerLat: '',
      markerLong: '',
      markerLabel: '',
      markerId: '',
    };
  }

  componentDidMount() {
    apiClient
      .get(ApiConfig.getContactsbyUserId + '1')
      .then((data: any) => {
        console.log('contact data', data);
        const res = data.data;
        if (data.status === 200) {
          if (res?.contacts && res.contacts.length > 0) {
            console.log('ccccccccccccccccccccccccccccccccc', res.contacts);

            const mapData = res.contacts.map((e: any) => {
              return {
                userId: e.contactId,
                userName:
                  e.contactUserDetails?.name ?? e.contactUserDetails?.username,
                location: e.tapAddress,
                lat: e?.location.lat,
                lng: e?.location.long,
                profilePic: e.contactUserDetails?.profilePic,
              };
            });
            this.setState(
              {
                contacts: [...this.state.contacts, ...mapData],
              },
              () => {
                console.log('contacts', this.state.contacts);
              },
            );
          }
        } else if (data.status === 204) {
          this.setState({
            loadMore: false,
          });
          console.log('no more');
        }
      })
      .catch((error: any) => {
        console.log(error.response);
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
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

  render() {
    return (
      <View style={styles.container}>
        <MapView provider={PROVIDER_GOOGLE} style={styles.map} toolbarEnabled={false}>
          {this.state.contacts.map((c: any, index: any) => (
            <Marker
              key={index}
              coordinate={{
                latitude: c && c.lat,
                longitude: c && c.lng,
              }}
              style={styles.marker}
              onPress={() =>
                this.setState({markerDirections: true, markerLat: c.lat, markerLong: c.lng, markerLabel: c.userName, markerId: c.userId})
              }>
              <View style={styles.markerImageContainer}>
                <Image
                  source={{
                    uri: c.profilePic,
                  }}
                  style={styles.markerImage}
                  resizeMode="stretch"
                />
              </View>
              <Callout
                onPress={() =>
                  this.props.navigation.navigate('PublicProfile', {
                    userId: c.userId,
                  })
                }
              />
            </Marker>
          ))}
        </MapView>
        {this.state.markerDirections === true ? 
          <>
            <TouchableOpacity
              onPress={() => this.onDirectionButton(this.state.markerLat, this.state.markerLong, this.state.markerLabel)}
              style={{
                bottom: '5%',
                right: '5%',
                position: 'absolute',
                zIndex: 1,
                backgroundColor: 'white',
                padding: '2%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FontAwesome5
                name="directions"
                size={metrics.moderateScale(20)}
                color="#FB8C1A" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('PublicProfile', {
                userId: this.state.markerId,
              })}
              style={{
                bottom: '5%',
                right: '17.5%',
                position: 'absolute',
                zIndex: 1,
                backgroundColor: 'white',
                padding: '2%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <FontAwesome5
                  name="user-alt"
                  size={metrics.moderateScale(20)}
                  color="#FB8C1A" />
              </TouchableOpacity>
            </>
          : null
        }
      </View>
    );
  }
}
