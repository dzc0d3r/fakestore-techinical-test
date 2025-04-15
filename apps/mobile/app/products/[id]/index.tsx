import { useCart } from "@/components/CartProvider";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Ionicons } from "@expo/vector-icons";
import { useProduct } from "api";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";

const { width } = Dimensions.get("window");

export default function ProductScreen() {
  const { addToCart } = useCart();
  const { id } = useLocalSearchParams();
  const { data: product, isLoading, error } = useProduct(Number(id));

  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </ThemedView>
    );
  }

  if (error || !product) {
    return (
      <ThemedView style={[styles.container, styles.errorContainer]}>
        <Ionicons name="sad-outline" size={48} color="#FF3B30" />
        <ThemedText type="title" style={styles.errorText}>
          Product not found
        </ThemedText>
      </ThemedView>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen
        options={{
          title: product.title,
          headerTintColor: "#007AFF",
        }}
      />

      <ThemedView style={styles.imageContainer}>
        <LinearGradient
          colors={["#F8F9FA", "#FFFFFF"]}
          style={styles.imageGradient}
        >
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode="contain"
          />
        </LinearGradient>
      </ThemedView>

      <ThemedView style={styles.details}>
        <Button
          label="Add to Cart"
          onPress={handleAddToCart}
          icon={<IconSymbol size={28} name="cart" color={"white"} />}
          style={styles.button}
        />
        <ThemedText type="title" style={styles.title}>
          {product.title}
        </ThemedText>

        <ThemedView style={styles.priceRatingContainer}>
          <ThemedText type="subtitle" style={styles.price}>
            ${product.price.toFixed(2)}
          </ThemedText>

          <ThemedView style={styles.ratingContainer}>
            <Ionicons name="star" size={20} color="#FFD700" />
            <ThemedText style={styles.ratingText}>
              {product.rating.rate} ({product.rating.count})
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedText style={styles.description}>
          {product.description}
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  imageContainer: {
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 24,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  imageGradient: {
    padding: 24,
  },
  image: {
    width: "100%",
    height: width * 0.7,
  },
  details: {
    gap: 16,
    paddingHorizontal: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 32,
  },
  priceRatingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 24,
    fontWeight: "700",
    color: "#007AFF",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  ratingText: {
    fontSize: 16,
    color: "#8E8E93",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#666",
    marginVertical: 16,
  },
  button: {
    marginTop: 12,
    marginBottom: 16,
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
    padding: 40,
  },
  errorText: {
    color: "#FF3B30",
    fontWeight: "600",
  },
});
