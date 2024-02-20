import { NavigationContainer } from '@react-navigation/native'

import { AuthRoutes } from './auth.routes'
import { StackRoutes } from './stack.routes'
import { useAuthStore } from '@/store/authStore'

export function Routes() {
  const user = useAuthStore((state) => state.user)
  const isAuth = !!user

  return (
    <NavigationContainer>
      {isAuth ? <StackRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}
