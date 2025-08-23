
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import ConfirmationDialog from '@/components/staff/ConfirmationDialog';
import StaffCard from '@/components/staff/StaffCard';
import StaffFormModal from '@/components/staff/StaffFormModal';
import StaffFilters from '@/components/staff/StaffFilters';
import { Staff } from '@/components/staff/StaffCard';
import { StaffFormData } from '@/components/staff/StaffFormModal'; // Import StaffFormData

const StaffManagement: React.FC = () => {
  const [staffList, setStaffList] = useState<Staff[]>([
    { name: 'ya', email: 'ya@mallinator.com', phone: '0123456871', role: 'Administration', status: 'inactive', started: '2022-10-07', department: undefined },
    { name: 'mealea', email: 'rexeqefis@mallinator.com', phone: '087654345', role: 'Management', status: 'active', started: '2024-12-29', department: undefined },
    { name: 'Aiko McCarthy', email: 'guzited@mallinator.com', phone: '+781 934-8385', role: 'Administration', status: 'inactive', started: '2004-05-03', department: undefined },
    { name: 'ya manager', email: 'yayaaa@gmail.com', phone: '23456789', role: 'Health', status: 'active', started: '2025-08-23', department: undefined },
  ]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [filters, setFilters] = useState({ search: '', department: 'All Departments', status: 'All Status' });

  const handleAddStaff = () => setIsFormOpen(true);

  const handleSaveStaff = (data: Staff) => {
    if (selectedStaff) {
      setStaffList(staffList.map(staff => staff === selectedStaff ? data : staff));
    } else {
      setStaffList([...staffList, data]);
    }
    setIsFormOpen(false);
    setSelectedStaff(null);
  };

  const handleEditStaff = (staff: Staff) => {
    setSelectedStaff(staff);
    setIsFormOpen(true);
  };

  const handleDeleteStaff = (staff: Staff) => {
    setSelectedStaff(staff);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedStaff) {
      setStaffList(staffList.filter(staff => staff !== selectedStaff));
    }
    setIsConfirmOpen(false);
    setSelectedStaff(null);
  };

  const handleFilter = (query: string, dept: string, status: string) => {
    setFilters({ search: query, department: dept, status: status });
  };

  const filteredStaff = staffList.filter(staff =>
    staff.name.toLowerCase().includes(filters.search.toLowerCase()) ||
    staff.role.toLowerCase().includes(filters.search.toLowerCase()) ||
    (filters.department === 'All Departments' || staff.department === filters.department) &&
    (filters.status === 'All Status' || staff.status === filters.status)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Staff Management</Text>
      <Text style={styles.subtitle}>Manage your farm staff information and roles</Text>
      <StaffFilters
        onSearch={(q) => handleFilter(q, filters.department, filters.status)}
        onDepartmentFilter={(d) => handleFilter(filters.search, d, filters.status)}
        onStatusFilter={(s) => handleFilter(filters.search, filters.department, s)}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddStaff}>
        <Text style={styles.addButtonText}>+ Add Staff</Text>
      </TouchableOpacity>
      <FlatList
        data={filteredStaff}
        renderItem={({ item }) => (
          <StaffCard
            staff={item}
            onView={() => console.log('View', item.name)}
            onEdit={() => handleEditStaff(item)}
            onDelete={() => handleDeleteStaff(item)}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <StaffFormModal
        isOpen={isFormOpen}
        onClose={() => { setIsFormOpen(false); setSelectedStaff(null); }}
        onSave={handleSaveStaff}
        initialData={selectedStaff as StaffFormData | undefined}
      />
      <ConfirmationDialog
        isOpen={isConfirmOpen}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsConfirmOpen(false)}
        message="Are you sure you want to delete this staff member?"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#22c55e',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default StaffManagement;
