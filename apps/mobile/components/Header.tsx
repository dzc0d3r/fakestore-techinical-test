import { useAuth } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface HeaderProps {
  title: string;
  onMenuPress: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onMenuPress }) => {
  const { token, logout } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onMenuPress} style={styles.iconButton}>
          <Ionicons name="menu" size={28} color="#000" />
        </TouchableOpacity>

        {token ? (
          <TouchableOpacity onPress={logout} style={styles.iconButton}>
            <Ionicons name="log-out-outline" size={28} color="#000" />
          </TouchableOpacity>
        ) : (
          // Placeholder for alignment if not logged in
          <View style={styles.iconPlaceholder} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  iconButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  iconPlaceholder: {
    width: 32,
  },
});

export default Header;
