import React, { ReactNode } from 'react'
import { StyleSheet, Pressable, ViewStyle, View } from 'react-native'
import { LightText } from '../../../shared/ui/texts'
import { ErrorsInput } from './errors'

type Props = {
    handle?: () => void
    labelColor?: string,
    valueColor?: string,
    label: string
    value?: string
    rightContent?: ReactNode
    style?: ViewStyle
    error?: string
}

export const Selector = ({
    handle, 
    label, 
    value, 
    rightContent,
    labelColor,
    style,
    error,
    valueColor
}: Props) => {
    return (
        <>
            <Pressable onPress={handle} style={[styles.select, style]}>
                <LightText 
                    lineHeight={22} 
                    color={labelColor ? labelColor : '#252526'}
                >
                    {label} <LightText children="*" color='#05C0E6' />
                </LightText> 

                {
                    rightContent 
                        ? rightContent 
                        : <LightText 
                            lineHeight={22} 
                            color={valueColor ? valueColor :'#808080'}
                        >
                            {value}
                        </LightText>
                }
            </Pressable>
            {error && <ErrorsInput error={error} />}
        </>
    )
}

const styles = StyleSheet.create({
    select: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 48,
    },
})