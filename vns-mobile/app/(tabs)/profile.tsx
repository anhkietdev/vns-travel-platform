import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ProfileScreen = () => {
  const [isFaceIdEnabled, setIsFaceIdEnabled] = React.useState(false);
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = React.useState(false);
  const [userEmail] = React.useState("user@example.com");

  const handleLogout = () => {
    router.replace("/signin");
  };

  const handleBackToHome = () => {
    router.replace("/(tabs)/home");
  };

  const handleEditProfile = () => {
    router.push("/edit-profile"); // Chuyển đến trang chỉnh sửa profile
  };

  const handleAddMoney = () => {
    router.push("/ewallet"); // Chuyển đến trang ví điện tử
  };

  const handleViewTourHistory = () => {
    router.push("/history-tour"); // Chuyển đến trang lịch sử tour
  };

  const handleChangePassword = () => {
    router.push("/changepassword"); // Chuyển đến trang đổi mật khẩu
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackToHome}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thông tin cá nhân</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* User Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileContainer}>
          <Image
            source={require("@/assets/images/user.jpg")}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Người dùng</Text>
            <Text style={styles.profileEmail}>{userEmail}</Text>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditProfile}
          >
            <MaterialIcons name="edit" size={20} color="#4A90E2" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Wallet Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ví của tôi</Text>
        <View style={styles.walletContainer}>
          <Text style={styles.walletAmount}>4,590,000 VND</Text>
          <TouchableOpacity
            style={styles.addMoneyButton}
            onPress={handleAddMoney}
          >
            <Text style={styles.addMoneyText}>Nạp thêm tiền</Text>
            <FontAwesome name="plus" size={14} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tour History */}
      <TouchableOpacity style={styles.section} onPress={handleViewTourHistory}>
        <Text style={styles.sectionTitle}>Tour đã đặt</Text>
        <View style={styles.row}>
          <Text style={styles.sectionSubtitle}>Xem các tour bạn đã đặt</Text>
          <MaterialIcons name="chevron-right" size={24} color="#999" />
        </View>
      </TouchableOpacity>

      {/* Security Sections */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bảo mật</Text>

        {/* Change Password */}
        <TouchableOpacity
          style={styles.securityItem}
          onPress={handleChangePassword}
        >
          <View style={styles.row}>
            <Feather name="lock" size={20} color="#333" />
            <Text style={styles.securityText}>Đổi mật khẩu</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <TouchableOpacity
        style={[styles.section, styles.logoutSection]}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>

      {/* More Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hỗ Trợ Và Chăm Sóc</Text>

        <TouchableOpacity style={styles.moreItem}>
          <Text style={styles.moreText}>Trợ giúp & Hỗ trợ</Text>
          <MaterialIcons name="chevron-right" size={24} color="#999" />
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.moreItem}>
          <Text style={styles.moreText}>Về ứng dụng</Text>
          <MaterialIcons name="chevron-right" size={24} color="#999" />
        </TouchableOpacity> */}
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
    padding: 16,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  profileSection: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: "#666",
  },
  editButton: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "#E8F0FE",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  walletContainer: {
    padding: 16,
    backgroundColor: "#f0f8ff",
    borderRadius: 8,
    alignItems: "center",
  },
  walletAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0066cc",
    marginBottom: 12,
  },
  addMoneyButton: {
    flexDirection: "row",
    backgroundColor: "#4A90E2",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  addMoneyText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
    marginRight: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  securityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  securityText: {
    fontSize: 16,
    marginLeft: 12,
    color: "#333",
  },
  logoutSection: {
    backgroundColor: "#fff0f0",
  },
  logoutText: {
    color: "#ff4444",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  moreItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  moreText: {
    fontSize: 16,
    color: "#333",
  },
});

export default ProfileScreen;
