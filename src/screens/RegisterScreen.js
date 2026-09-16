import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import DateInput from '../components/DateInput';
import { useAuth } from '../hooks/useAuth';
import { useUserProfile } from '../hooks/useUserProfile';
import colors from '../theme/colors';
 
function traducirError(code) {
  const mensajes = {
    'auth/email-already-in-use': 'Ya existe una cuenta con ese correo',
    'auth/invalid-email': 'El correo no es válido',
    'auth/weak-password': 'La contraseña es muy débil',
  };
  return mensajes[code] || `Ocurrió un error, intenta de nuevo (${code || 'sin código'})`;
}
 
export default function RegisterScreen({ navigation }) {
  const { register } = useAuth();
  const { crearPerfil } = useUserProfile(null);
 
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [carnet, setCarnet] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
 
  const handleRegister = async () => {
    if (!nombreCompleto || !fechaNacimiento || !carnet || !email || !password) {
      setError('Completa todos los campos obligatorios');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
 
    setError('');
    setLoading(true);
    try {
      const credentials = await register(email.trim(), password);
      await crearPerfil(credentials.user.uid, {
        nombreCompleto,
        fechaNacimiento,
        carnet,
        imagenUrl: imagenUrl || '',
        email: email.trim(),
      });
    } catch (e) {
      console.error('Error al registrar usuario:', e.code, e.message);
      setError(traducirError(e.code));
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Crear cuenta</Text>
        <Text style={styles.subtitle}>Completa tus datos para registrarte</Text>
 
        <CustomInput
          label="Nombre completo"
          placeholder="Ej. Juan Pérez"
          value={nombreCompleto}
          onChangeText={setNombreCompleto}
        />
        <DateInput
          label="Fecha de nacimiento"
          value={fechaNacimiento}
          onChange={setFechaNacimiento}
        />
        <CustomInput
          label="Carnet institucional"
          placeholder="Ej. 20210212"
          value={carnet}
          onChangeText={setCarnet}
          autoCapitalize="characters"
        />
        <CustomInput
          label="URL de imagen (opcional)"
          placeholder="https://..."
          value={imagenUrl}
          onChangeText={setImagenUrl}
          autoCapitalize="none"
        />
        <CustomInput
          label="Correo electrónico"
          placeholder="tucorreo@ejemplo.com"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <CustomInput
          label="Contraseña"
          placeholder="Mínimo 6 caracteres"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <CustomInput
          label="Confirmar contraseña"
          placeholder="Repite tu contraseña"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
 
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
 
        <CustomButton title="Registrarme" onPress={handleRegister} loading={loading} style={styles.mt} />
        <CustomButton
          title="Ya tengo cuenta"
          variant="outline"
          onPress={() => navigation.navigate('Login')}
          style={styles.mt}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
 
const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  container: { flexGrow: 1, padding: 24, paddingTop: 60, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: '800', color: colors.textPrimary, marginBottom: 4 },
  subtitle: { fontSize: 14, color: colors.textMuted, marginBottom: 24 },
  errorText: { color: colors.danger, marginBottom: 12, textAlign: 'center' },
  mt: { marginTop: 8 },
});
 