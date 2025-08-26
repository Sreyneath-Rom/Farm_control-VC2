import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Alert,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createTheme, ThemeProvider, createBox, createText } from '@shopify/restyle';

const theme = createTheme({
  colors: {
    background: '#f9fafb',
    primary: '#10b981',
    secondary: '#6b7280',
    danger: '#ef4444',
    text: '#111827',
    muted: '#9ca3af',
    white: '#ffffff',
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
  },
  textVariants: {
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'text',
    },
    body: {
      fontSize: 16,
      color: 'text',
    },
    muted: {
      fontSize: 14,
      color: 'muted',
    },
  },
});

type Theme = typeof theme;
const Box = createBox<Theme>();
const Text = createText<Theme>();

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
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<ExpenseItem | null>(null);
  const [formData, setFormData] = useState<
    Partial<Omit<ExpenseItem, 'amount'> & { amount: number | string }>
  >({
    category: '',
    description: '',
    supplier: '',
    amount: '',
    date: '',
  });

  const [expenseHistory, setExpenseHistory] = useState<ExpenseItem[]>([
    {
      id: 1,
      category: 'Feed',
      description: 'Purchase of pig feed',
      supplier: 'Farm Supply Co.',
      amount: 5000,
      date: '2024-01-15',
    },
    {
      id: 2,
      category: 'Equipment',
      description: 'New tractor repair',
      supplier: 'Machinery Inc.',
      amount: 3000,
      date: '2024-01-13',
    },
  ]);

  const filteredExpenses = expenseHistory.filter((e) =>
    e.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = () => {
    const { category, description, supplier, amount, date } = formData;
    if (!category || !description || !supplier || !amount || !date) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (selectedExpense) {
      const updated = expenseHistory.map((e) =>
        e.id === selectedExpense.id
          ? { ...selectedExpense, ...formData, amount: Number(amount) }
          : e
      );
      setExpenseHistory(updated);
    } else {
      const newId = expenseHistory.length
        ? expenseHistory[expenseHistory.length - 1].id + 1
        : 1;
      setExpenseHistory([
        ...expenseHistory,
        { ...formData, id: newId, amount: Number(amount) } as ExpenseItem,
      ]);
    }

    setFormData({
      category: '',
      description: '',
      supplier: '',
      amount: '',
      date: '',
    });
    setSelectedExpense(null);
    setShowForm(false);
  };

  const handleEdit = (item: ExpenseItem) => {
    setSelectedExpense(item);
    setFormData(item);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    Alert.alert('Confirm Delete', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () =>
          setExpenseHistory(expenseHistory.filter((e) => e.id !== id)),
      },
    ]);
  };

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <Box padding="m">
          <Input
            placeholder="Search expenses..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            leftIcon={<Icon name="search" type="feather" />}
          />
          <Button
            title="Add Expense"
            icon={{ name: 'plus', type: 'feather', color: 'white' }}
            buttonStyle={{ backgroundColor: theme.colors.primary }}
            onPress={() => setShowForm(true)}
          />
        </Box>

        <ScrollView horizontal>
          <Box padding="m" minWidth={600}>
            <Box flexDirection="row" justifyContent="space-between" marginBottom="s">
              {['Category', 'Description', 'Supplier', 'Amount', 'Date', 'Actions'].map((label) => (
                <Text key={label} style={{ fontWeight: 'bold' }}>{label}</Text>
              ))}
            </Box>

            {filteredExpenses.length ? (
              <FlatList
                data={filteredExpenses}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <Box flexDirection="row" justifyContent="space-between" marginBottom="s">
                    <Text>{item.category}</Text>
                    <Text>{item.description}</Text>
                    <Text>{item.supplier}</Text>
                    <Text>${item.amount}</Text>
                    <Text>{item.date}</Text>
                    <Box flexDirection="row">
                      <Button title="Edit" type="clear" onPress={() => handleEdit(item)} />
                      <Button
                        title="Delete"
                        type="clear"
                        titleStyle={{ color: theme.colors.danger }}
                        onPress={() => handleDelete(item.id)}
                      />
                    </Box>
                  </Box>
                )}
              />
            ) : (
              <Box alignItems="center" marginTop="l">
                <Text style={{ fontSize: 14, color: theme.colors.muted }}>
                  No expenses found
                </Text>
              </Box>
            )}
          </Box>
        </ScrollView>

        {showForm && (
          <Box padding="l" backgroundColor="white">
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.colors.text }}>
              {selectedExpense ? 'Edit Expense' : 'Add Expense'}
            </Text>

            <Text style={{ marginTop: 8 }}>Category</Text>
            <Picker
              selectedValue={formData.category}
              onValueChange={(val) => setFormData({ ...formData, category: val })}
            >
              <Picker.Item label="Select Category" value="" />
              {categories.map((cat) => (
                <Picker.Item key={cat} label={cat} value={cat} />
              ))}
            </Picker>

            <Input
              label="Description"
              value={formData.description}
              onChangeText={(val) => setFormData({ ...formData, description: val })}
            />
            <Input
              label="Supplier"
              value={formData.supplier}
              onChangeText={(val) => setFormData({ ...formData, supplier: val })}
            />
            <Input
              label="Amount"
              value={formData.amount?.toString()}
              keyboardType="numeric"
              onChangeText={(val) => setFormData({ ...formData, amount: Number(val) })}
            />
            <Input
              label="Date"
              value={formData.date}
              onFocus={() => setShowDatePicker(true)}
              editable={false}
            />

            {showDatePicker && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    const formatted = selectedDate.toISOString().split('T')[0];
                    setFormData({ ...formData, date: formatted });
                  }
                }}
              />
            )}

            <Box flexDirection="row" justifyContent="space-between" marginTop="m">
              <Button
                title={selectedExpense ? 'Save' : 'Add'}
                onPress={handleSubmit}
                buttonStyle={{ backgroundColor: theme.colors.primary }}
              />
              <Button
                title="Cancel"
                type="outline"
                onPress={() => {
                  setShowForm(false);
                  setSelectedExpense(null);
                  setFormData({
                    category: '',
                    description: '',
                                        supplier: '',
                    amount: '',
                    date: '',
                  });
                }}
              />
            </Box>
          </Box>
        )}
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default Expense;