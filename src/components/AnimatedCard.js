import { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

const { colors } = theme;

export default function AnimatedCard({ children, selected, onPress, style, }) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => { Animated.spring(scale, { toValue: selected ? 1.05 : 1, useNativeDriver: true }).start(); }, [selected]);
  return (
    <Pressable onPress={onPress}>
      <Animated.View style={[ styles.card, style, selected && styles.selected, { transform: [{ scale }] }, ]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1.5,
    borderColor: colors.border,
  },

  selected: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
});
