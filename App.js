
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderGameBox from './src/components/HeaderGameBox';
import GameBanner from './src/components/GameBanner';
import { theme } from './src/constants/theme';

const { colors, spacing } = theme;

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <HeaderGameBox />
        <GameBanner />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    paddingHorizontal: spacing.md + 4,
    paddingTop: spacing.sm + 4,
    gap: spacing.md,
  },
});
