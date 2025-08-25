import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

export interface Staff {
  id: string;
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

const { width } = Dimensions.get('window');
const scale = (size: number) => size * (width / 375); // base width 375

const StaffCard: React.FC<StaffCardProps> = ({ staff, onView, onEdit, onDelete }) => {
  const avatarSize = width * 0.14; // dynamic avatar size

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.avatar, { width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 }]}>
          <Text style={[styles.avatarText, { fontSize: scale(20) }]}>{staff.name.charAt(0)}</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.column}>
            <Text style={[styles.name, { fontSize: scale(16) }]} numberOfLines={1}>{staff.name}</Text>
            <Text style={[styles.role, { fontSize: scale(14) }]} numberOfLines={1}>{staff.role}</Text>
            <Text style={[styles.email, { fontSize: scale(13) }]} numberOfLines={1}>{staff.email}</Text>
          </View>
          <View style={styles.column}>
            <Text style={[styles.phone, { fontSize: scale(13) }]}>{staff.phone}</Text>
            <Text style={[styles.started, { fontSize: scale(12) }]}>Started: {staff.started}</Text>
            <Text style={[styles.status, { fontSize: scale(12), color: staff.status === 'active' ? '#22c55e' : '#ef4444' }]}>
              {staff.status}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onView}>
          <Text style={[styles.buttonText, { fontSize: scale(13) }]}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onEdit}>
          <Text style={[styles.buttonText, { fontSize: scale(13) }]}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onDelete}>
          <Text style={[styles.buttonText, { fontSize: scale(13) }]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: width * 0.04,
    borderRadius: 12,
    marginBottom: width * 0.04,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: width * 0.03 },
  avatar: { backgroundColor: '#d1d5db', justifyContent: 'center', alignItems: 'center', marginRight: width * 0.03 },
  avatarText: { color: '#6b7280', fontWeight: 'bold' },
  infoContainer: { flex: 1, flexDirection: 'row', justifyContent: 'space-between' },
  column: { flex: 1 },
  name: { fontWeight: 'bold', marginBottom: width * 0.01 },
  role: { color: '#6b7280', marginBottom: width * 0.01 },
  email: { color: '#6b7280', marginBottom: width * 0.01 },
  phone: { color: '#6b7280', marginBottom: width * 0.01 },
  started: { color: '#6b7280', marginBottom: width * 0.01 },
  status: { fontWeight: 'bold' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: width * 0.02 },
  button: {
    flex: 1,
    marginHorizontal: width * 0.01,
    paddingVertical: width * 0.025,
    borderRadius: 8,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    minWidth: 70,
  },
  buttonText: { color: 'white', fontWeight: '600' },
});

export default StaffCard;
