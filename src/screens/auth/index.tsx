import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthStackParamList } from '../../shared/types/navigation';
import { mappers } from '../../shared/lib';
import { AuthScreens } from '../../features/auth/ui';
import { AuthContextProvider, useAuth } from '../../features/auth/model';
 
const Stack = createNativeStackNavigator<AuthStackParamList>()

export const AuthScreen = () => {
    const value = useAuth()

    return (
        <AuthContextProvider value={value}>
            <Stack.Navigator initialRouteName='PhoneScreen'>
                {mappers.objectToTypedArray(AuthScreens).map((screen) => 
                    <Stack.Screen
                        key={screen}
                        name={screen}
                        component={AuthScreens[screen]}
                        options={{
                            headerShown: false
                        }}
                    />)}
            </Stack.Navigator>
        </AuthContextProvider>
    )
};
