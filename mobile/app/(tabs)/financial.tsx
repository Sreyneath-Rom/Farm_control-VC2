import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import OverView from '@/components/financial/OverView';
import Income from '@/components/financial/Income';
import Expense from '@/components/financial/Expense';
import Sale from '@/components/financial/Sale';
import Report from '@/components/financial/Report';

const Financial = () => {
  const { width } = useWindowDimensions();
  const cardWidth = (width - 16 * 4) / 3; // Adjusted for 3 columns with 16px gap on each side

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }) + ' (+07)'; // Updated to Friday, August 22, 2025, 08:12 AM +07

  const [activeSection, setActiveSection] = useState('overview');

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'overview':
        return <OverView />;
      case 'income':
        return <Income />;
      case 'expenses':
        return <Expense />;
      case 'sales':
        return <Sale />;
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

      <View style={styles.navTabs}>
        <Text
          style={[styles.navTab, activeSection === 'overview' && styles.activeTab]}
          onPress={() => setActiveSection('overview')}
        >
          Overview
        </Text>
        <Text
          style={[styles.navTab, activeSection === 'income' && styles.activeTab]}
          onPress={() => setActiveSection('income')}
        >
          Income
        </Text>
        <Text
          style={[styles.navTab, activeSection === 'expenses' && styles.activeTab]}
          onPress={() => setActiveSection('expenses')}
        >
          Expenses
        </Text>
        <Text
          style={[styles.navTab, activeSection === 'sales' && styles.activeTab]}
          onPress={() => setActiveSection('sales')}
        >
          Sales
        </Text>
        <Text
          style={[styles.navTab, activeSection === 'reports' && styles.activeTab]}
          onPress={() => setActiveSection('reports')}
        >
          Reports
        </Text>
      </View>

      {activeSection === 'overview' && (
        <View style={styles.grid}>
          <View style={[styles.card, { width: cardWidth }]}>
            <Text style={styles.cardTitle}>Total Income</Text>
            <Text style={styles.cardValue}>$34,710</Text>
            <Text style={styles.cardChange}>+12.5% from last month</Text>
          </View>
          <View style={[styles.card, { width: cardWidth }]}>
            <Text style={styles.cardTitle}>Total Expenses</Text>
            <Text style={styles.cardValue}>$4,400</Text>
            <Text style={styles.cardChange}>-6.2% from last month</Text>
          </View>
          <View style={[styles.card, { width: cardWidth }]}>
            <Text style={styles.cardTitle}>Net Profit</Text>
            <Text style={styles.cardValue}>$30,310</Text>
            <Text style={styles.cardChange}>This month</Text>
          </View>
        </View>
      )}

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
  navTabs: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  navTab: {
    fontSize: 16,
    color: '#718096',
    paddingBottom: 4,
  },
  activeTab: {
    color: '#10b981',
    borderBottomWidth: 2,
    borderBottomColor: '#10b981',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 16,
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
  content: {
    marginTop: 16,
  },
});

export default Financial;