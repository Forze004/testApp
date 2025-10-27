import { TextStyle as RNTextStyle, Platform } from 'react-native'

const isIos = Platform.OS === 'ios'

type TextStyle = 'light' | 'regular' | 'medium' | 'semibold'

type TextStyles = Record<TextStyle, RNTextStyle>

const APP_FONT = 'Geologica'

export const textStyles: TextStyles = {
    light: {
        fontFamily:  `${APP_FONT}-Light`
    },
    regular: {
        fontFamily:  `${APP_FONT}-Regular`
    },
    medium: {
        fontFamily:  `${APP_FONT}-Medium`
    },
    semibold: {
        fontFamily:  `${APP_FONT}-SemiBold`, 
    },
}
