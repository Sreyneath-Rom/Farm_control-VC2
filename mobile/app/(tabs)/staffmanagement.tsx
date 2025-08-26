import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import StaffCard, { Staff } from '@/components/staff/StaffCard';
import StaffFilters from '@/components/staff/StaffFilters';
import StaffFormModal from '@/components/staff/StaffFormModal';
import ConfirmationDialog from '@/components/staff/ConfirmationDialog';
import { colors } from '@/assets/styles';

const { width } = Dimensions.get('window');

// 🧪 Mock Data
const initialStaff: Staff[] = [
  {
    id: '1',
    name: 'Sokha Chan',
    email: 'sokha.chan@example.com',
    phone: '+85512345678',
    role: 'Manager',
    status: 'active',
    started: '2023-05-10',
    department: 'Management',
  },
  {
    id: '2',
    name: 'Rina Meas',
    email: 'rina.meas@example.com',
    phone: '+85598765432',
    role: 'Administrator',
    status: 'inactive',
    started: '2022-11-20',
    department: 'Admin',
  },
  {
    id: '3',
    name: 'Vuthy Heng',
    email: 'vuthy.heng@example.com',
    phone: '+85511223344',
    role: 'Support Staff',
    status: 'active',
    started: '2024-01-15',
    department: 'Admin',
  },
];

const StaffManagement: React.FC = () => {
  const [staffList, setStaffList] = useState<Staff[]>(initialStaff);
  const [filteredList, setFilteredList] = useState<Staff[]>(initialStaff);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  // 🔍 Filter Handlers
  const handleSearch = (query: string) => {
    const lower = query.toLowerCase();
    const filtered = staffList.filter(
      s =>
        s.name.toLowerCase().includes(lower) ||
        s.role.toLowerCase().includes(lower) ||
        (s.department || '').toLowerCase().includes(lower)
    );
    setFilteredList(filtered);
  };

  const handleDepartmentFilter = (dept: string) => {
    if (dept === 'All Departments') {
      setFilteredList(staffList);
    } else {
      setFilteredList(staffList.filter(s => s.department === dept));
    }
  };

  const handleStatusFilter = (status: string) => {
    if (status === 'All Status') {
      setFilteredList(staffList);
    } else {
      setFilteredList(staffList.filter(s => s.status === status));
    }
  };

  // 🧾 CRUD Handlers
  const handleSave = (data: Staff) => {
    const exists = staffList.find(s => s.id === data.id);
    const updated = exists
      ? staffList.map(s => (s.id === data.id ? data : s))
      : [...staffList, data];
    setStaffList(updated);
    setFilteredList(updated);
  };

  const handleDelete = () => {
    if (!pendingDeleteId) return;
    const updated = staffList.filter(s => s.id !== pendingDeleteId);
    setStaffList(updated);
    setFilteredList(updated);
    setPendingDeleteId(null);
    setShowConfirm(false);
  };

  const handleEdit = (staff: Staff) => {
    setSelectedStaff(staff);
    setShowForm(true);
  };

  const handleView = (staff: Staff) => {
    Alert.alert('Staff Info', `${staff.name}\n${staff.email}\n${staff.phone}`);
  };

  const confirmDelete = (id: string) => {
    setPendingDeleteId(id);
    setShowConfirm(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Staff Management</Text>

      <StaffFilters
        onSearch={handleSearch}
        onDepartmentFilter={handleDepartmentFilter}
        onStatusFilter={handleStatusFilter}
      />

      <FlatList
        data={filteredList}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <StaffCard
            staff={item}
            onView={() => handleView(item)}
            onEdit={() => handleEdit(item)}
            onDelete={() => confirmDelete(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No staff found.</Text>}
      />

      {/* ➕ Add Staff Button */}
      <View style={styles.addButtonWrapper}>
        <Text
          style={styles.addButton}
          onPress={() => {
            setSelectedStaff(null);
            setShowForm(true);
          }}
        >
          + Add Staff
        </Text>
      </View>

      {/* 🧾 Modals */}
      <StaffFormModal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSave={handleSave}
        initialData={selectedStaff}
      />

      <ConfirmationDialog
        isOpen={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this staff member?"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.04,
    paddingTop: width * 0.05,
    backgroundColor: '#f9fafb',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: width * 0.04,
  },
  empty: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 20,
    fontSize: 16,
  },
  addButtonWrapper: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: colors.primary,
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 3,
  },
  addButton: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default StaffManagement;