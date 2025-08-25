
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

// Export the Staff interface as a named export
export interface Staff {
  id: string; // Make id required
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
  const { width } = Dimensions.get('window');
  const avatarSize = width * 0.12; // 12% of screen width

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.avatar, { width: avatarSize, height: avatarSize }]}>
          <Text style={styles.avatarText}>{staff.name.charAt(0)}</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.column}>
            <Text style={styles.name}>{staff.name}</Text>
            <Text style={styles.role}>{staff.role}</Text>
            <Text style={styles.email}>{staff.email}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.phone}>{staff.phone}</Text>
            <Text style={styles.started}>Started: {staff.started}</Text>
            <Text style={[styles.status, { color: staff.status === 'active' ? '#22c55e' : '#ef4444' }]}>
              {staff.status}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onView}>
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onEdit}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  avatar: {
    backgroundColor: '#d1d5db',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#6b7280',
    fontSize: 20,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  role: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 5,
  },
  phone: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 5,
  },
  started: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 5,
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    minWidth: 70, // Minimum touch target size
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default StaffCard;
