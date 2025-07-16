import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const EWalletScreen = () => {
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("zalo");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const paymentMethods = [
    {
      id: "zalo",
      name: "ZaloPay",
      icon: require("@/assets/images/zalopay.png"),
    },
  ];

  const presetAmounts = [
    { value: 50000, label: "50,000 VND" },
    { value: 100000, label: "100,000 VND" },
    { value: 200000, label: "200,000 VND" },
    { value: 500000, label: "500,000 VND" },
    { value: 1000000, label: "1,000,000 VND" },
  ];

  const handleTopUp = () => {
    // Kiểm tra dữ liệu đầu vào
    if (!amount || !phoneNumber) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    // Kiểm tra số tiền hợp lệ
    const amountNumber = parseInt(amount.replace(/\D/g, ""));
    if (isNaN(amountNumber)) {
      Alert.alert("Lỗi", "Số tiền không hợp lệ");
      return;
    }

    // Kiểm tra số điện thoại hợp lệ
    const cleanedPhone = phoneNumber.replace(/\D/g, "");
    if (cleanedPhone.length < 10 || cleanedPhone.length > 11) {
      Alert.alert("Lỗi", "Số điện thoại phải từ 10-11 số");
      return;
    }

    // Hiển thị thông báo thành công
    setShowSuccessModal(true);

    // Log dữ liệu
    console.log(
      JSON.stringify(
        {
          amount: amountNumber,
          paymentMethod: selectedMethod,
          phoneNumber: cleanedPhone,
        },
        null,
        2
      )
    );

    // Tự động tắt thông báo sau 3 giây
    setTimeout(() => {
      setShowSuccessModal(false);
      router.replace("/profile");
    }, 3000);
  };

  const handleBackToProfile = () => {
    router.replace("/profile");
  };

  const handleAmountChange = (text: string) => {
    const cleanedText = text.replace(/\D/g, "");
    setAmount(cleanedText);
  };

  const handlePhoneChange = (text: string) => {
    const cleanedText = text.replace(/\D/g, "");
    setPhoneNumber(cleanedText);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackToProfile}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Nạp tiền vào ví</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Số dư hiện tại</Text>
        <Text style={styles.balanceAmount}>4,590,000 VND</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Chọn số tiền</Text>
        <View style={styles.amountGrid}>
          {presetAmounts.map((item) => (
            <TouchableOpacity
              key={item.value}
              style={[
                styles.amountButton,
                amount === item.value.toString() && styles.selectedAmountButton,
              ]}
              onPress={() => setAmount(item.value.toString())}
            >
              <Text
                style={[
                  styles.amountText,
                  amount === item.value.toString() && styles.selectedAmountText,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Hoặc nhập số tiền khác</Text>
        <View style={styles.customAmountContainer}>
          <TextInput
            style={styles.input}
            value={amount ? parseInt(amount).toLocaleString() : ""}
            onChangeText={handleAmountChange}
            placeholder="Nhập số tiền"
            keyboardType="numeric"
            returnKeyType="done"
          />
          <Text style={styles.currencyText}>VND</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={styles.methodButton}
            onPress={() => setSelectedMethod(method.id)}
          >
            <Image source={method.icon} style={styles.methodIcon} />
            <Text style={styles.methodText}>{method.name}</Text>
            <MaterialIcons
              name="check-circle"
              size={24}
              color="#4A90E2"
              style={styles.checkIcon}
            />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nhập số điện thoại ZaloPay</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={handlePhoneChange}
          placeholder="Nhập số điện thoại đăng ký ZaloPay"
          keyboardType="phone-pad"
          maxLength={11}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.topUpButton,
          (!amount || !phoneNumber) && styles.disabledButton,
        ]}
        onPress={handleTopUp}
        disabled={!amount || !phoneNumber}
      >
        <Text style={styles.topUpButtonText}>Xác nhận nạp tiền</Text>
      </TouchableOpacity>

      <Modal visible={showSuccessModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <MaterialIcons name="check-circle" size={60} color="#4CAF50" />
            <Text style={styles.modalTitle}>Thành công!</Text>
            <Text style={styles.modalText}>
              Bạn đã nạp {parseInt(amount).toLocaleString()} VND vào ví thành
              công
            </Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    flex: 1,
  },
  balanceContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  balanceLabel: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4A90E2",
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  amountGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  amountButton: {
    width: "48%",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: "center",
  },
  selectedAmountButton: {
    backgroundColor: "#E8F0FE",
    borderWidth: 1.5,
    borderColor: "#4A90E2",
  },
  amountText: {
    fontSize: 16,
    color: "#333",
  },
  selectedAmountText: {
    color: "#4A90E2",
    fontWeight: "bold",
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  customAmountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginRight: 8,
  },
  currencyText: {
    fontSize: 16,
    color: "#666",
    width: 50,
  },
  methodButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
  },
  methodIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  methodText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    fontWeight: "500",
  },
  checkIcon: {
    marginLeft: 10,
  },
  topUpButton: {
    backgroundColor: "#4A90E2",
    borderRadius: 12,
    padding: 18,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledButton: {
    backgroundColor: "#ccc",
    shadowColor: "transparent",
  },
  topUpButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4CAF50",
    marginVertical: 16,
  },
  modalText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 16,
  },
});

export default EWalletScreen;
