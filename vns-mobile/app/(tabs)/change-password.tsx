import { Feather, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ChangePasswordScreen = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordChange = (text: string, type: string) => {
    // Chỉ cho phép nhập số và giới hạn 6 ký tự
    const numericText = text.replace(/[^0-9]/g, "");
    const trimmedText = numericText.slice(0, 6);

    switch (type) {
      case "current":
        setCurrentPassword(trimmedText);
        break;
      case "new":
        setNewPassword(trimmedText);
        break;
      case "confirm":
        setConfirmPassword(trimmedText);
        break;
    }

    // Xóa thông báo lỗi khi người dùng thay đổi input
    setErrorMessage("");
  };

  const handleSubmit = () => {
    // Reset error message
    setErrorMessage("");

    // Validate các trường bắt buộc
    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin");
      return;
    }

    // Validate độ dài mật khẩu
    if (
      currentPassword.length < 6 ||
      newPassword.length < 6 ||
      confirmPassword.length < 6
    ) {
      setErrorMessage("Mật khẩu phải có đủ 6 số");
      return;
    }

    // Validate mật khẩu mới không được giống mật khẩu cũ
    if (newPassword === currentPassword) {
      setErrorMessage("Mật khẩu mới không được giống mật khẩu cũ");
      return;
    }

    // Validate mật khẩu mới và xác nhận mật khẩu phải khớp
    if (newPassword !== confirmPassword) {
      setErrorMessage("Mật khẩu mới không khớp");
      return;
    }

    setIsLoading(true);

    // Giả lập gửi yêu cầu đổi mật khẩu
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        "Thành công",
        "Mật khẩu của bạn đã được thay đổi thành công",
        [
          {
            text: "OK",
            onPress: () => router.replace("/profile"), // Thay đổi từ router.back() thành router.replace("/profile")
          },
        ]
      );
    }, 1500);
  };

  const handleBackPress = () => {
    router.replace("/security-settings"); // Thay đổi từ router.back() thành router.replace("/security-settings")
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleBackPress} // Thay đổi từ router.back() thành handleBackPress
            style={styles.backButton}
          >
            <MaterialIcons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Đổi mật khẩu</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          {/* Current Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Mật khẩu hiện tại</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Nhập 6 số mật khẩu hiện tại"
                placeholderTextColor="#999"
                secureTextEntry={!showCurrentPassword}
                value={currentPassword}
                onChangeText={(text) => handlePasswordChange(text, "current")}
                keyboardType="numeric"
                maxLength={6}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                style={styles.eyeIcon}
              >
                <Feather
                  name={showCurrentPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#757575"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* New Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Mật khẩu mới</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Nhập 6 số mật khẩu mới"
                placeholderTextColor="#999"
                secureTextEntry={!showNewPassword}
                value={newPassword}
                onChangeText={(text) => handlePasswordChange(text, "new")}
                keyboardType="numeric"
                maxLength={6}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                onPress={() => setShowNewPassword(!showNewPassword)}
                style={styles.eyeIcon}
              >
                <Feather
                  name={showNewPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#757575"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Xác nhận mật khẩu mới</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Nhập lại 6 số mật khẩu mới"
                placeholderTextColor="#999"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={(text) => handlePasswordChange(text, "confirm")}
                keyboardType="numeric"
                maxLength={6}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeIcon}
              >
                <Feather
                  name={showConfirmPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#757575"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Hiển thị thông báo lỗi hoặc hướng dẫn */}
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : (
            <Text style={styles.noteText}>Mật khẩu phải là 6 chữ số (0-9)</Text>
          )}

          {/* Nút đổi mật khẩu */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              isLoading && styles.disabledButton,
              (!currentPassword || !newPassword || !confirmPassword) &&
                styles.disabledButton,
            ]}
            onPress={handleSubmit}
            disabled={
              isLoading || !currentPassword || !newPassword || !confirmPassword
            }
          >
            {isLoading ? (
              <Text style={styles.submitButtonText}>Đang xử lý...</Text>
            ) : (
              <Text style={styles.submitButtonText}>Đổi mật khẩu</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
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
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  formContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
    fontWeight: "500",
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#FAFAFA",
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    color: "#333",
  },
  eyeIcon: {
    padding: 8,
  },
  noteText: {
    fontSize: 12,
    color: "#757575",
    marginTop: 8,
    marginBottom: 20,
    textAlign: "center",
  },
  errorText: {
    fontSize: 14,
    color: "#FF5722",
    marginTop: 8,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "500",
  },
  submitButton: {
    backgroundColor: "#FF5722",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF5722",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: "#E0E0E0",
    shadowColor: "#BDBDBD",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ChangePasswordScreen;
