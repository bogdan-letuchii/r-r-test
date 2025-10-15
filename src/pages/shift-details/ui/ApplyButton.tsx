import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ApplyButtonProps {
  isFullyBooked: boolean;
  onPress: () => void;
}

export const ApplyButton: React.FC<ApplyButtonProps> = React.memo(
  ({ isFullyBooked, onPress }) => {
    return (
      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, isFullyBooked && styles.buttonDisabled]}
          disabled={isFullyBooked}
          activeOpacity={0.8}
          onPress={onPress}
        >
          <Text style={styles.buttonText}>
            {isFullyBooked ? 'Места заняты' : 'Записаться на смену'}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
);

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  button: {
    backgroundColor: '#6C63FF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: '#9CA3AF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
