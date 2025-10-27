import React, { useRef } from 'react'
import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import { RegularText, SemiboldText } from '../texts'
import { ErrorsInput } from './errors'
import { useTranslation } from 'react-i18next'

type CodeInputProps = {
  code: string
  onChange: (code: string) => void
  autoFocus?: boolean
  error: boolean
}

export const CodeInput = ({
    code,
    onChange,
    autoFocus,
    error
}: CodeInputProps) => {
    const { t } = useTranslation();
    const input = useRef<TextInput>(null)

    return (
        <View>
            <View style={styles.container}>
                {Array.from({ length: 6 }).map((_, index) => 
                    <Pressable
                        key={index}
                        onPress={() => input.current?.focus()}
                        style={styles.input}>
                        <SemiboldText align='center' size={32} children={code[index] || ''} />
                    </Pressable>)}
            </View>

            <TextInput
                maxLength={6}
                keyboardType='numeric'
                onChange={({ nativeEvent: { text } }) => onChange(text)}
                ref={ref => {
                    if (ref) {
                        input.current = ref
                    }
                }}
                style={styles.hiddenInput}
                autoFocus={autoFocus}
            />
            {error && code.length == 6 && 
                <View style={styles.error}>
                    <ErrorsInput error={t('incorrectCode')} />
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    input: {
        marginHorizontal: 7,
        width: 50,
        height: 56,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    error: {
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    hiddenInput: {
        width: 0,
        height: 0,
        opacity: 0.01,
        position: 'absolute',
    },
})
