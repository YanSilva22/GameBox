import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../constants/theme';

const { colors, spacing, radius } = theme;

export default function HeaderBack({ title, subtitle, step, page, params }) {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable
                    style={({ pressed }) => [
                        styles.backButton,
                        pressed && styles.backButtonPressed,
                    ]}
                    onPress={() => {
                        if (page) {
                            navigation.navigate(page, params);
                        }
                    }}
                >
                    <Feather
                        name="arrow-left"
                        size={20}
                        color={colors.text}
                    />
                </Pressable>

                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                </View>
            </View>

            {step && (
                <Text style={styles.step}>{step}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: spacing.md,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },

    backButton: {
        width: 40,
        height: 40,
        borderRadius: radius.md,
        backgroundColor: colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
    },

    backButtonPressed: {
        backgroundColor: colors.primary,
        transform: [{ scale: 0.90 }],
        opacity: 0.8,
    },

    textContainer: {
        flex: 1,
        gap: spacing.xs,
    },

    title: {
        color: colors.text,
        fontSize: 20,
        fontWeight: '700',
    },

    subtitle: {
        color: colors.textSecondary,
        fontSize: 12,
    },

    step: {
        color: colors.textSecondary,
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
});
