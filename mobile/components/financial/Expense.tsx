import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  SafeAreaView,
  Alert,
  FlatList,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '@/assets/Expense.styles';

type ExpenseItem = {
  id: number;
  category: string;
  description: string;
  supplier: string;
  amount: number;
  date: string;
};

const categories = ['Feed', 'Equipment', 'Labor', 'Other'];

const Expense = () => {
  const { width } = useWindowDimensions();

  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState('this-month');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<ExpenseItem | null>(null);
  const [newExpense, setNewExpense] = useState<Partial<Omit<ExpenseItem, 'amount'> & { amount: number | string }>>({
    category: '',
    description: '',
    supplier: '',
    amount: '',
    date: '',
  });

  const [expenseHistory, setExpenseHistory] = useState<ExpenseItem[]>([
    { id: 1, category: 'Feed', description: 'Purchase of pig feed', supplier: 'Farm Supply Co.', amount: 5000, date: '2024-01-15' },
    { id: 2, category: 'Equipment', description: 'New tractor repair', supplier: 'Machinery Inc.', amount: 3000, date: '2024-01-13' },
  ]);

  // Add Expense
  const addExpense = () => {
    if (!newExpense.category || !newExpense.description || !newExpense.supplier || !newExpense.amount || !newExpense.date) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    const newId = expenseHistory.length ? expenseHistory[expenseHistory.length - 1].id + 1 : 1;
    setExpenseHistory([...expenseHistory, { ...newExpense, amount: Number(newExpense.amount), id: newId } as ExpenseItem]);
    setNewExpense({ category: '', description: '', supplier: '', amount: '', date: '' });
    setShowAddForm(false);
  };

  // Edit Expense
  const editExpense = () => {
    if (!selectedExpense) return;
    setExpenseHistory(expenseHistory.map(exp => (exp.id === selectedExpense.id ? { ...selectedExpense } : exp)));
    setSelectedExpense(null);
    setShowEditForm(false);
  };

  // Delete Expense
  const deleteExpense = (id: number) => {
    Alert.alert('Confirm Delete', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => setExpenseHistory(expenseHistory.filter(e => e.id !== id)) },
    ]);
  };

  const minTableWidth = 600;

  const filteredExpenses = expenseHistory.filter(e => e.description.toLowerCase().includes(searchQuery.toLowerCase()));

  const renderItem = ({ item }: { item: ExpenseItem }) => (
    <View style={styles.tableRow}>
      <Text style={styles.cell}>{item.category}</Text>
      <Text style={styles.cell}>{item.description}</Text>
      <Text style={styles.cell}>{item.supplier}</Text>
      <Text style={styles.cell}>{item.amount}</Text>
      <Text style={styles.cell}>{item.date}</Text>
      <View style={styles.actionCell}>
        <TouchableOpacity
          onPress={() => {
            setSelectedExpense(item);
            setShowEditForm(true);
          }}
        >
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteExpense(item.id)}>
          <Text style={[styles.actionText, { color: 'red' }]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search expenses..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => setShowAddForm(true)}>
          <Feather name="plus" size={18} color="#fff" />
          <Text style={styles.buttonText}>Add Expense</Text>
        </TouchableOpacity>
      </View>

      {/* Filter */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterText}>Filter by:</Text>
        <Picker selectedValue={timeFilter} onValueChange={(val) => setTimeFilter(val as string)} style={styles.picker}>
          <Picker.Item label="This Month" value="this-month" />
          <Picker.Item label="Last Month" value="last-month" />
          <Picker.Item label="Custom" value="custom" />
        </Picker>
      </View>

      {/* Table */}
      <View style={styles.tableContainer}>
        <View style={width < minTableWidth ? { width: minTableWidth } : undefined}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Category</Text>
            <Text style={styles.headerCell}>Description</Text>
            <Text style={styles.headerCell}>Supplier</Text>
            <Text style={styles.headerCell}>Amount</Text>
            <Text style={styles.headerCell}>Date</Text>
            <Text style={styles.headerCell}>Actions</Text>
          </View>
          {filteredExpenses.length ? (
            <FlatList data={filteredExpenses} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No expenses found</Text>
              <Text style={styles.emptySubText}>Try adding a new expense or changing the filter.</Text>
            </View>
          )}
        </View>
      </View>

      {/* Add/Edit Modal */}
      {(showAddForm || showEditForm) && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>{showEditForm ? 'Edit Expense' : 'Add Expense'}</Text>
              {['category', 'description', 'supplier', 'amount', 'date'].map((field) => (
                <TextInput
                  key={field}
                  style={styles.input}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={(showEditForm && selectedExpense ? (selectedExpense as any)[field] : (newExpense as any)[field])?.toString() || ''}
                  onChangeText={(val) => {
                    if (showEditForm && selectedExpense) setSelectedExpense({ ...selectedExpense, [field]: field === 'amount' ? Number(val) : val });
                    else setNewExpense({ ...newExpense, [field]: field === 'amount' ? Number(val) : val });
                  }}
                />
              ))}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={showEditForm ? editExpense : addExpense}
                >
                  <Text style={styles.buttonText}>{showEditForm ? 'Save' : 'Add'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    setShowAddForm(false);
                    setShowEditForm(false);
                  }}
                >
                  <Text>Cancel</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Expense;
