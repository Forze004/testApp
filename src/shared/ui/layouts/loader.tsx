import { ActivityIndicator, StyleSheet, View } from "react-native"

export const Loader = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#05C0E6" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff"
    },
})