"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      setIsLoading(true)
      // Simulate loading for better UX
      setTimeout(() => {
        // Store username in localStorage
        localStorage.setItem("username", username)
        router.push("/rooms")
      }, 800)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-white rounded-full shadow-md mb-4">
            <MessageSquare className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold">Welcome to Chat App</h1>
          <p className="text-slate-500 mt-2">Sign in to start chatting</p>
        </div>

        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl blur-md opacity-75"></div>
          <Card className="relative border-0 shadow-xl">
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Enter Your Username</CardTitle>
                <CardDescription>Choose a username to identify yourself in chat rooms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-12"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  className="w-full h-12 gap-2 shadow-lg shadow-indigo-200 transition-all hover:shadow-xl hover:shadow-indigo-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                      Signing in...
                    </div>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </Button>
                <div className="text-center text-sm text-slate-500">
                  <Link href="/" className="hover:text-indigo-600 transition-colors">
                    Back to home
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}

