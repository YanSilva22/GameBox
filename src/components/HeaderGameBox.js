import { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

const palette = colors.dark;

export default function HeaderGameBox() {
    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image
                    source={require('../../assets/android-icon-foreground.png')}
                    style={styles.imagemLogo}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.informacoes}>
                <Text style={styles.titulo}>Game<Text style={styles.titulodestaque}>Box</Text></Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: palette.surface,
        borderRadius: 18,
        width: '98%',
        alignSelf: 'center',
    },

    logo: {
        width: 44,
        height: 44,
        backgroundColor: palette.primary,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },

    imagemLogo: {
        width: 44,
        height: 44,
    },

    informacoes: {
        flex: 1,
        marginLeft: 12,
        alignItems: 'center',
    },

    titulo: {
        color: palette.text,
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    titulodestaque: {
        color: palette.primary,
        fontSize: 30,
        fontWeight: 'bold',
        textAlignlign: 'center',
    },
});
