import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface InfoSectionProps {
  icon: string;
  title: string;
  children: React.ReactNode;
}

export const InfoSection: React.FC<InfoSectionProps> = React.memo(
  ({ icon, title, children }) => {
    return (
      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.icon}>{icon}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
        {children}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    fontSize: 20,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
});
