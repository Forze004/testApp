import { NavigatorScreenParams } from "@react-navigation/native"

export type AppStackParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>
  BottomBarStack: NavigatorScreenParams<BottomBarParamList>
}

export type AuthStackParamList = {
  PhoneScreen: undefined
  CodeScreen: undefined
  RoleScreen: undefined
  DriverScreen: undefined
}

export type BottomBarParamList = {
  TransportationScreen: undefined
  ProfileScreen: undefined
}