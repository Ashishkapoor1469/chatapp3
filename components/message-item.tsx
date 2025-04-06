"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface Message {
  id: string
  roomId: string
  user: string
  text: string
  time: string
}

interface MessageItemProps {
  message: Message
  isCurrentUser: boolean
}

export function MessageItem({ message, isCurrentUser }: MessageItemProps) {
  const [showTime, setShowTime] = useState(false)

  const getInitials = (name: string) => {
    return name.substring(0, 2).toUpperCase()
  }

  const getRandomColor = (name: string) => {
    // Generate a consistent color based on the username
    const colors = [
      "bg-red-100 text-red-600",
      "bg-blue-100 text-blue-600",
      "bg-green-100 text-green-600",
      "bg-yellow-100 text-yellow-600",
      "bg-purple-100 text-purple-600",
      "bg-pink-100 text-pink-600",
      "bg-indigo-100 text-indigo-600",
      "bg-cyan-100 text-cyan-600",
    ]

    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }

    return colors[Math.abs(hash) % colors.length]
  }

  // Special styling for system messages
  if (message.user === "System") {
    return (
      <div className="flex justify-center my-2">
        <div className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full">{message.text}</div>
      </div>
    )
  }

  return (
    <div
      className={cn("flex items-start gap-2 group", isCurrentUser && "flex-row-reverse")}
      onClick={() => setShowTime(!showTime)}
    >
      {!isCurrentUser && (
        <Avatar className={cn("h-8 w-8 mt-1", getRandomColor(message.user))}>
          <AvatarFallback className="text-xs font-medium">{getInitials(message.user)}</AvatarFallback>
        </Avatar>
      )}
      <div className="flex flex-col max-w-[75%]">
        {!isCurrentUser && <span className="text-xs font-medium text-slate-500 mb-1 ml-1">{message.user}</span>}
        <div className="flex items-end gap-2">
          <div
            className={cn(
              "px-4 py-2 rounded-2xl shadow-sm",
              isCurrentUser
                ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-tr-none"
                : "bg-white text-slate-800 rounded-tl-none",
            )}
          >
            <p className="whitespace-pre-wrap break-words">{message.text}</p>
            {showTime && (
              <p className={cn("text-xs mt-1 text-right", isCurrentUser ? "text-indigo-100" : "text-slate-400")}>
                {message.time}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

