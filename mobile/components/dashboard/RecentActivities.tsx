import React from "react";
import { View, Text, StyleSheet, FlatList, ListRenderItem } from "react-native";

// Define the type for each activity
type ActivityItem = {
  id: number;
  user: string;
  action: string;
  timestamp: string;
};

export default function RecentActivities() {
  const activities: ActivityItem[] = [
    { id: 1, user: "John Doe", action: "added a new pig", timestamp: "2 hours ago" },
    { id: 2, user: "Jane Smith", action: "updated feed stock", timestamp: "3 hours ago" },
    { id: 3, user: "Mike Johnson", action: "checked water level", timestamp: "5 hours ago" },
  ];

  const renderItem: ListRenderItem<ActivityItem> = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.user}>{item.user}</Text>
      <Text style={styles.action}>{item.action}</Text>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Activities</Text>
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    margin: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    color: "#111827",
  },
  card: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  user: {
    fontWeight: "600",
    fontSize: 14,
    color: "#111827",
  },
  action: {
    fontSize: 13,
    color: "#4b5563",
    marginVertical: 4,
  },
  timestamp: {
    fontSize: 12,
    color: "#9ca3af",
  },
});
