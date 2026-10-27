import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const { colors, spacing, radius } = theme;

export default function HeaderPages({ icon, title, subtitle }) {
    return (
        <View style={styles.container}>
            <View style={styles.icon}>
                <MaterialCommunityIcons
                    name={icon}
                    size={26}
                    color={colors.textSecondary}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        alignSelf: 'center',
        paddingVertical: spacing.sm + 2,
        paddingHorizontal: spacing.md,
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        gap: spacing.md,
    },

    textContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },

    title: {
        color: colors.text,
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
    },

    subtitle: {
        color: colors.textSecondary,
        fontSize: 12,
        textAlign: 'center',
    },

    icon: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});