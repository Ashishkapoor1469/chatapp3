"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { getSocket } from "@/lib/socket"
import { ChatHeader } from "@/components/chat-header"
import { MessageList } from "@/components/message-list"
import { MessageInput } from "@/components/message-input"
import { UserList } from "@/components/user-list"
import { TypingIndicator } from "@/components/typing-indicator"
import { RoomInfo } from "@/components/room-info"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

interface Message {
  id: string
  roomId: string
  user: string
  text: string
  time: string
}

interface User {
  id: string
  username: string
}

interface Room {
  id: string
  name: string
  createdBy: string
}

export default function ChatRoomPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [room, setRoom] = useState<Room | null>(null)
  const [username, setUsername] = useState("")
  const [typingUsers, setTypingUsers] = useState<string[]>([])
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isJoining, setIsJoining] = useState(true)
  const router = useRouter()
  const params = useParams()
  const roomId = params.roomId as string
  const { toast } = useToast()
  const isMobile = useMobile()

  useEffect(() => {
    // Check if user is logged in
    const storedUsername = localStorage.getItem("username")
    if (!storedUsername) {
      router.push("/login")
      return
    }

    setUsername(storedUsername)

    // Connect to Socket.io server
    const socket = getSocket()

    // Join the room
    socket.emit("room:join", { roomId, username: storedUsername })

    // Socket event listeners
    socket.on("room:joined", (roomData: Room) => {
      setRoom(roomData)
      setIsJoining(false)
      toast({
        title: "Joined Room",
        description: `You've joined ${roomData.name}`,
      })
    })

    socket.on("room:users", (roomUsers: User[]) => {
      setUsers(roomUsers)
    })

    socket.on("room:history", (messageHistory: Message[]) => {
      setMessages(messageHistory)
    })

    socket.on("message:new", (newMessage: Message) => {
      setMessages((prev) => [...prev, newMessage])

      // Play notification sound for new messages
      if (newMessage.user !== storedUsername && newMessage.user !== "System") {
        const audio = new Audio("/notification.mp3")
        audio.volume = 0.5
        audio.play().catch((err) => console.error("Error playing notification sound:", err))
      }
    })

    socket.on("user:typing", (user: string) => {
      setTypingUsers((prev) => {
        if (!prev.includes(user) && user !== storedUsername) {
          return [...prev, user]
        }
        return prev
      })

      // Remove user from typing after 3 seconds
      setTimeout(() => {
        setTypingUsers((prev) => prev.filter((u) => u !== user))
      }, 3000)
    })

    socket.on("room:error", (error: string) => {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      })
      router.push("/rooms")
    })

    // Cleanup on unmount
    return () => {
      socket.emit("room:leave", { roomId })
      socket.off("room:joined")
      socket.off("room:users")
      socket.off("room:history")
      socket.off("message:new")
      socket.off("user:typing")
      socket.off("room:error")
    }
  }, [roomId, router, toast])

  const handleSendMessage = (text: string) => {
    if (!text.trim() || !roomId) return

    const socket = getSocket()
    const newMessage = {
      id: Date.now().toString(),
      roomId,
      user: username,
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    socket.emit("message:send", newMessage)
    setMessages((prev) => [...prev, newMessage])
  }

  const handleTyping = () => {
    const socket = getSocket()
    socket.emit("user:typing", { roomId, username })
  }

  const handleLeaveRoom = () => {
    const socket = getSocket()
    socket.emit("room:leave", { roomId })
    router.push("/rooms")
  }

  // Close mobile sidebar when clicking on chat area
  const handleChatAreaClick = () => {
    if (isMobile && isSidebarOpen) {
      setIsSidebarOpen(false)
    }
  }

  if (isJoining) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin mb-4"></div>
          <h2 className="text-xl font-medium">Joining room...</h2>
          <p className="text-slate-500 mt-2">Connecting to the chat server</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex overflow-hidden">
      {/* Sidebar - User List (Desktop) */}
      <AnimatePresence>
        {(!isMobile || isSidebarOpen) && (
          <motion.div
            initial={{ x: isMobile ? -280 : 0, opacity: isMobile ? 0 : 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className={`${isMobile ? "absolute z-20 h-full" : "relative"} w-[280px] bg-white border-r shadow-lg`}
          >
            <UserList users={users} onClose={() => setIsSidebarOpen(false)} isMobile={isMobile} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col" onClick={handleChatAreaClick}>
        <ChatHeader
          roomName={room?.name || "Loading..."}
          onInfoClick={() => setIsInfoOpen(true)}
          onLeaveRoom={handleLeaveRoom}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isMobile={isMobile}
        />

        <div className="flex-1 overflow-hidden flex flex-col">
          <MessageList messages={messages} currentUser={username} />

          <TypingIndicator typingUsers={typingUsers} />

          <MessageInput onSendMessage={handleSendMessage} onTyping={handleTyping} />
        </div>
      </div>

      {/* Room Info Sidebar */}
      <RoomInfo room={room} users={users} isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isSidebarOpen && (
        <div className="fixed inset-0 bg-black/20 z-10" onClick={() => setIsSidebarOpen(false)} />
      )}
    </div>
  )
}

