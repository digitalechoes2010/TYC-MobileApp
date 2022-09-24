import React from 'react';
import {ToastAndroid, Alert, Platform, Linking} from 'react-native';
import Clipboard from '@react-native-community/clipboard';

import Icon from 'react-native-vector-icons/Ionicons';
import FIcon from 'react-native-vector-icons/FontAwesome5';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import metrics from './metrics';

export const copyLink = (text: string) => {
  Clipboard.setString(text);
  showTost('Link Copied');
};

export const showTost = (text: string) => {
  if (Platform.OS === 'android') {
    ToastAndroid.showWithGravity(text, ToastAndroid.SHORT, ToastAndroid.CENTER);
  } else {
    Alert.alert(text);
  }
};

export const dialCall = (str: any) => {
     let phoneNumber = '';
     if (Platform.OS === 'android') { phoneNumber = `tel:${str}`; }
     else {phoneNumber = `telprompt:${str}`; }
     Linking.openURL(phoneNumber);
  };

export const validURLS = (str: any,title: any) => {
  if (title == 'Instagram'){
    return `https://instagram.com/${str}`
  }
  else if (title == 'Snapchat'){
    return `https://www.snapchat.com/add/${str}`
  }
  else if (title == 'Twitter'){
    return `https://twitter.com/${str}`
  }
  else if (title == 'Tiktok'){
    return `https://www.tiktok.com/@${str}`
  }
  else if (title == 'Twitch'){
    return `https://www.twitch.tv/${str}`
  }
  else if (title == 'Whatsapp'){
    return `https://wa.me/${str}`
  } 
  else if (title == 'Cash App'){
    return `https://cash.app/${str}`
  }
  else if (title == 'Venmo'){
    return `https://venmo.com//${str}`
  }
  else if (title == 'Onlyfans' || title == 'Calendly'  || title == 'Facebook' || title == 'Yelp' || title == 'Linktree' || title == 'Custom Link' || title == 'Address' || title == 'Pinterest' || title == 'Youtube' || title == 'Linkedin' || title=='Spotify' || title=='Apple Music' || title =='Sound Cloud' || title=='Paypal'){
     if (str.indexOf('http://') == 0 || str.indexOf('https://') == 0) {
      return str;
    } 
    else {
    return `https://${str}`;
    }
  }
}
export const validURL = (str: any) => {
  if (str.indexOf('http://') == 0 || str.indexOf('https://') == 0) {
    return str;
  } else {
    return `https://${str}`;
  }
};

export const makeLink = (userData: any) => {
  let link = 'https://tapyourchip.com/p/';
  if (userData && userData.link && userData.link.length > 0) {
    link = link + userData.link;
  } else {
    link = link + userData.id;
  }
  return link;
};

export const getMediaType = (mediaType: string) => {
  const typeCheck: any = mediaType.split('/');
  const type: any = {
    image: {
      type: 'image',
      icon: () => (
        <Icon name={'image-outline'} size={metrics.moderateScale(70)} />
      ),
    },
    video: {
      type: 'video',
      icon: () => (
        <Icon name={'videocam-outline'} size={metrics.moderateScale(70)} />
      ),
    },
    audio: {
      type: 'audio',
      icon: () => (
        <FIcon name={'file-audio'} size={metrics.moderateScale(70)} />
      ),
    },
    zip: {
      type: 'zip',
      icon: () => (
        <FAIcon name={'file-zip-o'} size={metrics.moderateScale(70)} />
      ),
    },
    doc: {
      type: 'doc',
      icon: () => (
        <Icon name={'document-text-outline'} size={metrics.moderateScale(70)} />
      ),
    },
  };
  return type[typeCheck[0]] ? type[typeCheck[0]] : type.doc;
};
