import React from "react";
import { AppStack } from "./navigation";
import { withProviders } from "./providers";
import { StatusBar, useColorScheme } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

function App() {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <SafeAreaView style={{flex: 1}}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <AppStack />
        </SafeAreaView>
    )
}

const AppWithProviders = withProviders(App);

export default () =>
    <>
        {AppWithProviders()}
    </>
;
