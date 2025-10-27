import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { BottomBarParamList } from '../../shared/types/navigation'
import { TransportationScreen } from '../../screens/transportation'
import { MenuIcon, TruckIcon } from '../../shared/ui/icons'
import { DriverScreen } from '../../features/auth/ui/Driver'
import { AuthContextProvider, useAuth } from '../../features/auth/model'

const TabBar = createBottomTabNavigator<BottomBarParamList>()

const INACTIVE_COLOR = "#D9D9D9"
const ACTIVE_COLOR = "#05C0E6"

export const BottomBar = () => {
    const value = useAuth()
    
    return (
        <AuthContextProvider value={value}>
            <TabBar.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName={'ProfileScreen'}
            >
                <TabBar.Screen 
                    name={'TransportationScreen'}
                    options={{
                        tabBarLabel: 'Перевозки',
                        tabBarActiveTintColor: ACTIVE_COLOR,
                        tabBarInactiveTintColor: INACTIVE_COLOR,
                        tabBarIcon: ({ focused }) => 
                            <TruckIcon 
                                stroke={focused ? ACTIVE_COLOR : INACTIVE_COLOR} 
                            />,
                    }}
                    component={TransportationScreen}
                />
                <TabBar.Screen
                    name={'ProfileScreen'}
                    options={{
                        tabBarLabel: 'Меню',
                        tabBarActiveTintColor: ACTIVE_COLOR,
                        tabBarInactiveTintColor: INACTIVE_COLOR,
                        tabBarIcon: ({ focused }) => 
                            <MenuIcon 
                                stroke={focused ? ACTIVE_COLOR : INACTIVE_COLOR} 
                            />,
                    }}
                    component={DriverScreen}
                />
            </TabBar.Navigator>
        </AuthContextProvider>
    )
}
