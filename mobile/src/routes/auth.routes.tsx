import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { RootAuthParamList } from './type'

import { SignIn } from '@/screens/SignIn'
import { SignUp } from '@/screens/SignUp'

const Stack = createNativeStackNavigator<RootAuthParamList>()

export function AuthRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  )
}
