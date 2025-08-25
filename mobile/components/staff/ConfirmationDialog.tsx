import React from 'react';
import { View, Text, TouchableOpacity, Modal, Dimensions, StyleSheet } from 'react-native';
import { colors, typography } from '@/assets/styles';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

const { width, height } = Dimensions.get('window');

const scaleFont = (size: number) => size * (width / 375); // base width 375

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onConfirm, onCancel, message }) => {
  return (
    <Modal transparent visible={isOpen} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { width: width * 0.85 }]}>
          <Text style={[styles.messageText]}>{message}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.destructive }]}
              onPress={onCancel}
              accessibilityLabel="Cancel action"
              accessibilityRole="button"
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={onConfirm}
              accessibilityLabel="Confirm action"
              accessibilityRole="button"
            >
              <Text style={styles.buttonText}>Confirm</Text>
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
  },
  modalContent: {
    backgroundColor: 'white',
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.05,
    borderRadius: 12,
    overflow: 'hidden',
  },
  messageText: {
    fontSize: scaleFont(16),
    textAlign: 'center',
    marginBottom: height * 0.03,
    lineHeight: scaleFont(22),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: height * 0.015,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: scaleFont(16),
    fontWeight: '600',
  },
});

export default ConfirmationDialog;
