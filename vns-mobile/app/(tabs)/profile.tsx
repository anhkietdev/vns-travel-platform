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
  const [userEmail] = React.useState("user@example.com");

  const handleLogout = () => {
    router.replace("/signin");
  };

  const handleBackToHome = () => {
    router.replace("/(tabs)/home");
  };

  const handleEditProfile = () => {
    router.push("/edit-profile");
  };

  const handleLinkWallet = () => {
    router.push("/link-wallet");
  };

  const handleRateTours = () => {
    router.push("/rate-tours");
  };

  const handleSecuritySettings = () => {
    router.push("/security-settings");
  };

  const handleRefundRequests = () => {
    router.push("/refund-requests");
  };

  const handleWithdrawMoney = () => {
    router.push("/withdraw-money");
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
          <View style={styles.walletRow}>
            <Text style={styles.walletAmount}>4,590,000 VND</Text>
            <TouchableOpacity
              style={styles.withdrawButton}
              onPress={handleWithdrawMoney}
            >
              <Text style={styles.withdrawText}>Rút tiền</Text>
              <MaterialIcons
                name="account-balance-wallet"
                size={18}
                color="#FFF"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Linked Wallet */}
      <TouchableOpacity style={styles.section} onPress={handleLinkWallet}>
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <FontAwesome name="credit-card" size={20} color="#4A90E2" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.itemTitle}>Liên kết ví</Text>
            <Text style={styles.itemSubtitle}>
              Kết nối với ví điện tử của bạn
            </Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#999" />
        </View>
      </TouchableOpacity>

      {/* Rate Tours */}
      <TouchableOpacity style={styles.section} onPress={handleRateTours}>
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <FontAwesome name="star" size={20} color="#FFC107" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.itemTitle}>Đánh giá tour</Text>
            <Text style={styles.itemSubtitle}>Chia sẻ trải nghiệm của bạn</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#999" />
        </View>
      </TouchableOpacity>

      {/* Refund Requests */}
      <TouchableOpacity style={styles.section} onPress={handleRefundRequests}>
        <View style={styles.row}>
          <View style={styles.iconContainer}>
            <FontAwesome name="money" size={20} color="#4CAF50" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.itemTitle}>Đơn hoàn tiền</Text>
            <Text style={styles.itemSubtitle}>Theo dõi yêu cầu hoàn tiền</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#999" />
        </View>
      </TouchableOpacity>

      {/* Security Sections */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bảo mật</Text>

        {/* Security Settings */}
        <TouchableOpacity
          style={styles.securityItem}
          onPress={handleSecuritySettings}
        >
          <View style={styles.row}>
            <View style={styles.iconContainer}>
              <Feather name="lock" size={20} color="#333" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.itemTitle}>Cài đặt bảo mật</Text>
              <Text style={styles.itemSubtitle}>Bảo vệ tài khoản của bạn</Text>
            </View>
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
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
    borderWidth: 2,
    borderColor: "#4A90E2",
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  walletContainer: {
    padding: 16,
    backgroundColor: "#f0f8ff",
    borderRadius: 8,
  },
  walletRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  walletAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0066cc",
  },
  withdrawButton: {
    flexDirection: "row",
    backgroundColor: "#4CAF50",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  withdrawText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
    marginRight: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 13,
    color: "#999",
  },
  securityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  logoutSection: {
    backgroundColor: "#fff0f0",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  logoutText: {
    color: "#ff4444",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ProfileScreen;
