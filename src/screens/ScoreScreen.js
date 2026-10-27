import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import NavigationBar from '../components/NavigationBar';
import HeaderPages from '../components/HeaderPages';
import { theme } from '../constants/theme';

const { colors, spacing } = theme;

export default function ScoreScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          <HeaderPages
            icon="podium-gold"
            iconColor= {colors.colorHeaderPages1}
            title="Placar"
            subtitle="Confira os resultados das partidas"
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
