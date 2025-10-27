import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export const withSafeArea = (component: () => React.ReactNode) => () =>
    <SafeAreaProvider>{component()}</SafeAreaProvider>
