import React, { PropsWithChildren } from 'react'
import { ViewProps, View } from 'react-native'

type Props = Omit<ViewProps, 'style'> &
  PropsWithChildren & {
    value: number
    steps?: number
    direction?: 'horizontal' | 'vertical'
  }

export const Spacing = ({
    value,
    steps = 1,
    direction = 'vertical',
    ...props
}: Props) => 
    <View
        style={{ [direction === 'horizontal' ? 'paddingLeft' : 'paddingTop']: value * steps }}
        {...props}
    />

