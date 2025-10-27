import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { ChevronLeftIcon, HelpIcon } from '../icons'
import { useAppNavigation } from '../../lib/hooks'

type Props = {
    showRight?: boolean
    handleBack?: () => void
}

export const Header = ({showRight, handleBack}: Props) => {
    const { goBack } = useAppNavigation()
    return (
       <View style={styles.container}>
            <Pressable 
                onPress={handleBack ? handleBack : goBack} 
                style={styles.button}
            >
                <ChevronLeftIcon /> 
            </Pressable>
            {
                showRight && <Pressable style={styles.button}>
                    <HelpIcon /> 
                </Pressable>
            }
       </View> 
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 40,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})