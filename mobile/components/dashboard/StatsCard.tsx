import React from "react";
import { View, Text, StyleSheet, ViewStyle, Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  desc?: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  bgColor: string;
  textColor: string;
  style?: ViewStyle;
  testID?: string;
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
  testID,
}) => {
  return (
    <View
      style={[styles.card, { backgroundColor: bgColor }, style]}
      accessible
      accessibilityLabel={`${title}, ${value}${desc ? `, ${desc}` : ""}`}
      testID={testID ?? `stats-card-${title.toLowerCase().replace(/\s/g, "-")}`}
    >
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
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  icon: {
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  value: {
    fontSize: 22,
    fontWeight: "700",
    marginVertical: 4,
    textAlign: "center",
  },
  change: {
    fontSize: 12,
    marginTop: 2,
    textAlign: "center",
  },
  desc: {
    fontSize: 12,
    marginTop: 2,
    textAlign: "center",
  },
});

export default StatsCard;