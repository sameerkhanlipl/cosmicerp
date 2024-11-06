import {ImageRequireSource} from 'react-native';

export const images: {[key: string]: ImageRequireSource} = {
  logo: require('./logo.png'),
  back: require('./back.png'),
  date: require('./date.png'),
  mail: require('./mail.png'),
  silai: require('./silai.png'),
  search: require('./search.png'),
  logout: require('./logout.png'),
  packing: require('./packing.png'),
  extruder: require('./extruder.png'),
  rewinding: require('./rewinding.png'),
  lamination: require('./lamination.png'),
  last_login: require('./last_login.png'),
  right_arrow: require('./right_arrow.png'),
  phone_number: require('./phone_number.png'),
} as const;
