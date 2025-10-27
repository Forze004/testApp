import { ParamListBase, useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { AppStackParamList } from '../../types/navigation'

export const useAppNavigation = <T extends ParamListBase =
AppStackParamList>() => {
    const navigation = useNavigation<StackNavigationProp<T>>()
    return navigation
}
