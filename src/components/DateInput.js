import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../theme/colors';

function toIsoDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function parseIsoDate(value) {
  if (!value) return new Date(2000, 0, 1);
  const [y, m, d] = value.split('-').map(Number);
  if (!y || !m || !d) return new Date(2000, 0, 1);
  return new Date(y, m - 1, d);
}

export default function DateInput({ label, value, onChange, error }) {
  const [showPicker, setShowPicker] = useState(false);

  const handleValueChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      onChange(toIsoDate(selectedDate));
    }
  };

  const handleDismiss = () => {
    setShowPicker(false);
  };

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TouchableOpacity
        style={[styles.input, error ? styles.inputError : null]}
        onPress={() => setShowPicker(true)}
        activeOpacity={0.7}
      >
        <Text style={value ? styles.valueText : styles.placeholderText}>
          {value || 'Selecciona una fecha'}
        </Text>
      </TouchableOpacity>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {showPicker && (
        <>
          <DateTimePicker
            value={parseIsoDate(value)}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            maximumDate={new Date()}
            onValueChange={handleValueChange}
            onDismiss={handleDismiss}
          />
          {Platform.OS === 'ios' && (
            <TouchableOpacity onPress={() => setShowPicker(false)} style={styles.doneButton}>
              <Text style={styles.doneText}>Listo</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  inputError: { borderColor: colors.danger },
  valueText: { fontSize: 15, color: colors.textPrimary },
  placeholderText: { fontSize: 15, color: colors.textMuted },
  error: { color: colors.danger, fontSize: 12, marginTop: 4 },
  doneButton: { alignSelf: 'flex-end', paddingVertical: 8, paddingHorizontal: 4 },
  doneText: { color: colors.primary, fontWeight: '700', fontSize: 14 },
});
