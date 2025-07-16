import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ChangePasswordScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const otpInputRef = useRef<TextInput>(null);
  const newPasswordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  // Countdown timer for OTP resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const validatePhoneNumber = (phone: string) => {
    return phone.length >= 10 && phone.length <= 11;
  };

  const handleSendOtp = () => {
    if (!phoneNumber) {
      Alert.alert("Lỗi", "Vui lòng nhập số điện thoại");
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert("Lỗi", "Số điện thoại phải có 10-11 số");
      return;
    }

    // Simulate sending OTP
    Keyboard.dismiss();
    setIsOtpSent(true);
    setCountdown(60); // 60 seconds countdown
    Alert.alert("Thành công", "Mã OTP đã được gửi đến số điện thoại của bạn");
    otpInputRef.current?.focus();
  };

  const handleResendOtp = () => {
    if (countdown > 0) return;
    handleSendOtp();
  };

  const handleSubmit = () => {
    if (!otp || !newPassword || !confirmPassword) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu mới không khớp");
      return;
    }

    if (newPassword.length !== 6 || !/^\d+$/.test(newPassword)) {
      Alert.alert("Lỗi", "Mật khẩu phải gồm 6 chữ số");
      return;
    }

    // Simulate password change
    Alert.alert("Thành công", "Đổi mật khẩu thành công!", [
      {
        text: "OK",
        onPress: () => router.replace("/(tabs)/profile"),
      },
    ]);
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace("/(tabs)/profile")}>
          <MaterialIcons name="arrow-back" size={24} color="#4A90E2" />
        </TouchableOpacity>
        <Text style={styles.title}>Đổi mật khẩu</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.formContainer}>
        {/* Phone Number Input */}
        <Text style={styles.label}>Số điện thoại</Text>
        <View style={styles.phoneInputContainer}>
          <TextInput
            style={[styles.input, styles.phoneInput]}
            placeholder="Nhập số điện thoại (10-11 số)"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            editable={!isOtpSent}
            maxLength={11}
          />
          <TouchableOpacity
            style={styles.sendOtpButton}
            onPress={isOtpSent ? handleResendOtp : handleSendOtp}
            disabled={countdown > 0}
          >
            <Text style={styles.sendOtpText}>
              {isOtpSent
                ? countdown > 0
                  ? `Gửi lại (${countdown}s)`
                  : "Gửi lại"
                : "Gửi OTP"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* OTP Input */}
        {isOtpSent && (
          <>
            <Text style={styles.label}>Mã OTP</Text>
            <TextInput
              ref={otpInputRef}
              style={styles.input}
              placeholder="Nhập mã OTP"
              keyboardType="number-pad"
              value={otp}
              onChangeText={setOtp}
              onSubmitEditing={() => newPasswordRef.current?.focus()}
              maxLength={6}
            />
          </>
        )}

        {/* New Password */}
        <Text style={styles.label}>Mật khẩu mới (6 số)</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            ref={newPasswordRef}
            style={[styles.input, styles.passwordInput]}
            placeholder="Nhập mật khẩu mới"
            secureTextEntry={!showPassword}
            keyboardType="number-pad"
            value={newPassword}
            onChangeText={setNewPassword}
            onSubmitEditing={() => confirmPasswordRef.current?.focus()}
            maxLength={6}
          />
          <TouchableOpacity style={styles.eyeIcon} onPress={toggleShowPassword}>
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password */}
        <Text style={styles.label}>Xác nhận mật khẩu</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            ref={confirmPasswordRef}
            style={[styles.input, styles.passwordInput]}
            placeholder="Nhập lại mật khẩu mới"
            secureTextEntry={!showConfirmPassword}
            keyboardType="number-pad"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onSubmitEditing={handleSubmit}
            maxLength={6}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={toggleShowConfirmPassword}
          >
            <Ionicons
              name={showConfirmPassword ? "eye-off" : "eye"}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, { opacity: isOtpSent ? 1 : 0.5 }]}
          onPress={handleSubmit}
          disabled={!isOtpSent}
        >
          <Text style={styles.submitButtonText}>Đổi mật khẩu</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  phoneInput: {
    flex: 1,
    marginRight: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
    paddingRight: 40, // Space for eye icon
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    padding: 10,
  },
  sendOtpButton: {
    backgroundColor: "#4A90E2",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 100,
  },
  sendOtpText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  submitButton: {
    backgroundColor: "#4A90E2",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ChangePasswordScreen;
