import React from 'react'
import { ActivityIndicator, Pressable } from 'react-native'
import { RegularText } from '../texts'

type Props = {
    label: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    background?: string
};


export const TextButton = ({
    label,
    onPress,
    loading = false,
    disabled = false,
    background
}: Props) => {
    return (
        <Pressable
            disabled={disabled || loading}
            onPress={onPress}
            style={{
                backgroundColor: 
                    disabled ? "#C1EFF9" : 
                        background ? background : '#05C0E6',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: 48,
                borderRadius: 8,
            }}
        >
            {loading ?
                <ActivityIndicator size="small" color="#fff" />
                :
               <RegularText
                    size={16}
                    lineHeight={16 + 2}
                    color={'#fff'}
                >
                    {label}
                </RegularText>
            }
        </Pressable>
    )
}
