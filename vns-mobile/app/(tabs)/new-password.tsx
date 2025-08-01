// app/(tabs)/new-password.tsx
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function NewPasswordScreen() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Hàm xử lý nhập mật khẩu (chỉ cho phép số và giới hạn 6 ký tự)
  const handlePasswordChange = (
    text: string,
    field: "password" | "confirm"
  ) => {
    // Chỉ cho phép nhập số
    const numericText = text.replace(/[^0-9]/g, "");
    // Giới hạn 6 ký tự
    const limitedText = numericText.slice(0, 6);

    if (field === "password") {
      setPassword(limitedText);
      setPasswordError("");
    } else {
      setConfirmPassword(limitedText);
      setConfirmError("");
    }
  };

  const handleSubmit = () => {
    let isValid = true;

    if (!password) {
      setPasswordError("Vui lòng nhập mật khẩu mới");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Mật khẩu phải đủ 6 số");
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmError("Vui lòng xác nhận mật khẩu");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmError("Mật khẩu không khớp");
      isValid = false;
    }

    if (isValid) {
      Alert.alert("Thành công", "Mật khẩu đã được thay đổi", [
        {
          text: "OK",
          onPress: () => router.replace("/signin"),
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logo.jpg")}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.header}>
        <Text style={styles.title}>Tạo mật khẩu mới</Text>
        <Text style={styles.subtitle}>
          Vui lòng nhập mật khẩu mới gồm 6 chữ số
        </Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Mật khẩu mới</Text>
        <View
          style={[
            styles.inputContainer,
            passwordError ? styles.errorInput : null,
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="Nhập 6 số mật khẩu"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => handlePasswordChange(text, "password")}
            keyboardType="numeric"
            maxLength={6}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <MaterialIcons
              name={showPassword ? "visibility-off" : "visibility"}
              size={22}
              color="#666"
            />
          </TouchableOpacity>
        </View>
        {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Xác nhận mật khẩu</Text>
        <View
          style={[
            styles.inputContainer,
            confirmError ? styles.errorInput : null,
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="Nhập lại 6 số mật khẩu"
            placeholderTextColor="#999"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={(text) => handlePasswordChange(text, "confirm")}
            keyboardType="numeric"
            maxLength={6}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <MaterialIcons
              name={showConfirmPassword ? "visibility-off" : "visibility"}
              size={22}
              color="#666"
            />
          </TouchableOpacity>
        </View>
        {confirmError && <Text style={styles.errorText}>{confirmError}</Text>}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Đặt lại mật khẩu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  logo: {
    width: 150,
    height: 80,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e2e2",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: "#333",
  },
  eyeIcon: {
    padding: 8,
  },
  errorInput: {
    borderColor: "#ff4d4f",
  },
  errorText: {
    color: "#ff4d4f",
    fontSize: 12,
    marginTop: 4,
    paddingLeft: 4,
  },
  button: {
    backgroundColor: "#4A90E2",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
