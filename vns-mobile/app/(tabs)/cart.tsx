// app/(tabs)/cart.tsx
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type CartItem = {
  id: number;
  name: string;
  location: string;
  price: number;
  image: any;
  quantity: number;
};

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Load giỏ hàng từ storage khi mở trang
  useEffect(() => {
    // Trong thực tế, bạn sẽ lấy dữ liệu từ AsyncStorage hoặc state management
    // Đây là dữ liệu mẫu
    const sampleCartItems: CartItem[] = [
      {
        id: 1,
        name: "Vịnh Hạ Long",
        location: "Quảng Ninh",
        price: 4500000,
        image: require("@/assets/images/halong.jpg"),
        quantity: 2,
      },
      {
        id: 2,
        name: "Phong Nha - Kẻ Bàng",
        location: "Quảng Bình",
        price: 3200000,
        image: require("@/assets/images/phongnha.jpg"),
        quantity: 1,
      },
    ];
    setCartItems(sampleCartItems);
  }, []);

  // Tính tổng tiền khi giỏ hàng thay đổi
  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

  // Tăng số lượng
  const increaseQuantity = (id: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Giảm số lượng
  const decreaseQuantity = (id: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeItem = (id: number) => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn muốn xóa tour này khỏi giỏ hàng?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Xóa",
          onPress: () => {
            setCartItems(cartItems.filter((item) => item.id !== id));
          },
        },
      ]
    );
  };

  // Thanh toán
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert(
        "Giỏ hàng trống",
        "Vui lòng thêm tour vào giỏ hàng trước khi thanh toán"
      );
      return;
    }

    router.push({
      pathname: "/payment",
      params: {
        items: JSON.stringify(cartItems),
        total: totalPrice.toString(),
      },
    });
  };

  // Render mỗi item trong giỏ hàng
  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemLocation}>
          <MaterialIcons name="location-on" size={14} color="#666" />
          {item.location}
        </Text>
        <Text style={styles.itemPrice}>
          {item.price.toLocaleString()} VND/người
        </Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => decreaseQuantity(item.id)}
          >
            <MaterialIcons name="remove" size={18} color="#4A90E2" />
          </TouchableOpacity>

          <Text style={styles.quantityText}>{item.quantity}</Text>

          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => increaseQuantity(item.id)}
          >
            <MaterialIcons name="add" size={18} color="#4A90E2" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => removeItem(item.id)}
          >
            <MaterialIcons name="delete" size={18} color="#FF5252" />
          </TouchableOpacity>
        </View>

        <Text style={styles.itemTotal}>
          Tổng: {(item.price * item.quantity).toLocaleString()} VND
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace("/(tabs)/home")}>
          <MaterialIcons name="arrow-back" size={24} color="#4A90E2" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Giỏ Hàng</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Nội dung giỏ hàng */}
      {cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <FontAwesome name="shopping-cart" size={60} color="#DDD" />
          <Text style={styles.emptyText}>Giỏ hàng của bạn đang trống</Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => router.push("/(tabs)/home")}
          >
            <Text style={styles.browseButtonText}>Khám phá các tour</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.content}>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            contentContainerStyle={styles.listContent}
          />

          {/* Tổng thanh toán */}
          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tạm tính:</Text>
              <Text style={styles.summaryValue}>
                {totalPrice.toLocaleString()} VND
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Giảm giá:</Text>
              <Text style={styles.summaryValue}>0 VND</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={[styles.summaryLabel, styles.totalLabel]}>
                Tổng cộng:
              </Text>
              <Text style={[styles.summaryValue, styles.totalValue]}>
                {totalPrice.toLocaleString()} VND
              </Text>
            </View>
          </View>
        </ScrollView>
      )}

      {/* Nút thanh toán */}
      {cartItems.length > 0 && (
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutButtonText}>THANH TOÁN</Text>
          <Text style={styles.checkoutButtonPrice}>
            {totalPrice.toLocaleString()} VND
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    backgroundColor: "#FFF",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  emptyCart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 100,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    marginTop: 16,
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: "#4A90E2",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  itemLocation: {
    fontSize: 13,
    color: "#666",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: "#FF6B00",
    fontWeight: "bold",
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 12,
    color: "#333",
  },
  deleteButton: {
    marginLeft: "auto",
    padding: 6,
  },
  itemTotal: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    textAlign: "right",
  },
  summary: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    margin: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    paddingTop: 12,
    marginTop: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
  },
  summaryValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6B00",
  },
  checkoutButton: {
    backgroundColor: "#4A90E2",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    margin: 16,
    borderRadius: 8,
  },
  checkoutButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  checkoutButtonPrice: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
