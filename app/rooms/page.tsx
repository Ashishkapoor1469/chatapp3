"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RoomsList } from "@/components/rooms-list"
import { CreateRoomDialog } from "@/components/create-room-dialog"
import { JoinRoomForm } from "@/components/join-room-form"
import { getSocket } from "@/lib/socket"
import { ArrowLeft, Plus, RefreshCw } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface Room {
  id: string
  name: string
  createdBy: string
  users: number
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [username, setUsername] = useState("")
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const storedUsername = localStorage.getItem("username")
    if (!storedUsername) {
      router.push("/login")
      return
    }

    setUsername(storedUsername)

    // Connect to Socket.io server
    const socket = getSocket()

    // Request rooms list
    socket.emit("rooms:list")

    // Listen for rooms update
    socket.on("rooms:update", (updatedRooms: Room[]) => {
      setRooms(updatedRooms)
      setIsLoading(false)
      setIsRefreshing(false)
    })

    return () => {
      socket.off("rooms:update")
    }
  }, [router])

  const handleJoinRoom = (roomId: string) => {
    localStorage.setItem("currentRoomId", roomId)
    router.push(`/chat/${roomId}`)
  }

  const handleCreateRoom = (roomName: string) => {
    const socket = getSocket()
    socket.emit("room:create", { name: roomName, createdBy: username })
    setIsCreateRoomOpen(false)
  }

  const handleRefreshRooms = () => {
    setIsRefreshing(true)
    const socket = getSocket()
    socket.emit("rooms:list")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Chat Rooms</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2" onClick={handleRefreshRooms} disabled={isRefreshing}>
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button size="sm" className="gap-2 shadow-md" onClick={() => setIsCreateRoomOpen(true)}>
              <Plus className="h-4 w-4" />
              Create Room
            </Button>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="border-0 shadow-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white">
              <CardTitle>Available Chat Rooms</CardTitle>
              <CardDescription className="text-indigo-100">Join an existing room or create a new one</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs defaultValue="available" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="available">Available Rooms</TabsTrigger>
                  <TabsTrigger value="join">Join by ID</TabsTrigger>
                </TabsList>
                <TabsContent value="available" className="space-y-4">
                  <RoomsList rooms={rooms} onJoinRoom={handleJoinRoom} isLoading={isLoading} />
                </TabsContent>
                <TabsContent value="join">
                  <JoinRoomForm onJoinRoom={handleJoinRoom} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <CreateRoomDialog open={isCreateRoomOpen} onOpenChange={setIsCreateRoomOpen} onCreateRoom={handleCreateRoom} />
    </div>
  )
}

