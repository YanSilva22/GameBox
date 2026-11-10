import { View, Text, StyleSheet, Pressable, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HeaderBack from '../components/HeaderBack';
import Button from '../components/Button';
import ActionCard from '../components/ActionCard';
import { theme } from '../constants/theme';

const { colors, spacing, radius } = theme;

export default function GameConfigScreen2(){
    const route = useRoute();
    const { selectedCard, teams = [], } = route.params ?? {};

    const navigation = useNavigation();


    const [rounds, setRounds] = useState({
        quiz: 1,
        time: 1,
        hotPotato: 1,
    });

    const gameModes = {
        1: [
            {
                id: 'quiz',
                title: 'Quiz',
                description: 'Rodadas de perguntas e respostas',
                icon: 'brain',
            },
            {
                id: 'time',
                title: 'Acerte o tempo',
                description: 'Rodadas para acertar o tempo',
                icon: 'clock',
            },
            {
                id: 'hotPotato',
                title: 'Batata quente',
                description: 'Rodadas de batata quente',
                icon: 'bomb',
            },
        ],
        2: [
            {
                id: 'quiz',
                title: 'Quiz',
                description: 'Rodadas de perguntas e respostas',
                icon: 'brain',
            },
        ],
        3: [
            {
                id: 'time',
                title: 'Acerte o tempo',
                description: 'Rodadas para acertar o tempo',
                icon: 'clock',
            },
        ],
        4: [
            {
                id: 'hotPotato',
                title: 'Batata quente',
                description: 'Rodadas de batata quente',
                icon: 'bomb',
            },
        ],
    };

    const selectedModes = gameModes[selectedCard] || gameModes[2];

    function changeRounds(mode, direction) {
        setRounds((current) => ({
            ...current,
            [mode]: Math.max(1, Math.min(99, current[mode] + direction)),
        }));
    }

    return(
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.container}>
                    <HeaderBack
                        title="Finalize a configuração"
                        subtitle="Defina as regras da partida"
                        step="Passo 2 de 2"
                        page="GameConfig"
                        params={{ selectedCard, teams }}
                    />

                    <View style={styles.progress}>
                        <View style={styles.progressActive} />
                        <View style={styles.progressActive} />
                    </View>

                    <View style={styles.intro}>
                        <Text style={styles.heading}>
                            Quantas rodadas terá a partida?
                        </Text>

                        <Text style={styles.description}>
                            Defina a quantidade de rodadas para cada modo de jogo.
                        </Text>
                    </View>
                    <View style={styles.cardConfig}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.title}>Sua partida</Text>

                            <View style={styles.modeBadge}>
                                <Text style={styles.modeBadgeText}>
                                    {selectedCard === 1
                                        ? 'Quiz · Desafie o tempo · Batata quente'
                                        : selectedCard === 2
                                            ? 'Quiz'
                                            : selectedCard === 3
                                                ? 'Desafie o tempo'
                                                : 'Batata quente'}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Modos</Text>

                            <Text style={styles.infoValue}>
                                {selectedCard === 1
                                    ? 'Quiz · Tempo · Equipe'
                                    : selectedCard === 2
                                        ? 'Quiz'
                                        : selectedCard === 3
                                            ? 'Acerte o tempo'
                                            : 'Batata quente'}
                            </Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Participantes</Text>

                            <Text style={styles.infoValue}>
                                {teams.reduce((total, team) => total + team.players, 0)} amigos
                            </Text>
                        </View>

                        <View style={styles.teamNames}>
                            {teams.map((team, index) => (
                                <Text key={team.id} style={styles.teamName}>
                                    {team.name || `Equipe ${index + 1}`}
                                    {index < teams.length - 1 ? ' × ' : ''}
                                </Text>
                            ))}
                        </View>
                    </View>

                    <View style={styles.cardTextInput}>
                        <Text style={styles.textEspec}>
                            Quantidade de rodadas
                        </Text>

                        <Text style={styles.description}>
                            Defina quantas rodadas cada modo terá na partida.
                        </Text>

                        {selectedModes.map((mode) => (
                            <View key={mode.id} style={styles.roundCard}>
                                <View style={styles.roundHeader}>
                                    <View style={styles.roundIcon}>
                                        <MaterialCommunityIcons 
                                            name={mode.icon}   
                                            size={20} 
                                            color={colors.primary} 
                                        />
                                    </View>

                                    <View style={styles.roundInfo}>
                                        <Text style={styles.roundTitle}>
                                            {mode.title}
                                        </Text>

                                        <Text style={styles.helperText}>
                                            {mode.description}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.roundSelector}>
                                    <Pressable
                                        style={styles.roundButton}
                                        onPress={() => changeRounds(mode.id, -1)}
                                        disabled={rounds[mode.id] <= 1}
                                    >
                                        <Feather
                                            name="minus"
                                            size={20}
                                            color={
                                                rounds[mode.id] <= 1
                                                    ? colors.textSecondary
                                                    : colors.text
                                            }
                                        />
                                    </Pressable>

                                    <View style={styles.roundValueContainer}>
                                        <Text style={styles.roundValue}>
                                            {rounds[mode.id]}
                                        </Text>

                                        <Text style={styles.helperText}>
                                            rodadas
                                        </Text>
                                    </View>

                                    <Pressable
                                        style={styles.roundButton}
                                        onPress={() => changeRounds(mode.id, 1)}
                                        disabled={rounds[mode.id] >= 99}
                                    >
                                        <Feather
                                            name="plus"
                                            size={20}
                                            color={
                                                rounds[mode.id] >= 99
                                                    ? colors.textSecondary
                                                    : colors.text
                                            }
                                        />
                                    </Pressable>
                                </View>
                            </View>
                        ))}
                    </View>

                    <ActionCard
                        icon="bookmark"
                        title="Salvar modelo"
                        subtitle="Acesse seus modelos salvos quando quiser!"
                        color={colors.colorActionCard2}
                        backgroundColor={colors.backgroundActionCard2}
                        onPress={() => navigation.navigate('GameScreen')}
                    />

                    <View style={styles.circuitConnect}>
                        <Feather name="check-square" size={14} color={colors.accent} />
                        <Text style={styles.helperText}>
                            GameBox conectado
                        </Text>
                    </View>

                    <Button
                        title="Iniciar"
                        color={colors.primary}
                        onPress={() => console.log("clicado")}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
        
    );
}


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },

    scrollView: {
        flex: 1,
    },

    scrollContent: {
        flexGrow: 1,
    },

    container: {
        flex: 1,
        padding: spacing.md,
        gap: spacing.md,
        backgroundColor: colors.background,
    },

    progress: {
        flexDirection: 'row',
        gap: spacing.xs,
    },

    progressActive: {
        flex: 1,
        height: 4,
        borderRadius: radius.round,
        backgroundColor: colors.primary,
    },

    intro: {
        gap: spacing.xs,
    },

    heading: {
        color: colors.text,
        fontSize: 22,
        fontWeight: '700',
    },

    description: {
        color: colors.textSecondary,
        fontSize: 13,
        lineHeight: 19,
    },

    cardConfig: {
        backgroundColor: colors.surface,
        padding: spacing.md,
        borderRadius: radius.lg,
        gap: spacing.md,
    },

    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    title: {
        color: colors.text,
        fontSize: 15,
        fontWeight: '700',
    },

    modeBadge: {
        backgroundColor: colors.surfaceSecondary,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: radius.round,
    },

    modeBadgeText: {
        color: colors.primary,
        fontSize: 11,
        fontWeight: '600',
    },

    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: spacing.sm,
    },

    infoLabel: {
        color: colors.textSecondary,
        fontSize: 12,
    },

    infoValue: {
        color: colors.text,
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'right',
        flexShrink: 1,
    },

    teamNames: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },

    teamName: {
        color: colors.primary,
        fontSize: 11,
        fontWeight: '600',
    },

    cardTextInput: {
        backgroundColor: colors.surface,
        padding: spacing.md,
        borderRadius: radius.lg,
        gap: spacing.md,
    },

    textEspec: {
        color: colors.text,
        fontSize: 15,
        fontWeight: '600',
    },

    roundCard: {
        backgroundColor: colors.surfaceSecondary,
        borderRadius: radius.md,
        padding: spacing.md,
        gap: spacing.md,
    },

    roundHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },

    roundIcon: {
        width: 40,
        height: 40,
        backgroundColor: colors.surface,
        borderRadius: radius.md,
        alignItems: 'center',
        justifyContent: 'center',
    },

    roundInfo: {
        flex: 1,
        gap: spacing.xs,
    },

    roundTitle: {
        color: colors.text,
        fontSize: 15,
        fontWeight: 'bold',
    },

    roundSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.xl,
    },

    roundButton: {
        width: 40,
        height: 40,
        borderRadius: radius.md,
        backgroundColor: colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
    },

    roundValueContainer: {
        alignItems: 'center',
        minWidth: 70,
        gap: spacing.xs,
    },

    roundValue: {
        color: colors.text,
        fontSize: 24,
        fontWeight: 'bold',
    },

    helperText: {
        color: colors.textSecondary,
        fontSize: 12,
        lineHeight: 18,
    },

    circuitConnect: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
});
