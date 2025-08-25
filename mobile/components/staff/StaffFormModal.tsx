import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Dimensions, Alert, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Feather from 'react-native-vector-icons/Feather';
import { Staff } from '@/components/staff/StaffCard';
import { colors, typography } from '@/assets/styles';

interface StaffFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Staff) => void;
  initialData?: Staff | null;
}

const { width, height } = Dimensions.get('window');
const scale = (size: number) => size * (width / 375);

const StaffFormModal: React.FC<StaffFormModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
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

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

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
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContainer, { maxHeight: height * 0.85 }]}>
          <View style={styles.header}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.textPrimary }}>Title</Text>
            <TouchableOpacity onPress={onClose} accessibilityLabel="Close modal" accessibilityRole="button">
              <Feather name="x" size={scale(22)} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            {['Name', 'Email', 'Phone', 'Role'].map((field) => (
              <TextInput
                key={field}
                style={[styles.input, { fontSize: scale(14) }]}
                placeholder={field}
                value={formData[field.toLowerCase() as keyof Staff] as string}
                keyboardType={field === 'Email' ? 'email-address' : field === 'Phone' ? 'phone-pad' : 'default'}
                onChangeText={(text) =>
                  setFormData({ ...formData, [field.toLowerCase()]: text } as Staff)
                }
                accessibilityLabel={`Staff ${field.toLowerCase()}`}
              />
            ))}

            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={formData.status}
                onValueChange={(val) => setFormData({ ...formData, status: val as 'active' | 'inactive' })}
                accessibilityLabel="Staff status"
              >
                <Picker.Item label="Active" value="active" />
                <Picker.Item label="Inactive" value="inactive" />
              </Picker>
            </View>

            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={formData.department || 'None'}
                onValueChange={(val) =>
                  setFormData({ ...formData, department: val === 'None' ? undefined : val })
                }
                accessibilityLabel="Staff department"
              >
                <Picker.Item label="None" value="None" />
                <Picker.Item label="Admin" value="Admin" />
                <Picker.Item label="Management" value="Management" />
              </Picker>
            </View>

            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <TextInput
                style={[styles.input, { fontSize: scale(14) }]}
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
                onChange={(event, date) => {
                  setShowDatePicker(false);
                  if (date) setFormData({ ...formData, started: date.toISOString().split('T')[0] });
                }}
              />
            )}
          </ScrollView>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.destructive }]}
              onPress={onClose}
              accessibilityLabel="Cancel"
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={handleSubmit}
              accessibilityLabel="Save staff"
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.025,
  },
  modalContainer: {
    backgroundColor: 'white',
    width: width * 0.9,
    borderRadius: 12,
    padding: width * 0.05,
    paddingBottom: width * 0.03,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: width * 0.04,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingVertical: width * 0.025,
    paddingHorizontal: width * 0.035,
    marginBottom: width * 0.03,
    color: '#111827',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    marginBottom: width * 0.03,
    overflow: 'hidden',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: width * 0.03,
    gap: width * 0.02,
  },
  button: {
    flex: 1,
    paddingVertical: width * 0.035,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: scale(14),
  },
});

export default StaffFormModal;
