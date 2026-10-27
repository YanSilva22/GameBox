import { View, Text, StyleSheet, Pressable } from 'react-native';
import { theme } from '../constants/theme';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';    

const { colors, spacing, radius } = theme;

export default function ActionCard({ icon, title, subtitle, color, backgroundColor, onPress }) {
    return (
        <View style={styles.container}>
            <Pressable style={styles.buttonCard} onPress={onPress}>
                <View style={[styles.icon, { backgroundColor: backgroundColor }]}>
                    <Feather
                        name={icon} 
                        size={24} 
                        color={color} 
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                </View>
                <View style={styles.arrowRight}>
                    <Feather
                        name="chevron-right"
                        size={24}
                        color={colors.textSecondary}
                    />
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },

    buttonCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.cardBackground,
        padding: spacing.md,
        borderRadius: 20,
        gap: spacing.md,
        minHeight: 84,
    },

    buttonPressed: {
        opacity: 0.7,
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

    ArrowRight: {
        alignItems: 'center',
        justifyContent: 'center',
    },
})