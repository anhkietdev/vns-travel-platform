// app/(tabs)/support.tsx
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Message = {
  id: string;
  text: string;
  sender: "user" | "support";
  time: string;
  image?: string;
};

type FeedbackType = "happy" | "unhappy" | "cancel" | "refund" | null;

export default function SupportScreen() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Xin chào! Tôi có thể giúp gì cho bạn?",
      sender: "support",
      time: "10:00 AM",
    },
  ]);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackType, setFeedbackType] = useState<FeedbackType>(null);
  const [feedbackReason, setFeedbackReason] = useState("");
  const [feedbackImages, setFeedbackImages] = useState<string[]>([]);
  const flatListRef = useRef<FlatList<Message>>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setFeedbackImages([...feedbackImages, result.assets[0].uri]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...feedbackImages];
    newImages.splice(index, 1);
    setFeedbackImages(newImages);
  };

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setMessage("");

    // Simulate response after 1 second
    setTimeout(() => {
      const responseMessage: Message = {
        id: Date.now().toString(),
        text: "Cảm ơn bạn đã liên hệ. Đội ngũ hỗ trợ của chúng tôi sẽ phản hồi bạn sớm nhất có thể.",
        sender: "support",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, responseMessage]);

      // Show feedback form after support response
      setTimeout(() => {
        setShowFeedbackForm(true);
      }, 1500);
    }, 1000);
  };

  const handleSubmitFeedback = () => {
    let feedbackMessage = "";

    switch (feedbackType) {
      case "happy":
        feedbackMessage = "Hài lòng với hỗ trợ";
        break;
      case "unhappy":
        feedbackMessage = `Không hài lòng: ${feedbackReason}`;
        break;
      case "cancel":
        feedbackMessage = `Hủy chuyến đi: ${feedbackReason}`;
        break;
      case "refund":
        feedbackMessage = `Yêu cầu hoàn tiền: ${feedbackReason}`;
        break;
      default:
        return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      text: `[ĐÁNH GIÁ] ${feedbackMessage}`,
      sender: "user",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      // Include images if any
      ...(feedbackImages.length > 0 && { image: feedbackImages[0] }), // For simplicity, we'll just send the first image
    };

    setMessages([...messages, newMessage]);
    setShowFeedbackForm(false);
    setFeedbackType(null);
    setFeedbackReason("");
    setFeedbackImages([]);
  };

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "user" ? styles.userMessage : styles.supportMessage,
      ]}
    >
      {item.sender === "support" && (
        <Image
          source={require("@/assets/images/support-avatar.png")}
          style={styles.avatar}
        />
      )}
      <View
        style={[
          styles.messageBubble,
          item.sender === "user" ? styles.userBubble : styles.supportBubble,
        ]}
      >
        {item.image && (
          <Image
            source={{ uri: item.image }}
            style={styles.messageImage}
            resizeMode="cover"
          />
        )}
        <Text
          style={[
            styles.messageText,
            item.sender === "user" ? styles.userText : styles.supportText,
          ]}
        >
          {item.text}
        </Text>
        <Text
          style={[
            styles.messageTime,
            item.sender === "user" ? styles.userTime : styles.supportTime,
          ]}
        >
          {item.time}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hỗ trợ khách hàng</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Chat Area */}
      <View style={styles.chatContainer}>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesContainer}
          ref={flatListRef}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />
      </View>

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          placeholder="Nhập tin nhắn..."
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSendMessage}
          disabled={message.trim() === ""}
        >
          <MaterialIcons
            name="send"
            size={24}
            color={message.trim() === "" ? "#999" : "#4A90E2"}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>

      {/* Feedback Form Modal */}
      <Modal
        visible={showFeedbackForm}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowFeedbackForm(false)}
      >
        <View style={styles.modalOverlay}>
          <ScrollView
            style={styles.modalScrollContainer}
            contentContainerStyle={styles.modalScrollContent}
          >
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Đánh giá hỗ trợ</Text>

              <Text style={styles.feedbackQuestion}>
                Bạn có hài lòng với hỗ trợ của chúng tôi?
              </Text>

              <View style={styles.feedbackOptions}>
                <Pressable
                  style={[
                    styles.feedbackButton,
                    feedbackType === "happy" && styles.feedbackButtonSelected,
                  ]}
                  onPress={() => setFeedbackType("happy")}
                >
                  <Text
                    style={[
                      styles.feedbackButtonText,
                      feedbackType === "happy" &&
                        styles.feedbackButtonSelectedText,
                    ]}
                  >
                    Hài lòng
                  </Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.feedbackButton,
                    feedbackType === "unhappy" && styles.feedbackButtonSelected,
                  ]}
                  onPress={() => setFeedbackType("unhappy")}
                >
                  <Text
                    style={[
                      styles.feedbackButtonText,
                      feedbackType === "unhappy" &&
                        styles.feedbackButtonSelectedText,
                    ]}
                  >
                    Không hài lòng
                  </Text>
                </Pressable>
              </View>

              {feedbackType === "unhappy" && (
                <>
                  <TextInput
                    style={styles.feedbackInput}
                    placeholder="Lý do không hài lòng..."
                    value={feedbackReason}
                    onChangeText={setFeedbackReason}
                    multiline
                  />

                  <Text style={styles.imageUploadTitle}>
                    Thêm hình ảnh (nếu có)
                  </Text>
                  <View style={styles.imageUploadContainer}>
                    {feedbackImages.map((uri, index) => (
                      <View key={index} style={styles.imagePreviewContainer}>
                        <Image source={{ uri }} style={styles.imagePreview} />
                        <Pressable
                          style={styles.removeImageButton}
                          onPress={() => removeImage(index)}
                        >
                          <FontAwesome name="times" size={16} color="white" />
                        </Pressable>
                      </View>
                    ))}
                    {feedbackImages.length < 3 && (
                      <Pressable
                        style={styles.addImageButton}
                        onPress={pickImage}
                      >
                        <FontAwesome name="camera" size={24} color="#4A90E2" />
                        <Text style={styles.addImageText}>Thêm ảnh</Text>
                      </Pressable>
                    )}
                  </View>
                </>
              )}

              <Text style={styles.feedbackQuestion}>Hoặc bạn cần:</Text>

              <View style={styles.feedbackOptions}>
                <Pressable
                  style={[
                    styles.feedbackButton,
                    feedbackType === "cancel" && styles.feedbackButtonSelected,
                  ]}
                  onPress={() => setFeedbackType("cancel")}
                >
                  <Text
                    style={[
                      styles.feedbackButtonText,
                      feedbackType === "cancel" &&
                        styles.feedbackButtonSelectedText,
                    ]}
                  >
                    Hủy chuyến đi
                  </Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.feedbackButton,
                    feedbackType === "refund" && styles.feedbackButtonSelected,
                  ]}
                  onPress={() => setFeedbackType("refund")}
                >
                  <Text
                    style={[
                      styles.feedbackButtonText,
                      feedbackType === "refund" &&
                        styles.feedbackButtonSelectedText,
                    ]}
                  >
                    Yêu cầu hoàn tiền
                  </Text>
                </Pressable>
              </View>

              {(feedbackType === "cancel" || feedbackType === "refund") && (
                <>
                  <TextInput
                    style={styles.feedbackInput}
                    placeholder="Vui lòng nêu lý do..."
                    value={feedbackReason}
                    onChangeText={setFeedbackReason}
                    multiline
                  />

                  <Text style={styles.imageUploadTitle}>
                    Thêm hình ảnh minh chứng
                  </Text>
                  <View style={styles.imageUploadContainer}>
                    {feedbackImages.map((uri, index) => (
                      <View key={index} style={styles.imagePreviewContainer}>
                        <Image source={{ uri }} style={styles.imagePreview} />
                        <Pressable
                          style={styles.removeImageButton}
                          onPress={() => removeImage(index)}
                        >
                          <FontAwesome name="times" size={16} color="white" />
                        </Pressable>
                      </View>
                    ))}
                    {feedbackImages.length < 3 && (
                      <Pressable
                        style={styles.addImageButton}
                        onPress={pickImage}
                      >
                        <FontAwesome name="camera" size={24} color="#4A90E2" />
                        <Text style={styles.addImageText}>Thêm ảnh</Text>
                      </Pressable>
                    )}
                  </View>
                </>
              )}

              <View style={styles.modalButtons}>
                <Pressable
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => {
                    setShowFeedbackForm(false);
                    setFeedbackImages([]);
                  }}
                >
                  <Text style={styles.modalButtonText}>Bỏ qua</Text>
                </Pressable>

                <Pressable
                  style={[styles.modalButton, styles.submitButton]}
                  onPress={handleSubmitFeedback}
                  disabled={
                    !feedbackType ||
                    (feedbackType !== "happy" && !feedbackReason)
                  }
                >
                  <Text style={styles.modalButtonText}>Gửi đánh giá</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    backgroundColor: "#FFF",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  messagesContainer: {
    paddingBottom: 16,
  },
  messageContainer: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "flex-end",
  },
  userMessage: {
    justifyContent: "flex-end",
  },
  supportMessage: {
    justifyContent: "flex-start",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
  },
  messageImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  userBubble: {
    backgroundColor: "#4A90E2",
    borderBottomRightRadius: 4,
  },
  supportBubble: {
    backgroundColor: "#FFF",
    borderBottomLeftRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  messageText: {
    fontSize: 16,
  },
  userText: {
    color: "#FFF",
  },
  supportText: {
    color: "#333",
  },
  messageTime: {
    fontSize: 12,
    marginTop: 4,
    textAlign: "right",
  },
  userTime: {
    color: "rgba(255,255,255,0.7)",
  },
  supportTime: {
    color: "#999",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    backgroundColor: "#FFF",
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    backgroundColor: "#F0F2F5",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalScrollContainer: {
    width: "100%",
  },
  modalScrollContent: {
    paddingVertical: 20,
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignSelf: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  feedbackQuestion: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "500",
  },
  feedbackOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  feedbackButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: "#F0F2F5",
    alignItems: "center",
  },
  feedbackButtonSelected: {
    backgroundColor: "#4A90E2",
  },
  feedbackButtonText: {
    color: "#333",
  },
  feedbackButtonSelectedText: {
    color: "white",
  },
  feedbackInput: {
    minHeight: 80,
    borderWidth: 1,
    borderColor: "#EEE",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    textAlignVertical: "top",
  },
  imageUploadTitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  imageUploadContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  imagePreviewContainer: {
    width: 80,
    height: 80,
    marginRight: 10,
    marginBottom: 10,
    position: "relative",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  removeImageButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  addImageButton: {
    width: 80,
    height: 80,
    borderWidth: 1,
    borderColor: "#4A90E2",
    borderRadius: 5,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  addImageText: {
    marginTop: 5,
    fontSize: 12,
    color: "#4A90E2",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#F0F2F5",
  },
  submitButton: {
    backgroundColor: "#4A90E2",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
