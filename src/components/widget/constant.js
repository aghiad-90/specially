import { DefaultTheme } from 'react-native-paper';

const colors = {
    ...DefaultTheme.colors,
    primary: '#FCDE2B',
    icon: '#1f3f3f',
    secondary: '#0F4556',
    primarydark: '#0F4556',
    black: '##020202',
    error: '#f13a59',
    gray: '#EDEDED',
    grayText: '#808080',
    onSurface: '#000000',
    blackLightGray: '#252525',
    black: '#000000',
    lightBlack: '#484848',
    white: '#ffffff',
    green01: '#008388',
    green02: '#02656b',
    darkOrange: '#d93900',
    lightGray: '#d8d8d8',
    pink: '#fc4c54',
    gray01: '#f3f3f3',
    gray02: '#919191',
    gray03: '#b3b3b3',
    gray04: '#484848',
    gray05: '#dadada',
    gray06: '#ebebeb80',
    gray07: '#D3D3D320',
    brown01: '#ad8763',
    brown02: '#7d4918',
    green: '#008000',
    accent: "#222222",
    tertiary: "#FFE358",
    gray2: "#C5CCD6",
    red: "#FF0000",
    yellow: "#FED000"

};

const sizes = {
    // global sizes
    base: 16,
    font: 14,
    radius: 6,
    padding: 25,

    // font sizes
    h1: 26,
    h2: 20,
    h3: 18,
    title: 18,
    header: 16,
    body: 14,
    caption: 12,
}

const fonts = {
    h1: {
        fontSize: sizes.h1
    },
    h2: {
        fontSize: sizes.h2
    },
    h3: {
        fontSize: sizes.h3
    },
    header: {
        fontSize: sizes.header
    },
    title: {
        fontSize: sizes.title
    },
    body: {
        fontSize: sizes.body
    },
    caption: {
        fontSize: sizes.caption
    }
}
export { colors, sizes, fonts };