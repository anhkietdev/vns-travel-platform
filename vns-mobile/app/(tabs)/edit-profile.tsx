import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const EditProfileScreen = () => {
  const [firstName, setFirstName] = useState("Itunuoluwa");
  const [lastName, setLastName] = useState("Abidoye");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("itunuoluwa@petra.africa");
  const [includePhone, setIncludePhone] = useState(false);
  const [includeEmail, setIncludeEmail] = useState(false);

  const handleUpdateProfile = () => {
    // Xử lý cập nhật profile
    console.log({
      firstName,
      lastName,
      phoneNumber: includePhone ? phoneNumber : null,
      email: includeEmail ? email : null,
    });

    // Hiển thị thông báo thành công và trở về profile
    Alert.alert("Thành công", "Cập nhật thông tin thành công!", [
      {
        text: "OK",
        onPress: () => router.replace("/(tabs)/profile"), // Trở về trang profile trong tabs
      },
    ]);
  };

  const handleBackPress = () => {
    router.replace("/(tabs)/profile"); // Trở về trang profile trong tabs
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <MaterialIcons name="arrow-back" size={24} color="#4A90E2" />
        </TouchableOpacity>
        <Text style={styles.title}>Chỉnh sửa hồ sơ</Text>
      </View>

      <View style={styles.profileInfo}>
        <View style={styles.avatarPlaceholder}>
          <MaterialIcons name="person" size={50} color="#fff" />
        </View>
        <Text style={styles.name}>
          {firstName} {lastName}
        </Text>
        <Text style={styles.email}>{email}</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>

        <Text style={styles.label}>Tên</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Nhập tên"
        />

        <Text style={styles.label}>Họ</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Nhập họ"
        />

        <Text style={styles.sectionTitle}>Thông tin liên hệ</Text>

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setIncludePhone(!includePhone)}
          >
            {includePhone ? (
              <MaterialIcons name="check-box" size={24} color="#4A90E2" />
            ) : (
              <MaterialIcons
                name="check-box-outline-blank"
                size={24}
                color="#666"
              />
            )}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>Thêm số điện thoại</Text>
        </View>

        {includePhone && (
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Nhập số điện thoại"
            keyboardType="phone-pad"
          />
        )}

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setIncludeEmail(!includeEmail)}
          >
            {includeEmail ? (
              <MaterialIcons name="check-box" size={24} color="#4A90E2" />
            ) : (
              <MaterialIcons
                name="check-box-outline-blank"
                size={24}
                color="#666"
              />
            )}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>Cập nhật email</Text>
        </View>

        {includeEmail && (
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Nhập email"
            keyboardType="email-address"
          />
        )}

        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleUpdateProfile}
        >
          <Text style={styles.updateButtonText}>Lưu thay đổi</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  profileInfo: {
    marginBottom: 30,
    alignItems: "center",
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#666",
  },
  formContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 16,
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#333",
  },
  updateButton: {
    backgroundColor: "#4A90E2",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditProfileScreen;
