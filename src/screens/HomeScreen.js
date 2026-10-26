
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderGameBox from '../components/HeaderGameBox';
import GameBanner from '../components/GameBanner';
import NavigationBar from '../components/NavigationBar';
import LastMatchCard from '../components/LastMatchCard';

import { theme } from '../constants/theme';

const { colors, spacing } = theme;

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      <View style={styles.container}>
        <View style={styles.content}>
          <HeaderGameBox />
          <GameBanner />
          <LastMatchCard />
        </View>

        <NavigationBar />
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
  },

  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    gap: spacing.md,
  },
});
