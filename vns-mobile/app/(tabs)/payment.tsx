// app/payment.tsx
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PaymentScreen() {
  // State quản lý UI
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Dữ liệu mẫu cố định cho UI
  const paymentInfo = {
    paymentMethod: "full" as const,
    paymentAmount: 12200000,
    totalPrice: 12200000,
    items: [
      {
        id: 1,
        name: "Tour Vịnh Hạ Long",
        location: "Quảng Ninh",
        price: 4500000,
        quantity: 2,
        image: require("@/assets/images/halong.jpg"),
      },
      {
        id: 2,
        name: "Tour Phong Nha - Kẻ Bàng",
        location: "Quảng Bình",
        price: 3200000,
        quantity: 1,
        image: require("@/assets/images/phongnha.jpg"),
      },
    ],
    customerInfo: {
      fullName: "Nguyễn Văn A",
      email: "nguyenvana@gmail.com",
      phone: "0987654321",
      address: "123 Đường ABC, Quận 1, TP.HCM",
      note: "Yêu cầu phòng đơn",
    },
  };

  // Xử lý thanh toán
  const handlePayment = () => {
    setIsProcessing(true);

    // Giả lập quá trình thanh toán (2 giây)
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccessModal(true);

      // Tự động đóng modal sau 3 giây và về trang home
      setTimeout(() => {
        setShowSuccessModal(false);
        router.replace("/(tabs)/home");
      }, 3000);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#4A90E2" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thanh Toán</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Nội dung chính */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Thông tin khách hàng */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="person-outline" size={20} color="#4A90E2" />
            <Text style={styles.sectionTitle}>Thông tin khách hàng</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Họ và tên:</Text>
            <Text style={styles.infoValue}>
              {paymentInfo.customerInfo.fullName}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>
              {paymentInfo.customerInfo.email}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Số điện thoại:</Text>
            <Text style={styles.infoValue}>
              {paymentInfo.customerInfo.phone}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Địa chỉ:</Text>
            <Text style={styles.infoValue}>
              {paymentInfo.customerInfo.address}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Ghi chú:</Text>
            <Text style={styles.infoValue}>
              {paymentInfo.customerInfo.note}
            </Text>
          </View>
        </View>

        {/* Thông tin đơn hàng */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="shopping-cart" size={20} color="#4A90E2" />
            <Text style={styles.sectionTitle}>Thông tin đơn hàng</Text>
          </View>

          {paymentInfo.items.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <Image source={item.image} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemLocation}>
                  <MaterialIcons name="location-on" size={12} color="#666" />
                  {item.location}
                </Text>
                <View style={styles.priceRow}>
                  <Text style={styles.itemPrice}>
                    {item.price.toLocaleString()} VND × {item.quantity}
                  </Text>
                  <Text style={styles.itemTotal}>
                    {(item.price * item.quantity).toLocaleString()} VND
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Thông tin thanh toán */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="payment" size={20} color="#4A90E2" />
            <Text style={styles.sectionTitle}>Thông tin thanh toán</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phương thức:</Text>
            <Text style={[styles.infoValue, styles.methodText]}>
              Thanh toán toàn bộ
            </Text>
          </View>

          <View style={[styles.infoRow, styles.totalRow]}>
            <Text style={[styles.infoLabel, styles.totalLabel]}>
              Tổng thanh toán:
            </Text>
            <Text style={[styles.infoValue, styles.totalValue]}>
              {paymentInfo.totalPrice.toLocaleString()} VND
            </Text>
          </View>
        </View>

        {/* Phương thức thanh toán */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="credit-card" size={20} color="#4A90E2" />
            <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
          </View>
          <View style={styles.paymentMethod}>
            <Image
              source={require("@/assets/images/zalopay.png")}
              style={styles.zalopayLogo}
            />
            <Text style={styles.paymentMethodText}>ZaloPay</Text>
          </View>
        </View>
      </ScrollView>

      {/* Nút thanh toán */}
      <View style={styles.paymentFooter}>
        <TouchableOpacity
          style={[styles.payButton, isProcessing && styles.disabledButton]}
          onPress={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <>
              <Text style={styles.payButtonText}>THANH TOÁN ZALOPAY</Text>
              <Text style={styles.payButtonAmount}>
                {paymentInfo.paymentAmount.toLocaleString()} VND
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Modal thông báo thành công */}
      <Modal
        visible={showSuccessModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => {
          setShowSuccessModal(false);
          router.replace("/(tabs)/home");
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <FontAwesome name="check-circle" size={60} color="#4CAF50" />
            <Text style={styles.modalTitle}>Thanh toán thành công!</Text>
            <Text style={styles.modalText}>
              Bạn đã thanh toán thành công{" "}
              {paymentInfo.paymentAmount.toLocaleString()} VND qua ZaloPay.
              Thông tin xác nhận đã được gửi đến email{" "}
              {paymentInfo.customerInfo.email}.
            </Text>
          </View>
        </View>
      </Modal>
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
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
  },
  infoValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  methodText: {
    color: "#4A90E2",
    fontWeight: "600",
  },
  totalRow: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  totalLabel: {
    fontWeight: "bold",
    fontSize: 15,
  },
  totalValue: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#FF6B00",
  },
  orderItem: {
    flexDirection: "row",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  itemLocation: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemPrice: {
    fontSize: 13,
    color: "#666",
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF6B00",
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
  },
  zalopayLogo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  paymentMethodText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  paymentFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  payButton: {
    backgroundColor: "#4A90E2",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: "#AAA",
  },
  payButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  payButtonAmount: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 24,
    width: "90%",
    maxWidth: 400,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginVertical: 12,
  },
  modalText: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
});
