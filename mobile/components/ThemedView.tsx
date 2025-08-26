import React from "react";
import { View, type ViewProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

// Only allow keys that your theme system supports
export type ThemeColorName =
  | "background"
  | "text"
  | "tint"
  | "icon"
  | "tabIconDefault"
  | "tabIconSelected"
  | "staffCardBg"
  | "salaryCardBg"
  | "inventoryCardBg"
  | "financialCardBg"
  | "cardBg"
  | "salaryCardText"
  | "borrowCardText"
  | "maintenanceCardText";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  themedStyle?: ThemeColorName;
  testID?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  themedStyle = "background",
  testID,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    themedStyle
  );

  return (
    <View style={[{ backgroundColor }, style]} testID={testID} {...otherProps} />
  );
}