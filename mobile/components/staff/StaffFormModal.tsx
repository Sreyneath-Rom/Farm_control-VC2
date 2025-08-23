
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Export StaffFormData as a named export
export interface StaffFormData {
  name: string;
  email: string;
  phone: string;
  role: string;
  status: 'active' | 'inactive';
  started: string;
  department?: string;
}

interface StaffFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: StaffFormData) => void;
  initialData?: StaffFormData;
}

const StaffFormModal: React.FC<StaffFormModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState<StaffFormData>(initialData || {
    name: '',
    email: '',
    phone: '',
    role: '',
    status: 'active',
    started: '',
  });

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Modal transparent visible={isOpen} animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Add Staff</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Role"
            value={formData.role}
            onChangeText={(text) => setFormData({ ...formData, role: text })}
          />
          <Picker
            style={styles.picker}
            selectedValue={formData.status}
            onValueChange={(itemValue) => setFormData({ ...formData, status: itemValue as 'active' | 'inactive' })}
          >
            <Picker.Item label="Active" value="active" />
            <Picker.Item label="Inactive" value="inactive" />
          </Picker>
          <TextInput
            style={styles.input}
            placeholder="Start Date"
            value={formData.started}
            onChangeText={(text) => setFormData({ ...formData, started: text })}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  } as const,
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  } as const,
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  } as const,
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  } as const,
  picker: {
    height: 50,
    width: '100%', // Changed from '100' to '100%'
    marginBottom: 10,
  } as const,
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  } as const,
  cancelButton: {
    backgroundColor: '#ef4444',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  } as const,
  saveButton: {
    backgroundColor: '#22c55e',
    padding: 10,
    borderRadius: 5,
    flex: 1,
  } as const,
  buttonText: {
    color: 'white',
    textAlign: 'center',
  } as const,
});

export default StaffFormModal;
