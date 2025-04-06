"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { io, type Socket } from "socket.io-client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send } from "lucide-react"

interface Message {
  id: string
  user: string
  text: string
  time: string
}

interface User {
  id: string
  username: string
}

export default function ChatPage() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [username, setUsername] = useState("")
  const [socket, setSocket] = useState<Socket | null>(null)
  const router = useRouter()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if user is logged in
    const storedUsername = localStorage.getItem("username")
    if (!storedUsername) {
      router.push("/login")
      return
    }

    setUsername(storedUsername)

    // Connect to Socket.io server
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001")
    setSocket(socketInstance)

    // Socket event listeners
    socketInstance.on("connect", () => {
      socketInstance.emit("user:join", storedUsername)
    })

    socketInstance.on("users:update", (updatedUsers: User[]) => {
      setUsers(updatedUsers)
    })

    socketInstance.on("message:receive", (newMessage: Message) => {
      setMessages((prev) => [...prev, newMessage])
    })

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect()
    }
  }, [router])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && socket) {
      const newMessage = {
        id: Date.now().toString(),
        user: username,
        text: message,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      socket.emit("message:send", newMessage)
      setMessages((prev) => [...prev, newMessage])
      setMessage("")
    }
  }

  const getInitials = (name: string) => {
    return name.substring(0, 2).toUpperCase()
  }

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar - User List */}
      <div className="hidden md:block w-64 bg-white border-r">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Online Users</h2>
          <Badge className="mt-1">{users.length} online</Badge>
        </div>
        <ScrollArea className="h-[calc(100vh-73px)]">
          <div className="p-2">
            {users.map((user) => (
              <div key={user.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-100">
                <Avatar>
                  <AvatarFallback>{getInitials(user.username)}</AvatarFallback>
                </Avatar>
                <span>{user.username}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <Card className="flex-1 flex flex-col rounded-none border-0 shadow-none">
          <CardHeader className="border-b bg-white">
            <CardTitle>Chat Room</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-[calc(100vh-160px)]">
              <div className="p-4 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.user === username ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] px-4 py-2 rounded-lg ${
                        msg.user === username
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {msg.user !== username && <div className="font-semibold text-xs mb-1">{msg.user}</div>}
                      <div>{msg.text}</div>
                      <div className="text-xs opacity-70 text-right mt-1">{msg.time}</div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="border-t p-3 bg-white">
            <form onSubmit={sendMessage} className="flex w-full gap-2">
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
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

