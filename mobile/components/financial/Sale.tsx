import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type SaleItem = {
  id: number;
  product: string;
  description: string;
  customer: string;
  amount: number;
  date: string;
};

const Sale = () => {
  const { width } = useWindowDimensions();
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState('All Time');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [newSale, setNewSale] = useState<Partial<SaleItem>>({
    product: '',
    description: '',
    customer: '',
    amount: 0,
    date: '',
  });
  const [selectedSale, setSelectedSale] = useState<SaleItem | null>(null);
  const [saleHistory, setSaleHistory] = useState<SaleItem[]>([
    { id: 1, product: 'Pig Sales', description: '50 pigs sold to local market', customer: 'Local Market Co.', amount: 15000, date: '2024-01-15' },
    { id: 2, product: 'Manure Sales', description: 'Organic fertilizer sales', customer: 'Garden Center', amount: 800, date: '2024-01-13' },
    { id: 3, product: 'Pig Sales', description: '30 pigs sold to restaurant chain', customer: 'Restaurant Chain', amount: 8500, date: '2024-01-08' },
    { id: 4, product: 'Egg Sales', description: 'Fresh eggs weekly delivery', customer: 'Local Grocery', amount: 1200, date: '2024-01-05' },
  ]);

  const getDynamicStyles = () => ({
    container: { flex: 1, backgroundColor: '#fff', padding: width < 480 ? 8 : 16 },
    header: { flexDirection: 'row' as const, justifyContent: 'space-between' as const, alignItems: 'center' as const, marginBottom: width < 480 ? 8 : 12 },
    searchInput: { padding: width < 480 ? 6 : 12, borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, flex: 1, marginRight: width < 480 ? 4 : 8 },
    filterContainer: { flexDirection: 'row' as const, alignItems: 'center' as const, marginBottom: width < 480 ? 8 : 12 },
    filterText: { fontSize: width < 480 ? 12 : 14, color: '#718096', marginRight: width < 480 ? 4 : 8 },
    picker: { height: 50, width: width < 480 ? 120 : 150 },
    addButton: { backgroundColor: '#10b981', padding: width < 480 ? 6 : 12, borderRadius: 8, flexDirection: 'row' as const, alignItems: 'center' as const, gap: width < 480 ? 4 : 8 },
    buttonText: { color: '#fff', fontWeight: '500' as const, fontSize: width < 480 ? 12 : 14 },
    modalOverlay: { flex: 1, justifyContent: 'center' as const, alignItems: 'center' as const, backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContent: { backgroundColor: '#fff', borderRadius: 8, padding: width < 480 ? 8 : 16, width: '80%' as const }, // Fixed width to '80%'
    modalTitle: { fontSize: width < 480 ? 14 : 16, fontWeight: '600' as const, color: '#1a202c', marginBottom: width < 480 ? 6 : 12 },
    formGrid: { flexDirection: 'column' as const, gap: width < 480 ? 4 : 8 },
    input: { padding: width < 480 ? 6 : 12, borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8 },
    buttonContainer: { flexDirection: 'row' as const, gap: width < 480 ? 4 : 8, marginTop: width < 480 ? 6 : 12 },
    submitButton: { flex: 1, backgroundColor: '#10b981', padding: width < 480 ? 6 : 12, borderRadius: 8, alignItems: 'center' as const },
    cancelButton: { flex: 1, backgroundColor: '#d1d5db', padding: width < 480 ? 6 : 12, borderRadius: 8, alignItems: 'center' as const },
    tableContainer: { marginTop: width < 480 ? 8 : 16 },
    tableHeader: { flexDirection: 'row' as const, backgroundColor: '#f7fafc', padding: width < 480 ? 6 : 12, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
    headerCell: { flex: 1, fontWeight: '600' as const, fontSize: width < 480 ? 12 : 14, color: '#1a202c', textAlign: 'center' as const },
    tableRow: { flexDirection: 'row' as const, padding: width < 480 ? 6 : 12, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
    cell: { flex: 1, fontSize: width < 480 ? 12 : 14, color: '#4a5568', textAlign: 'center' as const },
    actionCell: { flexDirection: 'row' as const, gap: width < 480 ? 4 : 8, justifyContent: 'center' as const },
    actionText: { fontSize: width < 480 ? 12 : 14, color: '#10b981', fontWeight: '500' as const },
    emptyState: { padding: width < 480 ? 16 : 48, alignItems: 'center' as const },
    emptyText: { fontSize: width < 480 ? 14 : 16, color: '#718096', marginBottom: width < 480 ? 4 : 8 },
    emptySubText: { fontSize: width < 480 ? 10 : 12, color: '#9ca3af' },
  });

  const addSale = () => {
    if (!newSale.product || !newSale.description || !newSale.customer || !newSale.amount || !newSale.date) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    const id = saleHistory.length + 1;
    setSaleHistory([...saleHistory, { id, ...newSale, amount: Number(newSale.amount), date: newSale.date } as SaleItem]);
    setNewSale({ product: '', description: '', customer: '', amount: 0, date: '' });
    setShowAddForm(false);
  };

  const editSale = () => {
    if (!selectedSale || !newSale.product || !newSale.description || !newSale.customer || !newSale.amount || !newSale.date) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    setSaleHistory(saleHistory.map(item => item.id === selectedSale.id ? { ...item, ...newSale, amount: Number(newSale.amount), date: newSale.date } as SaleItem : item));
    setNewSale({ product: '', description: '', customer: '', amount: 0, date: '' });
    setSelectedSale(null);
    setShowEditForm(false);
  };

  const deleteSale = (id: number) => {
    Alert.alert('Confirm', 'Are you sure you want to delete this sale?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: () => setSaleHistory(saleHistory.filter(item => item.id !== id)) },
    ]);
  };

  const filteredSales = saleHistory
    .filter(item =>
      item.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.customer.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount);

  const renderItem = ({ item }: { item: SaleItem }) => (
    <View style={getDynamicStyles().tableRow}>
      <Text style={getDynamicStyles().cell}>{item.product}</Text>
      <Text style={getDynamicStyles().cell}>{item.description}</Text>
      <Text style={getDynamicStyles().cell}>{item.customer}</Text>
      <Text style={getDynamicStyles().cell}>${item.amount.toFixed(2)}</Text>
      <Text style={getDynamicStyles().cell}>{item.date}</Text>
      <View style={getDynamicStyles().actionCell}>
        <TouchableOpacity onPress={() => { setSelectedSale(item); setNewSale(item); setShowEditForm(true); }}>
          <Text style={getDynamicStyles().actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteSale(item.id)}>
          <Text style={[getDynamicStyles().actionText, { color: '#ef4444' }]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={getDynamicStyles().container}>
      <View style={getDynamicStyles().header}>
        <TextInput
          style={getDynamicStyles().searchInput}
          placeholder="Search sales..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={getDynamicStyles().addButton} onPress={() => setShowAddForm(true)}>
          <MaterialIcons name="add" size={width < 480 ? 18 : 24} color="#fff" />
          <Text style={getDynamicStyles().buttonText}>Add Sale</Text>
        </TouchableOpacity>
      </View>
      <View style={getDynamicStyles().filterContainer}>
        <Text style={getDynamicStyles().filterText}>Filter by:</Text>
        <Picker
          selectedValue={timeFilter}
          onValueChange={(itemValue: string) => setTimeFilter(itemValue)}
          style={getDynamicStyles().picker}
        >
          <Picker.Item label="All Time" value="all-time" />
          <Picker.Item label="This Month" value="this-month" />
          <Picker.Item label="Last Month" value="last-month" />
        </Picker>
        <Text style={getDynamicStyles().filterText}>Sort by Amount:</Text>
        <Picker
          selectedValue={sortOrder}
          onValueChange={(itemValue: 'asc' | 'desc') => setSortOrder(itemValue)}
          style={getDynamicStyles().picker}
        >
          <Picker.Item label="Descending" value="desc" />
          <Picker.Item label="Ascending" value="asc" />
        </Picker>
      </View>
      {(showAddForm || showEditForm) && (
        <View style={getDynamicStyles().modalOverlay}>
          <View style={getDynamicStyles().modalContent}>
            <Text style={getDynamicStyles().modalTitle}>{showEditForm ? 'Edit Sale' : 'Add New Sale'}</Text>
            <View style={getDynamicStyles().formGrid}>
              <TextInput
                style={getDynamicStyles().input}
                placeholder="Product"
                value={newSale.product}
                onChangeText={(text) => setNewSale({ ...newSale, product: text })}
              />
              <TextInput
                style={getDynamicStyles().input}
                placeholder="Description"
                value={newSale.description}
                onChangeText={(text) => setNewSale({ ...newSale, description: text })}
              />
              <TextInput
                style={getDynamicStyles().input}
                placeholder="Customer"
                value={newSale.customer}
                onChangeText={(text) => setNewSale({ ...newSale, customer: text })}
              />
              <TextInput
                style={getDynamicStyles().input}
                placeholder="Amount"
                value={newSale.amount ? newSale.amount.toString() : ''}
                keyboardType="numeric"
                onChangeText={(text) => setNewSale({ ...newSale, amount: text ? Number(text) : 0 })}
              />
              <TextInput
                style={getDynamicStyles().input}
                placeholder="Date (YYYY-MM-DD)"
                value={newSale.date}
                onChangeText={(text) => setNewSale({ ...newSale, date: text })}
              />
            </View>
            <View style={getDynamicStyles().buttonContainer}>
              <TouchableOpacity style={getDynamicStyles().submitButton} onPress={showEditForm ? editSale : addSale}>
                <Text style={getDynamicStyles().buttonText}>{showEditForm ? 'Update' : 'Submit'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={getDynamicStyles().cancelButton} onPress={() => { setShowAddForm(false); setShowEditForm(false); setNewSale({ product: '', description: '', customer: '', amount: 0, date: '' }); }}>
                <Text style={getDynamicStyles().buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      <View style={getDynamicStyles().tableContainer}>
        <View style={getDynamicStyles().tableHeader}>
          <Text style={getDynamicStyles().headerCell}>Product</Text>
          <Text style={getDynamicStyles().headerCell}>Description</Text>
          <Text style={getDynamicStyles().headerCell}>Customer</Text>
          <Text style={getDynamicStyles().headerCell}>Amount</Text>
          <Text style={getDynamicStyles().headerCell}>Date</Text>
          <Text style={getDynamicStyles().headerCell}>Actions</Text>
        </View>
        <FlatList
          data={filteredSales}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <View style={getDynamicStyles().emptyState}>
              <Text style={getDynamicStyles().emptyText}>No sales found</Text>
              <Text style={getDynamicStyles().emptySubText}>Try adjusting your search</Text>
            </View>
          }
          contentContainerStyle={{ paddingBottom: width < 480 ? 16 : 24 }}
        />
      </View>
    </View>
  );
};

export default Sale;