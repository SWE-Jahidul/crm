import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Lead from '@/models/Lead'

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB()
        const { id } = await context.params

        const lead = await Lead.findById(id).lean()

        if (!lead) {
            return NextResponse.json(
                { message: 'Lead not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(lead)
    } catch (error: any) {
        console.error('Error fetching lead:', error)
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

        const lead = await Lead.findByIdAndUpdate(
            id,
            { ...body, updated_at: new Date() },
            { new: true, runValidators: true }
        ).lean()

        if (!lead) {
            return NextResponse.json(
                { message: 'Lead not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(lead)
    } catch (error: any) {
        console.error('Error updating lead:', error)
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

        const lead = await Lead.findByIdAndDelete(id).lean()

        if (!lead) {
            return NextResponse.json(
                { message: 'Lead not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ message: 'Lead deleted successfully' })
    } catch (error: any) {
        console.error('Error deleting lead:', error)
        return NextResponse.json(
            { message: error.message || 'Internal server error' },
            { status: 500 }
        )
    }
}
