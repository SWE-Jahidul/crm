import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import User from '@/models/User'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

// Hardcoded for demo
const DEMO_ORG_ID = '000000000000000000000001'

export async function GET(request: Request) {
    try {
        await connectToDatabase()

        // Ensure organization ID is valid ObjectId
        const orgId = new mongoose.Types.ObjectId(DEMO_ORG_ID)

        const users = await User.find({ organization_id: orgId })
            .select('-password_hash') // Exclude password from response
            .sort({ created_at: -1 })

        return NextResponse.json({ data: users })
    } catch (error) {
        console.error('Error fetching users:', error)
        return NextResponse.json(
            { message: 'Error fetching users' },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        await connectToDatabase()
        const body = await request.json()

        // Validate required fields
        if (!body.email || !body.first_name || !body.last_name || !body.role) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: body.email })
        if (existingUser) {
            return NextResponse.json(
                { message: 'User with this email already exists' },
                { status: 409 }
            )
        }

        // For demo: Default password since we don't have email invite flow
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash('password123', salt)

        const user = await User.create({
            organization_id: new mongoose.Types.ObjectId(DEMO_ORG_ID),
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            role: body.role,
            password_hash: passwordHash,
            status: 'active'
        })

        // Return user without password
        const userResponse = user.toObject()
        delete userResponse.password_hash

        return NextResponse.json({ data: userResponse }, { status: 201 })
    } catch (error) {
        console.error('Error creating user:', error)
        return NextResponse.json(
            { message: 'Error creating user' },
            { status: 500 }
        )
    }
}
