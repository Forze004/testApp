import React, { useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { MaskedTextInput } from "react-native-mask-text";
import { LightText } from '../../../shared/ui/texts'
import { TextButton } from '../../../shared/ui/text-button/text-button'
import { Spacing } from '../../../shared/ui/layouts/spacing';
import { Info, KeyboardAvoidingWrapper } from '../../../shared/ui/layouts';
import { useAuthContext } from '../model/context';
import { Controller } from 'react-hook-form';
import { AuthStackParamList } from '../../../shared/types/navigation';
import { useDelayedAction, useAppNavigation } from '../../../shared/lib/hooks';
import { ProfileIcon } from '../../../shared/ui/icons';
import { useTranslation } from "react-i18next";

export const PhoneScreen = () => {
    const { t } = useTranslation();
    const [policy, setPolicy] = useState<boolean>(false)
    const { control, watch } = useAuthContext()
    const { navigate } = useAppNavigation<AuthStackParamList>()
    const { send, loading } = useDelayedAction(() => navigate('RoleScreen'));

    return (
        <KeyboardAvoidingWrapper style={{flex: 1}}>
            <View style={styles.container}>
                <ProfileIcon />
                <Spacing  direction="vertical" value={25} />
                <Info 
                    titleTextTransform="uppercase"
                    title={t('title')}
                    description={t('description')}
                />
                <Controller
                    control={control}
                    name='phone'
                    render={({ field: { value, onChange } }) => 
                        <MaskedTextInput
                            mask='+9 (999) 999-99-99'
                            placeholder='+7 (777) 777-77-77'
                            value={value}
                            placeholderTextColor="#808080"
                            onChangeText={onChange}
                            style={styles.input}
                            keyboardType="numeric"
                        />
                    }
                />
                <View style={styles.policy}>
                    <Pressable 
                        onPress={() => setPolicy(prev => !prev)} 
                        style={styles.checkbox} 
                    >
                        {policy && <View style={styles.checkboxActive} />}
                    </Pressable>
                    <LightText 
                        children={t('policy')}
                        size={14} 
                        lineHeight={16}
                        color='#454545' 
                    />
                </View>
                <Spacing  direction="vertical" value={10} />
                <TextButton  
                    loading={loading}
                    disabled={watch('phone').length < 18 || !policy}
                    label={t('signIn')}
                    onPress={send}
                />
            </View> 
        </KeyboardAvoidingWrapper>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F5F5F5'
    },
    policy: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10
    },
    checkbox: {
        borderColor: '#D9D9D9',
        borderWidth: 2,
        borderRadius: 4,
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkboxActive: {
        width: 10,
        height: 10,
        borderRadius: 4,
        backgroundColor: '#05C0E6'
    },
    input: {
        width: '100%',
        height: 48,
        marginVertical: 40,
        paddingLeft: 16,
        borderRadius: 8,
        backgroundColor: '#FFFFFF'
    }
})
