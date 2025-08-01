// app/(tabs)/tour.tsx
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

// Dữ liệu mẫu các tour
const tours = [
  {
    id: 1,
    name: "Tour Đà Lạt 3 ngày 2 đêm",
    location: "Đà Lạt, Lâm Đồng",
    price: 2500000,
    discount: 10,
    startDate: "2025-08-03",
    endDate: "2025-08-15",
    image: require("@/assets/images/dalat.jpg"),
    rating: 4.5,
    reviewCount: 128,
    description: "Khám phá thành phố ngàn hoa với nhiều điểm đến hấp dẫn.",
    highlights: [
      "Tham quan Dinh Bảo Đại",
      "Check-in tại đồi chè Cầu Đất",
      "Khám phá thung lũng Tình Yêu",
    ],
    included: [
      "Xe đưa đón từ TP.HCM",
      "Khách sạn 3 sao",
      "Hướng dẫn viên nhiệt tình",
    ],
    policy: "Hủy tour trước 7 ngày: hoàn 100% tiền tour",
  },
  {
    id: 2,
    name: "Tour Phú Quốc 4 ngày 3 đêm",
    location: "Phú Quốc, Kiên Giang",
    price: 3500000,
    discount: 15,
    startDate: "2025-08-08",
    endDate: "2025-08-15",
    image: require("@/assets/images/phuquoc.jpg"),
    rating: 4.8,
    reviewCount: 245,
    description:
      "Trải nghiệm thiên đường biển đảo với nhiều hoạt động thú vị. Tour bao gồm tắm biển, lặn ngắm san hô và khám phá ẩm thực hải sản tươi sống.",
    highlights: [
      "Tắm biển tại Bãi Sao - bãi biển đẹp nhất Phú Quốc",
      "Khám phá làng chài Hàm Ninh - thưởng thức hải sản tươi sống",
      "Tham quan Vinpearl Safari - vườn thú bán hoang dã lớn nhất Việt Nam",
      "Check-in Cáp treo Hòn Thơm - dài nhất thế giới",
      "Tham quan làng nước mắm Phú Quốc truyền thống",
    ],
    included: [
      "Xe đưa đón từ sân bay Phú Quốc",
      "Resort 4 sao tiêu chuẩn quốc tế gần biển",
      "Hướng dẫn viên tiếng Anh/Việt",
      "Bữa trưa hải sản tại làng chài",
      "Vé tham quan Vinpearl Safari & VinWonders",
      "Bảo hiểm du lịch cao cấp",
    ],
    policy:
      "Hủy tour trước 10 ngày: hoàn 100% tiền tour\nHủy tour trước 5 ngày: hoàn 70% tiền tour\nHủy tour sau 5 ngày: không hoàn tiền",
  },
  {
    id: 3,
    name: "Tour Hà Nội - Hạ Long 3 ngày 2 đêm",
    location: "Hà Nội - Hạ Long",
    price: 3200000,
    discount: 0,
    startDate: "2025-08-10",
    endDate: "2025-08-18",
    image: require("@/assets/images/halong.jpg"),
    rating: 4.6,
    reviewCount: 187,
    description:
      "Khám phá thủ đô nghìn năm văn hiến và kỳ quan thiên nhiên thế giới Vịnh Hạ Long. Tour kết hợp giữa văn hóa lịch sử và trải nghiệm thiên nhiên.",
    highlights: [
      "Tham quan Hoàng thành Thăng Long - di sản văn hóa thế giới",
      "Check-in phố cổ Hà Nội - 36 phố phường",
      "Du thuyền Hạ Long - ngắm cảnh vịnh với hàng nghìn đảo đá",
      "Thăm hang Sửng Sốt - một trong đẹp nhất vịnh Hạ Long",
      "Thưởng thức ẩm thực Hà Nội: phở, bún chả, chả cá...",
    ],
    included: [
      "Xe đưa đón từ sân bay Nội Bài",
      "Khách sạn 4 sao tại Hà Nội",
      "Phòng trên du thuyền 3 sao tại Hạ Long",
      "Hướng dẫn viên nhiệt tình, chuyên nghiệp",
      "Ăn 3 bữa sáng, 3 bữa trưa, 2 bữa tối",
      "Vé tham quan tất cả các điểm du lịch",
    ],
    policy:
      "Hủy tour trước 7 ngày: hoàn 100% tiền tour\nHủy tour trước 3 ngày: hoàn 50% tiền tour\nHủy tour sau 3 ngày: không hoàn tiền",
  },
  {
    id: 4,
    name: "Tour Sapa 2 ngày 1 đêm",
    location: "Sapa, Lào Cai",
    price: 1800000,
    discount: 20,
    startDate: "2025-08-05",
    endDate: "2025-08-10",
    image: require("@/assets/images/sapa.jpg"),
    rating: 4.4,
    reviewCount: 92,
    description:
      "Trải nghiệm vùng núi Tây Bắc với ruộng bậc thang và văn hóa các dân tộc thiểu số. Tour ngắn ngày phù hợp cho những người bận rộn.",
    highlights: [
      "Thăm bản Cát Cát - làng dân tộc H'Mông truyền thống",
      "Check-in cầu kính Rồng Mây - cầu kính dài nhất Đông Nam Á",
      "Ngắm ruộng bậc thang mùa lúa chín",
      "Gặp gỡ người dân tộc thiểu số địa phương",
      "Thưởng thức thắng cố và rượu táo mèo đặc sản",
    ],
    included: [
      "Xe limousine giường nằm Hà Nội - Sapa",
      "Khách sạn 3 sao view núi tại trung tâm Sapa",
      "Hướng dẫn viên người địa phương",
      "1 bữa sáng, 2 bữa trưa, 1 bữa tối",
      "Vé tham quan các điểm du lịch",
      "Bảo hiểm du lịch cơ bản",
    ],
    policy:
      "Hủy tour trước 5 ngày: hoàn 100% tiền tour\nHủy tour trước 2 ngày: hoàn 30% tiền tour\nHủy tour sau 2 ngày: không hoàn tiền",
  },
  {
    id: 5,
    name: "Tour Nha Trang 3 ngày 2 đêm",
    location: "Nha Trang, Khánh Hòa",
    price: 2800000,
    discount: 5,
    startDate: "2025-0807",
    endDate: "2025-08-12",
    image: require("@/assets/images/nhatrang.jpg"),
    rating: 4.3,
    reviewCount: 156,
    description:
      "Tận hưởng kỳ nghỉ biển tại thành phố biển xinh đẹp nhất Việt Nam. Tour bao gồm các hoạt động biển và tham quan đảo.",
    highlights: [
      "Tắm biển tại bãi biển dài nhất Việt Nam",
      "Tham quan Vinpearl Land - thành phố giải trí trên đảo",
      "Lặn ngắm san hô tại Hòn Mun",
      "Thưởng thức hải sản tươi sống tại chợ đêm",
      "Thư giãn tại suối khoáng nóng Tháp Bà",
    ],
    included: [
      "Xe đưa đón từ sân bay Cam Ranh",
      "Khách sạn 4 sao view biển",
      "Hướng dẫn viên địa phương",
      "2 bữa sáng, 3 bữa trưa, 2 bữa tối",
      "Vé tham quan Vinpearl Land",
      "Bảo hiểm du lịch",
    ],
    policy:
      "Hủy tour trước 7 ngày: hoàn 100% tiền tour\nHủy tour trước 3 ngày: hoàn 50% tiền tour\nHủy tour sau 3 ngày: không hoàn tiền",
  },
  {
    id: 6,
    name: "Tour Miền Tây 2 ngày 1 đêm",
    location: "Cần Thơ - Cà Mau",
    price: 1500000,
    discount: 0,
    startDate: "2025-08-08",
    endDate: "2025-08-15",
    image: require("@/assets/images/mientay.jpg"),
    rating: 4.2,
    reviewCount: 78,
    description:
      "Khám phá vùng sông nước miền Tây với chợ nổi và vườn cây ăn trái. Tour đặc biệt phù hợp với những ai yêu thích trải nghiệm văn hóa sông nước.",
    highlights: [
      "Tham quan chợ nổi Cái Răng - chợ nổi lớn nhất miền Tây",
      "Khám phá rừng ngập mặn Cà Mau",
      "Đi thuyền trên sông Mekong",
      "Thưởng thức trái cây miền Tây tại vườn",
      "Xem hoàng hôn trên sông Hậu",
    ],
    included: [
      "Xe đưa đón từ TP.HCM",
      "Nhà nghỉ homestay tại Cần Thơ",
      "Hướng dẫn viên địa phương",
      "1 bữa sáng, 2 bữa trưa, 1 bữa tối",
      "Vé tham quan các điểm du lịch",
      "Bảo hiểm du lịch",
    ],
    policy:
      "Hủy tour trước 5 ngày: hoàn 100% tiền tour\nHủy tour trước 2 ngày: hoàn 30% tiền tour\nHủy tour sau 2 ngày: không hoàn tiền",
  },
];

const locations = [
  "Tất cả địa điểm",
  "Đà Lạt, Lâm Đồng",
  "Phú Quốc, Kiên Giang",
  "Hà Nội - Hạ Long",
  "Sapa, Lào Cai",
  "Nha Trang, Khánh Hòa",
  "Cần Thơ - Cà Mau",
];

export default function TourScreen() {
  const [priceSort, setPriceSort] = useState<"asc" | "desc">("asc");
  const [ratingSort, setRatingSort] = useState(false);
  const [discountOnly, setDiscountOnly] = useState(false);
  const [selectedTour, setSelectedTour] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // State cho form tìm kiếm
  const [showSearchForm, setShowSearchForm] = useState(true);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [selectedLocation, setSelectedLocation] = useState("Tất cả địa điểm");
  const [showDepartureDatePicker, setShowDepartureDatePicker] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showAllTours, setShowAllTours] = useState(false);

  // Xử lý DatePicker
  const onChangeDepartureDate = (event: any, selectedDate?: Date) => {
    setShowDepartureDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setDepartureDate(selectedDate);
    }
  };

  // Lọc và sắp xếp tour
  const filteredTours = tours
    .filter((tour) => {
      // Nếu bấm xem tất cả tour thì hiển thị hết
      if (showAllTours) return true;

      // Filter theo form tìm kiếm
      if (
        departureDate &&
        tour.startDate !== departureDate.toISOString().split("T")[0]
      )
        return false;
      if (
        selectedLocation !== "Tất cả địa điểm" &&
        tour.location !== selectedLocation
      )
        return false;

      // Filter theo các điều kiện khác
      if (discountOnly && !tour.discount) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          tour.name.toLowerCase().includes(query) ||
          tour.location.toLowerCase().includes(query) ||
          tour.description.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (ratingSort) return b.rating - a.rating;
      if (priceSort === "asc") return a.price - b.price;
      return b.price - a.price;
    });

  const handleTourPress = (tour: any) => {
    setSelectedTour(tour);
    setShowDetailModal(true);
  };

  const handleBookTour = () => {
    setShowDetailModal(false);
    setShowPaymentOptions(true);
  };

  const handlePaymentOption = (option: string) => {
    setShowPaymentOptions(false);
    router.push({
      pathname: "/payment",
      params: {
        tour: JSON.stringify(selectedTour),
        paymentType: option,
      },
    });
  };

  const handleSearchTours = () => {
    setShowSearchForm(false);
    setShowAllTours(false);
  };

  const resetSearchForm = () => {
    setDepartureDate(null);
    setSelectedLocation("Tất cả địa điểm");
    setShowSearchForm(true);
    setShowAllTours(false);
  };

  const handleShowAllTours = () => {
    setShowAllTours(true);
    setShowSearchForm(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace("/home")}>
          <Ionicons name="arrow-back" size={24} color="#4A90E2" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Các Tour Du Lịch</Text>
        <TouchableOpacity
          onPress={() => setShowSearch(!showSearch)}
        ></TouchableOpacity>
      </View>

      {/* Form tìm kiếm tour */}
      {showSearchForm ? (
        <View style={styles.searchFormContainer}>
          <Text style={styles.searchFormTitle}>Tìm kiếm tour du lịch</Text>

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
                  : "Chọn ngày đi"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Nút tìm kiếm */}
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearchTours}
          >
            <Text style={styles.searchButtonText}>Tìm kiếm tour</Text>
          </TouchableOpacity>

          {/* Nút xem tất cả tour */}
          <TouchableOpacity
            style={styles.showAllButton}
            onPress={handleShowAllTours}
          >
            <Text style={styles.showAllButtonText}>Xem tất cả tour</Text>
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
                placeholder="Tìm kiếm tour..."
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

              <TouchableOpacity
                style={[
                  styles.filterButton,
                  discountOnly && styles.activeFilterButton,
                ]}
                onPress={() => setDiscountOnly(!discountOnly)}
              >
                <MaterialIcons
                  name="local-offer"
                  size={16}
                  color={discountOnly ? "#FFF" : "#4A90E2"}
                />
                <Text
                  style={[
                    styles.filterText,
                    discountOnly && styles.activeFilterText,
                  ]}
                >
                  Ưu đãi
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Danh sách tour */}
          {filteredTours.length > 0 ? (
            <FlatList
              data={filteredTours}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.listContent}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.tourCard}
                  onPress={() => handleTourPress(item)}
                  activeOpacity={0.8}
                >
                  <Image source={item.image} style={styles.tourImage} />
                  {item.discount > 0 && (
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountBadgeText}>
                        -{item.discount}%
                      </Text>
                    </View>
                  )}
                  <View style={styles.tourInfo}>
                    <Text style={styles.tourName}>{item.name}</Text>
                    <Text style={styles.tourDate}>
                      Khởi hành: {item.startDate}
                    </Text>

                    <View style={styles.tourMeta}>
                      <View style={styles.tourLocation}>
                        <MaterialIcons
                          name="location-on"
                          size={16}
                          color="#4A90E2"
                        />
                        <Text style={styles.tourLocationText}>
                          {item.location}
                        </Text>
                      </View>

                      <View style={styles.tourRating}>
                        <FontAwesome name="star" size={14} color="#FFD700" />
                        <Text style={styles.ratingText}>{item.rating}</Text>
                        <Text style={styles.reviewCount}>
                          ({item.reviewCount})
                        </Text>
                      </View>
                    </View>

                    <View style={styles.priceContainer}>
                      {item.discount ? (
                        <>
                          <Text style={styles.originalPrice}>
                            {item.price.toLocaleString()}đ
                          </Text>
                          <Text style={styles.discountedPrice}>
                            {Math.round(
                              item.price * (1 - item.discount / 100)
                            ).toLocaleString()}
                            đ
                          </Text>
                        </>
                      ) : (
                        <Text style={styles.tourPrice}>
                          {item.price.toLocaleString()}đ
                        </Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Không có tour nào phù hợp</Text>
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

      {/* Modal chi tiết tour */}
      <Modal
        visible={showDetailModal}
        animationType="slide"
        onRequestClose={() => setShowDetailModal(false)}
      >
        {selectedTour && (
          <View style={styles.modalContainer}>
            <ScrollView>
              {/* Header modal */}
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setShowDetailModal(false)}>
                  <Ionicons name="close" size={28} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>{selectedTour.name}</Text>
                <View style={{ width: 28 }} />
              </View>

              {/* Hình ảnh */}
              <Image source={selectedTour.image} style={styles.detailImage} />

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
                      {selectedTour.location}
                    </Text>
                  </View>

                  <View style={styles.detailRating}>
                    <FontAwesome name="star" size={18} color="#FFD700" />
                    <Text style={styles.detailRatingText}>
                      {selectedTour.rating}
                    </Text>
                    <Text style={styles.detailReviewCount}>
                      ({selectedTour.reviewCount} đánh giá)
                    </Text>
                  </View>
                </View>

                <Text style={styles.tourDateDetail}>
                  Ngày khởi hành: {selectedTour.startDate}
                </Text>

                <View style={styles.priceContainer}>
                  {selectedTour.discount ? (
                    <>
                      <Text style={styles.originalPriceDetail}>
                        {selectedTour.price.toLocaleString()}đ
                      </Text>
                      <Text style={styles.discountedPriceDetail}>
                        {Math.round(
                          selectedTour.price * (1 - selectedTour.discount / 100)
                        ).toLocaleString()}
                        đ
                      </Text>
                    </>
                  ) : (
                    <Text style={styles.tourPriceDetail}>
                      {selectedTour.price.toLocaleString()}đ
                    </Text>
                  )}
                </View>
              </View>

              {/* Mô tả */}
              <View style={styles.detailSection}>
                <Text style={styles.sectionTitle}>Mô tả tour</Text>
                <Text style={styles.descriptionText}>
                  {selectedTour.description}
                </Text>
              </View>

              {/* Điểm nổi bật */}
              <View style={styles.detailSection}>
                <Text style={styles.sectionTitle}>Điểm nổi bật</Text>
                {selectedTour.highlights.map(
                  (highlight: string, index: number) => (
                    <View key={index} style={styles.highlightItem}>
                      <MaterialIcons name="star" size={16} color="#4A90E2" />
                      <Text style={styles.highlightText}>{highlight}</Text>
                    </View>
                  )
                )}
              </View>

              {/* Bao gồm */}
              <View style={styles.detailSection}>
                <Text style={styles.sectionTitle}>Dịch vụ bao gồm</Text>
                {selectedTour.included.map((item: string, index: number) => (
                  <View key={index} style={styles.includedItem}>
                    <MaterialIcons
                      name="check-circle"
                      size={16}
                      color="#4CAF50"
                    />
                    <Text style={styles.includedText}>{item}</Text>
                  </View>
                ))}
              </View>

              {/* Chính sách */}
              <View style={styles.detailSection}>
                <Text style={styles.sectionTitle}>Chính sách hủy tour</Text>
                <Text style={styles.policyText}>{selectedTour.policy}</Text>
              </View>
            </ScrollView>

            {/* Nút đặt tour */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.bookButton}
                onPress={handleBookTour}
              >
                <Text style={styles.bookButtonText}>ĐẶT TOUR NGAY</Text>
                <Text style={styles.bookButtonSubText}>
                  {selectedTour.discount ? (
                    <>
                      Chỉ từ{" "}
                      {Math.round(
                        selectedTour.price * (1 - selectedTour.discount / 100)
                      ).toLocaleString()}
                      đ
                    </>
                  ) : (
                    <>{selectedTour.price.toLocaleString()}đ</>
                  )}
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
                {Math.round(selectedTour?.price * 0.3).toLocaleString()}đ
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.paymentOptionButton}
              onPress={() => handlePaymentOption("full")}
            >
              <Text style={styles.paymentOptionText}>Thanh toán toàn bộ</Text>
              <Text style={styles.paymentOptionSubText}>
                {selectedTour?.discount
                  ? Math.round(
                      selectedTour.price * (1 - selectedTour.discount / 100)
                    ).toLocaleString()
                  : selectedTour?.price.toLocaleString()}
                đ
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
  tourCard: {
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
  tourImage: {
    width: "100%",
    height: 180,
  },
  discountBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#FF4757",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  discountBadgeText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  tourInfo: {
    padding: 16,
  },
  tourName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  tourDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  tourMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  tourLocation: {
    flexDirection: "row",
    alignItems: "center",
  },
  tourLocationText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  tourRating: {
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
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  tourPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6B00",
  },
  originalPrice: {
    fontSize: 14,
    color: "#999",
    textDecorationLine: "line-through",
    marginRight: 8,
  },
  discountedPrice: {
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
  tourDateDetail: {
    fontSize: 16,
    color: "#666",
    marginBottom: 12,
  },
  tourPriceDetail: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6B00",
  },
  originalPriceDetail: {
    fontSize: 18,
    color: "#999",
    textDecorationLine: "line-through",
    marginRight: 12,
  },
  discountedPriceDetail: {
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
});
