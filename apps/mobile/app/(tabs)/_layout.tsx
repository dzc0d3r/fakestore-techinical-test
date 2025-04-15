import { HapticTab } from "@/components/HapticTab";
import Header from "@/components/Header";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/useAuth";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Redirect, Tabs } from "expo-router";
import React, { useEffect } from "react";
import { Platform, View } from "react-native";


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { token, isLoading, isAdmin, checkRole } = useAuth();
  console.log("Current auth state:", { token, isAdmin, isLoading });
  console.log(isAdmin);

  if (isLoading) {
    return <View style={{ flex: 1, backgroundColor: "#fff" }} />;
  }

  if (!token) {
    return <Redirect href="/login" />;
  }
  const handleMenuPress = () => {
    // Implement menu action here (e.g., open a drawer)
    console.log("Menu pressed");
  };

  return (
    <>
      <Header title="Home" onMenuPress={handleMenuPress} />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: "absolute",
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }: { color: string }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="admin"
          options={{
            title: "Admin Area",
            tabBarIcon: ({ color }: { color: string }) => (
              <IconSymbol size={28} name="admin" color={color} />
            ),
            href: isAdmin ? "/admin" : null,
          }}
        />

        <Tabs.Screen
          name="cart"
          options={{
            title: "Cart",
            tabBarIcon: ({ color }: { color: string }) => (
              <IconSymbol size={28} name="cart" color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}