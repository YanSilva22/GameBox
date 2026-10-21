
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderGameBox from './src/components/HeaderGameBox';
import { colors } from './src/constants/colors';

const palette = colors.dark;

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      <View style={styles.container}>
        <HeaderGameBox />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.background,
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
});
