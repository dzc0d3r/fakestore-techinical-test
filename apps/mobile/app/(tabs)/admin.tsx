import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { AntDesign } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Picker } from "@react-native-picker/picker";
import { useCreateProduct, useDeleteProduct, useProducts, useUpdateProduct, type Product } from "api";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, FlatList, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { z } from "zod";


const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z
    .string()
    .refine(
      (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
      "Valid price required",
    ),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
});

export default function AdminScreen() {
  const { isAdmin } = useAuth();
  const { data: products, isLoading, error } = useProducts();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: "",
      category: "",
      description: "",
    },
  });

  // Mutations
  const create = useCreateProduct();
  const update = useUpdateProduct();
  const remove = useDeleteProduct();

  useEffect(() => {
    if (selectedProduct) {
      reset({
        title: selectedProduct.title,
        price: selectedProduct.price.toString(),
        category: selectedProduct.category,
        description: selectedProduct.description,
      });
    }
  }, [selectedProduct]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const productData = {
      ...data,
      price: parseFloat(data.price),
      image: "https://placehold.co/300x300/png",
      rating: { rate: 0, count: 0 },
    };

    try {
      if (selectedProduct) {
        await update.mutateAsync({ ...selectedProduct, ...productData });
      } else {
        await create.mutateAsync({
          ...productData,
          id: Math.floor(Math.random() * 10000),
        });
      }
      setModalVisible(false);
      reset();
    } catch (error) {
      console.error("Operation failed:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await remove.mutateAsync(id);
    } catch (err) {
      console.log(err);
    }
  };

  if (!isAdmin) return null;

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Product Management</Text>
        <Button
          onPress={() => {
            setSelectedProduct(null);
            setModalVisible(true);
          }}
          label="Add Product"
          icon={<AntDesign name="pluscircleo" size={16} color="white" />}
          variant="primary"
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" style={styles.loader} />
      ) : (
        <FlatList
          data={[...(products || [])].reverse()}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.cardRow}>
                  <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                  <Text style={styles.category}>{item.category}</Text>
                </View>
                <Text numberOfLines={2} style={styles.description}>
                  {item.description}
                </Text>
              </View>
              <View style={styles.cardActions}>
                <Button
                  onPress={() => handleDelete(item.id)}
                  label="Delete"
                  variant="danger"
                  icon={<AntDesign name="delete" size={14} color="white" />}
                />
                <Button
                  onPress={() => {
                    setSelectedProduct(item);
                    setModalVisible(true);
                  }}
                  label="Edit"
                  variant="secondary"
                  icon={<AntDesign name="edit" size={14} color="white" />}
                />
              </View>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>No products found</Text>
          }
        />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {selectedProduct ? "Edit Product" : "Create New Product"}
              </Text>

              <Controller
                control={control}
                name="title"
                render={({ field: { onChange, value } }) => (
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Product Title</Text>
                    <TextInput
                      style={styles.input}
                      value={value}
                      onChangeText={onChange}
                      placeholder="Enter product title"
                    />
                    {errors.title && (
                      <Text style={styles.errorText}>
                        {errors.title.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="price"
                render={({ field: { onChange, value } }) => (
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput
                      style={styles.input}
                      value={value}
                      onChangeText={onChange}
                      placeholder="0.00"
                      keyboardType="numeric"
                    />
                    {errors.price && (
                      <Text style={styles.errorText}>
                        {errors.price.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="category"
                render={({ field: { onChange, value } }) => (
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Category</Text>
                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue={value}
                        onValueChange={onChange}
                        style={styles.picker}
                      >
                        <Picker.Item label="Select Category" value="" />
                        <Picker.Item label="Electronics" value="electronics" />
                        <Picker.Item label="Jewelry" value="jewelery" />
                        <Picker.Item
                          label="Men's Clothing"
                          value="men's clothing"
                        />
                        <Picker.Item
                          label="Women's Clothing"
                          value="women's clothing"
                        />
                      </Picker>
                    </View>
                    {errors.category && (
                      <Text style={styles.errorText}>
                        {errors.category.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => (
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                      style={[styles.input, styles.multilineInput]}
                      value={value}
                      onChangeText={onChange}
                      placeholder="Enter product description"
                      multiline
                      numberOfLines={4}
                    />
                    {errors.description && (
                      <Text style={styles.errorText}>
                        {errors.description.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              <View style={styles.modalActions}>
                <Button
                  onPress={() => {
                    setModalVisible(false);
                    reset();
                  }}
                  label="Cancel"
                  variant="outline"
                />
                <Button
                  onPress={handleSubmit(onSubmit)}
                  label={selectedProduct ? "Save Changes" : "Create Product"}
                  variant="primary"
                  loading={create.isPending || update.isPending}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "500",
  },
  category: {
    fontSize: 14,
    color: "#666",
    textTransform: "capitalize",
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  cardActions: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "flex-end",
    marginTop: 12,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 12,
    maxHeight: "80%",
  },
  modalContent: {
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 24,
    color: "#1a1a1a",
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#e9ecef",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#e9ecef",
    borderRadius: 8,
    overflow: "hidden",
  },
  picker: {
    backgroundColor: "#f8f9fa",
    height: 50,
  },
  modalActions: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "flex-end",
    marginTop: 24,
  },
  errorText: {
    color: "#dc3545",
    fontSize: 12,
    marginTop: 4,
  },
  loader: {
    marginTop: 40,
  },
  empty: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
  },
  error: {
    color: "red",
    fontSize: 18,
  },
});