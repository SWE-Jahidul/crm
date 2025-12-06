import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Deal from '@/models/Deal'

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB()
        const { id } = await context.params

        const deal = await Deal.findById(id).lean()

        if (!deal) {
            return NextResponse.json(
                { message: 'Deal not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(deal)
    } catch (error: any) {
        console.error('Error fetching deal:', error)
        return NextResponse.json(
            { message: error.message || 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function PATCH(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB()
        const { id } = await context.params

        const body = await request.json()

        const deal = await Deal.findByIdAndUpdate(
            id,
            { ...body, updated_at: new Date() },
            { new: true, runValidators: true }
        ).lean()

        if (!deal) {
            return NextResponse.json(
                { message: 'Deal not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(deal)
    } catch (error: any) {
        console.error('Error updating deal:', error)
        return NextResponse.json(
            { message: error.message || 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB()
        const { id } = await context.params

        const deal = await Deal.findByIdAndDelete(id).lean()

        if (!deal) {
            return NextResponse.json(
                { message: 'Deal not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ message: 'Deal deleted successfully' })
    } catch (error: any) {
        console.error('Error deleting deal:', error)
        return NextResponse.json(
            { message: error.message || 'Internal server error' },
            { status: 500 }
        )
    }
}
