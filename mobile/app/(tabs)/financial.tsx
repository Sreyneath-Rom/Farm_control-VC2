import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import OverView from '@/components/financial/OverView';
import Income from '@/components/financial/Income';
import Expense from '@/components/financial/Expense';
import Report from '@/components/financial/Report';

const Financial = () => {
  const { width } = useWindowDimensions();
  const cardWidth = (width - 16 * 3) / 2;

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }) + ' (+07)';

  const [activeSection, setActiveSection] = useState('overview');

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'overview':
        return <OverView />;
      case 'income':
        return <Income />;
      case 'expenses':
        return <Expense />;
      case 'reports':
        return <Report />;
      default:
        return <OverView />;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Financial Management</Text>
        <Text style={styles.subtitle}>Track income, expenses, and financial performance as of {currentDate}</Text>
      </View>

      <View style={styles.grid}>
        <View style={[styles.card, { width: cardWidth }]}>
          <Text style={styles.cardTitle}>Total Income</Text>
          <Text style={styles.cardValue}>$24,300</Text>
          <Text style={styles.cardChange}>+12.5% from last month</Text>
        </View>
        <View style={[styles.card, { width: cardWidth }]}>
          <Text style={styles.cardTitle}>Total Expenses</Text>
          <Text style={styles.cardValue}>$16,700</Text>
          <Text style={styles.cardChange}>+5.2% from last month</Text>
        </View>
        <View style={[styles.card, { width: cardWidth }]}>
          <Text style={styles.cardTitle}>Net Profit</Text>
          <Text style={styles.cardValue}>$7,600</Text>
          <Text style={styles.cardChange}>This month</Text>
        </View>
        <View style={[styles.card, { width: cardWidth }]}>
          <Text style={styles.cardTitle}>Cash Flow</Text>
          <Text style={styles.cardValue}>$5,200</Text>
          <Text style={styles.cardChange}>+8.3% from last month</Text>
        </View>
      </View>

      <View style={styles.grid}>
        <View style={[styles.card, { width: cardWidth }]}>
          <Text style={styles.cardTitle}>Income Sources</Text>
          <Text style={styles.cardValue}>2</Text>
          <Text style={styles.cardDesc}>Active sources</Text>
        </View>
        <View style={[styles.card, { width: cardWidth }]}>
          <Text style={styles.cardTitle}>Expense Categories</Text>
          <Text style={styles.cardValue}>3</Text>
          <Text style={styles.cardDesc}>Tracked categories</Text>
        </View>
        <View style={[styles.card, { width: cardWidth }]}>
          <Text style={styles.cardTitle}>Pending Transactions</Text>
          <Text style={styles.cardValue}>$15,000</Text>
          <Text style={styles.cardDesc}>Recent sales</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.column, { flex: 1 }]}>
          <View style={styles.placeholderCard}>
            <Text style={styles.placeholderTitle}>Recent Transactions</Text>
            <Text style={styles.placeholderText}>View transaction history here</Text>
          </View>
        </View>
        <View style={[styles.column, { flex: 1 }]}>
          <View style={styles.placeholderCard}>
            <Text style={styles.placeholderTitle}>Financial Alerts</Text>
            <Text style={styles.placeholderText}>Check alert status here</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        {renderSectionContent()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a202c',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#718096',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  column: {
    flex: 1,
    minWidth: 300,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a202c',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a202c',
    marginVertical: 4,
  },
  cardChange: {
    fontSize: 12,
    color: '#10b981',
  },
  cardDesc: {
    fontSize: 12,
    color: '#718096',
  },
  placeholderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 14,
    color: '#4b5563',
  },
  content: {
    marginTop: 16,
  },
});

export default Financial;