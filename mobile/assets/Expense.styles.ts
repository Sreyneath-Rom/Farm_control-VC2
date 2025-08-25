import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: width < 480 ? 8 : 16,
  },
  header: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    marginRight: 8,
  },
  addButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: '#10b981',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600' as const,
    fontSize: 14,
  },
  filterContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: 12,
  },
  filterText: {
    fontSize: 14,
    color: '#718096',
    marginRight: 8,
  },
  picker: {
    height: 48,
    width: width < 480 ? 130 : 160,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 16,
  },

  modalContent: {
  backgroundColor: '#fff',
  borderRadius: 12,
  padding: 16,
  flex: 0.9,               // fills 90% of parent width
 maxHeight: height * 0.85,
},
  modalTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    marginBottom: 12,
    color: '#111827',
  },
  formGrid: { gap: 10 },
  input: { padding: 10, borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8 },
  dateInput: { padding: 10, borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, color: '#000' },
  buttonContainer: { flexDirection: 'row' as const, gap: 10, marginTop: 12 },
  submitButton: { flex: 1, backgroundColor: '#10b981', padding: 12, borderRadius: 10, alignItems: 'center' as const },
  cancelButton: { flex: 1, backgroundColor: '#d1d5db', padding: 12, borderRadius: 10, alignItems: 'center' as const },
  tableContainer: { marginTop: 16 },
  tableHeader: { flexDirection: 'row' as const, backgroundColor: '#f9fafb', padding: 10, borderBottomWidth: 1, borderColor: '#e2e8f0' },
  headerCell: { flex: 1, fontWeight: '700' as const, fontSize: 13, color: '#111827', textAlign: 'center' as const },
  tableRow: { flexDirection: 'row' as const, padding: 10, borderBottomWidth: 1, borderColor: '#f1f5f9' },
  cell: { flex: 1, fontSize: 13, color: '#374151', textAlign: 'center' as const },
  actionCell: { flexDirection: 'row' as const, justifyContent: 'center' as const, gap: 12 },
  actionText: { fontSize: 13, fontWeight: '600' as const, color: '#10b981' },
  emptyState: { padding: 40, alignItems: 'center' as const },
  emptyText: { fontSize: 16, fontWeight: '600' as const, color: '#6b7280', marginBottom: 6 },
  emptySubText: { fontSize: 12, color: '#9ca3af' },
};

export default styles;
