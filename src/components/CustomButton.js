import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import colors from '../theme/colors';

export default function CustomButton({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
}) {
  const variantStyle = styles[variant] || styles.primary;
  const isOutline = variant === 'outline' || variant === 'outlineDark';
  const outlineColor = variant === 'outlineDark' ? colors.primaryDark : colors.primary;

  return (
    <TouchableOpacity
      style={[styles.base, variantStyle, (disabled || loading) && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={isOutline ? outlineColor : colors.white} />
      ) : (
        <Text style={[styles.text, isOutline && { color: outlineColor }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.secondary },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  outlineDark: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primaryDark,
  },
  disabled: { opacity: 0.6 },
  text: { color: colors.white, fontSize: 15, fontWeight: '700' },
});
