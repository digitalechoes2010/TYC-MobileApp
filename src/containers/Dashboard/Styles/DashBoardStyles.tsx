import {StyleSheet} from 'react-native';
import theme from '../../../config/themeConfig';
import metrics from '../../../utils/metrics';

const dashboardStyles = StyleSheet.create({
  buttonContent: {
    paddingVertical: metrics.verticalScale(5),
    alignItems: 'center',
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
  error: {
    fontSize: metrics.moderateScale(12),
    color: '#FF0D10',
    alignSelf: 'flex-end',
    // marginTop: 10,
  },
  inputContainerStyle: {
    marginBottom: 10,
  },
  formContainer: {
    paddingHorizontal: metrics.moderateScale(20),
    marginVertical: 0,
  },
  l1: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  t1: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  directImg: {
    margin: 10,
    padding: 5,
    backgroundColor: 'white',
    width: 40,
    height: 40,
  },
  directContainer: {
    height: 50,
    marginVertical: 3,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: theme.colors.accent,
    borderWidth: 1,
  },
  dashboardContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
  },
  topContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  imageContainer: {
    // flex: 0.7,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '40%',
    marginRight: 40,
  },
  imageHolder: {
    width: metrics.moderateScale(170),
    height: metrics.verticalScale(170),
    borderRadius: 40,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: metrics.verticalScale(20),
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '55%',
  },
  userInfo: {
    width: '100%',
    paddingHorizontal: 25,
  },
  userName: {
    fontSize: metrics.moderateScale(18),
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  userLink: {
    textAlign: 'center',
    color: theme.colors.secondary,
    fontSize: 16,
    paddingBottom: 8,
  },
  bottomContainer: {flex: 1},
  dashBoardButtonContainer: {
    backgroundColor: theme.colors.darkgray,
    paddingVertical: 10,
    width: '80%',
    borderRadius: 100,
    marginBottom: 5,
  },
  dashBoardButtonContainer1: {
    backgroundColor: theme.colors.darkgray,
    paddingVertical: 10,
    width: '100%',
    borderRadius: 100,
    marginBottom: 10,
    marginTop: 10,
  },
});
export default dashboardStyles;
