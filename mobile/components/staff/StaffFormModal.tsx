
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Staff } from '@/components/staff/StaffCard';

interface StaffFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Staff) => void;
  initialData?: Staff | null;
}

const StaffFormModal: React.FC<StaffFormModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const { width, height } = Dimensions.get('window');
  const [formData, setFormData] = useState<Staff>(initialData || {
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
        <View style={[styles.modalContainer, { width: width * 0.9, maxHeight: height * 0.8 }]}>
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
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            keyboardType="phone-pad"
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
          <Picker
            style={styles.picker}
            selectedValue={formData.department || 'None'}
            onValueChange={(itemValue) => setFormData({ ...formData, department: itemValue === 'None' ? undefined : itemValue })}
          >
            <Picker.Item label="None" value="None" />
            <Picker.Item label="Admin" value="Admin" />
            <Picker.Item label="Management" value="Management" />
          </Picker>
          <TextInput
            style={styles.input}
            placeholder="Start Date (YYYY-MM-DD)"
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
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  cancelButton: {
    backgroundColor: '#ef4444',
    padding: 12,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    minWidth: 100,
  },
  saveButton: {
    backgroundColor: '#22c55e',
    padding: 12,
    borderRadius: 5,
    flex: 1,
    minWidth: 100,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default StaffFormModal;
