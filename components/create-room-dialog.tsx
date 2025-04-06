"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

interface CreateRoomDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateRoom: (roomName: string) => void
}

export function CreateRoomDialog({ open, onOpenChange, onCreateRoom }: CreateRoomDialogProps) {
  const [roomName, setRoomName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (roomName.trim()) {
      setIsLoading(true)
      // Simulate loading for better UX
      setTimeout(() => {
        onCreateRoom(roomName)
        setRoomName("")
        setIsLoading(false)
      }, 600)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] border-0 shadow-2xl p-0 gap-0 overflow-hidden">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <DialogHeader className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white p-6">
            <DialogTitle className="text-xl">Create a new room</DialogTitle>
            <DialogDescription className="text-indigo-100">
              Enter a name for your chat room. Click create when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="room-name">Room name</Label>
                <Input
                  id="room-name"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder="Enter room name"
                  className="h-12"
                  required
                />
              </div>
            </div>
            <DialogFooter className="p-6 pt-0">
              <div className="flex gap-3 w-full">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                      Creating...
                    </div>
                  ) : (
                    "Create Room"
                  )}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}

