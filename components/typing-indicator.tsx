"use client"

import { motion, AnimatePresence } from "framer-motion"

interface TypingIndicatorProps {
  typingUsers: string[]
}

export function TypingIndicator({ typingUsers }: TypingIndicatorProps) {
  if (typingUsers.length === 0) return null

  let text = ""
  if (typingUsers.length === 1) {
    text = `${typingUsers[0]} is typing`
  } else if (typingUsers.length === 2) {
    text = `${typingUsers[0]} and ${typingUsers[1]} are typing`
  } else {
    text = `${typingUsers[0]} and ${typingUsers.length - 1} others are typing`
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="px-4 py-2 text-xs text-slate-500 max-w-3xl mx-auto"
      >
        <div className="flex items-center gap-2">
          <div className="flex space-x-1">
            <motion.span
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0 }}
              className="w-1.5 h-1.5 bg-indigo-400 rounded-full"
            />
            <motion.span
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0.2 }}
              className="w-1.5 h-1.5 bg-indigo-500 rounded-full"
            />
            <motion.span
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0.4 }}
              className="w-1.5 h-1.5 bg-indigo-600 rounded-full"
            />
          </div>
          <span>{text}</span>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

