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

const Sale = () => {
  const { width } = useWindowDimensions();
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState('All Time');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSale, setNewSale] = useState({
    product: '',
    description: '',
    customer: '',
    amount: '',
    date: '',
  });

  const [saleHistory] = useState([
    { id: 1, product: 'Pig Sales', description: '50 pigs sold to local market', customer: 'Local Market Co.', amount: 15000, date: '2024-01-15' },
    { id: 2, product: 'Manure Sales', description: 'Organic fertilizer sales', customer: 'Garden Center', amount: 800, date: '2024-01-13' },
    { id: 3, product: 'Pig Sales', description: '30 pigs sold to restaurant chain', customer: 'Restaurant Chain', amount: 8500, date: '2024-01-08' },
    { id: 4, product: 'Egg Sales', description: 'Fresh eggs weekly delivery', customer: 'Local Grocery', amount: 1200, date: '2024-01-05' },
  ]);

  const filteredSales = saleHistory
    .filter((sale) => {
      const query = searchQuery.toLowerCase();
      return (
        sale.product.toLowerCase().includes(query) ||
        sale.description.toLowerCase().includes(query) ||
        sale.customer.toLowerCase().includes(query)
      );
    })
    .sort((a, b) =>
      sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount
    );

  const addSale = () => {
    if (
      newSale.product &&
      newSale.description &&
      newSale.customer &&
      newSale.amount &&
      newSale.date
    ) {
      console.log('Sale added:', newSale);
      setNewSale({
        product: '',
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
            placeholder="Search sales..."
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
          <Text style={styles.addButtonText}>Add Sale</Text>
        </TouchableOpacity>
      </View>

      {showAddForm && (
        <View style={styles.addForm}>
          <Text style={styles.formTitle}>Add New Sale</Text>
          <View style={styles.formGrid}>
            <TextInput
              style={styles.input}
              value={newSale.product}
              onChangeText={(text) =>
                setNewSale({ ...newSale, product: text })
              }
              placeholder="Product"
            />
            <TextInput
              style={styles.input}
              value={newSale.description}
              onChangeText={(text) =>
                setNewSale({ ...newSale, description: text })
              }
              placeholder="Description"
            />
            <TextInput
              style={styles.input}
              value={newSale.customer}
              onChangeText={(text) =>
                setNewSale({ ...newSale, customer: text })
              }
              placeholder="Customer"
            />
            <TextInput
              style={styles.input}
              value={newSale.amount}
              onChangeText={(text) =>
                setNewSale({ ...newSale, amount: text })
              }
              placeholder="Amount"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              value={newSale.date}
              onChangeText={(text) =>
                setNewSale({ ...newSale, date: text })
              }
              placeholder="Date"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={addSale}
              >
                <Text style={styles.buttonText}>Add Sale</Text>
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
          <Text style={styles.headerCell}>Product Name</Text>
          <Text style={styles.headerCell}>Description</Text>
          <Text style={styles.headerCell}>Customer</Text>
          <Text
            style={styles.headerCell}
            onPress={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
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
          <Text style={styles.headerCell}>Actions</Text>
        </View>
        <FlatList
          data={filteredSales}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.cell}>{formatDate(item.date)}</Text>
              <Text style={styles.cell}>{item.product}</Text>
              <Text style={styles.cell}>{item.description}</Text>
              <Text style={styles.cell}>{item.customer}</Text>
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
              <Text style={styles.emptyText}>No sale records found</Text>
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

export default Sale;