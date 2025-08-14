import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
} from "lucide-react";

const PartnerMessaging = () => {
  const [activeConversation, setActiveConversation] = useState(1);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Mock data for conversations
  const [conversations, setConversations] = useState([
    {
      id: 1,
      customerName: "Sarah Johnson",
      avatar: "SJ",
      lastMessage:
        "Thank you for the quick response! When can we schedule the installation?",
      timestamp: "2:30 PM",
      unreadCount: 2,
      isOnline: true,
      messages: [
        {
          id: 1,
          sender: "customer",
          content: "Hi, I'm interested in your premium service package.",
          timestamp: "2:15 PM",
          status: "read",
        },
        {
          id: 2,
          sender: "partner",
          content:
            "Hello Sarah! I'd be happy to help you with that. Our premium package includes 24/7 support and priority installation.",
          timestamp: "2:18 PM",
          status: "read",
        },
        {
          id: 3,
          sender: "customer",
          content:
            "That sounds perfect! What's the pricing for the premium package?",
          timestamp: "2:25 PM",
          status: "read",
        },
        {
          id: 4,
          sender: "partner",
          content:
            "The premium package is $299/month, which includes all features plus dedicated support. Would you like me to send you a detailed breakdown?",
          timestamp: "2:28 PM",
          status: "read",
        },
        {
          id: 5,
          sender: "customer",
          content:
            "Thank you for the quick response! When can we schedule the installation?",
          timestamp: "2:30 PM",
          status: "delivered",
        },
      ],
    },
    {
      id: 2,
      customerName: "Michael Chen",
      avatar: "MC",
      lastMessage: "Got it, thanks for clarifying that.",
      timestamp: "1:45 PM",
      unreadCount: 0,
      isOnline: false,
      messages: [
        {
          id: 1,
          sender: "customer",
          content: "I'm having trouble with the setup process.",
          timestamp: "1:30 PM",
          status: "read",
        },
        {
          id: 2,
          sender: "partner",
          content:
            "I can help you with that. What specific step are you stuck on?",
          timestamp: "1:35 PM",
          status: "read",
        },
        {
          id: 3,
          sender: "customer",
          content: "The configuration wizard won't proceed past step 3.",
          timestamp: "1:40 PM",
          status: "read",
        },
        {
          id: 4,
          sender: "partner",
          content:
            "This is usually due to a network configuration issue. Can you check if port 8080 is open on your firewall?",
          timestamp: "1:42 PM",
          status: "read",
        },
        {
          id: 5,
          sender: "customer",
          content: "Got it, thanks for clarifying that.",
          timestamp: "1:45 PM",
          status: "read",
        },
      ],
    },
    {
      id: 3,
      customerName: "Emily Rodriguez",
      avatar: "ER",
      lastMessage: "Perfect! I'll proceed with the order.",
      timestamp: "11:20 AM",
      unreadCount: 0,
      isOnline: true,
      messages: [
        {
          id: 1,
          sender: "customer",
          content: "Can you provide more details about the warranty?",
          timestamp: "11:15 AM",
          status: "read",
        },
        {
          id: 2,
          sender: "partner",
          content:
            "Absolutely! Our warranty covers all hardware for 2 years and software support for 3 years.",
          timestamp: "11:18 AM",
          status: "read",
        },
        {
          id: 3,
          sender: "customer",
          content: "Perfect! I'll proceed with the order.",
          timestamp: "11:20 AM",
          status: "read",
        },
      ],
    },
    {
      id: 4,
      customerName: "David Park",
      avatar: "DP",
      lastMessage: "When would be a good time to call?",
      timestamp: "Yesterday",
      unreadCount: 1,
      isOnline: false,
      messages: [
        {
          id: 1,
          sender: "customer",
          content: "I need to discuss some customization options.",
          timestamp: "Yesterday",
          status: "read",
        },
        {
          id: 2,
          sender: "partner",
          content:
            "I'd be happy to discuss customization. Let me know what specific features you're looking for.",
          timestamp: "Yesterday",
          status: "read",
        },
        {
          id: 3,
          sender: "customer",
          content: "When would be a good time to call?",
          timestamp: "Yesterday",
          status: "delivered",
        },
      ],
    },
    {
      id: 5,
      customerName: "Lisa Thompson",
      avatar: "LT",
      lastMessage: "Thanks for your help!",
      timestamp: "Monday",
      unreadCount: 0,
      isOnline: false,
      messages: [
        {
          id: 1,
          sender: "customer",
          content: "I completed the setup successfully.",
          timestamp: "Monday",
          status: "read",
        },
        {
          id: 2,
          sender: "partner",
          content: "Excellent! How is everything working so far?",
          timestamp: "Monday",
          status: "read",
        },
        {
          id: 3,
          sender: "customer",
          content: "Everything is running smoothly. Thanks for your help!",
          timestamp: "Monday",
          status: "read",
        },
      ],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Filter conversations based on search
  const filteredConversations = conversations.filter((conv) =>
    conv.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Auto-scroll to bottom when new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation]);

  // Handle sending message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const updatedConversations = conversations.map((conv) => {
        if (conv.id === activeConversation) {
          const newMsg = {
            id: conv.messages.length + 1,
            sender: "partner",
            content: newMessage,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            status: "sent",
          };
          return {
            ...conv,
            messages: [...conv.messages, newMsg],
            lastMessage: newMessage,
            timestamp: newMsg.timestamp,
          };
        }
        return conv;
      });
      setConversations(updatedConversations);
      setNewMessage("");

      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    }
  };

  // Handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const activeConv = conversations.find(
    (conv) => conv.id === activeConversation
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Conversations List */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900 mb-4">Messages</h1>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 border-b border-gray-100 cursor-pointer transition-colors duration-200 hover:bg-gray-50 ${
                activeConversation === conversation.id
                  ? "bg-blue-50 border-r-2 border-r-blue-500"
                  : ""
              }`}
              onClick={() => setActiveConversation(conversation.id)}
            >
              <div className="flex items-center space-x-3">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                    {conversation.avatar}
                  </div>
                  {conversation.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>

                {/* Conversation Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 truncate">
                      {conversation.customerName}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {conversation.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate mt-1">
                    {conversation.lastMessage}
                  </p>
                </div>

                {/* Unread Badge */}
                {conversation.unreadCount > 0 && (
                  <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {conversation.unreadCount}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Area - Message Thread */}
      <div className="flex-1 flex flex-col">
        {activeConv ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                    {activeConv.avatar}
                  </div>
                  {activeConv.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div>
                  <h2 className="font-medium text-gray-900">
                    {activeConv.customerName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {activeConv.isOnline ? "Online" : "Last seen recently"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeConv.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "partner"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl shadow-sm ${
                      message.sender === "partner"
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-900 border border-gray-200"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <div
                      className={`flex items-center justify-between mt-1 text-xs ${
                        message.sender === "partner"
                          ? "text-blue-100"
                          : "text-gray-500"
                      }`}
                    >
                      <span>{message.timestamp}</span>
                      {message.sender === "partner" && (
                        <span className="ml-2">
                          {message.status === "sent" && "✓"}
                          {message.status === "delivered" && "✓✓"}
                          {message.status === "read" && (
                            <span className="text-blue-200">✓✓</span>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-4 py-2 rounded-xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <Paperclip className="w-5 h-5" />
                </button>
                <div className="flex-1 relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={1}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No conversation selected
              </h3>
              <p className="text-gray-500">
                Choose a conversation from the sidebar to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerMessaging;
