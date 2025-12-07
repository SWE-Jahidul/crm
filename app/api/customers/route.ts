import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Customer from '@/models/Customer'
import mongoose from 'mongoose'

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const skip = parseInt(searchParams.get('skip') || '0')
    const limit = parseInt(searchParams.get('limit') || '20')

    const query: any = {
      organization_id: new mongoose.Types.ObjectId('000000000000000000000001'),
    }

    const [customers, total] = await Promise.all([
      Customer.find(query)
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Customer.countDocuments(query),
    ])

    return NextResponse.json({
      data: customers,
      total,
      page: Math.floor(skip / limit) + 1,
      pages: Math.ceil(total / limit),
    })
  } catch (error: any) {
    console.error('Error fetching customers:', error)
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
    console.log('Creating customer with data:', JSON.stringify(body, null, 2))

    const customer = await Customer.create({
      organization_id: new mongoose.Types.ObjectId('000000000000000000000001'),
      ...body,
      created_at: new Date(),
      updated_at: new Date(),
    })

    console.log('Customer created successfully:', customer._id)
    return NextResponse.json(customer, { status: 201 })
  } catch (error: any) {
    console.error('Error creating customer:', error)
    console.error('Error details:', {
      message: error.message,
      name: error.name,
      stack: error.stack,
      errors: error.errors,
    })
    return NextResponse.json(
      {
        message: error.message || 'Internal server error',
        details: error.errors || {},
      },
      { status: 500 }
    )
  }
}
