import { View, Text, StyleSheet, Pressable } from 'react-native';
import { theme } from '../constants/theme';

const { colors, spacing, radius } = theme;

export default function Button({ title, color, onPress }) {
    return (
        <View style={styles.container}>
            <Pressable style={({ pressed }) => [ styles.button, { backgroundColor: color }, pressed && { opacity: 0.7, transform: [{ scale: 0.97 }] },]} onPress={onPress}>
                <Text style={styles.textButton}>
                    {title}
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.md,
        borderRadius: radius.round,
        minHeight: 48,
    },

    textButton: {
        color: colors.text,
        fontSize: 16,
        fontWeight: '700',
    },
});