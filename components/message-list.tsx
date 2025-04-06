"use client"

import { useEffect, useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageItem } from "@/components/message-item"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: string
  roomId: string
  user: string
  text: string
  time: string
}

interface MessageListProps {
  messages: Message[]
  currentUser: string
}

export function MessageList({ messages, currentUser }: MessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4 max-w-3xl mx-auto">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">No messages yet</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              Be the first to start the conversation! Send a message to begin chatting.
            </p>
          </motion.div>
        ) : (
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <MessageItem message={message} isCurrentUser={message.user === currentUser} />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
        <div ref={scrollRef} />
      </div>
    </ScrollArea>
  )
}

