import React, { ReactNode } from 'react'
import { LightText, SemiboldText } from '../../../shared/ui/texts'
import {Spacing} from '../../../shared/ui/layouts'
import { Pressable, StyleSheet, View } from 'react-native'

type Props = {
    title: string
    description: string
    logo: ReactNode
    image: ReactNode,
    handle?: () => void
    active?: boolean
}

export const Card = ({title, description, logo, image, handle, active }: Props) => {
    return (
        <Pressable 
            onPress={handle} 
            style={[styles.container, active && styles.active]}
        >
            <View style={styles.left}>
                <View style={styles.logo}>{logo}</View>
                <Spacing direction="vertical" value={10} />
                <SemiboldText lineHeight={24} size={24} color="#252526">
                    {title}
                </SemiboldText> 
                <Spacing direction="vertical" value={4} />
                <LightText lineHeight={18} size={14} color='#808080'>
                    {description}
                </LightText>
            </View>
            <View style={styles.right}>
                {image}
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'transparent'
    },
    active: {
        borderWidth: 1,
        borderColor: '#05C0E6'
    },
    left: {
        width: '70%',
    },
    logo: {
        width: 44,
        height: 44,
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EDFBFD'
    },
    right: {
        width: '30%',
    },
    
})