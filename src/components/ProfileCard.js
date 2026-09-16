import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default function ProfileCard({ imageUrl, fullName, subtitle, children }) {
  return (
    <View style={styles.card}>
      <View style={styles.avatarWrapper}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Text style={styles.avatarInitial}>
              {fullName ? fullName.charAt(0).toUpperCase() : '?'}
            </Text>
          </View>
        )}
      </View>
      <Text style={styles.name}>{fullName || 'Sin nombre'}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      <View style={styles.body}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  avatarWrapper: { marginBottom: 12 },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: colors.accent,
  },
  avatarPlaceholder: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: { color: colors.white, fontSize: 32, fontWeight: '700' },
  name: { fontSize: 20, fontWeight: '700', color: colors.textPrimary },
  subtitle: { fontSize: 13, color: colors.textMuted, marginTop: 2 },
  body: { width: '100%', marginTop: 16 },
});
