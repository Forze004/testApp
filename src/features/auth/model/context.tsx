import { createContext, useContext, useEffect, useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { DateTime } from "luxon";
import { Platform } from "react-native";
import { dateFormat } from "../../../shared/lib/date";
import { useAppFlow } from "../../../processes/app-flow";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LANGUAGE_KEY } from "../../../shared/constants/key";

export const AuthContext = createContext({} as ReturnType<typeof useAuth>);
export const useAuthContext = () => useContext(AuthContext);
export const { Provider: AuthContextProvider } = AuthContext;


type UserIn = {
    phone: string
    code: string
    role: string
    lastname: string
    name: string
    surname: string
    birthday: string
    citizenship: string
    isWhatsApp: string
    additionalPhone: string
    isWhatsAppAditional: string
    vy: string
    issueDate: string
}

const defaultValues = {
    phone: "",
    role: "",
    code: "",
    lastname: "",
    name: "",
    surname: "",
    birthday: "",
    citizenship: "",
    isWhatsApp: "-",
    additionalPhone: "",
    isWhatsAppAditional: "-",
    vy: "",
    issueDate: ""
}

export const useAuth = () => {
    const { t, i18n } = useTranslation();
    const { control, handleSubmit, reset, getValues, watch, setValue, setError, clearErrors } = useForm<UserIn>({
        mode: "onChange",
        defaultValues,
    });
    const { errors } = useFormState<UserIn>({ control });
    const {signIn, signOut, state} = useAppFlow()
    const [loading, setLoading] = useState<boolean>(false)
    const [isProfile, setIsProfile] = useState<boolean>(false)
    const [modalLanguage, setModalLanguage] = useState<boolean>(false);
    const [language, setLanguage] = useState<string>('');
    const birthdayValue = watch("birthday");
    const initialDate = birthdayValue
        ? DateTime.fromISO(birthdayValue).toJSDate()
        : new Date();

    const handleDatePicker = () => {
        if (Platform.OS === "android") {
            DateTimePickerAndroid.open({
                mode: "date",
                value: initialDate,
                positiveButton: { label: t('choose'), textColor: "#01163E" },
                negativeButton: { label: t('cancel'), textColor: "#01163E" },
                maximumDate: DateTime.now().toJSDate(),
                minimumDate: DateTime.fromObject({
                    year: 1950,
                    month: 1,
                    day: 1,
                }).toJSDate(),
                onChange(e, selectedDate: any) {
                    if (selectedDate) {
                        const selected = DateTime.fromJSDate(selectedDate);
                        const formatted = selected.toISODate();
                        setValue("birthday", `${dateFormat(formatted)}`);
                        
                        const now = DateTime.now();
                        const age = now.diff(selected, "years").years;
                        if (age < 18) {
                            setError("birthday", { type: "validate", message: t('minAge') });
                            return;
                        }
                        if (age >= 65) {
                            setError("birthday", { type: "validate", message: t('maxAge') });
                            return;
                        }
                        clearErrors("birthday");
                    }
                },
            })
        }
    }
    
    const onSubmit = handleSubmit(async (formData) => {
        setLoading(true)
        const delay = (ms: number) => new Promise<void>((resolve) => {
            setTimeout(() => resolve(), ms)
        });
        await delay(1000)
        signIn(JSON.stringify(formData))
        setLoading(false)
    }); 

    const checkDriver = async () => {
        if (state.token !== null) {
            setIsProfile(true)
            const driverParse = JSON.parse(state.token);
            const {
                lastname,  
                phone,
                name,
                surname,
                birthday,
                citizenship,
                isWhatsApp,
                additionalPhone,
                isWhatsAppAditional,
                vy,
                issueDate,
            } = driverParse
            
            setValue('lastname', lastname)
            setValue('name', name)
            setValue('surname', surname)
            setValue('phone', phone)
            setValue('birthday', birthday)
            setValue('citizenship', citizenship)
            setValue('isWhatsApp', isWhatsApp)
            setValue('additionalPhone', additionalPhone)
            setValue('isWhatsAppAditional', isWhatsAppAditional)
            setValue('vy', vy)
            setValue('issueDate', issueDate)
        }
    }

    const handleLogout = async () => {
        signOut()
        reset(defaultValues)
    }

    const handleSetLanguage = async () => {
       const lang =  await AsyncStorage.getItem(LANGUAGE_KEY)
       if (lang) {
         setLanguage(lang)
       }
    }

    const handleLanguage = async (value: string) => {
        const lang = value === "English" ? "en" : "ru"
        await AsyncStorage.setItem(LANGUAGE_KEY, lang)
        i18n.changeLanguage(lang)
        setLanguage(lang)
        setModalLanguage(false)
    }

    const toggleModalLanguage = () => setModalLanguage(prev => !prev)


    useEffect(() => {
        handleSetLanguage()
        checkDriver()
    }, [state]);

    return { 
        control,
        getValues,
        watch,
        setValue,
        errors,
        handleDatePicker,
        onSubmit,
        loading,
        isProfile,
        handleLogout,
        language,
        modalLanguage,
        handleLanguage,
        toggleModalLanguage
    };
};
