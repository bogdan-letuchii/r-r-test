import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getShiftsWord } from '~/shared/lib';

interface ShiftsListHeaderProps {
  totalCount: number;
  paddingTop: number;
}

export const ShiftsListHeader: React.FC<ShiftsListHeaderProps> = React.memo(
  ({ totalCount, paddingTop }) => {
    return (
      <View style={[styles.header, { paddingTop }]}>
        <Text style={styles.title}>Доступные смены</Text>
        <Text style={styles.subtitle}>
          {totalCount} {getShiftsWord(totalCount)} рядом с вами
        </Text>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  header: {
    padding: 16,
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
});
