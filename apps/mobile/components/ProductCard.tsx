import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import type { Product } from "api";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <ThemedView style={styles.card}>
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <ThemedView style={styles.details}>
        <ThemedText type="defaultSemiBold">{product.name}</ThemedText>
        <ThemedText style={styles.price}>${product.price}</ThemedText>
        <ThemedText numberOfLines={2} style={styles.description}>
          {product.description}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 8,
    padding: 12,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  details: {
    flex: 1,
    gap: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0a7ea4",
  },
  description: {
    fontSize: 12,
    opacity: 0.8,
  },
});
