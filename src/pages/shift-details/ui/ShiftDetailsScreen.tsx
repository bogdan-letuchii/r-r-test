import React, { useCallback, useMemo } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { observer } from 'mobx-react-lite';
import { useStore } from '~/app/providers';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/core';
import {
  ShiftDetailsHeader,
  PriceCard,
  InfoSection,
  WorkersProgress,
  ApplyButton,
} from './index.ts';

const HEADER_MAX_HEIGHT = 350;
const HEADER_MIN_HEIGHT = 100;

type RootStackParamList = {
  ShiftsList: undefined;
  ShiftDetails: { shiftId: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'ShiftDetails'>;

export const ShiftDetailsScreen: React.FC<Props> = observer(({ route }) => {
  const { shiftId } = route.params;
  const { shifts } = useStore();
  const shift = shifts.getShiftById(shiftId);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const handleApply = useCallback(() => {
    Alert.alert('Упс', 'пока в разработке');
  }, []);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const backButtonStyle = useAnimatedStyle(() => {
    return {
      opacity: scrollY.value > 100 ? 0 : 1,
    };
  });

  const workTypesText = useMemo(() => {
    if (!shift) return '';
    return Array.isArray(shift.workTypes)
      ? shift.workTypes.map(wt => wt.name).join(', ')
      : shift.workTypes;
  }, [shift]);

  const isFullyBooked = useMemo(() => {
    if (!shift) return false;
    return shift.currentWorkers >= shift.planWorkers;
  }, [shift]);

  if (!shift) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Смена не найдена</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[backButtonStyle, { zIndex: 100 }]}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <View style={styles.backButtonInner}>
            <Text style={styles.backButtonText}>←</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>

      <ShiftDetailsHeader
        logo={shift.logo}
        companyName={shift.companyName}
        customerRating={shift.customerRating}
        scrollY={scrollY}
        headerMaxHeight={HEADER_MAX_HEIGHT}
        headerMinHeight={HEADER_MIN_HEIGHT}
      />

      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
      >
        <View style={{ height: HEADER_MAX_HEIGHT + 12 }} />

        <PriceCard price={shift.priceWorker} />

        <InfoSection icon="💼" title="Тип работы">
          <Text style={styles.sectionContent}>{workTypesText}</Text>
        </InfoSection>

        <InfoSection icon="📅" title="Дата и время">
          <View style={styles.dateTimeContainer}>
            <View style={styles.dateTimeRow}>
              <Text style={styles.dateTimeLabel}>Дата:</Text>
              <Text style={styles.dateTimeValue}>{shift.dateStartByCity}</Text>
            </View>
            <View style={styles.dateTimeRow}>
              <Text style={styles.dateTimeLabel}>Время:</Text>
              <Text style={styles.dateTimeValue}>
                {shift.timeStartByCity} - {shift.timeEndByCity}
              </Text>
            </View>
          </View>
        </InfoSection>

        <InfoSection icon="📍" title="Адрес">
          <Text style={styles.address}>{shift.address}</Text>
        </InfoSection>

        <InfoSection icon="👥" title="Требуется сотрудников">
          <WorkersProgress
            planWorkers={shift.planWorkers}
            currentWorkers={shift.currentWorkers}
          />
        </InfoSection>
      </Animated.ScrollView>

      <ApplyButton isFullyBooked={isFullyBooked} onPress={handleApply} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  sectionContent: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
  dateTimeContainer: {
    gap: 12,
  },
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateTimeLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
    width: 60,
  },
  dateTimeValue: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '600',
    flex: 1,
  },
  address: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  errorText: {
    fontSize: 18,
    color: '#6B7280',
  },
  backButton: {
    position: 'absolute',
    top: 100,
    left: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    width: 40,
    height: 40,
    overflow: 'hidden',
  },
  backButtonInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 20,
    marginTop: Platform.OS === 'ios' ? 0 : -8,
  },
});
