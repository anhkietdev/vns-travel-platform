// app/(tabs)/register.tsx
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

export default function RegisterScreen() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = (
    text: string,
    field: "password" | "confirm"
  ) => {
    const numericText = text.replace(/[^0-9]/g, "");
    const limitedText = numericText.slice(0, 6);

    if (field === "password") {
      setPassword(limitedText);
      setPasswordError("");
    } else {
      setConfirmPassword(limitedText);
      setConfirmError("");
    }
  };

  const handleRegister = () => {
    let isValid = true;

    if (!password) {
      setPasswordError("Vui lòng nhập mật khẩu");
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
      Alert.alert("Thành công", "Tạo tài khoản thành công!", [
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
      <Text style={styles.title}>Tạo tài khoản</Text>

      <Text style={styles.label}>Họ và tên</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập họ tên"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>SĐT</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập số điện thoại"
        placeholderTextColor="#999"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Mật khẩu</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={[
            styles.passwordInput,
            passwordError ? styles.errorInput : null,
          ]}
          placeholder="••••••"
          placeholderTextColor="#999"
          value={password}
          onChangeText={(text) => handlePasswordChange(text, "password")}
          keyboardType="numeric"
          maxLength={6}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <MaterialIcons
            name={showPassword ? "visibility-off" : "visibility"}
            size={24}
            color="#666"
          />
        </TouchableOpacity>
      </View>
      {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

      <Text style={styles.label}>Xác nhận mật khẩu</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={[
            styles.passwordInput,
            confirmError ? styles.errorInput : null,
          ]}
          placeholder="••••••"
          placeholderTextColor="#999"
          value={confirmPassword}
          onChangeText={(text) => handlePasswordChange(text, "confirm")}
          keyboardType="numeric"
          maxLength={6}
          secureTextEntry={!showConfirmPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <MaterialIcons
            name={showConfirmPassword ? "visibility-off" : "visibility"}
            size={24}
            color="#666"
          />
        </TouchableOpacity>
      </View>
      {confirmError && <Text style={styles.errorText}>{confirmError}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Tạo Tài Khoản</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.bottomText}>Đã có tài khoản? </Text>
        <TouchableOpacity onPress={() => router.push("/signin")}>
          <Text style={styles.loginText}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },
  label: {
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e2e2e2",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 8,
    backgroundColor: "#f9f9f9",
    fontSize: 15,
    color: "#333",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e2e2",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    marginBottom: 8,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#333",
  },
  eyeIcon: {
    padding: 10,
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#4A90E2",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 25,
    elevation: 2,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  bottomText: {
    fontSize: 14,
    color: "#666",
  },
  loginText: {
    fontSize: 14,
    color: "#4A90E2",
    fontWeight: "bold",
  },
});
