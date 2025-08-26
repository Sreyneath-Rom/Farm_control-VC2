import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

import StatsCard from "@/components/dashboard/StatsCard";
import RecentActivities from "@/components/dashboard/RecentActivities";
import LowStockAlerts from "@/components/dashboard/LowStockAlerts";

// Utility: Responsive card width calculator
function getCardWidth(
  containerWidth: number,
  columns: number = 2,
  minWidth: number = 160,
  padding: number = 16,
  gap: number = 16
) {
  const totalSpacing = padding * 2 + gap * (columns - 1);
  return Math.max((containerWidth - totalSpacing) / columns, minWidth);
}

// Wrapper: Reusable metric card
type MetricCardProps = {
  title: string;
  value: string;
  change?: string;
  desc?: string;
  icon: string;
  bgColor: string;
  textColor: string;
  width: number;
};

function MetricCard({
  title,
  value,
  change,
  desc,
  icon,
  bgColor,
  textColor,
  width,
}: MetricCardProps) {
  return (
    <StatsCard
      title={title}
      value={value}
      change={change}
      desc={desc}
      icon={icon}
      bgColor={bgColor}
      textColor={textColor}
      style={{
        width,
        marginHorizontal: 8,
        marginBottom: 16,
        backgroundColor: bgColor,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
      }}
    />
  );
}

export default function Dashboard() {
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const cardWidth = getCardWidth(width, 2, 160, 16, 16);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const currentDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Phnom_Penh",
  }).format(new Date());

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ThemedView
          style={[
            styles.loadingContainer,
            { backgroundColor: Colors[colorScheme ?? "light"].background },
          ]}
        >
          <ActivityIndicator size="large" color={Colors[colorScheme ?? "light"].text} />
          <ThemedText type="subtitle" style={{ marginTop: 12 }}>
            Loading dashboard...
          </ThemedText>
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <ThemedView style={[styles.container, { backgroundColor: Colors[colorScheme ?? "light"].background }]}>
          {/* Header */}
          <ThemedView style={styles.header}>
            <ThemedText type="title" style={styles.dashboardTitle}>
              Dashboard
            </ThemedText>
            <ThemedText type="subtitle">
              Overview of your farm metrics as of {currentDate}
            </ThemedText>
          </ThemedView>

          {/* Key Metrics */}
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Key Metrics
          </ThemedText>
          <ThemedView style={styles.grid}>
            <MetricCard
              title="Staff Management"
              value="4"
              change="+2 this month"
              icon="group"
              bgColor={Colors.light.staffCardBg}
              textColor={Colors.light.text}
              width={cardWidth}
            />
            <MetricCard
              title="Financial"
              value="$30,310"
              change="+8.1% from last month"
              icon="account-balance-wallet"
              bgColor={Colors.light.financialCardBg}
              textColor={Colors.light.text}
              width={cardWidth}
            />
          </ThemedView>

          {/* Additional Metrics */}
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Additional Metrics
          </ThemedText>
          <ThemedView style={styles.grid}>
            <MetricCard
              title="Salaries Paid"
              value="$0.00"
              desc="Total lifetime payments"
              icon="monetization-on"
              bgColor={Colors.light.cardBg}
              textColor={Colors.light.salaryCardText}
              width={cardWidth}
            />
            <MetricCard
              title="Active Borrows"
              value="0"
              desc="Materials borrowed by staff"
              icon="archive"
              bgColor={Colors.light.cardBg}
              textColor={Colors.light.borrowCardText}
              width={cardWidth}
            />
            <MetricCard
              title="Maintenance Costs"
              value="$0.00"
              desc="Equipment maintenance expenses"
              icon="settings"
              bgColor={Colors.light.cardBg}
              textColor={Colors.light.maintenanceCardText}
              width={cardWidth}
            />
          </ThemedView>

          {/* Activity & Alerts */}
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
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingBottom: 24,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginBottom: 24,
  },
  dashboardTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: "#121111ff",
  },
  sectionTitle: {
    marginVertical: 5,
    fontSize: 15,
    fontWeight: "200",
    color: "#fffafaff",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
    marginHorizontal: -8,
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
    marginHorizontal: 8,
  },
});