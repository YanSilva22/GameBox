import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import NavigationBar from '../components/NavigationBar';
import HeaderPages from '../components/HeaderPages';
import { theme } from '../constants/theme';

const { colors, spacing } = theme;

export default function GamesScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          <HeaderPages
            icon="gamepad"
            iconColor= {colors.colorHeaderPages}
            title="Modos de jogo"
            subtitle="Monte sua partida do seu jeito"
          />
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
    paddingBottom: spacing.md,
    gap: spacing.md,
  },
});
