"use client"

import { Button } from "@/components/ui/button"
import { Info, LogOut, Menu, Users } from "lucide-react"
import { motion } from "framer-motion"

interface ChatHeaderProps {
  roomName: string
  onInfoClick: () => void
  onLeaveRoom: () => void
  onToggleSidebar: () => void
  isMobile: boolean
}

export function ChatHeader({ roomName, onInfoClick, onLeaveRoom, onToggleSidebar, isMobile }: ChatHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-16 border-b bg-white flex items-center justify-between px-4 shadow-sm z-10"
    >
      <div className="flex items-center">
        {isMobile && (
          <Button variant="ghost" size="icon" className="mr-2" onClick={onToggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 flex items-center justify-center text-white">
            <Users className="h-4 w-4" />
          </div>
          <h2 className="font-semibold text-lg">{roomName}</h2>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onInfoClick}
          className="rounded-full hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
        >
          <Info className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onLeaveRoom}
          className="rounded-full hover:bg-red-100 hover:text-red-600 transition-colors"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </motion.div>
  )
}

