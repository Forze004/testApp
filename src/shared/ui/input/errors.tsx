import React from 'react'
import { StyleSheet, View } from 'react-native'
import {  MediumText } from '../../../shared/ui/texts'

type Props = {
    error?: string
}

export const ErrorsInput = ({ error }: Props) => {
    if (!error) return null
    return (
        <View style={styles.container}>
            <MediumText size={12} children={error} color='red' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 7
    },
})