import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Deal from '@/models/Deal'

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const skip = parseInt(searchParams.get('skip') || '0')
    const limit = parseInt(searchParams.get('limit') || '100')
    const stage = searchParams.get('stage')

    const query: any = {
      organization_id: '000000000000000000000001',
    }

    if (stage) query.stage = stage

    const [deals, total] = await Promise.all([
      Deal.find(query)
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Deal.countDocuments(query),
    ])

    return NextResponse.json({
      data: deals,
      total,
      page: Math.floor(skip / limit) + 1,
      pages: Math.ceil(total / limit),
    })
  } catch (error: any) {
    console.error('Error fetching deals:', error)
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

    const deal = await Deal.create({
      organization_id: '000000000000000000000001',
      ...body,
      created_at: new Date(),
      updated_at: new Date(),
    })

    return NextResponse.json(deal, { status: 201 })
  } catch (error: any) {
    console.error('Error creating deal:', error)
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
