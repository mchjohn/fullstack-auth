import { NavigationContainer } from '@react-navigation/native'

import { AuthRoutes } from './auth.routes'
import { StackRoutes } from './stack.routes'

const isAuth = true

export function Routes() {
  return (
    <NavigationContainer>
      {isAuth ? <StackRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}
