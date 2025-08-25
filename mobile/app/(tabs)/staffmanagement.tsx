import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  ScrollView,
} from 'react-native';
import ConfirmationDialog from '@/components/staff/ConfirmationDialog';
import StaffCard from '@/components/staff/StaffCard';
import StaffFormModal from '@/components/staff/StaffFormModal';
import StaffFilters from '@/components/staff/StaffFilters';
import { Staff } from '@/components/staff/StaffCard';

const { width, height } = Dimensions.get('window');

// Responsive font scaling (caps min/max for balance)
const scaleFont = (size: number) =>
  Math.min(Math.max(size * (width / 375), size * 0.9), size * 1.2);

// Responsive spacing helpers
const scaleWidth = (w: number) => Math.min(width * w, 40);
const scaleHeight = (h: number) => Math.min(height * h, 20);

const StaffManagement: React.FC = () => {
  const [staffList, setStaffList] = useState<Staff[]>([
    { id: '1', name: 'ya', email: 'ya@mallinator.com', phone: '0123456871', role: 'Administration', status: 'inactive', started: '2022-10-07' },
    { id: '2', name: 'mealea', email: 'rexeqefis@mallinator.com', phone: '087654345', role: 'Management', status: 'active', started: '2024-12-29' },
    { id: '3', name: 'Aiko McCarthy', email: 'guzited@mallinator.com', phone: '+781 934-8385', role: 'Administration', status: 'inactive', started: '2004-05-03' },
    { id: '4', name: 'ya manager', email: 'yayaaa@gmail.com', phone: '23456789', role: 'Health', status: 'active', started: '2025-08-23' },
  ]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [filters, setFilters] = useState({ search: '', department: 'All Departments', status: 'All Status' });

  const handleAddStaff = () => setIsFormOpen(true);
  const handleSaveStaff = (data: Staff) => {
    if (selectedStaff) {
      setStaffList(staffList.map(staff => staff.id === selectedStaff.id ? data : staff));
    } else {
      setStaffList([...staffList, { ...data, id: Date.now().toString() }]);
    }
    setIsFormOpen(false);
    setSelectedStaff(null);
  };
  const handleEditStaff = (staff: Staff) => { setSelectedStaff(staff); setIsFormOpen(true); };
  const handleDeleteStaff = (staff: Staff) => { setSelectedStaff(staff); setIsConfirmOpen(true); };
  const handleViewStaff = (staff: Staff) => { setSelectedStaff(staff); setIsViewOpen(true); };
  const handleConfirmDelete = () => { if (selectedStaff) setStaffList(staffList.filter(staff => staff.id !== selectedStaff.id)); setIsConfirmOpen(false); setSelectedStaff(null); };
  const handleFilter = (query: string, dept?: string, status?: string) => {
    setFilters(prev => ({ ...prev, search: query, department: dept || prev.department, status: status || prev.status }));
  };

  const filteredStaff = staffList.filter(staff =>
    (staff.name.toLowerCase().includes(filters.search.toLowerCase()) || staff.role.toLowerCase().includes(filters.search.toLowerCase())) &&
    (filters.department === 'All Departments' || staff.department === filters.department || (!staff.department && filters.department === 'None')) &&
    (filters.status === 'All Status' || staff.status === filters.status)
  );

  return (
    <View style={[styles.container, { paddingHorizontal: scaleWidth(0.04), paddingTop: scaleHeight(0.02) }]}>
      <Text style={styles.title}>Staff Management</Text>
      <Text style={styles.subtitle}>Manage your farm staff information and roles</Text>

      <StaffFilters
        onSearch={(q) => handleFilter(q)}
        onDepartmentFilter={(d) => handleFilter(filters.search, d)}
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
            onView={() => handleViewStaff(item)}
            onEdit={() => handleEditStaff(item)}
            onDelete={() => handleDeleteStaff(item)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: scaleHeight(0.05) }}
      />

      <StaffFormModal
        isOpen={isFormOpen}
        onClose={() => { setIsFormOpen(false); setSelectedStaff(null); }}
        onSave={handleSaveStaff}
        initialData={selectedStaff}
      />

      <ConfirmationDialog
        isOpen={isConfirmOpen}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsConfirmOpen(false)}
        message="Are you sure you want to delete this staff member?"
      />

      <Modal transparent visible={isViewOpen} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={[styles.modalContainer, { width: width * 0.9, maxHeight: height * 0.8 }]}>
            <ScrollView contentContainerStyle={{ paddingBottom: scaleHeight(0.02) }}>
              <Text style={styles.title}>Staff Details</Text>
              {selectedStaff && (
                <>
                  <Text style={styles.detailText}>Name: {selectedStaff.name}</Text>
                  <Text style={styles.detailText}>Email: {selectedStaff.email}</Text>
                  <Text style={styles.detailText}>Phone: {selectedStaff.phone}</Text>
                  <Text style={styles.detailText}>Role: {selectedStaff.role}</Text>
                  <Text style={styles.detailText}>Status: {selectedStaff.status}</Text>
                  <Text style={styles.detailText}>Started: {selectedStaff.started}</Text>
                  <Text style={styles.detailText}>Department: {selectedStaff.department || 'None'}</Text>
                </>
              )}
              <TouchableOpacity style={styles.closeButton} onPress={() => setIsViewOpen(false)}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: scaleFont(22), fontWeight: 'bold' as 'bold', marginBottom: 5, textAlign: 'center' },
  subtitle: { fontSize: scaleFont(14), fontWeight: 'normal' as 'normal', color: '#2e6ce6ff', marginBottom: 15, textAlign: 'center' },
  addButton: { backgroundColor: '#22c55e', paddingVertical: scaleHeight(0.015), borderRadius: 8, marginBottom: 15, alignItems: 'center' },
  addButtonText: { color: 'white', fontSize: scaleFont(16), fontWeight: 'bold' as 'bold' },
  modalBackground: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { backgroundColor: 'white', padding: scaleWidth(0.04), borderRadius: 12, overflow: 'hidden' },
  detailText: { fontSize: scaleFont(16), marginBottom: scaleHeight(0.008) },
  closeButton: { backgroundColor: '#ef4444', paddingVertical: scaleHeight(0.012), borderRadius: 8, alignItems: 'center', marginTop: scaleHeight(0.015) },
  buttonText: { color: 'white', fontSize: scaleFont(16), textAlign: 'center' },
});

export default StaffManagement;
