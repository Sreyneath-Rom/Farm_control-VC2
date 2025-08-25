import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import OverView from '@/components/financial/OverView';
import Income from '@/components/financial/Income';
import Expense from '@/components/financial/Expense';
import Sale from '@/components/financial/Sale';
import Report from '@/components/financial/Report';

const Financial = () => {
  const { width } = useWindowDimensions();
  const [activeSection, setActiveSection] = useState('overview');

  // Responsive cards per row
  const isSmall = width < 480;
  const isMedium = width < 768;

 const getCardStyle = () => {
  if (isSmall) return { flex: 1 };      // full width
  if (isMedium) return { flex: 0.48 };  // ~48% width
  return { flex: 0.31 };                // ~31% width
};



  const currentDate =
    new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }) + ' (+07)';

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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Financial Management</Text>
          <Text style={styles.subtitle}>
            Track income, expenses, and performance as of {currentDate}
          </Text>
        </View>

        {/* Nav Tabs */}
        <View style={styles.navTabs}>
          {['overview', 'income', 'expenses', 'sales', 'reports'].map(
            (tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.navTab,
                  activeSection === tab && styles.activeTab,
                ]}
                onPress={() => setActiveSection(tab)}
              >
                <Text
                  style={[
                    styles.navTabText,
                    activeSection === tab && styles.activeTabText,
                  ]}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        {/* Overview Quick Stats */}
        {activeSection === 'overview' && (
          <View style={styles.grid}>
            <View style={[styles.card, getCardStyle()]}>
              <Text style={styles.cardTitle}>Total Income</Text>
              <Text style={styles.cardValue}>$34,710</Text>
              <Text style={styles.cardChange}>+12.5% from last month</Text>
            </View>
            <View style={[styles.card, getCardStyle()]}>
              <Text style={styles.cardTitle}>Total Expenses</Text>
              <Text style={styles.cardValue}>$4,400</Text>
              <Text style={[styles.cardChange, { color: '#ef4444' }]}>
                -6.2% from last month
              </Text>
            </View>
            <View style={[styles.card, getCardStyle()]}>
              <Text style={styles.cardTitle}>Net Profit</Text>
              <Text style={styles.cardValue}>$30,310</Text>
              <Text style={styles.cardChange}>This month</Text>
            </View>
          </View>
        )}

        {/* Section Content */}
        <View style={styles.content}>{renderSectionContent()}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  navTabs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
    backgroundColor: '#e5e7eb',
    borderRadius: 10,
    padding: 4,
  },
  navTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 8,
  },
  navTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  activeTab: {
    backgroundColor: '#10b981',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  cardChange: {
    fontSize: 12,
    color: '#10b981',
  },
  content: {
    marginTop: 8,
  },

});

export default Financial;
