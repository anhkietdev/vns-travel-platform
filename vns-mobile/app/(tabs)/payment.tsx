// app/payment.tsx
import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type PaymentItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
};

export default function PaymentScreen() {
  const params = useLocalSearchParams();
  const [items, setItems] = useState<PaymentItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Load dữ liệu từ trang giỏ hàng
  useEffect(() => {
    if (params.items && params.total) {
      try {
        const parsedItems = JSON.parse(params.items as string);
        const paymentItems = parsedItems.map((item: any) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          total: item.price * item.quantity,
        }));
        setItems(paymentItems);
        setTotalAmount(Number(params.total));
      } catch (error) {
        console.error("Error parsing items:", error);
        Alert.alert("Lỗi", "Không thể tải thông tin đơn hàng");
        router.back();
      }
    } else {
      Alert.alert("Lỗi", "Không có thông tin đơn hàng");
      router.back();
    }
  }, []); // Empty dependency array to run only once

  // Xử lý thanh toán bằng ZaloPay
  const handleZaloPayPayment = async () => {
    if (!email || !phone) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ email và số điện thoại");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Lỗi", "Email không hợp lệ");
      return;
    }

    if (!validatePhone(phone)) {
      Alert.alert("Lỗi", "Số điện thoại không hợp lệ");
      return;
    }

    setIsProcessing(true);

    try {
      // Giả lập quá trình thanh toán ZaloPay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Giả lập gửi email xác nhận
      await sendConfirmationEmail(email, items, totalAmount);

      Alert.alert(
        "Thanh toán thành công",
        "Bạn đã thanh toán thành công bằng ZaloPay. Thông tin xác nhận đã được gửi đến email của bạn.",
        [
          {
            text: "OK",
            onPress: () => {
              router.replace({
                pathname: "/(tabs)/home",
                params: { paymentSuccess: "true" },
              });
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert("Lỗi", "Thanh toán thất bại. Vui lòng thử lại sau.");
      console.error("Payment error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Hàm giả lập gửi email xác nhận
  const sendConfirmationEmail = async (
    email: string,
    items: PaymentItem[],
    total: number
  ) => {
    console.log(`Gửi email xác nhận đến: ${email}`);
    console.log("Chi tiết đơn hàng:", items);
    console.log("Tổng tiền:", total);
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  // Validate email
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Validate phone number (10-11 số)
  const validatePhone = (phone: string) => {
    const re = /^[0-9]{10,11}$/;
    return re.test(phone);
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

      {/* Nội dung thanh toán */}
      <ScrollView style={styles.content}>
        {/* Thông tin đơn hàng */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin đơn hàng</Text>
          {items.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>
                {item.price.toLocaleString()} VND × {item.quantity} ={" "}
                {item.total.toLocaleString()} VND
              </Text>
            </View>
          ))}
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Tổng cộng:</Text>
            <Text style={styles.totalAmount}>
              {totalAmount.toLocaleString()} VND
            </Text>
          </View>
        </View>

        {/* Thông tin khách hàng */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin khách hàng</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email xác nhận</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập email của bạn"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Số điện thoại</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập số điện thoại"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              maxLength={11}
            />
          </View>
        </View>

        {/* Phương thức thanh toán */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>

          <TouchableOpacity style={styles.paymentMethod}>
            <Image
              source={require("@/assets/images/zalopay.png")}
              style={styles.paymentLogo}
            />
            <Text style={styles.paymentName}>ZaloPay</Text>
            <MaterialIcons
              name="radio-button-checked"
              size={24}
              color="#4A90E2"
              style={styles.paymentCheck}
            />
          </TouchableOpacity>
        </View>

        {/* Thông báo */}
        <View style={styles.notice}>
          <MaterialIcons name="info-outline" size={18} color="#666" />
          <Text style={styles.noticeText}>
            Thông tin xác nhận sẽ được gửi đến email của bạn sau khi thanh toán
            thành công
          </Text>
        </View>
      </ScrollView>

      {/* Nút thanh toán */}
      <TouchableOpacity
        style={[styles.payButton, isProcessing && styles.disabledButton]}
        onPress={handleZaloPayPayment}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <Text style={styles.payButtonText}>Đang xử lý...</Text>
        ) : (
          <>
            <Text style={styles.payButtonText}>THANH TOÁN VỚI ZALOPAY</Text>
            <Text style={styles.payButtonAmount}>
              {totalAmount.toLocaleString()} VND
            </Text>
          </>
        )}
      </TouchableOpacity>
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
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  orderItem: {
    marginBottom: 12,
  },
  itemName: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 13,
    color: "#666",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6B00",
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: "#333",
    borderWidth: 1,
    borderColor: "#DDD",
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
  },
  paymentLogo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  paymentName: {
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
    flex: 1,
  },
  paymentCheck: {
    marginLeft: "auto",
  },
  notice: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF8E1",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  noticeText: {
    fontSize: 13,
    color: "#666",
    marginLeft: 8,
    flex: 1,
  },
  payButton: {
    backgroundColor: "#4A90E2",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    margin: 16,
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
});
