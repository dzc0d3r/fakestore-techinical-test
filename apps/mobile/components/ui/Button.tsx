import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger" | "outline";
  icon?: React.ReactNode;
  loading?: boolean;
  style?: ViewStyle;
};

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = "primary",
  icon,
  loading = false,
  style,
}) => {
  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case "secondary":
        return { backgroundColor: "#4CAF50", borderColor: "#45a049" };
      case "danger":
        return { backgroundColor: "#dc3545", borderColor: "#c82333" };
      case "outline":
        return {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: "#007bff",
        };
      default: // primary
        return { backgroundColor: "#2196F3", borderColor: "#1976D2" };
    }
  };

  const getTextColor = (): TextStyle => {
    return variant === "outline" ? { color: "#007bff" } : { color: "white" };
  };

  return (
    <TouchableOpacity
      style={[styles.button, getVariantStyle(), style]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor().color} />
      ) : (
        <React.Fragment>
          {icon && <>{icon}</>}
          {icon && <Text style={{ width: 8 }} />}
          <Text style={[styles.text, getTextColor()]}>{label}</Text>
        </React.Fragment>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
});
