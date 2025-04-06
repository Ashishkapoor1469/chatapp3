"use client"

import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, ArrowRight } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"

interface Room {
  id: string
  name: string
  createdBy: string
  users: number
}

interface RoomsListProps {
  rooms: Room[]
  onJoinRoom: (roomId: string) => void
  isLoading: boolean
}

export function RoomsList({ rooms, onJoinRoom, isLoading }: RoomsListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="border shadow-md">
            <CardContent className="pt-6">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <Skeleton className="h-4 w-1/4" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (rooms.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-4">
          <Users className="h-8 w-8 text-indigo-600" />
        </div>
        <h3 className="text-xl font-medium mb-2">No rooms available</h3>
        <p className="text-slate-500 mb-6 max-w-md mx-auto">
          Create a new room to start chatting with others or join a room using a room ID.
        </p>
        <Button className="gap-2">
          Create Your First Room
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {rooms.map((room, index) => (
        <motion.div
          key={room.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="border-0 shadow-md hover:shadow-lg transition-all h-full flex flex-col">
            <CardContent className="pt-6 flex-1">
              <h3 className="font-semibold text-lg">{room.name}</h3>
              <CardDescription className="mb-4">Created by {room.createdBy}</CardDescription>
              <div className="flex items-center text-sm text-indigo-600 font-medium">
                <Users className="h-4 w-4 mr-1" />
                <span>
                  {room.users} {room.users === 1 ? "user" : "users"} online
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full gap-2 group" onClick={() => onJoinRoom(room.id)}>
                Join Room
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

