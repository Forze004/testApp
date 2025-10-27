import React from 'react'
import { AppFlowProvider } from '../../processes/app-flow'

export const withAppFlow = (component: () => React.ReactNode) => () =>
    <AppFlowProvider>{component()}</AppFlowProvider>