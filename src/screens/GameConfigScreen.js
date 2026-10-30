import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';


import HeaderBack from '../components/HeaderBack';
import Button from '../components/Button';
import { theme } from '../constants/theme';

const { colors, spacing, radius } = theme;

export default function GameConfigScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { selectedCard } = route.params ?? {};

    const [teams, setTeams] = useState([
        { id: 1, name: 'Equipe 1', players: 1 },
        { id: 2, name: 'Equipe 2', players: 1 },
    ]);

    function updateTeamName(id, name) {
        setTeams(current => current.map(team => team.id === id ? { ...team, name } : team));
    }

    function updatePlayers(id, amount) {
        setTeams(current => current.map(team => team.id === id ? { ...team, players: Math.max(1, team.players + amount) } : team));
    }

    const titles = {
        1: 'Personalize sua partida',
        2: 'Prepare-se para o Quiz',
        3: 'Desafie o tempo',
        4: 'A batata vai passar!',
    };

    const subtitles = {
        1: 'Combine os modos e reúna as equipes.',
        2: 'Organize as equipes e teste seus conhecimentos.',
        3: 'Prepare tudo para testar sua percepção de tempo.',
        4: 'Reúna as equipes e prepare-se para a diversão.',
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <HeaderBack
                    title={titles[selectedCard]}
                    subtitle={subtitles[selectedCard]}
                    step="Passo 1 de 2"
                    page="GameScreen"
                />

                <View style={styles.progress}>
                    <View style={styles.progressActive} />
                    <View style={styles.progressInactive} />
                </View>

                <View style={styles.intro}>
                    <Text style={styles.heading}>
                        Crie suas equipes
                    </Text>

                    <Text style={styles.description}>
                        Escolha um nome e defina o número de jogadores
                        de cada equipe.
                    </Text>
                </View>

                <View style={styles.teams}>
                    {teams.map((team, index) => (
                        <View key={team.id} style={styles.teamCard}>
                            <View style={styles.teamHeader}>
                                <Feather
                                    name="users"
                                    size={20}
                                    color={ index === 0 ? colors.primary : colors.secondary}
                                />

                                <Text style={styles.teamLabel}>
                                    Equipe {index + 1}
                                </Text>
                            </View>

                            <TextInput
                                style={styles.input}
                                value={team.name}
                                onChangeText={name => updateTeamName(team.id, name)}
                                placeholder="Nome da equipe"
                                placeholderTextColor={colors.textSecondary}
                                maxLength={24}
                            />

                            <View style={styles.playersRow}>
                                <Text style={styles.playersLabel}>
                                    Jogadores
                                </Text>

                                <View style={styles.counter}>
                                    <Pressable
                                        style={({ pressed }) => [
                                            styles.counterButton,
                                            pressed && styles.counterButtonPressed,
                                        ]}
                                        onPress={() => updatePlayers(team.id, -1)}
                                        disabled={team.players <= 1}
                                    >
                                        <Feather
                                            name="minus"
                                            size={18}
                                            color={team.players <= 1 ? colors.textSecondary : colors.text}
                                        />
                                    </Pressable>

                                    <Text style={styles.playersCount}>
                                        {team.players}
                                    </Text>

                                    <Pressable
                                        style={({ pressed }) => [
                                            styles.counterButton,
                                            pressed && styles.counterButtonPressed,
                                        ]}
                                        onPress={() => updatePlayers(team.id, 1)}
                                    >
                                        <Feather
                                            name="plus"
                                            size={18}
                                            color={colors.text}
                                        />
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.footer}>
                    <Button
                        title="Próximo: revisar"
                        color={colors.primary}
                        onPress={() => navigation.navigate('GameConfigScreen2', { selectedCard, teams })}
                    />

                    <Text style={styles.footerHint}>
                        Revise as equipes antes de começar.
                    </Text>
                </View>
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

    progressInactive: {
        flex: 1,
        height: 4,
        borderRadius: radius.round,
        backgroundColor: colors.border,
    },

    intro: {
        gap: spacing.xs,
    },

    heading: {
        color: colors.text,
        fontSize: 24,
        fontWeight: '700',
    },

    description: {
        color: colors.textSecondary,
        fontSize: 13,
        lineHeight: 19,
    },

    teams: {
        gap: spacing.md,
    },

    teamCard: {
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        padding: spacing.md,
        gap: spacing.sm,
    },

    teamHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },

    teamLabel: {
        color: colors.text,
        fontSize: 14,
        fontWeight: '700',
        flex: 1,
    },

    input: {
        color: colors.text,
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.md,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        fontSize: 14,
    },

    playersRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    playersLabel: {
        color: colors.textSecondary,
        fontSize: 13,
    },

    counter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },

    counterButton: {
        width: 34,
        height: 34,
        borderRadius: radius.md,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },

    counterButtonPressed: {
        backgroundColor: colors.primary,
        transform: [{ scale: 0.90 }],
        opacity: 0.8,
    },

    playersCount: {
        color: colors.text,
        fontSize: 16,
        fontWeight: '700',
        minWidth: 20,
        textAlign: 'center',
    },

    footer: {
        marginTop: 'auto',
        gap: spacing.sm,
    },

    footerHint: {
        color: colors.textSecondary,
        fontSize: 11,
        textAlign: 'center',
    },
});
