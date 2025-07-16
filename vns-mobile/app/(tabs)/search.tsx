// app/(tabs)/search.tsx
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Lấy kích thước màn hình
const { width } = Dimensions.get("window");

// Định nghĩa kiểu dữ liệu
type SearchResult = {
  id: string;
  title: string;
  location: string;
  price: number;
  type: "tour" | "hotel" | "ticket";
  image: ImageSourcePropType;
};

type Service = {
  id: string;
  title: string;
  price: number;
  type: "tour" | "hotel" | "ticket";
};

type PopularDestination = {
  id: string;
  title: string;
  location: string;
  images: ImageSourcePropType[];
  services?: Service[];
};

type Filters = {
  type: "all" | "tour" | "hotel" | "ticket";
};

// Dữ liệu mẫu
const searchResults: SearchResult[] = [
  {
    id: "1",
    title: "Tour Đà Lạt 3 ngày 2 đêm",
    location: "Lâm Đồng",
    price: 4500000,
    type: "tour",
    image: require("@/assets/images/dalat.jpg"),
  },
  {
    id: "2",
    title: "Khách sạn 5 sao tại Đà Nẵng",
    location: "Đà Nẵng",
    price: 2200000,
    type: "hotel",
    image: require("@/assets/images/danang.jpg"),
  },
  {
    id: "3",
    title: "Vé tham quan VinWonders Nha Trang",
    location: "Nha Trang",
    price: 800000,
    type: "ticket",
    image: require("@/assets/images/vinwonders.jpg"),
  },
];

const popularDestinations: PopularDestination[] = [
  {
    id: "4",
    title: "Vịnh Hạ Long",
    location: "Quảng Ninh",
    images: [
      require("@/assets/images/halong1.jpg"),
      require("@/assets/images/halong2.jpg"),
      require("@/assets/images/halong3.jpg"),
    ],
    services: [
      {
        id: "s1",
        title: "Tour tham quan Vịnh 1 ngày",
        price: 1200000,
        type: "tour",
      },
      {
        id: "s2",
        title: "Khách sạn 4 sao trên Vịnh",
        price: 1800000,
        type: "hotel",
      },
      {
        id: "s3",
        title: "Vé cáp treo Sun World",
        price: 700000,
        type: "ticket",
      },
    ],
  },
  {
    id: "5",
    title: "Phố cổ Hội An",
    location: "Quảng Nam",
    images: [
      require("@/assets/images/hoian1.jpg"),
      require("@/assets/images/hoian2.jpg"),
    ],
  },
  {
    id: "6",
    title: "Đảo Phú Quốc",
    location: "Kiên Giang",
    images: [
      require("@/assets/images/phuquoc1.jpg"),
      require("@/assets/images/phuquoc2.jpg"),
    ],
  },
];

// Props cho FilterBar
type FilterBarProps = {
  onFilterChange: (newFilters: Filters) => void;
};

// Component Filter
const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  const [activeFilter, setActiveFilter] = useState<
    "all" | "tour" | "hotel" | "ticket"
  >("all");

  const filters = [
    { id: "all", label: "Tất cả" },
    { id: "tour", label: "Tour" },
    { id: "hotel", label: "Khách sạn" },
    { id: "ticket", label: "Vé tham quan" },
  ];

  const handleFilterPress = (filterId: "all" | "tour" | "hotel" | "ticket") => {
    setActiveFilter(filterId);
    onFilterChange({ type: filterId });
  };

  return (
    <View style={styles.filterContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScroll}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterButton,
              activeFilter === filter.id && styles.activeFilterButton,
            ]}
            onPress={() =>
              handleFilterPress(
                filter.id as "all" | "tour" | "hotel" | "ticket"
              )
            }
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === filter.id && styles.activeFilterText,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDestination, setSelectedDestination] =
    useState<PopularDestination | null>(null);
  const [filters, setFilters] = useState<Filters>({ type: "all" });

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const renderSearchItem = ({ item }: { item: SearchResult }) => (
    <TouchableOpacity style={styles.searchItem}>
      <Image source={item.image} style={styles.searchItemImage} />
      <View style={styles.searchItemInfo}>
        <Text style={styles.searchItemTitle}>{item.title}</Text>
        <View style={styles.searchItemLocation}>
          <MaterialIcons name="location-on" size={16} color="#666" />
          <Text style={styles.searchItemLocationText}>{item.location}</Text>
        </View>
        <Text style={styles.searchItemPrice}>
          {item.price.toLocaleString()} VND
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderPopularItem = ({ item }: { item: PopularDestination }) => (
    <TouchableOpacity
      style={styles.popularItem}
      onPress={() => {
        if (item.services) {
          setSelectedDestination(item);
          setSearchQuery(item.title);
        } else {
          setSearchQuery(item.title);
        }
      }}
    >
      {item.images && item.images.length > 0 && (
        <Image source={item.images[0]} style={styles.popularItemImage} />
      )}
      <View style={styles.popularItemText}>
        <Text style={styles.popularItemTitle}>{item.title}</Text>
        <Text style={styles.popularItemLocation}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderServiceItem = ({ item }: { item: Service }) => (
    <TouchableOpacity style={styles.serviceItem}>
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceTitle}>{item.title}</Text>
        <Text style={styles.serviceType}>
          {item.type === "tour" && "Tour du lịch"}
          {item.type === "hotel" && "Khách sạn"}
          {item.type === "ticket" && "Vé tham quan"}
        </Text>
        <Text style={styles.servicePrice}>
          {item.price.toLocaleString()} VND
        </Text>
      </View>
      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Đặt ngay</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const filteredResults = searchResults.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = filters.type === "all" || item.type === filters.type;
    return matchesSearch && matchesType;
  });

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchHeader}>
        <TouchableOpacity onPress={() => router.navigate("/(tabs)/home")}>
          <MaterialIcons name="arrow-back" size={24} color="#4A90E2" />
        </TouchableOpacity>
        <View style={styles.searchInputContainer}>
          <MaterialIcons
            name="search"
            size={24}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm điểm du lịch..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
        </View>
      </View>

      {/* Filter Bar */}
      {searchQuery && <FilterBar onFilterChange={handleFilterChange} />}

      {/* Search Content */}
      {searchQuery ? (
        selectedDestination && selectedDestination.title === searchQuery ? (
          // Hiển thị chi tiết địa điểm nếu có
          <ScrollView style={styles.destinationDetail}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              style={styles.destinationImages}
            >
              {selectedDestination.images.map((img, index) => (
                <Image
                  key={index}
                  source={img}
                  style={[styles.destinationImage, { width }]}
                />
              ))}
            </ScrollView>
            <View style={styles.destinationInfo}>
              <Text style={styles.destinationTitle}>
                {selectedDestination.title}
              </Text>
              <View style={styles.destinationLocation}>
                <MaterialIcons name="location-on" size={20} color="#4A90E2" />
                <Text style={styles.destinationLocationText}>
                  {selectedDestination.location}
                </Text>
              </View>
            </View>

            <Text style={styles.servicesTitle}>Dịch vụ tại đây</Text>
            {selectedDestination.services && (
              <FlatList
                data={selectedDestination.services}
                renderItem={renderServiceItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                contentContainerStyle={styles.servicesList}
              />
            )}
          </ScrollView>
        ) : (
          // Hiển thị kết quả tìm kiếm thông thường
          <FlatList
            data={filteredResults}
            renderItem={renderSearchItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.searchResults}
            ListEmptyComponent={
              <View style={styles.emptyResults}>
                <MaterialIcons name="search-off" size={48} color="#CCC" />
                <Text style={styles.emptyResultsText}>
                  Không tìm thấy kết quả phù hợp
                </Text>
              </View>
            }
          />
        )
      ) : (
        // Hiển thị gợi ý khi chưa nhập từ khóa
        <View style={styles.suggestionsContainer}>
          <Text style={styles.sectionTitle}>Địa điểm phổ biến</Text>
          <FlatList
            data={popularDestinations}
            renderItem={renderPopularItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.popularList}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  searchHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F3F5",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginLeft: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#333",
  },
  filterContainer: {
    backgroundColor: "#FFF",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  filterScroll: {
    paddingHorizontal: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: "#F1F3F5",
  },
  activeFilterButton: {
    backgroundColor: "#4A90E2",
  },
  filterText: {
    color: "#666",
    fontWeight: "500",
  },
  activeFilterText: {
    color: "#FFF",
  },
  searchResults: {
    padding: 16,
  },
  searchItem: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: "row",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchItemImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  searchItemInfo: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  searchItemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  searchItemLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  searchItemLocationText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  searchItemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6B00",
  },
  emptyResults: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyResultsText: {
    fontSize: 16,
    color: "#999",
    marginTop: 16,
  },
  suggestionsContainer: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  popularList: {
    paddingBottom: 16,
  },
  popularItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  popularItemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    resizeMode: "cover",
  },
  popularItemText: {
    marginLeft: 12,
    flex: 1,
  },
  popularItemTitle: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  popularItemLocation: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  destinationDetail: {
    flex: 1,
  },
  destinationImages: {
    height: 200,
  },
  destinationImage: {
    height: 200,
    resizeMode: "cover",
  },
  destinationInfo: {
    padding: 16,
  },
  destinationTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  destinationLocation: {
    flexDirection: "row",
    alignItems: "center",
  },
  destinationLocationText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 4,
  },
  servicesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    margin: 16,
    marginBottom: 8,
  },
  servicesList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  serviceItem: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  serviceType: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6B00",
  },
  bookButton: {
    backgroundColor: "#4A90E2",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  bookButtonText: {
    color: "#FFF",
    fontWeight: "500",
  },
});
