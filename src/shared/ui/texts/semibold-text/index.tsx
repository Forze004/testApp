import React from 'react'
import { TextProps } from '../types'
import { BaseText } from '../base-text'
import { textStyles } from '../../../constants'

export const Text = ({ size = 16, ...restProps }: TextProps) => {
    return <BaseText style={textStyles.semibold} size={size} {...restProps} />
}
