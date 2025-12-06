import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Task from '@/models/Task'

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB()
        const { id } = await context.params

        const task = await Task.findById(id).lean()

        if (!task) {
            return NextResponse.json(
                { message: 'Task not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(task)
    } catch (error: any) {
        console.error('Error fetching task:', error)
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

        const task = await Task.findByIdAndUpdate(
            id,
            { ...body, updated_at: new Date() },
            { new: true, runValidators: true }
        ).lean()

        if (!task) {
            return NextResponse.json(
                { message: 'Task not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(task)
    } catch (error: any) {
        console.error('Error updating task:', error)
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

        const task = await Task.findByIdAndDelete(id).lean()

        if (!task) {
            return NextResponse.json(
                { message: 'Task not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ message: 'Task deleted successfully' })
    } catch (error: any) {
        console.error('Error deleting task:', error)
        return NextResponse.json(
            { message: error.message || 'Internal server error' },
            { status: 500 }
        )
    }
}
