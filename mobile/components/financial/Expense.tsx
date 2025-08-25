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
import Feather from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';

type ExpenseItem = {
  id: number;
  category: string;
  description: string;
  supplier: string;
  amount: number;
  date: string;
};

const Expenses = () => {
  const { width } = useWindowDimensions();
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState('this-month');
  const [customStartDate, setCustomStartDate] = useState<Date | null>(null);
  const [customEndDate, setCustomEndDate] = useState<Date | null>(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [newExpense, setNewExpense] = useState<Partial<ExpenseItem>>({
    category: '',
    description: '',
    supplier: '',
    amount: '',
    date: null,
  });
  const [selectedExpense, setSelectedExpense] = useState<ExpenseItem | null>(null);
  const [expenseHistory, setExpenseHistory] = useState<ExpenseItem[]>([
    { id: 1, category: 'Feed', description: 'Purchase of pig feed', supplier: 'Farm Supply Co.', amount: 5000, date: '2024-01-15' },
    { id: 2, category: 'Equipment', description: 'New tractor repair', supplier: 'Machinery Inc.', amount: 3000, date: '2024-01-13' },
  ]);

  const categories = ['Feed', 'Equipment', 'Labor', 'Other'];

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
    modalContent: { backgroundColor: '#fff', borderRadius: 8, padding: width < 480 ? 8 : 16, width: '80%' },
    modalTitle: { fontSize: width < 480 ? 14 : 16, fontWeight: '600' as const, color: '#1a202c', marginBottom: width < 480 ? 6 : 12 },
    formGrid: { flexDirection: 'column' as const, gap: width < 480 ? 4 : 8 },
    input: { padding: width < 480 ? 6 : 12, borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8 },
    dateInput: { padding: width < 480 ? 6 : 12, borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, color: newExpense.date ? newExpense.date.toISOString().split('T')[0] : 'Select Date' },
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

  const addExpense = () => {
    if (!newExpense.category || !newExpense.description || !newExpense.supplier || !newExpense.amount || !newExpense.date) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    const id = expenseHistory.length + 1;
    setExpenseHistory([...expenseHistory, { id, ...newExpense, amount: Number(newExpense.amount), date: newExpense.date!.toISOString().split('T')[0] } as ExpenseItem]);
    setNewExpense({ category: '', description: '', supplier: '', amount: '', date: null });
    setShowAddForm(false);
  };

  const editExpense = () => {
    if (!selectedExpense || !newExpense.category || !newExpense.description || !newExpense.supplier || !newExpense.amount || !newExpense.date) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    setExpenseHistory(expenseHistory.map(item => item.id === selectedExpense.id ? { ...item, ...newExpense, amount: Number(newExpense.amount), date: newExpense.date!.toISOString().split('T')[0] } as ExpenseItem : item));
    setNewExpense({ category: '', description: '', supplier: '', amount: '', date: null });
    setSelectedExpense(null);
    setShowEditForm(false);
  };

  const deleteExpense = (id: number) => {
    Alert.alert('Confirm', 'Are you sure you want to delete this expense?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: () => setExpenseHistory(expenseHistory.filter(item => item.id !== id)) },
    ]);
  };

  const filteredExpenses = expenseHistory.filter(item =>
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.supplier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }: { item: ExpenseItem }) => (
    <View style={getDynamicStyles().tableRow}>
      <Text style={getDynamicStyles().cell}>{item.category}</Text>
      <Text style={getDynamicStyles().cell}>{item.description}</Text>
      <Text style={getDynamicStyles().cell}>{item.supplier}</Text>
      <Text style={getDynamicStyles().cell}>${item.amount.toFixed(2)}</Text>
      <Text style={getDynamicStyles().cell}>{item.date}</Text>
      <View style={getDynamicStyles().actionCell}>
        <TouchableOpacity onPress={() => { setSelectedExpense(item); setNewExpense(item); setShowEditForm(true); }}>
          <Text style={getDynamicStyles().actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteExpense(item.id)}>
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
          placeholder="Search expenses..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={getDynamicStyles().addButton} onPress={() => setShowAddForm(true)}>
          <Feather name="plus" size={width < 480 ? 18 : 24} color="#fff" />
          <Text style={getDynamicStyles().buttonText}>Add Expense</Text>
        </TouchableOpacity>
      </View>
      <View style={getDynamicStyles().filterContainer}>
        <Text style={getDynamicStyles().filterText}>Filter by:</Text>
        <Picker
          selectedValue={timeFilter}
          onValueChange={(itemValue) => setTimeFilter(itemValue as string)}
          style={getDynamicStyles().picker}
        >
          <Picker.Item label="This Month" value="this-month" />
          <Picker.Item label="Last Month" value="last-month" />
          <Picker.Item label="Custom" value="custom" />
        </Picker>
      </View>
      {timeFilter === 'custom' && (
        <View style={{ flexDirection: 'row' as const, gap: width < 480 ? 4 : 8, marginBottom: width < 480 ? 8 : 12 }}>
          <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
            <TextInput
              style={getDynamicStyles().dateInput}
              placeholder="Start Date"
              value={customStartDate ? customStartDate.toISOString().split('T')[0] : ''}
              editable={false}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
            <TextInput
              style={getDynamicStyles().dateInput}
              placeholder="End Date"
              value={customEndDate ? customEndDate.toISOString().split('T')[0] : ''}
              editable={false}
            />
          </TouchableOpacity>
        </View>
      )}
      {showStartDatePicker && (
        <DateTimePicker
          value={customStartDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowStartDatePicker(false);
            setCustomStartDate(selectedDate || null);
          }}
        />
      )}
      {showEndDatePicker && (
        <DateTimePicker
          value={customEndDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowEndDatePicker(false);
            setCustomEndDate(selectedDate || null);
          }}
        />
      )}
      {(showAddForm || showEditForm) && (
        <View style={getDynamicStyles().modalOverlay}>
          <View style={getDynamicStyles().modalContent}>
            <Text style={getDynamicStyles().modalTitle}>{showEditForm ? 'Edit Expense' : 'Add New Expense'}</Text>
            <View style={getDynamicStyles().formGrid}>
              <Picker
                selectedValue={newExpense.category}
                onValueChange={(itemValue) => setNewExpense({ ...newExpense, category: itemValue as string })}
                style={getDynamicStyles().picker}
              >
                <Picker.Item label="Select Category" value="" />
                {categories.map((cat) => <Picker.Item key={cat} label={cat} value={cat} />)}
              </Picker>
              <TextInput
                style={getDynamicStyles().input}
                placeholder="Description"
                value={newExpense.description}
                onChangeText={(text) => setNewExpense({ ...newExpense, description: text })}
              />
              <TextInput
                style={getDynamicStyles().input}
                placeholder="Supplier"
                value={newExpense.supplier}
                onChangeText={(text) => setNewExpense({ ...newExpense, supplier: text })}
              />
              <TextInput
                style={getDynamicStyles().input}
                placeholder="Amount"
                value={newExpense.amount}
                keyboardType="numeric"
                onChangeText={(text) => setNewExpense({ ...newExpense, amount: text })}
              />
              <TouchableOpacity onPress={() => setShowFormDatePicker(true)}>
                <TextInput
                  style={getDynamicStyles().dateInput}
                  placeholder="Date"
                  value={newExpense.date ? newExpense.date.toISOString().split('T')[0] : ''}
                  editable={false}
                />
              </TouchableOpacity>
            </View>
            {showFormDatePicker && (
              <DateTimePicker
                value={newExpense.date || new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowFormDatePicker(false);
                  setNewExpense({ ...newExpense, date: selectedDate || null });
                }}
              />
            )}
            <View style={getDynamicStyles().buttonContainer}>
              <TouchableOpacity style={getDynamicStyles().submitButton} onPress={showEditForm ? editExpense : addExpense}>
                <Text style={getDynamicStyles().buttonText}>{showEditForm ? 'Update' : 'Submit'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={getDynamicStyles().cancelButton} onPress={() => { setShowAddForm(false); setShowEditForm(false); setNewExpense({ category: '', description: '', supplier: '', amount: '', date: null }); }}>
                <Text style={getDynamicStyles().buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      <View style={getDynamicStyles().tableContainer}>
        <View style={getDynamicStyles().tableHeader}>
          <Text style={getDynamicStyles().headerCell}>Category</Text>
          <Text style={getDynamicStyles().headerCell}>Description</Text>
          <Text style={getDynamicStyles().headerCell}>Supplier</Text>
          <Text style={getDynamicStyles().headerCell}>Amount</Text>
          <Text style={getDynamicStyles().headerCell}>Date</Text>
          <Text style={getDynamicStyles().headerCell}>Actions</Text>
        </View>
        <FlatList
          data={[...filteredExpenses]}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<View style={getDynamicStyles().emptyState}><Text style={getDynamicStyles().emptyText}>No expenses found</Text><Text style={getDynamicStyles().emptySubText}>Try adjusting your search or filters</Text></View>}
          contentContainerStyle={{ paddingBottom: width < 480 ? 16 : 24 }}
        />
      </View>
    </View>
  );
};

export default Expenses;