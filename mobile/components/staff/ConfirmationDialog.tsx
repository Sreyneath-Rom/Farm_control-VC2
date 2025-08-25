import React from 'react';
import { View, Text, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { colors, commonStyles, typography } from '@/assets/styles';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onConfirm, onCancel, message }) => {
  const { width } = Dimensions.get('window');

  return (
    <Modal transparent visible={isOpen} animationType="fade">
      <View style={commonStyles.modalOverlay}>
        <View style={[commonStyles.modalContent, { width: width * 0.8 }]}>
          <Text style={[typography.body, { marginBottom: 20, textAlign: 'center' }]}>{message}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12 }}>
            <TouchableOpacity
              style={[commonStyles.button, { backgroundColor: colors.destructive, flex: 1 }]}
              onPress={onCancel}
              accessibilityLabel="Cancel action"
              accessibilityRole="button"
            >
              <Text style={commonStyles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[commonStyles.button, { backgroundColor: colors.primary, flex: 1 }]}
              onPress={onConfirm}
              accessibilityLabel="Confirm action"
              accessibilityRole="button"
            >
              <Text style={commonStyles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationDialog;