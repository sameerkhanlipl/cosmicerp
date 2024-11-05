import {ImageRequireSource} from 'react-native';

export const images: {[key: string]: ImageRequireSource} = {
  logo: require('./logo.png'),
  back: require('./back.png'),
  extruder: require('./extruder.png'),
  packing: require('./packing.png'),
  silai: require('./silai.png'),
  rewinding: require('./rewinding.png'),
  lamination: require('./lamination.png'),
  search: require('./search.png'),
  right_arrow: require('./right_arrow.png'),
} as const;
