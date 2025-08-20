// app/(tabs)/home.tsx
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

// ==================== TYPE DEFINITIONS ====================
type Destination = {
  id: number;
  name: string;
  location: string;
  price: number;
  image: any;
  category: string;
  progress: number;
  description: string;
  rating: number;
  reviews: number;
  images: any[];
  highlights: string[];
  included: string[];
  policy: string;
};

type GroupTrip = {
  id: number;
  name: string;
  location: string;
  members: number;
  image: any;
  progress: number;
  description: string;
  price: number;
  duration: string;
  departure: string;
  transport: string;
  schedule: string[];
};

type Notification = {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

type MenuItem = {
  id: number;
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
};

// ==================== SAMPLE DATA ====================
const vietnamDestinations: Destination[] = [
  {
    id: 1,
    name: "Vịnh Hạ Long",
    location: "Quảng Ninh",
    price: 4500000,
    image: require("@/assets/images/halong.jpg"),
    category: "Sea",
    progress: 0.8,
    description:
      "Vịnh Hạ Long là một trong những kỳ quan thiên nhiên thế giới với hàng nghìn hòn đảo đá vôi và hang động tuyệt đẹp.",
    rating: 4.8,
    reviews: 1245,
    images: [
      require("@/assets/images/halong1.jpg"),
      require("@/assets/images/halong2.jpg"),
      require("@/assets/images/halong3.jpg"),
    ],
    highlights: [
      "Tham quan hang Sửng Sốt",
      "Tắm biển tại bãi biển Đảo Titop",
      "Khám phá làng chài Cửa Vạn",
      "Ngắm hoàng hôn trên vịnh",
    ],
    included: [
      "Xe đưa đón từ Hà Nội",
      "Tàu tham quan vịnh",
      "Hướng dẫn viên tiếng Việt/Anh",
      "Bữa trưa trên tàu",
    ],
    policy:
      "Hủy tour trước 3 ngày: hoàn 100% tiền. Hủy trước 1 ngày: hoàn 50% tiền. Hủy trong ngày: không hoàn tiền.",
  },
  {
    id: 2,
    name: "Phong Nha - Kẻ Bàng",
    location: "Quảng Bình",
    price: 3200000,
    image: require("@/assets/images/phongnha.jpg"),
    category: "Mountain",
    progress: 0.65,
    description:
      "Vườn quốc gia Phong Nha - Kẻ Bàng nổi tiếng với hệ thống hang động lớn nhất thế giới.",
    rating: 4.7,
    reviews: 987,
    images: [
      require("@/assets/images/phongnha1.jpg"),
      require("@/assets/images/phongnha2.jpg"),
    ],
    highlights: [
      "Tham quan động Phong Nha bằng thuyền",
      "Khám phá động Thiên Đường",
      "Tắm suối tại suối nước Moọc",
    ],
    included: [
      "Xe đưa đón từ Đồng Hới",
      "Thuyền tham quan động",
      "Hướng dẫn viên",
      "Bữa trưa đặc sản địa phương",
    ],
    policy:
      "Hủy tour trước 2 ngày: hoàn 100% tiền. Hủy trước 1 ngày: hoàn 70% tiền. Hủy trong ngày: không hoàn tiền.",
  },
  {
    id: 3,
    name: "Hồ Hoàn Kiếm & Phố Cổ Hà Nội",
    location: "Hà Nội",
    price: 800000,
    image: require("@/assets/images/hoankiem.jpg"),
    category: "Lake",
    progress: 0.4,
    description:
      "Khám phá trái tim của thủ đô Hà Nội với hồ Hoàn Kiếm, cầu Thê Húc, đền Ngọc Sơn và khu phố cổ.",
    rating: 4.5,
    reviews: 1562,
    images: [
      require("@/assets/images/hoankiem1.jpg"),
      require("@/assets/images/hoankiem2.jpg"),
    ],
    highlights: [
      "Tham quan hồ Hoàn Kiếm, cầu Thê Húc",
      "Dạo bộ phố cổ Hà Nội",
      "Thưởng thức ẩm thực đường phố",
      "Xem biểu diễn múa rối nước",
    ],
    included: [
      "Hướng dẫn viên chuyên nghiệp",
      "Vé vào cửa các điểm tham quan",
      "Nước uống",
      "Vé xem múa rối nước",
    ],
    policy:
      "Hủy tour trước 1 ngày: hoàn 100% tiền. Hủy trước 4 tiếng: hoàn 50% tiền. Hủy sau đó: không hoàn tiền.",
  },
];

const groupTrips: GroupTrip[] = [
  {
    id: 1,
    name: "Tour Sapa 3N2Đ",
    location: "Lào Cai",
    members: 12,
    image: require("@/assets/images/sapa.jpg"),
    progress: 0.8,
    description:
      "Tour khám phá Sapa 3 ngày 2 đêm, trải nghiệm văn hóa dân tộc và cảnh quan núi rừng Tây Bắc.",
    price: 3200000,
    duration: "3 ngày 2 đêm",
    departure: "Hà Nội",
    transport: "Xe giường nằm, cáp treo",
    schedule: [
      "Ngày 1: Hà Nội - Sapa - Bản Cát Cát",
      "Ngày 2: Fansipan - Bản Tả Phìn",
      "Ngày 3: Thung lũng Mường Hoa - Hà Nội",
    ],
  },
  {
    id: 2,
    name: "Tour Đà Lạt 4N3Đ",
    location: "Lâm Đồng",
    members: 8,
    image: require("@/assets/images/dalat.jpg"),
    progress: 0.6,
    description:
      "Tour Đà Lạt 4 ngày 3 đêm, tham quan các điểm check-in nổi tiếng và thưởng thức đặc sản địa phương.",
    price: 4500000,
    duration: "4 ngày 3 đêm",
    departure: "TP.HCM",
    transport: "Máy bay, xe du lịch",
    schedule: [
      "Ngày 1: TP.HCM - Đà Lạt - Thung lũng Tình Yêu",
      "Ngày 2: Hồ Xuân Hương - Đồi chè Cầu Đất",
      "Ngày 3: Làng hoa Vạn Thành - Ga Đà Lạt",
      "Ngày 4: Chợ Đà Lạt - TP.HCM",
    ],
  },
];

const notifications: Notification[] = [
  {
    id: 1,
    title: "Ưu đãi đặc biệt",
    message: "Giảm 20% cho các tour biển trong tháng này",
    time: "10 phút trước",
    read: false,
  },
  {
    id: 2,
    title: "Đặt tour thành công",
    message: "Bạn đã đặt tour Đà Nẵng thành công. Mã đặt tour: DL20231125",
    time: "2 giờ trước",
    read: true,
  },
  {
    id: 3,
    title: "Nhắc nhở thanh toán",
    message: "Vui lòng thanh toán tour Sapa trước ngày 30/11 để giữ chỗ",
    time: "1 ngày trước",
    read: true,
  },
];

const availableLocations = [
  "Hà Nội, Việt Nam",
  "Hồ Chí Minh, Việt Nam",
  "Đà Nẵng, Việt Nam",
  "Nha Trang, Việt Nam",
  "Đà Lạt, Việt Nam",
  "Phú Quốc, Việt Nam",
];

export default function HomeScreen() {
  // State management
  const [currentLocation, setCurrentLocation] = useState("Hà Nội, Việt Nam");
  const [activeCategory, setActiveCategory] = useState("Tour");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [menuHeight] = useState(new Animated.Value(0));

  // Tour detail states
  const [selectedItem, setSelectedItem] = useState<
    Destination | GroupTrip | null
  >(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeDetailTab, setActiveDetailTab] = useState("info");

  const scrollRef = useRef<ScrollView>(null);

  // Handle logout function
  const handleLogout = () => {
    setShowMenu(false);
    router.replace("/signin");
  };

  // Toggle menu function
  const toggleMenu = () => {
    const targetHeight = showMenu ? 0 : menuItems.length * 50 + 20;
    setShowMenu((prev) => !prev);
    Animated.timing(menuHeight, {
      toValue: targetHeight,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // Toggle notifications function
  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
    Animated.timing(fadeAnim, {
      toValue: showNotifications ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  // Handle location selection
  const handleSelectLocation = (location: string) => {
    setCurrentLocation(location);
    setShowLocationModal(false);
  };

  // Handle item press
  const handleItemPress = (item: Destination | GroupTrip) => {
    setSelectedItem(item);
    setShowDetailModal(true);
    setQuantity(1);
    setActiveDetailTab("info");
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (!selectedItem) return;

    Alert.alert(
      "Thêm vào giỏ hàng",
      `Bạn đã thêm ${quantity} ${selectedItem.name} vào giỏ hàng`,
      [
        { text: "Tiếp tục mua sắm", onPress: () => setShowDetailModal(false) },
        {
          text: "Xem giỏ hàng",
          onPress: () => {
            setShowDetailModal(false);
            router.push("/(tabs)/cart");
          },
        },
      ]
    );
  };

  // Handle book now
  const handleBookNow = () => {
    if (!selectedItem) return;

    setShowDetailModal(false);
    router.push({
      pathname: "/payment",
      params: {
        item: JSON.stringify(selectedItem),
        quantity: quantity.toString(),
      },
    });
  };

  // Handle quantity increase
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  // Handle quantity decrease
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Menu items
  const menuItems: MenuItem[] = [
    {
      id: 1,
      title: "Thông tin cá nhân",
      icon: "person",
      onPress: () => {
        setShowMenu(false);
        router.push("/(tabs)/profile");
      },
    },
    {
      id: 2,
      title: "Giỏ hàng",
      icon: "shopping-cart",
      onPress: () => {
        setShowMenu(false);
        router.push("/(tabs)/cart");
      },
    },
    {
      id: 3,
      title: "Hỗ trợ khách hàng",
      icon: "support-agent",
      onPress: () => {
        setShowMenu(false);
        router.push("/(tabs)/support");
      },
    },
    {
      id: 4,
      title: "Đăng xuất",
      icon: "logout",
      onPress: handleLogout,
    },
  ];

  // Render menu item
  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={item.onPress}
    >
      <MaterialIcons
        name={item.icon}
        size={24}
        color="#4A90E2"
        style={styles.menuIcon}
      />
      <Text style={styles.menuText}>{item.title}</Text>
    </TouchableOpacity>
  );

  // Render destination item
  const renderDestinationItem = ({ item }: { item: Destination }) => (
    <TouchableOpacity
      style={styles.tripCard}
      onPress={() => handleItemPress(item)}
    >
      <Image source={item.image} style={styles.tripImage} />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.7)"]}
        style={styles.tripGradient}
      />
      <View style={styles.tripInfo}>
        <Text style={styles.tripName}>{item.name}</Text>
        <View style={styles.tripLocationContainer}>
          <MaterialIcons name="location-on" size={14} color="#FFF" />
          <Text style={styles.tripLocation}>{item.location}</Text>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${item.progress * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {Math.round(item.progress * 100)}% đã đặt
          </Text>
        </View>
      </View>
      <View style={styles.priceTag}>
        <Text style={styles.priceText}>{item.price.toLocaleString()} VND</Text>
      </View>
    </TouchableOpacity>
  );

  // Render group trip item
  const renderGroupTripItem = ({ item }: { item: GroupTrip }) => (
    <TouchableOpacity
      style={styles.groupTripCard}
      onPress={() => handleItemPress(item)}
    >
      <Image source={item.image} style={styles.groupTripImage} />
      <View style={styles.groupTripInfo}>
        <Text style={styles.groupTripName}>{item.name}</Text>
        <View style={styles.groupTripLocationContainer}>
          <Ionicons name="location-sharp" size={14} color="#4A90E2" />
          <Text style={styles.groupTripLocation}>{item.location}</Text>
        </View>
        <View style={styles.groupTripFooter}>
          <View style={styles.membersContainer}>
            <Ionicons name="people" size={16} color="#666" />
            <Text style={styles.membersText}>{item.members} thành viên</Text>
          </View>
          <View style={styles.groupProgressContainer}>
            <Text style={styles.groupProgressText}>
              {Math.round(item.progress * 100)}%
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Render notification item
  const renderNotificationItem = ({ item }: { item: Notification }) => (
    <View
      style={[styles.notificationItem, !item.read && styles.unreadNotification]}
    >
      <Text style={styles.notificationItemTitle}>{item.title}</Text>
      <Text style={styles.notificationItemMessage}>{item.message}</Text>
      <Text style={styles.notificationItemTime}>{item.time}</Text>
    </View>
  );

  // Render detail modal
  const renderDetailModal = () => {
    if (!selectedItem) return null;

    return (
      <Modal
        transparent
        visible={showDetailModal}
        animationType="slide"
        onRequestClose={() => setShowDetailModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.detailModal}>
            <ScrollView>
              {/* Image and close button */}
              <View style={styles.detailImageContainer}>
                <Image
                  source={selectedItem.image}
                  style={styles.detailImage}
                  resizeMode="cover"
                />
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setShowDetailModal(false)}
                >
                  <Ionicons name="close" size={28} color="#FFF" />
                </TouchableOpacity>
              </View>

              {/* Basic info */}
              <View style={styles.detailHeader}>
                <Text style={styles.detailTitle}>{selectedItem.name}</Text>
                <View style={styles.detailLocation}>
                  <MaterialIcons name="location-on" size={20} color="#4A90E2" />
                  <Text style={styles.detailLocationText}>
                    {selectedItem.location}
                  </Text>
                </View>

                {"rating" in selectedItem && (
                  <View style={styles.ratingContainer}>
                    <FontAwesome name="star" size={16} color="#FFD700" />
                    <Text style={styles.ratingText}>
                      {selectedItem.rating} ({selectedItem.reviews} đánh giá)
                    </Text>
                  </View>
                )}
              </View>

              {/* Navigation tabs */}
              <View style={styles.detailTabs}>
                <TouchableOpacity
                  style={[
                    styles.detailTab,
                    activeDetailTab === "info" && styles.activeDetailTab,
                  ]}
                  onPress={() => setActiveDetailTab("info")}
                >
                  <Text
                    style={[
                      styles.detailTabText,
                      activeDetailTab === "info" && styles.activeDetailTabText,
                    ]}
                  >
                    Thông tin
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.detailTab,
                    activeDetailTab === "schedule" && styles.activeDetailTab,
                  ]}
                  onPress={() => setActiveDetailTab("schedule")}
                >
                  <Text
                    style={[
                      styles.detailTabText,
                      activeDetailTab === "schedule" &&
                        styles.activeDetailTabText,
                    ]}
                  >
                    Lịch trình
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.detailTab,
                    activeDetailTab === "policy" && styles.activeDetailTab,
                  ]}
                  onPress={() => setActiveDetailTab("policy")}
                >
                  <Text
                    style={[
                      styles.detailTabText,
                      activeDetailTab === "policy" &&
                        styles.activeDetailTabText,
                    ]}
                  >
                    Chính sách
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Tab content */}
              <View style={styles.detailContent}>
                {activeDetailTab === "info" && (
                  <>
                    <Text style={styles.detailSectionTitle}>Mô tả</Text>
                    <Text style={styles.detailDescription}>
                      {selectedItem.description}
                    </Text>

                    {"highlights" in selectedItem && (
                      <>
                        <Text style={styles.detailSectionTitle}>
                          Điểm nổi bật
                        </Text>
                        <View style={styles.highlightsContainer}>
                          {selectedItem.highlights.map((highlight, index) => (
                            <View key={index} style={styles.highlightItem}>
                              <MaterialIcons
                                name="star"
                                size={16}
                                color="#4A90E2"
                              />
                              <Text style={styles.highlightText}>
                                {highlight}
                              </Text>
                            </View>
                          ))}
                        </View>
                      </>
                    )}

                    {"included" in selectedItem && (
                      <>
                        <Text style={styles.detailSectionTitle}>Bao gồm</Text>
                        <View style={styles.includedContainer}>
                          {selectedItem.included.map((item, index) => (
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
                      </>
                    )}
                  </>
                )}

                {activeDetailTab === "schedule" && (
                  <>
                    {"schedule" in selectedItem ? (
                      <>
                        <Text style={styles.detailSectionTitle}>
                          Lịch trình chi tiết
                        </Text>
                        <View style={styles.scheduleContainer}>
                          {selectedItem.schedule.map((day, index) => (
                            <View key={index} style={styles.scheduleItem}>
                              <View style={styles.scheduleDayMarker}>
                                <Text style={styles.scheduleDayText}>
                                  Ngày {index + 1}
                                </Text>
                              </View>
                              <Text style={styles.scheduleText}>{day}</Text>
                            </View>
                          ))}
                        </View>

                        <View style={styles.infoRow}>
                          <MaterialIcons
                            name="departure-board"
                            size={20}
                            color="#4A90E2"
                          />
                          <Text style={styles.infoText}>
                            Điểm khởi hành:{" "}
                            {"departure" in selectedItem
                              ? selectedItem.departure
                              : "Không xác định"}
                          </Text>
                        </View>

                        <View style={styles.infoRow}>
                          <MaterialIcons
                            name="directions-bus"
                            size={20}
                            color="#4A90E2"
                          />
                          <Text style={styles.infoText}>
                            Phương tiện:{" "}
                            {"transport" in selectedItem
                              ? selectedItem.transport
                              : "Không xác định"}
                          </Text>
                        </View>
                      </>
                    ) : (
                      <Text style={styles.detailDescription}>
                        Thông tin lịch trình đang được cập nhật...
                      </Text>
                    )}
                  </>
                )}

                {activeDetailTab === "policy" && (
                  <>
                    {"policy" in selectedItem ? (
                      <>
                        <Text style={styles.detailSectionTitle}>
                          Chính sách hủy tour
                        </Text>
                        <Text style={styles.detailDescription}>
                          {selectedItem.policy}
                        </Text>
                      </>
                    ) : (
                      <Text style={styles.detailDescription}>
                        Thông tin chính sách đang được cập nhật...
                      </Text>
                    )}
                  </>
                )}
              </View>

              {/* Image gallery */}
              {"images" in selectedItem && selectedItem.images && (
                <View style={styles.galleryContainer}>
                  <Text style={styles.detailSectionTitle}>Hình ảnh</Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.galleryContent}
                  >
                    {selectedItem.images.map((img, index) => (
                      <Image
                        key={index}
                        source={img}
                        style={styles.galleryImage}
                      />
                    ))}
                  </ScrollView>
                </View>
              )}

              {/* Quantity and price */}
              <View style={styles.priceContainer}>
                <View style={styles.quantityContainer}>
                  <Text style={styles.quantityLabel}>Số lượng:</Text>
                  <View style={styles.quantityControls}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={decreaseQuantity}
                    >
                      <MaterialIcons name="remove" size={20} color="#4A90E2" />
                    </TouchableOpacity>
                    <Text style={styles.quantityValue}>{quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={increaseQuantity}
                    >
                      <MaterialIcons name="add" size={20} color="#4A90E2" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.totalPriceContainer}>
                  <Text style={styles.totalPriceLabel}>Thành tiền:</Text>
                  <Text style={styles.totalPriceValue}>
                    {"price" in selectedItem
                      ? (selectedItem.price * quantity).toLocaleString()
                      : "0"}{" "}
                    VND
                  </Text>
                </View>
              </View>
            </ScrollView>

            {/* Action buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.actionButton, styles.cartButton]}
                onPress={handleAddToCart}
              >
                <MaterialIcons
                  name="add-shopping-cart"
                  size={20}
                  color="#4A90E2"
                />
                <Text style={[styles.buttonText, styles.cartButtonText]}>
                  Thêm vào giỏ
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.bookButton]}
                onPress={handleBookNow}
              >
                <MaterialIcons name="credit-card" size={20} color="#FFF" />
                <Text style={[styles.buttonText, styles.bookButtonText]}>
                  Đặt ngay
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  // ==================== MAIN UI ====================
  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={["#4A90E2", "#5D9DF5"]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <TouchableOpacity onPress={toggleMenu} style={styles.headerLeft}>
          <Image
            source={require("@/assets/images/user.jpg")}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.greeting}>Xin chào!</Text>
            <TouchableOpacity
              onPress={() => setShowLocationModal(true)}
              style={styles.locationContainer}
            >
              <MaterialIcons name="location-on" size={20} color="#FFF" />
              <Text style={styles.locationText}>{currentLocation}</Text>
              <MaterialIcons name="arrow-drop-down" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleNotifications}>
          <View style={styles.notificationIcon}>
            <FontAwesome name="bell" size={24} color="#FFF" />
            <View style={styles.notificationBadge} />
          </View>
        </TouchableOpacity>
      </LinearGradient>

      {/* Menu Dropdown */}
      <Animated.View style={[styles.menuContainer, { height: menuHeight }]}>
        {showMenu && (
          <FlatList
            data={menuItems}
            renderItem={renderMenuItem}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
          />
        )}
      </Animated.View>

      {/* Main content */}
      <ScrollView
        ref={scrollRef}
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Dịch vụ Du Lịch */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Dịch Vụ Du Lịch</Text>
        </View>

        <View style={styles.servicesContainer}>
          <TouchableOpacity
            style={[
              styles.serviceButton,
              activeCategory === "Tour" && styles.activeServiceButton,
            ]}
            onPress={() => router.push("/(tabs)/tours")}
          >
            <View style={styles.serviceIconContainer}>
              <MaterialIcons
                name="airplanemode-active"
                size={24}
                color={activeCategory === "Tour" ? "#FFF" : "#4A90E2"}
              />
            </View>
            <Text
              style={[
                styles.serviceText,
                activeCategory === "Tour" && styles.activeServiceText,
              ]}
            >
              Tour
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.serviceButton,
              activeCategory === "HomeStay" && styles.activeServiceButton,
            ]}
            onPress={() => router.push("/(tabs)/homestay")}
          >
            <View style={styles.serviceIconContainer}>
              <MaterialIcons
                name="house"
                size={24}
                color={activeCategory === "HomeStay" ? "#FFF" : "#4A90E2"}
              />
            </View>
            <Text
              style={[
                styles.serviceText,
                activeCategory === "HomeStay" && styles.activeServiceText,
              ]}
            >
              HomeStay
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.serviceButton,
              activeCategory === "Thuê Xe" && styles.activeServiceButton,
            ]}
            onPress={() => router.push("/(tabs)/rental")}
          >
            <View style={styles.serviceIconContainer}>
              <MaterialIcons
                name="directions-car"
                size={24}
                color={activeCategory === "Thuê Xe" ? "#FFF" : "#4A90E2"}
              />
            </View>
            <Text
              style={[
                styles.serviceText,
                activeCategory === "Thuê Xe" && styles.activeServiceText,
              ]}
            >
              Thuê Xe
            </Text>
          </TouchableOpacity>
        </View>

        {/* Popular Trips */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Địa Điểm Nổi Bật</Text>
        </View>

        <FlatList
          data={vietnamDestinations}
          renderItem={renderDestinationItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalListContent}
        />

        {/* Group Trips */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Tour Du Lịch Nhóm</Text>
        </View>

        <FlatList
          data={groupTrips}
          renderItem={renderGroupTripItem}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          contentContainerStyle={styles.groupTripsContainer}
        />
      </ScrollView>

      {/* Notification Modal */}
      <Modal
        transparent
        visible={showNotifications}
        animationType="fade"
        onRequestClose={toggleNotifications}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={toggleNotifications}
        >
          <Animated.View
            style={[
              styles.notificationModal,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-20, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.notificationHeader}>
              <Text style={styles.notificationTitle}>Thông báo</Text>
              <TouchableOpacity onPress={toggleNotifications}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={notifications}
              renderItem={renderNotificationItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.notificationList}
            />
          </Animated.View>
        </TouchableOpacity>
      </Modal>

      {/* Location Modal */}
      <Modal
        transparent
        visible={showLocationModal}
        animationType="fade"
        onRequestClose={() => setShowLocationModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setShowLocationModal(false)}
        >
          <View style={styles.locationModal}>
            <View style={styles.locationModalHeader}>
              <Text style={styles.locationModalTitle}>Chọn vị trí</Text>
              <TouchableOpacity onPress={() => setShowLocationModal(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.locationItem}
              onPress={() => handleSelectLocation("Vị trí hiện tại")}
            >
              <MaterialIcons name="my-location" size={20} color="#4A90E2" />
              <Text style={styles.locationItemText}>Vị trí hiện tại</Text>
            </TouchableOpacity>

            <FlatList
              data={availableLocations}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.locationItem}
                  onPress={() => handleSelectLocation(item)}
                >
                  <MaterialIcons name="location-on" size={20} color="#666" />
                  <Text style={styles.locationItemText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
              contentContainerStyle={styles.locationList}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Detail Modal */}
      {renderDetailModal()}
    </View>
  );
}

// ==================== STYLES ====================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.5)",
  },
  greeting: {
    fontSize: 16,
    color: "#FFF",
    opacity: 0.8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  locationText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginLeft: 4,
  },
  notificationIcon: {
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF4757",
  },
  menuContainer: {
    backgroundColor: "#FFF",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    color: "#333",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  seeAll: {
    color: "#4A90E2",
    fontSize: 14,
    fontWeight: "500",
  },
  // Styles mới cho phần Dịch vụ Du Lịch
  servicesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  serviceButton: {
    alignItems: "center",
    width: "30%",
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activeServiceButton: {
    backgroundColor: "#4A90E2",
    borderColor: "#4A90E2",
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  serviceIconContainer: {
    marginBottom: 8,
  },
  serviceText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4A90E2",
  },
  activeServiceText: {
    color: "#FFF",
  },
  // Các styles còn lại giữ nguyên
  horizontalListContent: {
    paddingLeft: 24,
    paddingRight: 8,
  },
  tripCard: {
    width: width * 0.7,
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    marginRight: 16,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  tripImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  tripGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "60%",
  },
  tripInfo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  tripName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 4,
  },
  tripLocationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  tripLocation: {
    fontSize: 14,
    color: "#FFF",
    marginLeft: 4,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 4,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FFF",
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: "#FFF",
    opacity: 0.8,
  },
  priceTag: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  priceText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4A90E2",
  },
  groupTripsContainer: {
    paddingHorizontal: 24,
  },
  groupTripCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    flexDirection: "row",
    height: 120,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  groupTripImage: {
    width: 120,
    height: "100%",
    resizeMode: "cover",
  },
  groupTripInfo: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  groupTripName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  groupTripLocationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  groupTripLocation: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  groupTripFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  membersContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  membersText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  groupProgressContainer: {
    backgroundColor: "#E8F0FE",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  groupProgressText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#4A90E2",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-start",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  notificationModal: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    maxHeight: height * 0.7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  notificationList: {
    paddingHorizontal: 16,
  },
  notificationItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  unreadNotification: {
    backgroundColor: "#F8F9FA",
  },
  notificationItemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  notificationItemMessage: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  notificationItemTime: {
    fontSize: 12,
    color: "#999",
  },
  locationModal: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    width: "90%",
    maxHeight: height * 0.6,
  },
  locationModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  locationModalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  locationList: {
    paddingHorizontal: 16,
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  locationItemText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 12,
  },
  detailModal: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    width: "100%",
    maxHeight: height * 0.9,
    marginTop: 40,
  },
  detailImageContainer: {
    position: "relative",
  },
  detailImage: {
    width: "100%",
    height: 250,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  detailHeader: {
    padding: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  detailLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  detailLocationText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  ratingText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 5,
  },
  detailTabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  detailTab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeDetailTab: {
    borderBottomColor: "#4A90E2",
  },
  detailTabText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  activeDetailTabText: {
    color: "#4A90E2",
  },
  detailContent: {
    padding: 20,
  },
  detailSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    marginTop: 10,
  },
  detailDescription: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
    marginBottom: 20,
  },
  highlightsContainer: {
    marginBottom: 20,
  },
  highlightItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  highlightText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 8,
    flex: 1,
  },
  includedContainer: {
    marginBottom: 20,
  },
  includedItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  includedText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 8,
    flex: 1,
  },
  scheduleContainer: {
    marginBottom: 20,
  },
  scheduleItem: {
    flexDirection: "row",
    marginBottom: 15,
  },
  scheduleDayMarker: {
    backgroundColor: "#4A90E2",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 10,
  },
  scheduleDayText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  scheduleText: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 15,
    color: "#333",
    marginLeft: 8,
  },
  galleryContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  galleryContent: {
    paddingRight: 20,
  },
  galleryImage: {
    width: 150,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityLabel: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
    marginRight: 15,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 15,
    color: "#333",
  },
  totalPriceContainer: {
    alignItems: "flex-end",
  },
  totalPriceLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  totalPriceValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF6B00",
  },
  actionButtons: {
    flexDirection: "row",
    padding: 15,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  cartButton: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#4A90E2",
  },
  bookButton: {
    backgroundColor: "#4A90E2",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  cartButtonText: {
    color: "#4A90E2",
  },
  bookButtonText: {
    color: "#FFF",
  },
});
