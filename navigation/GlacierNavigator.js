import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ThreadScreen from '../screens/ThreadScreen'

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
    },
    Thread: {
        screen: ThreadScreen
    }
}, {
    initialRouteName: 'Home',
    headerMode: 'none'
});

const AuthNavigator = createStackNavigator({
    Login: LoginScreen
}, {
    initialRouteName: 'Login',
    headerMode: 'none'
})

export default AppContainer = createAppContainer(createSwitchNavigator({
    App: AppNavigator,
    Auth: AuthNavigator
}, {
    initialRouteName: 'Auth'
}));
