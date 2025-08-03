import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const LinkWalletScreen = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLinking, setIsLinking] = useState(false);

  const handleBackToProfile = () => {
    router.push("/profile"); // Sử dụng push thay vì replace để đảm bảo navigation stack
  };

  const handleLinkZaloPay = async () => {
    if (!fullName || !phoneNumber) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      Alert.alert("Lỗi", "Số điện thoại phải có 10 chữ số");
      return;
    }

    setIsLinking(true);

    try {
      const zaloPayUrl = "https://zalo.me/pay";
      const canOpen = await Linking.canOpenURL(zaloPayUrl);

      if (canOpen) {
        await Linking.openURL(zaloPayUrl);

        setTimeout(() => {
          setIsLinking(false);
          showSuccessAlert();
        }, 3000);
      } else {
        setIsLinking(false);
        Alert.alert("Lỗi", "Bạn cần cài đặt ứng dụng ZaloPay để liên kết", [
          { text: "Đóng", style: "cancel" },
          {
            text: "Tải ZaloPay",
            onPress: () => Linking.openURL("https://zalo.me/pay/download"),
          },
        ]);
      }
    } catch (error) {
      setIsLinking(false);
      Alert.alert("Lỗi", "Không thể mở ứng dụng ZaloPay");
    }
  };

  const showSuccessAlert = () => {
    Alert.alert("Thành công", "Liên kết ví ZaloPay thành công!", [
      {
        text: "Đóng",
        onPress: () => router.push("/profile"), // Sử dụng push ở đây để đảm bảo consistency
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackToProfile}>
            <MaterialIcons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Liên kết ví ZaloPay</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* ZaloPay Banner */}
        <View style={styles.bannerContainer}>
          <Image
            source={require("@/assets/images/zalopay.png")}
            style={styles.bannerImage}
            resizeMode="contain"
          />
          <Text style={styles.bannerText}>
            Kết nối với ZaloPay để rút tiền nhanh chóng và tiện lợi
          </Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Thông tin liên kết</Text>

          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Họ và tên</Text>
            <View style={styles.inputContainer}>
              <FontAwesome
                name="user"
                size={18}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Nhập họ và tên"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />
            </View>
          </View>

          {/* Phone Number */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Số điện thoại</Text>
            <View style={styles.inputContainer}>
              <FontAwesome
                name="phone"
                size={18}
                color="#666"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Nhập số điện thoại"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                maxLength={10}
              />
            </View>
            <Text style={styles.noteText}>
              Số điện thoại phải trùng với số đăng ký ZaloPay
            </Text>
          </View>
        </View>

        {/* Link Button */}
        <TouchableOpacity
          style={[
            styles.linkButton,
            (!fullName || !phoneNumber || isLinking) && styles.disabledButton,
          ]}
          onPress={handleLinkZaloPay}
          disabled={!fullName || !phoneNumber || isLinking}
        >
          {isLinking ? (
            <Text style={styles.linkButtonText}>Đang kết nối...</Text>
          ) : (
            <>
              <Text style={styles.linkButtonText}>Liên kết với ZaloPay</Text>
              <Image
                source={require("@/assets/images/zalopay.png")}
                style={styles.zaloPayIcon}
              />
            </>
          )}
        </TouchableOpacity>

        {/* Benefits */}
        <View style={styles.benefitsContainer}>
          <Text style={styles.benefitsTitle}>Lợi ích khi liên kết</Text>
          <View style={styles.benefitItem}>
            <MaterialIcons name="check-circle" size={18} color="#4CAF50" />
            <Text style={styles.benefitText}>Rút tiền nhanh trong 15 phút</Text>
          </View>
          <View style={styles.benefitItem}>
            <MaterialIcons name="check-circle" size={18} color="#4CAF50" />
            <Text style={styles.benefitText}>Phí rút tiền chỉ 1.5%</Text>
          </View>
          <View style={styles.benefitItem}>
            <MaterialIcons name="check-circle" size={18} color="#4CAF50" />
            <Text style={styles.benefitText}>Bảo mật tuyệt đối</Text>
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
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  bannerContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  bannerImage: {
    width: "100%",
    height: 120,
    marginBottom: 12,
  },
  bannerText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
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
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    height: "100%",
  },
  noteText: {
    fontSize: 12,
    color: "#999",
    marginTop: 5,
    fontStyle: "italic",
  },
  linkButton: {
    flexDirection: "row",
    backgroundColor: "#0066CC",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#0066CC",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: "#CCCCCC",
  },
  linkButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  zaloPayIcon: {
    width: 24,
    height: 24,
  },
  benefitsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  benefitText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
});

export default LinkWalletScreen;
