// app/(tabs)/rental.tsx
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Keyboard,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

// Dữ liệu mẫu các loại xe
const rentals = [
  {
    id: 1,
    name: "Xe máy Honda Vision",
    type: "Xe máy",
    category: "2-bánh",
    price: 150000,
    location: "Đà Lạt, Lâm Đồng",
    image: require("@/assets/images/rental1.jpg"),
    rating: 4.5,
    reviewCount: 120,
    features: ["Xe mới", "Bảo hiểm", "Mũ bảo hiểm", "Dễ sử dụng"],
  },
  {
    id: 2,
    name: "Xe ô tô Toyota Vios",
    type: "Ô tô",
    category: "4-bánh",
    price: 800000,
    location: "Hà Nội",
    image: require("@/assets/images/rental2.jpg"),
    rating: 4.8,
    reviewCount: 85,
    features: ["Xe đời mới", "Tự động", "Bảo hiểm", "Camera lùi"],
  },
  {
    id: 3,
    name: "Xe đạp địa hình",
    type: "Xe đạp",
    category: "2-bánh",
    price: 100000,
    location: "Sapa, Lào Cai",
    image: require("@/assets/images/rental3.jpg"),
    rating: 4.2,
    reviewCount: 65,
    features: ["Nhẹ nhàng", "Phù hợp địa hình", "Dễ điều khiển"],
  },
  {
    id: 4,
    name: "Xe ô tô Kia Morning",
    type: "Ô tô",
    category: "4-bánh",
    price: 700000,
    location: "Đà Nẵng",
    image: require("@/assets/images/rental4.jpg"),
    rating: 4.6,
    reviewCount: 92,
    features: ["Tiết kiệm xăng", "Dễ lái", "Bảo hiểm", "Camera lùi"],
  },
];

export default function RentalScreen() {
  // State cho tìm kiếm và lọc
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "2-bánh" | "4-bánh"
  >("all");
  const [showSearch, setShowSearch] = useState(false);

  // State cho modal chi tiết xe
  const [selectedRental, setSelectedRental] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // State cho form thuê xe
  const [showRentalForm, setShowRentalForm] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  // State cho form thông tin cá nhân
  const [showPersonalInfoForm, setShowPersonalInfoForm] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [idCardFront, setIdCardFront] = useState<string | null>(null);
  const [idCardBack, setIdCardBack] = useState<string | null>(null);

  // Lọc xe theo danh mục và tìm kiếm
  const filteredRentals = rentals.filter((rental) => {
    // Lọc theo danh mục
    if (selectedCategory !== "all" && rental.category !== selectedCategory) {
      return false;
    }

    // Lọc theo tìm kiếm
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        rental.name.toLowerCase().includes(query) ||
        rental.type.toLowerCase().includes(query) ||
        rental.location.toLowerCase().includes(query)
      );
    }

    return true;
  });

  // Xử lý khi nhấn vào xe
  const handleRentalPress = (rental: any) => {
    setSelectedRental(rental);
    setShowDetailModal(true);
  };

  // Xử lý thuê xe
  const handleRent = () => {
    setShowDetailModal(false);
    setShowRentalForm(true);
  };

  // Xử lý thay đổi ngày bắt đầu
  const onChangeStartDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(Platform.OS === "ios");
    setStartDate(currentDate);
  };

  // Xử lý thay đổi ngày kết thúc
  const onChangeEndDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(Platform.OS === "ios");
    setEndDate(currentDate);
  };

  // Tính số ngày thuê
  const calculateDays = () => {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  };

  // Tính tổng tiền
  const calculateTotal = () => {
    if (!selectedRental) return 0;
    return selectedRental.price * calculateDays();
  };

  // Xử lý tiếp tục đến form thông tin cá nhân
  const handleContinueToPersonalInfo = () => {
    if (startDate >= endDate) {
      Alert.alert("Lỗi", "Ngày kết thúc phải sau ngày bắt đầu");
      return;
    }
    setShowRentalForm(false);
    setShowPersonalInfoForm(true);
  };

  // Xử lý chọn ảnh CCCD mặt trước
  const pickIdCardFront = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 2],
      quality: 1,
    });

    if (!result.canceled) {
      setIdCardFront(result.assets[0].uri);
    }
  };

  // Xử lý chọn ảnh CCCD mặt sau
  const pickIdCardBack = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 2],
      quality: 1,
    });

    if (!result.canceled) {
      setIdCardBack(result.assets[0].uri);
    }
  };

  // Xử lý gửi yêu cầu thuê xe
  const handleSubmitRental = () => {
    if (
      !fullName ||
      !phoneNumber ||
      !email ||
      !address ||
      !idCardFront ||
      !idCardBack
    ) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin và tải lên ảnh CCCD");
      return;
    }

    // Tạo đối tượng thông tin thuê xe
    const rentalInfo = {
      rental: selectedRental,
      startDate,
      endDate,
      totalDays: calculateDays(),
      totalPrice: calculateTotal(),
      customerInfo: {
        fullName,
        phoneNumber,
        email,
        address,
        idCardFront,
        idCardBack,
      },
    };

    // Hiển thị thông báo thành công
    Alert.alert(
      "Thành công",
      "Yêu cầu thuê xe của bạn đã được gửi. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.",
      [
        {
          text: "OK",
          onPress: () => {
            // Reset các state và quay về trang chủ
            setShowPersonalInfoForm(false);
            setSelectedRental(null);
            setFullName("");
            setPhoneNumber("");
            setEmail("");
            setAddress("");
            setIdCardFront(null);
            setIdCardBack(null);
            router.replace("/home");
          },
        },
      ]
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.replace("/home")}>
            <Ionicons name="arrow-back" size={24} color="#4A90E2" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Thuê Xe</Text>
          <TouchableOpacity onPress={() => setShowSearch(!showSearch)}>
            <Ionicons name="search" size={24} color="#4A90E2" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        {showSearch && (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Tìm kiếm xe..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus={true}
            />
            <TouchableOpacity
              onPress={() => {
                setSearchQuery("");
                setShowSearch(false);
              }}
              style={styles.searchCloseButton}
            >
              <Ionicons name="close" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        )}

        {/* Filter by category */}
        <View style={styles.categoryFilter}>
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === "all" && styles.activeCategoryButton,
            ]}
            onPress={() => setSelectedCategory("all")}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === "all" && styles.activeCategoryButtonText,
              ]}
            >
              Tất cả
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === "2-bánh" && styles.activeCategoryButton,
            ]}
            onPress={() => setSelectedCategory("2-bánh")}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === "2-bánh" &&
                  styles.activeCategoryButtonText,
              ]}
            >
              Xe 2 bánh
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === "4-bánh" && styles.activeCategoryButton,
            ]}
            onPress={() => setSelectedCategory("4-bánh")}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === "4-bánh" &&
                  styles.activeCategoryButtonText,
              ]}
            >
              Xe 4 bánh
            </Text>
          </TouchableOpacity>
        </View>

        {/* Danh sách xe */}
        <FlatList
          data={filteredRentals}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.rentalCard}
              onPress={() => handleRentalPress(item)}
              activeOpacity={0.8}
            >
              <Image source={item.image} style={styles.rentalImage} />
              <View style={styles.rentalInfo}>
                <Text style={styles.rentalName}>{item.name}</Text>
                <Text style={styles.rentalType}>{item.type}</Text>

                <View style={styles.rentalMeta}>
                  <View style={styles.rentalLocation}>
                    <MaterialIcons
                      name="location-on"
                      size={16}
                      color="#4A90E2"
                    />
                    <Text style={styles.rentalLocationText}>
                      {item.location}
                    </Text>
                  </View>

                  <View style={styles.rentalRating}>
                    <FontAwesome name="star" size={14} color="#FFD700" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                    <Text style={styles.reviewCount}>({item.reviewCount})</Text>
                  </View>
                </View>

                <Text style={styles.rentalPrice}>
                  {item.price.toLocaleString()}đ/ngày
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />

        {/* Modal chi tiết xe */}
        <Modal
          visible={showDetailModal}
          animationType="slide"
          onRequestClose={() => setShowDetailModal(false)}
        >
          {selectedRental && (
            <View style={styles.modalContainer}>
              <ScrollView>
                {/* Header modal */}
                <View style={styles.modalHeader}>
                  <TouchableOpacity onPress={() => setShowDetailModal(false)}>
                    <Ionicons name="close" size={28} color="#FFF" />
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>{selectedRental.name}</Text>
                  <View style={{ width: 28 }} />
                </View>

                {/* Hình ảnh */}
                <Image
                  source={selectedRental.image}
                  style={styles.detailImage}
                />

                {/* Thông tin cơ bản */}
                <View style={styles.detailSection}>
                  <View style={styles.detailMeta}>
                    <View style={styles.detailLocation}>
                      <MaterialIcons
                        name="location-on"
                        size={20}
                        color="#4A90E2"
                      />
                      <Text style={styles.detailLocationText}>
                        {selectedRental.location}
                      </Text>
                    </View>

                    <View style={styles.detailRating}>
                      <FontAwesome name="star" size={18} color="#FFD700" />
                      <Text style={styles.detailRatingText}>
                        {selectedRental.rating}
                      </Text>
                      <Text style={styles.detailReviewCount}>
                        ({selectedRental.reviewCount} đánh giá)
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.rentalTypeDetail}>
                    Loại xe: {selectedRental.type}
                  </Text>

                  <Text style={styles.rentalPriceDetail}>
                    Giá thuê: {selectedRental.price.toLocaleString()}đ/ngày
                  </Text>
                </View>

                {/* Tiện ích */}
                <View style={styles.detailSection}>
                  <Text style={styles.sectionTitle}>Tiện ích</Text>
                  {selectedRental.features.map(
                    (feature: string, index: number) => (
                      <View key={index} style={styles.featureItem}>
                        <MaterialIcons
                          name="check-circle"
                          size={16}
                          color="#4CAF50"
                        />
                        <Text style={styles.featureText}>{feature}</Text>
                      </View>
                    )
                  )}
                </View>

                {/* Nút thuê xe */}
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.rentButton}
                    onPress={handleRent}
                  >
                    <Text style={styles.rentButtonText}>THUÊ XE NGAY</Text>
                    <Text style={styles.rentButtonSubText}>
                      {selectedRental.price.toLocaleString()}đ/ngày
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          )}
        </Modal>

        {/* Form chọn thời gian thuê xe */}
        <Modal
          visible={showRentalForm}
          animationType="slide"
          onRequestClose={() => setShowRentalForm(false)}
        >
          <View style={styles.formContainer}>
            <ScrollView contentContainerStyle={styles.formScrollContent}>
              {/* Header */}
              <View style={styles.formHeader}>
                <TouchableOpacity onPress={() => setShowRentalForm(false)}>
                  <Ionicons name="arrow-back" size={24} color="#4A90E2" />
                </TouchableOpacity>
                <Text style={styles.formTitle}>
                  Đặt xe {selectedRental?.name}
                </Text>
                <View style={{ width: 24 }} />
              </View>

              {/* Thông tin xe */}
              <View style={styles.rentalInfoSection}>
                <Image
                  source={selectedRental?.image}
                  style={styles.formRentalImage}
                />
                <View style={styles.formRentalInfo}>
                  <Text style={styles.formRentalName}>
                    {selectedRental?.name}
                  </Text>
                  <Text style={styles.formRentalType}>
                    {selectedRental?.type}
                  </Text>
                  <Text style={styles.formRentalPrice}>
                    {selectedRental?.price.toLocaleString()}đ/ngày
                  </Text>
                </View>
              </View>

              {/* Form chọn ngày */}
              <View style={styles.formSection}>
                <Text style={styles.formSectionTitle}>Thời gian thuê</Text>

                {/* Ngày bắt đầu */}
                <TouchableOpacity
                  style={styles.dateInput}
                  onPress={() => setShowStartDatePicker(true)}
                >
                  <MaterialIcons name="date-range" size={24} color="#4A90E2" />
                  <View style={styles.dateInputText}>
                    <Text style={styles.dateInputLabel}>Ngày nhận xe</Text>
                    <Text style={styles.dateInputValue}>
                      {startDate.toLocaleDateString("vi-VN")}
                    </Text>
                  </View>
                </TouchableOpacity>

                {showStartDatePicker && (
                  <DateTimePicker
                    value={startDate}
                    mode="date"
                    display="default"
                    onChange={onChangeStartDate}
                    minimumDate={new Date()}
                  />
                )}

                {/* Ngày kết thúc */}
                <TouchableOpacity
                  style={styles.dateInput}
                  onPress={() => setShowEndDatePicker(true)}
                >
                  <MaterialIcons name="date-range" size={24} color="#4A90E2" />
                  <View style={styles.dateInputText}>
                    <Text style={styles.dateInputLabel}>Ngày trả xe</Text>
                    <Text style={styles.dateInputValue}>
                      {endDate.toLocaleDateString("vi-VN")}
                    </Text>
                  </View>
                </TouchableOpacity>

                {showEndDatePicker && (
                  <DateTimePicker
                    value={endDate}
                    mode="date"
                    display="default"
                    onChange={onChangeEndDate}
                    minimumDate={startDate}
                  />
                )}

                {/* Thông tin giá */}
                <View style={styles.priceSummary}>
                  <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>Giá thuê/ngày:</Text>
                    <Text style={styles.priceValue}>
                      {selectedRental?.price.toLocaleString()}đ
                    </Text>
                  </View>
                  <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>Số ngày thuê:</Text>
                    <Text style={styles.priceValue}>
                      {calculateDays()} ngày
                    </Text>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.priceRow}>
                    <Text style={styles.totalPriceLabel}>Tổng cộng:</Text>
                    <Text style={styles.totalPriceValue}>
                      {calculateTotal().toLocaleString()}đ
                    </Text>
                  </View>
                </View>
              </View>

              {/* Nút tiếp tục */}
              <TouchableOpacity
                style={styles.continueButton}
                onPress={handleContinueToPersonalInfo}
              >
                <Text style={styles.continueButtonText}>TIẾP TỤC</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Modal>

        {/* Form thông tin cá nhân */}
        <Modal
          visible={showPersonalInfoForm}
          animationType="slide"
          onRequestClose={() => setShowPersonalInfoForm(false)}
        >
          <View style={styles.formContainer}>
            <ScrollView contentContainerStyle={styles.formScrollContent}>
              {/* Header */}
              <View style={styles.formHeader}>
                <TouchableOpacity
                  onPress={() => setShowPersonalInfoForm(false)}
                >
                  <Ionicons name="arrow-back" size={24} color="#4A90E2" />
                </TouchableOpacity>
                <Text style={styles.formTitle}>Thông tin cá nhân</Text>
                <View style={{ width: 24 }} />
              </View>

              {/* Thông tin xe */}
              <View style={styles.rentalInfoSection}>
                <Image
                  source={selectedRental?.image}
                  style={styles.formRentalImage}
                />
                <View style={styles.formRentalInfo}>
                  <Text style={styles.formRentalName}>
                    {selectedRental?.name}
                  </Text>
                  <Text style={styles.formRentalType}>
                    {selectedRental?.type}
                  </Text>
                  <Text style={styles.formRentalPrice}>
                    {calculateTotal().toLocaleString()}đ ({calculateDays()}{" "}
                    ngày)
                  </Text>
                </View>
              </View>

              {/* Form thông tin */}
              <View style={styles.formSection}>
                <Text style={styles.formSectionTitle}>
                  Thông tin khách hàng
                </Text>

                <TextInput
                  style={styles.input}
                  placeholder="Họ và tên"
                  value={fullName}
                  onChangeText={setFullName}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Số điện thoại"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                />

                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />

                <TextInput
                  style={styles.input}
                  placeholder="Địa chỉ"
                  value={address}
                  onChangeText={setAddress}
                />

                {/* Upload CCCD mặt trước */}
                <Text style={styles.uploadTitle}>Mặt trước CCCD</Text>
                <TouchableOpacity
                  style={styles.uploadButton}
                  onPress={pickIdCardFront}
                >
                  {idCardFront ? (
                    <Image
                      source={{ uri: idCardFront }}
                      style={styles.uploadedImage}
                    />
                  ) : (
                    <>
                      <MaterialIcons
                        name="add-a-photo"
                        size={24}
                        color="#4A90E2"
                      />
                      <Text style={styles.uploadButtonText}>
                        Tải lên ảnh CCCD mặt trước
                      </Text>
                    </>
                  )}
                </TouchableOpacity>

                {/* Upload CCCD mặt sau */}
                <Text style={styles.uploadTitle}>Mặt sau CCCD</Text>
                <TouchableOpacity
                  style={styles.uploadButton}
                  onPress={pickIdCardBack}
                >
                  {idCardBack ? (
                    <Image
                      source={{ uri: idCardBack }}
                      style={styles.uploadedImage}
                    />
                  ) : (
                    <>
                      <MaterialIcons
                        name="add-a-photo"
                        size={24}
                        color="#4A90E2"
                      />
                      <Text style={styles.uploadButtonText}>
                        Tải lên ảnh CCCD mặt sau
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>

              {/* Nút gửi yêu cầu */}
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmitRental}
              >
                <Text style={styles.submitButtonText}>GỬI YÊU CẦU THUÊ XE</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
  },
  searchCloseButton: {
    marginLeft: 8,
    padding: 8,
  },
  // Category filter styles
  categoryFilter: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EEE",
    marginRight: 8,
  },
  activeCategoryButton: {
    backgroundColor: "#4A90E2",
    borderColor: "#4A90E2",
  },
  categoryButtonText: {
    fontSize: 14,
    color: "#666",
  },
  activeCategoryButtonText: {
    color: "#FFF",
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  rentalCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  rentalImage: {
    width: "100%",
    height: 180,
  },
  rentalInfo: {
    padding: 16,
  },
  rentalName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  rentalType: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  rentalMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  rentalLocation: {
    flexDirection: "row",
    alignItems: "center",
  },
  rentalLocationText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  rentalRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  rentalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6B00",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#4A90E2",
    paddingTop: Platform.OS === "ios" ? 50 : 16,
  },
  modalTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
  },
  detailImage: {
    width: "100%",
    height: 250,
  },
  detailSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  detailMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  detailLocation: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailLocationText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 8,
  },
  detailRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailRatingText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    marginLeft: 4,
  },
  detailReviewCount: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  rentalTypeDetail: {
    fontSize: 16,
    color: "#666",
    marginBottom: 12,
  },
  rentalPriceDetail: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6B00",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  featureText: {
    fontSize: 15,
    color: "#333",
    marginLeft: 8,
    flex: 1,
    lineHeight: 22,
  },
  actionButtons: {
    padding: 16,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  rentButton: {
    backgroundColor: "#4A90E2",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  rentButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  rentButtonSubText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginTop: 4,
  },
  // Form styles
  formContainer: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  formScrollContent: {
    paddingBottom: 20,
  },
  formHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  rentalInfoSection: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  formRentalImage: {
    width: 80,
    height: 60,
    borderRadius: 8,
  },
  formRentalInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "center",
  },
  formRentalName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  formRentalType: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  formRentalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6B00",
    marginTop: 4,
  },
  formSection: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#FFF",
  },
  formSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  dateInputText: {
    marginLeft: 12,
  },
  dateInputLabel: {
    fontSize: 14,
    color: "#666",
  },
  dateInputValue: {
    fontSize: 16,
    color: "#333",
    marginTop: 4,
  },
  priceSummary: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 16,
    color: "#666",
  },
  priceValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#EEE",
    marginVertical: 12,
  },
  totalPriceLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  totalPriceValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6B00",
  },
  continueButton: {
    backgroundColor: "#4A90E2",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    alignItems: "center",
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  // Personal info form styles
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#EEE",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  uploadTitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    fontWeight: "500",
  },
  uploadButton: {
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#EEE",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    marginBottom: 16,
  },
  uploadButtonText: {
    fontSize: 14,
    color: "#4A90E2",
    marginTop: 8,
  },
  uploadedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: "#4A90E2",
    borderRadius: 8,
    padding: 16,
    margin: 16,
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
});
