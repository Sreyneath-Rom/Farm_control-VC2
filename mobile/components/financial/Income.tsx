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
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';

const Income = () => {
  const { width } = useWindowDimensions();
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState('this-month');
  const [customStartDate, setCustomStartDate] = useState<Date | null>(null);
  const [customEndDate, setCustomEndDate] = useState<Date | null>(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newIncome, setNewIncome] = useState({
    category: '',
    description: '',
    customer: '',
    amount: '',
    date: null as Date | null,
  });
  const [showFormDatePicker, setShowFormDatePicker] = useState(false);

  const categories = ['Pig Sales', 'Manure Sales', 'Egg Sales', 'Other'];

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

  const filterIncome = (item: typeof incomeHistory[0]) => {
    const query = searchQuery.toLowerCase();
    const itemDate = new Date(item.date);
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    if (query && !(
      item.category.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.customer.toLowerCase().includes(query)
    )) {
      return false;
    }

    switch (timeFilter) {
      case 'this-month':
        return itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear();
      case 'last-month':
        const lastMonth = new Date(now);
        lastMonth.setMonth(now.getMonth() - 1);
        return itemDate.getMonth() === lastMonth.getMonth() && itemDate.getFullYear() === lastMonth.getFullYear();
      case 'all-time':
        return true;
      case 'custom':
        if (!customStartDate || !customEndDate) return false;
        const end = new Date(customEndDate);
        end.setHours(23, 59, 59, 999);
        return itemDate >= customStartDate && itemDate <= end;
      default:
        return true;
    }
  };

  const filteredIncome = incomeHistory.filter(filterIncome);

  const addIncome = () => {
    if (
      !newIncome.category.trim() ||
      !newIncome.description.trim() ||
      !newIncome.customer.trim() ||
      !newIncome.amount.trim() ||
      !newIncome.date
    ) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    if (isNaN(Number(newIncome.amount)) || Number(newIncome.amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount.');
      return;
    }
    console.log('Income added:', {
      ...newIncome,
      date: newIncome.date.toISOString().split('T')[0],
    });
    setNewIncome({
      category: '',
      description: '',
      customer: '',
      amount: '',
      date: null,
    });
    setShowAddForm(false);
  };

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    });

  const onDateChange = (event: any, selectedDate: Date | undefined, type: string) => {
    const currentDate = selectedDate || new Date();
    switch (type) {
      case 'start':
        setShowStartDatePicker(Platform.OS === 'ios');
        setCustomStartDate(currentDate);
        break;
      case 'end':
        setShowEndDatePicker(Platform.OS === 'ios');
        setCustomEndDate(currentDate);
        break;
      case 'form':
        setShowFormDatePicker(Platform.OS === 'ios');
        setNewIncome({ ...newIncome, date: currentDate });
        break;
    }
  };

  const renderItem = ({ item }: { item: 'header' | 'filter' | 'form' | 'table' | typeof incomeHistory[0] }) => {
    if (item === 'header') {
      return (
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
      );
    }
    if (item === 'filter') {
      return (
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Filter by:</Text>
          <View style={styles.filterControls}>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={timeFilter}
                onValueChange={(itemValue: string) => setTimeFilter(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="This Month" value="this-month" />
                <Picker.Item label="Last Month" value="last-month" />
                <Picker.Item label="All Time" value="all-time" />
                <Picker.Item label="Custom Range" value="custom" />
              </Picker>
            </View>
            {timeFilter === 'custom' && (
              <View style={styles.dateRangeContainer}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Start Date</Text>
                  <TouchableOpacity
                    style={styles.dateInput}
                    onPress={() => setShowStartDatePicker(true)}
                  >
                    <Text style={styles.dateText}>
                      {customStartDate ? formatDate(customStartDate) : 'Select Date'}
                    </Text>
                    <Feather name="calendar" size={16} color="#718096" />
                  </TouchableOpacity>
                  {showStartDatePicker && (
                    <DateTimePicker
                      value={customStartDate || new Date()}
                      mode="date"
                      display="default"
                      onChange={(event, date) => onDateChange(event, date, 'start')}
                    />
                  )}
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>End Date</Text>
                  <TouchableOpacity
                    style={styles.dateInput}
                    onPress={() => setShowEndDatePicker(true)}
                  >
                    <Text style={styles.dateText}>
                      {customEndDate ? formatDate(customEndDate) : 'Select Date'}
                    </Text>
                    <Feather name="calendar" size={16} color="#718096" />
                  </TouchableOpacity>
                  {showEndDatePicker && (
                    <DateTimePicker
                      value={customEndDate || new Date()}
                      mode="date"
                      display="default"
                      onChange={(event, date) => onDateChange(event, date, 'end')}
                    />
                  )}
                </View>
              </View>
            )}
          </View>
        </View>
      );
    }
    if (item === 'form' && showAddForm) {
      return (
        <View style={styles.addForm}>
          <Text style={styles.formTitle}>Add New Income</Text>
          <View style={styles.formGrid}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Category</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={newIncome.category}
                  onValueChange={(itemValue: string) =>
                    setNewIncome({ ...newIncome, category: itemValue })
                  }
                  style={styles.picker}
                >
                  <Picker.Item label="Select Category" value="" />
                  {categories.map((category) => (
                    <Picker.Item key={category} label={category} value={category} />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.input}
                value={newIncome.description}
                onChangeText={(text) => setNewIncome({ ...newIncome, description: text })}
                placeholder="e.g., 50 pigs sold"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Customer</Text>
              <TextInput
                style={styles.input}
                value={newIncome.customer}
                onChangeText={(text) => setNewIncome({ ...newIncome, customer: text })}
                placeholder="e.g., Local Market Co."
                autoCapitalize="words"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Amount</Text>
              <TextInput
                style={styles.input}
                value={newIncome.amount}
                onChangeText={(text) => setNewIncome({ ...newIncome, amount: text })}
                placeholder="e.g., 15000"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Date</Text>
              <TouchableOpacity
                style={styles.dateInput}
                onPress={() => setShowFormDatePicker(true)}
              >
                <Text style={styles.dateText}>
                  {newIncome.date ? formatDate(newIncome.date) : 'Select Date'}
                </Text>
                <Feather name="calendar" size={16} color="#718096" />
              </TouchableOpacity>
              {showFormDatePicker && (
                <DateTimePicker
                  value={newIncome.date || new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, date) => onDateChange(event, date, 'form')}
                />
              )}
            </View>
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
      );
    }
    if (item === 'table') {
      return (
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
                  <Text style={styles.cell}>{formatDate(new Date(item.date))}</Text>
                </View>
              )}
              ListHeaderComponent={
                <View style={styles.tableHeader}>
                  <Text style={styles.headerCell}>Category</Text>
                  <Text style={styles.headerCell}>Description</Text>
                  <Text style={styles.headerCell}>Customer</Text>
                  <Text style={styles.headerCell}>Amount</Text>
                  <Text style={styles.cell}>Date</Text>
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
      );
    }
    return null;
  };

  const data = ['header', 'filter', showAddForm ? 'form' : null, 'table'].filter(Boolean) as ('header' | 'filter' | 'form' | 'table')[];

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  contentContainer: { padding: 10 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 4,
    marginRight: 6,
    fontSize: 13,
  },
  filterSection: {
    marginBottom: 10,
  },
  filterLabel: {
    fontSize: 11,
    color: '#718096',
    marginBottom: 4,
  },
  filterControls: {
    flexDirection: 'column',
    gap: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 4,
  },
  picker: {
    height: 36,
    width: '100%',
  },
  dateRangeContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  inputContainer: {
    flex: 1,
    marginBottom: 4,
  },
  label: {
    fontSize: 11,
    color: '#718096',
    marginBottom: 2,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 4,
    padding: 8,
  },
  dateText: {
    flex: 1,
    fontSize: 13,
  },
  addButton: {
    backgroundColor: '#10b981',
    padding: 6,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addButtonText: { color: '#fff', fontWeight: '500', fontSize: 13 },
  addForm: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
    elevation: 1,
  },
  formTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: 6,
  },
  formGrid: { flexDirection: 'column', gap: 4 },
  input: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 4,
    fontSize: 13,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 6,
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#10b981',
    padding: 6,
    borderRadius: 4,
    alignItems: 'center',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#d1d5db',
    padding: 6,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 13,
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
    elevation: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerCell: {
    flex: 1,
    fontSize: 9,
    color: '#718096',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    fontSize: 11,
    color: '#1a202c',
    marginBottom: 2,
  },
  emptyState: {
    padding: 12,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 13,
    color: '#718096',
    marginBottom: 2,
  },
  emptySubText: {
    fontSize: 9,
    color: '#9ca3af',
  },
});

export default Income;