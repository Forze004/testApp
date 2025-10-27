import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, Header, Info, Spacing} from '../../../shared/ui/layouts'
import { DeliveryIcon, FrameLineIcon, FrameMenuIcon, LuggageIcon } from '../../../shared/ui/icons'
import { useAuthContext } from '../model/context'
import { TextButton } from '../../../shared/ui/text-button/text-button'
import { useAppNavigation, useDelayedAction } from '../../../shared/lib/hooks'
import { AuthStackParamList } from '../../../shared/types/navigation'
import { useTranslation } from "react-i18next";

const CARRIER = "carrier"
const CUSTOMER = "customer"

export const RoleScreen = () => {
    const { t } = useTranslation();
    const { setValue, watch } = useAuthContext()
    const { navigate } = useAppNavigation<AuthStackParamList>()
    const { send, loading } = useDelayedAction(() => navigate('CodeScreen'));
    
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.wrapper}>
                <Spacing direction="vertical" value={8} />
                <Info 
                    title={t('roleTitle')}
                    description={t('roleDescription')}
                />
            </View>
            <Spacing direction="vertical" value={20} />
            <View style={styles.line} />
            <Spacing direction="vertical" value={20} />
            <View style={styles.wrapper}>
                <Card 
                    active={watch('role') === CUSTOMER}
                    handle={() => setValue("role", CUSTOMER)}
                    logo={<LuggageIcon />}
                    image={<FrameLineIcon />}
                    title={t('customerTitle')}
                    description={t('customerDescription')}
                />
                <Spacing direction="vertical" value={25} />
                <Card 
                    active={watch('role') === CARRIER}
                    handle={() => setValue("role", CARRIER)}
                    logo={<DeliveryIcon />}
                    image={<FrameMenuIcon />}
                    title={t('carrierTitle')}
                    description={t('carrierDescription')}
                />
            </View>

            <View style={styles.footer}>
                <TextButton  
                    label={t('next')}
                    loading={loading}
                    disabled={watch('role').length === 0}
                    onPress={send}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        paddingHorizontal: 16
    },
    line: {
        width: '100%',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#D9D9D9'
    },
    footer: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        right: 16,
    },
})