/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Toast from 'react-native-toast-message';
const Root = () => (
    <>
      <App />
      <Toast />
    </>
  );
AppRegistry.registerComponent(appName, () => Root);
