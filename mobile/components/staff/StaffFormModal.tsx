import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Dimensions, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Feather from 'react-native-vector-icons/Feather';
import { Staff } from '@/components/staff/StaffCard';
import { colors, commonStyles, typography } from '@/assets/styles';

interface StaffFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Staff) => void;
  initialData?: Staff | null;
}

const StaffFormModal: React.FC<StaffFormModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const { width, height } = Dimensions.get('window');
  const [formData, setFormData] = useState<Staff>(initialData || {
    id: '',
    name: '',
    email: '',
    phone: '',
    role: '',
    status: 'active',
    started: '',
    department: undefined,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.role || !formData.started) {
      Alert.alert('Error', 'All required fields must be filled');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      Alert.alert('Error', 'Invalid email format');
      return;
    }
    if (!/^\+?\d{7,15}$/.test(formData.phone)) {
      Alert.alert('Error', 'Invalid phone number');
      return;
    }
    onSave({ ...formData, id: formData.id || Date.now().toString() });
    onClose();
  };

  return (
    <Modal transparent visible={isOpen} animationType="fade">
      <View style={commonStyles.modalOverlay}>
        <View style={[commonStyles.modalContent, { width: width * 0.9, maxHeight: height * 0.8 }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Text style={{ ...typography.title, fontWeight: 'bold' }}>{initialData ? 'Edit Staff' : 'Add Staff'}</Text>
            <TouchableOpacity onPress={onClose} accessibilityLabel="Close modal" accessibilityRole="button">
              <Feather name="x" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>
          <TextInput
            style={commonStyles.input}
            placeholder="Name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            accessibilityLabel="Staff name"
          />
          <TextInput
            style={commonStyles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
            accessibilityLabel="Staff email"
          />
          <TextInput
            style={commonStyles.input}
            placeholder="Phone"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            keyboardType="phone-pad"
            accessibilityLabel="Staff phone"
          />
          <TextInput
            style={commonStyles.input}
            placeholder="Role"
            value={formData.role}
            onChangeText={(text) => setFormData({ ...formData, role: text })}
            accessibilityLabel="Staff role"
          />
          <Picker
            style={commonStyles.picker}
            selectedValue={formData.status}
            onValueChange={(itemValue) => setFormData({ ...formData, status: itemValue as 'active' | 'inactive' })}
            accessibilityLabel="Staff status"
          >
            <Picker.Item label="Active" value="active" />
            <Picker.Item label="Inactive" value="inactive" />
          </Picker>
          <Picker
            style={commonStyles.picker}
            selectedValue={formData.department || 'None'}
            onValueChange={(itemValue) => setFormData({ ...formData, department: itemValue === 'None' ? undefined : itemValue })}
            accessibilityLabel="Staff department"
          >
            <Picker.Item label="None" value="None" />
            <Picker.Item label="Admin" value="Admin" />
            <Picker.Item label="Management" value="Management" />
          </Picker>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} accessibilityLabel="Select start date">
            <TextInput
              style={commonStyles.input}
              placeholder="Start Date (YYYY-MM-DD)"
              value={formData.started}
              editable={false}
              accessibilityLabel="Staff start date"
            />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={formData.started ? new Date(formData.started) : new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setFormData({ ...formData, started: selectedDate.toISOString().split('T')[0] });
                }
              }}
            />
          )}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginTop: 16 }}>
            <TouchableOpacity
              style={[commonStyles.button, { backgroundColor: colors.destructive, flex: 1 }]}
              onPress={onClose}
              accessibilityLabel="Cancel"
            >
              <Text style={commonStyles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[commonStyles.button, { backgroundColor: colors.primary, flex: 1 }]}
              onPress={handleSubmit}
              accessibilityLabel="Save staff"
            >
              <Text style={commonStyles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default StaffFormModal;