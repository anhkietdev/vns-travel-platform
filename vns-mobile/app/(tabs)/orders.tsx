import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const OrdersScreen = () => {
  // Dữ liệu mẫu
  const [activeTab, setActiveTab] = useState("pending"); // 'pending' hoặc 'cart'

  const orders = [
    {
      id: "1",
      title: "Tour Đà Lạt 3 ngày 2 đêm",
      date: "15/10/2023 - 17/10/2023",
      price: "4,500,000 VND",
      status: "pending",
      image: require("@/assets/images/dalat.jpg"),
    },
    {
      id: "2",
      title: "Tour Phú Quốc 4 ngày 3 đêm",
      date: "20/11/2023 - 23/11/2023",
      price: "6,200,000 VND",
      status: "pending",
      image: require("@/assets/images/phuquoc.jpg"),
    },
  ];

  const cartItems = [
    {
      id: "3",
      title: "Tour Hạ Long 2 ngày 1 đêm",
      price: "3,800,000 VND",
      image: require("@/assets/images/halong.jpg"),
    },
  ];

  const renderOrderItem = ({ item }: { item: any }) => (
    <View style={styles.orderCard}>
      <Image source={item.image} style={styles.orderImage} />
      <View style={styles.orderInfo}>
        <Text style={styles.orderTitle}>{item.title}</Text>
        {item.date && (
          <View style={styles.orderMeta}>
            <MaterialIcons name="date-range" size={16} color="#666" />
            <Text style={styles.orderText}>{item.date}</Text>
          </View>
        )}
        <Text style={styles.orderPrice}>{item.price}</Text>
        <View style={styles.orderActions}>
          {activeTab === "pending" && (
            <>
              <TouchableOpacity style={styles.payButton}>
                <Text style={styles.payButtonText}>Thanh toán ngay</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton}>
                <MaterialIcons name="delete" size={20} color="#F44336" />
              </TouchableOpacity>
            </>
          )}
          {activeTab === "cart" && (
            <TouchableOpacity style={styles.removeButton}>
              <Text style={styles.removeButtonText}>Xóa khỏi giỏ</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.navigate("/(tabs)/home")}>
          <MaterialIcons name="arrow-back" size={24} color="#4A90E2" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Đơn hàng của tôi</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "pending" && styles.activeTab]}
          onPress={() => setActiveTab("pending")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "pending" && styles.activeTabText,
            ]}
          >
            Chưa thanh toán
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "cart" && styles.activeTab]}
          onPress={() => setActiveTab("cart")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "cart" && styles.activeTabText,
            ]}
          >
            Giỏ hàng
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={activeTab === "pending" ? orders : cartItems}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialIcons name="remove-shopping-cart" size={48} color="#CCC" />
            <Text style={styles.emptyText}>
              {activeTab === "pending"
                ? "Không có đơn hàng chưa thanh toán"
                : "Giỏ hàng trống"}
            </Text>
          </View>
        }
      />

      {activeTab === "cart" && cartItems.length > 0 && (
        <View style={styles.checkoutContainer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Tổng cộng:</Text>
            <Text style={styles.totalPrice}>
              {cartItems
                .reduce((sum, item) => {
                  return sum + parseInt(item.price.replace(/\D/g, ""), 10);
                }, 0)
                .toLocaleString()}{" "}
              VND
            </Text>
          </View>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>Đặt tour ngay</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#4A90E2",
  },
  tabText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#4A90E2",
    fontWeight: "bold",
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  orderCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: "row",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderImage: {
    width: 120,
    height: 120,
    resizeMode: "cover",
  },
  orderInfo: {
    flex: 1,
    padding: 16,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  orderMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  orderText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6B00",
    marginBottom: 12,
  },
  orderActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  payButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  payButtonText: {
    color: "#FFF",
    fontWeight: "500",
  },
  cancelButton: {
    padding: 8,
  },
  removeButton: {
    backgroundColor: "#F44336",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  removeButtonText: {
    color: "#FFF",
    fontWeight: "500",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    marginTop: 16,
  },
  checkoutContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6B00",
  },
  checkoutButton: {
    backgroundColor: "#4A90E2",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OrdersScreen;
