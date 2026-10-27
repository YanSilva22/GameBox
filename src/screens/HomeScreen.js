import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import HeaderGameBox from '../components/HeaderGameBox';
import GameBanner from '../components/GameBanner';
import NavigationBar from '../components/NavigationBar';
import LastMatchCard from '../components/LastMatchCard';
import ActionCard from '../components/ActionCard';

import { theme } from '../constants/theme';

const { colors, spacing } = theme;

export default function HomeScreen() {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
            <View style={styles.container}>
                <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <HeaderGameBox />
                    <GameBanner />
                    <LastMatchCard 
                    />
                    <ActionCard
                        icon="bluetooth"
                        title="Conectar ao circuito"
                        subtitle="Conecte o dispositivo GameBox"
                        color={colors.colorActionCard}
                        backgroundColor= {colors.backgroundActionCard}
                        onPress={() => navigation.navigate('SettingsScreen')}
                    />
                    <ActionCard
                        icon="bookmark"
                        title="Modos salvos"
                        subtitle="Acesse seus modelos salvos rapidamente"
                        color= {colors.colorActionCard2}
                        backgroundColor= {colors.backgroundActionCard2}
                        onPress={() => navigation.navigate('GameScreen')}
                    />
                    <ActionCard
                        icon="upload"
                        title="Importar perguntas"
                        subtitle="Importe uma planilha Excel ou CSV com perguntas e respostas"
                        color= {colors.colorActionCard3}
                        backgroundColor= {colors.backgroundActionCard3}
                        onPress={() => navigation.navigate('GameScreen')}
                    />
                </View>
                </ScrollView>
            <NavigationBar />
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
    },

    content: {
        paddingHorizontal: spacing.md,
        paddingTop: spacing.md,
        paddingBottom: spacing.md,
        gap: spacing.md,
    },
    scroll: {
        flex: 1,
    },
});
