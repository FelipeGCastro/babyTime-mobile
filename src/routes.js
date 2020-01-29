import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Main from './screens/Main'
import SignUp from './screens/SignUp'

const MainStack = createStackNavigator({
  Main
},
{
  headerMode: 'none'
}
)

const Routes = createAppContainer(
  createSwitchNavigator({
    MainStack,
    SignUp
  })
)

export default Routes
