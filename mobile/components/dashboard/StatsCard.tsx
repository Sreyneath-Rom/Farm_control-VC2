// components/dashboard/StatsCard.tsx
import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  desc?: string;
  icon: keyof typeof MaterialIcons.glyphMap; // ✅ MaterialIcons
  bgColor: string;
  textColor: string;
  style?: ViewStyle; // allow additional styling
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  desc,
  icon,
  bgColor,
  textColor,
  style,
}) => {
  return (
    <View style={[styles.card, { backgroundColor: bgColor }, style]}>
      <MaterialIcons name={icon} size={28} color={textColor} style={styles.icon} />
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
      <Text style={[styles.value, { color: textColor }]}>{value}</Text>
      {change && <Text style={[styles.change, { color: textColor }]}>{change}</Text>}
      {desc && <Text style={[styles.desc, { color: textColor }]}>{desc}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: { marginBottom: 8 },
  title: { fontSize: 14, fontWeight: "500" },
  value: { fontSize: 22, fontWeight: "700", marginVertical: 4 },
  change: { fontSize: 12, marginTop: 2 },
  desc: { fontSize: 12, marginTop: 2 },
});

export default StatsCard;
