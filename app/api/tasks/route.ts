import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Task from '@/models/Task'
import mongoose from 'mongoose'

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const skip = parseInt(searchParams.get('skip') || '0')
    const limit = parseInt(searchParams.get('limit') || '100')
    const status = searchParams.get('status')

    const query: any = {
      organization_id: new mongoose.Types.ObjectId('000000000000000000000001'),
    }

    if (status) query.status = status

    const [tasks, total] = await Promise.all([
      Task.find(query)
        .sort({ due_date: 1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Task.countDocuments(query),
    ])

    return NextResponse.json({
      data: tasks,
      total,
      page: Math.floor(skip / limit) + 1,
      pages: Math.ceil(total / limit),
    })
  } catch (error: any) {
    console.error('Error fetching tasks:', error)
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()

    const task = await Task.create({
      organization_id: new mongoose.Types.ObjectId('000000000000000000000001'),
      ...body,
      created_at: new Date(),
      updated_at: new Date(),
    })

    return NextResponse.json(task, { status: 201 })
  } catch (error: any) {
    console.error('Error creating task:', error)
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
