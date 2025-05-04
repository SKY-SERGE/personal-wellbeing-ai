
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import ChatMessage from "@/components/ai/ChatMessage";
import { Card } from "@/components/ui/card";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const AIAssistant = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your wellness assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: message,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    
    // Simulate AI response (in a real app, this would call an API)
    setTimeout(() => {
      let response = "";
      
      if (message.toLowerCase().includes("exercise")) {
        response = "Based on your activity history, I recommend incorporating more strength training. Even 20 minutes twice a week can make a significant difference!";
      } else if (message.toLowerCase().includes("diet") || message.toLowerCase().includes("food") || message.toLowerCase().includes("eat")) {
        response = "Your nutrition logs show you're doing well with protein intake, but could use more vegetables. Try adding a serving of leafy greens to your lunch!";
      } else if (message.toLowerCase().includes("sleep")) {
        response = "I notice your sleep has been inconsistent lately. Setting a regular bedtime, even on weekends, can help improve your sleep quality significantly.";
      } else {
        response = "Thank you for your message. Is there anything specific about your wellness journey you'd like insights on? I can help with nutrition, activity, sleep, or general wellbeing questions.";
      }
      
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        content: response,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2">AI Wellness Assistant</h1>
        <p className="text-muted-foreground">
          Ask questions about your health data, get personalized recommendations, or seek general wellness advice.
        </p>
      </div>
      
      <Card className="flex-1 flex flex-col p-4 mb-4 overflow-hidden">
        <div className="flex-1 overflow-y-auto mb-4 pr-2">
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg.content}
              isUser={msg.isUser}
              timestamp={msg.timestamp}
            />
          ))}
        </div>
        
        <form onSubmit={sendMessage} className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AIAssistant;
