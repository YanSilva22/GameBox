import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

import NavigationBar from '../components/NavigationBar';
import HeaderPages from '../components/HeaderPages';
import GameCard from '../components/GameCard';
import CardGameMode from '../components/CardGameMode';
import Button from '../components/Button';
import { theme } from '../constants/theme';

const { colors, spacing } = theme;

export default function GamesScreen() {
  const [selectedCard, setSelectedCard] = useState(null);
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
          <GameCard selected={selectedCard === 1} onPress={() => setSelectedCard(1)} />

          <CardGameMode
            icon="brain"
            title="Quiz"
            subtitle="Perguntas para testar o que a galera sabe."
            color={colors.quizText}
            backgroundColor={colors.quizBackground}
            selected={selectedCard === 2}
            onPress={() => setSelectedCard(2)}
          />

          <CardGameMode
            icon="clock"
            title="Acerte o tempo"
            subtitle="Teste sua percepção de tempo."
            color={colors.timerText}
            backgroundColor={colors.timerBackground}
            selected={selectedCard === 3}
            onPress={() => setSelectedCard(3)}
          />
          <CardGameMode
            icon="bomb"
            title="Batata quente"
            subtitle="Passe a batata antes que o tempo acabe."
            color={colors.teamText}
            backgroundColor={colors.teamBackground}
            selected={selectedCard === 4}
            onPress={() => setSelectedCard(4)}
          />
          <Button
            title="Continuar"
            color={colors.primary}
            onPress= {() => console.log("Teste")}
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
