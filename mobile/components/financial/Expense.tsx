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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Expense = () => {
  const { width } = useWindowDimensions();
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState('this-month');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExpense, setNewExpense] = useState({
    category: '',
    description: '',
    vendor: '',
    amount: '',
    date: '',
  });

  const [expenseHistory] = useState([
    {
      id: 1,
      category: 'Feed',
      description: 'Monthly pig feed supply',
      vendor: 'Farm Supply Co.',
      amount: 3500,
      date: '2024-01-14',
    },
    {
      id: 2,
      category: 'Salaries',
      description: 'Monthly staff wages',
      vendor: 'Payroll',
      amount: 12000,
      date: '2024-01-01',
    },
  ]);

  const filteredExpenses = expenseHistory
    .filter((expense) => {
      const query = searchQuery.toLowerCase();
      return (
        expense.category.toLowerCase().includes(query) ||
        expense.description.toLowerCase().includes(query) ||
        expense.vendor.toLowerCase().includes(query)
      );
    })
    .sort((a, b) =>
      sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount
    );

  const addExpense = () => {
    if (
      newExpense.category &&
      newExpense.description &&
      newExpense.vendor &&
      newExpense.amount &&
      newExpense.date
    ) {
      console.log('Expense added:', newExpense);
      setNewExpense({
        category: '',
        description: '',
        vendor: '',
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
          <MaterialIcons
            name="search"
            size={16}
            color="#718096"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search expenses..."
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
          <MaterialIcons name="add" size={16} color="#fff" />
          <Text style={styles.addButtonText}>Add Expense</Text>
        </TouchableOpacity>
      </View>

      {showAddForm && (
        <View style={styles.addForm}>
          <Text style={styles.formTitle}>Add New Expense</Text>
          <View style={styles.formGrid}>
            <TextInput
              style={styles.input}
              value={newExpense.category}
              onChangeText={(text) =>
                setNewExpense({ ...newExpense, category: text })
              }
              placeholder="Category"
            />
            <TextInput
              style={styles.input}
              value={newExpense.description}
              onChangeText={(text) =>
                setNewExpense({ ...newExpense, description: text })
              }
              placeholder="Description"
            />
            <TextInput
              style={styles.input}
              value={newExpense.vendor}
              onChangeText={(text) =>
                setNewExpense({ ...newExpense, vendor: text })
              }
              placeholder="Vendor"
            />
            <TextInput
              style={styles.input}
              value={newExpense.amount}
              onChangeText={(text) =>
                setNewExpense({ ...newExpense, amount: text })
              }
              placeholder="Amount"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              value={newExpense.date}
              onChangeText={(text) =>
                setNewExpense({ ...newExpense, date: text })
              }
              placeholder="Date"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={addExpense}
              >
                <Text style={styles.buttonText}>Add Expense</Text>
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
        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>Date</Text>
          <Text style={styles.headerCell}>Category</Text>
          <Text style={styles.headerCell}>Description</Text>
          <Text style={styles.headerCell}>Vendor</Text>
          <TouchableOpacity
            onPress={() =>
              setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
            }
          >
            <Text style={styles.headerCell}>
              Amount{' '}
              <MaterialIcons
                name="expand-less"
                size={12}
                color={sortOrder === 'asc' ? '#1a202c' : '#9ca3af'}
              />{' '}
              <MaterialIcons
                name="expand-more"
                size={12}
                color={sortOrder === 'desc' ? '#1a202c' : '#9ca3af'}
              />
            </Text>
          </TouchableOpacity>
          <Text style={styles.headerCell}>Actions</Text>
        </View>
        <FlatList
          data={filteredExpenses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.cell}>{formatDate(item.date)}</Text>
              <Text style={styles.cell}>{item.category}</Text>
              <Text style={styles.cell}>{item.description}</Text>
              <Text style={styles.cell}>{item.vendor}</Text>
              <Text style={styles.cell}>${item.amount.toLocaleString()}</Text>
              <View style={styles.actions}>
                <TouchableOpacity>
                  <MaterialIcons name="edit" size={16} color="#3b82f6" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <MaterialIcons name="delete" size={16} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No expense records found</Text>
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
   formGrid: {
    flexDirection: 'column',
    gap: 8,
  },
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
  buttonText: {
    color: '#fff',
    fontWeight: '500',
  },
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
  tableHeader: {
    flexDirection: 'row',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerCell: {
    flex: 1,
    fontSize: 12,
    color: '#718096',
    fontWeight: '600',
    textTransform: 'uppercase',
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

export default Expense;