import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const OverView = () => {
  const { width } = useWindowDimensions();

  // Determine number of columns based on screen width
  let cardWidth, breakdownWidth;
  if (width < 480) {
    // Small screens (e.g., phones in portrait, ~320-480px)
    cardWidth = width - 32; // Full width with 16px padding on each side
    breakdownWidth = width - 32;
  } else if (width < 768) {
    // Medium screens (e.g., tablets in portrait or larger phones)
    cardWidth = (width - 16 * 2) / 2; // 2 columns
    breakdownWidth = (width - 16 * 2) / 2;
  } else {
    // Large screens (e.g., tablets in landscape)
    cardWidth = (width - 16 * 4) / 3; // 3 columns
    breakdownWidth = (width - 16 * 2) / 2; // 2 columns
  }

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <View style={[styles.card, { width: cardWidth }]}>
          <View style={styles.cardContent}>
            <View style={[styles.iconContainer, { backgroundColor: '#10b981' }]}>
              <Feather name="trending-up" size={20} color="#fff" /> {/* Reduced size for mobile */}
            </View>
            <View>
              <Text style={styles.cardLabel}>Total Income</Text>
              <Text style={styles.cardValue}>$34,710</Text>
              <Text style={styles.cardChange}>+12.5% from last month</Text>
            </View>
          </View>
        </View>

        <View style={[styles.card, { width: cardWidth }]}>
          <View style={styles.cardContent}>
            <View style={[styles.iconContainer, { backgroundColor: '#ef4444' }]}>
              <Feather name="trending-down" size={20} color="#fff" /> {/* Reduced size for mobile */}
            </View>
            <View>
              <Text style={styles.cardLabel}>Total Expenses</Text>
              <Text style={styles.cardValue}>$4,400</Text>
              <Text style={styles.cardChange}>-6.2% from last month</Text>
            </View>
          </View>
        </View>

        <View style={[styles.card, { width: cardWidth }]}>
          <View style={styles.cardContent}>
            <View style={[styles.iconContainer, { backgroundColor: '#3b82f6' }]}>
              <Feather name="dollar-sign" size={20} color="#fff" /> {/* Reduced size for mobile */}
            </View>
            <View>
              <Text style={styles.cardLabel}>Net Profit</Text>
              <Text style={styles.cardValue}>$30,310</Text>
              <Text style={styles.cardChange}>This month</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.breakdownGrid}>
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

      <View style={styles.transactionCard}>
        <View style={styles.transactionHeader}>
          <Text style={styles.transactionTitle}>Recent Transactions</Text>
        </View>
        <View style={styles.transactionItem}>
          <View style={[styles.iconContainer, { backgroundColor: '#10b981' }]}>
            <Feather name="trending-up" size={18} color="#fff" /> {/* Reduced size for mobile */}
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
  container: { flex: 1, backgroundColor: '#fff', padding: 1 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 8, // Reduced gap for mobile
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12, // Reduced padding for mobile
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 }, // Reduced shadow offset
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 12, // Adjusted spacing for mobile
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // Reduced gap for mobile
  },
  iconContainer: {
    width: 40, // Reduced width for mobile
    height: 40, // Reduced height for mobile
    borderRadius: 6, // Adjusted radius
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardLabel: {
    fontSize: 12, // Reduced font size for mobile
    color: '#718096',
    marginBottom: 2, // Reduced margin
  },
  cardValue: {
    fontSize: 18, // Reduced font size for mobile
    fontWeight: 'bold',
    color: '#1a202c',
  },
  cardChange: {
    fontSize: 10, // Reduced font size for mobile
    color: '#10b981',
  },
  breakdownGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 8, // Reduced gap for mobile
  },
  breakdownCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12, // Reduced padding for mobile
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 }, // Reduced shadow offset
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 12, // Adjusted spacing for mobile
  },
  breakdownTitle: {
    fontSize: 14, // Reduced font size for mobile
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: 8, // Reduced margin
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  breakdownLabel: {
    fontSize: 12, // Reduced font size for mobile
    color: '#718096',
  },
  breakdownValue: {
    fontSize: 12, // Reduced font size for mobile
    fontWeight: '600',
    color: '#10b981',
  },
  transactionCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12, // Reduced padding for mobile
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 }, // Reduced shadow offset
    shadowRadius: 2,
    elevation: 1,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8, // Reduced margin
  },
  transactionTitle: {
    fontSize: 14, // Reduced font size for mobile
    fontWeight: '600',
    color: '#1a202c',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // Reduced gap for mobile
  },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
    fontSize: 12, // Reduced font size for mobile
    fontWeight: '500',
    color: '#1a202c',
  },
  transactionDesc: {
    fontSize: 10, // Reduced font size for mobile
    color: '#718096',
  },
  transactionAmount: {
    fontSize: 12, // Reduced font size for mobile
    fontWeight: '600',
    color: '#10b981',
  },
});

export default OverView;