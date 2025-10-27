import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Pressable, ScrollView } from 'react-native'
import { TextButton } from '../../../shared/ui/text-button/text-button'
import {KeyboardAvoidingWrapper, Info, Spacing} from '../../../shared/ui/layouts'
import { ErrorsInput, Selector } from '../../../shared/ui/input'
import { ChevronDownIcon, ClearIcon } from '../../../shared/ui/icons'
import { LightText } from '../../../shared/ui/texts'
import { MaskedTextInput } from 'react-native-mask-text'
import { useAuthContext } from '../model/context'
import { Controller } from 'react-hook-form'
import { Modal } from './Modal'
import { rules } from '../../../shared/constants/rules'

export const DriverScreen = () => {
    const { 
        control, 
        watch, 
        setValue,
        handleDatePicker, 
        errors, 
        onSubmit, 
        loading, 
        isProfile,
        handleLogout
    } = useAuthContext() 
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
                                    title='Профиль'
                                />
                                :
                                <Info 
                                    title='вы водитель?'
                                    description={`Если вы самостоятельно выполняете перевозки укажите “да” и заполните необходимые данные.${'\n'}${'\n'}Если у вас работают наемные водители, укажите “нет”. Данные водителя можно будет заполнить на следующем этапе регистрации.`}
                                />
                        }
                        <View style={styles.form}>
                            <View style={styles.inputWrapper}>
                                <Controller
                                    control={control}
                                    name='lastname'
                                    rules={rules.lastname}
                                    render={({ field: { value, onChange } }) => 
                                        <TextInput 
                                            value={value}
                                            placeholder='Фамилия *'
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
                                            placeholder='Имя *'
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
                                            placeholder='Отчество'
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
                                            label='Дата рождения'
                                            valueColor={value ? '#252526' : '#808080'}
                                            value={value || 'Не указано'}
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
                                            label={value || 'Гражданство'}
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
                                        children="Номер телефона"
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
                                        children="Зарегистрирован в WhatsApp"
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
                                        children="Доп.номер"
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
                                        children="Зарегистрирован в WhatsApp"
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
                                    label='ВУ'
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
                                                    placeholder='Номер ВУ' 
                                                    onChangeText={onChange}
                                                    placeholderTextColor={"#252526"}
                                                />
                                            }
                                        />
                                    }
                                />
                                <ErrorsInput error={errors.vy?.message} />
                                <Selector 
                                    label='Дата выдачи'
                                    rightContent={
                                        <Controller
                                            control={control}
                                            rules={rules.issueDate}
                                            name='issueDate'
                                            render={({ field: { value, onChange } }) => 
                                                <MaskedTextInput
                                                    mask='99.99.9999'
                                                    placeholder='Не указано' 
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
                        <LightText lineHeight={17} size={14} color='#808080'>
                            Укажите номер и дату выдачи водительского удостоверения 
                        </LightText>
                        <View style={styles.footer}>
                            <TextButton  
                                disabled={loading}
                                loading={loading}
                                label={isProfile ? 'сохранить изменения' : 'продолжить'}
                                onPress={onSubmit}
                            />
                            {
                                isProfile && 
                                <TextButton  
                                    label={'Выйти'}
                                    background='red'
                                    onPress={handleLogout}
                                />
                            }
                            
                        </View>
                    </View>
                </ScrollView>

                <Modal 
                    modalVisible={modalCitizenship}
                    data={[{value: 'РК'}]}
                    handleClose={() => setModalCitizenship(false)}
                    handleSelectValue={(value: string) => {
                        setValue('citizenship', value, { shouldValidate: true })
                        setModalCitizenship(false)
                    }}
                />
                <Modal 
                    modalVisible={modalIsWhatsApp}
                    data={[{value: 'Да'}, {value: 'Нет'}]}
                    handleClose={() => setModalIsWhatsApp(false)}
                    handleSelectValue={(value: string) => {
                        setValue('isWhatsApp', value)
                        setModalIsWhatsApp(false)
                    }}
                />
                <Modal 
                    modalVisible={modalIsWhatsAppAditional}
                    data={[{value: 'Да'}, {value: 'Нет'}]}
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