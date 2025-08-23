
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Export the Staff interface as a named export
export interface Staff {
  name: string;
  email: string;
  phone: string;
  role: string;
  status: 'active' | 'inactive';
  started: string;
  department?: string;
}

interface StaffCardProps {
  staff: Staff;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const StaffCard: React.FC<StaffCardProps> = ({ staff, onView, onEdit, onDelete }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{staff.name.charAt(0)}</Text>
        </View>
        <View>
          <Text style={styles.name}>{staff.name}</Text>
          <Text style={styles.role}>{staff.role}</Text>
          <Text style={styles.email}>{staff.email}</Text>
          <Text style={styles.phone}>{staff.phone}</Text>
          <Text style={styles.started}>Started: {staff.started}</Text>
          <Text style={[styles.status, { color: staff.status === 'active' ? '#22c55e' : '#ef4444' }]}>
            {staff.status}
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.viewButton} onPress={onView}>
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton} onPress={onEdit}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: '#d1d5db',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#6b7280',
    fontSize: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  role: {
    fontSize: 14,
    color: '#6b7280',
  },
  email: {
    fontSize: 14,
    color: '#6b7280',
  },
  phone: {
    fontSize: 14,
    color: '#6b7280',
  },
  started: {
    fontSize: 12,
    color: '#6b7280',
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewButton: {
    backgroundColor: '#3b82f6',
    padding: 5,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  editButton: {
    backgroundColor: '#f59e0b',
    padding: 5,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    padding: 5,
    borderRadius: 5,
    flex: 1,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default StaffCard;
