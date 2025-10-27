import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
    createContext,
    ReactNode,
    useEffect,
    useReducer,
} from 'react';
import { STORE_KEY } from '../../../shared/constants/key';

type AppFlowContextType = {
    state: {
        isLoading: boolean,
        isSignout: boolean,
        token: null
    },
    signIn: (data: any) => void
    signOut: () => void
};

export const AppFlowContext = createContext<AppFlowContextType | null>(null);

export const AppFlowProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(
        (prevState: any, action) => {
            switch (action.type) {
                case 'SIGN_IN':
                    return {
                        isLoading: false,
                        token: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        isLoading: false,
                        token: null,
                    };
            }
        },
        {
            isLoading: true,
            token: null
        }
    );


    const bootstrapAsync = async () => {
        const result = await AsyncStorage.getItem(STORE_KEY)
        if (result) {
            dispatch({ type: 'SIGN_IN', token: result });
        } else {
            dispatch({ type: 'SIGN_OUT' });
        }
    };

    const signIn = async (data: any) => {
        dispatch({ type: 'SIGN_IN', token: data });
        await AsyncStorage.setItem(STORE_KEY, data)
    }

    const signOut = async () => {
        dispatch({ type: 'SIGN_OUT' })
        await AsyncStorage.removeItem(STORE_KEY)
    }

    useEffect(() => {
        bootstrapAsync();
    }, []);


    return (
        <AppFlowContext.Provider 
            value={{
                state,
                signIn,
                signOut
            }}
        >
            {children}
        </AppFlowContext.Provider>
    );
};
