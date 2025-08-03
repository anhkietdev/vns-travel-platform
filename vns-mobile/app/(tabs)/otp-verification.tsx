import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const OTPVerificationScreen = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(90); // 1:30 timer
  const inputsRef = useRef<Array<TextInput | null>>([]);

  // Auto focus next input and handle OTP change
  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto focus next input
    if (text && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // Verify OTP
  const handleVerify = () => {
    if (otp.some((digit) => digit === "")) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ mã OTP");
      return;
    }
    router.push("/new-password");
  };

  // Resend OTP
  const handleResend = () => {
    setTimer(90);
    Alert.alert("Thành công", "Mã OTP mới đã được gửi");
  };

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xác minh OTP</Text>
      <Text style={styles.subtitle}>
        Vui lòng kiểm tra email{" "}
        <Text style={styles.email}>www.uihut@gmail.com</Text> để lấy mã xác minh
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            value={digit}
            onChangeText={(text) => handleOtpChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            ref={(ref) => {
              if (ref && inputsRef.current) {
                inputsRef.current[index] = ref;
              }
            }}
            textAlign="center"
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Xác minh</Text>
      </TouchableOpacity>

      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>
          Gửi lại mã sau {Math.floor(timer / 60)}:
          {timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
        </Text>
        {timer === 0 && (
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.resendLink}>Gửi lại mã</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  email: {
    fontWeight: "bold",
    color: "#333",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: "#e2e2e2",
    borderRadius: 10,
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#4A90E2",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 24,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  resendText: {
    color: "#666",
    marginRight: 8,
  },
  resendLink: {
    color: "#4A90E2",
    fontWeight: "bold",
  },
});

export default OTPVerificationScreen;
