/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './src/App';
import config from './app.json';

AppRegistry.registerComponent(config[Platform.OS].name, () => App);
