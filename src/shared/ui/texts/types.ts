import { PropsWithChildren } from 'react'
import { TextStyle, TextProps as RNTextProps } from 'react-native'

export type BaseTextProps = {
  style: TextStyle
  size: number
  color?:  string
  align?: TextStyle['textAlign']
  numberOfLines?: RNTextProps['numberOfLines']
  isStrikethrough?: boolean
  lineHeight?: TextStyle['lineHeight']
  onPress?: () => void
  disabled?: boolean
  textTransform?: TextStyle['textTransform']
} & PropsWithChildren

export type TextProps = Partial<Omit<BaseTextProps, 'style'>>
