import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const RefundRequestsScreen = () => {
  // Thông tin người dùng
  const [userInfo] = useState({
    name: "Nguyễn Văn A",
    phone: "0987654321",
    email: "user@example.com",
  });

  // Danh sách tour đã tham gia (dữ liệu mẫu)
  const [tours] = useState([
    {
      id: 1,
      name: "Tour Hạ Long 2 ngày 1 đêm",
      date: "15/05/2023",
      price: "2,500,000 VND",
    },
    {
      id: 2,
      name: "Đà Nẵng - Hội An - Bà Nà",
      date: "22/06/2023",
      price: "3,200,000 VND",
    },
    {
      id: 3,
      name: "Sapa mùa lúa chín",
      date: "10/09/2023",
      price: "1,800,000 VND",
    },
  ]);

  // State cho form
  const [selectedTour, setSelectedTour] = useState<number | null>(null);
  const [reason, setReason] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!selectedTour) {
      Alert.alert("Lỗi", "Vui lòng chọn tour cần hoàn tiền");
      return;
    }

    if (!reason) {
      Alert.alert("Lỗi", "Vui lòng nhập lý do hoàn tiền");
      return;
    }

    setIsSubmitting(true);

    // Giả lập gửi đơn hoàn tiền
    setTimeout(() => {
      setIsSubmitting(false);
      const selectedTourData = tours.find((tour) => tour.id === selectedTour);
      Alert.alert(
        "Thành công",
        `Đơn hoàn tiền cho tour ${selectedTourData?.name} đã được gửi.\nLý do: ${reason}`,
        [
          {
            text: "Đóng",
            onPress: () => router.push("/profile"),
          },
        ]
      );
    }, 1500);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push("/profile")}>
            <MaterialIcons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Yêu cầu hoàn tiền</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Thông tin người dùng */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin người yêu cầu</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Họ và tên:</Text>
            <Text style={styles.infoValue}>{userInfo.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Số điện thoại:</Text>
            <Text style={styles.infoValue}>{userInfo.phone}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{userInfo.email}</Text>
          </View>
        </View>

        {/* Chọn tour */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tour đã tham gia</Text>
          <Text style={styles.sectionSubtitle}>
            Chọn tour bạn muốn yêu cầu hoàn tiền
          </Text>

          {tours.map((tour) => (
            <TouchableOpacity
              key={tour.id}
              style={[
                styles.tourItem,
                selectedTour === tour.id && styles.selectedTourItem,
              ]}
              onPress={() => setSelectedTour(tour.id)}
            >
              <View style={styles.tourInfo}>
                <Text style={styles.tourName}>{tour.name}</Text>
                <View style={styles.tourDetails}>
                  <Text style={styles.tourDate}>
                    <MaterialIcons name="date-range" size={14} color="#666" />{" "}
                    {tour.date}
                  </Text>
                  <Text style={styles.tourPrice}>
                    <FontAwesome name="money" size={14} color="#666" />{" "}
                    {tour.price}
                  </Text>
                </View>
              </View>
              {selectedTour === tour.id && (
                <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Thông tin hoàn tiền */}
        {selectedTour && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Thông tin hoàn tiền</Text>

            {/* Lý do hoàn tiền */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Lý do hoàn tiền *</Text>
              <TextInput
                style={[styles.input, styles.reasonInput]}
                placeholder="Mô tả lý do bạn yêu cầu hoàn tiền..."
                multiline
                numberOfLines={4}
                value={reason}
                onChangeText={setReason}
              />
            </View>

            {/* Hình ảnh minh chứng */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Hình ảnh minh chứng (nếu có)
              </Text>
              <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                {image ? (
                  <Image source={{ uri: image }} style={styles.imagePreview} />
                ) : (
                  <View style={styles.imagePlaceholder}>
                    <MaterialIcons name="add-a-photo" size={24} color="#666" />
                    <Text style={styles.imagePlaceholderText}>
                      Thêm hình ảnh
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {/* Thông tin chuyển khoản */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Thông tin nhận tiền hoàn</Text>
              <View style={styles.bankInfoContainer}>
                <View style={styles.bankInfoRow}>
                  <MaterialIcons
                    name="payment"
                    size={20}
                    color="#007AFF"
                    style={styles.bankIcon}
                  />
                  <Text style={styles.bankInfoLabel}>Phương thức:</Text>
                  <Text style={styles.bankInfoValue}>ZaloPay</Text>
                  <Image
                    source={require("@/assets/images/zalopay.png")}
                    style={styles.zalopayIcon}
                  />
                </View>
                <View style={styles.bankInfoRow}>
                  <MaterialIcons
                    name="person"
                    size={20}
                    color="#007AFF"
                    style={styles.bankIcon}
                  />
                  <Text style={styles.bankInfoLabel}>Tên tài khoản:</Text>
                  <Text style={styles.bankInfoValue}>{userInfo.name}</Text>
                </View>
                <View style={styles.bankInfoRow}>
                  <MaterialIcons
                    name="phone"
                    size={20}
                    color="#007AFF"
                    style={styles.bankIcon}
                  />
                  <Text style={styles.bankInfoLabel}>Số điện thoại:</Text>
                  <Text style={styles.bankInfoValue}>{userInfo.phone}</Text>
                </View>
              </View>
              <Text style={styles.noteText}>
                Tiền hoàn sẽ được chuyển vào tài khoản ZaloPay của bạn
              </Text>
            </View>
          </View>
        )}

        {/* Nút gửi yêu cầu */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            (!selectedTour || !reason || isSubmitting) && styles.disabledButton,
          ]}
          onPress={handleSubmit}
          disabled={!selectedTour || !reason || isSubmitting}
        >
          {isSubmitting ? (
            <Text style={styles.submitButtonText}>Đang gửi...</Text>
          ) : (
            <Text style={styles.submitButtonText}>Gửi yêu cầu hoàn tiền</Text>
          )}
        </TouchableOpacity>

        {/* Thông báo */}
        <View style={styles.noticeSection}>
          <Text style={styles.noticeTitle}>Lưu ý quan trọng:</Text>
          <View style={styles.noticeItem}>
            <MaterialIcons name="info" size={16} color="#FF9500" />
            <Text style={styles.noticeText}>
              Yêu cầu hoàn tiền sẽ được xử lý trong vòng 3-5 ngày làm việc
            </Text>
          </View>
          <View style={styles.noticeItem}>
            <MaterialIcons name="info" size={16} color="#FF9500" />
            <Text style={styles.noticeText}>
              Số tiền hoàn thực tế sẽ được xác nhận bởi bộ phận hỗ trợ
            </Text>
          </View>
          <View style={styles.noticeItem}>
            <MaterialIcons name="info" size={16} color="#FF9500" />
            <Text style={styles.noticeText}>
              Vui lòng kiểm tra kỹ thông tin trước khi gửi yêu cầu
            </Text>
          </View>
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
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
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
    color: "#333",
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 15,
    color: "#666",
    width: 120,
  },
  infoValue: {
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
    flex: 1,
  },
  tourItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderWidth: 1,
    borderColor: "#EEE",
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedTourItem: {
    borderColor: "#4CAF50",
    backgroundColor: "#F0F9F0",
  },
  tourInfo: {
    flex: 1,
  },
  tourName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  tourDetails: {
    flexDirection: "row",
  },
  tourDate: {
    fontSize: 13,
    color: "#666",
    marginRight: 16,
  },
  tourPrice: {
    fontSize: 13,
    color: "#666",
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 15,
    color: "#333",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#FAFAFA",
  },
  reasonInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    overflow: "hidden",
  },
  imagePlaceholder: {
    alignItems: "center",
    justifyContent: "center",
  },
  imagePlaceholderText: {
    marginTop: 8,
    color: "#666",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
  },
  bankInfoContainer: {
    backgroundColor: "#FAFAFA",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  bankInfoRow: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "center",
  },
  bankIcon: {
    marginRight: 8,
    width: 20,
  },
  bankInfoLabel: {
    fontSize: 15,
    color: "#666",
    width: 100,
    marginLeft: 8,
  },
  bankInfoValue: {
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
    flex: 1,
  },
  zalopayIcon: {
    width: 24,
    height: 24,
    marginLeft: 8,
  },
  noteText: {
    fontSize: 12,
    color: "#999",
    marginTop: 6,
    fontStyle: "italic",
  },
  submitButton: {
    backgroundColor: "#FF5722",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginVertical: 16,
    shadowColor: "#FF5722",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: "#CCCCCC",
    shadowColor: "#999",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  noticeSection: {
    backgroundColor: "#FFF3E0",
    borderRadius: 12,
    padding: 16,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF5722",
    marginBottom: 8,
  },
  noticeItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  noticeText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
    flex: 1,
  },
});

export default RefundRequestsScreen;
