import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const Income = () => {
  const { width } = useWindowDimensions();
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState('this-month');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newIncome, setNewIncome] = useState({
    category: '',
    description: '',
    customer: '',
    amount: '',
    date: '',
  });

  const [incomeHistory] = useState([
    {
      id: 1,
      category: 'Pig Sales',
      description: '50 pigs sold to local market',
      customer: 'Local Market Co.',
      amount: 15000,
      date: '2024-01-15',
    },
    {
      id: 2,
      category: 'Manure Sales',
      description: 'Organic fertilizer sales',
      customer: 'Garden Center',
      amount: 800,
      date: '2024-01-13',
    },
  ]);

  const filteredIncome = incomeHistory.filter((income) => {
    const query = searchQuery.toLowerCase();
    return (
      income.category.toLowerCase().includes(query) ||
      income.description.toLowerCase().includes(query) ||
      income.customer.toLowerCase().includes(query)
    );
  });

  const addIncome = () => {
    if (
      newIncome.category &&
      newIncome.description &&
      newIncome.customer &&
      newIncome.amount &&
      newIncome.date
    ) {
      console.log('Income added:', newIncome);
      setNewIncome({
        category: '',
        description: '',
        customer: '',
        amount: '',
        date: '',
      });
      setShowAddForm(false);
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search income records..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#718096"
        />
        <TouchableOpacity style={styles.addButton} onPress={() => setShowAddForm(true)}>
          <Feather name="plus" size={16} color="#fff" />
          <Text style={styles.addButtonText}>Add Income</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterRow}>
        <Text style={styles.filterLabel}>Filter by:</Text>
        <TouchableOpacity
          style={[styles.filterButton, timeFilter === 'this-month' && styles.activeFilter]}
          onPress={() => setTimeFilter('this-month')}
        >
          <Text style={styles.filterText}>This Month</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, timeFilter === 'last-month' && styles.activeFilter]}
          onPress={() => setTimeFilter('last-month')}
        >
          <Text style={styles.filterText}>Last Month</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, timeFilter === 'all-time' && styles.activeFilter]}
          onPress={() => setTimeFilter('all-time')}
        >
          <Text style={styles.filterText}>All Time</Text>
        </TouchableOpacity>
      </View>

      {showAddForm && (
        <View style={styles.addForm}>
          <Text style={styles.formTitle}>Add New Income</Text>
          <View style={styles.formGrid}>
            <TextInput
              style={styles.input}
              placeholder="Category"
              value={newIncome.category}
              onChangeText={(text) => setNewIncome({ ...newIncome, category: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={newIncome.description}
              onChangeText={(text) => setNewIncome({ ...newIncome, description: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Customer"
              value={newIncome.customer}
              onChangeText={(text) => setNewIncome({ ...newIncome, customer: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Amount"
              value={newIncome.amount}
              onChangeText={(text) => setNewIncome({ ...newIncome, amount: text })}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Date (YYYY-MM-DD)"
              value={newIncome.date}
              onChangeText={(text) => setNewIncome({ ...newIncome, date: text })}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.submitButton} onPress={addIncome}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowAddForm(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.tableContainer}>
        {filteredIncome.length > 0 ? (
          <FlatList
            data={filteredIncome}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.tableRow}>
                <Text style={styles.cell}>{item.category}</Text>
                <Text style={styles.cell}>{item.description}</Text>
                <Text style={styles.cell}>{item.customer}</Text>
                <Text style={styles.cell}>${item.amount}</Text>
                <Text style={styles.cell}>{formatDate(item.date)}</Text>
              </View>
            )}
            ListHeaderComponent={
              <View style={styles.tableHeader}>
                <Text style={styles.headerCell}>Category</Text>
                <Text style={styles.headerCell}>Description</Text>
                <Text style={styles.headerCell}>Customer</Text>
                <Text style={styles.headerCell}>Amount</Text>
                <Text style={styles.headerCell}>Date</Text>
              </View>
            }
          />
        ) : (
          <View style={styles.emptyState}>
            <Feather name="alert-triangle" size={24} color="#718096" />
            <Text style={styles.emptyText}>No income records found</Text>
            <Text style={styles.emptySubText}>Try adjusting your search or filters</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 12 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    marginRight: 8,
    fontSize: 14,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  filterLabel: {
    fontSize: 12,
    color: '#718096',
    marginRight: 6,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 4,
  },
  activeFilter: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  filterText: {
    fontSize: 12,
    color: '#718096',
  },
  addButton: {
    backgroundColor: '#10b981',
    padding: 8,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  addButtonText: { color: '#fff', fontWeight: '500', fontSize: 14 },
  addForm: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  formTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: 8,
  },
  formGrid: { flexDirection: 'column', gap: 6 },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 8,
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#10b981',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#d1d5db',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerCell: {
    flex: 1,
    fontSize: 10,
    color: '#718096',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    fontSize: 12,
    color: '#1a202c',
    marginBottom: 4,
  },
  emptyState: {
    padding: 16,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 4,
  },
  emptySubText: {
    fontSize: 10,
    color: '#9ca3af',
  },
});

export default Income;