import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppStackParamList } from '../../shared/types/navigation'
import { AuthScreen } from '../../screens/auth'
import { BottomBar } from './bottom-bar'
import { useAppFlow } from '../../processes/app-flow'
import { Loader } from '../../shared/ui/layouts'

const Stack = createNativeStackNavigator<AppStackParamList>()

export const AppStack = () => {
    const {state} = useAppFlow()

    if (state.isLoading) {
        return <Loader />
    }

    return ( 
        <Stack.Navigator>
            {state.token === null ? 
                <Stack.Screen
                    name='AuthStack'
                    component={AuthScreen}
                    options={{
                        headerShown: false,
                        animation: 'slide_from_right',
                    }}
                /> : <Stack.Screen
                    name="BottomBarStack"
                    component={BottomBar}
                    options={{
                        headerShown: false,
                        animation: 'slide_from_right',
                    }}
            />}
        </Stack.Navigator>
    )
}
