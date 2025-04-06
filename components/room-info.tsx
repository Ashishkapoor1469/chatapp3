"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Copy, Check, Users, Calendar, User } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

interface Room {
  id: string
  name: string
  createdBy: string
}

interface RoomUser {
  id: string
  username: string
}

interface RoomInfoProps {
  room: Room | null
  users: RoomUser[]
  isOpen: boolean
  onClose: () => void
}

export function RoomInfo({ room, users, isOpen, onClose }: RoomInfoProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleCopyRoomId = () => {
    if (!room) return

    navigator.clipboard.writeText(room.id)
    setCopied(true)

    toast({
      title: "Room ID copied",
      description: "Room ID has been copied to clipboard",
    })

    setTimeout(() => setCopied(false), 2000)
  }

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

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="p-0 w-[350px] sm:max-w-md">
        <SheetHeader className="p-6 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white">
          <SheetTitle className="text-white">Room Information</SheetTitle>
        </SheetHeader>

        {room && (
          <div className="py-6 space-y-6 px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                <Users className="h-4 w-4" />
                <h3>Room Name</h3>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg text-lg font-medium">{room.name}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                <Calendar className="h-4 w-4" />
                <h3>Room ID</h3>
              </div>
              <div className="flex items-center gap-2">
                <code className="bg-slate-50 px-3 py-2 rounded-lg text-sm flex-1 overflow-x-auto">{room.id}</code>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopyRoomId}
                  className={`rounded-full ${copied ? "bg-green-100 text-green-600" : ""}`}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-xs text-slate-500">Share this ID with others to invite them to the room</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                <User className="h-4 w-4" />
                <h3>Created By</h3>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg">{room.createdBy}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                  <Users className="h-4 w-4" />
                  <h3>Members ({users.length})</h3>
                </div>
              </div>
              <div className="bg-slate-50 rounded-lg p-2">
                <ScrollArea className="h-[200px]">
                  <div className="space-y-1">
                    {users.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center gap-2 p-2 hover:bg-slate-100 rounded-md transition-colors"
                      >
                        <Avatar className={`h-8 w-8 ${getRandomColor(user.username)}`}>
                          <AvatarFallback className="text-xs font-medium">{getInitials(user.username)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{user.username}</span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </motion.div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

