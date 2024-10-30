import React, {memo} from 'react';
import AuthStack from './AuthStack';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import AppStack from './AppStack';

const AppRoot = () => {
  const user = useSelector((state: RootState) => state.user?.user);

  return user ? <AppStack /> : <AuthStack />;
};

export default memo(AppRoot);
