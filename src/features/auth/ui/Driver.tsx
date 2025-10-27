import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Pressable, ScrollView, Alert } from 'react-native'
import { TextButton } from '../../../shared/ui/text-button/text-button'
import {KeyboardAvoidingWrapper, Info, Spacing} from '../../../shared/ui/layouts'
import { ErrorsInput, Selector } from '../../../shared/ui/input'
import { ChevronDownIcon, ClearIcon } from '../../../shared/ui/icons'
import { LightText } from '../../../shared/ui/texts'
import { MaskedTextInput } from 'react-native-mask-text'
import { useAuthContext } from '../model/context'
import { Controller } from 'react-hook-form'
import { Modal } from './Modal'
import { getRules } from '../../../shared/constants/rules'
import { useTranslation } from 'react-i18next'

export const DriverScreen = () => {
    const { t } = useTranslation();
    const { 
        control, 
        watch, 
        setValue,
        handleDatePicker, 
        errors, 
        onSubmit, 
        loading, 
        isProfile,
        handleLogout,
        language,
        modalLanguage,
        handleLanguage,
        toggleModalLanguage
    } = useAuthContext() 
    const rules = getRules(t);
    const [modalCitizenship, setModalCitizenship] = useState<boolean>(false);
    const [modalIsWhatsApp, setModalIsWhatsApp] = useState<boolean>(false);
    const [modalIsWhatsAppAditional, setModalIsWhatsAppAditional] = useState<boolean>(false);
 
    return (
        <KeyboardAvoidingWrapper style={styles.container}>
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true} 
                >
                    <View style={styles.wrapper}>
                        {
                            isProfile ?
                                <Info 
                                    title={t('profile')}
                                />
                                :
                                <Info 
                                    title={t('driverTitle')}
                                    description={t('driverDescription')}
                                />
                        }
                        <View style={styles.form}>
                            {
                                isProfile && 
                                <View style={styles.inputWrapper}>
                                    <Selector
                                        handle={toggleModalLanguage}
                                        label={t('language')}
                                        showStar={false}
                                        value={language == "en" ? "English" : "Русский"}
                                        valueColor='#252526'
                                    />
                                </View>
                            }

                            <View style={styles.inputWrapper}>
                                <Controller
                                    control={control}
                                    name='lastname'
                                    rules={rules.lastname}
                                    render={({ field: { value, onChange } }) => 
                                        <TextInput 
                                            value={value}
                                            placeholder={t('lastname')}
                                            placeholderTextColor={"#808080"}
                                            onChangeText={onChange}
                                            style={[styles.input, styles.inputBorder]}
                                        />
                                    }
                                />
                                <ErrorsInput error={errors.lastname?.message} />
                                <Controller
                                    control={control}
                                    name='name'
                                    rules={rules.name}
                                    render={({ field: { value, onChange } }) => 
                                        <TextInput 
                                            value={value}
                                            placeholder={t('name')}
                                            placeholderTextColor={"#808080"}
                                            onChangeText={onChange}
                                            style={[styles.input, styles.inputBorder]}
                                        />
                                    }
                                />
                                <ErrorsInput error={errors.name?.message} />
                                <Controller
                                    control={control}
                                    name='surname'
                                    render={({ field: { value, onChange } }) => 
                                        <TextInput 
                                            value={value}
                                            placeholder={t('surname')}
                                            placeholderTextColor={"#808080"}
                                            onChangeText={onChange}
                                            style={styles.input}
                                        />
                                    }
                                />
                            </View>
                            <View style={styles.inputWrapper}>
                                <Controller
                                    control={control}
                                    name="birthday"
                                    rules={rules.birthday}
                                    render={({ field: { value } }) => (
                                        <Selector
                                            error={errors.birthday?.message}
                                            handle={handleDatePicker}
                                            label={t('birthday')}
                                            valueColor={value ? '#252526' : '#808080'}
                                            value={value || t('notSpecified')}
                                        />
                                    )}
                                />
                            </View>
                            <View style={styles.inputWrapper}>
                                <Controller
                                    control={control}
                                    name="citizenship"
                                    rules={rules.citizenship}
                                    render={({ field: { value } }) => (
                                        <Selector 
                                            error={errors.citizenship?.message}
                                            label={value || t('citizenship')}
                                            handle={() => setModalCitizenship(true)}
                                            labelColor={value ? '#252526' : '#808080'}
                                            rightContent={<ChevronDownIcon />}
                                        />
                                    )}
                                />
                            </View>

                            <View style={styles.inputWrapper}>
                                <View style={[styles.inputFloat, styles.inputBorder]}>
                                    <LightText 
                                        lineHeight={22} 
                                        color="#808080"
                                        children={t('phone')}
                                    />
                                    <LightText 
                                        lineHeight={22} 
                                        color="#252526"
                                        children={watch('phone')}
                                    />
                                </View>
                                <Pressable 
                                    onPress={() => setModalIsWhatsApp(true)} 
                                    style={styles.inputFloat}
                                >
                                    <LightText 
                                        lineHeight={22} 
                                        color="#808080"
                                        children={t('registeredWhatsApp')}
                                    />
                                    <LightText 
                                        lineHeight={22} 
                                        color="#252526"
                                        children={watch('isWhatsApp')}
                                    />
                                </Pressable>
                            </View>

                            <View style={styles.inputWrapper}>
                                <View style={[styles.inputFloat, styles.inputBorder]}>
                                    <LightText 
                                        lineHeight={22} 
                                        color="#808080"
                                        children={t('additionalNumber')}
                                    />
                                    <View style={styles.maskedTextWrapper}>
                                        <Controller
                                            control={control}
                                            name='additionalPhone'
                                            render={({ field: { value, onChange } }) => 
                                                <MaskedTextInput
                                                    mask='+9 (999) 999-99-99'
                                                    placeholder='+7 (777) 777-77-77'
                                                    value={value}
                                                    placeholderTextColor="#808080"
                                                    onChangeText={text=> onChange(text)}
                                                    style={styles.maskedTextInput}
                                                    keyboardType="numeric"
                                                />
                                            }
                                        />
                                        
                                        {watch('additionalPhone')?.length !== 0 && 
                                            <Pressable onPress={() => setValue('additionalPhone','')}>
                                                <ClearIcon />
                                            </Pressable>
                                        } 
                                    </View>
                                </View>
                                <Pressable 
                                    onPress={() => setModalIsWhatsAppAditional(true)}
                                    style={styles.inputFloat}
                                >
                                    <LightText 
                                        lineHeight={22} 
                                        color="#808080"
                                        children={t('registeredWhatsApp')}
                                    />
                                    <LightText 
                                        lineHeight={22} 
                                        color="#252526"
                                        children={watch('isWhatsAppAditional')}
                                    />
                                </Pressable>
                            </View>

                            <View style={styles.inputWrapper}>
                                <Selector 
                                    label={t('vu')}
                                    style={styles.inputBorder}
                                    rightContent={
                                        <Controller
                                            control={control}
                                            rules={rules.vy}
                                            name='vy'
                                            render={({ field: { value, onChange } }) => 
                                                <TextInput 
                                                    value={value}
                                                    style={styles.inputSelector}
                                                    placeholder={t('vuNumber')}
                                                    keyboardType="numeric"
                                                    onChangeText={onChange}
                                                    placeholderTextColor={"#252526"}
                                                />
                                            }
                                        />
                                    }
                                />
                                <ErrorsInput error={errors.vy?.message} />
                                <Selector 
                                    label={t('dateIssue')}
                                    rightContent={
                                        <Controller
                                            control={control}
                                            rules={rules.issueDate}
                                            name='issueDate'
                                            render={({ field: { value, onChange } }) => 
                                                <MaskedTextInput
                                                    mask='99.99.9999'
                                                    placeholder={t('notSpecified')}
                                                    value={value}
                                                    placeholderTextColor="#808080"
                                                    onChangeText={text=> onChange(text)}
                                                    style={styles.maskedTextInput}
                                                    keyboardType="numeric"
                                                />
                                            }
                                        />
                                    }
                                />
                                <ErrorsInput error={errors.issueDate?.message} />
                            </View>
                        </View>
                        <Spacing direction="vertical" value={5} />
                        <LightText 
                            lineHeight={17} 
                            size={14} 
                            color='#808080'
                            children={t('license')}
                        />
                        <View style={styles.footer}>
                            <TextButton  
                                disabled={loading}
                                loading={loading}
                                label={isProfile ? t('saveChanges') : t('continue')}
                                onPress={onSubmit}
                            />
                            {
                                isProfile && 
                                <TextButton  
                                    label={t('signOut')}
                                    background='red'
                                    onPress={handleLogout}
                                />
                            }
                        </View>
                    </View>
                </ScrollView>

                <Modal 
                    modalVisible={modalCitizenship}
                    data={[{value: t('RK')}]}
                    handleClose={() => setModalCitizenship(false)}
                    handleSelectValue={(value: string) => {
                        setValue('citizenship', value, { shouldValidate: true })
                        setModalCitizenship(false)
                    }}
                /> 
                <Modal 
                    modalVisible={modalLanguage}
                    data={[{value: "Русский"}, {value: "English"}]}
                    handleClose={toggleModalLanguage}
                    handleSelectValue={handleLanguage}
                /> 
                
                <Modal 
                    modalVisible={modalIsWhatsApp}
                    data={[{value: t('yes')}, {value: t('no')}]}
                    handleClose={() => setModalIsWhatsApp(false)}
                    handleSelectValue={(value: string) => {
                        setValue('isWhatsApp', value)
                        setModalIsWhatsApp(false)
                    }}
                />
                <Modal 
                    modalVisible={modalIsWhatsAppAditional}
                    data={[{value: t('yes')}, {value: t('no')}]}
                    handleClose={() => setModalIsWhatsAppAditional(false)}
                    handleSelectValue={(value: string) => {
                        setValue('isWhatsAppAditional', value)
                        setModalIsWhatsAppAditional(false)
                    }}
                />
            </View>
       </KeyboardAvoidingWrapper>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form: {
        marginTop: 24,
        gap: 12
    },
    footer: {
       marginVertical: 20,
       gap: 15
    },
    wrapper: {
        paddingTop: 8,
        paddingHorizontal: 16
    },
    inputWrapper: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 12,
        borderRadius: 8
    },
    input: {
        width: '100%',
        height: 48,
        fontSize: 16
    },
    inputFloat: {
        width: '100%',
        height: 48,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }, 
    maskedTextWrapper: {
        width: 170,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    maskedTextInput: {
        width: 145,
        fontSize: 16,
        textAlign: 'right'
    },
    inputSelector: {
        width: 150,
        textAlign: 'right',
        fontSize: 16
    },
    inputBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#D9D9D9',
    },
    select: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 48,
    }
})