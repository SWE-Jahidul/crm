import { type NextRequest, NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import User from "@/models/User"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key-change-me"

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase()
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    // specific check for mocked demo user if it doesn't exist in DB yet (optional, but good for transition)
    // Actually, let's assume all users are in DB now.

    // Verify password
    const isValid = await bcrypt.compare(password, user.password_hash)
    if (!isValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    // Fetch Organization (mocked for now as we don't have Organization model setup fully or it's hardcoded)
    // We'll just return a mock organization or fetch if it exists. 
    // The previous code returned an organization object.
    const organization = {
      _id: user.organization_id || "org_1",
      name: "My Organization",
      role: "admin" // Placeholder
    }

    // Sign Token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
        organizationId: user.organization_id
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    )

    // Return User (exclude password)
    const userObj = user.toObject()
    delete userObj.password_hash

    return NextResponse.json({
      access_token: token,
      user: userObj,
      organization,
    })

  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
