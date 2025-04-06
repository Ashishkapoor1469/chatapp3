"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Paperclip, Smile } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { EmojiPicker } from "@/components/emoji-picker"
import { motion } from "framer-motion"

interface MessageInputProps {
  onSendMessage: (message: string) => void
  onTyping: () => void
}

export function MessageInput({ onSendMessage, onTyping }: MessageInputProps) {
  const [message, setMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)

    // Handle typing indicator
    if (!isTyping) {
      setIsTyping(true)
      onTyping()
    }

    // Reset typing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false)
    }, 2000)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message)
      setMessage("")
      if (textareaRef.current) {
        textareaRef.current.focus()
      }
    }
  }

  const handleEmojiSelect = (emoji: string) => {
    setMessage((prev) => prev + emoji)
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`border-t bg-white p-4 ${isFocused ? "shadow-lg" : ""} transition-shadow`}
    >
      <div className="flex items-end gap-2 max-w-3xl mx-auto">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full shrink-0 hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
        >
          <Paperclip className="h-5 w-5" />
        </Button>

        <div className={`relative flex-1 ${isFocused ? "ring-2 ring-indigo-200 rounded-lg" : ""} transition-all`}>
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Type a message..."
            className="min-h-10 resize-none rounded-lg border-slate-200 focus-visible:ring-0 focus-visible:ring-offset-0"
            rows={1}
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full shrink-0 hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
            >
              <Smile className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <EmojiPicker onEmojiSelect={handleEmojiSelect} />
          </PopoverContent>
        </Popover>

        <Button
          onClick={handleSendMessage}
          size="icon"
          className={`rounded-full shrink-0 ${message.trim() ? "bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700" : "bg-slate-200 text-slate-400 cursor-not-allowed hover:bg-slate-200"}`}
          disabled={!message.trim()}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </motion.div>
  )
}

