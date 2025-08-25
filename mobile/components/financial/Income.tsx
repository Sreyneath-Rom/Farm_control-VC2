import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Alert,
  FlatList,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';

// Define the income item type
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
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [newIncome, setNewIncome] = useState<Partial<IncomeItem>>({
    category: '',
    description: '',
    customer: '',
    amount: 0,
    date: undefined,
  });
  const [selectedIncome, setSelectedIncome] = useState<IncomeItem | null>(null);
  const [incomeHistory, setIncomeHistory] = useState<IncomeItem[]>([
    { id: 1, category: 'Pig Sales', description: '50 pigs sold to local market', customer: 'Local Market Co.', amount: 15000, date: '2024-01-15' },
    { id: 2, category: 'Manure Sales', description: 'Organic fertilizer sales', customer: 'Garden Center', amount: 800, date: '2024-01-13' },
  ]);

  const categories = ['Pig Sales', 'Manure Sales', 'Egg Sales', 'Other'];

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
    modalContent: { backgroundColor: '#fff', borderRadius: 8, padding: width < 480 ? 8 : 16, width: '80%' as const },
    modalTitle: { fontSize: width < 480 ? 14 : 16, fontWeight: '600' as const, color: '#1a202c', marginBottom: width < 480 ? 6 : 12 },
    formGrid: { flexDirection: 'column' as const, gap: width < 480 ? 4 : 8 },
    input: { padding: width < 480 ? 6 : 12, borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8 },
    dateInput: { padding: width < 480 ? 6 : 12, borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, color: '#000' },
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

  const addIncome = () => {
    if (!newIncome.category || !newIncome.description || !newIncome.customer || !newIncome.amount || !newIncome.date) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    const id = incomeHistory.length + 1;
    setIncomeHistory([...incomeHistory, { id, ...newIncome, amount: Number(newIncome.amount), date: newIncome.date!.toString().split('T')[0] } as IncomeItem]);
    setNewIncome({ category: '', description: '', customer: '', amount: 0, date: undefined });
    setShowAddForm(false);
  };

  const editIncome = () => {
    if (!selectedIncome || !newIncome.category || !newIncome.description || !newIncome.customer || !newIncome.amount || !newIncome.date) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    setIncomeHistory(incomeHistory.map(item => item.id === selectedIncome.id ? { ...item, ...newIncome, amount: Number(newIncome.amount), date: newIncome.date!.toString().split('T')[0] } as IncomeItem : item));
    setNewIncome({ category: '', description: '', customer: '', amount: 0, date: undefined });
    setSelectedIncome(null);
    setShowEditForm(false);
  };

  const deleteIncome = (id: number) => {
    Alert.alert('Confirm', 'Are you sure you want to delete this income?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: () => setIncomeHistory(incomeHistory.filter(item => item.id !== id)) },
    ]);
  };

  const filteredIncome = incomeHistory.filter(item =>
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }: { item: IncomeItem }) => (
    <View style={getDynamicStyles().tableRow}>
      <Text style={getDynamicStyles().cell}>{item.category}</Text>
      <Text style={getDynamicStyles().cell}>{item.description}</Text>
      <Text style={getDynamicStyles().cell}>{item.customer}</Text>
      <Text style={getDynamicStyles().cell}>${item.amount.toFixed(2)}</Text>
      <Text style={getDynamicStyles().cell}>
        {typeof item.date === 'string'
          ? item.date
          : item.date instanceof Date
          ? item.date.toISOString().split('T')[0]
          : ''}
      </Text>
      <View style={getDynamicStyles().actionCell}>
        <TouchableOpacity onPress={() => { setSelectedIncome(item); setNewIncome(item); setShowEditForm(true); }}>
          <Text style={getDynamicStyles().actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteIncome(item.id)}>
          <Text style={[getDynamicStyles().actionText, { color: '#ef4444' }]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const styles = getDynamicStyles();
  const minTableWidth = 600;
  const tableContent = (
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
        data={filteredIncome}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<View style={styles.emptyState}><Text style={styles.emptyText}>No income records found</Text><Text style={styles.emptySubText}>Try adjusting your search or filters</Text></View>}
        contentContainerStyle={{ paddingBottom: width < 480 ? 16 : 24 }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search income..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => setShowAddForm(true)}>
          <Feather name="plus" size={width < 480 ? 18 : 24} color="#fff" />
          <Text style={styles.buttonText}>Add Income</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.filterText}>Filter by:</Text>
        <Picker
          selectedValue={timeFilter}
          onValueChange={(itemValue) => setTimeFilter(itemValue as string)}
          style={styles.picker}
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
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{showEditForm ? 'Edit Income' : 'Add New Income'}</Text>
            <View style={styles.formGrid}>
              <Picker
                selectedValue={newIncome.category}
                onValueChange={(itemValue) => setNewIncome({ ...newIncome, category: itemValue as string })}
                style={styles.picker}
              >
                <Picker.Item label="Select Category" value="" />
                {categories.map((cat) => <Picker.Item key={cat} label={cat} value={cat} />)}
              </Picker>
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
                value={newIncome.amount !== undefined ? String(newIncome.amount) : ''}
                keyboardType="numeric"
                onChangeText={(text) => setNewIncome({ ...newIncome, amount: Number(text) })}
              />
              <TouchableOpacity onPress={() => setShowFormDatePicker(true)}>
                <TextInput
                  style={styles.dateInput}
                  placeholder="Date"
                  value={newIncome.date ? newIncome.date.toString().split('T')[0] : ''}
                  editable={false}
                />
              </TouchableOpacity>
            </View>
            {showFormDatePicker && (
              <DateTimePicker
                value={typeof newIncome.date === 'string' ? new Date(newIncome.date) : (newIncome.date || new Date())}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowFormDatePicker(false);
                  setNewIncome({ ...newIncome, date: selectedDate || undefined });
                }}
              />
            )}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.submitButton} onPress={showEditForm ? editIncome : addIncome}>
                <Text style={styles.buttonText}>{showEditForm ? 'Update' : 'Submit'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => { setShowAddForm(false); setShowEditForm(false); setNewIncome({ category: '', description: '', customer: '', amount: 0, date: undefined }); }}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      <View style={styles.tableContainer}>
        {width < minTableWidth ? (
          <ScrollView horizontal={true}>
            <View style={{ width: minTableWidth }}>
              {tableContent}
            </View>
          </ScrollView>
        ) : (
          tableContent
        )}
      </View>
    </View>
  );
};

export default Income;