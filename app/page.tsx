import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Users, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "Chat App",
  description: "A real-time chat application built with Next.js and Socket.io",
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center px-4 py-12 md:py-24 max-w-7xl mx-auto w-full gap-8 md:gap-12">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent animate-gradient">
            Connect in Real-Time
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-xl mx-auto md:mx-0">
            Join conversations, create rooms, and chat with people from around the world with our modern messaging
            platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/login" passHref>
              <Button
                size="lg"
                className="gap-2 shadow-lg shadow-indigo-200 transition-all hover:shadow-xl hover:shadow-indigo-300"
              >
                <Zap className="h-5 w-5" />
                Get Started
              </Button>
            </Link>
            <Link href="/rooms" passHref>
              <Button variant="outline" size="lg" className="gap-2">
                <Users className="h-5 w-5" />
                Browse Rooms
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex-1 max-w-md w-full">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl blur-md opacity-75"></div>
            <Card className="relative border-0 shadow-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white border-b">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  <CardTitle>Chat Preview</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="bg-slate-50 p-4 space-y-4">
                  <div className="flex justify-start">
                    <div className="bg-white rounded-2xl rounded-tl-none px-4 py-2 shadow-sm max-w-[80%]">
                      <p className="text-sm font-medium text-slate-500">Alex</p>
                      <p>Hey everyone! Welcome to our new chat app! 👋</p>
                      <p className="text-xs text-slate-400 text-right mt-1">10:24 AM</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-2xl rounded-tr-none px-4 py-2 shadow-sm max-w-[80%]">
                      <p>Thanks! The interface looks amazing! 😍</p>
                      <p className="text-xs text-indigo-100 text-right mt-1">10:26 AM</p>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="bg-white rounded-2xl rounded-tl-none px-4 py-2 shadow-sm max-w-[80%]">
                      <p className="text-sm font-medium text-slate-500">Taylor</p>
                      <p>I love the real-time features and room system!</p>
                      <p className="text-xs text-slate-400 text-right mt-1">10:28 AM</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-2xl rounded-tr-none px-4 py-2 shadow-sm max-w-[80%]">
                      <p>Let's create more rooms and invite everyone!</p>
                      <p className="text-xs text-indigo-100 text-right mt-1">10:30 AM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-3 bg-white border-t">
                <div className="flex w-full gap-2 items-center">
                  <div className="flex-1 bg-slate-100 rounded-full px-4 py-2 text-sm text-slate-400">
                    Type a message...
                  </div>
                  <Button size="icon" className="rounded-full shadow-md">
                    <Zap className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
                  <MessageSquare className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle>Real-Time Messaging</CardTitle>
                <CardDescription>Instant message delivery with typing indicators and read receipts</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-500">
                  Experience seamless communication with our lightning-fast messaging system. See when others are typing
                  and when your messages are read.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-cyan-600" />
                </div>
                <CardTitle>Room System</CardTitle>
                <CardDescription>Create and join rooms for organized conversations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-500">
                  Organize your conversations by creating custom rooms. Invite friends by sharing room IDs and manage
                  room settings easily.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
                  <Zap className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle>Modern Experience</CardTitle>
                <CardDescription>Beautiful UI with responsive design for all devices</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-500">
                  Enjoy a sleek, modern interface that works perfectly on desktop, tablet, and mobile devices with
                  smooth animations and transitions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-50 py-8 border-t">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500">Built with Next.js, Socket.io and shadcn/ui</p>
        </div>
      </footer>
    </div>
  )
}

