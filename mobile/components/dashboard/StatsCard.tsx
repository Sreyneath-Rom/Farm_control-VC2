// mobile/components/dashboard/StatsCard.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Feather from "react-native-feather";

type StatsCardProps = {
  title: string;
  value: string;
  change?: string;   // optional now
  desc?: string;     // optional now
  icon: keyof typeof iconMap;
  bgColor?: string;
  textColor?: string;
};

// map of icons you can use
const iconMap = {
  users: Feather.Users,
  wrench: Feather.Tool,
  box: Feather.Box,
  dollar: Feather.DollarSign,
  "dollar-sign": Feather.DollarSign,
  archive: Feather.Archive,
  "credit-card": Feather.CreditCard,
  settings: Feather.Settings,
  trending: Feather.TrendingUp,
};

export default function StatsCard({
  title,
  value,
  change,
  desc,
  icon,
  bgColor = "#fff",
  textColor = "#000",
}: StatsCardProps) {
  const IconComponent = iconMap[icon];

  return (
    <View style={[styles.card, { backgroundColor: bgColor }]}>
      {/* Icon */}
      <View style={styles.iconWrapper}>
        {IconComponent && <IconComponent width={24} height={24} stroke={textColor} />}
      </View>

      {/* Stats info */}
      <View style={styles.textWrapper}>
        <Text style={[styles.title, { color: textColor }]}>{title}</Text>
        <Text style={[styles.value, { color: textColor }]}>{value}</Text>

        {/* Optional change */}
        {change && <Text style={styles.change}>{change}</Text>}

        {/* Optional desc */}
        {desc && <Text style={styles.desc}>{desc}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  iconWrapper: {
    marginRight: 12,
  },
  textWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
  },
  value: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 4,
  },
  change: {
    fontSize: 12,
    color: "green",
  },
  desc: {
    fontSize: 12,
    color: "#666",
  },
});
