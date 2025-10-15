import React, { useEffect, useCallback, useMemo, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { observer } from 'mobx-react-lite';
import { useStore } from '~/app/providers';
import { ShiftCard } from '~/entities/shift';
import { ErrorView } from '~/shared/ui';
import { ITEMS_PER_PAGE } from '~/shared/config';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Shift } from '~/shared/types';
import {
  ShiftsListHeader,
  EmptyShiftsList,
  LoadingFooter,
  LoadingShiftsList,
} from './index.ts';

type RootStackParamList = {
  ShiftsList: undefined;
  ShiftDetails: { shiftId: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'ShiftsList'>;

export const ShiftsListScreen: React.FC<Props> = observer(({ navigation }) => {
  const { shifts, user } = useStore();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [displayedCount, setDisplayedCount] = useState(ITEMS_PER_PAGE);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = useCallback(async () => {
    const currentLocation = await user.getCurrentLocation();
    if (currentLocation) {
      await shifts.loadShifts(currentLocation);
      setDisplayedCount(ITEMS_PER_PAGE);
    }
  }, [user, shifts]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await loadData();
    setIsRefreshing(false);
  }, [loadData]);

  const handleShiftPress = useCallback(
    (shiftId: string) => {
      navigation.navigate('ShiftDetails', { shiftId });
    },
    [navigation],
  );

  const handleLoadMore = useCallback(() => {
    if (displayedCount < shifts.shifts.length) {
      setDisplayedCount(prev =>
        Math.min(prev + ITEMS_PER_PAGE, shifts.shifts.length),
      );
    }
  }, [displayedCount, shifts.shifts.length]);

  const displayedShifts = useMemo(
    () => shifts.shifts.slice(0, displayedCount),
    [shifts.shifts, displayedCount],
  );

  const hasMore = useMemo(
    () => displayedCount < shifts.shifts.length,
    [displayedCount, shifts.shifts.length],
  );

  const itemsToLoad = useMemo(
    () => Math.min(ITEMS_PER_PAGE, shifts.shifts.length - displayedCount),
    [shifts.shifts.length, displayedCount],
  );

  const renderItem = useCallback(
    ({ item }: { item: Shift }) => (
      <ShiftCard shift={item} onPress={() => handleShiftPress(item.id)} />
    ),
    [handleShiftPress],
  );

  const keyExtractor = useCallback(
    (item: Shift, index: number) => item.id?.toString() || index.toString(),
    [],
  );

  const renderFooter = useCallback(
    () => (hasMore ? <LoadingFooter itemsToLoad={itemsToLoad} /> : null),
    [hasMore, itemsToLoad],
  );

  const refreshControl = useMemo(
    () => (
      <RefreshControl
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        tintColor="#6C63FF"
        colors={['#6C63FF']}
      />
    ),
    [isRefreshing, handleRefresh],
  );

  if (user.isLoadingLocation || (shifts.isLoading && !isRefreshing)) {
    return <LoadingShiftsList paddingTop={insets.top} />;
  }

  if (user.locationError) {
    return <ErrorView message={user.locationError} onRetry={loadData} />;
  }

  if (shifts.error) {
    return <ErrorView message={shifts.error} onRetry={loadData} />;
  }

  return (
    <View style={styles.container}>
      <ShiftsListHeader
        totalCount={shifts.shifts.length}
        paddingTop={insets.top}
      />
      <FlatList
        data={displayedShifts}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshControl={refreshControl}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
        ListEmptyComponent={EmptyShiftsList}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  listContent: {
    paddingTop: 16,
    paddingBottom: 20,
  },
});
