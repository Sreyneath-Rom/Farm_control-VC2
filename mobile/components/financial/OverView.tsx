import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const OverView = () => {
  const { width } = useWindowDimensions();

  const isSmall = width < 480;
  const isMedium = width < 768;

  const cardWidth = isSmall
    ? '100%'
    : isMedium
    ? (width - 48) / 2
    : (width - 64) / 3;

  const breakdownWidth = isSmall ? '100%' : (width - 48) / 2;

  return (
    <View style={styles.container}>
      {/* Summary Cards */}
      <View style={styles.grid}>
        <View style={[styles.card, { width: cardWidth }]}>
          <Feather name="trending-up" size={20} color="#10b981" />
          <Text style={styles.cardTitle}>Total Income</Text>
          <Text style={styles.cardValue}>$34,710</Text>
          <Text style={styles.cardChange}>+12.5% from last month</Text>
        </View>

        <View style={[styles.card, { width: cardWidth }]}>
          <Feather name="trending-down" size={20} color="#ef4444" />
          <Text style={styles.cardTitle}>Total Expenses</Text>
          <Text style={styles.cardValue}>$4,400</Text>
          <Text style={[styles.cardChange, { color: '#ef4444' }]}>
            -6.2% from last month
          </Text>
        </View>

        <View style={[styles.card, { width: cardWidth }]}>
          <Feather name="dollar-sign" size={20} color="#3b82f6" />
          <Text style={styles.cardTitle}>Net Profit</Text>
          <Text style={styles.cardValue}>$30,310</Text>
          <Text style={styles.cardChange}>This month</Text>
        </View>
      </View>

      {/* Breakdown Cards */}
      <View style={styles.grid}>
        <View style={[styles.breakdownCard, { width: breakdownWidth }]}>
          <Text style={styles.breakdownTitle}>Income by Category</Text>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>Pig Sales</Text>
            <Text style={styles.breakdownValue}>$23,500</Text>
          </View>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>Manure Sales</Text>
            <Text style={styles.breakdownValue}>$800</Text>
          </View>
        </View>

        <View style={[styles.breakdownCard, { width: breakdownWidth }]}>
          <Text style={styles.breakdownTitle}>Expenses by Category</Text>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>Feed</Text>
            <Text style={styles.breakdownValue}>$3,500</Text>
          </View>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>Salaries</Text>
            <Text style={styles.breakdownValue}>$12,000</Text>
          </View>
          <View style={styles.breakdownItem}>
            <Text style={styles.breakdownLabel}>Utilities</Text>
            <Text style={styles.breakdownValue}>$1,200</Text>
          </View>
        </View>
      </View>

      {/* Recent Transaction */}
      <View style={styles.transactionCard}>
        <Text style={styles.transactionTitle}>Recent Transaction</Text>
        <View style={styles.transactionItem}>
          <Feather name="trending-up" size={18} color="#10b981" />
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionName}>50 pigs sold to local market</Text>
            <Text style={styles.transactionDesc}>Pig Sales • 2024-01-15</Text>
          </View>
          <Text style={styles.transactionAmount}>+$15,000</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: '#fff',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    marginTop: 8,
  },
  cardValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginVertical: 4,
  },
  cardChange: {
    fontSize: 12,
    color: '#10b981',
  },
  breakdownCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  breakdownTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: 8,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  breakdownLabel: {
    fontSize: 13,
    color: '#718096',
  },
  breakdownValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#10b981',
  },
  transactionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    marginBottom: 30,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: 8,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1a202c',
  },
  transactionDesc: {
    fontSize: 11,
    color: '#718096',
  },
  transactionAmount: {
    fontSize: 13,
    fontWeight: '600',
    color: '#10b981',
  },
});
export default OverView;