"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, KeyRound } from "lucide-react"

interface JoinRoomFormProps {
  onJoinRoom: (roomId: string) => void
}

export function JoinRoomForm({ onJoinRoom }: JoinRoomFormProps) {
  const [roomId, setRoomId] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (roomId.trim()) {
      setIsLoading(true)
      // Simulate loading for better UX
      setTimeout(() => {
        onJoinRoom(roomId)
        setIsLoading(false)
      }, 600)
    }
  }

  return (
    <Card className="border-0 shadow-md overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
            <KeyRound className="h-8 w-8 text-indigo-600" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="room-id">Room ID</Label>
            <Input
              id="room-id"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Enter room ID"
              className="h-12"
              required
            />
            <p className="text-sm text-slate-500">Enter the ID of the room you want to join</p>
          </div>
          <Button type="submit" className="w-full h-12 gap-2 group" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                Joining...
              </div>
            ) : (
              <>
                Join Room
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

