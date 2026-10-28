import { View, Text, StyleSheet, Pressable } from 'react-native';
import { theme } from '../constants/theme';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import AnimatedCard from './AnimatedCard';

const { colors, spacing, radius } = theme;

export default function CardGameMode({ icon, title, subtitle, color, backgroundColor, selected, onPress }) {
    return (
        <AnimatedCard selected={selected} onPress={onPress} style={styles.buttonCard}>
                <View style={[styles.icon, { backgroundColor }]}>
                    <MaterialCommunityIcons
                        name={icon}
                        size={24}
                        color={color}
                    />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                </View>
        </AnimatedCard>
    );
}

const styles = StyleSheet.create({
    buttonCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.cardBackground,
        borderWidth: 1.5,
        borderColor: colors.border,
        padding: spacing.md,
        borderRadius: 20,
        gap: spacing.md,
        minHeight: 90,
    },

    icon: {
        width: 48,
        height: 48,
        borderRadius: radius.md,
        alignItems: 'center',
        justifyContent: 'center',
    },

    textContainer: {
        flex: 1,
        gap: 4,
    },

    title: {
        color: colors.text,
        fontSize: 14,
        fontWeight: '700',
    },

    subtitle: {
        color: colors.textSecondary,
        fontSize: 12,
    },
});
