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
      <View style={styles.headerControls}>
        <View style={styles.searchContainer}>
          <Feather
            name="search"
            size={16}
            color="#718096"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search income..."
          />
        </View>
        <TextInput
          style={styles.filterInput}
          value={timeFilter}
          onChangeText={setTimeFilter}
          placeholder="Filter by time..."
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddForm(!showAddForm)}
        >
          <Feather name="plus" size={16} color="#fff" />
          <Text style={styles.addButtonText}>Add Income</Text>
        </TouchableOpacity>
      </View>

      {showAddForm && (
        <View style={styles.addForm}>
          <Text style={styles.formTitle}>Add New Income</Text>
          <View style={styles.formGrid}>
            <TextInput
              style={styles.input}
              value={newIncome.category}
              onChangeText={(text) =>
                setNewIncome({ ...newIncome, category: text })
              }
              placeholder="Category"
            />
            <TextInput
              style={styles.input}
              value={newIncome.description}
              onChangeText={(text) =>
                setNewIncome({ ...newIncome, description: text })
              }
              placeholder="Description"
            />
            <TextInput
              style={styles.input}
              value={newIncome.customer}
              onChangeText={(text) =>
                setNewIncome({ ...newIncome, customer: text })
              }
              placeholder="Customer"
            />
            <TextInput
              style={styles.input}
              value={newIncome.amount}
              onChangeText={(text) =>
                setNewIncome({ ...newIncome, amount: text })
              }
              placeholder="Amount"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              value={newIncome.date}
              onChangeText={(text) =>
                setNewIncome({ ...newIncome, date: text })
              }
              placeholder="Date"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={addIncome}
              >
                <Text style={styles.buttonText}>Add Income</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowAddForm(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      <View style={styles.tableContainer}>
        <FlatList
          data={filteredIncome}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.cell}>{formatDate(item.date)}</Text>
              <Text style={styles.cell}>{item.category}</Text>
              <Text style={styles.cell}>{item.description}</Text>
              <Text style={styles.cell}>{item.customer}</Text>
              <Text style={styles.cell}>${item.amount.toLocaleString()}</Text>
              <View style={styles.actions}>
                <TouchableOpacity>
                  <Feather name="edit" size={16} color="#3b82f6" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Feather name="trash-2" size={16} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No income records found</Text>
              <Text style={styles.emptySubText}>
                Try adjusting your search or filters
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  headerControls: { flexDirection: 'row', gap: 16, marginBottom: 16 },
  searchContainer: { flex: 1, position: 'relative' },
  searchIcon: { position: 'absolute', top: 12, left: 12 },
  searchInput: {
    padding: 12,
    paddingLeft: 40,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
  },
  filterInput: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    width: 150,
  },
  addButton: {
    backgroundColor: '#10b981',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addButtonText: { color: '#fff', fontWeight: '500' },
  addForm: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: 12,
  },
  formGrid: { flexDirection: 'column', gap: 8 },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#10b981',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#d1d5db',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '500' },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
   tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    fontSize: 14,
    color: '#1a202c',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  emptyState: {
    padding: 48,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#718096',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 12,
    color: '#9ca3af',
  },
});

export default Income;