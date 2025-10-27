import React, { useLayoutEffect, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { CodeInput } from '../../../shared/ui/input/'
import { TextButton } from '../../../shared/ui/text-button/text-button'
import {KeyboardAvoidingWrapper, Spacing, Header, Info, Loader} from '../../../shared/ui/layouts'
import { useAuthContext } from '../model/context'
import { useAppNavigation, useCode, useDelayedAction } from '../../../shared/lib/hooks'
import { AuthStackParamList } from '../../../shared/types/navigation'
import { Controller } from 'react-hook-form'
import { useTranslation } from "react-i18next";

const SUCCESS_CODE = '123456'

export const CodeScreen = () => {
    const { t } = useTranslation();
    const { control, watch } = useAuthContext()
    const { pop, navigate } = useAppNavigation<AuthStackParamList>()
    const {timer, resend} = useCode()
    const code = watch('code')
    const { send, loading } = useDelayedAction(() => navigate('DriverScreen'));

    useLayoutEffect(() => {
        if (code.length === 6 && code === SUCCESS_CODE) {
            send()
        }
    }, [code])

    const sendCodeButton = useMemo(
        () => (
            <TextButton   
                disabled={timer > 0}
                label={
                    !timer ?
                    t('resend') :
                    `${t('resendVia')} 00:${timer < 10 ? '0': ''}${timer}`
                }
                onPress={resend}
            />
        ),
        [timer]
    );

    if (loading) {
        return <Loader />
    }

    return (
        <KeyboardAvoidingWrapper style={{flex: 1}}>
            <View style={styles.container}>
                <Header 
                    showRight 
                    handleBack={() => pop(2)} 
                />
                <View style={styles.wrapper}>
                    <Spacing direction="vertical" value={8} />
                    <Info 
                        title={t('codeTitle')}
                        description={t('codeDescription', {phone: watch('phone')})}
                    />
                    <Spacing direction="vertical" value={35} />
                    <Controller
                        control={control}
                        name='code'
                        render={({ field: { value, onChange } }) => 
                            <CodeInput 
                                code={value} 
                                error={value !== SUCCESS_CODE}
                                onChange={onChange}  
                            />
                        }
                    />
                </View>

                <View style={styles.footer}>
                    {sendCodeButton}
                </View>
            </View>
       </KeyboardAvoidingWrapper>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        right: 16,
    },
    wrapper: {
        paddingHorizontal: 16
    }
})