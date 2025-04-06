"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { motion } from "framer-motion"

interface User {
  id: string
  username: string
}

interface UserListProps {
  users?: User[]
  onClose?: () => void
  isMobile?: boolean
}

export function UserList({ users = [], onClose, isMobile = false }: UserListProps) {
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
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <div>
          <h2 className="font-semibold">Room Members</h2>
          <Badge variant="outline" className="mt-1 bg-indigo-100 text-indigo-600 hover:bg-indigo-100">
            {users.length} online
          </Badge>
        </div>
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          {users.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <p>No users online</p>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}
            >
              {users.map((user) => (
                <motion.div
                  key={user.id}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-100 transition-colors">
                    <Avatar className={getRandomColor(user.username)}>
                      <AvatarFallback className="text-sm font-medium">{getInitials(user.username)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.username}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

