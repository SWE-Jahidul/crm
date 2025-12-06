import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Customer from '@/models/Customer'

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB()
        const { id } = await context.params

        const customer = await Customer.findById(id).lean()

        if (!customer) {
            return NextResponse.json(
                { message: 'Customer not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(customer)
    } catch (error: any) {
        console.error('Error fetching customer:', error)
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

        const customer = await Customer.findByIdAndUpdate(
            id,
            { ...body, updated_at: new Date() },
            { new: true, runValidators: true }
        ).lean()

        if (!customer) {
            return NextResponse.json(
                { message: 'Customer not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(customer)
    } catch (error: any) {
        console.error('Error updating customer:', error)
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

        const customer = await Customer.findByIdAndDelete(id).lean()

        if (!customer) {
            return NextResponse.json(
                { message: 'Customer not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ message: 'Customer deleted successfully' })
    } catch (error: any) {
        console.error('Error deleting customer:', error)
        return NextResponse.json(
            { message: error.message || 'Internal server error' },
            { status: 500 }
        )
    }
}
