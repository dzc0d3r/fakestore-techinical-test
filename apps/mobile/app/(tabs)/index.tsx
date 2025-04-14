import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ProductCard } from "@/components/ProductCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { useProducts } from "api";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 40) / 2;

const SkeletonCard = () => (
  <ThemedView style={styles.skeletonWrapper}>
    <ThemedView style={styles.productCard}>
      <ThemedView style={styles.cardGradient}>
        <ThemedView style={[styles.skeletonImage, styles.skeleton]} />
        <ThemedView style={styles.cardContent}>
          <ThemedView style={[styles.skeletonTitle, styles.skeleton]} />
          <ThemedView style={[styles.skeletonPrice, styles.skeleton]} />
          <ThemedView style={styles.bottomRow}>
            <ThemedView style={[styles.skeletonRating, styles.skeleton]} />
            <ThemedView style={[styles.skeletonButton]} />
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  </ThemedView>
);

export default function HomeScreen() {
  const { data: products, isLoading, isError } = useProducts();

  const handleAddToCart = (productId: number) => {
    // Implement your add to cart logic here
    console.log("Added product to cart:", productId);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#F8F9FA", dark: "#212529" }}
      headerHeight={300}
      parallaxHeaderHeight={250}
      headerImage={
        <Image
          source={require("@/assets/images/wave.png")}
          style={styles.headerImage}
          resizeMode="cover"
        />
      }
      backgroundSpeed={10}
    >
      {/* Featured Section */}
      <ThemedView style={styles.sectionHeader}>
        <ThemedText type="title" style={styles.sectionTitle}>
          New Arrivals
        </ThemedText>
        <Link href="/products" asChild>
          <TouchableOpacity style={styles.seeAllButton}>
            <ThemedText style={styles.seeAllText}>See All</ThemedText>
            <Ionicons name="arrow-forward" size={16} color="#007AFF" />
          </TouchableOpacity>
        </Link>
      </ThemedView>

      {/* Product Grid */}
      {isError ? (
        <ThemedView style={styles.errorContainer}>
          <Ionicons name="sad-outline" size={48} color="#FF3B30" />
          <ThemedText style={styles.errorText}>
            Failed to load products
          </ThemedText>
        </ThemedView>
      ) : (
        <FlatList
          data={isLoading ? Array(10).fill(null) : products}
          renderItem={({ item, index }) => (
            <ThemedView style={styles.cardWrapper}>
              {isLoading ? (
                <SkeletonCard />
              ) : (
                <Link href={`/products/${item.id}`} asChild>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.productCard}
                  >
                    <LinearGradient
                      colors={["#FFFFFF", "#F8F9FA"]}
                      style={styles.cardGradient}
                    >
                      <Image
                        source={{ uri: item.image }}
                        style={styles.productImage}
                        resizeMode="contain"
                      />
                      <ThemedView style={styles.cardContent}>
                        <ThemedText
                          numberOfLines={1}
                          style={styles.productTitle}
                        >
                          {item.title}
                        </ThemedText>
                        <ThemedText style={styles.productPrice}>
                          ${item.price}
                        </ThemedText>
                        <ThemedView style={styles.bottomRow}>
                          <ThemedView style={styles.ratingContainer}>
                            <Ionicons name="star" size={14} color="#FFD700" />
                            <ThemedText style={styles.ratingText}>
                              {item.rating?.rate} ({item.rating?.count})
                            </ThemedText>
                          </ThemedView>
                          <TouchableOpacity
                            style={styles.addToCartButton}
                            onPress={(e) => {
                              e.preventDefault();
                              handleAddToCart(item.id);
                            }}
                          >
                            <Ionicons name="cart" size={16} color="#007AFF" />
                          </TouchableOpacity>
                        </ThemedView>
                      </ThemedView>
                    </LinearGradient>
                  </TouchableOpacity>
                </Link>
              )}
            </ThemedView>
          )}
          keyExtractor={(_, index) => index.toString()}
          numColumns={2}
          columnWrapperStyle={styles.gridContainer}
          scrollEnabled={false}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* Trending Categories */}
      <ThemedView style={styles.sectionHeader}>
        <ThemedText type="title" style={styles.sectionTitle}>
          Trending Categories
        </ThemedText>
      </ThemedView>

      <FlatList
        horizontal
        data={["Electronics", "Fashion", "Home", "Beauty"]}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryCard}>
            <LinearGradient
              colors={["#007AFF", "#0040FF"]}
              style={styles.categoryGradient}
            >
              <Ionicons name="phone-portrait" size={32} color="white" />
              <ThemedText style={styles.categoryText}>{item}</ThemedText>
            </LinearGradient>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.categoryList}
        showsHorizontalScrollIndicator={false}
      />

      {/* Explore Banner */}
      <TouchableOpacity style={styles.exploreBanner}>
        <LinearGradient
          colors={["#FF2D55", "#FF9500"]}
          style={styles.bannerGradient}
        >
          <ThemedText style={styles.bannerTitle}>Summer Sale!</ThemedText>
          <ThemedText style={styles.bannerText}>
            Up to 50% off selected items
          </ThemedText>
          <Ionicons
            name="arrow-forward-circle"
            size={32}
            color="white"
            style={styles.bannerIcon}
          />
        </LinearGradient>
      </TouchableOpacity>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: 300,
    width: '100%',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    color: '#007AFF',
    fontWeight: '500',
  },
  gridContainer: {
    gap: 10,
    paddingHorizontal: 16,
  },
  cardWrapper: {
    width: CARD_WIDTH,
    flex: 1,
  },
  skeletonWrapper: {
    width: CARD_WIDTH,
    flex: 1,
    marginBottom: 10,
    
  },
  productCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 10,
  },
  cardGradient: {
    padding: 12,
    borderRadius: 20,
  },
  productImage: {
    width: '100%',
    height: 150,
    marginBottom: 12,
  },
  cardContent: {
    paddingHorizontal: 8,
    borderRadius: 10,
    padding: 10
  },
  productTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 8,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#8E8E93',
  },
  addToCartButton: {
    backgroundColor: '#007AFF20',
    padding: 6,
    borderRadius: 8,
  },
  categoryList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryCard: {
    width: 140,
    height: 140,
    borderRadius: 20,
    overflow: 'hidden',
  },
  categoryGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  categoryText: {
    color: 'white',
    fontWeight: '600',
    marginTop: 8,
  },
  skeletonImage: {
    width: '80%',
    height: 150,
    borderRadius: 12,
    marginBottom: 12,
  },
  skeletonTitle: {
    height: 14,
    width: '80%',
    marginBottom: 4,
    borderRadius: 4,
  },
  skeletonPrice: {
    height: 16,
    width: '40%',
    marginBottom: 8,
    borderRadius: 4,
  },
  skeletonRating: {
    height: 12,
    width: '50%',
    borderRadius: 4,
  },
  skeletonButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  skeleton: {
    backgroundColor: '#E9ECEF',
  },
  exploreBanner: {
    marginHorizontal: 20,
    marginTop: 24,
    borderRadius: 20,
    overflow: 'hidden',
  },
  bannerGradient: {
    padding: 24,
    alignItems: 'center',
  },
  bannerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
  },
  bannerText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 12,
  },
  bannerIcon: {
    marginTop: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    gap: 16,
  },
  errorText: {
    color: '#FF3B30',
    fontWeight: '500',
  },
});