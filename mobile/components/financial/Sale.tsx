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
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';

type SaleItem = {
  id: number;
  category: string;
  description: string;
  customer: string;
  amount: number;
  date: string;
};

const Sale = () => {
  const { width } = useWindowDimensions();
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState('this-month');
  const [customStartDate, setCustomStartDate] = useState<Date | null>(null);
  const [customEndDate, setCustomEndDate] = useState<Date | null>(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showFormDatePicker, setShowFormDatePicker] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  type NewSaleType = Omit<Partial<SaleItem>, 'amount' | 'date'> & { amount: string; date: Date | null };
  const [newSale, setNewSale] = useState<NewSaleType>({
    category: '',
    description: '',
    customer: '',
    amount: '',
    date: null,
  });
  const [selectedSale, setSelectedSale] = useState<SaleItem | null>(null);
  const [saleHistory, setSaleHistory] = useState<SaleItem[]>([
    { id: 1, category: 'Livestock', description: 'Sale of 50 pigs', customer: 'Local Market Co.', amount: 15000, date: '2024-01-15' },
    { id: 2, category: 'By-products', description: 'Manure sold to farm', customer: 'Green Farm Ltd.', amount: 800, date: '2024-01-13' },
  ]);

  const categories = ['Livestock', 'By-products', 'Other'];

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9fafb', padding: width < 480 ? 8 : 16 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: width < 480 ? 8 : 16 },
    searchInput: { flex: 1, padding: 10, borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, marginRight: 8, backgroundColor: '#fff' },
    addButton: { backgroundColor: '#10b981', padding: 10, borderRadius: 8, flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
    buttonText: { color: '#fff', fontWeight: '600', fontSize: 14, marginLeft: 6 },
    filterContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: width < 480 ? 8 : 16 },
    filterText: { fontSize: 14, color: '#374151', marginRight: 8 },
    picker: { height: 45, width: width < 480 ? 140 : 180, backgroundColor: '#fff', borderRadius: 8 },
    modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' },
    modalContent: { backgroundColor: '#fff', borderRadius: 12, padding: 16, width: '85%', maxHeight: '85%', shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 6, elevation: 5 },
    modalTitle: { fontSize: 18, fontWeight: '700', color: '#1a202c', marginBottom: 12, textAlign: 'center' },
    input: { padding: 10, borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, backgroundColor: '#fff', marginBottom: 10 },
    dateInput: { padding: 10, borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, backgroundColor: '#fff', marginBottom: 10 },
    buttonContainer: { flexDirection: 'row', gap: 8, marginTop: 12 },
    submitButton: { flex: 1, backgroundColor: '#10b981', padding: 12, borderRadius: 8, alignItems: 'center' },
    cancelButton: { flex: 1, backgroundColor: '#d1d5db', padding: 12, borderRadius: 8, alignItems: 'center' },
    tableContainer: { marginTop: 12, backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
    tableHeader: { flexDirection: 'row', backgroundColor: '#f3f4f6', padding: 10 },
    headerCell: { flex: 1, fontWeight: '600', fontSize: 13, color: '#111827', textAlign: 'center' },
    tableRow: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
    cell: { flex: 1, fontSize: 13, color: '#374151', textAlign: 'center' },
    actionCell: { flexDirection: 'row', gap: 8, justifyContent: 'center' },
    actionText: { fontSize: 13, color: '#10b981', fontWeight: '500' },
    emptyState: { padding: 40, alignItems: 'center' },
    emptyText: { fontSize: 16, color: '#6b7280', marginBottom: 4 },
    emptySubText: { fontSize: 12, color: '#9ca3af' },
  });

  // --- (rest of your logic stays same: addSale, editSale, deleteSale, filteredSales, DateTimePickers, FlatList etc.)

  // Replace only UI styles + modal wrapper with ScrollView
  // Your existing functions (addSale, editSale, deleteSale, renderItem) stay unchanged
  // Just ensure modalContent uses <ScrollView> inside for forms

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search sales..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => setShowAddForm(true)}>
          <Feather name="plus" size={20} color="#fff" />
          <Text style={styles.buttonText}>Add Sale</Text>
        </TouchableOpacity>
      </View>

      {/* Filter */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterText}>Filter by:</Text>
        <Picker selectedValue={timeFilter} onValueChange={setTimeFilter} style={styles.picker}>
          <Picker.Item label="This Month" value="this-month" />
          <Picker.Item label="Last Month" value="last-month" />
          <Picker.Item label="Custom" value="custom" />
        </Picker>
      </View>

      {/* Table */}
      <View style={styles.tableContainer}>
        {width < 600 ? (
          <ScrollView horizontal>
            <View style={{ width: 600 }}>{/* FlatList here */}</View>
          </ScrollView>
        ) : (
          /* FlatList here */
          <Text> {/* placeholder */} </Text>
        )}
      </View>
    </View>
  );
};

export default Sale;
