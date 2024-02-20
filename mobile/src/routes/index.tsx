import { NavigationContainer } from '@react-navigation/native'

import { AuthRoutes } from './auth.routes'
import { StackRoutes } from './stack.routes'

const isAuth = false

export function Routes() {
  return (
    <NavigationContainer>
      {isAuth ? <StackRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}
