import { type NextRequest, NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import User from "@/models/User"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key-change-me"

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Verify Token
    let decoded: any
    try {
      decoded = jwt.verify(token, JWT_SECRET)
    } catch (err) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }

    await connectToDatabase()

    // Find User
    const user = await User.findById(decoded.userId).select("-password_hash")
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 401 })
    }

    // Mock Organization for now or fetch if needed
    const organization = {
      _id: user.organization_id || "org_1",
      name: "My Organization",
      email: "company@example.com"
    }

    return NextResponse.json({
      user,
      organization,
    })

  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
