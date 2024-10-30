import { ImageRequireSource } from 'react-native';

export const images: { [key: string]: ImageRequireSource } = {
    logo: require('./logo.png'),
    back: require('./back.png'),
} as const;
