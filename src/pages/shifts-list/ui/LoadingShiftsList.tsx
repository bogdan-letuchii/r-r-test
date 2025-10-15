import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { ShiftCardSkeleton } from '~/shared/ui';

interface LoadingShiftsListProps {
  paddingTop: number;
}

export const LoadingShiftsList: React.FC<LoadingShiftsListProps> = React.memo(
  ({ paddingTop }) => {
    return (
      <View style={styles.container}>
        <View style={[styles.header, { paddingTop }]}>
          <Text style={styles.title}>Доступные смены</Text>
          <Text style={styles.subtitle}>Загружаем смены...</Text>
        </View>
        <ScrollView style={styles.listContent}>
          {[1, 2, 3, 4, 5].map(key => (
            <ShiftCardSkeleton key={key} />
          ))}
        </ScrollView>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
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
  listContent: {
    paddingTop: 16,
  },
});
