import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SecuritySettingsScreen = () => {
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);
  const [isScanning, setIsScanning] = useState(false);

  const [currency, setCurrency] = useState("VND");
  const [country, setCountry] = useState("Việt Nam");
  const [language, setLanguage] = useState("Tiếng Việt");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");
    })();
  }, []);

  const handleChangePassword = () => {
    router.push("/change-password");
  };

  const handleBiometricToggle = async () => {
    if (!isBiometricEnabled) {
      if (hasCameraPermission === false) {
        Alert.alert(
          "Lỗi",
          "Ứng dụng cần quyền truy cập camera để sử dụng tính năng này"
        );
        return;
      }
      setIsScanning(true);
      // Trong thực tế, bạn sẽ thực hiện quét khuôn mặt ở đây
      // Đây chỉ là mô phỏng sau 2 giây
      setTimeout(() => {
        setIsScanning(false);
        setIsBiometricEnabled(true);
        Alert.alert("Thành công", "Đã thiết lập xác thực khuôn mặt thành công");
      }, 2000);
    } else {
      setIsBiometricEnabled(false);
    }
  };

  const handleChangeCurrency = () => {
    Alert.alert("Chọn tiền tệ", "Vui lòng chọn loại tiền tệ bạn muốn sử dụng", [
      { text: "VND", onPress: () => setCurrency("VND") },
      { text: "USD", onPress: () => setCurrency("USD") },
      { text: "EUR", onPress: () => setCurrency("EUR") },
      { text: "Hủy", style: "cancel" },
    ]);
  };

  const handleChangeCountry = () => {
    Alert.alert("Chọn quốc gia", "Vui lòng chọn quốc gia của bạn", [
      { text: "Việt Nam", onPress: () => setCountry("Việt Nam") },
      { text: "USA", onPress: () => setCountry("USA") },
      { text: "UK", onPress: () => setCountry("UK") },
      { text: "Hủy", style: "cancel" },
    ]);
  };

  const handleChangeLanguage = () => {
    Alert.alert("Chọn ngôn ngữ", "Vui lòng chọn ngôn ngữ bạn muốn sử dụng", [
      { text: "Tiếng Việt", onPress: () => setLanguage("Tiếng Việt") },
      { text: "English", onPress: () => setLanguage("English") },
      { text: "中文", onPress: () => setLanguage("中文") },
      { text: "Hủy", style: "cancel" },
    ]);
  };

  const handleBackPress = () => {
    router.replace("/profile"); // Thay đổi từ router.back() thành router.replace("/profile")
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cài đặt & Bảo mật</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Bảo mật */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bảo mật</Text>

        {/* Đổi mật khẩu */}
        <TouchableOpacity
          style={styles.settingItem}
          onPress={handleChangePassword}
        >
          <View style={styles.itemLeft}>
            <View style={styles.iconContainer}>
              <Feather name="lock" size={20} color="#FF7043" />
            </View>
            <View>
              <Text style={styles.itemTitle}>Đổi mật khẩu</Text>
              <Text style={styles.itemSubtitle}>Cập nhật mật khẩu mới</Text>
            </View>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>

        {/* Xác thực sinh trắc học */}
        <View style={styles.settingItem}>
          <View style={styles.itemLeft}>
            <View style={styles.iconContainer}>
              <Feather name="user" size={20} color="#4CAF50" />
            </View>
            <View>
              <Text style={styles.itemTitle}>Xác thực khuôn mặt</Text>
              <Text style={styles.itemSubtitle}>
                {isBiometricEnabled ? "Đã bật" : "Chưa bật"}
              </Text>
            </View>
          </View>
          {isScanning ? (
            <View style={styles.scanningIndicator}>
              <Text style={styles.scanningText}>Đang quét...</Text>
            </View>
          ) : (
            <Switch
              value={isBiometricEnabled}
              onValueChange={handleBiometricToggle}
              trackColor={{ false: "#E0E0E0", true: "#C8E6C9" }}
              thumbColor={isBiometricEnabled ? "#4CAF50" : "#F5F5F5"}
            />
          )}
        </View>
      </View>

      {/* Cài đặt chung */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cài đặt chung</Text>

        {/* Tiền tệ */}
        <TouchableOpacity
          style={styles.settingItem}
          onPress={handleChangeCurrency}
        >
          <View style={styles.itemLeft}>
            <View style={styles.iconContainer}>
              <FontAwesome name="money" size={18} color="#FFC107" />
            </View>
            <View>
              <Text style={styles.itemTitle}>Tiền tệ</Text>
              <Text style={styles.itemSubtitle}>{currency}</Text>
            </View>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>

        {/* Quốc gia */}
        <TouchableOpacity
          style={styles.settingItem}
          onPress={handleChangeCountry}
        >
          <View style={styles.itemLeft}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="location-on" size={18} color="#2196F3" />
            </View>
            <View>
              <Text style={styles.itemTitle}>Quốc gia</Text>
              <Text style={styles.itemSubtitle}>{country}</Text>
            </View>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>

        {/* Ngôn ngữ */}
        <TouchableOpacity
          style={styles.settingItem}
          onPress={handleChangeLanguage}
        >
          <View style={styles.itemLeft}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="language" size={20} color="#9C27B0" />
            </View>
            <View>
              <Text style={styles.itemTitle}>Ngôn ngữ</Text>
              <Text style={styles.itemSubtitle}>{language}</Text>
            </View>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>

        {/* Chế độ tối */}
        <View style={styles.settingItem}>
          <View style={styles.itemLeft}>
            <View style={styles.iconContainer}>
              <Feather name="moon" size={18} color="#607D8B" />
            </View>
            <View>
              <Text style={styles.itemTitle}>Chế độ tối</Text>
              <Text style={styles.itemSubtitle}>
                {isDarkMode ? "Đã bật" : "Đã tắt"}
              </Text>
            </View>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={() => setIsDarkMode(!isDarkMode)}
            trackColor={{ false: "#E0E0E0", true: "#B0BEC5" }}
            thumbColor={isDarkMode ? "#607D8B" : "#F5F5F5"}
          />
        </View>
      </View>

      {/* Thông tin phiên bản */}
      <View style={styles.versionSection}>
        <Image
          source={require("@/assets/images/logo.jpg")}
          style={styles.logo}
        />
        <Text style={styles.versionText}>Phiên bản ứng dụng: 1.0.0</Text>
      </View>
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
    paddingHorizontal: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  section: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#757575",
    marginBottom: 16,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  itemTitle: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  itemSubtitle: {
    fontSize: 13,
    color: "#757575",
    marginTop: 2,
  },
  scanningIndicator: {
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  scanningText: {
    color: "#1976D2",
    fontSize: 12,
    fontWeight: "500",
  },
  versionSection: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  versionText: {
    fontSize: 13,
    color: "#9E9E9E",
  },
});

export default SecuritySettingsScreen;
