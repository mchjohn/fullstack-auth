import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { RootStackParamList } from './type'

import { Home } from '@/screens/Home'

const Stack = createNativeStackNavigator<RootStackParamList>()

export function StackRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  )
}
