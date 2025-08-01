// app/(tabs)/signin.tsx
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

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, "");
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
          onPress: () => router.replace("/(tabs)/home"),
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
      <Text style={styles.title}>Đăng nhập</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={[styles.input, emailError ? styles.errorInput : null]}
        placeholder="Nhập email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError && <Text style={styles.errorText}>{emailError}</Text>}

      <Text style={styles.label}>Mật khẩu</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={[
            styles.passwordInput,
            passwordError ? styles.errorInput : null,
          ]}
          placeholder="••••••"
          placeholderTextColor="#999"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={handlePasswordChange}
          keyboardType="numeric"
          maxLength={6}
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

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => router.push("/forgot-password")}
      >
        <Text style={styles.forgotText}>Quên mật khẩu?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.bottomText}>Chưa có tài khoản? </Text>
        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text style={styles.signupText}>Đăng ký</Text>
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
    paddingLeft: 4,
  },
  forgotButton: {
    alignSelf: "flex-end",
    marginTop: 6,
    marginBottom: 20,
  },
  forgotText: {
    fontSize: 13,
    color: "#4A90E2",
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#4A90E2",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    elevation: 2,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  bottomText: {
    fontSize: 14,
    color: "#666",
  },
  signupText: {
    fontSize: 14,
    color: "#4A90E2",
    fontWeight: "bold",
  },
});
