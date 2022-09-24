import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {Card, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../config/themeConfig';
import {ScrollView} from 'react-native-gesture-handler';

export default class AddLinksComponent extends React.Component<any, any> {
  render() {
    return (
      <View style={addLinkStyles.addLinkContainer}>
        <ScrollView>
          <View style={addLinkStyles.linkTypeRow}>
            <View style={addLinkStyles.linkTypeColumn}>
              <Card
                style={addLinkStyles.columnCard}
                onPress={() =>
                  this.props.navigation.navigate('LinkSelect', {
                    title: 'Social Media',
                    type: this.props.route.params.type,
                  })
                }>
                <Card.Content
                  style={[
                    addLinkStyles.cardContainer,
                    {backgroundColor: theme.colors.fbBackground},
                  ]}>
                  <View style={addLinkStyles.iconLinkRow}>
                    <Icon
                      name={'facebook-f'}
                      size={20}
                      style={addLinkStyles.icon}
                    />
                    <Icon
                      name={'twitter'}
                      size={20}
                      style={addLinkStyles.icon}
                    />
                  </View>
                  <View style={addLinkStyles.iconLinkRow}>
                    <Icon
                      name={'instagram'}
                      size={20}
                      style={addLinkStyles.icon}
                    />
                    <Icon
                      name={'snapchat-ghost'}
                      size={20}
                      style={addLinkStyles.icon}
                    />
                  </View>
                </Card.Content>
              </Card>

              <View style={addLinkStyles.titleContainer}>
                <Text style={addLinkStyles.title}>SOCIAL MEDIA</Text>
              </View>
            </View>
            <View style={addLinkStyles.linkTypeColumn}>
              <Card
                style={addLinkStyles.columnCard}
                onPress={() =>
                  this.props.navigation.navigate('LinkSelect', {
                    title: 'Contact',
                    type: this.props.route.params.type,
                  })
                }>
                <Card.Content
                  style={[
                    addLinkStyles.cardContainer,
                    {backgroundColor: theme.colors.contactBackground},
                  ]}>
                  <MIcon
                    name={'contact-phone'}
                    size={60}
                    style={addLinkStyles.iconSingle}
                  />
                </Card.Content>
              </Card>
              <View style={addLinkStyles.titleContainer}>
                <Text style={addLinkStyles.title}>CONTACT</Text>
              </View>
            </View>
          </View>
          <View style={addLinkStyles.linkTypeRow}>
            <View style={addLinkStyles.linkTypeColumn}>
              <Card
                style={addLinkStyles.columnCard}
                onPress={() =>
                  this.props.navigation.navigate('LinkSelect', {
                    title: 'Music',
                    type: this.props.route.params.type,
                  })
                }>
                <Card.Content
                  style={[
                    addLinkStyles.cardContainer,
                    {backgroundColor: theme.colors.musicBackground},
                  ]}>
                  <MCIcon
                    name={'music-box-multiple-outline'}
                    size={60}
                    style={[addLinkStyles.iconSingle]}
                  />
                </Card.Content>
              </Card>
              <View style={addLinkStyles.titleContainer}>
                <Text style={addLinkStyles.title}>MUSIC</Text>
              </View>
            </View>
            <View style={addLinkStyles.linkTypeColumn}>
              <Card
                style={addLinkStyles.columnCard}
                onPress={() =>
                  this.props.navigation.navigate('LinkSelect', {
                    title: 'Payments',
                    type: this.props.route.params.type,
                  })
                }>
                <Card.Content
                  style={[
                    addLinkStyles.cardContainer,
                    {backgroundColor: theme.colors.paymentBackground},
                  ]}>
                  <MCIcon
                    name={'currency-usd-circle-outline'}
                    size={60}
                    style={addLinkStyles.iconSingle}
                  />
                </Card.Content>
              </Card>
              <View style={addLinkStyles.titleContainer}>
                <Text style={addLinkStyles.title}>PAYMENTS</Text>
              </View>
            </View>
          </View>
          <View style={addLinkStyles.linkTypeRow}>
            <View style={addLinkStyles.linkTypeColumn}>
              <Card
                style={addLinkStyles.columnCard}
                onPress={() =>
                  this.props.navigation.navigate('LinkSelect', {
                    title: 'More',
                    type: this.props.route.params.type,
                  })
                }>
                <Card.Content
                  style={[
                    addLinkStyles.cardContainer,
                    {backgroundColor: theme.colors.secondary},
                  ]}>
                  <MCIcon
                    name={'link-variant'}
                    size={60}
                    style={addLinkStyles.iconSingle}
                  />
                </Card.Content>
              </Card>
              <View style={addLinkStyles.titleContainer}>
                <Text style={addLinkStyles.title}>MORE</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const addLinkStyles = StyleSheet.create({
  addLinkContainer: {
    flex: 1,
    // paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkTypeRow: {
    flexDirection: 'row',
  },
  linkTypeColumn: {
    padding: 20,
  },
  columnCard: {borderRadius: 25, width: 130, height: 130,padding: 8},
  cardContainer: {
    flex: 1,
    borderRadius: 25,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    // paddingHorizontal: 20,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iconLinkRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSingle: {color: 'white'},
  icon: {flex: 1, textAlign: 'center', color: 'white', fontSize: 30},
});
