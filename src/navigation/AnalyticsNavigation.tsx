import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AnalyticsBusiness from '../containers/Dashboard/Analytics/AnalyticsBusiness';
import AnalyticsSocial from '../containers/Dashboard/Analytics/AnalyticsSocial';
import MapsStackNavigation from './MapsNavigation';

const Tab = createMaterialTopTabNavigator();

const AnalyticsNavigation = ({navigation}: any) => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Analytics</Text>
      </View>
      <Tab.Navigator>
        <Tab.Screen
          name="social"
          component={AnalyticsSocial}
          options={{
            tabBarIndicatorStyle: {
              borderColor: 'orange',
              borderWidth: 2,
            },
            tabBarLabelStyle: {fontWeight: 'bold'},
          }}
        />
        <Tab.Screen
          name="business"
          component={AnalyticsBusiness}
          options={{
            tabBarIndicatorStyle: {
              borderColor: 'orange',
              borderWidth: 2,
            },
            tabBarLabelStyle: {fontWeight: 'bold'},
          }}
        />
        <Tab.Screen
          name="Maps"
          component={MapsStackNavigation}
          options={{
            tabBarIndicatorStyle: {
              borderColor: 'orange',
              borderWidth: 2,
            },
            tabBarLabelStyle: {fontWeight: 'bold'},
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  headerText: {
    justifyContent: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
  headerIcon: {
    position: 'absolute',
    left: 15,
    color: 'black',
  },
});

export default AnalyticsNavigation;
