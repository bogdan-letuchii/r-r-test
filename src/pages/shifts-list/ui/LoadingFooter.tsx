import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface LoadingFooterProps {
  itemsToLoad: number;
}

export const LoadingFooter: React.FC<LoadingFooterProps> = React.memo(
  ({ itemsToLoad }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Загружается ещё {itemsToLoad}...</Text>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
});
