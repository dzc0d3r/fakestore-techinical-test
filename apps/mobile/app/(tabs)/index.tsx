import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ProductCard } from "@/components/ProductCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useQueryClient } from "@tanstack/react-query";
import { useProducts } from "api";
import { Link } from "expo-router";
import { FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";

const SkeletonCard = () => (
  <ThemedView style={styles.skeletonCard}>
    <ThemedView style={[styles.skeletonImage, styles.skeleton]} />
    <ThemedView style={styles.skeletonContent}>
      <ThemedView style={[styles.skeletonLine, styles.skeleton]} />
      <ThemedView style={[styles.skeletonLineShort, styles.skeleton]} />
      <ThemedView style={[styles.skeletonLine, styles.skeleton]} />
    </ThemedView>
  </ThemedView>
);

export default function HomeScreen() {
  const { data: products, isLoading, isError } = useProducts();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.titleText}>
          Featured Products
        </ThemedText>
      </ThemedView>

      {isError ? (
        <ThemedView style={styles.errorContainer}>
          <ThemedText type="title">Error loading products</ThemedText>
        </ThemedView>
      ) : (
        <FlatList
          data={isLoading ? Array(10).fill(null) : products}
          renderItem={({ item }) =>
            isLoading ? (
              <SkeletonCard />
            ) : (
              <Link href={`/products/${item.id}`} asChild>
                <TouchableOpacity activeOpacity={0.7}>
                  <ProductCard product={item} />
                </TouchableOpacity>
              </Link>
            )
          }
          keyExtractor={(_, index) => index.toString()}
          scrollEnabled={false}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            !isLoading && (
              <ThemedView style={styles.emptyContainer}>
                <ThemedText>No products found</ThemedText>
              </ThemedView>
            )
          }
        />
      )}

      <ThemedView style={styles.exploreContainer}>
        <ThemedText type="subtitle">Looking for more?</ThemedText>
        <ThemedText>
          Tap the Explore tab to discover additional products and categories.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 8,
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  listContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ff000020",
  },
  emptyContainer: {
    padding: 16,
    alignItems: "center",
  },
  exploreContainer: {
    marginTop: 24,
    gap: 8,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#00000020",
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  skeletonCard: {
    flexDirection: "row",
    borderRadius: 8,
    padding: 12,
    gap: 12,
    marginBottom: 12,
  },
  skeletonImage: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  skeletonContent: {
    flex: 1,
    gap: 6,
  },
  skeletonLine: {
    height: 16,
    borderRadius: 4,
    width: "80%",
  },
  skeletonLineShort: {
    height: 16,
    borderRadius: 4,
    width: "60%",
  },
  skeleton: {
    backgroundColor: "#e1e4e8",
  },
});
