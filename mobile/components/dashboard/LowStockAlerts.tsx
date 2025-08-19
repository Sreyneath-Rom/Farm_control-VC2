import React from "react";
import { View, Text, StyleSheet, FlatList, ListRenderItem } from "react-native";

// Define the type for each stock item
type StockItem = {
  id: number;
  name: string;
  current: string;
  minimum: string;
  percentage: number;
};

export default function LowStockAlerts() {
  const lowStockItems: StockItem[] = [
    { id: 1, name: "Pig Feed - Starter", current: "45 kg", minimum: "100 kg", percentage: 45 },
    { id: 2, name: "Antibiotics", current: "8 bottles", minimum: "15 bottles", percentage: 53 },
    { id: 3, name: "Vitamins", current: "12 bottles", minimum: "20 bottles", percentage: 60 },
  ];

  // Typed renderItem function
  const renderItem: ListRenderItem<StockItem> = ({ item }) => (
    <View style={styles.card}>
      {/* Title + Badge */}
      <View style={styles.headerRow}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.badge}>Low Stock</Text>
      </View>

      {/* Current & Minimum */}
      <Text style={styles.infoText}>
        Current: {item.current} | Minimum: {item.minimum}
      </Text>

      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${item.percentage}%` }]} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Section Title */}
      <View style={styles.header}>
        <Text style={styles.title}>Low Stock Alerts</Text>
      </View>

      {/* List of items */}
      <FlatList
        data={lowStockItems}
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
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  card: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
    alignItems: "center",
  },
  itemName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  badge: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    fontSize: 12,
    fontWeight: "600",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
    overflow: "hidden",
  },
  infoText: {
    fontSize: 13,
    color: "#4b5563",
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: 8,
    backgroundColor: "#ef4444",
    borderRadius: 4,
  },
});
