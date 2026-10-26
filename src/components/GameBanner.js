import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { theme } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';

const { colors, spacing, radius } = theme;

export default function GameBanner() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.information}>
                    <Text style={styles.title}>
                        Diversão em grupo é com a Game
                        <Text style={styles.highlighttitle}>Box</Text>
                    </Text>
                    <Text style={styles.subtitle}>
                        Misture modos. Reúna a galera.
                    </Text>
                </View>
                <View style={styles.illustration}>
                    <Image
                        source={require('../../assets/images/Image.png')}
                        style={styles.imageIllustration}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.buttomContainer}>
                    <Pressable style={styles.buttom} onPress={() => navigation.navigate('GameScreen')}>
                        <Feather name="play" size={24} color={colors.background} />
                        <Text style={styles.buttomText}>
                            Iniciar Jogo
                        </Text>
                        <Feather name="arrow-right" size={24} color={colors.background} />
                    </Pressable>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignSelf: 'center',
    },

    content: {
        backgroundColor: colors.primary,
        borderRadius: radius.lg,
        padding: spacing.md,
        paddingTop: spacing.lg,
        gap: spacing.md,
        minHeight: 210,
        justifyContent: 'space-between',
        overflow: 'hidden',
    },

    information: {
        width: '100%',
        paddingRight: 105,
        gap: spacing.sm,
    },

    title: {
        color: colors.text,
        fontSize: 22,
        fontWeight: 'bold',
        lineHeight: 28,
    },

    highlighttitle: {
        color: colors.accent,
        fontWeight: 'bold',
    },

    subtitle: {
        color: colors.text,
        fontSize: 12,
        lineHeight: 18,
    },

    illustration: {
        position: 'absolute',
        top: spacing.md,
        right: spacing.sm,
        width: 105,
        height: 105,
        alignItems: 'center',
        justifyContent: 'center',
    },

    imageIllustration: {
        width: '100%',
        height: '100%',
    },

    buttomContainer: {
        width: '100%',
        marginTop: spacing.sm,
    },

    buttom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.accent,
        minHeight: 48,
        paddingHorizontal: spacing.md,
        borderRadius: radius.md,
        gap: spacing.sm,
    },

    buttomText: {
        color: colors.background,
        fontSize: 15,
        fontWeight: 'bold',
    },
});
