import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Dữ liệu mẫu cho các tour đã tham gia
const sampleTours = [
  {
    id: 1,
    name: "Tour Hạ Long 2 ngày 1 đêm",
    date: "15/05/2023",
    image: require("@/assets/images/halong.jpg"),
  },
  {
    id: 2,
    name: "Đà Nẵng - Hội An - Bà Nà",
    date: "22/06/2023",
    image: require("@/assets/images/danang.jpg"),
  },
  {
    id: 3,
    name: "Sapa mùa lúa chín",
    date: "10/09/2023",
    image: require("@/assets/images/sapa.jpg"),
  },
];

const RateToursScreen = () => {
  const [selectedTour, setSelectedTour] = useState<number | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReview = () => {
    if (!selectedTour) {
      Alert.alert("Lỗi", "Vui lòng chọn tour cần đánh giá");
      return;
    }

    if (rating === 0) {
      Alert.alert("Lỗi", "Vui lòng chọn số sao đánh giá");
      return;
    }

    setIsSubmitting(true);

    // Giả lập gửi đánh giá
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        "Thành công",
        `Cảm ơn bạn đã đánh giá ${rating} sao cho tour!\nBình luận của bạn sẽ được kiểm duyệt.`,
        [
          {
            text: "Đóng",
            onPress: () => {
              setSelectedTour(null);
              setRating(0);
              setComment("");
              router.push("/profile");
            },
          },
        ]
      );
    }, 1500);
  };

  const renderStars = () => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <AntDesign
              name={star <= rating ? "star" : "staro"}
              size={32}
              color={star <= rating ? "#FFD700" : "#DDD"}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/profile")}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Đánh giá tour</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Danh sách tour đã tham gia */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tour đã tham gia</Text>
        <Text style={styles.sectionSubtitle}>
          Chọn tour bạn muốn đánh giá và bình luận
        </Text>

        {sampleTours.map((tour) => (
          <TouchableOpacity
            key={tour.id}
            style={[
              styles.tourItem,
              selectedTour === tour.id && styles.selectedTourItem,
            ]}
            onPress={() => setSelectedTour(tour.id)}
          >
            <Image source={tour.image} style={styles.tourImage} />
            <View style={styles.tourInfo}>
              <Text style={styles.tourName}>{tour.name}</Text>
              <Text style={styles.tourDate}>
                <MaterialIcons name="date-range" size={14} color="#666" />{" "}
                {tour.date}
              </Text>
            </View>
            {selectedTour === tour.id && (
              <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Form đánh giá */}
      {selectedTour && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Đánh giá của bạn</Text>

          {/* Chọn sao đánh giá */}
          <View style={styles.ratingSection}>
            <Text style={styles.ratingText}>Số sao:</Text>
            {renderStars()}
            <Text style={styles.ratingValue}>
              {rating > 0 ? `${rating} sao` : "Chưa chọn"}
            </Text>
          </View>

          {/* Nhập bình luận */}
          <View style={styles.commentSection}>
            <Text style={styles.commentLabel}>Bình luận (tuỳ chọn):</Text>
            <TextInput
              style={styles.commentInput}
              placeholder="Hãy chia sẻ trải nghiệm của bạn về tour..."
              multiline
              numberOfLines={4}
              value={comment}
              onChangeText={setComment}
            />
          </View>

          {/* Nút gửi */}
          <TouchableOpacity
            style={[styles.submitButton, isSubmitting && styles.disabledButton]}
            onPress={handleSubmitReview}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Text style={styles.submitButtonText}>Đang gửi...</Text>
            ) : (
              <Text style={styles.submitButtonText}>Gửi đánh giá</Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      {/* Hướng dẫn đánh giá */}
      <View style={styles.guideSection}>
        <Text style={styles.guideTitle}>Hướng dẫn đánh giá:</Text>
        <View style={styles.guideItem}>
          <MaterialIcons name="info" size={16} color="#4A90E2" />
          <Text style={styles.guideText}>
            Chọn tour bạn muốn đánh giá từ danh sách
          </Text>
        </View>
        <View style={styles.guideItem}>
          <MaterialIcons name="info" size={16} color="#4A90E2" />
          <Text style={styles.guideText}>
            Đánh giá từ 1-5 sao tương ứng với mức độ hài lòng
          </Text>
        </View>
        <View style={styles.guideItem}>
          <MaterialIcons name="info" size={16} color="#4A90E2" />
          <Text style={styles.guideText}>
            Bình luận chi tiết sẽ giúp người khác có trải nghiệm tốt hơn
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    padding: 8,
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
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  tourItem: {
    flexDirection: "row",
    alignItems: "center",
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
  tourImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  tourInfo: {
    flex: 1,
  },
  tourName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  tourDate: {
    fontSize: 13,
    color: "#666",
  },
  ratingSection: {
    marginVertical: 16,
    alignItems: "center",
  },
  ratingText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  ratingValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF9500",
  },
  commentSection: {
    marginVertical: 8,
  },
  commentLabel: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    textAlignVertical: "top",
    backgroundColor: "#FAFAFA",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
  },
  disabledButton: {
    backgroundColor: "#AAAAAA",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  guideSection: {
    backgroundColor: "#EFF7FF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  guideTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  guideItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  guideText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
    flex: 1,
  },
});

export default RateToursScreen;
