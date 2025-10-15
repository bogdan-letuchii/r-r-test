import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

export const ShiftCardSkeleton: React.FC = () => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Animated.View style={[styles.logo, animatedStyle]} />
        </View>
        <View style={styles.headerContent}>
          <Animated.View style={[styles.companyName, animatedStyle]} />
          <Animated.View style={[styles.rating, animatedStyle]} />
        </View>
      </View>

      <View style={styles.section}>
        <Animated.View style={[styles.workType, animatedStyle]} />
      </View>

      <View style={styles.section}>
        <Animated.View style={[styles.address, animatedStyle]} />
        <Animated.View style={[styles.addressLine2, animatedStyle]} />
      </View>

      <View style={styles.section}>
        <Animated.View style={[styles.datetime, animatedStyle]} />
      </View>

      <View style={styles.footer}>
        <View style={styles.leftSection}>
          <Animated.View style={[styles.workers, animatedStyle]} />
          <Animated.View style={[styles.progressBar, animatedStyle]} />
        </View>
        <Animated.View style={[styles.price, animatedStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  logoContainer: {
    marginRight: 12,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E5E7EB',
  },
  headerContent: {
    flex: 1,
    justifyContent: 'center',
    gap: 8,
  },
  companyName: {
    height: 20,
    width: '70%',
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  rating: {
    height: 16,
    width: 80,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  workType: {
    height: 16,
    width: '50%',
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  address: {
    height: 16,
    width: '90%',
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 8,
  },
  addressLine2: {
    height: 16,
    width: '60%',
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  datetime: {
    height: 16,
    width: '65%',
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  leftSection: {
    flex: 1,
    marginRight: 16,
  },
  workers: {
    height: 14,
    width: 100,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    width: '100%',
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  price: {
    height: 32,
    width: 100,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
  },
});
