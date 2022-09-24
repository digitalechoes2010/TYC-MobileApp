import React from 'react';
import {StyleSheet, View, TouchableOpacity, Share} from 'react-native';
import MaskedView from '@react-native-community/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../config/themeConfig';
import {useNavigation, DrawerActions, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {copyLink, makeLink} from '../utils/helper';
import GDText from './GreadientText';

const Header = ({notification = false, title}) => {
  const navigation = useNavigation();
  const route = useRoute();
  let svg: any = null;
  const userData = useSelector((state: any) => state.UserReducer);
  // useEffect(() => {
  //   // console.log('navigation', navigation);
  //   console.log(route.name);
  // }, []);
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerTitleContainer}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <MaskedView
            // style={{flex: 1, flexDirection: 'row'}}
            maskElement={<Icon name={'th-large'} size={50} color={'white'} />}>
            <LinearGradient
              colors={[theme.colors.accentDark, theme.colors.accent]}
              // style={{flex: 1}}
              start={{x: 0, y: 0.5}}
              end={{x: 0, y: 0}}>
              <Icon name={'th-large'} size={50} color={'transparent'} />
            </LinearGradient>
          </MaskedView>
        </TouchableOpacity>
      </View>
      {title && <GDText text={title} style={styles.barTopText} />}
      {(route.name == 'Home' || notification) && (
        <View>
          <TouchableOpacity
            onPress={() => {
              copyLink(makeLink(userData));
              Share.share({
                message: makeLink(userData),
              });
            }}
            // style={{marginRight: 10}}
          >
            <MaskedView
              // style={{flex: 1, flexDirection: 'row'}}
              maskElement={
                <Icon name={'paper-plane'} size={45} color={'white'} />
              }>
              <LinearGradient
                colors={[theme.colors.accentDark, theme.colors.accent]}
                // style={{flex: 1}}
                start={{x: 0, y: 0.9}}
                end={{x: 0, y: 0}}>
                <Icon name={'comment'} size={45} color={'transparent'} />
              </LinearGradient>
            </MaskedView>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingTop: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  barTopText: {
    fontWeight: '700',
    fontSize: 25,
    textTransform: 'uppercase',
  },
});
