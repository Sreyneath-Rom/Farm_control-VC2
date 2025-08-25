import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#10b981', // Green for primary actions (matches Sale.tsx)
  destructive: '#ef4444', // Red for cancel/delete
  background: '#ffffff',
  textPrimary: '#1a202c',
  textSecondary: '#718096',
  border: '#e2e8f0',
  modalOverlay: 'rgba(0, 0, 0, 0.5)',
  tableHeader: '#f7fafc',
  accent: '#3b82f6', // Blue for view/edit buttons
};

export const typography = {
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  body: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  caption: {
    fontSize: 12,
    color: colors.textSecondary,
  },
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.modalOverlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    ...typography.body,
    color: colors.background,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#f9fafb',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 12,
    backgroundColor: '#f9fafb',
  },
});