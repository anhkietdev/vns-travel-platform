import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Tour = {
  id: string;
  title: string;
  date: string;
  price: string;
  status: "paid" | "completed" | "cancelled";
  image: any;
  details: {
    location: string;
    duration: string;
    people: number;
  };
};

const HistoryTourScreen = () => {
  const tours: Tour[] = [
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
      },
    },
  ];

  const getStatusColor = (status: Tour["status"]) => {
    switch (status) {
      case "paid":
        return { color: "#4A90E2", text: "Đã thanh toán" };
      case "completed":
        return { color: "#4CAF50", text: "Đã hoàn thành" };
      case "cancelled":
        return { color: "#F44336", text: "Đã hủy" };
      default:
        return { color: "#9E9E9E", text: "Không xác định" };
    }
  };

  const renderTourItem = ({ item }: { item: Tour }) => {
    const status = getStatusColor(item.status);

    return (
      <TouchableOpacity
        style={styles.tourCard}
        onPress={() =>
          router.push({
            pathname: "/tour-detail",
            params: { id: item.id },
          })
        }
      >
        <Image source={item.image} style={styles.tourImage} />
        <View style={styles.tourInfo}>
          <Text style={styles.tourTitle}>{item.title}</Text>
          <View style={styles.tourMeta}>
            <MaterialIcons name="date-range" size={16} color="#666" />
            <Text style={styles.tourText}>{item.date}</Text>
          </View>
          <View style={styles.tourMeta}>
            <MaterialIcons name="location-on" size={16} color="#666" />
            <Text style={styles.tourText}>{item.details.location}</Text>
          </View>
          <View style={styles.tourMeta}>
            <MaterialIcons name="group" size={16} color="#666" />
            <Text style={styles.tourText}>{item.details.people} người</Text>
          </View>
          <View style={styles.tourFooter}>
            <Text style={styles.tourPrice}>{item.price}</Text>
            <View
              style={[styles.statusBadge, { backgroundColor: status.color }]}
            >
              <Text style={styles.statusText}>{status.text}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/(tabs)/profile")}>
          <MaterialIcons name="arrow-back" size={24} color="#4A90E2" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lịch sử đặt tour</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={tours}
        renderItem={renderTourItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  listContainer: {
    paddingBottom: 20,
  },
  tourCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tourImage: {
    width: "100%",
    height: 160,
    resizeMode: "cover",
  },
  tourInfo: {
    padding: 16,
  },
  tourTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  tourMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  tourText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  tourFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  tourPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6B00",
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
});

export default HistoryTourScreen;
