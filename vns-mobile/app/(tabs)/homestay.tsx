// app/(tabs)/homestay.tsx
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Dữ liệu mẫu các homestay với thời gian trống
const homestays = [
  {
    id: 1,
    name: "Homestay Đà Lạt view đồi thông",
    location: "Đà Lạt, Lâm Đồng",
    price: 1500000,
    availableTimes: [
      "08:00",
      "10:00",
      "12:00",
      "14:00",
      "16:00",
      "18:00",
      "20:00",
    ],
    startDate: "2025-08-03",
    endDate: "2025-08-15",
    image: require("@/assets/images/homestay1.jpg"),
    rating: 4.7,
    reviewCount: 215,
    description:
      "Homestay với view đồi thông tuyệt đẹp, không gian yên tĩnh và thoáng đãng.",
    highlights: [
      "View đồi thông xanh mát",
      "Phòng ốc tiện nghi đầy đủ",
      "Bếp chung để nấu ăn",
      "Khu vực BBQ ngoài trời",
    ],
    included: [
      "WiFi tốc độ cao",
      "Chỗ đậu xe miễn phí",
      "Dịch vụ dọn phòng hàng ngày",
      "Bữa sáng miễn phí",
    ],
    policy: "Hủy trước 5 ngày: hoàn 100% tiền\nHủy trước 2 ngày: hoàn 50% tiền",
  },
  {
    id: 2,
    name: "Homestay Phú Quốc gần biển",
    location: "Phú Quốc, Kiên Giang",
    price: 2000000,
    availableTimes: ["09:00", "11:00", "13:00", "15:00", "17:00", "19:00"],
    startDate: "2025-08-08",
    endDate: "2025-08-15",
    image: require("@/assets/images/homestay2.jpg"),
    rating: 4.9,
    reviewCount: 342,
    description:
      "Homestay chỉ cách biển 100m, thiết kế theo phong cách nhiệt đới với hồ bơi vô cực.",
    highlights: [
      "Vị trí gần biển thuận tiện",
      "Hồ bơi vô cực view biển",
      "Phòng máy lạnh tiện nghi",
      "Quầy bar phục vụ đồ uống",
    ],
    included: [
      "WiFi miễn phí",
      "Xe đưa đón sân bay",
      "Bữa sáng buffet",
      "Dịch vụ thuê xe máy",
    ],
    policy: "Hủy trước 7 ngày: hoàn 100% tiền\nHủy trước 3 ngày: hoàn 70% tiền",
  },
  {
    id: 3,
    name: "Homestay Hà Nội phố cổ",
    location: "Hà Nội",
    price: 1200000,
    availableTimes: ["08:30", "10:30", "12:30", "14:30", "16:30", "18:30"],
    startDate: "2025-08-10",
    endDate: "2025-08-18",
    image: require("@/assets/images/homestay3.jpg"),
    rating: 4.5,
    reviewCount: 178,
    description:
      "Homestay nằm giữa phố cổ Hà Nội, thiết kế cổ điển kết hợp hiện đại, thuận tiện tham quan.",
    highlights: [
      "Vị trí trung tâm phố cổ",
      "Thiết kế độc đáo vintage",
      "Ban công view phố",
      "Không gian ấm cúng",
    ],
    included: [
      "WiFi tốc độ cao",
      "Bản đồ du lịch miễn phí",
      "Dịch vụ đặt tour",
      "Máy pha cà phê trong phòng",
    ],
    policy: "Hủy trước 3 ngày: hoàn 100% tiền\nHủy trước 1 ngày: hoàn 50% tiền",
  },
  {
    id: 4,
    name: "Homestay Sapa view ruộng bậc thang",
    location: "Sapa, Lào Cai",
    price: 1800000,
    availableTimes: ["08:00", "10:00", "12:00", "14:00", "16:00"],
    startDate: "2025-08-05",
    endDate: "2025-08-10",
    image: require("@/assets/images/homestay4.jpg"),
    rating: 4.8,
    reviewCount: 256,
    description:
      "Homestay với view ruộng bậc thang tuyệt đẹp, trải nghiệm văn hóa dân tộc địa phương.",
    highlights: [
      "View ruộng bậc thang ngoạn mục",
      "Kiến trúc nhà sàn truyền thống",
      "Lớp học nấu ăn địa phương",
      "Lửa trại buổi tối",
    ],
    included: [
      "Bữa sáng đặc sản địa phương",
      "Tour đi bộ khám phá làng bản",
      "Dịch vụ massage",
      "Cho thuê xe máy",
    ],
    policy: "Hủy trước 5 ngày: hoàn 100% tiền\nHủy trước 2 ngày: hoàn 30% tiền",
  },
  {
    id: 5,
    name: "Homestay Nha Trang ven biển",
    location: "Nha Trang, Khánh Hòa",
    price: 1600000,
    availableTimes: ["09:00", "11:00", "13:00", "15:00", "17:00", "19:00"],
    startDate: "2025-08-07",
    endDate: "2025-08-12",
    image: require("@/assets/images/homestay5.jpg"),
    rating: 4.6,
    reviewCount: 189,
    description:
      "Homestay ven biển với không gian mở, phòng ốc sạch sẽ và tiện nghi đầy đủ.",
    highlights: [
      "Vị trí gần biển thuận tiện",
      "Hồ bơi ngoài trời",
      "Quầy bar trên sân thượng",
      "Dịch vụ thuê đồ bơi",
    ],
    included: [
      "WiFi miễn phí",
      "Bữa sáng nhẹ",
      "Dịch vụ giặt ủi",
      "Xe đưa đón ra đảo",
    ],
    policy: "Hủy trước 4 ngày: hoàn 100% tiền\nHủy trước 1 ngày: hoàn 50% tiền",
  },
  {
    id: 6,
    name: "Homestay miền Tây sông nước",
    location: "Cần Thơ",
    price: 900000,
    availableTimes: ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"],
    startDate: "2025-08-08",
    endDate: "2025-08-15",
    image: require("@/assets/images/homestay6.jpg"),
    rating: 4.4,
    reviewCount: 132,
    description:
      "Homestay đặc trưng miền Tây với nhà vườn, vườn cây ăn trái và trải nghiệm sông nước.",
    highlights: [
      "Nhà vườn rộng rãi thoáng mát",
      "Vườn cây ăn trái tại chỗ",
      "Đi thuyền trên sông",
      "Ẩm thực miền Tây đặc sắc",
    ],
    included: [
      "Bữa sáng đặc sản miền Tây",
      "Tour chợ nổi sáng sớm",
      "Dịch vụ xe đạp miễn phí",
      "Hướng dẫn viên địa phương",
    ],
    policy: "Hủy trước 3 ngày: hoàn 100% tiền\nHủy trước 1 ngày: hoàn 30% tiền",
  },
];

const locations = [
  "Tất cả địa điểm",
  "Đà Lạt, Lâm Đồng",
  "Phú Quốc, Kiên Giang",
  "Hà Nội",
  "Sapa, Lào Cai",
  "Nha Trang, Khánh Hòa",
  "Cần Thơ",
];

export default function HomestayScreen() {
  const [priceSort, setPriceSort] = useState<"asc" | "desc">("asc");
  const [ratingSort, setRatingSort] = useState(false);
  const [selectedHomestay, setSelectedHomestay] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // State cho form tìm kiếm
  const [showSearchForm, setShowSearchForm] = useState(true);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [selectedLocation, setSelectedLocation] = useState("Tất cả địa điểm");
  const [showDepartureDatePicker, setShowDepartureDatePicker] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showAllHomestays, setShowAllHomestays] = useState(false);

  // Xử lý DatePicker
  const onChangeDepartureDate = (event: any, selectedDate?: Date) => {
    setShowDepartureDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setDepartureDate(selectedDate);
    }
  };

  // Lọc và sắp xếp homestay
  const filteredHomestays = homestays
    .filter((homestay) => {
      // Nếu bấm xem tất cả homestay thì hiển thị hết
      if (showAllHomestays) return true;

      // Filter theo form tìm kiếm
      if (
        departureDate &&
        homestay.startDate !== departureDate.toISOString().split("T")[0]
      )
        return false;
      if (
        selectedLocation !== "Tất cả địa điểm" &&
        homestay.location !== selectedLocation
      )
        return false;

      // Filter theo search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          homestay.name.toLowerCase().includes(query) ||
          homestay.location.toLowerCase().includes(query) ||
          homestay.description.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (ratingSort) return b.rating - a.rating;
      if (priceSort === "asc") return a.price - b.price;
      return b.price - a.price;
    });

  const handleHomestayPress = (homestay: any) => {
    setSelectedHomestay(homestay);
    setSelectedTime(null);
    setShowDetailModal(true);
  };

  const handleBookHomestay = () => {
    if (!selectedTime) {
      alert("Vui lòng chọn thời gian nhận phòng");
      return;
    }
    setShowDetailModal(false);
    setShowPaymentOptions(true);
  };

  const handlePaymentOption = (option: string) => {
    setShowPaymentOptions(false);
    router.push({
      pathname: "/payment",
      params: {
        homestay: JSON.stringify({
          ...selectedHomestay,
          selectedTime: selectedTime,
        }),
        paymentType: option,
      },
    });
  };

  const handleSearchHomestays = () => {
    setShowSearchForm(false);
    setShowAllHomestays(false);
  };

  const resetSearchForm = () => {
    setDepartureDate(null);
    setSelectedLocation("Tất cả địa điểm");
    setShowSearchForm(true);
    setShowAllHomestays(false);
  };

  const handleShowAllHomestays = () => {
    setShowAllHomestays(true);
    setShowSearchForm(false);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setShowTimePicker(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace("/home")}>
          <Ionicons name="arrow-back" size={24} color="#4A90E2" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Các Homestay</Text>
        <TouchableOpacity
          onPress={() => setShowSearch(!showSearch)}
        ></TouchableOpacity>
      </View>

      {/* Form tìm kiếm homestay */}
      {showSearchForm ? (
        <View style={styles.searchFormContainer}>
          <Text style={styles.searchFormTitle}>Tìm kiếm homestay</Text>

          {/* Chọn địa điểm */}
          <View style={styles.inputContainer}>
            <MaterialIcons name="location-on" size={20} color="#4A90E2" />
            <TouchableOpacity
              style={styles.searchInput}
              onPress={() => setShowLocationPicker(true)}
            >
              <Text
                style={
                  selectedLocation
                    ? styles.searchInputText
                    : styles.searchInputPlaceholder
                }
              >
                {selectedLocation}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Chọn ngày đi */}
          <View style={styles.inputContainer}>
            <MaterialIcons name="calendar-today" size={20} color="#4A90E2" />
            <TouchableOpacity
              style={styles.searchInput}
              onPress={() => setShowDepartureDatePicker(true)}
            >
              <Text
                style={
                  departureDate
                    ? styles.searchInputText
                    : styles.searchInputPlaceholder
                }
              >
                {departureDate
                  ? departureDate.toLocaleDateString()
                  : "Chọn ngày nhận phòng"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Nút tìm kiếm */}
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearchHomestays}
          >
            <Text style={styles.searchButtonText}>Tìm kiếm homestay</Text>
          </TouchableOpacity>

          {/* Nút xem tất cả homestay */}
          <TouchableOpacity
            style={styles.showAllButton}
            onPress={handleShowAllHomestays}
          >
            <Text style={styles.showAllButtonText}>Xem tất cả homestay</Text>
          </TouchableOpacity>

          {/* DatePicker cho ngày đi */}
          {showDepartureDatePicker && (
            <DateTimePicker
              value={departureDate || new Date()}
              mode="date"
              display="default"
              onChange={onChangeDepartureDate}
              minimumDate={new Date()}
            />
          )}

          {/* Modal chọn địa điểm */}
          <Modal
            visible={showLocationPicker}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setShowLocationPicker(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.locationModalContent}>
                <Text style={styles.modalTitle}>Chọn địa điểm</Text>
                <FlatList
                  data={locations}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.locationItem,
                        selectedLocation === item &&
                          styles.selectedLocationItem,
                      ]}
                      onPress={() => {
                        setSelectedLocation(item);
                        setShowLocationPicker(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.locationText,
                          selectedLocation === item &&
                            styles.selectedLocationText,
                        ]}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </Modal>
        </View>
      ) : (
        <>
          {/* Search Bar */}
          {showSearch && (
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInputField}
                placeholder="Tìm kiếm homestay..."
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

          {/* Bộ lọc */}
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={resetSearchForm}
            >
              <Text style={styles.resetButtonText}>Đổi tìm kiếm</Text>
            </TouchableOpacity>

            <View style={styles.filterGroup}>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  priceSort && styles.activeFilterButton,
                ]}
                onPress={() =>
                  setPriceSort(priceSort === "asc" ? "desc" : "asc")
                }
              >
                <Text
                  style={[
                    styles.filterText,
                    priceSort && styles.activeFilterText,
                  ]}
                >
                  Giá {priceSort === "asc" ? "↑" : "↓"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.filterButton,
                  ratingSort && styles.activeFilterButton,
                ]}
                onPress={() => setRatingSort(!ratingSort)}
              >
                <Text
                  style={[
                    styles.filterText,
                    ratingSort && styles.activeFilterText,
                  ]}
                >
                  Đánh giá {ratingSort ? "↓" : "↑"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Danh sách homestay */}
          {filteredHomestays.length > 0 ? (
            <FlatList
              data={filteredHomestays}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.listContent}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.homestayCard}
                  onPress={() => handleHomestayPress(item)}
                  activeOpacity={0.8}
                >
                  <Image source={item.image} style={styles.homestayImage} />
                  <View style={styles.homestayInfo}>
                    <Text style={styles.homestayName}>{item.name}</Text>
                    <Text style={styles.homestayDate}>
                      Nhận phòng: {item.startDate}
                    </Text>

                    <View style={styles.homestayMeta}>
                      <View style={styles.homestayLocation}>
                        <MaterialIcons
                          name="location-on"
                          size={16}
                          color="#4A90E2"
                        />
                        <Text style={styles.homestayLocationText}>
                          {item.location}
                        </Text>
                      </View>

                      <View style={styles.homestayRating}>
                        <FontAwesome name="star" size={14} color="#FFD700" />
                        <Text style={styles.ratingText}>{item.rating}</Text>
                        <Text style={styles.reviewCount}>
                          ({item.reviewCount})
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.homestayPrice}>
                      {item.price.toLocaleString()}đ
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Không có homestay nào phù hợp
              </Text>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={resetSearchForm}
              >
                <Text style={styles.resetButtonText}>
                  Đổi điều kiện tìm kiếm
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}

      {/* Modal chi tiết homestay */}
      <Modal
        visible={showDetailModal}
        animationType="slide"
        onRequestClose={() => setShowDetailModal(false)}
      >
        {selectedHomestay && (
          <View style={styles.modalContainer}>
            <ScrollView>
              {/* Header modal */}
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setShowDetailModal(false)}>
                  <Ionicons name="close" size={28} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>{selectedHomestay.name}</Text>
                <View style={{ width: 28 }} />
              </View>

              {/* Hình ảnh */}
              <Image
                source={selectedHomestay.image}
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
                      {selectedHomestay.location}
                    </Text>
                  </View>

                  <View style={styles.detailRating}>
                    <FontAwesome name="star" size={18} color="#FFD700" />
                    <Text style={styles.detailRatingText}>
                      {selectedHomestay.rating}
                    </Text>
                    <Text style={styles.detailReviewCount}>
                      ({selectedHomestay.reviewCount} đánh giá)
                    </Text>
                  </View>
                </View>

                <Text style={styles.homestayDateDetail}>
                  Ngày nhận phòng: {selectedHomestay.startDate}
                </Text>

                {/* Chọn thời gian nhận phòng */}
                <TouchableOpacity
                  style={styles.timeSelectionButton}
                  onPress={() => setShowTimePicker(true)}
                >
                  <MaterialIcons name="access-time" size={20} color="#4A90E2" />
                  <Text style={styles.timeSelectionText}>
                    {selectedTime
                      ? `Thời gian nhận phòng: ${selectedTime}`
                      : "Chọn thời gian nhận phòng"}
                  </Text>
                </TouchableOpacity>

                {/* Hiển thị các khung giờ trống */}
                {showTimePicker && (
                  <View style={styles.timePickerContainer}>
                    <Text style={styles.timePickerTitle}>
                      Chọn thời gian nhận phòng:
                    </Text>
                    <View style={styles.timeOptionsContainer}>
                      {selectedHomestay.availableTimes.map((time: string) => (
                        <TouchableOpacity
                          key={time}
                          style={[
                            styles.timeOption,
                            selectedTime === time && styles.selectedTimeOption,
                          ]}
                          onPress={() => handleTimeSelect(time)}
                        >
                          <Text
                            style={[
                              styles.timeOptionText,
                              selectedTime === time &&
                                styles.selectedTimeOptionText,
                            ]}
                          >
                            {time}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}

                <Text style={styles.homestayPriceDetail}>
                  {selectedHomestay.price.toLocaleString()}đ
                </Text>
              </View>

              {/* Mô tả */}
              <View style={styles.detailSection}>
                <Text style={styles.sectionTitle}>Mô tả homestay</Text>
                <Text style={styles.descriptionText}>
                  {selectedHomestay.description}
                </Text>
              </View>

              {/* Điểm nổi bật */}
              <View style={styles.detailSection}>
                <Text style={styles.sectionTitle}>Điểm nổi bật</Text>
                {selectedHomestay.highlights.map(
                  (highlight: string, index: number) => (
                    <View key={index} style={styles.highlightItem}>
                      <MaterialIcons name="star" size={16} color="#4A90E2" />
                      <Text style={styles.highlightText}>{highlight}</Text>
                    </View>
                  )
                )}
              </View>

              {/* Tiện ích */}
              <View style={styles.detailSection}>
                <Text style={styles.sectionTitle}>Tiện ích bao gồm</Text>
                {selectedHomestay.included.map(
                  (item: string, index: number) => (
                    <View key={index} style={styles.includedItem}>
                      <MaterialIcons
                        name="check-circle"
                        size={16}
                        color="#4CAF50"
                      />
                      <Text style={styles.includedText}>{item}</Text>
                    </View>
                  )
                )}
              </View>

              {/* Chính sách */}
              <View style={styles.detailSection}>
                <Text style={styles.sectionTitle}>Chính sách hủy phòng</Text>
                <Text style={styles.policyText}>{selectedHomestay.policy}</Text>
              </View>
            </ScrollView>

            {/* Nút đặt homestay */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.bookButton}
                onPress={handleBookHomestay}
              >
                <Text style={styles.bookButtonText}>ĐẶT PHÒNG NGAY</Text>
                <Text style={styles.bookButtonSubText}>
                  {selectedHomestay.price.toLocaleString()}đ
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>

      {/* Modal lựa chọn thanh toán */}
      <Modal
        visible={showPaymentOptions}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowPaymentOptions(false)}
      >
        <View style={styles.paymentModalContainer}>
          <View style={styles.paymentModalContent}>
            <Text style={styles.paymentModalTitle}>
              Chọn phương thức thanh toán
            </Text>

            <TouchableOpacity
              style={styles.paymentOptionButton}
              onPress={() => handlePaymentOption("deposit")}
            >
              <Text style={styles.paymentOptionText}>Đặt cọc 30%</Text>
              <Text style={styles.paymentOptionSubText}>
                {Math.round(selectedHomestay?.price * 0.3).toLocaleString()}đ
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.paymentOptionButton}
              onPress={() => handlePaymentOption("full")}
            >
              <Text style={styles.paymentOptionText}>Thanh toán toàn bộ</Text>
              <Text style={styles.paymentOptionSubText}>
                {selectedHomestay?.price.toLocaleString()}đ
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelPaymentButton}
              onPress={() => setShowPaymentOptions(false)}
            >
              <Text style={styles.cancelPaymentButtonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
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
  // Styles cho form tìm kiếm
  searchFormContainer: {
    padding: 20,
    backgroundColor: "#FFF",
    margin: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchFormTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginLeft: 10,
  },
  searchInputText: {
    fontSize: 16,
    color: "#333",
  },
  searchInputPlaceholder: {
    fontSize: 16,
    color: "#999",
  },
  searchButton: {
    backgroundColor: "#4A90E2",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
  },
  showAllButton: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#4A90E2",
  },
  showAllButtonText: {
    color: "#4A90E2",
    fontSize: 16,
    fontWeight: "bold",
  },
  searchButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Styles cho modal chọn địa điểm
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  locationModalContent: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    width: "90%",
    maxHeight: "70%",
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
  locationItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  selectedLocationItem: {
    backgroundColor: "#F0F7FF",
  },
  locationText: {
    fontSize: 16,
    color: "#333",
  },
  selectedLocationText: {
    color: "#4A90E2",
    fontWeight: "bold",
  },
  // Các styles còn lại
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  searchInputField: {
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
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  filterGroup: {
    flexDirection: "row",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginLeft: 8,
  },
  activeFilterButton: {
    backgroundColor: "#4A90E2",
    borderColor: "#4A90E2",
  },
  filterText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "500",
  },
  activeFilterText: {
    color: "#FFF",
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  homestayCard: {
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
  homestayImage: {
    width: "100%",
    height: 180,
  },
  homestayInfo: {
    padding: 16,
  },
  homestayName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  homestayDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  homestayMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  homestayLocation: {
    flexDirection: "row",
    alignItems: "center",
  },
  homestayLocationText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  homestayRating: {
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
  homestayPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6B00",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: "#4A90E2",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  resetButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
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
  homestayDateDetail: {
    fontSize: 16,
    color: "#666",
    marginBottom: 12,
  },
  homestayPriceDetail: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6B00",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
  },
  highlightItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  highlightText: {
    fontSize: 15,
    color: "#333",
    marginLeft: 8,
    flex: 1,
    lineHeight: 22,
  },
  includedItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  includedText: {
    fontSize: 15,
    color: "#333",
    marginLeft: 8,
    flex: 1,
    lineHeight: 22,
  },
  policyText: {
    fontSize: 15,
    color: "#333",
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
  bookButton: {
    backgroundColor: "#4A90E2",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  bookButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  bookButtonSubText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginTop: 4,
  },
  paymentModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  paymentModalContent: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    width: "80%",
  },
  paymentModalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  paymentOptionButton: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  paymentOptionText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  paymentOptionSubText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    marginTop: 5,
  },
  cancelPaymentButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4A90E2",
    marginTop: 10,
  },
  cancelPaymentButtonText: {
    color: "#4A90E2",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Styles for time selection
  timeSelectionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    marginBottom: 16,
  },
  timeSelectionText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 8,
  },
  timePickerContainer: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  timePickerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  timeOptionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  timeOption: {
    padding: 10,
    margin: 4,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  selectedTimeOption: {
    backgroundColor: "#4A90E2",
    borderColor: "#4A90E2",
  },
  timeOptionText: {
    fontSize: 14,
    color: "#333",
  },
  selectedTimeOptionText: {
    color: "#FFF",
  },
});
