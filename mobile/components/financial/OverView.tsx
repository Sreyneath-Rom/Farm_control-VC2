import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { TrendingUp, TrendingDown, DollarSign } from 'react-native-vector-icons';

const OverView = () => {
  const { width } = useWindowDimensions();
  const cardWidth = (width - 16 * 3) / 2; // 2 cards per row with 16px gaps

  return (
    <View style={styles.container}>
      {/* Metrics Cards */}
      <View style={styles.grid}>
        <View style={[styles.card, { width: cardWidth }]}>
          <View style={styles.cardContent}>
            <View style={[styles.iconContainer, { backgroundColor: '#10b981' }]}>
              <TrendingUp name="trending-up" size={24} color="#fff" />
            </View>
            <View>
              <Text style={styles.cardLabel}>Total Income</Text>
              <Text style={styles.cardValue}>$24,300</Text>
              <Text style={styles.cardChange}>+12.5% from last month</Text>
            </View>
          </View>
        </View>
        <View style={[styles.card, { width: cardWidth }]}>
          <View style={styles.cardContent}>
            <View style={[styles.iconContainer, { backgroundColor: '#ef4444' }]}>
              <TrendingDown name="trending-down" size={24} color="#fff" />
            </View>
            <View>
              <Text style={styles.cardLabel}>Total Expenses</Text>
              <Text style={styles.cardValue}>$16,700</Text>
              <Text style={styles.cardChange}>+5.2% from last month</Text>
            </View>
          </View>
        </View>
        <View style={[styles.card, { width: cardWidth }]}>
          <View style={styles.cardContent}>
            <View style={[styles.iconContainer, { backgroundColor: '#3b82f6' }]}>
              <DollarSign name="dollar-sign" size={24} color="#fff" />
            </View>
            <View>
              <Text style={styles.cardLabel}>Net Profit</Text>
              <Text style={styles.cardValue}>$7,600</Text>
              <Text style={styles.cardChange}>This month</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Income and Expenses Breakdown */}
      <View style={styles.breakdownGrid}>
        <View style={[styles.breakdownCard, { width: cardWidth - 8 }]}>
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
        <View style={[styles.breakdownCard, { width: cardWidth - 8 }]}>
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

      {/* Recent Transactions */}
      <View style={styles.transactionCard}>
        <View style={styles.transactionHeader}>
          <Text style={styles.transactionTitle}>Recent Transactions</Text>
        </View>
        <View style={styles.transactionItem}>
          <View style={[styles.iconContainer, { backgroundColor: '#10b981' }]}>
            <TrendingUp name="trending-up" size={20} color="#fff" />
          </View>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionName}>50 pigs sold to local market</Text>
            <Text style={styles.transactionDesc}>Pig Sales • 1/15/2024</Text>
          </View>
          <Text style={styles.transactionAmount}>+$15,000</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 16, gap: 8 },
  card: { backgroundColor: '#fff', borderRadius: 8, padding: 16, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4, elevation: 2 },
  cardContent: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconContainer: { width: 48, height: 48, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  cardLabel: { fontSize: 14, color: '#718096', marginBottom: 4 },
  cardValue: { fontSize: 24, fontWeight: 'bold', color: '#1a202c' },
  cardChange: { fontSize: 12, color: '#10b981' },
  breakdownGrid: { flexDirection: 'row', gap: 16, marginBottom: 16 },
  breakdownCard: { backgroundColor: '#fff', borderRadius: 8, padding: 16, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4, elevation: 2 },
  breakdownTitle: { fontSize: 16, fontWeight: '600', color: '#1a202c', marginBottom: 12 },
  breakdownItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  breakdownLabel: { fontSize: 14, color: '#718096' },
  breakdownValue: { fontSize: 14, fontWeight: '600', color: '#10b981' },
  transactionCard: { backgroundColor: '#fff', borderRadius: 8, padding: 16, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4, elevation: 2 },
  transactionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  transactionTitle: { fontSize: 16, fontWeight: '600', color: '#1a202c' },
  transactionItem: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  transactionDetails: { flex: 1 },
  transactionName: { fontSize: 14, fontWeight: '500', color: '#1a202c' },
  transactionDesc: { fontSize: 12, color: '#718096' },
  transactionAmount: { fontSize: 14, fontWeight: '600', color: '#10b981' },
});

export default OverView;