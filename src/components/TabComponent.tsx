import React, {ReactNode} from 'react';
import {SceneRendererProps} from 'react-native-tab-view';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ProfileTabs from '../containers/Dashboard/Profile/ProfileTabs';
import {useNavigation} from '@react-navigation/core';
import {ProfileTypes} from '../store/Models/Api/User';
import metrics from '../utils/metrics';

const Tab = createMaterialTopTabNavigator();
interface IProps {
  publicProfile: Boolean;
  routes: any;
  profileTabType: string;
  ctUserData?: any;
  scenes: (e: SceneRendererProps & {route: any}) => ReactNode;
}
const TabComponent: React.FC<IProps> = (props: IProps) => {
  const {routes, profileTabType, publicProfile, ctUserData = null} = props;
  console.log('ctUserData in tabNav', ctUserData);

  const navigation = useNavigation();
  const Social = () => (
    <ProfileTabs
      navigation={navigation}
      type={ProfileTypes.SOCIAL}
      itemSlected={(item: any) => console.log(item)}
      publicProfile={ctUserData ? ctUserData : publicProfile}
      ctUserData={ctUserData}
    />
  );
  const Business = () => (
    <ProfileTabs
      navigation={navigation}
      type={ProfileTypes.BUSINESS}
      itemSlected={(item: any) => console.log(item)}
      publicProfile={ctUserData ? ctUserData : publicProfile}
      ctUserData={ctUserData}
    />
  );

  return (
    <>
      {profileTabType ? (
        <Tab.Navigator>
          {(profileTabType == 'Both' || profileTabType == 'Personal') && (
            <Tab.Screen
              name="Social"
              component={Social}
              options={{
                tabBarIndicatorStyle: {
                  borderColor: 'orange',
                  borderWidth: 2,
                },
                tabBarLabelStyle: {
                  fontWeight: 'bold',
                  fontSize: metrics.moderateScale(16),
                },
              }}
            />
          )}
          {(profileTabType == 'Both' || profileTabType == 'Business') && (
            <Tab.Screen
              name="Business"
              component={Business}
              options={{
                tabBarIndicatorStyle: {
                  borderColor: 'orange',
                  borderWidth: 2,
                },
                tabBarLabelStyle: {
                  fontWeight: 'bold',
                  fontSize: metrics.moderateScale(16),
                },
              }}
            />
          )}
        </Tab.Navigator>
      ) : (
        <></>
      )}
    </>
  );
};
export default TabComponent;
