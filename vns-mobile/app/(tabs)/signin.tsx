// app/(tabs)/signin.tsx
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Hàm xử lý nhập mật khẩu (chỉ cho phép số và giới hạn 6 ký tự)
  const handlePasswordChange = (text: string) => {
    // Chỉ cho phép nhập số
    const numericText = text.replace(/[^0-9]/g, "");
    // Giới hạn 6 ký tự
    const limitedText = numericText.slice(0, 6);
    setPassword(limitedText);
    setPasswordError("");
  };

  const handleLogin = () => {
    let isValid = true;

    if (!email) {
      setEmailError("Vui lòng nhập email");
      isValid = false;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError("Email không hợp lệ");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Vui lòng nhập mật khẩu");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Mật khẩu phải đủ 6 số");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      Alert.alert("Thành công", "Đăng nhập thành công!", [
        {
          text: "OK",
          onPress: () => router.replace("/(tabs)/home"), // Chuyển đến trang home
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Vietnam Travel Explorer ✦</Text>
      <Text style={styles.title}>Đăng nhập</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={[styles.input, emailError ? styles.errorInput : null]}
        placeholder="Nhập email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <Text style={styles.label}>Mật khẩu </Text>
      <TextInput
        style={[styles.input, passwordError ? styles.errorInput : null]}
        placeholder="••••••"
        secureTextEntry
        value={password}
        onChangeText={handlePasswordChange}
        keyboardType="numeric"
        maxLength={6}
      />
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}

      <TouchableOpacity onPress={() => router.push("/forgot-password")}>
        <Text style={styles.forgot}>Quên mật khẩu?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>

      <Text style={styles.bottomText}>
        Chưa có tài khoản?{" "}
        <Text
          style={{ fontWeight: "bold" }}
          onPress={() => router.push("/login")}
        >
          Đăng ký
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  logo: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
  label: { fontWeight: "600", marginBottom: 6, marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#e2e2e2",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 8,
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 12,
    paddingLeft: 4,
  },
  forgot: {
    alignSelf: "flex-end",
    marginTop: 6,
    marginBottom: 20,
    fontSize: 13,
    color: "#444",
  },
  button: {
    backgroundColor: "#f1f3f9",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { fontWeight: "bold", fontSize: 16 },
  bottomText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 13,
    color: "#333",
  },
});
