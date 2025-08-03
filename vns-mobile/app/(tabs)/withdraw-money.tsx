import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Animated,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const WithdrawMoneyScreen = () => {
  const [amount, setAmount] = useState("");
  const [walletType] = useState("ZaloPay");
  const [userName] = useState("Nguyễn Văn A");
  const availableBalance = 4590000; // Số dư khả dụng
  const buttonScale = new Animated.Value(1);

  const handleWithdraw = () => {
    // Hiệu ứng nhấn nút
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    if (!amount) {
      showErrorAlert("Vui lòng nhập số tiền muốn rút");
      return;
    }

    const amountNumber = parseFloat(amount.replace(/,/g, ""));
    if (isNaN(amountNumber) || amountNumber <= 0) {
      showErrorAlert("Số tiền không hợp lệ");
      return;
    }

    if (amountNumber < 50000) {
      showErrorAlert("Số tiền tối thiểu là 50,000 VND");
      return;
    }

    if (amountNumber > availableBalance) {
      showErrorAlert(
        "Số tiền vượt quá số dư khả dụng",
        `Số dư hiện có: ${formatCurrency(availableBalance)} VND`
      );
      return;
    }

    // Hiển thị thông báo thành công
    showSuccessAlert(
      "Yêu cầu rút tiền thành công",
      `Bạn đã yêu cầu rút ${formatCurrency(
        amountNumber
      )} VND tới ví ZaloPay. Thời gian xử lý: 15-30 phút.`
    );
  };

  const showSuccessAlert = (title: string, message: string) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: "Đóng",
          onPress: () => router.replace("/profile"),
          style: "default",
        },
      ],
      {
        cancelable: false,
      }
    );
  };

  const showErrorAlert = (title: string, message?: string) => {
    Alert.alert(
      "Lỗi",
      message ? `${title}\n${message}` : title,
      [{ text: "Đã hiểu", style: "cancel" }],
      { cancelable: true }
    );
  };

  const formatCurrency = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleAmountChange = (text: string) => {
    const cleanedText = text.replace(/[^0-9]/g, "");
    setAmount(cleanedText);
  };

  const formattedAmount = amount ? formatCurrency(parseFloat(amount)) : "";

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.replace("/profile")}>
            <MaterialIcons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Rút tiền</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Current Balance */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Số dư khả dụng</Text>
          <Text style={styles.balanceAmount}>
            {formatCurrency(availableBalance)} VND
          </Text>
        </View>

        {/* User Info */}
        <View style={styles.userCard}>
          <View style={styles.userInfo}>
            <MaterialIcons name="person" size={20} color="#0066cc" />
            <Text style={styles.userInfoText}>Người nhận: {userName}</Text>
          </View>
        </View>

        {/* Wallet Info */}
        <View style={styles.walletCard}>
          <Text style={styles.sectionTitle}>Ví điện tử</Text>

          <View style={styles.walletInfo}>
            <Image
              source={require("@/assets/images/zalopay.png")}
              style={styles.walletImage}
            />
            <View>
              <Text style={styles.walletName}>ZaloPay</Text>
              <Text style={styles.walletSubtext}>
                Liên kết với số điện thoại của bạn
              </Text>
            </View>
          </View>
        </View>

        {/* Amount Input */}
        <View style={styles.amountCard}>
          <Text style={styles.sectionTitle}>Số tiền rút (VND)</Text>

          <View style={styles.amountInputContainer}>
            <Text style={styles.currencySymbol}>₫</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="0"
              keyboardType="numeric"
              value={formattedAmount}
              onChangeText={handleAmountChange}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.amountSuggestions}>
            <TouchableOpacity
              style={styles.suggestionButton}
              onPress={() => setAmount("500000")}
            >
              <Text style={styles.suggestionText}>500,000</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.suggestionButton}
              onPress={() => setAmount("1000000")}
            >
              <Text style={styles.suggestionText}>1,000,000</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.suggestionButton}
              onPress={() => setAmount("2000000")}
            >
              <Text style={styles.suggestionText}>2,000,000</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Withdraw Button */}
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={[styles.withdrawButton, !amount && styles.disabledButton]}
            onPress={handleWithdraw}
            disabled={!amount}
            activeOpacity={0.8}
          >
            <Text style={styles.withdrawButtonText}>Rút tiền ngay</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Notice */}
        <View style={styles.noticeCard}>
          <View style={styles.noticeHeader}>
            <MaterialIcons name="info" size={20} color="#FF9500" />
            <Text style={styles.noticeHeaderText}>Thông tin quan trọng</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.noticeItem}>
            <View style={styles.noticeBullet}>
              <Text style={styles.noticeBulletText}>•</Text>
            </View>
            <Text style={styles.noticeText}>
              Phí rút tiền: <Text style={styles.highlight}>1.5%</Text> (tối
              thiểu <Text style={styles.highlight}>10,000 VND</Text>)
            </Text>
          </View>
          <View style={styles.noticeItem}>
            <View style={styles.noticeBullet}>
              <Text style={styles.noticeBulletText}>•</Text>
            </View>
            <Text style={styles.noticeText}>
              Thời gian xử lý: <Text style={styles.highlight}>15-30 phút</Text>
            </Text>
          </View>
          <View style={styles.noticeItem}>
            <View style={styles.noticeBullet}>
              <Text style={styles.noticeBulletText}>•</Text>
            </View>
            <Text style={styles.noticeText}>
              Số tiền tối thiểu:{" "}
              <Text style={styles.highlight}>50,000 VND</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  balanceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    alignItems: "center",
  },
  balanceLabel: {
    fontSize: 16,
    color: "#6c757d",
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0066cc",
  },
  userCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userInfoText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 8,
  },
  walletCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  walletInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  walletImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  walletName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  walletSubtext: {
    fontSize: 14,
    color: "#6c757d",
    marginTop: 2,
  },
  amountCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#0066cc",
    paddingBottom: 8,
    marginBottom: 20,
  },
  currencySymbol: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    paddingVertical: 4,
  },
  amountSuggestions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  suggestionButton: {
    backgroundColor: "#e9ecef",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  suggestionText: {
    fontSize: 14,
    color: "#333",
  },
  withdrawButton: {
    backgroundColor: "#0066cc",
    borderRadius: 12,
    padding: 18,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
    shadowColor: "#0066cc",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
    shadowColor: "#999",
  },
  withdrawButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  noticeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#FFE0B2",
  },
  noticeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  noticeHeaderText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF9500",
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#FFE0B2",
    marginVertical: 8,
  },
  noticeItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  noticeBullet: {
    marginRight: 8,
    marginTop: 2,
  },
  noticeBulletText: {
    fontSize: 16,
    color: "#FF9500",
  },
  noticeText: {
    fontSize: 14,
    color: "#6c757d",
    flex: 1,
    lineHeight: 20,
  },
  highlight: {
    color: "#333",
    fontWeight: "600",
  },
});

export default WithdrawMoneyScreen;
