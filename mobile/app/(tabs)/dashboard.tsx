import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import RecentActivities from "@/components/dashboard/RecentActivities";
import LowStockAlerts from "@/components/dashboard/LowStockAlerts";
import StatsCard from "@/components/dashboard/StatsCard";

export default function Dashboard() {
  return (
    <ScrollView style={styles.container}>
      {/* Top Cards */}
      <View style={styles.grid}>
        <StatsCard title="Total Staff" value="24" change="+2 this month" icon="users" bgColor="#2563eb" textColor="#fff" />
        <StatsCard title="Monthly Expenses" value="$12,450" change="+5.2% from last month" icon="dollar" bgColor="#ef4444" textColor="#fff" />
        <StatsCard title="Inventory Items" value="156" change="12 low stock alerts" icon="box" bgColor="#16a34a" textColor="#fff" />
        <StatsCard title="Monthly Revenue" value="$18,750" change="+8.1% from last month" icon="trending" bgColor="#9333ea" textColor="#fff" />
      </View>

      {/* Bottom Cards */}
      <View style={styles.grid}>
        <StatsCard title="Salaries Paid" value="$0.00" desc="Total lifetime payments to staff" icon="credit-card" bgColor="#fff" textColor="#047857" />
        <StatsCard title="Active Borrows" value="0" desc="Materials currently borrowed by staff" icon="archive" bgColor="#fff" textColor="#6b21a8" />
        <StatsCard title="Maintenance Costs" value="$0.00" desc="Total equipment maintenance expenses" icon="settings" bgColor="#fff" textColor="#c2410c" />
      </View>

      {/* Final Section */}
      <View style={styles.row}>
        <RecentActivities />
        <LowStockAlerts />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6", padding: 16 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 16 },
  row: { flexDirection: "row", flexWrap: "wrap" },
});
