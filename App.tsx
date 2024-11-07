import React, {memo} from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {colors} from './source/constants/colors';
import AppRoot from './source/stacks/AppRoot';
import {persistor, store} from './source/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar
          backgroundColor={colors.transparent_black}
          barStyle={'light-content'}
          translucent={true}
          hidden={true}
        />
        <AppRoot />
      </PersistGate>
    </Provider>
  );
};

export default memo(App);
