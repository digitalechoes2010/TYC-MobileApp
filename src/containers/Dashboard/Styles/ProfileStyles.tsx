import {StyleSheet} from 'react-native';
import theme from '../../../config/themeConfig';
import metrics from '../../../utils/metrics';

const profileStyles = StyleSheet.create({
  profileContainer: {
    flex: 3,
    flexDirection: 'column',
  },
  imageContainer: {
    flex: 0.6,
    backgroundColor: theme.colors.textDark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageHolder: {
    width: metrics.moderateScale(180),
    height: metrics.verticalScale(180),
    borderRadius: 40,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    color: theme.colors.primary,
  },
  profileImg: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  informationContainer: {
    flex: 1.4,
    padding: metrics.moderateScale(20),
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formIcon: {
    flex: 0.1,
    color: theme.colors.primary,
    textAlign: 'center',
    marginRight: 10,
  },
  input: {
    flex: 1,
  },
  button: {
    flex: 0.5,
    marginHorizontal: 25
  },
});

export default profileStyles;
