;
// app/(tabs)/cart.tsx
import { useCart } from "@/components/CartProvider";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";


export default function CartScreen() {
  const { cartItems, removeFromCart, addToCart, deleteFromCart, getCartTotal } =
    useCart();

  const renderItem = ({ item }: { item: CartItem }) => (
    <ThemedView style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <ThemedText style={styles.itemName}>{item.name}</ThemedText>
        <ThemedText style={styles.itemPrice}>
          ${item.price.toFixed(2)}
        </ThemedText>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => removeFromCart(item)}>
            <Ionicons name="remove-circle" size={24} color="#007AFF" />
          </TouchableOpacity>
          <ThemedText style={styles.quantity}>{item.quantity}</ThemedText>
          <TouchableOpacity onPress={() => addToCart(item)}>
            <Ionicons name="add-circle" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteFromCart(item.id)}
      >
        <Ionicons name="trash" size={20} color="#FF3B30" />
      </TouchableOpacity>
    </ThemedView>
  );

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <ThemedView style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={64} color="#8E8E93" />
          <ThemedText style={styles.emptyText}>Your cart is empty</ThemedText>
        </ThemedView>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
          />
          <ThemedView style={styles.totalContainer}>
            <ThemedText style={styles.totalText}>Total:</ThemedText>
            <ThemedText style={styles.totalAmount}>
              ${getCartTotal().toFixed(2)}
            </ThemedText>
          </ThemedView>
          <TouchableOpacity style={styles.checkoutButton}>
            <LinearGradient
              colors={["#007AFF", "#0040FF"]}
              style={styles.gradient}
            >
              <ThemedText style={styles.checkoutText}>
                Proceed to Checkout
              </ThemedText>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  emptyText: {
    fontSize: 18,
    color: "#8E8E93",
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 16,
    resizeMode: "contain",
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: "#007AFF",
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  quantity: {
    fontSize: 16,
    fontWeight: "500",
  },
  deleteButton: {
    padding: 8,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "600",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "700",
    color: "#007AFF",
  },
  checkoutButton: {
    margin: 16,
    borderRadius: 14,
    overflow: "hidden",
  },
  gradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 12,
  },
  checkoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});