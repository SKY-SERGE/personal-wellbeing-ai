
import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  return (
    <div 
      className={cn(
        "flex gap-3 mb-4",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      <Avatar className={cn("h-8 w-8", isUser ? "bg-wellness-primary" : "bg-wellness-secondary")}>
        <AvatarFallback>
          {isUser ? "U" : "AI"}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex flex-col max-w-[75%]">
        <div 
          className={cn(
            "rounded-xl px-4 py-2 shadow-sm",
            isUser 
              ? "bg-wellness-primary text-white rounded-tr-none" 
              : "bg-gray-100 dark:bg-slate-800 rounded-tl-none"
          )}
        >
          <p className="text-sm">{message}</p>
        </div>
        <span className="text-xs text-muted-foreground mt-1 px-1">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
