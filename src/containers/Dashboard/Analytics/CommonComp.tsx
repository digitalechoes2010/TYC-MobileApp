import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Button, withTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {BarChart} from 'react-native-chart-kit';
import GDText from '../../../components/GreadientText';
import Loader from '../../../components/Loader';
import {TopApps} from '../../../components/TopApps';
import ApiConfig from '../../../config/apiConfig';
import apiClient from '../../../config/clients';
import theme from '../../../config/themeConfig';
import {setUserdata} from '../../../store/Actions/UserActions';
import metrics from '../../../utils/metrics';

class CommonComp extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      isLoading: true,
      weeklyData: [],
      count: 6,
    };
  }

  componentDidMount = () => {
    this.getAnalyticsData();
  };
  getAnalyticsData = async () => {
    this.setState({isLoading: true});
    try {
      const res = await apiClient.get(ApiConfig.analytics);
      if (res.status == 200) {
        this.setState({
          weeklyData:
            res.data && res.data.length > 0
              ? res.data.reverse().map((e: any) => ({
                  week: e.week,
                  value: `${e.value}`,
                }))
              : [],
          isLoading: false,
        });
      } else {
        this.setState({isLoading: false});
      }
      const resUser = await apiClient.get(
        ApiConfig.usersByid + this.props.userData.id,
      );

      if (resUser.status == 200) {
        const {socialProfiles = [], businessProfiles = []}: any = resUser.data;
        console.log('resUser.data', resUser.data);

        this.props.updateProfileTypes({socialProfiles, businessProfiles});
      }
    } catch (error) {
      this.setState({isLoading: false});
    }
  };

  render() {
    const {userData} = this.props;
    if (this.state.isLoading) {
      return <Loader />;
    }
    return (
      <>
        <ScrollView style={{flex: 1}}>
          <View style={styles.container}>
            <GDText text={'TYC STATS'} style={styles.barTopText} />

            <Text style={styles.subTitle}>
              Contacts made during last 7 days
            </Text>
            <View style={{padding: 10, marginTop: 25, width: Dimensions.get("window").width, alignItems: 'center'}}>
              <View style={{top: '4.5%', left: '0.375%', position: 'absolute', zIndex: 1, height: 220, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{transform: [{rotate: '270deg'}], fontWeight: '500'}}>Daily Contacts</Text>
              </View>
              <BarChart
                data={{
                  labels: [
                    this.state.weeklyData[0].week,
                    this.state.weeklyData[1].week,
                    this.state.weeklyData[2].week,
                    this.state.weeklyData[3].week,
                    this.state.weeklyData[4].week,
                    this.state.weeklyData[5].week,
                    this.state.weeklyData[6].week
                  ],
                  datasets: [
                    {
                      data: [
                        this.state.weeklyData[0].value,
                        this.state.weeklyData[1].value,
                        this.state.weeklyData[2].value,
                        this.state.weeklyData[3].value,
                        this.state.weeklyData[4].value,
                        this.state.weeklyData[5].value,
                        this.state.weeklyData[6].value
                      ],
                    },
                  ],
                }}
                width={Dimensions.get("window").width - 30}
                height={220}
                fromZero={true}
                withHorizontalLabels={false}
                showBarTops={true}
                showValuesOnTopOfBars={true}
                chartConfig={{
                  backgroundColor: "#FFFFFF",
                  backgroundGradientFrom: "#FFFFFF",
                  backgroundGradientTo: "#FFFFFF",
                  decimalPlaces: 0,
                  barPercentage: 0.5,
                  color: (opacity = 1) => `rgba(196, 58, 49, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
              />
            </View>
          </View>

          <GDText
            text={'Top Apps'}
            style={styles.topAppText}
            containerStyle={{textAlign: 'center'}}
          />
          <Text style={styles.subTitle}>Links clicked by your contacts </Text>
          {userData[this.props.userProfile] &&
          userData[this.props.userProfile].length > 0 ? (
            <>
              <View
                style={{
                  flexDirection:
                    userData.socialProfiles.length > 0 ? 'row' : 'column',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}>
                {userData[this.props.userProfile]
                  .slice(0, this.state.count)
                  .map((item: any, i: any) => {
                    return <TopApps key={i} item={item} />;
                  })}
              </View>
              {userData[this.props.userProfile].length > this.state.count && (
                <Button
                  mode={'contained'}
                  contentStyle={styles.buttonContent}
                  style={styles.button}
                  labelStyle={styles.buttonLabel}
                  onPress={() =>
                    this.setState({
                      count: userData[this.props.userProfile].length,
                    })
                  }>
                  View All
                </Button>
              )}
            </>
          ) : (
            <Text style={{textAlign: 'center', marginTop: 20}}>
              No Data Found
            </Text>
          )}

          <View
            style={{
              minHeight: metrics.moderateScale(250),
            }}
          />

          {/* <TouchableOpacity
            style={dashboardStyles.dashBoardButtonContainer}
            onPress={() => this.navigation.navigate('Maps')}>
            <Text>map</Text>
          </TouchableOpacity> */}
        </ScrollView>
        {!this.state.isLoading && (
          <TouchableOpacity
            onPress={() => this.getAnalyticsData()}
            containerStyle={styles.refreshBox}>
            <Icon name={'refresh'} size={20} color={'#fff'} />
          </TouchableOpacity>
        )}
      </>
    );
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateProfileTypes: (data: any) => dispatch(setUserdata(data)),
});
// setUserdata
const mapStateToProps = (state: any, ownProps: any) => {
  return {
    userData: state.UserReducer,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(CommonComp));
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  barTopText: {
    fontWeight: '700',
    fontSize: 30,
    textTransform: 'uppercase',
    marginTop: metrics.moderateScale(40),
  },
  subTitle: {
    fontSize: 14,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  topAppText: {
    fontSize: metrics.moderateScale(30),
    fontWeight: 'bold',
    marginTop: 25,
  },
  refreshBox: {
    height: 30,
    width: 30,
    position: 'absolute',
    zIndex: 999,
    backgroundColor: theme.colors.textDark + '50',
    top: 30,
    right: 10,
    borderRadius: 15,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 0.5,
  },
  buttonContent: {
    paddingHorizontal: metrics.moderateScale(20),
    paddingVertical: metrics.verticalScale(5),
  },
  button: {
    alignSelf: 'center',
    borderRadius: 25,
    marginBottom: metrics.verticalScale(10),
    width: '80%',
  },
  buttonLabel: {
    color: theme.colors.background,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
