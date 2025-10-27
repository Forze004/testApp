import React from 'react'
import {
    KeyboardAvoidingView,
    Platform,
    ViewStyle,
} from 'react-native'

type Props = {
  children: React.ReactNode
  style?: ViewStyle
  keyboardVerticalOffset?: number
  behavior?: 'padding' | 'height' | 'position'
  disabled?: boolean
}

export const KeyboardAvoidingWrapper: React.FC<Props> = ({
    children,
    style,
    keyboardVerticalOffset = 115,
    behavior = 'padding',
    disabled,
}) => {
    return (
        <KeyboardAvoidingView
            enabled={Platform.OS === 'ios' && !disabled}
            keyboardVerticalOffset={keyboardVerticalOffset}
            behavior={behavior}
            style={[{}, style]}>
            {children}
        </KeyboardAvoidingView>
    )
}
