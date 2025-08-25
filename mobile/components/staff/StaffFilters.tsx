import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface StaffFiltersProps {
  onSearch: (query: string) => void;
  onDepartmentFilter: (dept: string) => void;
  onStatusFilter: (status: string) => void;
}

const { width } = Dimensions.get('window');
const scaleFont = (size: number) => size * (width / 375); // base width 375

const StaffFilters: React.FC<StaffFiltersProps> = ({ onSearch, onDepartmentFilter, onStatusFilter }) => {
  const [department, setDepartment] = useState('All Departments');
  const [status, setStatus] = useState('All Status');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by name, role, or department..."
        placeholderTextColor="#9ca3af"
        onChangeText={onSearch}
      />

      <View style={styles.pickerWrapper}>
        <Picker
          style={styles.picker}
          selectedValue={department}
          onValueChange={(value) => { setDepartment(value); onDepartmentFilter(value); }}
          mode="dropdown"
        >
          <Picker.Item label="All Departments" value="All Departments" />
          <Picker.Item label="Admin" value="Admin" />
          <Picker.Item label="Management" value="Management" />
        </Picker>
      </View>

      <View style={styles.pickerWrapper}>
        <Picker
          style={styles.picker}
          selectedValue={status}
          onValueChange={(value) => { setStatus(value); onStatusFilter(value); }}
          mode="dropdown"
        >
          <Picker.Item label="All Status" value="All Status" />
          <Picker.Item label="Active" value="active" />
          <Picker.Item label="Inactive" value="inactive" />
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    alignItems: 'center',
    width: '100%',
  },
  input: {
    width: width * 0.9,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: scaleFont(15),
    color: '#111827',
  },
  pickerWrapper: {
    width: width * 0.9,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 50,
  },
});

export default StaffFilters;
