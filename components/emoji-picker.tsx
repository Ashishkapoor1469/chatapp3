"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void
}

// Simple emoji categories for demo
const EMOJI_CATEGORIES = {
  smileys: ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘"],
  people: ["👍", "👎", "👌", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "👇", "👋", "🤚", "🖐️", "✋", "🖖"],
  nature: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🐔", "🐧"],
  food: ["🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍈", "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅"],
  activities: ["⚽", "🏀", "🏈", "⚾", "🥎", "🎾", "🏐", "🏉", "🥏", "🎱", "🏓", "🏸", "🏒", "🏑", "🥍", "🏏", "⛳"],
  travel: ["🚗", "🚕", "🚙", "🚌", "🚎", "🏎️", "🚓", "🚑", "🚒", "🚐", "🚚", "🚛", "🚜", "🛴", "🚲", "🛵", "🏍️"],
  symbols: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘"],
}

export function EmojiPicker({ onEmojiSelect }: EmojiPickerProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredEmojis = searchQuery
    ? Object.values(EMOJI_CATEGORIES)
        .flat()
        .filter((emoji) => emoji.includes(searchQuery))
    : null

  return (
    <div className="p-4">
      <div className="relative mb-4">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search emoji"
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {searchQuery ? (
        <div className="grid grid-cols-8 gap-2">
          {filteredEmojis?.length ? (
            filteredEmojis.map((emoji, i) => (
              <button
                key={`search-${i}`}
                className="h-8 w-8 flex items-center justify-center rounded hover:bg-slate-100 cursor-pointer text-lg"
                onClick={() => onEmojiSelect(emoji)}
              >
                {emoji}
              </button>
            ))
          ) : (
            <div className="col-span-8 text-center py-4 text-slate-500">No emojis found</div>
          )}
        </div>
      ) : (
        <Tabs defaultValue="smileys">
          <TabsList className="grid grid-cols-7">
            <TabsTrigger value="smileys">😀</TabsTrigger>
            <TabsTrigger value="people">👍</TabsTrigger>
            <TabsTrigger value="nature">🐶</TabsTrigger>
            <TabsTrigger value="food">🍎</TabsTrigger>
            <TabsTrigger value="activities">⚽</TabsTrigger>
            <TabsTrigger value="travel">🚗</TabsTrigger>
            <TabsTrigger value="symbols">❤️</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[200px] mt-2">
            {Object.entries(EMOJI_CATEGORIES).map(([category, emojis]) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-8 gap-2">
                  {emojis.map((emoji, i) => (
                    <button
                      key={`${category}-${i}`}
                      className="h-8 w-8 flex items-center justify-center rounded hover:bg-slate-100 cursor-pointer text-lg"
                      onClick={() => onEmojiSelect(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </TabsContent>
            ))}
          </ScrollArea>
        </Tabs>
      )}
    </div>
  )
}

