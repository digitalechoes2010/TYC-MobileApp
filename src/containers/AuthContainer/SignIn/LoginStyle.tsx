import {Platform, StyleSheet} from 'react-native';
import theme from '../../../config/themeConfig';
import metrics from '../../../utils/metrics';

const styles = StyleSheet.create({
  defaultPage: {
    height: '100%',
    padding: 25,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
  },
  imgLogo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
  },
    heading: {
    ...theme.fonts.medium,
    fontWeight: 'bold',
    fontSize: metrics.moderateScale(20),
    alignSelf: 'center',
    textTransform: 'uppercase',
    textDecorationStyle: 'double',
    paddingTop: metrics.verticalScale(15),
    paddingBottom: metrics.verticalScale(30),
  },
    socialButtonLabel: {
    color: theme.colors.background,
  },
  textSeperator: {
    color: theme.colors.background,
  },
  version: {
    marginTop: 30,
    alignSelf: 'center',
  },
  activityIndicator: {
    alignSelf: 'center',
    width: 60,
  },
  // backgroundVideo: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   bottom: 0,
  //   right: 0,
  // },
  dgTitle: {
    marginTop: metrics.verticalScale(20),
  },
  dgAc: {
    paddingHorizontal: 0,
    position: 'absolute',
    right: 0,
  },
  dialogBoxBuss: {
    maxWidth: metrics.moderateScale(400),
    width: metrics.screenWidth - metrics.moderateScale(30),
    alignSelf: 'center',
    borderRadius: 25,
  },
  imgBOX: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  // editIconView: {
  //   width: metrics.moderateScale(35),
  //   height: metrics.moderateScale(35),
  //   position: 'absolute',
  //   top: metrics.moderateScale(160),
  //   right: metrics.moderateScale(10),
  //   zIndex: 999,
  // },
  // editIcon: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius: 100,
  //   backgroundColor: theme.colors.secondary,
  //   width: metrics.moderateScale(35),
  //   height: metrics.moderateScale(35),
  // },
  // mdTxt: {
  //   fontWeight: 'bold',
  //   fontSize: metrics.moderateScale(23),
  // },
  mdCOntainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  // txtCon: {
  //   flexDirection: 'row',
  //   marginBottom: metrics.moderateScale(5),
  //   alignItems: 'center',
  // },
  // subTxt: {
  //   marginLeft: metrics.moderateScale(10),
  //   fontSize: metrics.moderateScale(15),
  //   fontWeight: 'bold',
  //   color: '#bfbfbf',
  // },
  // txtContainer: {
  //   backgroundColor: theme.colors.textDark,
  //   paddingVertical: metrics.moderateScale(20),
  //   marginHorizontal: -metrics.moderateScale(20),
  //   paddingHorizontal: metrics.moderateScale(20),
  // },
  // mdbox: {
  //   width: metrics.moderateScale(95),
  //   height: metrics.moderateScale(95),
  //   margin: metrics.moderateScale(9),
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: Platform.OS === 'ios' ? 5 : 10,
  //     height: Platform.OS === 'ios' ? 5 : 10,
  //   },
  //   shadowOpacity: 0.5,
  //   shadowRadius: 1,
  //   elevation: 5,
  //   borderRadius: 10,
  //   padding: 5,
  //   backgroundColor: '#fff',
  // },
  mediaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  // linkTxt: {
  //   fontWeight: 'bold',
  //   fontSize: metrics.moderateScale(22),
  //   marginTop: metrics.moderateScale(23),
  // },
  t1: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: metrics.moderateScale(14),
  },
  addMediaBtn2: {
    justifyContent: 'center',
    marginTop: metrics.moderateScale(20),
    borderRadius: 100,
    backgroundColor: theme.colors.primary,
    width: metrics.moderateScale(125),
    height: metrics.moderateScale(45),
  },
  addMediaBtn: {
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: theme.colors.primary,
    width: metrics.moderateScale(100),
    height: metrics.moderateScale(35),
  },
  // signIncontainer: {
  //   flex: 1,
  //   flexGrow: 1,
  //   flexDirection: 'column',
  //   alignContent: 'space-between',
  //   backgroundColor: theme.colors.background,
  // },
  // logoContainerSignIn: {
  //   alignItems: 'center',
  //   // marginTop: metrics.verticalScale(40),
  //   width: '100%',
  //   height: '100%',
  //   flex: 0.9,
  // },
  inputContainerStyle: {
    marginBottom: 10,
  },
  // logoContainerSignUp: {
  //   alignItems: 'center',
  //   // marginTop: metrics.verticalScale(40),
  //   width: '100%',
  //   height: '100%',
  //   flex: 3,
  // },
  // heading: {
  //   ...theme.fonts.medium,
  //   fontWeight: 'bold',
  //   fontSize: metrics.moderateScale(20),
  //   alignSelf: 'center',
  //   textTransform: 'uppercase',
  //   textDecorationStyle: 'double',
  //   paddingTop: metrics.verticalScale(15),
  // },
  // textLinkContainer: {
  //   // flex: 0.2,
  //   flexDirection: 'row',
  //   alignSelf: 'center',
  //   alignItems: 'center',
  //   marginVertical: 5,
  //   marginBottom: 5,
  // },
  // formContainerSignUp: {
  //   paddingHorizontal: metrics.moderateScale(20),
  //   marginBottom: metrics.verticalScale(20),
  // },
  scrollHeight: {
    height: metrics.moderateScale(400),
  },
  // formContainer2: {
  //   // paddingHorizontal: ,
  //   marginVertical: 0,
  // },
  // formContainer: {
  //   paddingHorizontal: metrics.moderateScale(20),
  //   marginVertical: 0,
  // },
  // textInput: {
  //   backgroundColor: theme.colors.surface,
  //   // marginBottom: 0,
  // },
  // textInput2: {
  //   backgroundColor: theme.colors.surface,
  //   // marginBottom: 0,
  //   color: 'red',
  // },
  // boldText: {
  //   ...theme.fonts.medium,
  //   color: theme.colors.textDark,
  //   fontSize: metrics.moderateScale(17),
  //   fontWeight: 'bold',
  // },
  // highlightText: {
  //   ...theme.fonts.medium,
  //   color: theme.colors.signinaccent,
  //   paddingTop: metrics.verticalScale(2),
  //   textAlign: 'center',
  //   fontWeight: 'bold',
  // },
  // buttonContainer: {
  //   flex: 0.5,
  // },
  buttonContent: {
    paddingHorizontal: metrics.moderateScale(20),
    paddingVertical: metrics.verticalScale(5),
  },
  button: {
    alignSelf: 'center',
    borderRadius: 25,
    marginVertical: metrics.verticalScale(10),
    width: '80%',
  },
  buttonLabel: {
    color: theme.colors.background,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  // rememContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   paddingBottom: metrics.verticalScale(10),
  // },
  // checkbox: {
  //   height: metrics.verticalScale(40),
  //   width: metrics.moderateScale(40),
  //   alignSelf: 'center',
  // },
  // checkboxLabel: {
  //   justifyContent: 'center',
  //   alignSelf: 'center',
  //   paddingLeft: metrics.moderateScale(10),
  //   fontSize: metrics.moderateScale(15),
  //   fontWeight: 'bold',
  // },
  // SocialSignBlock: {
  //  marginVertical: metrics.verticalScale(40),
  // },
  // separatorTextBlock: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   paddingHorizontal: '0%',
  //   justifyContent: 'space-evenly',
  //   marginBottom: metrics.verticalScale(10),
  // },
  // separatorLine: {
  //   flex: 0.4,
  //   height: 4,
  //   backgroundColor: theme.colors.signinaccent,
  //   alignSelf: 'center',
  // },
  // separatorText: {
  //   alignSelf: 'flex-start',
  //   paddingTop: metrics.verticalScale(2),
  //   fontSize: metrics.moderateScale(15),
  // },
  // socialButtonContainer: {
  //   // flex: 1.5,
  //   // flexDirection: 'row',
  //   // justifyContent: 'space-evenly',
  // },
  // applesignin: {
  //   paddingTop: 15,
  //   flex: 1.5,
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  // },
  //  version: {
  //   marginTop: metrics.verticalScale(10),
  //   flexDirection: 'column',
  //   alignSelf: 'center',
  // },
  // socialButton: {
  //   alignSelf: 'center',
  //   borderRadius: 10,
  //   paddingVertical: metrics.verticalScale(10),
  // },
  // socialButtonLabel: {
  //   color: theme.colors.background,
  // },
  // borderStyleBase: {
  //   width: metrics.moderateScale(45),
  //   height: metrics.verticalScale(45),
  //   color: theme.colors.backdrop,
  //   backgroundColor: theme.colors.surface,
  // },
  // borderStyleHighLighted: {
  //   borderColor: '#03DAC6',
  // },
  error: {
    fontSize: metrics.moderateScale(12),
    color: '#FF0D10',
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  // paddingLeft: {
  //   paddingLeft: 5,
  // },
});
export default styles;
