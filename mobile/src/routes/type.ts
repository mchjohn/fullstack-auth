export type RootStackParamList = {
  Home: undefined
}

export type RootAuthParamList = {
  SignIn: undefined
  SignUp: undefined
}

export type RootRoutes = RootStackParamList & RootAuthParamList
