import { View, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { theme } from '../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';

const { colors, spacing, radius } = theme;


export default function NavigationBar() {
    const [activePage, setActivePage] = useState('Home');
    return (
        <View style={styles.container}>
            <View style={styles.pages}>
                <Pressable style={[styles.homeButton, activePage === 'Home' && styles.activeButton]} onPress={() => setActivePage('Home')}>
                    <Feather 
                        name="home" 
                        size={26} 
                        color={activePage === 'Home' ? colors.text : colors.textSecondary} 
                    />
                </Pressable>

                <Pressable style={[styles.gameModesButton, activePage === 'Game Modes' && styles.activeButton]} onPress={() => setActivePage('Game Modes')}>
                    <MaterialCommunityIcons 
                        name="gamepad-variant" 
                        size={26} 
                        color={activePage === 'Game Modes' ? colors.text : colors.textSecondary}
                    />
                </Pressable>

                <Pressable style={[styles.scoreboardButton, activePage === 'Scoreboard' && styles.activeButton]} onPress={() => setActivePage('Scoreboard')}>
                    <Feather
                        name="award"
                        size={26}
                        color={activePage === 'Scoreboard' ? colors.text : colors.textSecondary}
                    />
                </Pressable>

                <Pressable style={[styles.configButton, activePage === 'Config' && styles.activeButton]} onPress={() => setActivePage('Config')}>
                    <Feather
                        name="settings"
                        size={26}
                        color={activePage === 'Config' ? colors.text : colors.textSecondary}
                    />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.navigation,
        paddingTop: spacing.sm,
        paddingBottom: spacing.sm,
    },

    pages: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    homeButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 52,
        borderRadius: radius.lg,
    },

    gameModesButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 52,
        borderRadius: radius.lg,
    },

    scoreboardButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 52,
        borderRadius: radius.lg,
    },

    configButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 52,
        borderRadius: radius.lg,
    },

    activeButton: {
        backgroundColor: colors.surfaceSecondary,
    },
});
