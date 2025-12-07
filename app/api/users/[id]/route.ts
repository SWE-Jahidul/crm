import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import User from '@/models/User'

interface RouteParams {
    params: Promise<{
        id: string
    }>
}

export async function DELETE(
    request: Request,
    context: RouteParams
) {
    try {
        const params = await context.params
        const id = params.id
        await connectToDatabase()

        const deletedUser = await User.findByIdAndDelete(id)

        if (!deletedUser) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ message: 'User deleted successfully' })
    } catch (error) {
        console.error('Error deleting user:', error)
        return NextResponse.json(
            { message: 'Error deleting user' },
            { status: 500 }
        )
    }
}

export async function PATCH(
    request: Request,
    context: RouteParams
) {
    try {
        const params = await context.params
        const id = params.id
        const body = await request.json()
        await connectToDatabase()

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true }
        ).select('-password_hash')

        if (!updatedUser) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ data: updatedUser })
    } catch (error) {
        console.error('Error updating user:', error)
        return NextResponse.json(
            { message: 'Error updating user' },
            { status: 500 }
        )
    }
}
