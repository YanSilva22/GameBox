import { View, Text, StyleSheet, Pressable, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderBack from '../components/HeaderBack';
import Button from '../components/Button';
import ActionCard from '../components/ActionCard';
import { theme } from '../constants/theme';

const { colors, spacing, radius } = theme;

export default function GameConfigScreen2(){
    const route = useRoute();
    const { selectedCard, teams = [], } = route.params ?? {};

    const navigation = useNavigation();

    const [limitType, setLimitType] = useState('time');
    const [timeLimit, setTimeLimit] = useState('10');
    const [scoreLimit, setScoreLimit] = useState(100);

    function changeScoreLimit(direction) {
        setScoreLimit((current) =>
            Math.max(100, current + direction * 25)
        );
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
                            Quando a partida termina?
                        </Text>

                        <Text style={styles.description}>
                            Escolha se a partida será encerrada por tempo
                            ou por pontuação e defina o limite desejado.
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
                            Como deseja encerrar a partida?
                        </Text>

                        <View style={styles.buttonInput}>
                            <Pressable
                                style={[
                                    styles.optionButton,
                                    limitType === 'time' && styles.optionActive,
                                ]}
                                onPress={() => setLimitType('time')}
                            >
                                <Feather
                                    name="clock"
                                    size={18}
                                    color={limitType === 'time' ? colors.text : colors.textSecondary}
                                />
                                <Text
                                    style={[
                                        styles.optionText,
                                        limitType === 'time' && styles.optionTextActive,
                                    ]}
                                >
                                    Por tempo
                                </Text>
                            </Pressable>

                            <Pressable
                                style={[
                                    styles.optionButton,
                                    limitType === 'score' && styles.optionActive,
                                ]}
                                onPress={() => setLimitType('score')}
                            >
                                <Feather
                                    name="award"
                                    size={18}
                                    color={limitType === 'score' ? colors.text : colors.textSecondary}
                                />
                                <Text
                                    style={[
                                        styles.optionText,
                                        limitType === 'score' && styles.optionTextActive,
                                    ]}
                                >
                                    Por pontuação
                                </Text>
                            </Pressable>
                        </View>

                        {limitType === 'time' && (
                            <View style={styles.limitContainer}>
                                <Text style={styles.limitTitle}>Duração da partida</Text>

                                <View style={styles.inputRow}>
                                    <TextInput
                                        style={styles.valueInput}
                                        value={timeLimit}
                                        onChangeText={setTimeLimit}
                                        keyboardType="number-pad"
                                        placeholder="Ex.: 10"
                                        placeholderTextColor={colors.textSecondary}
                                    />
                                    <Text style={styles.unitText}>minutos</Text>
                                </View>

                                <Text style={styles.helperText}>
                                    A partida termina quando o tempo definido acabar.
                                </Text>
                            </View>
                        )}

                        {limitType === 'score' && (
                            <View style={styles.limitContainer}>
                                <Text style={styles.limitTitle}>Pontuação para vencer</Text>

                                <View style={styles.scoreSelector}>
                                    <Pressable
                                        style={styles.scoreButton}
                                        onPress={() => changeScoreLimit(-1)}
                                        disabled={scoreLimit <= 100}
                                    >
                                        <Feather
                                            name="minus"
                                            size={20}
                                            color={scoreLimit <= 100 ? colors.textSecondary : colors.text}
                                        />
                                    </Pressable>

                                    <Text style={styles.scoreValue}>{scoreLimit} pts</Text>

                                    <Pressable
                                        style={styles.scoreButton}
                                        onPress={() => changeScoreLimit(1)}
                                    >
                                        <Feather
                                            name="plus"
                                            size={20}
                                            color={colors.text}
                                        />
                                    </Pressable>
                                </View>

                                <Text style={styles.helperText}>
                                    Cada acerto vale 25 pontos para a equipe.
                                </Text>
                            </View>
                        )}
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
        
    },

    scrollContent: {
        flexGrow: 1,
    },

    container: {
        flex: 1,
        padding: spacing.md,
        gap: spacing.md,
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

    buttonInput: {
        flexDirection: 'row',
        gap: spacing.sm,
    },

    optionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.xs,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.sm,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.background,
    },

    optionActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },

    optionText: {
        color: colors.textSecondary,
        fontSize: 13,
        fontWeight: '500',
    },

    optionTextActive: {
        color: colors.text,
        fontWeight: '600',
    },

    limitContainer: {
        gap: spacing.sm,
        marginTop: spacing.xs,
    },

    limitTitle: {
        color: colors.text,
        fontSize: 14,
        fontWeight: '600',
    },

    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },

    valueInput: {
        flex: 1,
        backgroundColor: colors.background,
        color: colors.text,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.md,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        fontSize: 16,
    },

    unitText: {
        color: colors.textSecondary,
        fontSize: 14,
    },

    scoreSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.background,
        borderRadius: radius.md,
        padding: spacing.sm,
    },

    scoreButton: {
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: radius.md,
        backgroundColor: colors.surfaceSecondary,
    },

    scoreValue: {
        color: colors.text,
        fontSize: 20,
        fontWeight: '700',
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