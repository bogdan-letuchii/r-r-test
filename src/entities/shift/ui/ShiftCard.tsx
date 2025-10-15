import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { getWorkersWord } from '~/shared/lib';
import type { Shift } from '~/shared/types';

interface ShiftCardProps {
  shift: Shift;
  onPress: () => void;
}

export const ShiftCard: React.FC<ShiftCardProps> = React.memo(
  ({ shift, onPress }) => {
    const workersStatus = React.useMemo(
      () => `${shift.currentWorkers}/${shift.planWorkers}`,
      [shift.currentWorkers, shift.planWorkers]
    );

    const workersPercentage = React.useMemo(
      () => (shift.currentWorkers / shift.planWorkers) * 100,
      [shift.currentWorkers, shift.planWorkers]
    );

    const isFullyBooked = React.useMemo(
      () => shift.currentWorkers >= shift.planWorkers,
      [shift.currentWorkers, shift.planWorkers]
    );

    const workTypesText = React.useMemo(
      () =>
        Array.isArray(shift.workTypes)
          ? shift.workTypes.map(wt => wt.name).join(', ')
          : shift.workTypes,
      [shift.workTypes]
    );

    const reviewsCount = React.useMemo(
      () =>
        typeof shift.customerFeedbacksCount === 'string'
          ? shift.customerFeedbacksCount
          : shift.customerFeedbacksCount,
      [shift.customerFeedbacksCount]
    );

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          {shift.logo ? (
            <Image source={{ uri: shift.logo }} style={styles.logo} />
          ) : (
            <View style={[styles.logo, styles.logoPlaceholder]}>
              <Text style={styles.logoText}>{shift.companyName.charAt(0)}</Text>
            </View>
          )}
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.companyName} numberOfLines={1}>
            {shift.companyName}
          </Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.star}>⭐</Text>
            <Text style={styles.rating}>
              {shift.customerRating ? shift.customerRating.toFixed(1) : '0.0'}
            </Text>
            <Text style={styles.reviews}>({reviewsCount})</Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            {shift.priceWorker.toLocaleString('ru-RU')} ₽
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.content}>
        <View style={styles.infoRow}>
          <Text style={styles.icon}>💼</Text>
          <Text style={styles.infoText} numberOfLines={1}>
            {workTypesText}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.icon}>📍</Text>
          <Text style={styles.infoText} numberOfLines={2}>
            {shift.address}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.icon}>📅</Text>
          <Text style={styles.infoText}>{shift.dateStartByCity}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.icon}>⏰</Text>
          <Text style={styles.infoText}>
            {shift.timeStartByCity} - {shift.timeEndByCity}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.progressContainer}>
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
          <Text style={styles.workersText}>
            {workersStatus} {getWorkersWord(shift.planWorkers)}{' '}
            {isFullyBooked ? '✓' : ''}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoContainer: {
    marginRight: 12,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  logoPlaceholder: {
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  headerInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 14,
    marginRight: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginRight: 4,
  },
  reviews: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  priceContainer: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6C63FF',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  content: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  icon: {
    fontSize: 16,
    marginRight: 8,
    width: 20,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  footer: {
    marginTop: 8,
  },
  progressContainer: {
    gap: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  workersText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
    textTransform: 'lowercase',
  },
});
