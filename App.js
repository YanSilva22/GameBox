import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import GamesScreen from './src/screens/GamesScreen';
import ScoreScreen from './src/screens/ScoreScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import GameConfigScreen from './src/screens/GameConfigScreen';
import GameConfigScreen2 from './src/screens/GameConfigScreen2';
import { theme } from './src/constants/theme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { colors, spacing } = theme;
const Stack = createNativeStackNavigator(); 

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{headerShown: false, animation: 'none',}}>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen
          name="GameScreen"
          component={GamesScreen}
        />
        <Stack.Screen
          name="GameConfig"
          component={GameConfigScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
            name="GameConfigScreen2"
            component={GameConfigScreen2}
        />
        <Stack.Screen
          name="ScoreScreen"
          component={ScoreScreen}
        />
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
