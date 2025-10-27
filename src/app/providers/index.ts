import compose from 'compose-function'
import { withNavigation } from './with-navigation'
import { withSafeArea } from './with-safe-area'
import { withAppFlow } from './with-app'

export const withProviders = compose(
    withSafeArea,
    withAppFlow,
    withNavigation
)
