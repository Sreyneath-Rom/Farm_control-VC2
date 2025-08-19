// app/(tabs)/dashboard.tsx
import React from "react";
import { ScrollView, View, StyleSheet, useWindowDimensions } from "react-native";

import StatsCard from "@/components/dashboard/StatsCard";
import RecentActivities from "@/components/dashboard/RecentActivities";
import LowStockAlerts from "@/components/dashboard/LowStockAlerts";

export default function Dashboard() {
  const { width } = useWindowDimensions();

  // 2 cards per row with 16px gaps
  const cardWidth = (width - 16 * 3) / 2;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* === Top Stats Section === */}
      <View style={styles.grid}>
        
        <StatsCard
          style={{ width: cardWidth }}
          title="Staff Management"
          value="24"
          change="+2 this month"
          icon="group"
          bgColor="#214cdaff"
          textColor="#fff"
        />
        <StatsCard
          style={{ width: cardWidth }}
          title="Salary Management"
          value="$12,450"
          change="+5.2% from last month"
          icon="monetization-on"
          bgColor="#dca009ff"
          textColor="#fff"
        />
        <StatsCard
          style={{ width: cardWidth }}
          title="Inventory"
          value="156"
          change="12 low stock alerts"
          icon="inventory-2"
          bgColor="#00b51eff"
          textColor="#fff"
        />
        <StatsCard
          style={{ width: cardWidth }}
          title="Financial"
          value="$18,750"
          change="+8.1% from last month"
          icon="account-balance-wallet"
          bgColor="#9333ea"
          textColor="#fff"
        />
      </View>

      {/* === Bottom Stats Section === */}
      <View style={styles.grid}>
        <StatsCard
          style={{ width: cardWidth }}
          title="Salaries Paid"
          value="$0.00"
          desc="Total lifetime payments"
          icon="monetization-on"
          bgColor="#fff"
          textColor="#00b51eff"
        />
        <StatsCard
          style={{ width: cardWidth }}
          title="Active Borrows"
          value="0"
          desc="Materials borrowed by staff"
          icon="archive"
          bgColor="#fff"
          textColor="#6b21a8"
        />
        <StatsCard
          style={{ width: cardWidth }}
          title="Maintenance Costs"
          value="$0.00"
          desc="Equipment maintenance expenses"
          icon="settings"
          bgColor="#fff"
          textColor="#c2410c"
        />
      </View>

      {/* === Recent Activities & Low Stock Alerts Section === */}
      <View style={styles.row}>
        <View style={[styles.column, { flex: 1 }]}>
          <RecentActivities />
        </View>
        <View style={[styles.column, { flex: 1 }]}>
          <LowStockAlerts />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 16, // 16px gap between cards
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  column: {
    flex: 1,
    minWidth: 300,
  },
});
