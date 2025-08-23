
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface StaffFiltersProps {
  onSearch: (query: string) => void;
  onDepartmentFilter: (dept: string) => void;
  onStatusFilter: (status: string) => void;
}

const StaffFilters: React.FC<StaffFiltersProps> = ({ onSearch, onDepartmentFilter, onStatusFilter }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by name, role, or department..."
        onChangeText={onSearch}
      />
      <Picker style={styles.picker} onValueChange={onDepartmentFilter} selectedValue="All Departments">
        <Picker.Item label="All Departments" value="All Departments" />
        <Picker.Item label="Admin" value="Admin" />
        <Picker.Item label="Management" value="Management" />
      </Picker>
      <Picker style={styles.picker} onValueChange={onStatusFilter} selectedValue="All Status">
        <Picker.Item label="All Status" value="All Status" />
        <Picker.Item label="Active" value="active" />
        <Picker.Item label="Inactive" value="inactive" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
});

export default StaffFilters;
