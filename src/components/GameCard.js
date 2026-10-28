import { View, Text, StyleSheet, Pressable } from 'react-native';
import { theme } from '../constants/theme';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import AnimatedCard from './AnimatedCard';

const { colors, spacing, radius } = theme;

export default function GameCard({ selected, onPress }) {
    return (
        <AnimatedCard selected={selected} onPress={onPress} style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.icon}>
                        <MaterialCommunityIcons
                            name="layers"
                            size={32}
                            color={colors.primary}
                        />
                    </View>

                    <View style={styles.textContent}>
                        <Text style={styles.title}>
                            Partida personalizada
                        </Text>
                        <Text style={styles.subtitle}>
                            Combine vários modos em uma partida
                        </Text>
                    </View>
                </View>

                <View style={styles.gameMode}>
                    <View style={styles.quizMode}>
                        <MaterialCommunityIcons
                            name="brain"
                            size={20}
                            color="#A78BFA"
                        />
                        <Text style={styles.quizText}>Quiz</Text>
                    </View>

                    <View style={styles.timerMode}>
                        <MaterialCommunityIcons
                            name="timer-outline"
                            size={20}
                            color="#22D3EE"
                        />
                        <Text style={styles.timerText}>
                            Desafio de Tempo
                        </Text>
                    </View>

                    <View style={styles.hotPotatoMode}>
                        <MaterialCommunityIcons
                            name="bomb"
                            size={20}
                            color="#C4F05A"
                        />
                        <Text style={styles.hotPotatoText}>
                            Batata Quente
                        </Text>
                    </View>
                </View>
            </View>
        </AnimatedCard>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: colors.cardBackground,
        borderRadius: radius.lg,
        padding: spacing.md,
        gap: spacing.md,
    },

    content: {
        gap: spacing.md,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },

    icon: {
        width: 64,
        height: 64,
        borderRadius: radius.lg,
        backgroundColor: colors.quizBackground,
        alignItems: 'center',
        justifyContent: 'center',
    },

    textContent: {
        flex: 1,
        gap: 4,
    },

    title: {
        color: colors.text,
        fontSize: 18,
        fontWeight: '700',
    },

    subtitle: {
        color: colors.textSecondary,
        fontSize: 12,
    },

    gameMode: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        gap: 4,
    },

    quizMode: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingVertical: spacing.xs,
        paddingHorizontal: 6,
        borderWidth: 1,
        borderColor: colors.quizBorder,
        backgroundColor: colors.quizBackground,
        borderRadius: radius.round,
    },

    quizText: {
        color: colors.quizText,
        fontSize: 11,
        fontWeight: '600',
    },

    timerMode: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingVertical: spacing.xs,
        paddingHorizontal: 6,
        borderWidth: 1,
        borderColor: colors.timerBorder,
        backgroundColor: colors.timerBackground,
        borderRadius: radius.round,
    },

    timerText: {
        color: colors.timerText,
        fontSize: 10,
        fontWeight: '600',
    },

    hotPotatoMode: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingVertical: spacing.xs,
        paddingHorizontal: 6,
        borderWidth: 1,
        borderColor: colors.teamBorder,
        backgroundColor: colors.teamBackground,
        borderRadius: radius.round,
    },

    hotPotatoText: {
        color: colors.teamText,
        fontSize: 10,
        fontWeight: '600',
    },

    buttonContainer: {
        width: '100%',
    },

    button: {
        minHeight: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
        paddingHorizontal: spacing.md,
        backgroundColor: colors.primary,
        borderRadius: radius.md,
    },

    buttonText: {
        color: colors.text,
        fontSize: 14,
        fontWeight: '700',
    },
});
