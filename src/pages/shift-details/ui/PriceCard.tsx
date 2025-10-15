import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PriceCardProps {
  price: number;
}

export const PriceCard: React.FC<PriceCardProps> = React.memo(({ price }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Оплата</Text>
      <Text style={styles.value}>{price.toLocaleString('ru-RU')} ₽</Text>
      <Text style={styles.note}>за смену</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
    marginBottom: 4,
  },
  value: {
    fontSize: 32,
    fontWeight: '800',
    color: '#6C63FF',
    marginBottom: 2,
  },
  note: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});
