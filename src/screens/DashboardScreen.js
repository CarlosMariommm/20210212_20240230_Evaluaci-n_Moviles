import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import DateInput from '../components/DateInput';
import ProfileCard from '../components/ProfileCard';
import { useAuth } from '../hooks/useAuth';
import { useUserProfile } from '../hooks/useUserProfile';
import colors from '../theme/colors';

function InfoRow({ label, value }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value || '-'}</Text>
    </View>
  );
}

export default function DashboardScreen() {
  const { user, logout } = useAuth();
  const { profile, loading, actualizarPerfil } = useUserProfile(user?.uid);

  const [editMode, setEditMode] = useState(false);
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [carnet, setCarnet] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setNombreCompleto(profile.nombreCompleto || '');
      setFechaNacimiento(profile.fechaNacimiento || '');
      setCarnet(profile.carnet || '');
      setImagenUrl(profile.imagenUrl || '');
    }
  }, [profile]);

  const handleGuardar = async () => {
    setSaving(true);
    try {
      await actualizarPerfil(user.uid, { nombreCompleto, fechaNacimiento, carnet, imagenUrl });
      setEditMode(false);
    } catch (e) {
      Alert.alert('Error', 'No se pudo actualizar el perfil');
    } finally {
      setSaving(false);
    }
  };

  const handleCerrarSesion = () => {
    Alert.alert('Cerrar sesión', '¿Seguro que deseas cerrar sesión?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Cerrar sesión', style: 'destructive', onPress: logout },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>Cargando perfil...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.flex} contentContainerStyle={styles.container}>
      <Text style={styles.header}>Mi perfil</Text>

      <ProfileCard
        imageUrl={editMode ? imagenUrl : profile?.imagenUrl}
        fullName={editMode ? nombreCompleto : profile?.nombreCompleto}
        subtitle={user?.email}
      >
        {editMode ? (
          <>
            <CustomInput label="Nombre completo" value={nombreCompleto} onChangeText={setNombreCompleto} />
            <DateInput
              label="Fecha de nacimiento"
              value={fechaNacimiento}
              onChange={setFechaNacimiento}
            />
            <CustomInput label="Carnet institucional" value={carnet} onChangeText={setCarnet} />
            <CustomInput
              label="URL de imagen"
              value={imagenUrl}
              onChangeText={setImagenUrl}
              autoCapitalize="none"
            />

            <CustomButton title="Guardar cambios" onPress={handleGuardar} loading={saving} style={styles.mt} />
            <CustomButton
              title="Cancelar"
              variant="outline"
              onPress={() => setEditMode(false)}
              style={styles.mt}
            />
          </>
        ) : (
          <>
            <InfoRow label="Fecha de nacimiento" value={profile?.fechaNacimiento} />
            <InfoRow label="Carnet institucional" value={profile?.carnet} />

            <CustomButton
              title="Editar información"
              variant="secondary"
              onPress={() => setEditMode(true)}
              style={styles.mt}
            />
          </>
        )}
      </ProfileCard>

      <CustomButton
        title="Cerrar sesión"
        variant="outlineDark"
        onPress={handleCerrarSesion}
        style={styles.logoutBtn}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  container: { padding: 24, paddingTop: 60, paddingBottom: 40 },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  loadingText: { color: colors.textMuted },
  header: { fontSize: 24, fontWeight: '800', color: colors.textPrimary, marginBottom: 20 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  infoLabel: { color: colors.textMuted, fontSize: 13 },
  infoValue: { color: colors.textPrimary, fontSize: 14, fontWeight: '600' },
  mt: { marginTop: 8 },
  logoutBtn: { marginTop: 24 },
});
