import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { theme } from '../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { colors, spacing, radius } = theme;

export default function LastMatchCard({}) {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text}>Última Partida</Text>
                <Pressable style={styles.button} onPress={() => navigation.navigate('ScoreScreen')}>
                    <Text style={styles.buttonText}>Ver Resultado</Text>
                </Pressable>
            </View>
            <View style={styles.matchResult}>
                <View style={styles.icon}>
                    <MaterialCommunityIcons
                        name="trophy"
                        size={24}
                        color="#C8F45B"
                    />
                </View>
                <View style={styles.matchInfo}>
                    <Text style={styles.winningTeam}>Nome Time ganhador</Text>
                    <Text style={styles.matchDate}>Data da partida</Text>
                </View>
                <View style={styles.matchScore}>
                    <Text style={styles.textScore}>Score da partida aqui</Text>
                    <Text style={styles.teams}>Xandão vs Baiano</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: spacing.md,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  text: {
    color: '#F5F5FF',
    fontSize: 16,
    fontWeight: '700',
  },

  button: {
    paddingVertical: 4,
    paddingLeft: 8,
  },

  buttonText: {
    color: '#9B5CFF',
    fontSize: 13,
    fontWeight: '600',
  },

  matchResult: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B1D31',
    borderRadius: 20,
    padding: spacing.md,
    gap: 12,
    minHeight: 74,
  },

  icon: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: '#303B2A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  matchInfo: {
    flex: 1,
    minWidth: 0,
    gap: 5,
  },

  winningTeam: {
    color: '#F5F5FF',
    fontSize: 14,
    fontWeight: '700',
  },

  matchDate: {
    color: '#9B9DB5',
    fontSize: 10,
  },

  matchScore: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 5,
    flexShrink: 0,
  },

  textScore: {
    color: '#F5F5FF',
    fontSize: 12,
    fontWeight: '800',
  },

  teams: {
    color: '#9B9DB5',
    fontSize: 10,
  },
});