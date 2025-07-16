import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const TourDetailScreen = () => {
  const { id } = useLocalSearchParams();

  const tours = [
    {
      id: "1",
      title: "Tour Đà Lạt 3 ngày 2 đêm",
      date: "15/10/2023 - 17/10/2023",
      price: "4,500,000 VND",
      status: "completed",
      image: require("@/assets/images/dalat.jpg"),
      details: {
        location: "Đà Lạt, Lâm Đồng",
        duration: "3 ngày 2 đêm",
        people: 2,
        description:
          "Tour Đà Lạt tham quan các địa điểm nổi tiếng như Hồ Xuân Hương, Thung lũng Tình Yêu, Đồi Robin, Chợ Đà Lạt và nhiều điểm đến hấp dẫn khác.",
        itinerary: [
          "Ngày 1: Đón khách tại sân bay - Tham quan Hồ Xuân Hương - Check-in khách sạn",
          "Ngày 2: Tham quan Thung lũng Tình Yêu - Đồi Robin - Chợ Đà Lạt",
          "Ngày 3: Tham quan vườn hoa - Trả khách tại sân bay",
        ],
        included: [
          "Khách sạn 3 sao",
          "Ăn sáng",
          "Xe đưa đón",
          "Hướng dẫn viên",
          "Vé tham quan",
        ],
        excluded: ["Ăn trưa, tối", "Chi phí cá nhân", "Bảo hiểm du lịch"],
      },
    },
    {
      id: "2",
      title: "Tour Phú Quốc 4 ngày 3 đêm",
      date: "20/11/2023 - 23/11/2023",
      price: "6,200,000 VND",
      status: "paid",
      image: require("@/assets/images/phuquoc.jpg"),
      details: {
        location: "Phú Quốc, Kiên Giang",
        duration: "4 ngày 3 đêm",
        people: 4,
        description:
          "Khám phá đảo ngọc Phú Quốc với những bãi biển đẹp nhất Việt Nam, thưởng thức hải sản tươi ngon và trải nghiệm các hoạt động thú vị trên biển.",
        itinerary: [
          "Ngày 1: Đón khách tại sân bay - Nhận phòng khách sạn - Nghỉ ngơi",
          "Ngày 2: Tham quan Bãi Sao - Làng chài Hàm Ninh",
          "Ngày 3: Tham quan Vinpearl Land - Safari",
          "Ngày 4: Tham quan nhà tù Phú Quốc - Trả khách",
        ],
        included: [
          "Khách sạn 4 sao",
          "Ăn sáng",
          "Xe đưa đón",
          "Vé tham quan Vinpearl",
          "Hướng dẫn viên",
        ],
        excluded: ["Ăn trưa, tối", "Chi phí cá nhân", "Dịch vụ spa"],
      },
    },
    {
      id: "3",
      title: "Tour Hạ Long 2 ngày 1 đêm",
      date: "05/12/2023 - 06/12/2023",
      price: "3,800,000 VND",
      status: "cancelled",
      image: require("@/assets/images/halong.jpg"),
      details: {
        location: "Vịnh Hạ Long, Quảng Ninh",
        duration: "2 ngày 1 đêm",
        people: 1,
        description:
          "Trải nghiệm du thuyền trên Vịnh Hạ Long - Di sản thiên nhiên thế giới, tham quan các hang động kỳ vĩ và tận hưởng không gian biển đảo tuyệt đẹp.",
        itinerary: [
          "Ngày 1: Đón khách tại Hạ Long - Lên tàu - Tham quan hang Sửng Sốt",
          "Ngày 2: Tham quan hang Luồn - Trả khách",
        ],
        included: [
          "Tàu 3 sao",
          "Ăn 3 bữa",
          "Hướng dẫn viên",
          "Vé tham quan",
          "Phòng ngủ trên tàu",
        ],
        excluded: ["Đồ uống", "Chi phí cá nhân", "Thuế VAT"],
      },
    },
  ];

  const tour = tours.find((t) => t.id === id);

  if (!tour) {
    return (
      <View style={styles.container}>
        <Text>Không tìm thấy tour</Text>
      </View>
    );
  }

  const status =
    tour.status === "completed"
      ? "Đã hoàn thành"
      : tour.status === "paid"
      ? "Đã thanh toán"
      : "Đã hủy";

  const statusColor =
    tour.status === "completed"
      ? "#4CAF50"
      : tour.status === "paid"
      ? "#4A90E2"
      : "#F44336";

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/(tabs)/history-tour")}>
          <MaterialIcons name="arrow-back" size={24} color="#4A90E2" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết tour</Text>
        <View style={{ width: 24 }} />
      </View>

      <Image source={tour.image} style={styles.tourImage} />

      <View style={styles.content}>
        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
            <Text style={styles.statusText}>{status}</Text>
          </View>
        </View>

        <Text style={styles.title}>{tour.title}</Text>

        <View style={styles.infoRow}>
          <MaterialIcons name="date-range" size={20} color="#666" />
          <Text style={styles.infoText}>{tour.date}</Text>
        </View>

        <View style={styles.infoRow}>
          <MaterialIcons name="location-on" size={20} color="#666" />
          <Text style={styles.infoText}>{tour.details.location}</Text>
        </View>

        <View style={styles.infoRow}>
          <MaterialIcons name="group" size={20} color="#666" />
          <Text style={styles.infoText}>{tour.details.people} người</Text>
        </View>

        <View style={styles.infoRow}>
          <MaterialIcons name="attach-money" size={20} color="#666" />
          <Text
            style={[styles.infoText, { color: "#FF6B00", fontWeight: "bold" }]}
          >
            {tour.price}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Mô tả tour</Text>
        <Text style={styles.description}>{tour.details.description}</Text>

        <Text style={styles.sectionTitle}>Lịch trình</Text>
        {tour.details.itinerary.map((item, index) => (
          <View key={index} style={styles.itineraryItem}>
            <MaterialIcons name="check-circle" size={16} color="#4CAF50" />
            <Text style={styles.itineraryText}>{item}</Text>
          </View>
        ))}

        <View style={styles.includedExcludedContainer}>
          <View style={styles.includedExcluded}>
            <Text style={styles.sectionTitle}>Bao gồm</Text>
            {tour.details.included.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <MaterialIcons name="check" size={16} color="#4CAF50" />
                <Text style={styles.listText}>{item}</Text>
              </View>
            ))}
          </View>

          <View style={styles.includedExcluded}>
            <Text style={styles.sectionTitle}>Không bao gồm</Text>
            {tour.details.excluded.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <MaterialIcons name="close" size={16} color="#F44336" />
                <Text style={styles.listText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  tourImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  content: {
    padding: 16,
  },
  statusContainer: {
    alignItems: "flex-end",
    marginBottom: 8,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "500",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: "#666",
    lineHeight: 22,
  },
  itineraryItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  itineraryText: {
    fontSize: 15,
    color: "#666",
    marginLeft: 8,
    flex: 1,
  },
  includedExcludedContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  includedExcluded: {
    width: "48%",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  listText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
    flex: 1,
  },
});

export default TourDetailScreen;
