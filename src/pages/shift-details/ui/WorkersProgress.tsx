import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface WorkersProgressProps {
  planWorkers: number;
  currentWorkers: number;
}

export const WorkersProgress: React.FC<WorkersProgressProps> = React.memo(
  ({ planWorkers, currentWorkers }) => {
    const workersPercentage = (currentWorkers / planWorkers) * 100;
    const isFullyBooked = currentWorkers >= planWorkers;
    const spotsLeft = Math.max(0, planWorkers - currentWorkers);

    return (
      <View style={styles.container}>
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{planWorkers}</Text>
            <Text style={styles.statLabel}>Требуется</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{currentWorkers}</Text>
            <Text style={styles.statLabel}>Набрано</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text
              style={[styles.statValue, isFullyBooked && styles.statValueFull]}
            >
              {spotsLeft}
            </Text>
            <Text style={styles.statLabel}>Свободно</Text>
          </View>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.min(workersPercentage, 100)}%`,
                backgroundColor: isFullyBooked ? '#10B981' : '#6C63FF',
              },
            ]}
          />
        </View>
        {isFullyBooked && (
          <View style={styles.fullyBookedBadge}>
            <Text style={styles.fullyBookedText}>✓ Все места заняты</Text>
          </View>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#6C63FF',
    marginBottom: 4,
  },
  statValueFull: {
    color: '#10B981',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  progressBar: {
    height: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
  },
  fullyBookedBadge: {
    backgroundColor: '#D1FAE5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'center',
  },
  fullyBookedText: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '700',
  },
});
