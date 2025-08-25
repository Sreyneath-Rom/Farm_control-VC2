import React from "react";
import { ScrollView, StyleSheet, useWindowDimensions } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

import StatsCard from "@/components/dashboard/StatsCard";
import RecentActivities from "@/components/dashboard/RecentActivities";
import LowStockAlerts from "@/components/dashboard/LowStockAlerts";

export default function Dashboard() {
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();

  // Calculate card width for responsive grid (2 cards per row, min 180px)
  const cardWidth = Math.max((width - 16 * 3) / 2, 180);

  // Dynamic date for header, consistent with financial.tsx
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }) + " (+07)";

  return (
    <ThemedView
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme ?? "light"].background },
      ]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <ThemedView style={styles.header}>
          <ThemedText type="title">Dashboard</ThemedText>
          <ThemedText type="subtitle">
            Overview of your farm metrics as of {currentDate}
          </ThemedText>
        </ThemedView>

        {/* Key Metrics Section */}
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Key Metrics
        </ThemedText>
        <ThemedView style={styles.grid}>
          <StatsCard
            style={{ width: cardWidth, marginHorizontal: 8, marginBottom: 16 }}
            title="Staff Management"
            value="4" // Synced with staffmanagement.tsx
            change="+2 this month"
            icon="group"
            bgColor={Colors[colorScheme ?? "light"].staffCardBg}
            textColor={Colors[colorScheme ?? "light"].text}
          />
          <StatsCard
            style={{ width: cardWidth, marginHorizontal: 8, marginBottom: 16 }}
            title="Salary Management"
            value="$12,450" // Placeholder, replace with dynamic data
            change="+5.2% from last month"
            icon="monetization-on"
            bgColor={Colors[colorScheme ?? "light"].salaryCardBg}
            textColor={Colors[colorScheme ?? "light"].text}
          />
          <StatsCard
            style={{ width: cardWidth, marginHorizontal: 8, marginBottom: 16 }}
            title="Inventory"
            value="156" // Placeholder, replace with dynamic data
            change="12 low stock alerts"
            icon="inventory-2"
            bgColor={Colors[colorScheme ?? "light"].inventoryCardBg}
            textColor={Colors[colorScheme ?? "light"].text}
          />
          <StatsCard
            style={{ width: cardWidth, marginHorizontal: 8, marginBottom: 16 }}
            title="Financial"
            value="$30,310" // Synced with financial.tsx net profit
            change="+8.1% from last month"
            icon="account-balance-wallet"
            bgColor={Colors[colorScheme ?? "light"].financialCardBg}
            textColor={Colors[colorScheme ?? "light"].text}
          />
        </ThemedView>

        {/* Additional Metrics Section */}
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Additional Metrics
        </ThemedText>
        <ThemedView style={styles.grid}>
          <StatsCard
            style={{ width: cardWidth, marginHorizontal: 8, marginBottom: 16 }}
            title="Salaries Paid"
            value="$0.00" // Placeholder, replace with dynamic data
            desc="Total lifetime payments"
            icon="monetization-on"
            bgColor={Colors[colorScheme ?? "light"].cardBg}
            textColor={Colors[colorScheme ?? "light"].salaryCardText}
          />
          <StatsCard
            style={{ width: cardWidth, marginHorizontal: 8, marginBottom: 16 }}
            title="Active Borrows"
            value="0" // Placeholder, replace with dynamic data
            desc="Materials borrowed by staff"
            icon="archive"
            bgColor={Colors[colorScheme ?? "light"].cardBg}
            textColor={Colors[colorScheme ?? "light"].borrowCardText}
          />
          <StatsCard
            style={{ width: cardWidth, marginHorizontal: 8, marginBottom: 16 }}
            title="Maintenance Costs"
            value="$0.00" // Placeholder, replace with dynamic data
            desc="Equipment maintenance expenses"
            icon="settings"
            bgColor={Colors[colorScheme ?? "light"].cardBg}
            textColor={Colors[colorScheme ?? "light"].maintenanceCardText}
          />
        </ThemedView>

        {/* Activity & Alerts Section */}
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Activity & Alerts
        </ThemedText>
        <ThemedView style={styles.row}>
          <ThemedView style={[styles.column, { flex: 1, marginHorizontal: 8 }]}>
            <RecentActivities />
          </ThemedView>
          <ThemedView style={[styles.column, { flex: 1, marginHorizontal: 8 }]}>
            <LowStockAlerts />
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginVertical: 16,
    fontWeight: "600",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
    marginHorizontal: -8, // Negative margin to counteract item margins
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
    marginHorizontal: -8,
  },
  column: {
    flex: 1,
    minWidth: 300,
    marginHorizontal: 8, // Fallback for gap
  },
});