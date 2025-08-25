import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Alert,
  FlatList,
  ScrollView,
  Modal,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';

type IncomeItem = {
  id: number;
  category: string;
  description: string;
  customer: string;
  amount: number;
  date: string | Date;
};

const Income = () => {
  const { width } = useWindowDimensions();
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState('this-month');
  const [customStartDate, setCustomStartDate] = useState<Date | null>(null);
  const [customEndDate, setCustomEndDate] = useState<Date | null>(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showFormDatePicker, setShowFormDatePicker] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [newIncome, setNewIncome] = useState<Partial<IncomeItem>>({
    category: '',
    description: '',
    customer: '',
    amount: 0,
    date: undefined,
  });
  const [selectedIncome, setSelectedIncome] = useState<IncomeItem | null>(null);

  const [incomeHistory, setIncomeHistory] = useState<IncomeItem[]>([
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

  const categories = ['Pig Sales', 'Manure Sales', 'Egg Sales', 'Other'];

  const styles = getDynamicStyles(width);

  const addIncome = () => {
    if (!newIncome.category || !newIncome.description || !newIncome.customer || !newIncome.amount || !newIncome.date) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    const id = incomeHistory.length + 1;
    setIncomeHistory([
      ...incomeHistory,
      {
        id,
        ...newIncome,
        amount: Number(newIncome.amount),
        date: newIncome.date!.toString().split('T')[0],
      } as IncomeItem,
    ]);
    resetForm();
  };

  const editIncome = () => {
    if (!selectedIncome || !newIncome.category || !newIncome.description || !newIncome.customer || !newIncome.amount || !newIncome.date) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    setIncomeHistory(
      incomeHistory.map((item) =>
        item.id === selectedIncome.id
          ? {
              ...item,
              ...newIncome,
              amount: Number(newIncome.amount),
              date: newIncome.date!.toString().split('T')[0],
            }
          : item
      )
    );
    resetForm();
  };

  const deleteIncome = (id: number) => {
    Alert.alert('Confirm', 'Are you sure you want to delete this income?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: () => setIncomeHistory(incomeHistory.filter((item) => item.id !== id)) },
    ]);
  };

  const resetForm = () => {
    setNewIncome({ category: '', description: '', customer: '', amount: 0, date: undefined });
    setSelectedIncome(null);
    setShowForm(false);
    setEditMode(false);
  };

  const filteredIncome = incomeHistory.filter(
    (item) =>
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item, index }: { item: IncomeItem; index: number }) => (
    <View style={[styles.tableRow, index % 2 === 1 && { backgroundColor: '#f9fafb' }]}>
      <Text style={styles.cell}>{item.category}</Text>
      <Text style={styles.cell}>{item.description}</Text>
      <Text style={styles.cell}>{item.customer}</Text>
      <Text style={styles.cell}>${item.amount.toFixed(2)}</Text>
      <Text style={styles.cell}>
        {typeof item.date === 'string' ? item.date : item.date instanceof Date ? item.date.toISOString().split('T')[0] : ''}
      </Text>
      <View style={styles.actionCell}>
        <TouchableOpacity
          onPress={() => {
            setSelectedIncome(item);
            setNewIncome(item);
            setShowForm(true);
            setEditMode(true);
          }}
        >
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteIncome(item.id)}>
          <Text style={[styles.actionText, { color: '#ef4444' }]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        {/* Search + Add */}
        <View style={styles.header}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search income..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              setShowForm(true);
              setEditMode(false);
            }}
          >
            <Feather name="plus" size={width < 480 ? 18 : 22} color="#fff" />
            <Text style={styles.buttonText}>Add</Text>
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

        {/* Custom Dates */}
        {timeFilter === 'custom' && (
          <View style={styles.dateRangeRow}>
            <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
              <TextInput
                style={styles.dateInput}
                placeholder="Start Date"
                value={customStartDate ? customStartDate.toISOString().split('T')[0] : ''}
                editable={false}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
              <TextInput
                style={styles.dateInput}
                placeholder="End Date"
                value={customEndDate ? customEndDate.toISOString().split('T')[0] : ''}
                editable={false}
              />
            </TouchableOpacity>
          </View>
        )}

        {/* Date pickers */}
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

        {/* Table */}
        <View style={styles.tableContainer}>
          {width < 600 ? (
            <ScrollView horizontal>
              <View style={{ width: 600 }}>{tableContent(filteredIncome, renderItem, styles, width)}</View>
            </ScrollView>
          ) : (
            tableContent(filteredIncome, renderItem, styles, width)
          )}
        </View>
      </View>

      {/* Add/Edit Modal */}
      <Modal visible={showForm} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text style={styles.modalTitle}>{editMode ? 'Edit Income' : 'Add Income'}</Text>

            <Picker
              selectedValue={newIncome.category}
              onValueChange={(val) => setNewIncome({ ...newIncome, category: val as string })}
              style={styles.picker}
            >
              <Picker.Item label="Select Category" value="" />
              {categories.map((c) => (
                <Picker.Item key={c} label={c} value={c} />
              ))}
            </Picker>

            <TextInput style={styles.input} placeholder="Description" value={newIncome.description} onChangeText={(t) => setNewIncome({ ...newIncome, description: t })} />
            <TextInput style={styles.input} placeholder="Customer" value={newIncome.customer} onChangeText={(t) => setNewIncome({ ...newIncome, customer: t })} />
            <TextInput
              style={styles.input}
              placeholder="Amount"
              keyboardType="numeric"
              value={newIncome.amount !== undefined ? String(newIncome.amount) : ''}
              onChangeText={(t) => setNewIncome({ ...newIncome, amount: Number(t) })}
            />

            <TouchableOpacity onPress={() => setShowFormDatePicker(true)}>
              <TextInput
                style={styles.dateInput}
                placeholder="Date"
                value={newIncome.date ? newIncome.date.toString().split('T')[0] : ''}
                editable={false}
              />
            </TouchableOpacity>
            {showFormDatePicker && (
              <DateTimePicker
                value={typeof newIncome.date === 'string' ? new Date(newIncome.date) : newIncome.date || new Date()}
                mode="date"
                display="default"
                onChange={(e, date) => {
                  setShowFormDatePicker(false);
                  setNewIncome({ ...newIncome, date: date || undefined });
                }}
              />
            )}

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.submitButton} onPress={editMode ? editIncome : addIncome}>
                <Text style={styles.buttonText}>{editMode ? 'Update' : 'Submit'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={resetForm}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const tableContent = (data: IncomeItem[], renderItem: any, styles: any, width: number) => (
  <View>
    <View style={styles.tableHeader}>
      <Text style={styles.headerCell}>Category</Text>
      <Text style={styles.headerCell}>Description</Text>
      <Text style={styles.headerCell}>Customer</Text>
      <Text style={styles.headerCell}>Amount</Text>
      <Text style={styles.headerCell}>Date</Text>
      <Text style={styles.headerCell}>Actions</Text>
    </View>
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(i) => i.id.toString()}
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No records found</Text>
          <Text style={styles.emptySubText}>Try adjusting your search or filters</Text>
        </View>
      }
      contentContainerStyle={{ paddingBottom: width < 480 ? 16 : 24 }}
    />
  </View>
);

const getDynamicStyles = (width: number) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: width < 480 ? 8 : 16 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: width < 480 ? 8 : 12 },
    searchInput: { flex: 1, padding: width < 480 ? 6 : 12, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, marginRight: 8 },
    addButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#10b981', padding: 10, borderRadius: 8, gap: 6 },
    buttonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
    filterContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    filterText: { fontSize: 14, color: '#6b7280', marginRight: 8 },
    picker: { height: 45, width: width < 480 ? 130 : 160 },
    dateRangeRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
    dateInput: { padding: 10, borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, color: '#000' },

    tableContainer: { marginTop: 12 },
    tableHeader: { flexDirection: 'row', backgroundColor: '#f3f4f6', padding: 10, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
    headerCell: { flex: 1, fontWeight: '600', fontSize: 13, color: '#111827', textAlign: 'center' },
    tableRow: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
    cell: { flex: 1, fontSize: 13, color: '#374151', textAlign: 'center' },
    actionCell: { flexDirection: 'row', justifyContent: 'center', gap: 10 },
    actionText: { fontSize: 13, color: '#10b981', fontWeight: '600' },

    emptyState: { padding: 40, alignItems: 'center' },
    emptyText: { fontSize: 15, fontWeight: '500', color: '#6b7280', marginBottom: 4 },
    emptySubText: { fontSize: 12, color: '#9ca3af' },

    modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContent: { backgroundColor: '#fff', borderRadius: 12, padding: 16, width: '85%' },
    modalTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 12, textAlign: 'center' },
    formGrid: { gap: 8 },
    input: { padding: 10, borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, marginBottom: 8 },

    buttonContainer: { flexDirection: 'row', gap: 8, marginTop: 16 },
    submitButton: { flex: 1, backgroundColor: '#10b981', padding: 12, borderRadius: 8, alignItems: 'center' },
    cancelButton: { flex: 1, backgroundColor: '#d1d5db', padding: 12, borderRadius: 8, alignItems: 'center' },
  });

export default Income;
