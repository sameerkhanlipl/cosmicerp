import React, {memo} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import AppRoot from './source/stacks/AppRoot';
import {persistor, store} from './source/store/store';
import {StatusBar} from 'react-native';
import {colors} from './source/constants/colors';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar
          backgroundColor={colors.transparent_black_1}
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
