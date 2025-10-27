import { Platform, Text } from 'react-native'
import React from 'react'
import { BaseTextProps } from '../types'

export const BaseText = ({
    style,
    size,
    color = 'black',
    align,
    numberOfLines,
    isStrikethrough,
    lineHeight,
    children,
    onPress,
    disabled,
    textTransform
}: BaseTextProps) => {
    return (
        <Text
            onPress={onPress}
            disabled={disabled}
            style={{
                ...style,
                textTransform: textTransform,
                fontSize: Platform.OS ? size : size - 3,
                textAlign: align,
                lineHeight,
                color,
                ...isStrikethrough && {
                    textDecorationColor: color,
                    textDecorationLine: 'line-through',
                },
            }}
            numberOfLines={numberOfLines}
            children={children}
            allowFontScaling={false}
            ellipsizeMode="tail"
        />
    )
}
