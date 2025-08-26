import React from "react";
import { Platform } from "react-native";
import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].muted,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
            borderTopWidth: 0,
            backgroundColor: "transparent",
          },
          android: {
            elevation: 4,
            backgroundColor: Colors[colorScheme ?? "light"].background,
          },
        }),
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarAccessibilityLabel: "Dashboard tab",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="dashboard" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="staffmanagement"
        options={{
          title: "Staff Management",
          tabBarAccessibilityLabel: "Staff tab",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="group" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="financial"
        options={{
          title: "Financial",
          tabBarAccessibilityLabel: "Financial tab",
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="account-balance-wallet"
              size={28}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
