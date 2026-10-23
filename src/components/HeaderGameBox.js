import { View, Text, Image, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

const { colors, spacing, radius } = theme;

export default function HeaderGameBox() {
    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image
                    source={require('../../assets/android-icon-foreground.png')}
                    style={styles.logoImage}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.information}>
                <Text style={styles.title}>Game<Text style={styles.highlighttitle}>Box</Text></Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.sm + 2,
        paddingHorizontal: spacing.md,
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        width: '100%',
        alignSelf: 'center',
    },

    logo: {
        width: 44,
        height: 44,
        backgroundColor: colors.primary,
        borderRadius: radius.md,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },

    logoImage: {
        width: 75,
        height: 75,
    },

    information: {
        flex: 1,
        marginLeft: spacing.sm + 4,
        alignItems: 'center',
    },

    title: {
        color: colors.text,
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    highlighttitle: {
        color: colors.primary,
        fontSize: 30,
        fontWeight: 'bold',
    },
});