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
import { useAuth } from '../hooks/useAuth';
import colors from '../theme/colors';

function traducirError(code) {
  const mensajes = {
    'auth/invalid-email': 'El correo no es válido',
    'auth/invalid-credential': 'Correo o contraseña incorrectos',
    'auth/user-not-found': 'No existe una cuenta con ese correo',
    'auth/wrong-password': 'Contraseña incorrecta',
    'auth/too-many-requests': 'Demasiados intentos, intenta más tarde',
   
  };
  return mensajes[code] || `Ocurrió un error, intenta de nuevo (${code || 'sin código'})`;
}

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Completa correo y contraseña');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await login(email.trim(), password);
    } catch (e) {
      console.error('Error al iniciar sesión:', e.code, e.message);
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
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

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
          placeholder="••••••••"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <CustomButton title="Iniciar sesión" onPress={handleLogin} loading={loading} style={styles.mt} />
        <CustomButton
          title="Crear una cuenta"
          variant="outline"
          onPress={() => navigation.navigate('Register')}
          style={styles.mt}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  container: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: '800', color: colors.textPrimary, marginBottom: 4 },
  subtitle: { fontSize: 14, color: colors.textMuted, marginBottom: 28 },
  errorText: { color: colors.danger, marginBottom: 12, textAlign: 'center' },
  mt: { marginTop: 8 },
});
